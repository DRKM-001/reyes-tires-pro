import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page not found | Reyes Tires Pro", robots: { index: false, follow: true } };
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactDock from "@/components/ContactDock";
import { dicts } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function NotFoundPage() {
  const t = dicts.en;
  return (
    <>
      <Header lang={t.lang} home={false} />
      <main id="main" className="relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-grain opacity-[0.08]" />
        <div className="container-x relative py-24">
          <span className="clip-slash bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">404</span>
          <h1 className="mt-5 font-display text-5xl font-bold uppercase text-sand-50 sm:text-6xl">This page doesn&apos;t exist</h1>
          <p className="mt-4 max-w-xl text-lg text-sand-200/90">The link may be old or mistyped. Go to the home page to send us your tire size, or call the shop. <a href="/es/" className="underline">Versión en español</a>.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="rounded-md bg-blaze-500 px-6 py-3.5 font-bold uppercase tracking-wide text-white">Go to the home page</a>
            <a href={site.phoneHref} className="rounded-md border border-sand-200/25 px-6 py-3.5 font-semibold text-sand-50">Call {site.phone}</a>
          </div>
        </div>
      </main>
      <Footer t={t} />
      <ContactDock lang={t.lang} />
    </>
  );
}
