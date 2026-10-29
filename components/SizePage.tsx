import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { allSizes, sizeHref, sizeBase, type SizeFacts } from "@/lib/sizes";
import { serviceHref, services } from "@/lib/services";
import PageShell, { PageHero, FaqList, faqLd, crumbsLd } from "./PageShell";
import HeroQuote from "./HeroQuote";

const L = {
  en: { home: "Home", sizes: "Tire sizes", chip: "Tire size", facts: "What this size means", approx: "Approximate, unloaded. Use the size, load index and speed rating your vehicle calls for.",
        width: "Tread width", aspect: "Aspect ratio", sidewall: "Sidewall height", rim: "Wheel diameter", dia: "Overall diameter", revs: "Revolutions per mile", same: "Other sizes for", inch: "inch wheels", faq: "Questions", guide: "How to read a tire size",
        kinds: { metric: "Metric size", flotation: "Off-road (flotation) size", truck: "Commercial truck size", unknown: "" } as Record<string, string> },
  es: { home: "Inicio", sizes: "Medidas de llantas", chip: "Medida", facts: "Qué significa esta medida", approx: "Aproximado, sin carga. Use la medida, el índice de carga y de velocidad que pide su vehículo.",
        width: "Ancho", aspect: "Perfil", sidewall: "Altura del costado", rim: "Diámetro del rin", dia: "Diámetro total", revs: "Vueltas por milla", same: "Otras medidas para rin de", inch: "pulgadas", faq: "Preguntas", guide: "Cómo leer la medida",
        kinds: { metric: "Medida métrica", flotation: "Medida todoterreno (flotación)", truck: "Medida de camión comercial", unknown: "" } as Record<string, string> },
};

function copy(lang: Lang, f: SizeFacts) {
  const s = f.size;
  if (lang === "es") return {
    h1: `Llantas ${s} en Escondido`,
    lede: `Llantas ${s} usadas y nuevas en Reyes Tires Pro, Juniper y Pennsylvania. Mande la medida por WhatsApp y le decimos qué tenemos hoy y cuánto cuesta, instaladas y balanceadas.`,
    title: `Llantas ${s} usadas y nuevas en Escondido, CA | Reyes Tires Pro`,
    desc: `¿Busca llantas ${s}? Usadas y nuevas en Reyes Tires Pro, Escondido. Mande su medida por WhatsApp y le damos precio. Abierto los 7 días. Se habla español.`,
    faq: [
      { q: `¿Tienen llantas ${s} usadas?`, a: `El inventario de usadas cambia cada día. Mande ${s} por WhatsApp al (619) 564-1742 y le decimos qué hay hoy, con el dibujo y la edad.` },
      { q: `¿Cuánto cuestan las llantas ${s}?`, a: "Depende de la marca y de si las quiere usadas o nuevas. Mande la medida por WhatsApp o llame al (442) 999-5014 para un precio." },
      { q: "¿Las instalan?", a: "Sí. Montamos y balanceamos las llantas en sus rines." },
    ],
  };
  return {
    h1: `${s} tires in Escondido`,
    lede: `Used and new ${s} tires at Reyes Tires Pro, Juniper & Pennsylvania. Send the size on WhatsApp and we'll tell you what we have today and what it costs, installed and balanced.`,
    title: `${s} Tires, Used & New, in Escondido, CA | Reyes Tires Pro`,
    desc: `Looking for ${s} tires? Used and new at Reyes Tires Pro in Escondido. Send your size on WhatsApp for a price. Open 7 days. Se habla español.`,
    faq: [
      { q: `Do you have used ${s} tires?`, a: `Used stock changes daily. Send ${s} on WhatsApp to (619) 564-1742 and we'll tell you what we have today, with tread and age.` },
      { q: `How much are ${s} tires?`, a: "It depends on the brand and whether you want used or new. Send the size on WhatsApp or call (442) 999-5014 for a price." },
      { q: "Do you install them?", a: "Yes. We mount and balance tires on your wheels." },
    ],
  };
}

export const sizeMeta = (lang: Lang, f: SizeFacts) => { const c = copy(lang, f); return { title: c.title, description: c.desc }; };

export default function SizePage({ lang, f }: { lang: Lang; f: SizeFacts }) {
  const t = dicts[lang]; const l = L[lang]; const c = copy(lang, f);
  const url = `${site.url}${sizeHref(f, lang)}`;
  const rows: [string, string][] = [];
  if (f.widthMm) rows.push([l.width, `${f.widthMm} mm (${f.widthIn}")`]);
  else if (f.widthIn) rows.push([l.width, `${f.widthIn}"`]);
  if (f.aspect) rows.push([l.aspect, `${f.aspect}%`]);
  if (f.sidewallIn) rows.push([l.sidewall, f.sidewallMm ? `${f.sidewallMm} mm (${f.sidewallIn}")` : `${f.sidewallIn}"`]);
  if (f.rim) rows.push([l.rim, `${f.rim}"`]);
  if (f.diameterIn) rows.push([l.dia, `${f.diameterIn}"`]);
  if (f.revsPerMile) rows.push([l.revs, `≈ ${f.revsPerMile}`]);
  const siblings = allSizes().filter((s) => s.rim === f.rim && s.slug !== f.slug);
  const ld = [faqLd(lang, c.faq), crumbsLd([{ name: l.home, url: `${site.url}${t.home}` }, { name: l.sizes, url: `${site.url}${sizeBase[lang]}` }, { name: f.size, url }])];
  const svcLinks = services.filter((s) => ["used-tires", "new-tires", "tire-installation", "tire-balancing"].includes(s.id));
  return (
    <PageShell t={t} ld={ld}>
      <PageHero chip={l.chip} title={c.h1} lede={c.lede}
        crumbs={[{ href: t.home, label: l.home }, { href: sizeBase[lang], label: l.sizes }]}
        right={<HeroQuote lang={lang} mode="tires" size={f.size} />} />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_320px]">
        <article className="max-w-3xl text-[17px] leading-relaxed text-stone-750">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850">{l.facts}</h2>
          <p className="mt-1 text-sm text-stone-750/80">{l.kinds[f.kind]}</p>
          {rows.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card">
              <table className="w-full text-left text-[16px]"><tbody>
                {rows.map(([k, v]) => <tr key={k} className="border-t border-sand-200 first:border-t-0"><th scope="row" className="px-5 py-3 font-medium text-stone-750">{k}</th><td className="px-5 py-3 text-right font-display text-xl font-bold text-stone-850">{v}</td></tr>)}
              </tbody></table>
            </div>
          )}
          <p className="mt-2 text-xs text-stone-750/70">{l.approx} <a className="underline" href={lang === "es" ? "/es/medidas-de-llantas/" : "/tire-size-guide/"}>{l.guide}</a></p>
          <FaqList title={l.faq} items={c.faq} />
        </article>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {siblings.length > 0 && (
            <div className="rounded-xl border border-sand-200 bg-white p-5 shadow-card">
              <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">{l.same} {f.rim}{lang === "es" ? ` ${l.inch}` : `-${l.inch}`}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {siblings.map((s) => <a key={s.slug} href={sizeHref(s, lang)} className="rounded-md border border-sand-200 px-2.5 py-1 font-display text-sm font-semibold text-stone-850 hover:border-blaze-500 hover:text-blaze-600">{s.size}</a>)}
              </div>
            </div>
          )}
          <div className="rounded-xl border border-sand-200 bg-white p-5 shadow-card">
            <ul className="space-y-2 text-[15px]">{svcLinks.map((s) => <li key={s.id}><a className="text-stone-750 hover:text-blaze-600" href={serviceHref(s, lang)}>{s.copy[lang].title}</a></li>)}</ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

export function SizesHub({ lang }: { lang: Lang }) {
  const t = dicts[lang]; const l = L[lang];
  const groups = new Map<number, SizeFacts[]>();
  for (const f of allSizes()) groups.set(f.rim, [...(groups.get(f.rim) || []), f]);
  const title = lang === "es" ? "Medidas de llantas" : "Tire sizes";
  const lede = lang === "es" ? "Manejamos todas las medidas menos llantas grandes agrícolas. Estas son algunas de las más pedidas; si no ve la suya, mándela por WhatsApp." : "We carry every size except large farm and agricultural tires. These are some of the most asked-for; if yours isn't here, send it on WhatsApp.";
  return (
    <PageShell t={t} ld={[crumbsLd([{ name: l.home, url: `${site.url}${t.home}` }, { name: l.sizes, url: `${site.url}${sizeBase[lang]}` }])]}>
      <PageHero chip={l.sizes} title={title} lede={lede} crumbs={[{ href: t.home, label: l.home }]} right={<HeroQuote lang={lang} mode="tires" />} />
      <div className="container-x space-y-8 py-14">
        {[...groups.entries()].sort((a, b) => a[0] - b[0]).map(([rim, list]) => (
          <section key={rim}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850">{lang === "es" ? `Rin ${rim}"` : `${rim}" wheels`}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {list.map((f) => <a key={f.slug} href={sizeHref(f, lang)} className="rounded-lg border border-sand-200 bg-white px-4 py-2 font-display text-lg font-semibold text-stone-850 shadow-card hover:border-blaze-500 hover:text-blaze-600">{f.size}</a>)}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
