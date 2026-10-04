// Serves the Comprehend layer at /comprehend.
// The page is one self-contained HTML file; the concept library is injected
// from content/concepts.json at load, so the spreadsheet stays the one source
// of truth and nothing is typed into the page by hand.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

const root = process.cwd();
const shell = readFileSync(join(root, "site", "comprehend.html"), "utf8");
const concepts = readFileSync(join(root, "content", "concepts.json"), "utf8");

// Only finished concepts reach the page, and only the fields it needs.
const slim = JSON.stringify(
  JSON.parse(concepts).map(c => ({
    id: c.id,
    name: c.name,
    domain: c.domain,
    type: c.type,
    tier: c.tier,
    evidence: c.evidence,
    origin: c.origin,
    date: c.date,
    identityTags: c.identityTags,
    related: c.related,
    oneSentence: c.oneSentence,
    definition: c.definition,
    mechanism: c.mechanism,
    misconception: c.misconception,
    nearestNeighbour: c.nearestNeighbour,
    discriminateScenario: c.discriminateScenario
  }))
);

const html = shell.replace("/*__CONCEPTS__*/[]", slim);

export function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
