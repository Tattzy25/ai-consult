import { AGENT_PROFILE_URL, MCP_ENDPOINT, getShopDomain } from "../GeminiTools/config";
import { INTERNAL_TOOL_NAMES } from "./server.tools";

type McpToolCallResult = {
  result?: unknown;
  error?: unknown;
  [key: string]: unknown;
};

/**
 * Redirect targets the dispatcher remembers from the latest server results.
 * Gemini never sends these — it just presses notify_*_redirect and the
 * dispatcher routes to wherever the merchant last pointed us.
 */
let cartUrl: string | null = null;
let checkoutUrl: string | null = null;

function parseMcpResponse(rawBody: string): McpToolCallResult {
  const eventData = rawBody
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trim())
    .filter(Boolean)
    .join("\n");

  try {
    return JSON.parse(eventData || rawBody);
  } catch {
    console.warn("[shop-mcp] dropped unparsable response body");
    return { error: "unparsable_response" };
  }
}

type UrlHit = { key: string; url: string };

/** Walk a nested result (including JSON strings inside content text) for URLs. */
function collectUrlHits(value: unknown, key: string, out: UrlHit[]): void {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      out.push({ key, url: trimmed });
      return;
    }
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        collectUrlHits(JSON.parse(trimmed), key, out);
      } catch {
        /* not JSON — ignore */
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectUrlHits(item, key, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      collectUrlHits(v, k, out);
    }
  }
}

/** A single merchant response can carry cart + checkout URLs together.
 *  Remember them so a later notify_*_redirect has a destination to open. */
function rememberUrls(name: string, result: McpToolCallResult): void {
  const hits: UrlHit[] = [];
  collectUrlHits(result?.result ?? result, "", hits);

  for (const hit of hits) {
    const k = hit.key.toLowerCase();
    const isCheckout = k.includes("checkout") || k.includes("payment") || /checkout|payment/i.test(name);
    const isCart = k.includes("cart") || k.includes("continue") || /cart/i.test(name);

    if (isCheckout) checkoutUrl = hit.url;
    else if (isCart) cartUrl = hit.url;
    else if (!cartUrl) cartUrl = hit.url;
  }
}

function openTarget(url: string): boolean {
  try {
    return Boolean(window.open(url, "_blank", "noopener,noreferrer"));
  } catch {
    return false;
  }
}

function internalResult(kind: string, ok: boolean, url: string | null): McpToolCallResult {
  return {
    result: {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            ok
              ? { ok: true, redirected: kind, url }
              : { ok: false, redirected: kind, reason: "No destination captured yet." },
          ),
        },
      ],
    },
  };
}

function handleInternalTool(name: string): McpToolCallResult {
  if (name === "notify_cart_redirect") {
    if (!cartUrl) return internalResult("cart", false, null);
    openTarget(cartUrl);
    return internalResult("cart", true, cartUrl);
  }
  if (name === "notify_checkout_redirect") {
    if (!checkoutUrl) return internalResult("checkout", false, null);
    openTarget(checkoutUrl);
    return internalResult("checkout", true, checkoutUrl);
  }
  if (name === "get_ui_state") {
    const state = (window as any).LiveCommerceState;
    return {
      result: {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              state ?? { ok: false, reason: "Commerce Layer not mounted yet." },
            ),
          },
        ],
      },
    };
  }
  return internalResult("unknown", false, null);
}

/** A neutral, invisible result. Gemini sees a clean answer; the buyer sees
 *  nothing at all. Failures are logged for us, never surfaced to the customer. */
const NEUTRAL_RESULT: McpToolCallResult = {
  result: {
    content: [
      { type: "text", text: JSON.stringify({ ok: false, silent: true }) },
    ],
  },
};

function logQuietly(where: string, err: unknown): void {
  if (err instanceof Error) console.warn(`[shop-mcp] ${where}: ${err.message}`);
  else console.warn(`[shop-mcp] ${where}:`, err);
}

/** Single dispatcher: internal tools route locally; everything else goes to the merchant server.
 *  Never throws — any failure degrades to a neutral result so the live session
 *  keeps moving and the merchant's customer never sees an error. */
export async function callShopMcp(
  name: string,
  id: string,
  args: Record<string, unknown> | undefined,
): Promise<McpToolCallResult> {
  try {
    if ((INTERNAL_TOOL_NAMES as readonly string[]).includes(name)) {
      return handleInternalTool(name);
    }

    const shopDomain = getShopDomain();

    const response = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id,
        method: "tools/call",
        params: {
          name,
          arguments: {
            ...(shopDomain
              ? { shop_domain: shopDomain, store_domain: shopDomain }
              : {}),
            meta: {
              "ucp-agent": {
                profile: AGENT_PROFILE_URL,
              },
            },
            ...(args ?? {}),
          },
        },
      }),
    });

    const rawBody = await response.text();

    if (!response.ok) {
      console.warn(`[shop-mcp] ${name} failed (${response.status}) — swallowed`);
      return NEUTRAL_RESULT;
    }

    const parsed = parseMcpResponse(rawBody);
    rememberUrls(name, parsed);
    return parsed;
  } catch (err) {
    logQuietly(name, err);
    return NEUTRAL_RESULT;
  }
}
