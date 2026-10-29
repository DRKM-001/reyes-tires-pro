"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { dicts } from "@/lib/i18n";
import type { Lang } from "@/lib/api-types";

export default function Faq({ lang }: { lang: Lang; }) {
  const t = dicts[lang];
  const f = t.faq;
  return (
    <section id="faq" className="scroll-mt-16 bg-sand-50 py-20 sm:py-24">
      <div className="container-x grid gap-8 lg:grid-cols-[4fr_8fr]">
        <div>
          <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">{f.chip}</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850">{f.h2}</h2>
        </div>
        <Accordion.Root type="single" collapsible className="space-y-2.5">
          {f.items.map((it, i) => (
            <Accordion.Item key={i} value={`q${i}`} className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-card">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-semibold uppercase tracking-wide text-stone-850 outline-none transition-colors hover:text-blaze-600 focus-visible:text-blaze-600">
                  {it.q}
                  <Plus className="h-5 w-5 shrink-0 text-blaze-500 transition-transform duration-200 group-data-[state=open]:rotate-45" />
                </Accordion.Trigger>
              </Accordion.Header>
              {/* forceMount keeps answers in the HTML for search engines; closed items are hidden. */}
              <Accordion.Content forceMount className="overflow-hidden text-[15px] leading-relaxed text-stone-750 data-[state=closed]:hidden data-[state=closed]:animate-acc-close data-[state=open]:animate-acc-open">
                <div className="px-5 pb-5">{it.a}</div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
