"use client";
// This shop's WhatsApp button: carries the customer's quote draft wherever it appears.
import type { ReactNode } from "react";
import { WaLink } from "@/modules/tire-quote";
import type { Lang } from "@/lib/api-types";
import { site } from "@/lib/site";
import { track } from "./track";

export default function ShopWaLink({ lang, className, children, label }: { lang: Lang; className?: string; children?: ReactNode; label?: "short" }) {
  return (
    <WaLink number={site.whatsapp} lang={lang} className={className} onSend={(size) => track(size ? "whatsapp_quote" : "whatsapp", size ? { size } : {})}>
      {({ size, hasSize }) => (label === "short"
        ? <>{children}<span className="max-w-full truncate">{hasSize ? (lang === "es" ? `Mandar ${size}` : `Send ${size}`) : "WhatsApp"}</span></>
        : children)}
    </WaLink>
  );
}
