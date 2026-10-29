# Reyes Tires Pro website

https://reyestirespro.com is the site for Reyes Tires Pro, 260 N Juniper St, Escondido, CA (corner of Juniper & Pennsylvania).
The vision, goals, milestones, open questions and decision log are in [ROADMAP.md](ROADMAP.md). The API is described in [docs/API.md](docs/API.md).

## Stack
- **Next.js 14** (App Router, TypeScript), exported as a fully static site (`out/`)
- **Tailwind CSS**, with the same family look as reyestires.com: sand, ink, logo red ("blaze") and logo blue ("royal")
- **lucide-react** icons; **Radix** accordion for the FAQ
- Oswald (display) + Inter (body), self-hosted through `@fontsource` (no Google Fonts calls)
- **Cloudflare Pages** hosting, plus **Pages Functions** in `functions/api/` for the backend endpoints

## Where things live
| What | File |
|---|---|
| Shop facts (phone, hours, rating, brands, reviews) | `lib/site.ts`, the single source for pages, JSON-LD and the API |
| All page text, English and Spanish | `lib/i18n.tsx` |
| Quote feature (form, shared draft, WhatsApp buttons, size parser) | `modules/tire-quote/`, a reusable module, see its README. This shop's settings are in `components/quoteConfig.ts` |
| API contract | `lib/api-types.ts`, `lib/api-client.ts` |
| Sections | `components/*.tsx` |
| Pages | `app/(en)/...` and `app/(es)/es/...` (each language has its own root layout, so `<html lang>` is correct) |
| SEO | `lib/meta.ts` (canonical + hreflang), `lib/schema.ts` (TireShop and FAQ JSON-LD), `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt` |
| Photos | `public/photos/` (from the Google listing for now; swap in the shop's own photos when they arrive) |

## Commands
```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # static site to out/ (also writes the branded out/404.html)
npm run pages:dev   # site + /api together, like production: http://localhost:8788
```

## Cloudflare Pages settings
- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NODE_VERSION` = `20`
- Functions: detected automatically from `functions/`
- Optional backend variables: see docs/API.md

## Facts rule
Publish only facts confirmed by the shop or its own listings. If something is unknown, the site says "call us".
