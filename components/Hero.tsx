import { Star, MapPin, ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import QuoteCard from "./QuoteCard";
import OpenStatus from "./OpenStatus";

export default function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  return (
    <section id="top" className="relative overflow-hidden bg-ink-900">
      {/* Dark backdrop; a hero photo from the shop drops in here later (public/hero.jpg). */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(31,111,224,0.24),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(209,31,39,0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-stripes opacity-25 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-blaze-500" />

      <div className="container-x relative z-10 grid w-full gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="clip-slash bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">{h.chip}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-sand-200/80">{h.place}</span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-sand-50 text-balance sm:text-6xl lg:text-7xl">
            {h.h1a} <span className="display-italic text-blaze-500">{h.h1b}</span>
          </h1>
          <span className="speed-bar mt-5 w-28 bg-royal-500" />

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-200/90">{h.lede}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#quote" className="group inline-flex items-center gap-2 rounded-md bg-blaze-500 px-6 py-3.5 font-bold uppercase tracking-wide text-white shadow-blaze transition-colors hover:bg-blaze-600">
              {h.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" data-track="directions"
               className="inline-flex items-center gap-2 rounded-md border border-sand-200/25 px-6 py-3.5 font-semibold text-sand-50 transition-colors hover:bg-sand-50/5">
              <MapPin className="h-4 w-4 text-blaze-400" />{h.directions}
            </a>
          </div>

          <div className="mt-9 space-y-3">
            <a href={site.reviewsHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sand-200 hover:text-sand-50">
              <span className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</span>
              <span className="text-sm font-medium">{h.rating(site.rating, site.reviewCount)}</span>
            </a>
            <OpenStatus lang={t.lang} className="text-sand-200/90" />
          </div>
        </div>

        <QuoteCard lang={t.lang} />
      </div>
    </section>
  );
}
