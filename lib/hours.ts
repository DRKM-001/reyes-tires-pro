import { site } from "./site";

export type OpenState = {
  open: boolean;
  day: number; // 0 = Sunday, shop's local time
  closesAt?: number; // hour, when open
  opensDay?: number; // when closed
  opensAt?: number;
};

/** Shop-local day and hour, worked out in the shop's time zone (works in browsers and Workers). */
export function shopNow(date = new Date()): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone, weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  }).formatToParts(date);
  const o: Record<string, string> = {};
  parts.forEach((p) => (o[p.type] = p.value));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday);
  return { day, hour: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
}

export function openState(date = new Date()): OpenState {
  const { day, hour } = shopNow(date);
  const [o, c] = site.hours[day];
  if (hour >= o && hour < c) return { open: true, day, closesAt: c };
  const d = hour < o ? day : (day + 1) % 7;
  return { open: false, day, opensDay: d, opensAt: site.hours[d][0] };
}
