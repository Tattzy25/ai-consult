import { AGENT_PROFILE_URL, CART_MCP_ENDPOINT } from "../GeminiTools/config.ts";

export async function callCartMcp(
  name: string,
  id: string,
  args: unknown,
) {
  const response = await fetch(CART_MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-11-25",
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
  return JSON.parse(rawBody);
}

export function isCartTool(name: string): boolean {
  const cartTools = ["create_cart", "get_cart", "update_cart", "cancel_cart"];
  return cartTools.includes(name);
}