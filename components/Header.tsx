"use client";

import { useState } from "react";
import { Phone, Menu, X, Languages } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import Wordmark from "./Wordmark";
import { track } from "./track";

export default function Header({ lang, home = true }: { lang: Lang; home?: boolean }) {
  const t = dicts[lang];
  const [open, setOpen] = useState(false);
  // On guide pages the section links point back to the home page.
  const href = (h: string) => (home ? h : `${t.home}${h}`);
  const links = [...t.nav.map((l) => ({ ...l, href: href(l.href), wide: false })), ...t.guidesNav.map((l, i) => ({ ...l, wide: i > 0 }))];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/70 bg-sand-50/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">{t.skip}</a>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <a href={t.home} aria-label={`${site.name}, ${site.slogan}`}><Wordmark /></a>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.filter((l) => !l.wide).map((l) => (
            <a key={l.href} href={l.href} className={`whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-stone-750 transition-colors hover:text-blaze-600`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={t.otherLang.href} hrefLang={t.otherLang.lang} lang={t.otherLang.lang}
             className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-stone-750 hover:text-blaze-600 sm:flex">
            <Languages className="h-4 w-4 text-royal-500" />{t.otherLang.label}
          </a>
          <a href={site.phoneHref} onClick={() => track("call")} className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-stone-850 xl:flex">
            <Phone className="h-4 w-4 text-blaze-600" />{site.phone}
          </a>
          <a href={href("#quote")} className="whitespace-nowrap rounded-md bg-blaze-500 px-3.5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-blaze-600 sm:px-4">
            {t.getQuote}
          </a>
          <button aria-label={t.menu} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="p-1 lg:hidden">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-sand-200 bg-sand-50 lg:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-[15px] font-medium text-stone-750">{l.label}</a>
            ))}
            <a href={t.otherLang.href} hrefLang={t.otherLang.lang} className="flex items-center gap-2 py-2.5 text-[15px] font-semibold text-royal-600">
              <Languages className="h-4 w-4" />{t.otherLang.label}
            </a>
            <a href={site.phoneHref} onClick={() => track("call")} className="py-2.5 text-[15px] font-semibold text-blaze-600">
              {t.call} {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
