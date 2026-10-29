"use client";
import { useEffect } from "react";
import { QuoteCard, setDraft } from "@/modules/tire-quote";
import type { QuoteMode } from "@/modules/tire-quote/core";
import type { Lang } from "@/lib/api-types";
import { quoteConfig } from "./quoteConfig";

/** The quote card. On service and size pages it starts on the right tab, prefilled with the page's size. */
export default function HeroQuote({ lang, mode, size }: { lang: Lang; mode?: QuoteMode; size?: string }) {
  useEffect(() => {
    if (mode || size) setDraft({ ...(mode ? { mode } : {}), ...(size ? { size } : {}) });
  }, [mode, size]);
  return <QuoteCard lang={lang} config={quoteConfig(lang)} />;
}
