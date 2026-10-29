// Helpers for the Cloudflare Pages Functions in /functions/api. Server-side only.
import type { ApiError } from "./api-types";

export interface Env {
  /** Optional: POST every quote request as JSON to this URL (Zapier, Make, n8n, a CRM, your own backend). */
  QUOTE_WEBHOOK_URL?: string;
  /** Optional: email every quote request through Resend. */
  RESEND_API_KEY?: string;
  QUOTE_EMAIL_TO?: string;   // e.g. the shop's inbox
  QUOTE_EMAIL_FROM?: string; // a verified Resend sender, e.g. "Reyes Tires Pro <quotes@reyestirespro.com>"
  /** Optional: Cloudflare KV namespace binding to keep a copy of every lead. */
  LEADS?: KVNamespace;
  /** Optional: base URL of a future inventory service; /api/inventory proxies to it. */
  INVENTORY_API_URL?: string;
  INVENTORY_API_KEY?: string;
}

const baseHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...baseHeaders, ...extra } });
}

export function fail(status: number, error: string, message: string): Response {
  const body: ApiError = { ok: false, error, message };
  return json(body, status);
}

/** Only accept browser POSTs from our own site (no Origin header = server-to-server, allowed). */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = new URL(req.url).host;
  try {
    const o = new URL(origin);
    return o.host === host || o.hostname === "localhost" || o.hostname.endsWith(".pages.dev");
  } catch { return false; }
}

export const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : undefined);
