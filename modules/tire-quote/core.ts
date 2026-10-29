// Tire Quote module: core logic. No React, no shop-specific data.
// Used by the browser (quote card, WhatsApp buttons) and by the /api/quote endpoint.

export type Lang = "en" | "es";
export type Condition = "used" | "new" | "either";
export type Qty = 1 | 2 | 4;

export interface QuoteDraft {
  size: string;
  qty: Qty;
  condition: Condition;
  vehicle?: string;
  name?: string;
  notes?: string;
}

/** Normalize what people type: "p225 45 r17" -> "225/45R17", "LT 265/70 R 17" -> "LT265/70R17". */
export function normalizeSize(input: string): string {
  const up = (input || "").toUpperCase().trim();
  const m = up.match(/^(LT|ST|P)?\s*(\d{3})\s*[\s/\-]\s*(\d{2})\s*(ZR|R|B|D|-|\s)?\s*(\d{2}(?:\.5)?)\b/);
  if (m) {
    const prefix = m[1] === "LT" || m[1] === "ST" ? m[1] : "";
    const cons = m[4] && m[4].trim() && m[4] !== "-" ? m[4] : "R";
    return `${prefix}${m[2]}/${m[3]}${cons}${m[5]}`;
  }
  // Anything else (flotation sizes like 33X12.50R20): just tidy it.
  return up.replace(/\s+/g, "").replace(/^P(?=\d)/, "").replace(/[^0-9A-Z/.\-]/g, "").slice(0, 24);
}

/** Loose check: digits plus a slash or an R, like 225/45R17, 33X12.50R20, LT265/70R17. */
export function isPlausibleSize(size: string): boolean {
  return size.length >= 5 && /\d/.test(size) && /[/R]/.test(size);
}

const cond: Record<Lang, Record<Condition, string>> = {
  en: { used: "used", new: "new", either: "used or new" },
  es: { used: "usadas", new: "nuevas", either: "usadas o nuevas" },
};

export const genericMessage: Record<Lang, string> = {
  en: "Hi, I would like to get a quote on tires.",
  es: "Hola, quisiera un precio de llantas.",
};

export const photoMessage: Record<Lang, string> = {
  en: "Hi, I'd like a quote. I'll send a photo of my tire's sidewall.",
  es: "Hola, quisiera un precio. Le mando una foto del costado de mi llanta.",
};

/** The WhatsApp message for a draft. Falls back to the generic message when there is no usable size. */
export function quoteMessage(q: Partial<QuoteDraft> & { lang: Lang }): string {
  const size = normalizeSize(q.size || "");
  if (!isPlausibleSize(size)) return genericMessage[q.lang];
  const qty = (q.qty ?? 4) as Qty;
  const c = q.condition ?? "either";
  const lines: string[] = [];
  if (q.lang === "es") {
    lines.push(`Hola, quisiera un precio para ${qty} llanta${qty === 1 ? "" : "s"} ${cond.es[c]}, medida ${size}.`);
    if (q.vehicle) lines.push(`Vehículo: ${q.vehicle}`);
    if (q.name) lines.push(`Nombre: ${q.name}`);
  } else {
    lines.push(`Hi, I would like a quote for ${qty} ${cond.en[c]} tire${qty === 1 ? "" : "s"}, size ${size}.`);
    if (q.vehicle) lines.push(`Vehicle: ${q.vehicle}`);
    if (q.name) lines.push(`Name: ${q.name}`);
  }
  if (q.notes) lines.push(q.notes);
  return lines.join("\n");
}

export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
