import { Star, Quote, ArrowUpRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Reviews({ t }: { t: Dict }) {
  const r = t.reviews;
  return (
    <section className="relative overflow-hidden bg-royal-700 py-20 text-sand-50">
      <div className="absolute inset-0 bg-grain opacity-[0.06]" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-royal-100">{r.chip}</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">{r.h2}</h2>
          </div>
          <a href={site.reviewsHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg border border-sand-50/15 bg-ink-950/20 px-5 py-3 hover:bg-ink-950/30">
            <span className="font-display text-5xl font-bold leading-none">{site.rating}</span>
            <span>
              <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</span>
              <span className="text-sm text-royal-100">{r.count(site.reviewCount)}</span>
            </span>
          </a>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {site.reviews.map((q) => (
            <figure key={q} className="flex flex-col justify-between rounded-xl border border-sand-50/10 bg-ink-950/25 p-6">
              <Quote className="h-7 w-7 text-amber-400" />
              <blockquote className="mt-4 font-display text-2xl font-semibold uppercase leading-tight tracking-wide">{q}</blockquote>
              <figcaption className="mt-6 flex items-center gap-2 text-sm text-royal-100">
                <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span>{r.src}
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={site.reviewsHref} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline">
          {r.all(site.reviewCount)}<ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
