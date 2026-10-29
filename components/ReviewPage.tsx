import { Star, ArrowUpRight } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import PageShell from "./PageShell";

const L = {
  en: { h: "Thanks for choosing Reyes Tires Pro", p: "If we did right by you, a quick review helps other drivers in Escondido find us. It takes about a minute.",
        google: "Leave a Google review", yelp: "Review us on Yelp", note: "Honest reviews only, good or bad. They help us get better.", back: "Back to the home page" },
  es: { h: "Gracias por elegir Reyes Tires Pro", p: "Si le atendimos bien, una reseña rápida ayuda a otros conductores de Escondido a encontrarnos. Toma como un minuto.",
        google: "Dejar reseña en Google", yelp: "Reseña en Yelp", note: "Solo reseñas honestas, buenas o malas. Nos ayudan a mejorar.", back: "Regresar al inicio" },
};

export default function ReviewPage({ lang }: { lang: Lang }) {
  const t = dicts[lang]; const l = L[lang];
  return (
    <PageShell t={t}>
      <section className="relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(31,111,224,0.25),transparent_60%)]" />
        <div className="absolute inset-x-0 top-0 h-1 bg-blaze-500" />
        <div className="container-x relative flex flex-col items-center py-20 text-center">
          <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="h-8 w-8 fill-amber-400 text-amber-400" />)}</div>
          <h1 className="mt-6 max-w-2xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-sand-50 sm:text-6xl">{l.h}</h1>
          <p className="mt-5 max-w-xl text-lg text-sand-200/90">{l.p}</p>
          <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
            <a href={site.reviewWriteHref} data-track="review_google" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-md bg-blaze-500 px-6 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-blaze hover:bg-blaze-600">
              {l.google}<ArrowUpRight className="h-5 w-5" />
            </a>
            <a href={site.yelp} data-track="review_yelp" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-md border border-sand-200/25 px-6 py-3.5 font-semibold text-sand-50 hover:bg-sand-50/5">
              {l.yelp}<ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-sand-200/60">{l.note}</p>
          <a href={t.home} className="mt-8 text-sm text-sand-200/70 underline hover:text-sand-50">{l.back}</a>
        </div>
      </section>
    </PageShell>
  );
}
