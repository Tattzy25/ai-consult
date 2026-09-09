export const CATALOG_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "search_catalog",
        description:
          'Search for products across multiple Shopify stores in the global catalog. Use this tool when buyers are searching for products without specifying a particular store. Examples: "I\'m looking for a pair of running shoes", "Find me some wireless headphones under $100", "Search for organic coffee beans". Input and response conform to the UCP catalog search capability (dev.ucp.shopping.catalog.search). Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                query: {
                  type: "STRING",
                  description:
                    "Free-text product search query. This may be an empty string when using other catalog search inputs.",
                },
                filters: {
                  type: "OBJECT",
                  properties: {
                    price: {
                      type: "OBJECT",
                      properties: {
                        min: {
                          type: "NUMBER",
                          description:
                            "Minimum price in the currency minor unit used by the catalog.",
                        },
                        max: {
                          type: "NUMBER",
                          description:
                            "Maximum price in the currency minor unit used by the catalog.",
                        },
                      },
                    },
                    categories: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description:
                        "Optional product categories to include in the search.",
                    },
                  },
                },
                pagination: {
                  type: "OBJECT",
                  properties: {
                    limit: {
                      type: "INTEGER",
                      description:
                        "Maximum number of catalog results to return.",
                    },
                    cursor: {
                      type: "STRING",
                      description:
                        "Cursor from a previous search result page.",
                    },
                  },
                },
              },
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "get_product",
        description:
          'Retrieve details about a specific product across multiple Shopify stores. Use this tool when buyers are interested in a particular product. Examples: "What are the details of the iPhone 12?", "Tell me about the Sony WH-1000XM4 headphones". Input and response conform to the UCP product details capability (dev.ucp.shopping.product.details). Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                id: {
                  type: "STRING",
                  description:
                    "The product identifier returned by a prior global catalog result.",
                },
              },
              required: ["id"],
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "lookup_catalog",
        description:
          'Look up multiple products or variants by identifier from the global catalog. Use this tool to resolve multiple product/variant IDs in a single request. Supports: Product IDs (gid://shopify/p/{id}): Returns product with one featured variant. Variant IDs (gid://shopify/ProductVariant/{id}): Returns parent product with the exact variant. Results are grouped by product. Each variant includes an input array showing which request ID resolved to it and whether the match was exact or featured. Examples: resolving a list of product IDs from search results, validating multiple cart items in one call, and looking up products from deep links or saved lists. Input and response conform to the UCP catalog lookup capability (dev.ucp.shopping.catalog.lookup). Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                ids: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                  description:
                    "Product or variant identifiers from prior catalog results.",
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
] as const;