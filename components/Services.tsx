import type { Dict } from "@/lib/i18n";
import { serviceIcons, WhatsAppIcon } from "./icons";
import ShopWaLink from "./ShopWaLink";
import { services as svcList, serviceHref } from "@/lib/services";

export default function Services({ t }: { t: Dict }) {
  const s = t.services;
  const More = serviceIcons.more;
  return (
    <section id="services" className="scroll-mt-16 bg-sand-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">{s.chip}</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">{s.h2}</h2>
          <p className="mt-4 text-lg text-stone-750">{s.p}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((it, idx) => {
            const Icon = serviceIcons[it.icon as keyof typeof serviceIcons];
            const page = svcList[[0, 2, 3, 4, 5, 6, 7][idx]];
            return (
              <a key={it.title} href={page ? serviceHref(page, t.lang) : undefined} className="group block rounded-xl border border-sand-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blaze-500/50">
                <div className="clip-slash flex h-12 w-12 items-center justify-center bg-blaze-50 text-blaze-600 transition-colors group-hover:bg-blaze-500 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-stone-850">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone-750">{it.desc}</p>
              </a>
            );
          })}
          <ShopWaLink lang={t.lang}
             className="group flex flex-col rounded-xl border border-ink-900 bg-ink-900 p-6 text-sand-50 shadow-card transition-all hover:-translate-y-1">
            <div className="clip-slash flex h-12 w-12 items-center justify-center bg-royal-500 text-white"><More className="h-6 w-6" /></div>
            <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">{s.more.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-sand-200/80">{s.more.desc}</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold uppercase tracking-wide text-wa-500"><WhatsAppIcon className="h-4 w-4" />{s.more.cta}</span>
          </ShopWaLink>
        </div>
      </div>
    </section>
  );
}
