// Cloudflare Pages serves out/404.html for unknown paths. Use our branded 404 page for it.
import { copyFileSync, rmSync, existsSync } from "node:fs";
const src = "out/page-not-found/index.html";
if (!existsSync(src)) { console.error("postbuild: missing", src); process.exit(1); }
copyFileSync(src, "out/404.html");
rmSync("out/page-not-found", { recursive: true, force: true });
rmSync("out/404", { recursive: true, force: true });
console.log("postbuild: branded 404.html in place");
