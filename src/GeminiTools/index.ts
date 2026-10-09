export { AGENT_PROFILE_URL, MCP_ENDPOINT, getShopDomain } from "../config";

import { SERVER_TOOL_DECLARATIONS, INTERNAL_TOOL_NAMES } from "../MCP/server.tools";

/** One uniform tool list for the model: the dispatcher's tools plus the two
 *  host-only redirect buttons declared in the same array. */
export const AGENT_SHOP_TOOLS = [
  {
    functionDeclarations: SERVER_TOOL_DECLARATIONS.map((d) => ({
      name: d.name,
      description: d.description,
      parameters: d.parameters,
    })),
  },
];

/** The dispatcher intercepts these names and routes locally — no server call. */
export { INTERNAL_TOOL_NAMES };
