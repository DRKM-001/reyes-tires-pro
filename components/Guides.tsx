import { BookOpen, Ruler, ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";

export default function Guides({ t }: { t: Dict }) {
  const g = t.guides;
  const icons = [Ruler, BookOpen];
  return (
    <section className="border-t border-sand-200 bg-sand-50 pb-20 pt-16">
      <div className="container-x">
        <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">{g.chip}</p>
        <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850">{g.h2}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {g.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <a key={it.href} href={it.href} className="group flex gap-5 rounded-xl border border-sand-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blaze-500/50">
                <div className="clip-slash flex h-12 w-12 shrink-0 items-center justify-center bg-royal-50 text-royal-600"><Icon className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-stone-850">{it.title}</h3>
                  <p className="mt-1 text-[15px] text-stone-750">{it.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-blaze-600">{g.read}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
