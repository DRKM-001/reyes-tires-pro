import { json } from "../../lib/api-server";
import { site } from "../../lib/site";
import type { ShopInfo } from "../../lib/api-types";

const hh = (h: number) => `${String(h).padStart(2, "0")}:00`;

// GET /api/shop -> the shop's public facts, from the same source as the website.
export const onRequestGet: PagesFunction = async () => {
  const body: ShopInfo = {
    name: site.name,
    phone: site.phoneE164,
    whatsapp: `+${site.whatsapp}`,
    address: site.address,
    crossStreets: site.crossStreets,
    languages: ["en", "es"],
    hours: Object.entries(site.hours).map(([d, [o, c]]) => ({ day: Number(d), opens: hh(o), closes: hh(c) })),
    rating: { value: site.rating, count: site.reviewCount, source: "google" },
    links: { maps: site.mapsHref, reviews: site.reviewsHref, instagram: site.instagram, yelp: site.yelp },
  };
  return json(body, 200, { "cache-control": "public, max-age=300" });
};
