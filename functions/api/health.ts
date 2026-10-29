import { json } from "../../lib/api-server";

// GET /api/health -> liveness check for uptime monitors.
export const onRequestGet: PagesFunction = async () =>
  json({ ok: true, service: "reyes-tires-pro", time: new Date().toISOString() });
