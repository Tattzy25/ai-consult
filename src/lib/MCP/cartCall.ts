import { AGENT_PROFILE_URL, CART_MCP_ENDPOINT } from "../GeminiTools/config";

function parseMcpResponse(rawBody: string): unknown {
  const eventData = rawBody
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trim())
    .filter(Boolean)
    .join("\n");

  return JSON.parse(eventData || rawBody);
}

export async function callCartMcp(
  name: string,
  id: string,
  args: unknown,
) {
  const response = await fetch(CART_MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: {
        name,
        arguments: {
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
    throw new Error(
      `Cart MCP request failed: ${response.status} ${response.statusText}\n${rawBody}`,
    );
  }

  console.log("[cart-mcp] raw response", rawBody);

  return parseMcpResponse(rawBody);
}

export function isCartTool(name: string): boolean {
  return [
    "create_cart",
    "get_cart",
    "update_cart",
    "cancel_cart",
  ].includes(name);
}