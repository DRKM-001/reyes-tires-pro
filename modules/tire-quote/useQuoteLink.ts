"use client";
import { useDraft } from "./store";
import { quoteMessage, whatsappUrl, parseSize, isPlausibleSize, draftReady, normalizeWheelSize, type Lang } from "./core";

/** WhatsApp link that carries the customer's typed size (or the generic message when there is none). */
export function useQuoteLink(number: string, lang: Lang) {
  const d = useDraft();
  const parsed = parseSize(d.size);
  const size = parsed.size;
  const mode = d.mode ?? "tires";
  const ready = draftReady(d);
  const hasSize = isPlausibleSize(size);
  const message = quoteMessage({ ...d, size, lang });
  // Short label for buttons elsewhere on the page ("Send 225/45R17", "Send 20\" wheels")
  const wheel = normalizeWheelSize(d.wheelSize);
  const label = !ready ? "" : mode === "tires" ? size : mode === "wheels" ? (wheel ? (lang === "es" ? `rines ${wheel}"` : `${wheel}" wheels`) : (lang === "es" ? "rines" : "wheels")) : (lang === "es" ? "combo" : "combo");
  return { href: whatsappUrl(number, message), message, mode, ready, label, size: hasSize ? size : "", hasSize: ready, valid: parsed.valid, kind: parsed.kind, draft: d };
}
