"use client";

import { useMemo, useState } from "react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import type { Condition } from "@/lib/api-types";
import { normalizeSize, quoteMessage, whatsappUrl, isPlausibleSize } from "@/lib/quote";
import { api } from "@/lib/api-client";
import { WhatsAppIcon } from "./icons";
import { track } from "./track";

const field =
  "w-full rounded-md border border-sand-200/15 bg-ink-950/40 px-3.5 py-2.5 text-[15px] text-sand-50 outline-none transition-colors placeholder:text-sand-200/40 focus:border-blaze-500 focus:ring-2 focus:ring-blaze-500/25";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-sand-200/80";

function Chips<T extends string | number>({ name, value, set, options }: { name: string; value: T; set: (v: T) => void; options: { v: T; l: string }[] }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button key={String(o.v)} type="button" role="radio" aria-checked={value === o.v} onClick={() => set(o.v)}
          className={`clip-slash px-3.5 py-1.5 text-sm font-bold uppercase tracking-wide transition-colors ${value === o.v ? "bg-sand-50 text-ink-950" : "bg-sand-50/10 text-sand-200 hover:bg-sand-50/20"}`}>
          {o.l}
        </button>
      ))}
    </div>
  );
}

export default function QuoteCard({ lang }: { lang: Lang; }) {
  const t = dicts[lang];
  const q = t.quote;
  const [size, setSize] = useState("");
  const [qty, setQty] = useState<1 | 2 | 4>(4);
  const [condition, setCondition] = useState<Condition>("either");
  const [vehicle, setVehicle] = useState("");
  const [name, setName] = useState("");

  const norm = normalizeSize(size);
  const msg = useMemo(() => quoteMessage({ size: norm, qty, condition, vehicle, name, lang: t.lang }), [norm, qty, condition, vehicle, name, t.lang]);
  const href = whatsappUrl(msg);

  function send() {
    track("whatsapp_quote", { size: norm });
    if (isPlausibleSize(norm)) {
      api.logQuote({ size: norm, qty, condition, vehicle: vehicle || undefined, name: name || undefined, lang: t.lang, source: location.pathname });
    }
  }

  return (
    <div id="quote" className="relative scroll-mt-24">
      <div className="absolute -inset-2 -z-10 rounded-2xl bg-blaze-600/15 blur-2xl" />
      <form onSubmit={(e) => { e.preventDefault(); send(); window.open(href, "_blank", "noopener,noreferrer"); }}
        className="rounded-2xl border border-sand-200/15 bg-ink-800/80 p-6 backdrop-blur sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-wa-500 text-ink-950"><WhatsAppIcon className="h-5 w-5" /></span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-wide text-sand-50">{q.title}</p>
            <p className="text-xs text-sand-200/70">{q.sub}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="q-size" className={label}>{q.size}</label>
            <input id="q-size" value={size} onChange={(e) => setSize(e.target.value.toUpperCase())}
              placeholder="225/45R17" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={24}
              className="w-full border-0 border-b-2 border-sand-200/25 bg-transparent px-0 pb-1 font-display text-5xl font-bold uppercase tracking-wide text-sand-50 outline-none placeholder:text-sand-200/25 focus:border-blaze-500 sm:text-6xl" />
            <p className="mt-2 text-xs text-sand-200/60">{q.sizeHint}. <a href={q.sizeHelp.href} className="underline hover:text-sand-50">{q.sizeHelp.label}</a></p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
            <div><span className={label}>{q.qty}</span><Chips name={q.qty} value={qty} set={setQty} options={[{ v: 1, l: "1" }, { v: 2, l: "2" }, { v: 4, l: "4" }]} /></div>
            <div><span className={label}>{q.type}</span><Chips name={q.type} value={condition} set={setCondition} options={[{ v: "used", l: q.used }, { v: "new", l: q.new }, { v: "either", l: q.either }]} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="q-vehicle" className={label}>{q.vehicle} <span className="font-medium normal-case text-sand-200/50">{q.optional}</span></label>
              <input id="q-vehicle" className={field} placeholder={q.vehiclePh} value={vehicle} onChange={(e) => setVehicle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="q-name" className={label}>{q.name} <span className="font-medium normal-case text-sand-200/50">{q.optional}</span></label>
              <input id="q-name" className={field} placeholder={q.namePh} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />
            </div>
          </div>
        </div>

        {/* A real link, so it works even before JavaScript loads. */}
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={send}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-wa-500 px-6 py-3.5 font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-wa-600">
          <WhatsAppIcon className="h-5 w-5" />{q.send}
        </a>
        <p className="mt-3 text-center text-xs text-sand-200/50">{q.opens}</p>
      </form>
    </div>
  );
}
