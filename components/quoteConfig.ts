import { site } from "@/lib/site";
import type { QuoteConfig } from "@/modules/tire-quote";
import type { Lang } from "@/lib/api-types";
import { track } from "./track";

// This shop's settings for the Tire Quote module.
export const quoteConfig = (lang: Lang): QuoteConfig => ({
  whatsapp: site.whatsapp,
  whatsappDisplay: site.whatsappDisplay,
  sizeHelpHref: lang === "es" ? "/es/medidas-de-llantas/" : "/tire-size-guide/",
  logEndpoint: "/api/quote",
  onEvent: (name, data) => track(name, data),
  // Turned on at build time once quote delivery (email/SMS/RavnPro) is configured in Cloudflare:
  // set NEXT_PUBLIC_DIRECT_QUOTES=1 together with RESEND_API_KEY + QUOTE_EMAIL_TO (or QUOTE_WEBHOOK_URL).
  directEndpoint: process.env.NEXT_PUBLIC_DIRECT_QUOTES === "1" ? "/api/quote" : undefined,
});
