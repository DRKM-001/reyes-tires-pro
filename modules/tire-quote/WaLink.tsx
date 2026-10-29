"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useQuoteLink } from "./useQuoteLink";
import type { Lang } from "./core";

/** Drop-in replacement for any wa.me link: always sends the current quote draft. */
export default function WaLink({ number, lang, children, onSend, ...rest }:
  { number: string; lang: Lang; children: ReactNode | ((s: { size: string; hasSize: boolean }) => ReactNode); onSend?: (size: string) => void } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  const { href, size, hasSize } = useQuoteLink(number, lang);
  return (
    <a {...rest} href={href} target="_blank" rel="noopener noreferrer" onClick={(e) => { onSend?.(size); rest.onClick?.(e); }}>
      {typeof children === "function" ? children({ size, hasSize }) : children}
    </a>
  );
}
