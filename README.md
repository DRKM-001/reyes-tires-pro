# Reyes Tires Pro website

Static site for Reyes Tires Pro, 260 N Juniper St, Escondido, CA. Target domain: https://reyestirespro.com (to be confirmed).
Vision, goals, milestones, open questions and the decision log are in [ROADMAP.md](ROADMAP.md).

## Structure
- `index.html`: home page. Its main action is to send the tire size on WhatsApp.
- `tire-size-guide/`, `tire-basics/`: guides people search for.
- `es/`: Spanish home page. **Hidden** (noindex, unlinked) until Spanish service is confirmed.
- `404.html`, `_headers` (Cloudflare Pages security and cache headers), `robots.txt`, `sitemap.xml`, `llms.txt`.
- `assets/site.css`, `assets/site.js`: shared by every page. The script handles the open-now status, the WhatsApp quote message and tap tracking.

## Facts rule
Publish only facts confirmed by the shop or its supplier. Currently confirmed: phone (442) 999-5014, WhatsApp (619) 564-1742, address, hours (Mon to Sat 8 to 6, Sun 8 to 3), used and new tires and wheels, the brands Michelin, BFGoodrich, Pirelli, Falken, Milestar and Forte, and every size except large farm and agricultural tires.
When the hours change, update them in four places: `assets/site.js` (HOURS), the hours tables, the JSON-LD and `llms.txt`.

## Tracking
Contact links carry `data-track` (call, whatsapp, whatsapp_quote, directions). When Cloudflare Zaraz is turned on for the zone, `site.js` sends these taps as events. Otherwise it does nothing.

## Deploy
Cloudflare Pages, static, with no build step and output directory `/`.
