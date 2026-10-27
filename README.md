# Reyes Tires Pro · landing page (placeholder)

Single static page. Target domain: https://reyestirespro.com (not yet pointed anywhere; confirm the spelling).

## Facts on the page (from the shop's business card only)
- Phone: (442) 999-5014
- Address: 260 N Juniper St, Escondido, CA 92025
- Hours: Mon–Sat 8am–6pm, Sun 8am–3pm
- Used and new tires and wheels; brands Michelin, BFGoodrich, Pirelli, Falken

Not on the card, so not claimed: prices, services beyond tires and wheels, coordinates, reviews, owner name.

## SEO / GEO
- Title, meta description, canonical, Open Graph, Twitter card
- JSON-LD `AutoRepair` with address, phone, hours, and offers
- `robots.txt` and `sitemap.xml`
- `llms.txt` for AI answer systems
- FAQ in plain text for search and AI extraction

## Before going live
- Confirm the domain, then update the canonical, og:url, JSON-LD url, sitemap, robots, and llms.txt if it differs.
- Add a Google Business Profile for the shop. Local ranking depends on it more than on the page.
- Add the shop's own geo coordinates to JSON-LD once confirmed (not invented here).

Deploy: Cloudflare Pages, static, no build step, output directory `/`.
