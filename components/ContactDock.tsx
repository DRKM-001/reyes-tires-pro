"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import ShopWaLink from "./ShopWaLink";
import { track } from "./track";

/** Phones: a 3-button bar fixed to the bottom. Desktop: a floating WhatsApp button after scrolling.
 *  Both carry the quote draft, and both step aside while the quote form itself is on screen. */
export default function ContactDock({ lang }: { lang: Lang }) {
  const t = dicts[lang];
  const [scrolled, setScrolled] = useState(false);
  const [quoteInView, setQuoteInView] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const q = document.getElementById("quote");
    let io: IntersectionObserver | undefined;
    if (q && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([e]) => setQuoteInView(e.isIntersecting), { threshold: 0.15 });
      io.observe(q);
    }
    return () => { window.removeEventListener("scroll", on); io?.disconnect(); };
  }, []);

  const hideBar = quoteInView;
  return (
    <>
      <nav aria-label="Quick contact" aria-hidden={hideBar}
        className={`safe-bottom fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-sand-200 bg-sand-50/95 px-2 pt-2 backdrop-blur transition-transform duration-300 lg:hidden ${hideBar ? "pointer-events-none translate-y-full" : "translate-y-0"}`}>
        <a href={site.phoneHref} onClick={() => track("call")} tabIndex={hideBar ? -1 : 0} className="flex flex-col items-center gap-0.5 rounded-lg bg-blaze-500 py-2 text-[13px] font-bold uppercase tracking-wide text-white"><Phone className="h-5 w-5" />{t.thumb.call}</a>
        <ShopWaLink lang={lang} label="short" className="flex min-w-0 flex-col items-center gap-0.5 rounded-lg bg-wa-500 px-1 py-2 text-[13px] font-bold uppercase tracking-wide text-ink-950">
          <WhatsAppIcon className="h-5 w-5" />
        </ShopWaLink>
        <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track("directions")} tabIndex={hideBar ? -1 : 0} className="flex flex-col items-center gap-0.5 rounded-lg bg-ink-900 py-2 text-[13px] font-bold uppercase tracking-wide text-sand-50"><MapPin className="h-5 w-5" />{t.thumb.dir}</a>
      </nav>

      <ShopWaLink lang={lang}
        className={`group fixed bottom-6 right-6 z-[60] hidden items-center overflow-hidden rounded-full bg-wa-500 text-ink-950 shadow-lg shadow-black/25 transition-all duration-300 hover:bg-wa-600 lg:flex ${scrolled && !quoteInView ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="pointer-events-none absolute inset-0 rounded-full bg-wa-500 opacity-60 motion-safe:animate-ping" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
        <span className="max-w-0 whitespace-nowrap font-bold uppercase tracking-wide transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-5">{t.fab}</span>
      </ShopWaLink>
    </>
  );
}
