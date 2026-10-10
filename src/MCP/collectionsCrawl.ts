import { getShopDomain } from "../config";
import { callShopMcp } from "./mcpCall";
import { resolveProducts } from "../commerce/resolve";

/** Crawl-n-Store server — separate from the shop MCP endpoint. */
const CRAWL_ENDPOINT = "https://crawl-n-store.anigok.com/mcp";

/** Tenant ID = the site name without the .com (temporary convention). */
export function getTenantId(): string {
  const host = getShopDomain();
  return host.replace(/^www\./, "").replace(/\.com$/, "");
}

async function callCrawlMcp(
  id: number,
  name: string,
  args: Record<string, unknown>,
): Promise<unknown> {
  const response = await fetch(CRAWL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });

  const raw = await response.text();
  if (!response.ok) {
    console.warn(`[crawl] ${name} failed (${response.status})`);
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "error" in parsed) {
      console.warn(`[crawl] ${name} returned an error`);
      return null;
    }
    return parsed;
  } catch {
    console.warn("[crawl] unparsable response");
    return null;
  }
}

/** Fallback when crawl_and_store fails: a straight catalog search.
 *  Renders only if at least four products come back — otherwise null
 *  (no initial shelf; the FaceTime session can still start). */
async function fallbackSearchCatalog(): Promise<unknown> {
  const res = await callShopMcp("search_catalog", "page-load-fallback", {
    catalog: { pagination: { limit: 8 } },
  });
  const envelope = res as { result?: { content?: { text?: string }[] } } | undefined;
  const text = envelope?.result?.content?.[0]?.text;
  let payload: unknown = res;
  if (typeof text === "string") {
    try { payload = JSON.parse(text); } catch { /* keep envelope */ }
  }
  const count = resolveProducts(payload).length;
  if (count < 4) {
    console.warn(`[crawl] fallback search returned ${count} products — no initial shelf`);
    return null;
  }
  return payload;
}

/** 1) crawl_and_store on /collections  →  2) wait 2s  →  3) get_collections. */
export async function fetchCollections(): Promise<unknown> {
  const domain = getShopDomain();
  const tenantId = getTenantId();
  const base = `https://${domain}`;

  const crawled = await callCrawlMcp(2, "crawl_and_store", {
    url: `${base}/collections`,
    tenantId,
    prompt:
      "Extract: the collection names, collection page URLs, the collections image URL from each collection, and the collection short descriptions possibly a short 1 liner.",
    limit: 5,
    includePatterns: [`${base}/collections`, `${base}/collections/**`],
  });

  if (!crawled) return fallbackSearchCatalog();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return callCrawlMcp(3, "get_collections", { tenantId });
}
