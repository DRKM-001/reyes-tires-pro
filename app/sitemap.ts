import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export const dynamic = "force-static";

const pairs: [string, string, number][] = [
  ["/", "/es/", 1],
  ["/tire-size-guide/", "/es/medidas-de-llantas/", 0.8],
  ["/tire-basics/", "/es/llantas-basico/", 0.8],
];

export default function sitemap(): MetadataRoute.Sitemap {
  
  return pairs.flatMap(([en, es, priority]) => [en, es].map((p) => ({
    url: `${site.url}${p}`, priority,
    alternates: { languages: { en: `${site.url}${en}`, es: `${site.url}${es}` } },
  })));
}
