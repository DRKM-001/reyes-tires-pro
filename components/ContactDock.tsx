"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { track } from "./track";

/** Phones: a 3-button bar fixed to the bottom. Desktop: a floating WhatsApp button after scrolling. */
export default function ContactDock({ lang }: { lang: Lang; }) {
  const t = dicts[lang];
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.lang === "es" ? "Hola, quisiera un precio de llantas." : "Hi, I would like to get a quote on tires.")}`;

  return (
    <>
      <nav aria-label="Quick contact" className="safe-bottom fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-sand-200 bg-sand-50/95 px-2 pt-2 backdrop-blur lg:hidden">
        <a href={site.phoneHref} onClick={() => track("call")} className="flex flex-col items-center gap-0.5 rounded-lg bg-blaze-500 py-2 text-[13px] font-bold uppercase tracking-wide text-white"><Phone className="h-5 w-5" />{t.thumb.call}</a>
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp")} className="flex flex-col items-center gap-0.5 rounded-lg bg-wa-500 py-2 text-[13px] font-bold uppercase tracking-wide text-ink-950"><WhatsAppIcon className="h-5 w-5" />{t.thumb.wa}</a>
        <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track("directions")} className="flex flex-col items-center gap-0.5 rounded-lg bg-ink-900 py-2 text-[13px] font-bold uppercase tracking-wide text-sand-50"><MapPin className="h-5 w-5" />{t.thumb.dir}</a>
      </nav>

      <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp")} aria-label={t.fab}
        className={`group fixed bottom-6 right-6 z-[60] hidden items-center overflow-hidden rounded-full bg-wa-500 text-ink-950 shadow-lg shadow-black/25 transition-all duration-300 hover:bg-wa-600 lg:flex ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="pointer-events-none absolute inset-0 rounded-full bg-wa-500 opacity-60 motion-safe:animate-ping" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
        <span className="max-w-0 whitespace-nowrap font-bold uppercase tracking-wide transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-5">{t.fab}</span>
      </a>
    </>
  );
}
