import type { Dict } from "@/lib/i18n";
import Header from "./Header";
import Footer from "./Footer";
import ContactDock from "./ContactDock";
import JsonLd from "./JsonLd";

/** Header + main + footer + phone contact bar, for every page other than home. */
export default function PageShell({ t, children, ld = [] }: { t: Dict; children: React.ReactNode; ld?: object[] }) {
  return (
    <>
      {ld.map((d, i) => <JsonLd key={i} data={d} />)}
      <Header lang={t.lang} home={false} />
      <main id="main">{children}</main>
      <Footer t={t} />
      <ContactDock lang={t.lang} />
    </>
  );
}

/** Dark hero band with headline + lede on the left and (optionally) the quote card on the right. */
export function PageHero({ chip, title, lede, right, crumbs }: { chip: string; title: React.ReactNode; lede: string; right?: React.ReactNode; crumbs?: { href: string; label: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(31,111,224,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-stripes opacity-25 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-1 bg-blaze-500" />
      <div className={`container-x relative grid gap-10 py-12 sm:py-16 ${right ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : ""}`}>
        <div>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-4 text-xs text-sand-200/60">
              {crumbs.map((c, i) => <span key={c.href}>{i > 0 && " / "}<a href={c.href} className="hover:text-sand-50">{c.label}</a></span>)}
            </nav>
          )}
          <span className="clip-slash bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">{chip}</span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-sand-50 text-balance sm:text-6xl">{title}</h1>
          <span className="speed-bar mt-5 w-28 bg-royal-500" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-sand-200/90">{lede}</p>
        </div>
        {right}
      </div>
    </section>
  );
}

export function FaqList({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-lg border border-sand-200 bg-white shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold uppercase tracking-wide text-stone-850 [&::-webkit-details-marker]:hidden">
              {f.q}<span className="text-2xl leading-none text-blaze-500 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-stone-750">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const faqLd = (lang: string, items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage", inLanguage: lang,
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const crumbsLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
});
