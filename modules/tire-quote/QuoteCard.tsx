"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { setDraft } from "./store";
import { useQuoteLink } from "./useQuoteLink";
import { quoteStrings } from "./strings";
import { photoMessage, whatsappUrl, type Condition, type Lang, type Qty } from "./core";

export interface QuoteConfig {
  whatsapp: string;          // wa.me format, e.g. "16195641742"
  whatsappDisplay: string;   // "(619) 564-1742"
  sizeHelpHref?: string;     // link to a "how to read a tire size" page
  logEndpoint?: string;      // e.g. "/api/quote"; leads are POSTed here in the background
  onEvent?: (name: string, data?: Record<string, string>) => void; // analytics hook
}

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

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.927zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

/** Logs the lead without ever blocking the WhatsApp hand-off. */
function logLead(endpoint: string, body: object) {
  try {
    const json = JSON.stringify(body);
    if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([json], { type: "application/json" }));
    else fetch(endpoint, { method: "POST", body: json, keepalive: true, headers: { "content-type": "application/json" } }).catch(() => {});
  } catch { /* never block the customer */ }
}

export default function QuoteCard({ lang, config }: { lang: Lang; config: QuoteConfig }) {
  const s = quoteStrings[lang];
  const { href, message, size, hasSize, draft } = useQuoteLink(config.whatsapp, lang);
  // Controlled input shows what the customer typed; the message uses the normalized size.
  const [typed, setTyped] = useState("");
  useEffect(() => { if (draft.size && !typed) setTyped(draft.size); }, [draft.size]); // eslint-disable-line react-hooks/exhaustive-deps

  function send() {
    config.onEvent?.("whatsapp_quote", { size });
    if (hasSize && config.logEndpoint) {
      logLead(config.logEndpoint, { size, qty: draft.qty, condition: draft.condition, vehicle: draft.vehicle || undefined, name: draft.name || undefined, lang, source: location.pathname });
    }
  }

  return (
    <div id="quote" className="relative scroll-mt-24">
      <div className="absolute -inset-2 -z-10 rounded-2xl bg-blaze-600/15 blur-2xl" />
      <form onSubmit={(e) => { e.preventDefault(); send(); window.open(href, "_blank", "noopener,noreferrer"); }}
        className="rounded-2xl border border-sand-200/15 bg-ink-800/80 p-6 backdrop-blur sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-wa-500 text-ink-950"><WhatsAppGlyph className="h-5 w-5" /></span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-wide text-sand-50">{s.title}</p>
            <p className="text-xs text-sand-200/70">{s.sub}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="q-size" className={label}>{s.size}</label>
            <input id="q-size" value={typed} inputMode="text" enterKeyHint="send"
              onChange={(e) => { const v = e.target.value.toUpperCase(); setTyped(v); setDraft({ size: v }); }}
              placeholder="225/45R17" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={24}
              className="w-full border-0 border-b-2 border-sand-200/25 bg-transparent px-0 pb-1 font-display text-5xl font-bold uppercase tracking-wide text-sand-50 outline-none placeholder:text-sand-200/25 focus:border-blaze-500 sm:text-6xl" />
            <p className="mt-2 text-xs text-sand-200/60">
              {s.sizeHint}.{config.sizeHelpHref && <> <a href={config.sizeHelpHref} className="underline hover:text-sand-50">{s.sizeHelp}</a></>}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
            <div><span className={label}>{s.qty}</span><Chips name={s.qty} value={draft.qty} set={(v: Qty) => setDraft({ qty: v })} options={[{ v: 1 as Qty, l: "1" }, { v: 2 as Qty, l: "2" }, { v: 4 as Qty, l: "4" }]} /></div>
            <div><span className={label}>{s.type}</span><Chips name={s.type} value={draft.condition} set={(v: Condition) => setDraft({ condition: v })} options={[{ v: "used" as Condition, l: s.used }, { v: "new" as Condition, l: s.new }, { v: "either" as Condition, l: s.either }]} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="q-vehicle" className={label}>{s.vehicle} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></label>
              <input id="q-vehicle" className={field} placeholder={s.vehiclePh} value={draft.vehicle ?? ""} onChange={(e) => setDraft({ vehicle: e.target.value })} />
            </div>
            <div>
              <label htmlFor="q-name" className={label}>{s.name} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></label>
              <input id="q-name" className={field} placeholder={s.namePh} value={draft.name ?? ""} onChange={(e) => setDraft({ name: e.target.value })} autoComplete="given-name" />
            </div>
          </div>
        </div>

        {/* What will actually be sent */}
        <div className="mt-5 rounded-lg border border-wa-500/25 bg-wa-500/[0.07] px-3.5 py-2.5" aria-live="polite">
          <p className="text-[11px] font-bold uppercase tracking-wide text-wa-500">{s.preview}</p>
          <p className="mt-0.5 whitespace-pre-line text-sm text-sand-100">{message}</p>
        </div>

        {/* A real link, so it works even before JavaScript loads. */}
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={send}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-wa-500 px-6 py-3.5 text-center font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-wa-600">
          <WhatsAppGlyph className="h-5 w-5 shrink-0" />{hasSize ? s.sendWith(size) : s.send}
        </a>
        <div className="mt-3 flex flex-col items-center gap-1 text-center text-xs text-sand-200/60">
          <a href={whatsappUrl(config.whatsapp, photoMessage[lang])} target="_blank" rel="noopener noreferrer" onClick={() => config.onEvent?.("whatsapp_photo")}
             className="inline-flex items-center gap-1.5 hover:text-sand-50">
            <Camera className="h-3.5 w-3.5" />{s.photo} <span className="underline">{s.photoLink}</span>
          </a>
          <span className="text-sand-200/40">{s.opens(config.whatsappDisplay)}</span>
        </div>
      </form>
    </div>
  );
}
