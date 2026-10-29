import { json, fail, sameOrigin, clip, type Env } from "../../lib/api-server";
import { normalizeSize, isPlausibleSize, quoteMessage, whatsappUrl, draftReady, normalizeWheelSize } from "../../lib/quote";
import type { QuoteRequest, QuoteResponse, Condition, Lang } from "../../lib/api-types";
import { site } from "../../lib/site";

// POST /api/quote
// Today: validates the request and returns the prefilled WhatsApp link.
// When a backend is connected (env vars below), it also delivers the lead:
//   QUOTE_WEBHOOK_URL -> JSON POST,  RESEND_API_KEY -> email (to QUOTE_EMAIL_TO, default site.email),  LEADS (KV) -> stored copy.
export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!sameOrigin(request)) return fail(403, "forbidden_origin", "Requests must come from the Reyes Tires Pro website.");
  if (Number(request.headers.get("content-length") || 0) > 4096) return fail(413, "too_large", "Request is too large.");

  let raw: Record<string, unknown>;
  try { raw = await request.json(); } catch { return fail(400, "invalid_json", "Send a JSON body."); }
  if (raw.website) return json({ ok: true, id: "ignored", whatsappUrl: "", delivered: [] }); // honeypot

  const mode = raw.mode === "wheels" || raw.mode === "package" ? raw.mode : "tires";
  const size = normalizeSize(String(raw.size ?? ""));
  const wheelSize = normalizeWheelSize(clip(raw.wheelSize, 8));
  if (mode === "tires" && !isPlausibleSize(size)) return fail(422, "invalid_size", "Send a tire size like 225/45R17.");
  const qty = [1, 2, 4].includes(Number(raw.qty)) ? (Number(raw.qty) as 1 | 2 | 4) : 4;
  const condition: Condition = raw.condition === "used" || raw.condition === "new" ? raw.condition : "either";
  const lang: Lang = raw.lang === "es" ? "es" : "en";

  const q: QuoteRequest = {
    mode, size, qty, condition, lang, wheelSize: wheelSize || undefined, style: clip(raw.style, 60),
    name: clip(raw.name, 80), phone: clip(raw.phone, 30), vehicle: clip(raw.vehicle, 80),
    notes: clip(raw.notes, 500), source: clip(raw.source, 120),
  };
  if (!draftReady(q)) return fail(422, "incomplete", "Send a tire size, a wheel size or your vehicle.");
  if (raw.direct && (q.phone || "").replace(/\D/g, "").length < 10) return fail(422, "phone_required", "Add a phone number so the shop can reply.");
  const id = `Q-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
  const message = quoteMessage(q);
  const lead = { id, receivedAt: new Date().toISOString(), ...q, message };
  const delivered: string[] = [];
  const jobs: Promise<unknown>[] = [];

  if (env.QUOTE_WEBHOOK_URL) {
    delivered.push("webhook");
    jobs.push(fetch(env.QUOTE_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) }));
  }
  if (env.RESEND_API_KEY) {
    delivered.push("email");
    jobs.push(fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: env.QUOTE_EMAIL_FROM || "Reyes Tires Pro <onboarding@resend.dev>",
        to: (env.QUOTE_EMAIL_TO || site.email).split(",").map((s) => s.trim()),
        subject: `Quote request ${id}: ${q.mode === "tires" ? `${q.qty} x ${q.size} (${q.condition})` : q.mode === "wheels" ? `${q.qty} wheels ${q.wheelSize ?? ""}` : `wheel & tire package ${q.wheelSize ?? ""}`}`,
        text: `${message}\n\nCustomer phone: ${q.phone ?? "(sent through WhatsApp)"}\nLanguage: ${q.lang}\nPage: ${q.source ?? "-"}\nRef: ${id}`,
      }),
    }));
  }
  if (env.LEADS) {
    delivered.push("kv");
    jobs.push(env.LEADS.put(`lead:${lead.receivedAt}:${id}`, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 365 }));
  }
  if (jobs.length) waitUntil(Promise.allSettled(jobs));

  const body: QuoteResponse = { ok: true, id, whatsappUrl: whatsappUrl(site.whatsapp, message), delivered };
  return json(body, 201);
};

export const onRequestOptions: PagesFunction = async () => new Response(null, { status: 204, headers: { allow: "POST, OPTIONS" } });
export const onRequestGet: PagesFunction = async () => fail(405, "method_not_allowed", "Use POST.");
