import type { Condition, Lang, QuoteRequest } from "./api-types";
import { site } from "./site";

/** Normalize what people type: "p225 / 45 r17" -> "225/45R17". */
export function normalizeSize(input: string): string {
  const up = input.toUpperCase().trim();
  // Metric sizes typed loosely: "p225 45 r17", "225-45-17", "LT 265/70 R 17", "245/40ZR18"
  const m = up.match(/^(LT|ST|P)?\s*(\d{3})\s*[\s/\-]\s*(\d{2})\s*(ZR|R|B|D|-|\s)?\s*(\d{2}(?:\.5)?)\b/);
  if (m) {
    const prefix = m[1] === "LT" || m[1] === "ST" ? m[1] : "";
    const cons = m[4] && m[4].trim() && m[4] !== "-" ? m[4] : "R";
    return `${prefix}${m[2]}/${m[3]}${cons}${m[5]}`;
  }
  // Anything else (flotation sizes like 33X12.50R20): just tidy it.
  return up.replace(/\s+/g, "").replace(/^P(?=\d)/, "").replace(/[^0-9A-Z/.\-]/g, "").slice(0, 24);
}

/** Loose check: must contain digits and a slash or an R, like 225/45R17, 33X12.50R20, LT265/70R17. */
export function isPlausibleSize(size: string): boolean {
  return size.length >= 5 && /\d/.test(size) && /[/R]/.test(size);
}

const cond: Record<Lang, Record<Condition, string>> = {
  en: { used: "used", new: "new", either: "used or new" },
  es: { used: "usadas", new: "nuevas", either: "usadas o nuevas" },
};

export function quoteMessage(q: Pick<QuoteRequest, "size" | "qty" | "condition" | "lang" | "name" | "vehicle" | "notes">): string {
  const size = normalizeSize(q.size || "");
  const lines: string[] = [];
  if (q.lang === "es") {
    lines.push(isPlausibleSize(size)
      ? `Hola, quisiera un precio para ${q.qty} llanta${q.qty === 1 ? "" : "s"} ${cond.es[q.condition]}, medida ${size}.`
      : "Hola, quisiera un precio de llantas.");
    if (q.vehicle) lines.push(`Vehículo: ${q.vehicle}`);
    if (q.name) lines.push(`Nombre: ${q.name}`);
  } else {
    lines.push(isPlausibleSize(size)
      ? `Hi, I would like a quote for ${q.qty} ${cond.en[q.condition]} tire${q.qty === 1 ? "" : "s"}, size ${size}.`
      : "Hi, I would like to get a quote on tires.");
    if (q.vehicle) lines.push(`Vehicle: ${q.vehicle}`);
    if (q.name) lines.push(`Name: ${q.name}`);
  }
  if (q.notes) lines.push(q.notes);
  return lines.join("\n");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
