import { json, fail, type Env } from "../../lib/api-server";
import { normalizeSize } from "../../lib/quote";
import type { InventoryResponse, Condition } from "../../lib/api-types";

// GET /api/inventory?size=225/45R17&condition=used
// Milestone M4 (live used-tire stock). Until INVENTORY_API_URL is set this answers
// { status: "not_connected", items: [] } so the website can already be built against it.
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const size = url.searchParams.get("size") ? normalizeSize(url.searchParams.get("size")!) : undefined;
  const c = url.searchParams.get("condition");
  const condition: Condition | undefined = c === "used" || c === "new" || c === "either" ? c : undefined;
  const query = { size, condition };

  if (!env.INVENTORY_API_URL) {
    const body: InventoryResponse = { status: "not_connected", query, items: [] };
    return json(body);
  }
  const upstream = new URL(env.INVENTORY_API_URL);
  if (size) upstream.searchParams.set("size", size);
  if (condition) upstream.searchParams.set("condition", condition);
  try {
    const r = await fetch(upstream, { headers: env.INVENTORY_API_KEY ? { authorization: `Bearer ${env.INVENTORY_API_KEY}` } : {} });
    if (!r.ok) return fail(502, "inventory_unavailable", "The inventory service did not answer.");
    const items = (await r.json()) as InventoryResponse["items"];
    const body: InventoryResponse = { status: "ok", query, items };
    return json(body, 200, { "cache-control": "public, max-age=60" });
  } catch {
    return fail(502, "inventory_unavailable", "The inventory service did not answer.");
  }
};
