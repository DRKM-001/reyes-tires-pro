"use client";
import { QuoteCard } from "@/modules/tire-quote";
import type { Lang } from "@/lib/api-types";
import { quoteConfig } from "./quoteConfig";

export default function HeroQuote({ lang }: { lang: Lang }) {
  return <QuoteCard lang={lang} config={quoteConfig(lang)} />;
}
