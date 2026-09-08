export const AGENT_PROFILE_URL = "https://ucp-agent-profile.facetimefy.com/ucp/agent-profiles/2026-08-25/valid-with-capabilities.json";
export const MCP_ENDPOINT = "https://mcp-agents.tattty.com/mcp";

export const TATTOO_SHOP_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "search_catalog",
        description: "Search for tattoo-related products across multiple Shopify stores in the global catalog. Convert prices from minor units (divide by 100 for USD).",
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                query: { type: "STRING", description: "The search query (e.g. 'aftercare cream')" },
                filters: {
                  type: "OBJECT",
                  properties: {
                    price: {
                      type: "OBJECT",
                      properties: {
                        min: { type: "NUMBER" },
                        max: { type: "NUMBER" },
                      },
                    },
                    categories: { type: "ARRAY", items: { type: "STRING" } },
                  },
                },
              },
              required: ["query"],
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "get_product",
        description: "Retrieve detailed info about a specific product using its Shopify ID.",
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                id: { type: "STRING", description: "The Shopify Product ID (gid://shopify/p/...)" },
              },
              required: ["id"],
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "lookup_catalog",
        description: "Resolve multiple product or variant IDs in a single request.",
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                ids: { 
                  type: "ARRAY", 
                  items: { type: "STRING" }, 
                  description: "List of Product or Variant IDs" 
                },
              },
              required: ["ids"],
            },
          },
          required: ["catalog"],
        },
      },
    ],
  },
];
