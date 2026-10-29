import { Phone, MapPin, Clock, ArrowRight, Star, Instagram } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import Wordmark from "./Wordmark";

export default function Footer({ t }: { t: Dict }) {
  const f = t.footer;
  const year = new Date().getFullYear();
  const link = "text-sand-200/75 transition-colors hover:text-sand-50";
  const explore = [
    { label: t.nav[0].label, href: `${t.home}#shop` },
    { label: t.nav[1].label, href: `${t.home}#services` },
    { label: t.nav[3].label, href: `${t.home}#faq` },
    ...t.guidesNav,
    { label: t.otherLang.label, href: t.otherLang.href },
  ];
  return (
    <footer className="relative overflow-hidden bg-ink-950 pb-20 text-sand-200 lg:pb-0">
      <div className="absolute inset-0 bg-grain opacity-[0.05]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-stripes opacity-20 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-1 bg-blaze-500" />

      <div className="relative border-b border-sand-200/10">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-sand-50 sm:text-4xl">{f.ctaH}</h2>
            <p className="mt-2 text-sand-200/80">{f.ctaP}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`${t.home}#quote`} className="group inline-flex items-center gap-2 rounded-md bg-blaze-500 px-6 py-3 font-bold uppercase tracking-wide text-white shadow-blaze hover:bg-blaze-600">
              {f.ctaQuote}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" data-track="whatsapp"
               className="inline-flex items-center gap-2 rounded-md bg-wa-500 px-6 py-3 font-bold uppercase tracking-wide text-ink-950 hover:bg-wa-600">
              <WhatsAppIcon className="h-4 w-4" />{f.ctaWa}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark dark banner />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand-200/70">{f.blurb}</p>
          <a href={site.reviewsHref} target="_blank" rel="noopener noreferrer"
             className="mt-6 inline-flex items-center gap-3 rounded-lg border border-sand-200/12 bg-sand-50/[0.04] px-4 py-2.5 hover:border-blaze-500/40">
            <span className="font-display text-2xl font-bold text-sand-50">{site.rating}</span>
            <span>
              <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-blaze-500 text-blaze-500" />)}</span>
              <span className="text-xs text-sand-200/70">{f.reviews(site.reviewCount)}</span>
            </span>
          </a>
          <div className="mt-6 flex items-center gap-3">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-md border border-sand-200/15 hover:border-blaze-500/50 hover:text-blaze-500"><Instagram className="h-4 w-4" /></a>
            <a href={site.yelp} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center rounded-md border border-sand-200/15 px-3 text-xs font-bold uppercase tracking-wide hover:border-blaze-500/50 hover:text-blaze-500">Yelp</a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-blaze-500">{f.servicesH}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {t.services.items.map((s) => <li key={s.title}><a href={`${t.home}#services`} className={link}>{s.title}</a></li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-blaze-500">{f.exploreH}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-blaze-500">{f.contactH}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={`flex items-start gap-2.5 ${link}`}><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blaze-500" /><span>{site.address}<br /><span className="text-sand-200/50">{t.visit.corner}</span></span></a></li>
            <li><a href={site.phoneHref} data-track="call" className={`flex items-center gap-2.5 ${link}`}><Phone className="h-4 w-4 shrink-0 text-blaze-500" />{site.phone}</a></li>
            <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" data-track="whatsapp" className={`flex items-center gap-2.5 ${link}`}><WhatsAppIcon className="h-4 w-4 shrink-0 text-blaze-500" />WhatsApp {site.whatsappDisplay}</a></li>
            <li className="flex items-start gap-2.5 pt-1 text-sand-200/75">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blaze-500" />
              <span className="w-full space-y-0.5">{f.hoursShort.map((h) => <span key={h.d} className="flex justify-between gap-6"><span>{h.d}</span><span className="text-sand-200/55">{h.t}</span></span>)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-sand-200/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-sand-200/50 sm:flex-row">
          <p>© {year} {site.name}, Escondido, CA. {f.rights}</p>
          <p className="font-display uppercase tracking-[0.25em] text-sand-200/40">{site.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
