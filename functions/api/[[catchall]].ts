import { fail } from "../../lib/api-server";
// Any other /api/* path.
export const onRequest: PagesFunction = async () => fail(404, "not_found", "Unknown endpoint. See docs/API.md.");
