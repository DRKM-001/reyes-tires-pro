import { ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import Header from "./Header";
import Footer from "./Footer";
import ContactDock from "./ContactDock";
import JsonLd from "./JsonLd";

export default function GuideLayout({ t, chip, title, intro, children, ld, cta }: {
  t: Dict; chip: string; title: string; intro: string; children: React.ReactNode; ld?: object; cta: { quote: string; call: string };
}) {
  return (
    <>
      {ld && <JsonLd data={ld} />}
      <Header lang={t.lang} home={false} />
      <main id="main">
        <section className="relative overflow-hidden bg-ink-900">
          <div className="absolute inset-0 bg-grain opacity-[0.08]" />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-stripes opacity-25 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
          <div className="absolute inset-x-0 top-0 h-1 bg-blaze-500" />
          <div className="container-x relative py-14 sm:py-20">
            <span className="clip-slash bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">{chip}</span>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-sand-50 sm:text-6xl">{title}</h1>
            <span className="speed-bar mt-5 w-28 bg-royal-500" />
            <p className="mt-5 max-w-2xl text-lg text-sand-200/90">{intro}</p>
          </div>
        </section>
        <article className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-8 text-[17px] leading-relaxed text-stone-750 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-stone-850 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-stone-850 [&_p]:mt-3">
          {children}
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={`${t.home}#quote`} className="group inline-flex items-center gap-2 rounded-md bg-blaze-500 px-6 py-3.5 font-bold uppercase tracking-wide text-white shadow-blaze hover:bg-blaze-600">
              {cta.quote}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={site.phoneHref} data-track="call" className="inline-flex items-center gap-2 rounded-md border border-stone-850/20 px-6 py-3.5 font-semibold text-stone-850 hover:bg-white">{cta.call}</a>
          </div>
        </article>
      </main>
      <Footer t={t} />
      <ContactDock lang={t.lang} />
    </>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-sand-200 bg-white p-6 shadow-card [&_h2]:mt-0 [&_h2]:text-2xl">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export function SizeCode({ code, parts }: { code: string; parts: [string, string][] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl bg-ink-900 p-6 text-center text-sand-50" role="img" aria-label={code}>
      <div className="font-display text-6xl font-bold tracking-wider sm:text-8xl">{code}</div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-sm text-sand-200/70">
        {parts.map(([v, l]) => <div key={l}><div className="font-display text-3xl font-bold text-blaze-500">{v}</div>{l}</div>)}
      </div>
    </div>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-lg border-l-4 border-blaze-500 bg-white p-5 shadow-card">{children}</div>;
}

export function PartsTable({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card">
      <table className="w-full text-left text-[16px]">
        <thead className="bg-sand-100 font-display uppercase tracking-wide text-stone-850"><tr><th className="px-4 py-3">{head[0]}</th><th className="px-4 py-3">{head[1]}</th></tr></thead>
        <tbody>{rows.map(([a, b]) => <tr key={a} className="border-t border-sand-200 align-top"><td className="px-4 py-3 font-display text-xl font-bold text-blaze-600">{a}</td><td className="px-4 py-3">{b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
