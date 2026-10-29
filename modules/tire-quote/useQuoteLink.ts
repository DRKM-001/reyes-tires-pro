"use client";
import { useDraft } from "./store";
import { quoteMessage, whatsappUrl, parseSize, isPlausibleSize, type Lang } from "./core";

/** WhatsApp link that carries the customer's typed size (or the generic message when there is none). */
export function useQuoteLink(number: string, lang: Lang) {
  const d = useDraft();
  const parsed = parseSize(d.size);
  const size = parsed.size;
  const hasSize = isPlausibleSize(size);
  const message = quoteMessage({ ...d, size, lang });
  return { href: whatsappUrl(number, message), message, size: hasSize ? size : "", hasSize, valid: parsed.valid, kind: parsed.kind, draft: d };
}
