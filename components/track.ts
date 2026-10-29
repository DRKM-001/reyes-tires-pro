// Contact-tap events -> Google Analytics 4 (and Cloudflare Zaraz if it is ever turned on).
// Event names: call, whatsapp, whatsapp_quote, whatsapp_photo, directions, reviews.
type W = Window & { gtag?: (...a: unknown[]) => void; zaraz?: { track: (e: string, d: object) => void } };

export function track(event: string, data: Record<string, string> = {}) {
  try {
    const w = window as W;
    const params = { page_path: location.pathname, lang: document.documentElement.lang, ...data };
    w.gtag?.("event", event, params);
    w.zaraz?.track(event, params);
  } catch { /* never break a click */ }
}
