"use client";

import { useEffect, useState } from "react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";
import { openState, type OpenState } from "@/lib/hours";

/** Live "open now / closed" line, worked out in shop time. Renders after hydration so the static HTML never shows a stale state. */
export default function OpenStatus({ lang, className = "" }: { lang: Lang; className?: string }) {
  const t = dicts[lang];
  const [s, setS] = useState<OpenState | null>(null);
  useEffect(() => {
    setS(openState());
    const id = setInterval(() => setS(openState()), 60_000);
    return () => clearInterval(id);
  }, []);

  let text = t.status.anytime;
  if (s) {
    if (s.open) text = `${t.status.open(t.status.fmt(s.closesAt!))} · ${t.status.anytime}`;
    else {
      const when = s.opensDay === s.day ? t.status.today : s.opensDay === (s.day + 1) % 7 ? t.status.tomorrow : t.status.days[s.opensDay!];
      text = `${t.status.closed(when, t.status.fmt(s.opensAt!))} · ${t.status.anytime}`;
    }
  }
  return (
    <p className={`inline-flex items-center gap-2 text-sm font-semibold ${className}`} aria-live="polite">
      <span className={`relative flex h-2.5 w-2.5`}>
        {s?.open && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s ? (s.open ? "bg-emerald-400" : "bg-blaze-500") : "bg-sand-300"}`} />
      </span>
      {text}
    </p>
  );
}
