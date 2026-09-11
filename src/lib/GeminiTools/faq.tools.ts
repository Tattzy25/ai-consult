export const FAQ_AND_POLICIES_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "search_faq",
        description:
          'Search FAQ content for a specific Shopify store. Use this tool for common buyer questions answered in FAQ-style content, such as shipping times, returns, exchanges, sizing, materials, care instructions, order tracking, warranty, or store practices. Use one direct query per request. Do not batch multiple unrelated FAQ searches into one call. Good examples: "shipping and delivery", "return policy", "order tracking", "size guide", "materials and care". If the user asks to test one query, make exactly one call.',
        parameters: {
          type: "OBJECT",
          properties: {
            store_domain: {
              type: "STRING",
              description:
                "The merchant store domain to search, for example tattty.com.",
            },
            query: {
              type: "STRING",
              description:
                'A single direct FAQ query matching the user request. Use literal queries such as "shipping and delivery", "return policy", "size guide", or "order tracking". Do not combine many unrelated searches into one call.',
            },
            context: {
              type: "STRING",
              description:
                "Optional short context to disambiguate the FAQ search when needed.",
            },
          },
          required: ["store_domain", "query"],
        },
      },
      {
        name: "get_policy",
        description:
          'Search for a formal store policy for a specific Shopify store. Use this tool for policy-document lookups such as return and refund policy, privacy policy, terms of service, shipping policy, legal notice, or purchase options cancellation policy. Make exactly one policy lookup per requested policy unless the user explicitly asks for multiple. Use a literal query matching the policy name. Good examples: "return and refund policy", "privacy policy", "terms of service", "shipping policy", "legal notice", "purchase options cancellation policy". Do not substitute nearby concepts or run repeated exploratory searches unless instructed.',
        parameters: {
          type: "OBJECT",
          properties: {
            store_domain: {
              type: "STRING",
              description:
                "The merchant store domain to search, for example tattty.com.",
            },
            query: {
              type: "STRING",
              description:
                'A single literal policy query matching the requested policy name, such as "privacy policy" or "terms of service".',
            },
            context: {
              type: "STRING",
              description:
                'Optional short context for disambiguation, for example "formal store policy lookup" or "buyer requested exact policy document".',
            },
          },
          required: ["store_domain", "query"],
        },
      },
      {
        name: "list_policies",
        description:
          'List or discover what policies are available for a specific Shopify store. Use this tool only when the user asks what policies exist, or when you need discovery before retrieving a specific policy.',
        parameters: {
          type: "OBJECT",
          properties: {
            store_domain: {
              type: "STRING",
              description:
                "The merchant store domain whose policies should be discovered.",
            },
          },
          required: ["store_domain"],
        },
      },
    ],
  },
] as const;