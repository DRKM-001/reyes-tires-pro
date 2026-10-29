// Tire-size landing pages. Seeded with common sizes on the road in San Diego County
// (passenger, SUV/light truck, off-road flotation, commercial). Grow this list from real
// demand: GA4 "whatsapp_quote" events carry the size customers asked for.
import { parseSize, type SizeKind } from "../modules/tire-quote/core";

export const SIZE_LIST = [
  // Passenger
  "195/65R15", "205/55R16", "205/65R16", "215/55R17", "215/60R16", "215/65R16", "225/45R17", "225/55R17",
  "225/60R16", "225/60R17", "225/65R17", "235/45R18", "235/55R18", "235/65R17", "245/45R18",
  // SUV / light truck
  "245/75R16", "265/65R18", "265/70R16", "265/70R17", "275/55R20", "275/60R20",
  "LT245/75R16", "LT265/75R16", "LT275/70R18",
  // Off-road (flotation)
  "31X10.50R15", "33X12.50R18", "33X12.50R20", "35X12.50R17", "35X12.50R20",
  // Commercial truck
  "11R22.5", "295/75R22.5",
] as const;

export interface SizeFacts {
  size: string; slug: string; kind: SizeKind; rim: number;
  widthMm?: number; aspect?: number; sidewallMm?: number; sidewallIn?: number;
  diameterIn?: number; widthIn?: number; revsPerMile?: number; prefix?: string;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export const sizeSlug = (size: string) => size.toLowerCase().replace("/", "-").replace(/\./g, "-");

export function sizeFacts(size: string): SizeFacts {
  const p = parseSize(size);
  const s = p.size;
  const base = { size: s, slug: sizeSlug(s), kind: p.kind };
  if (p.kind === "metric") {
    const m = s.match(/^(LT|ST)?(\d{3})\/(\d{2})Z?R(\d{2}(?:\.5)?)$/)!;
    const w = +m[2], a = +m[3], rim = +m[4];
    const side = (w * a) / 100;
    const dia = rim + (2 * side) / 25.4;
    return { ...base, prefix: m[1] || "", rim, widthMm: w, aspect: a, sidewallMm: Math.round(side), sidewallIn: r1(side / 25.4),
      diameterIn: r1(dia), widthIn: r1(w / 25.4), revsPerMile: Math.round(63360 / (Math.PI * dia)) };
  }
  if (p.kind === "flotation") {
    const m = s.match(/^(?:LT)?(\d{2})X(\d{1,2}(?:\.\d{2})?)R(\d{2})$/)!;
    const dia = +m[1], wid = +m[2], rim = +m[3];
    return { ...base, rim, diameterIn: dia, widthIn: wid, sidewallIn: r1((dia - rim) / 2), revsPerMile: Math.round(63360 / (Math.PI * dia)) };
  }
  const m = s.match(/R(\d{2}(?:\.5)?)$/);
  return { ...base, rim: m ? +m[1] : 0 };
}

export const allSizes = () => SIZE_LIST.map((s) => sizeFacts(s));
export const findSize = (slug: string) => allSizes().find((f) => f.slug === slug);
export const sizeBase = { en: "/tires/", es: "/es/llantas/" } as const;
export const sizeHref = (f: SizeFacts, lang: "en" | "es") => `${sizeBase[lang]}${f.slug}/`;
