// Typed client for the /api endpoints. Safe to call from the browser.
import type { HoursResponse, InventoryResponse, QuoteRequest, QuoteResponse, ApiError, ShopInfo, Condition } from "./api-types";

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { ...init, headers: { "content-type": "application/json", ...(init?.headers || {}) } });
  const body = await res.json();
  if (!res.ok) throw body as ApiError;
  return body as T;
}

export const api = {
  shop: () => call<ShopInfo>("/api/shop"),
  hours: () => call<HoursResponse>("/api/hours"),
  inventory: (q: { size?: string; condition?: Condition } = {}) =>
    call<InventoryResponse>(`/api/inventory?${new URLSearchParams(q as Record<string, string>)}`),
  quote: (req: QuoteRequest) => call<QuoteResponse>("/api/quote", { method: "POST", body: JSON.stringify(req) }),
  /** Fire-and-forget lead log that never blocks the WhatsApp hand-off. */
  logQuote(req: QuoteRequest) {
    try {
      const blob = new Blob([JSON.stringify(req)], { type: "application/json" });
      if (navigator.sendBeacon) navigator.sendBeacon("/api/quote", blob);
      else fetch("/api/quote", { method: "POST", body: JSON.stringify(req), keepalive: true, headers: { "content-type": "application/json" } }).catch(() => {});
    } catch { /* never block the customer */ }
  },
};
