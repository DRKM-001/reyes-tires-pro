// Contact-tap events. Sent to Cloudflare Zaraz when it's turned on for the zone; otherwise a no-op.
export function track(event: string, data: Record<string, string> = {}) {
  try {
    const z = (window as unknown as { zaraz?: { track: (e: string, d: object) => void } }).zaraz;
    z?.track(event, { page: location.pathname, ...data });
  } catch { /* ignore */ }
}
