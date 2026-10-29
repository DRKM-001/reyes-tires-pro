# Reyes Tires Pro API

The website is a static Next.js export. The backend endpoints are **Cloudflare Pages Functions** in `functions/api/`. They deploy with the site on the same domain (`https://reyestirespro.com/api/...`), so there's no separate server to run.

Request and response types live in `lib/api-types.ts`, and the website uses the typed client in `lib/api-client.ts`. A future backend (inventory, CRM, booking) should keep these shapes so the website doesn't change.

| Method | Path | What it does | Status today |
|---|---|---|---|
| GET | `/api/health` | Liveness check for uptime monitors | Live |
| GET | `/api/shop` | Shop facts: phone, WhatsApp, address, hours, Google rating, links | Live (from `lib/site.ts`) |
| GET | `/api/hours` | Whether the shop is open now, in shop time | Live |
| POST | `/api/quote` | Validates a quote request and returns the prefilled WhatsApp link. Delivers the lead to every connected channel. | Live; delivery turns on when env vars are set |
| GET | `/api/inventory?size=&condition=` | Tire stock search (milestone M4) | Returns `not_connected` until `INVENTORY_API_URL` is set |
| * | `/api/*` (anything else) | 404 JSON | Live |

## POST /api/quote

```json
{ "size": "225/45R17", "qty": 4, "condition": "used", "lang": "en",
  "name": "Ana", "phone": "+17605550100", "vehicle": "2019 Honda Civic", "notes": "", "source": "/" }
```

- `size` is required and normalized (`p225 / 45 r17` becomes `225/45R17`). `qty` is 1, 2 or 4. `condition` is used, new or either. `lang` is en or es.
- Browser requests from other origins are refused (403). Bodies over 4 KB are refused (413). A `website` field is a honeypot for bots.
- Response `201`:
```json
{ "ok": true, "id": "Q-M2K9X1-4F2A", "whatsappUrl": "https://wa.me/16195641742?text=...", "delivered": ["email", "kv"] }
```
- Errors always look like `{ "ok": false, "error": "invalid_size", "message": "..." }`.

The quote form on the site sends this request in the background (`navigator.sendBeacon`) and opens WhatsApp at the same time, so the customer never waits on the backend.

## Connecting a backend later (Cloudflare Pages → Settings → Variables and Secrets / Bindings)

| Variable | Effect |
|---|---|
| `QUOTE_WEBHOOK_URL` | Every quote is POSTed as JSON here (Zapier, Make, n8n, a CRM, or our own service) |
| `RESEND_API_KEY`, `QUOTE_EMAIL_TO`, `QUOTE_EMAIL_FROM` | Every quote is emailed to the shop through Resend |
| `LEADS` (KV binding) | A copy of every quote is stored for a year |
| `INVENTORY_API_URL`, `INVENTORY_API_KEY` | `/api/inventory` passes the request through to the inventory service. It expects a JSON array of `InventoryItem`. |

No code changes are needed: set the variable, redeploy, and the endpoint starts using it.

## Run locally

```bash
npm install
npm run dev            # website only, http://localhost:3000
npm run build          # static site to out/
npm run pages:dev      # site + /api functions together (Cloudflare's wrangler), http://localhost:8788
```
