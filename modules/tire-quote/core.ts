// Tire Quote module: core logic. No React, no shop-specific data.
// Used by the browser (quote card, WhatsApp buttons) and by the /api/quote endpoint.

export type Lang = "en" | "es";
export type Condition = "used" | "new" | "either";
export type Qty = 1 | 2 | 4;

export type QuoteMode = "tires" | "wheels" | "package";

export interface QuoteDraft {
  mode?: QuoteMode;     // default "tires"
  size: string;         // tire size (tires; optional for package)
  qty: Qty;
  condition: Condition; // tires only
  wheelSize?: string;   // wheels / package: rim diameter in inches, e.g. "20"
  style?: string;       // wheels / package: finish or look, e.g. "black", "chrome"
  vehicle?: string;
  name?: string;
  notes?: string;
}

/** Wheel diameter from loose input: '20', '20"', '20 in', 'r20' -> "20" ("" when not a sane rim size). */
export function normalizeWheelSize(input?: string): string {
  const m = (input || "").match(/(\d{2})(?:\.(5))?/);
  if (!m) return "";
  const d = +m[1];
  return d >= 13 && d <= 30 ? (m[2] ? `${d}.5` : `${d}`) : "";
}

/** True when the draft holds enough to send a specific request (vs. the generic hello). */
export function draftReady(q: Partial<QuoteDraft>): boolean {
  const mode = q.mode ?? "tires";
  if (mode === "tires") return isPlausibleSize(normalizeSize(q.size || ""));
  return !!(normalizeWheelSize(q.wheelSize) || (q.vehicle || "").trim().length >= 3 || (mode === "package" && isPlausibleSize(normalizeSize(q.size || ""))));
}

export type SizeKind = "metric" | "flotation" | "truck" | "unknown";

export interface ParsedSize {
  /** Normalized text, e.g. "225/45R17", "LT265/70R17", "35X12.50R17", "11R22.5". */
  size: string;
  kind: SizeKind;
  /** True when the size reads as a real tire size (sane width, aspect and rim). */
  valid: boolean;
}

const RIMS = (r: number) => (r >= 10 && r <= 30) || [16.5, 17.5, 19.5, 22.5, 24.5].includes(r);

/**
 * Read a tire size however people type it:
 *  metric     "2254517", "225 45 17", "225-45-17", "p225/45r17", "LT2657017", "245/40zr18" -> 225/45R17 ...
 *  flotation  "35x1250r17", "35 12.50 17", "35125017", "31x10.5r15", "33/12.5/20" -> 35X12.50R17 ...
 *  truck      "11r22.5", "11 22.5", "295/75r22.5" -> 11R22.5, 295/75R22.5
 */
export function parseSize(input: string): ParsedSize {
  const raw = (input || "").toUpperCase().trim();
  const t = raw.replace(/[,]/g, ".").replace(/\s+/g, " ");
  if (!t) return { size: "", kind: "unknown", valid: false };

  // prefix (P = passenger, dropped; LT/ST kept)
  const pm = t.match(/^(LT|ST|P)\s*/);
  const prefix = pm && pm[1] !== "P" ? pm[1] : "";
  const body = pm ? t.slice(pm[0].length) : t;
  const compact = body.replace(/[^0-9.XRZ]/g, "");         // drop spaces, slashes, dashes
  const digits = body.replace(/\D/g, "");

  // 1) Metric with separators: 225 / 45 [Z]R 17[.5]
  let m = body.match(/^(\d{3})\s*[/\-.\s]\s*(\d{2})\s*(ZR|R|B|D|[/\-.\s])?\s*(\d{2}(?:\.5)?)(?!\d)/);
  if (!m) {
    const tm = body.match(/^(\d{3})\s*[/\-.\s]\s*(\d{2})\s*(R|[/\-.\s])?\s*((?:16|17|19|22|24)5)$/);
    if (tm) m = [tm[0], tm[1], tm[2], tm[3], `${tm[4].slice(0, 2)}.5`] as unknown as RegExpMatchArray;
  }
  // 2) Metric digits only: 2254517 or 22545R17 / 22545ZR17
  if (!m) {
    const d = compact.match(/^(\d{3})(\d{2})(ZR|R)?(\d{2}(?:\.5)?|(?:16|17|19|22|24)5)$/);
    if (d) m = [d[0], d[1], d[2], d[3], d[4].length === 3 ? `${d[4].slice(0, 2)}.5` : d[4]] as unknown as RegExpMatchArray;
  }
  if (m) {
    const w = +m[1], a = +m[2], r = +m[4];
    const cons = m[3] === "ZR" ? "ZR" : "R";
    const valid = w >= 125 && w <= 395 && a >= 25 && a <= 95 && RIMS(r);
    return { size: `${prefix}${m[1]}/${m[2]}${cons}${m[4]}`, kind: "metric", valid };
  }

  // 3) Flotation with separators: 35 X 12.50 R 17 ("X1250" / "X105" read as 12.50 / 10.5)
  const fb = body.replace(/^(\d{2})\s*X\s*(\d{1,2}?)(50|5)(?=\s*[RX\-/\s])/, "$1X$2.$3");
  let f = fb.match(/^(\d{2})\s*[X/\-\s]\s*(\d{1,2}(?:\.\d{1,2})?)\s*(R|X|[/\-\s])\s*(\d{2}(?:\.5)?)(?!\d)/);
  // 4) Flotation digits only: 35125017 / 3512.5017 / 31105R15
  if (!f) {
    const d = compact.match(/^(\d{2})X?(\d{1,2})\.?(\d{1,2})R?(\d{2})$/);
    if (d && (d[3] === "50" || d[3] === "5")) f = [d[0], d[1], `${d[2]}.${d[3]}`, "R", d[4]] as unknown as RegExpMatchArray;
  }
  if (f) {
    const dia = +f[1], wid = +f[2], r = +f[4];
    const width = f[2].includes(".") ? (+f[2]).toFixed(2) : f[2];
    const valid = dia >= 26 && dia <= 44 && wid >= 7 && wid <= 18 && RIMS(r) && dia > r;
    if (valid) return { size: `${prefix}${dia}X${width}R${f[4]}`, kind: "flotation", valid };
  }

  // 5) Truck / commercial: 11R22.5, 11 22.5, 11-24.5, and digits only: 11225, 1122.5, 11r225, 8195
  //    Truck rims always end in .5 (16.5, 17.5, 19.5, 22.5, 24.5).
  const tr = compact.match(/^(\d{1,2})R?(16|17|19|22|24)\.?5$/);
  if (tr) {
    const w = +tr[1];
    return { size: `${prefix}${tr[1]}R${tr[2]}.5`, kind: "truck", valid: w >= 7 && w <= 12 };
  }

  // Anything else: tidy and pass along exactly what they meant
  const tidy = (prefix + body).replace(/\s+/g, "").replace(/[^0-9A-Z/.\-]/g, "").slice(0, 24);
  return { size: tidy, kind: "unknown", valid: false };
}

/** Normalized size text (see parseSize). */
export function normalizeSize(input: string): string {
  return parseSize(input).size;
}

/** Worth sending as a size: a recognized size, or at least something with digits we can pass along as typed. */
export function isPlausibleSize(size: string): boolean {
  const p = parseSize(size);
  return p.valid || (p.size.replace(/\D/g, "").length >= 4);
}

const cond: Record<Lang, Record<Condition, string>> = {
  en: { used: "used", new: "new", either: "used or new" },
  es: { used: "usadas", new: "nuevas", either: "usadas o nuevas" },
};

export const genericMessage: Record<Lang, string> = {
  en: "Hi, I would like to get a quote on tires.",
  es: "Hola, quisiera un precio de llantas.",
};

export const genericByMode: Record<Lang, Record<"wheels" | "package", string>> = {
  en: { wheels: "Hi, I would like a quote on wheels.", package: "Hi, I would like a quote on a wheel & tire package." },
  es: { wheels: "Hola, quisiera un precio de rines.", package: "Hola, quisiera un precio de un paquete de rines con llantas." },
};

export const photoMessage: Record<Lang, string> = {
  en: "Hi, I'd like a quote. I'll send a photo of my tire's sidewall.",
  es: "Hola, quisiera un precio. Le mando una foto del costado de mi llanta.",
};

/** The WhatsApp message for a draft. Falls back to the generic message when the draft is not ready. */
export function quoteMessage(q: Partial<QuoteDraft> & { lang: Lang }): string {
  const mode = q.mode ?? "tires";
  if (!draftReady(q)) return mode === "tires" ? genericMessage[q.lang] : genericByMode[q.lang][mode];
  const qty = (q.qty ?? 4) as Qty;
  const c = q.condition ?? "either";
  const size = normalizeSize(q.size || "");
  const hasTire = isPlausibleSize(size);
  const wheel = normalizeWheelSize(q.wheelSize);
  const es = q.lang === "es";
  const lines: string[] = [];
  const wheelsWord = es ? `rin${qty === 1 ? "" : "es"}` : `wheel${qty === 1 ? "" : "s"}`;
  const inch = wheel ? (es ? ` de ${wheel}"` : ` (${wheel}")`) : "";

  if (mode === "tires") {
    lines.push(es
      ? `Hola, quisiera un precio para ${qty} llanta${qty === 1 ? "" : "s"} ${cond.es[c]}, medida ${size}.`
      : `Hi, I would like a quote for ${qty} ${cond.en[c]} tire${qty === 1 ? "" : "s"}, size ${size}.`);
  } else if (mode === "wheels") {
    lines.push(es
      ? `Hola, quisiera un precio para ${qty} ${wheelsWord}${inch}.`
      : `Hi, I would like a quote for ${qty} ${wheelsWord}${inch}.`);
  } else {
    const tirePart = hasTire ? (es ? `con llantas ${cond.es[c]} ${size}` : `with ${cond.en[c]} ${size} tires`) : (es ? "con llantas (recomiéndenme la medida)" : "with tires (please recommend the size)");
    lines.push(es
      ? `Hola, quisiera un precio para un paquete de ${qty} ${wheelsWord}${inch} ${tirePart}.`
      : `Hi, I would like a quote for a wheel & tire package: ${qty} ${wheelsWord}${inch} ${tirePart}.`);
  }
  if (q.vehicle) lines.push(`${es ? "Vehículo" : "Vehicle"}: ${q.vehicle}`);
  if (mode !== "tires" && q.style) lines.push(`${es ? "Estilo" : "Style"}: ${q.style}`);
  if (q.name) lines.push(`${es ? "Nombre" : "Name"}: ${q.name}`);
  if (q.notes) lines.push(q.notes);
  return lines.join("\n");
}

export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
