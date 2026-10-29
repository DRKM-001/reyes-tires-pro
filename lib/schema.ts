import { site } from "./site";
import type { Dict } from "./i18n";

export function businessSchema() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    "@context": "https://schema.org",
    "@type": "TireShop",
    "@id": `${site.url}/#business`,
    name: site.name,
    slogan: site.slogan,
    description: "Quality used and new tires and wheels in Escondido, California, with tire installation, balancing, repair, rotation and TPMS repair.",
    url: `${site.url}/`,
    image: [`${site.url}/photos/shop-corner.jpg`, `${site.url}/photos/shop-bay.jpg`, `${site.url}/og.png`],
    telephone: "+1-442-999-5014",
    sameAs: [site.instagram, site.yelp],
    knowsLanguage: ["en", "es"],
    hasMap: site.reviewsHref,
    address: { "@type": "PostalAddress", streetAddress: site.streetAddress, addressLocality: site.city, addressRegion: site.region, postalCode: site.postalCode, addressCountry: site.country },
    areaServed: { "@type": "City", name: "Escondido" },
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+1-442-999-5014", contactType: "customer service", availableLanguage: ["English", "Spanish"] },
      { "@type": "ContactPoint", telephone: "+1-619-564-1742", contactType: "customer service", name: "WhatsApp", availableLanguage: ["English", "Spanish"],
        hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: "00:00", closes: "23:59" } },
    ],
    openingHoursSpecification: Object.entries(site.hours).map(([d, [o, c]]) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: days[Number(d)], opens: `${String(o).padStart(2, "0")}:00`, closes: `${String(c).padStart(2, "0")}:00`,
    })),
    brand: site.brands.map((name) => ({ "@type": "Brand", name: name.replace(" Wheels", "") })),
    makesOffer: [
      ...["Used tires", "New tires", "Wheels"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name } })),
      ...["Tire installation", "Tire balancing", "Tire repair", "Tire rotation", "Tire pressure monitoring system (TPMS) repair"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    ],
  };
}

export function faqSchema(t: Dict) {
  return {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: t.lang,
    mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
