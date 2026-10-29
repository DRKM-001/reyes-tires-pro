import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services, serviceHref } from "@/lib/services";
import { allSizes, sizeHref } from "@/lib/sizes";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: [string, string, number][] = [
    ["/", "/es/", 1],
    ["/services/", "/es/servicios/", 0.9],
    ["/tires/", "/es/llantas/", 0.9],
    ...services.map((s) => [serviceHref(s, "en"), serviceHref(s, "es"), 0.8] as [string, string, number]),
    ...allSizes().map((f) => [sizeHref(f, "en"), sizeHref(f, "es"), 0.7] as [string, string, number]),
    ["/tire-size-guide/", "/es/medidas-de-llantas/", 0.6],
    ["/tire-basics/", "/es/llantas-basico/", 0.6],
  ];
  return pairs.flatMap(([en, es, priority]) => [en, es].map((p) => ({
    url: `${site.url}${p}`, priority,
    alternates: { languages: { en: `${site.url}${en}`, es: `${site.url}${es}` } },
  })));
}
