# Reyes Tires Pro website: charter and roadmap

Owner and manager of the website: Claude (digital partner), working for Reyes Tires Pro, 260 N Juniper St, Escondido.
Written 2026-10-28. Reviewed at the end of every milestone.

Scope: this site serves **Reyes Tires Pro in Escondido** only. It shares nothing (books, data, accounts, hauling app) with Los Reyes Tire Shop 2 in El Cajon (losreyestires.com).

## Vision

When someone in North County San Diego needs a tire, Reyes Tires Pro is the first shop they find, and the easiest one to buy from.

## Mission

Turn "tires near me" into a phone call, a WhatsApp chat or a visit to Juniper St. We do it with a fast, honest, phone-first site that says only what is true about the shop.

## Principles

1. **Only true facts.** No invented prices, reviews, services, awards or stock. Any claim must come from the shop or its supplier. If something is unknown, the site says "call us".
2. **Phone first.** Most visitors are on a phone, often standing next to the car. Calling, WhatsApp and directions are always one tap away.
3. **Their words.** The site talks in tire size, price and "can you do it today", not in marketing copy.
4. **Fast and cheap to run.** Static files on Cloudflare Pages with no build step, no framework and no monthly bill. Every page stays under 150 KB.
5. **Measure contacts, not visits.** The number that matters is how many people tap Call, WhatsApp or Directions.

## North-star metric

**Contacts per week**: taps on Call, WhatsApp and Directions from the site, plus the same actions from the Google Business Profile.

## 90-day goals (by 2027-01-31)

| Goal | Target |
|---|---|
| Site live on its own domain over HTTPS | Done by 2026-11-15 |
| Google Business Profile verified, with photos and the correct hours | Done by 2026-11-30 |
| Contacts tracked from the site | Tracking on from launch day; 40 a month by January |
| Local search position | Top 3 in the Google map pack for "used tires Escondido" |
| Google reviews | 25 new, real customer reviews (asked for in person, never bought or written for them) |
| Speed | Lighthouse mobile score of 95 or higher on every page |

## Milestones

### M0: Launch-ready site (done 2026-10-28)
- Rebuilt home page around the shop's real job: the customer reads their tire size off the sidewall and sends it on WhatsApp in one tap.
- "Open now / closed" status worked out from the posted hours (Pacific time).
- Call / WhatsApp / Directions bar fixed to the bottom of the screen on phones.
- Shared stylesheet and script for every page. Favicon, social share image and 404 page.
- Structured data changed to `TireShop`, the correct schema.org type, with a map link.
- Security and caching headers for Cloudflare Pages (`_headers`).
- Spanish site live at `/es/`: home page plus both guides, linked to their English pages with hreflang (Spanish confirmed 2026-10-28).
- "WhatsApp answered anytime" shown in the hero, in the closed status, in the FAQ and in llms.txt.
- Instagram added to the footers and the structured data (`sameAs`). Link to the Google reviews from the home page.

### M1: Live and on the map (target 2026-11-15 to 11-30)
- [x] Live at https://reyestirespro.com, auto-deployed from `main` (2026-10-28).
Still needs the shop or Greg (see "Open questions"):
- **Top priority: claim the existing Google Business Profile.** It already has 4.9 stars, 112 reviews, photos and popular times, but it shows "Own this business?" (nobody has claimed it) and "Add website" (no website linked). Claim it, verify it (someone at the shop has to be present), link reyestirespro.com, and check the hours and services.
- Turn on Cloudflare Web Analytics and Zaraz to count Call, WhatsApp and Directions taps.
- Add Apple Business Connect and Bing Places with the exact same name, address and phone.
- The Yelp page (37 reviews, 4.3) is already **claimed** by someone at the shop. Find out who has the login, add the website, and turn on Yelp messaging (currently off). Add the website to the Instagram bio (@reyestirespro).
- Ten real photos: the storefront, the tire racks, the service bay and the sign seen from Juniper St. For now the site uses one street-corner photo from the Google listing (`assets/shop-corner.*`). Confirm the shop took it, or replace it with the shop's own.
- The Google listing photos show bays painted SUSPENSION and ALIGNMENT. Confirm these services are current before adding service pages.

### M2: Found locally (December 2026 to January 2027)
- One page per confirmed service (e.g. mounting and balancing, flat repair, used-tire inspection), written only after the shop lists what it does and what it charges.
- A review card at the counter: a QR code that opens the Google review form.
- Consistent listings on Yelp and the main directories.

### M3: Quote engine (Q1 2027)
- A "find my size" helper: enter the vehicle (year, make, model) or a photo of the sidewall, and get the size and a prefilled WhatsApp request.
- A short quote form that also works without WhatsApp (sends to the shop's email or SMS).
- Monthly specials, only when the shop gives a real price.

### M4: Live used-tire stock (Q2 2027)
- Staff add tires from their phone (size, brand, tread in 32nds, DOT year, price). Customers search by size.
- This is the big difference from other shops: a used-tire buyer can see the tire before driving over.
- Same stack as the shop family's hauling app (Supabase + Cloudflare), in a separate project for this shop.

## Open questions for the shop

1. ~~Is the domain reyestirespro.com?~~ Yes: live 2026-10-28.
2. ~~Spanish?~~ Yes, a big part of the customer base. The Spanish site went live 2026-10-28.
3. Which services do you offer besides selling tires and wheels? ~~Installation, balancing, repair, rotation and TPMS repair~~ are confirmed from the shop's claimed Yelp listing and are on the site. Open: **alignment and suspension** (bays are painted for both, and Google mentions alignment). Are they still offered? Any prices you want shown?
4. The Google Business Profile exists but is unclaimed. Who at the shop can be there for the verification (video call or postcard)?
5. ~~WhatsApp hours?~~ Answered anytime (2026-10-28).
6. Do you have a logo file? (The site uses a text mark for now.)
7. Do you accept appointments, or walk-ins only?

## Decision log

- 2026-10-28: Took the services list from the shop's claimed Yelp page, since the business entered it. The street-corner photo and the Juniper & Pennsylvania landmark come from the Google listing.

- 2026-10-28: Kept the stack as static HTML on Cloudflare Pages. A framework adds nothing for a site this size.
- 2026-10-28: Made WhatsApp-with-tire-size the main action, next to Call. A size turns a vague "how much?" into a quote the shop can answer straight away.
- 2026-10-28: Changed the schema type from `AutoRepair` to `TireShop`. Repair services are not confirmed, and `TireShop` is the exact match.
- 2026-10-28: Built the Spanish page but kept it hidden until Spanish service is confirmed (principle 1).
