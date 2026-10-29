import { json } from "../../lib/api-server";
import { openState } from "../../lib/hours";
import { site } from "../../lib/site";
import type { HoursResponse } from "../../lib/api-types";

const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;
const dn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// GET /api/hours -> open right now? Worked out in shop time (America/Los_Angeles).
export const onRequestGet: PagesFunction = async () => {
  const s = openState();
  const body: HoursResponse = {
    timeZone: site.timeZone,
    open: s.open,
    ...(s.open ? { closesAt: hh(s.closesAt!) } : { opensAt: `${dn[s.opensDay!]} ${hh(s.opensAt!)}` }),
    whatsappAnytime: true,
  };
  return json(body, 200, { "cache-control": "public, max-age=60" });
};
