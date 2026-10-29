// Single source of truth for the shop's facts. Used by the pages, the JSON-LD,
// and the /api endpoints. Only facts confirmed by the shop or its own listings go here.
export const site = {
  name: "Reyes Tires Pro",
  slogan: "We Perform Better",
  url: "https://reyestirespro.com",

  phone: "(442) 999-5014",
  phoneHref: "tel:+14429995014",
  phoneE164: "+14429995014",
  whatsapp: "16195641742", // wa.me format; answered anytime
  whatsappDisplay: "(619) 564-1742",

  streetAddress: "260 N Juniper St",
  city: "Escondido",
  region: "CA",
  postalCode: "92025",
  country: "US",
  address: "260 N Juniper St, Escondido, CA 92025",
  crossStreets: "Juniper & Pennsylvania",

  mapsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Reyes+Tires+Pro,+260+N+Juniper+St,+Escondido,+CA+92025",
  reviewsHref:
    "https://www.google.com/maps/search/?api=1&query=Reyes+Tires+Pro,+260+N+Juniper+St,+Escondido,+CA+92025",
  mapEmbed:
    "https://maps.google.com/maps?q=Reyes%20Tires%20Pro%2C%20260%20N%20Juniper%20St%2C%20Escondido%2C%20CA%2092025&z=16&output=embed",

  instagram: "https://www.instagram.com/reyestirespro/",
  yelp: "https://www.yelp.com/biz/reyes-tires-pro-escondido",

  // Google listing, checked 2026-10-28. Update in the monthly check.
  rating: "4.9",
  reviewCount: 112,

  // Real quotes from public Google reviews of the shop (seen 2026-10-28).
  reviews: [
    "This is the best place in town for the best customer service and price.",
    "Fair prices, clean shop, personable staff.",
    "Great dude, best prices, great services.",
  ],

  brands: ["Michelin", "BFGoodrich", "Pirelli", "Falken", "Milestar", "Forte Wheels"],

  // Google Analytics 4 measurement ID (provided 2026-10-29).
  gaId: "G-76CJLBCFC7",

  timeZone: "America/Los_Angeles",
  // 0 = Sunday. [open, close] in 24h hours.
  hours: { 0: [8, 15], 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 18] } as Record<number, [number, number]>,
} as const;

export type Site = typeof site;
