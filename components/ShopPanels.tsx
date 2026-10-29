"use client";

import { useState } from "react";
import { MapPin, Wrench, Car, Disc3, ArrowRight } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";

const icons = [MapPin, Wrench, Car, Disc3];

export default function ShopPanels({ lang }: { lang: Lang; }) {
  const t = dicts[lang];
  const s = t.shop;
  const [active, setActive] = useState(0);
  return (
    <section id="shop" className="relative scroll-mt-16 overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div className="absolute inset-0 bg-grain opacity-[0.07]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-stripes opacity-30 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <span className="clip-slash inline-block bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">{s.chip}</span>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-sand-50 sm:text-5xl">
            {s.h2a} <span className="display-italic text-blaze-500">{s.h2b}</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-sand-200/85">{s.p}</p>
        </div>

        <div className="mt-12 flex h-[600px] flex-col gap-2.5 lg:h-[500px] lg:flex-row">
          {s.panels.map((p, i) => {
            const on = active === i;
            const Icon = icons[i];
            return (
              <button key={p.title} type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-expanded={on}
                style={{ flexGrow: on ? 6 : 1 }}
                className={`group relative min-h-0 min-w-0 overflow-hidden rounded-xl border text-left transition-[flex-grow,border-color] duration-500 ease-out ${on ? "border-blaze-500/60" : "border-sand-200/10"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.title} loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${on ? "scale-100 grayscale-0" : "scale-105 grayscale"}`} />
                <div className={`absolute inset-0 transition-opacity duration-500 ${on ? "bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/5" : "bg-ink-950/65"}`} />
                <span className="pointer-events-none absolute right-3 top-2 font-display text-6xl font-bold text-sand-50/15">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Icon className="h-7 w-7 text-blaze-500" />
                  <h3 className={`mt-3 font-display font-bold uppercase tracking-wide text-sand-50 transition-all duration-300 ${on ? "text-2xl" : "text-lg"}`}>{p.title}</h3>
                  <p className={`max-w-md text-[15px] leading-relaxed text-sand-200/85 transition-all duration-300 ${on ? "mt-2 max-h-32 opacity-100" : "pointer-events-none mt-0 max-h-0 opacity-0"}`}>{p.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <a href="#quote" className="group mt-10 inline-flex items-center gap-2 rounded-md bg-blaze-500 px-7 py-3.5 font-bold uppercase tracking-wide text-white shadow-blaze transition-colors hover:bg-blaze-600">
          {t.getQuote}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
