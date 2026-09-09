export const CART_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "create_cart",
        description:
          'Create a new merchant cart from one or more selected catalog variants. Use this after the buyer has chosen the exact products or variants they want, and before checkout. Provide the merchant MCP endpoint, the agent profile URL, and at least one line item. The response includes the merchant cart ID, validated line items, estimated totals, and typically a continue_url for the buyer to resume on the merchant storefront. Product item IDs should be the variant or product identifiers accepted by the target merchant MCP server. Prices returned by UCP commerce services are commonly expressed in ISO 4217 minor units, for example {"amount": 2500, "currency": "USD"} means $25.00.',
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the selected merchant's MCP endpoint. This endpoint receives the forwarded JSON-RPC tools/call request.",
            },
            meta: {
              type: "OBJECT",
              description:
                "UCP request metadata identifying the calling shopping agent.",
              properties: {
                "ucp-agent": {
                  type: "OBJECT",
                  properties: {
                    profile: {
                      type: "STRING",
                      description:
                        "Absolute URL for the shopping agent's UCP agent profile.",
                    },
                  },
                  required: ["profile"],
                },
              },
              required: ["ucp-agent"],
            },
            cart: {
              type: "OBJECT",
              description:
                "The complete initial cart state to create. Unknown merchant-supported cart fields may also be accepted by the cart server.",
              properties: {
                line_items: {
                  type: "ARRAY",
                  description:
                    "One or more products or variants to add to the new cart.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      quantity: {
                        type: "INTEGER",
                        description:
                          "Number of units to add. Must be an integer of at least 1.",
                      },
                      item: {
                        type: "OBJECT",
                        properties: {
                          id: {
                            type: "STRING",
                            description:
                              "The merchant-supported product or variant ID, usually obtained from a prior catalog search, lookup, or product-details response.",
                          },
                        },
                        required: ["id"],
                      },
                    },
                    required: ["quantity", "item"],
                  },
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Optional buyer location, locale, and currency context used for availability, taxes, shipping estimates, or localized pricing.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description:
                        "Buyer country, preferably an ISO 3166-1 alpha-2 code such as US or CA.",
                    },
                    address_region: {
                      type: "STRING",
                      description:
                        "Buyer state, province, or region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description:
                        "Buyer postal or ZIP code.",
                    },
                    language: {
                      type: "STRING",
                      description:
                        "Buyer language or locale preference, such as en or en-US.",
                    },
                    currency: {
                      type: "STRING",
                      description:
                        "Requested ISO 4217 currency code, such as USD, CAD, or EUR.",
                    },
                  },
                },
                attribution: {
                  type: "OBJECT",
                  description:
                    "Optional string key-value attribution data, such as campaign, source, or referral information.",
                  additionalProperties: {
                    type: "STRING",
                  },
                },
                buyer: {
                  type: "OBJECT",
                  description:
                    "Optional merchant-supported buyer information. Only include data necessary for the requested commerce flow.",
                  additionalProperties: true,
                },
                signals: {
                  type: "OBJECT",
                  description:
                    "Optional merchant-supported agent or buyer signals.",
                  additionalProperties: true,
                },
              },
              required: ["line_items"],
            },
          },
          required: ["merchant_mcp_url", "meta", "cart"],
        },
      },

      {
        name: "get_cart",
        description:
          "Retrieve the latest state of an existing merchant cart. Use this before presenting totals, confirming cart contents, or starting checkout—especially after time has passed or a cart context may have changed. Provide the same merchant MCP endpoint and UCP agent metadata used for the cart flow, plus the merchant cart ID returned by create_cart. If the cart is expired, missing, or canceled, the merchant can return a successful JSON-RPC response containing an unrecoverable not_found business error.",
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the merchant MCP endpoint that owns the cart.",
            },
            meta: {
              type: "OBJECT",
              description:
                "UCP request metadata identifying the calling shopping agent.",
              properties: {
                "ucp-agent": {
                  type: "OBJECT",
                  properties: {
                    profile: {
                      type: "STRING",
                      description:
                        "Absolute URL for the shopping agent's UCP agent profile.",
                    },
                  },
                  required: ["profile"],
                },
              },
              required: ["ucp-agent"],
            },
            id: {
              type: "STRING",
              description:
                "Merchant-assigned cart ID returned by a prior create_cart response.",
            },
          },
          required: ["merchant_mcp_url", "meta", "id"],
        },
      },

      {
        name: "update_cart",
        description:
          "Replace the complete state of an existing merchant cart. Use this when the buyer changes quantity, selected variants, shipping/location context, attribution, buyer information, or other cart state. This operation uses PUT semantics: the submitted cart becomes the complete cart state. Omitted fields are removed rather than merged with the existing cart, so always send every field that should remain. Provide at least one line item; to remove products, submit the desired remaining line items. To remove the cart entirely, use cancel_cart only after the buyer explicitly asks to cancel.",
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the merchant MCP endpoint that owns the cart.",
            },
            meta: {
              type: "OBJECT",
              description:
                "UCP request metadata identifying the calling shopping agent.",
              properties: {
                "ucp-agent": {
                  type: "OBJECT",
                  properties: {
                    profile: {
                      type: "STRING",
                      description:
                        "Absolute URL for the shopping agent's UCP agent profile.",
                    },
                  },
                  required: ["profile"],
                },
              },
              required: ["ucp-agent"],
            },
            id: {
              type: "STRING",
              description:
                "Merchant-assigned cart ID returned by create_cart.",
            },
            cart: {
              type: "OBJECT",
              description:
                "The full replacement cart state. Fields omitted from this object are removed from the cart.",
              properties: {
                line_items: {
                  type: "ARRAY",
                  description:
                    "The complete replacement list of cart items. Must contain at least one item.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      quantity: {
                        type: "INTEGER",
                        description:
                          "Number of units for this item. Must be an integer of at least 1.",
                      },
                      item: {
                        type: "OBJECT",
                        properties: {
                          id: {
                            type: "STRING",
                            description:
                              "Merchant-supported product or variant ID.",
                          },
                        },
                        required: ["id"],
                      },
                    },
                    required: ["quantity", "item"],
                  },
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Optional replacement buyer location, locale, and currency context.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description:
                        "Buyer country, preferably an ISO 3166-1 alpha-2 code.",
                    },
                    address_region: {
                      type: "STRING",
                      description:
                        "Buyer state, province, or region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description:
                        "Buyer postal or ZIP code.",
                    },
                    language: {
                      type: "STRING",
                      description:
                        "Buyer language or locale preference, such as en or en-US.",
                    },
                    currency: {
                      type: "STRING",
                      description:
                        "Requested ISO 4217 currency code, such as USD.",
                    },
                  },
                },
                attribution: {
                  type: "OBJECT",
                  description:
                    "Optional replacement string key-value attribution data.",
                  additionalProperties: {
                    type: "STRING",
                  },
                },
                buyer: {
                  type: "OBJECT",
                  description:
                    "Optional replacement merchant-supported buyer information.",
                  additionalProperties: true,
                },
                signals: {
                  type: "OBJECT",
                  description:
                    "Optional replacement merchant-supported agent or buyer signals.",
                  additionalProperties: true,
                },
              },
              required: ["line_items"],
            },
          },
          required: ["merchant_mcp_url", "meta", "id", "cart"],
        },
      },

      {
        name: "cancel_cart",
        description:
          "Permanently cancel an existing merchant cart. Use this only when the buyer explicitly asks to cancel or discard their cart. Cancellation removes the cart from merchant storage, and subsequent get_cart calls for the same ID should return a not_found business outcome. Supply a new UUID idempotency key for this cancellation request so retrying a network-failed request does not cause unintended duplicate cancellation behavior.",
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the merchant MCP endpoint that owns the cart.",
            },
            meta: {
              type: "OBJECT",
              description:
                "UCP request metadata identifying the calling shopping agent and this idempotent cancellation operation.",
              properties: {
                "ucp-agent": {
                  type: "OBJECT",
                  properties: {
                    profile: {
                      type: "STRING",
                      description:
                        "Absolute URL for the shopping agent's UCP agent profile.",
                    },
                  },
                  required: ["profile"],
                },
                "idempotency-key": {
                  type: "STRING",
                  description:
                    "A UUID generated for this cancellation request. Reuse the same value only when retrying this exact cancellation after an uncertain transport failure.",
                },
              },
              required: ["ucp-agent", "idempotency-key"],
            },
            id: {
              type: "STRING",
              description:
                "Merchant-assigned cart ID to permanently cancel.",
            },
          },
          required: ["merchant_mcp_url", "meta", "id"],
        },
      },
    ],
  },
] as const;