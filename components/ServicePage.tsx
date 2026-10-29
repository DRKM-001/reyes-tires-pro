import { ArrowRight, Check } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { services, serviceHref, serviceBase, type Service } from "@/lib/services";
import { serviceIcons } from "./icons";
import PageShell, { PageHero, FaqList, faqLd, crumbsLd } from "./PageShell";
import HeroQuote from "./HeroQuote";

const L = {
  en: { home: "Home", services: "Services", chip: "Service", related: "Other services", ask: "Ask for a price", faq: "Questions", sizes: "Popular tire sizes", visit: "260 N Juniper St, Escondido. Open 7 days." },
  es: { home: "Inicio", services: "Servicios", chip: "Servicio", related: "Otros servicios", ask: "Pida un precio", faq: "Preguntas", sizes: "Medidas populares", visit: "260 N Juniper St, Escondido. Abierto los 7 días." },
};

export default function ServicePage({ lang, svc }: { lang: Lang; svc: Service }) {
  const t = dicts[lang]; const c = svc.copy[lang]; const l = L[lang];
  const Icon = serviceIcons[svc.icon];
  const mode = svc.id === "wheels" ? "wheels" : undefined;
  const url = `${site.url}${serviceHref(svc, lang)}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: c.title, serviceType: c.title, url, areaServed: { "@type": "City", name: "Escondido" },
      provider: { "@type": "TireShop", "@id": `${site.url}/#business`, name: site.name, telephone: "+1-442-999-5014",
        address: { "@type": "PostalAddress", streetAddress: site.streetAddress, addressLocality: site.city, addressRegion: site.region, postalCode: site.postalCode, addressCountry: "US" } },
      inLanguage: lang },
    faqLd(lang, c.faq),
    crumbsLd([{ name: l.home, url: `${site.url}${t.home}` }, { name: l.services, url: `${site.url}${serviceBase[lang]}` }, { name: c.title, url }]),
  ];
  return (
    <PageShell t={t} ld={ld}>
      <PageHero chip={l.chip} title={c.h1} lede={c.lede}
        crumbs={[{ href: t.home, label: l.home }, { href: serviceBase[lang], label: l.services }]}
        right={<HeroQuote lang={lang} mode={mode} />} />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="max-w-3xl text-[17px] leading-relaxed text-stone-750">
          {c.sections.map((sec) => (
            <section key={sec.h} className="mb-8">
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850">{sec.h}</h2>
              <p className="mt-3">{sec.p}</p>
            </section>
          ))}
          {c.signs && (
            <section className="mb-8 rounded-xl border border-sand-200 bg-white p-6 shadow-card">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850">{c.signs.h}</h2>
              <ul className="mt-3 space-y-2">{c.signs.items.map((it) => <li key={it} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-blaze-500" />{it}</li>)}</ul>
            </section>
          )}
          <FaqList title={l.faq} items={c.faq} />
          <p className="mt-10 text-sm text-stone-750/80">{l.visit}</p>
        </article>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-sand-200 bg-white p-5 shadow-card">
            <div className="clip-slash flex h-11 w-11 items-center justify-center bg-blaze-500 text-white"><Icon className="h-5 w-5" /></div>
            <p className="mt-3 font-display text-xl font-bold uppercase text-stone-850">{c.title}</p>
            <a href="#quote" className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-blaze-600">{l.ask}<ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-xl border border-sand-200 bg-white p-5 shadow-card">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">{l.related}</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              {services.filter((s) => s.id !== svc.id).map((s) => <li key={s.id}><a className="text-stone-750 hover:text-blaze-600" href={serviceHref(s, lang)}>{s.copy[lang].title}</a></li>)}
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

export function ServicesHub({ lang }: { lang: Lang }) {
  const t = dicts[lang]; const l = L[lang];
  const title = lang === "es" ? "Servicios de llantas en Escondido" : "Tire services in Escondido";
  const lede = lang === "es" ? "Llantas usadas y nuevas, rines, montaje, balanceo, reparación, rotación y TPMS en Juniper y Pennsylvania." : "Used and new tires, wheels, installation, balancing, repair, rotation and TPMS at Juniper & Pennsylvania.";
  return (
    <PageShell t={t} ld={[crumbsLd([{ name: l.home, url: `${site.url}${t.home}` }, { name: l.services, url: `${site.url}${serviceBase[lang]}` }])]}>
      <PageHero chip={l.services} title={title} lede={lede} crumbs={[{ href: t.home, label: l.home }]} right={<HeroQuote lang={lang} />} />
      <div className="container-x grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <a key={s.id} href={serviceHref(s, lang)} className="group rounded-xl border border-sand-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blaze-500/50">
              <div className="clip-slash flex h-12 w-12 items-center justify-center bg-blaze-50 text-blaze-600 group-hover:bg-blaze-500 group-hover:text-white"><Icon className="h-6 w-6" /></div>
              <h2 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-stone-850">{s.copy[lang].title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-750">{s.copy[lang].lede.split(". ")[0]}.</p>
            </a>
          );
        })}
      </div>
    </PageShell>
  );
}
