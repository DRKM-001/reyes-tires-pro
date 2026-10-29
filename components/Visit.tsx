"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { shopNow } from "@/lib/hours";
import { WhatsAppIcon } from "./icons";
import OpenStatus from "./OpenStatus";
import ShopWaLink from "./ShopWaLink";
import { track } from "./track";

export default function Visit({ lang }: { lang: Lang; }) {
  const t = dicts[lang];
  const v = t.visit;
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(shopNow().day), []);
  const order = [1, 2, 3, 4, 5, 6, 0];
  const card = "flex items-start gap-4 rounded-lg border border-sand-200 bg-white p-5 shadow-card transition-colors hover:border-blaze-400";

  return (
    <section id="visit" className="scroll-mt-16 bg-sand-100/60 py-20 sm:py-24">
      <div className="container-x">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-blaze-600">{v.chip}</p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">{v.h2}</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
          <div className="space-y-4">
            <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track("directions")} className={card}>
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blaze-600" />
              <div>
                <p className="font-semibold text-stone-850">{v.address}</p>
                <p className="text-stone-750">{site.address}</p>
                <p className="text-sm text-stone-750/80">{v.corner}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blaze-600">{v.dir}<ArrowRight className="h-3.5 w-3.5" /></p>
              </div>
            </a>
            <a href={site.phoneHref} onClick={() => track("call")} className={card}>
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blaze-600" />
              <div>
                <p className="font-semibold text-stone-850">{v.phone}</p>
                <p className="text-stone-750">{site.phone}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blaze-600">{v.tapCall}<ArrowRight className="h-3.5 w-3.5" /></p>
              </div>
            </a>
            <ShopWaLink lang={lang} className={card}>
              <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-wa-600" />
              <div>
                <p className="font-semibold text-stone-850">{v.whatsapp}</p>
                <p className="text-stone-750">{site.whatsappDisplay}</p>
                <p className="mt-1 text-sm font-semibold text-wa-600">{v.anytime}</p>
              </div>
            </ShopWaLink>
          </div>

          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blaze-600" />
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-stone-850">{v.hours}</h3>
            </div>
            <OpenStatus lang={t.lang} className="mt-3 text-stone-750" />
            <ul className="mt-4 divide-y divide-sand-200">
              {order.map((d, i) => {
                const isToday = today === d;
                return (
                  <li key={d} className={`flex justify-between py-2.5 text-[15px] ${isToday ? "font-bold text-blaze-600" : "text-stone-750"}`}>
                    <span>{v.days[i]}{isToday && <span className="ml-2 rounded bg-blaze-50 px-1.5 py-0.5 text-[11px] uppercase">{v.today}</span>}</span>
                    <span>{d === 0 ? v.sun : v.week}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-h-[320px] overflow-hidden rounded-xl border border-sand-200 bg-sand-100 shadow-card">
            <iframe src={site.mapEmbed} title={v.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[320px] w-full border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
