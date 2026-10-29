"use client";

import { useEffect, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Camera, CheckCircle2, AlertTriangle, CircleDot, Disc3, Layers } from "lucide-react";
import { setDraft } from "./store";
import { useQuoteLink } from "./useQuoteLink";
import { quoteStrings } from "./strings";
import { photoMessage, whatsappUrl, normalizeWheelSize, type Condition, type Lang, type Qty, type QuoteMode } from "./core";

export interface QuoteConfig {
  whatsapp: string;          // wa.me format, e.g. "16195641742"
  whatsappDisplay: string;   // "(619) 564-1742"
  sizeHelpHref?: string;     // link to a "how to read a tire size" page
  logEndpoint?: string;      // e.g. "/api/quote"; leads are POSTed here in the background
  onEvent?: (name: string, data?: Record<string, string>) => void; // analytics hook
  /** Optional: endpoint that delivers the request to the shop without WhatsApp (email/SMS/RavnPro).
   *  Only set this when a delivery channel is configured; the form shows an error if nothing was delivered. */
  directEndpoint?: string;
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
  const { href, message, size, hasSize, valid, label: btnLabel, mode, draft } = useQuoteLink(config.whatsapp, lang);
  // Controlled input shows what the customer typed; the message uses the normalized size.
  const [typed, setTyped] = useState("");
  useEffect(() => { if (draft.size !== typed && document.activeElement?.id !== "q-size") setTyped(draft.size); }, [draft.size]); // eslint-disable-line react-hooks/exhaustive-deps

  const [direct, setDirect] = useState(false);
  const [phone, setPhone] = useState("");
  const [dState, setDState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const phoneOk = phone.replace(/\D/g, "").length >= 10;

  async function sendDirect() {
    if (!config.directEndpoint || !phoneOk || !hasSize) return;
    setDState("sending");
    try {
      const r = await fetch(config.directEndpoint, { method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, size: size || undefined, wheelSize: normalizeWheelSize(draft.wheelSize) || undefined, style: draft.style || undefined, qty: draft.qty, condition: draft.condition,
          vehicle: draft.vehicle || undefined, name: draft.name || undefined, phone, lang, source: location.pathname, direct: true }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && Array.isArray(j.delivered) && j.delivered.length > 0) { setDState("sent"); config.onEvent?.("quote_direct", { mode, size: size || "" }); }
      else setDState("error");
    } catch { setDState("error"); }
  }

  function send() {
    config.onEvent?.(hasSize ? "whatsapp_quote" : "whatsapp", { mode, size: size || "", wheel: normalizeWheelSize(draft.wheelSize) });
    if (hasSize && config.logEndpoint) {
      logLead(config.logEndpoint, { mode, size: size || undefined, wheelSize: normalizeWheelSize(draft.wheelSize) || undefined, style: draft.style || undefined, qty: draft.qty, condition: draft.condition, vehicle: draft.vehicle || undefined, name: draft.name || undefined, lang, source: location.pathname });
    }
  }

  const tabs: { id: QuoteMode; label: string; Icon: typeof CircleDot }[] = [
    { id: "tires", label: s.tabs.tires, Icon: CircleDot },
    { id: "wheels", label: s.tabs.wheels, Icon: Disc3 },
    { id: "package", label: s.tabs.package, Icon: Layers },
  ];
  const wheelChips = ["17", "18", "20", "22"];
  const wheelNow = normalizeWheelSize(draft.wheelSize);
  const tireBig = mode === "tires";

  const sizeField = (
    <div>
      <label htmlFor="q-size" className={label}>{tireBig ? s.size : <>{s.tireOptional} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></>}</label>
      <input id="q-size" value={typed} inputMode="text" enterKeyHint="send" aria-describedby="q-size-read"
        onChange={(e) => { const v = e.target.value.toUpperCase(); setTyped(v); setDraft({ size: v }); }}
        onBlur={() => { if (valid && size !== typed) { setTyped(size); setDraft({ size }); } }}
        placeholder="225/45R17" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={24}
        className={tireBig
          ? "w-full border-0 border-b-2 border-sand-200/25 bg-transparent px-0 pb-1 font-display text-5xl font-bold uppercase tracking-wide text-sand-50 outline-none placeholder:text-sand-200/25 focus:border-blaze-500 sm:text-6xl"
          : `${field} font-display text-xl font-bold uppercase tracking-wide`} />
      <p id="q-size-read" aria-live="polite" className="mt-2 min-h-[1.25rem] text-sm font-semibold">
        {typed && valid && <span className="inline-flex items-center gap-1.5 text-wa-500"><CheckCircle2 className="h-4 w-4" />{s.readAs(size)}</span>}
        {typed && !valid && /\d{3,}/.test(typed.replace(/\D/g, "")) && <span className="inline-flex items-start gap-1.5 font-medium text-amber-300"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{s.check}</span>}
      </p>
      <p className="mt-1 text-xs text-sand-200/60">
        {tireBig ? <>{s.sizeHint}.{config.sizeHelpHref && <> <a href={config.sizeHelpHref} className="underline hover:text-sand-50">{s.sizeHelp}</a></>}</> : s.tireOptionalHint}
      </p>
    </div>
  );

  const vehicleField = (big: boolean) => (
    <div>
      <label htmlFor="q-vehicle" className={label}>{big ? s.vehicleReq : <>{s.vehicle} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></>}</label>
      <input id="q-vehicle" className={field} placeholder={big ? s.vehicleReqPh : s.vehiclePh} value={draft.vehicle ?? ""} onChange={(e) => setDraft({ vehicle: e.target.value })} />
    </div>
  );
  const nameField = (
    <div>
      <label htmlFor="q-name" className={label}>{s.name} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></label>
      <input id="q-name" className={field} placeholder={s.namePh} value={draft.name ?? ""} onChange={(e) => setDraft({ name: e.target.value })} autoComplete="given-name" />
    </div>
  );
  const qtyChips = <div><span className={label}>{s.qty}</span><Chips name={s.qty} value={draft.qty} set={(v: Qty) => setDraft({ qty: v })} options={[{ v: 1 as Qty, l: "1" }, { v: 2 as Qty, l: "2" }, { v: 4 as Qty, l: "4" }]} /></div>;
  const typeChips = <div><span className={label}>{s.type}</span><Chips name={s.type} value={draft.condition} set={(v: Condition) => setDraft({ condition: v })} options={[{ v: "used" as Condition, l: s.used }, { v: "new" as Condition, l: s.new }, { v: "either" as Condition, l: s.either }]} /></div>;
  const wheelField = (
    <div>
      <span className={label}>{s.wheelSize}</span>
      <div className="flex flex-wrap items-center gap-1.5">
        <Chips name={s.wheelSize} value={wheelChips.includes(wheelNow) ? wheelNow : ""} set={(v: string) => setDraft({ wheelSize: v })} options={wheelChips.map((w) => ({ v: w, l: `${w}"` }))} />
        <input aria-label={`${s.wheelSize}: ${s.other}`} inputMode="decimal" placeholder={s.other} maxLength={5}
          value={wheelChips.includes(wheelNow) ? "" : draft.wheelSize ?? ""} onChange={(e) => setDraft({ wheelSize: e.target.value })}
          className="w-20 rounded-md border border-sand-200/15 bg-ink-950/40 px-2.5 py-1.5 text-sm text-sand-50 outline-none placeholder:text-sand-200/40 focus:border-blaze-500" />
      </div>
    </div>
  );
  const styleField = (
    <div>
      <label htmlFor="q-style" className={label}>{s.style} <span className="font-medium normal-case text-sand-200/50">{s.optional}</span></label>
      <input id="q-style" className={field} placeholder={s.stylePh} value={draft.style ?? ""} onChange={(e) => setDraft({ style: e.target.value })} />
    </div>
  );

  return (
    <div id="quote" className="relative scroll-mt-24">
      <div className="absolute -inset-2 -z-10 rounded-2xl bg-blaze-600/15 blur-2xl" />
      <form onSubmit={(e) => { e.preventDefault(); send(); window.open(href, "_blank", "noopener,noreferrer"); }}
        className="rounded-2xl border border-sand-200/15 bg-ink-800/80 p-6 backdrop-blur sm:p-7">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-wa-500 text-ink-950"><WhatsAppGlyph className="h-5 w-5" /></span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-wide text-sand-50">{s.title}</p>
            <p className="text-xs text-sand-200/70">{s.subs[mode]}</p>
          </div>
        </div>

        <div role="tablist" aria-label={s.title} className="mt-5 grid grid-cols-3 gap-1 rounded-lg bg-ink-950/50 p-1">
          {tabs.map(({ id, label: l, Icon }) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setDraft({ mode: id })}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors sm:text-sm ${mode === id ? "bg-blaze-500 text-white shadow" : "text-sand-200/80 hover:bg-sand-50/10 hover:text-sand-50"}`}>
              <Icon className="h-4 w-4 shrink-0" /><span className="truncate">{l}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4" role="tabpanel">
          {mode === "tires" && <>
            {sizeField}
            <div className="grid gap-4 sm:grid-cols-[auto_1fr]">{qtyChips}{typeChips}</div>
            <div className="grid gap-4 sm:grid-cols-2">{vehicleField(false)}{nameField}</div>
          </>}
          {mode === "wheels" && <>
            {vehicleField(true)}
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">{wheelField}{qtyChips}</div>
            <div className="grid gap-4 sm:grid-cols-2">{styleField}{nameField}</div>
          </>}
          {mode === "package" && <>
            {vehicleField(true)}
            <div className="grid gap-4 sm:grid-cols-[1fr_auto]">{wheelField}{qtyChips}</div>
            {sizeField}
            {typeChips}
            <div className="grid gap-4 sm:grid-cols-2">{styleField}{nameField}</div>
          </>}
        </div>

        {/* What will actually be sent */}
        <div className="mt-5 rounded-lg border border-wa-500/25 bg-wa-500/[0.07] px-3.5 py-2.5" aria-live="polite">
          <p className="text-[11px] font-bold uppercase tracking-wide text-wa-500">{s.preview}</p>
          <p className="mt-0.5 whitespace-pre-line text-sm text-sand-100">{message}</p>
        </div>

        {/* A real link, so it works even before JavaScript loads. */}
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={send}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-wa-500 px-6 py-3.5 text-center font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-wa-600">
          <WhatsAppGlyph className="h-5 w-5 shrink-0" />{hasSize ? s.sendWith(btnLabel) : s.send}
        </a>
        <div className="mt-3 flex flex-col items-center gap-1 text-center text-xs text-sand-200/60">
          {mode === "tires" && (
            <a href={whatsappUrl(config.whatsapp, photoMessage[lang])} target="_blank" rel="noopener noreferrer" onClick={() => config.onEvent?.("whatsapp_photo")}
               className="inline-flex items-center gap-1.5 hover:text-sand-50">
              <Camera className="h-3.5 w-3.5" />{s.photo} <span className="underline">{s.photoLink}</span>
            </a>
          )}
          <span className="text-sand-200/40">{s.opens(config.whatsappDisplay)}</span>
          {config.directEndpoint && !direct && (
            <button type="button" onClick={() => setDirect(true)} className="mt-1 underline hover:text-sand-50">{s.noWa}</button>
          )}
        </div>
        {config.directEndpoint && direct && (
          <div className="mt-4 rounded-lg border border-sand-200/15 bg-ink-950/40 p-4">
            {dState === "sent" ? (
              <p className="text-sm font-semibold text-wa-500" aria-live="polite">{s.directSent(phone)}</p>
            ) : (
              <>
                <label htmlFor="q-phone" className={label}>{s.phone}</label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" className={field} placeholder="(760) 555-0100" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <button type="button" onClick={sendDirect} disabled={!phoneOk || !hasSize || dState === "sending"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-blaze-500 px-5 py-2.5 font-bold uppercase tracking-wide text-white disabled:opacity-40">
                    {dState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{s.directSend}
                  </button>
                </div>
                <p className="mt-2 text-xs text-sand-200/60">{dState === "error" ? <span className="text-amber-300">{s.directError}</span> : s.directHint}</p>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
