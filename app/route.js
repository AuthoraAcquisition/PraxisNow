// Serves the Praxis site (site/index.html) at the root URL.
// The page is one self-contained HTML file: styles, script, images and the concept library are inside it.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

const html = readFileSync(join(process.cwd(), "site", "index.html"), "utf8");

export function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
