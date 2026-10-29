# Tire Quote module

A drop-in quote feature for any of the shops' Next.js sites. It started on reyestirespro.com.

The customer types a tire size the way they'd say it (`p225 45 r17`), picks how many and used or new, and can add their vehicle and name. They see the exact message, then send it to the shop's WhatsApp in one tap.
**Every WhatsApp button on the site carries the same quote**, not just the one in the form. The draft is shared across components and pages for the whole visit.

## What's inside
| File | Role |
|---|---|
| `core.ts` | Size normalizing, message building (EN/ES), WhatsApp links. No React. Safe to use on the server, e.g. in an API route. |
| `store.ts` | One shared quote draft (`useDraft`, `setDraft`), kept in sessionStorage for the visit |
| `useQuoteLink.ts` | `useQuoteLink(number, lang)` returns `{ href, message, size, hasSize }` |
| `QuoteCard.tsx` | The form: size, how many, used/new, vehicle, name, live message preview, send button, "send a photo instead" |
| `WaLink.tsx` | Drop-in replacement for any `wa.me` link, carrying the draft |
| `strings.ts` | UI text in English and Spanish |

## Add it to another shop's site
1. Copy `modules/tire-quote/` into the site and add `"./modules/**/*.{ts,tsx}"` to `content` in `tailwind.config`.
2. The card uses these Tailwind color tokens: `sand`, `ink`, `blaze` (shop accent), `wa` (`#25D366` / `#1ebe5b`) and the `clip-slash` utility. reyestires.com already has them. On a site without them, add them or adjust the class names.
3. Render it with the shop's own settings:
```tsx
<QuoteCard lang="en" config={{
  whatsapp: "16198325500",            // the shop's WhatsApp, wa.me format
  whatsappDisplay: "(619) 832-5500",
  sizeHelpHref: "/tire-size-guide/",  // optional
  logEndpoint: "/api/quote",          // optional: leads are POSTed here in the background
  onEvent: (name, data) => {},        // optional analytics hook
}} />
```
4. Replace the site's other WhatsApp links with `<WaLink number="16198325500" lang="en">…</WaLink>`.
5. Optional: copy `functions/api/quote.ts` (Cloudflare Pages) or turn it into a Next API route, so every lead is also emailed or stored.

## Tested inputs (42 cases: `npm run test:sizes`)
People rarely type the slash or the R, so `parseSize()` reads a size however it's typed:
- **Metric:** `2254517`, `225 45 17`, `225-45-17`, `225.45.17`, `p225 45r17` and `22545r17` all become 225/45R17. `lt2657017` becomes LT265/70R17. `24540zr18` becomes 245/40ZR18.
- **Flotation (off-road):** `35125017`, `35x1250r17`, `35 12.50 17` and `35x12.5x17` all become 35X12.50R17. `31x10.5r15` becomes 31X10.50R15.
- **Truck:** `11225`, `1122.5`, `11r225`, `11 225`, `11r22.5` and `11 22.5` all become 11R22.5. `8195` becomes 8R19.5. Metric truck: `29575225` and `295 75 225` become 295/75R22.5, and `2257019.5` becomes 225/70R19.5. Truck rims always end in .5, which is how the reader tells them apart.
- **Impossible sizes** like `22/45R16` are flagged ("Double-check the size") and still sent exactly as typed.

The form shows "✓ Read as 225/45R17" while the customer types, and tidies the box when they move to the next field.
