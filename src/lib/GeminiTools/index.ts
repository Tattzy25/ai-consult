export {
  AGENT_PROFILE_URL,
  MCP_ENDPOINT,
} from "./config";

import { CATALOG_TOOLS } from "./catalog.tools";
import { CART_TOOLS } from "./cart.tools";
import { UI_TOOLS } from "./ui.tools";

export const AGENT_SHOP_TOOLS = [
  ...CATALOG_TOOLS,
  ...CART_TOOLS,
  ...UI_TOOLS,
] as const;