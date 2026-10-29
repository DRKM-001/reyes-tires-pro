import type { Metadata } from "next";
import { site } from "./site";

/** Page metadata with canonical + English/Spanish alternates. */
export function pageMeta(o: { title: string; description: string; path: string; enPath: string; esPath: string; lang: "en" | "es"; type?: "website" | "article" }): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: o.title,
    description: o.description,
    alternates: { canonical: o.path, languages: { en: o.enPath, es: o.esPath, "x-default": o.enPath } },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      type: o.type ?? "website", url: o.path, siteName: site.name, locale: o.lang === "es" ? "es_US" : "en_US",
      title: o.title, description: o.description, images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: ["/og.png"] },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
    other: { "geo.region": "US-CA", "geo.placename": "Escondido" },
  };
}
