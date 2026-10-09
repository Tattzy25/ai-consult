/**
 * server.tools.ts - GENERATED from the live server's tools/list response.
 * The ONLY source of tool names + schemas. Do not hand-edit; regenerate
 * from the server instead when tools change.
 *
 * shop_domain / meta are stripped: the client injects them on every call
 * (see mcpCall.ts). The model never invents URLs.
 */

export const SERVER_TOOL_DECLARATIONS = [
  {
    "name": "search_catalog",
    "description": "Searches the store's product catalog. The response conforms to the UCP catalog search response, including a UCP metadata envelope; products with title, description, price range (minor units), media, and variants; and cursor-based pagination. When to use: A customer asks \"Do you have any organic coffee?\", You need to find products matching specific criteria, or A customer wants to browse items in a category.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "catalog": {
          "type": "OBJECT",
          "properties": {
            "query": {
              "type": "STRING",
              "description": "Free-text search query. For example, \"organic coffee beans\", \"winter jacket\"."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Localization hint for the buyer country.",
                  "type": "STRING"
                },
                "language": {
                  "description": "Localization hint for the buyer language.",
                  "type": "STRING"
                },
                "currency": {
                  "description": "Localization hint for the buyer currency.",
                  "type": "STRING"
                },
                "intent": {
                  "description": "The buyer's intent or shopping context.",
                  "type": "STRING"
                }
              },
              "description": "Buyer signals for relevance and localization (address_country, language, currency, and intent)."
            },
            "filters": {
              "type": "OBJECT",
              "properties": {
                "available": {
                  "type": "BOOLEAN",
                  "description": "Filter by availability. Defaults to true (only sale-ready items). Set to false to include unavailable items."
                }
              },
              "required": [
                "available"
              ],
              "description": "Availability filter. When true (default), only sale-ready items are returned. Set to false to include unavailable items."
            },
            "pagination": {
              "type": "OBJECT",
              "properties": {
                "cursor": {
                  "type": "STRING",
                  "description": "Opaque cursor from a previous response. Pass the returned pagination.cursor as catalog.pagination.cursor to request the next page."
                },
                "limit": {
                  "type": "INTEGER",
                  "description": "Page size. Integer, min 1, default 10, max 250."
                }
              },
              "description": "Cursor-based pagination controls. The cursor carries only the next result offset, so the request's limit controls page size."
            }
          },
          "description": "The catalog object containing the search parameters. All parameters are wrapped in a catalog object. Refer to the UCP catalog search spec for the complete schema."
        }
      },
      "required": [
        "catalog"
      ]
    }
  },
  {
    "name": "get_product",
    "description": "Retrieves full details for a single product with optional variant selection. The response conforms to the UCP catalog get_product response, including product.selected reflecting effective option selections, option values with available and exists signals, and variants matching the selection. Use this when a customer has selected a product and needs full details, you need to show variant options with availability signals, or a customer is making option selections (Color, Size, and so on).",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "catalog": {
          "type": "OBJECT",
          "properties": {
            "id": {
              "type": "STRING",
              "description": "Product or variant identifier. For example, \"gid://shopify/Product/123\"."
            },
            "selected": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "name": {
                    "type": "STRING",
                    "description": "The option name, e.g. \"Color\" or \"Size\"."
                  },
                  "label": {
                    "type": "STRING",
                    "description": "The option value label, e.g. \"Blue\" or \"10\"."
                  }
                },
                "required": [
                  "name",
                  "label"
                ]
              },
              "description": "Option selections for variant narrowing. For example, [{\"name\": \"Color\", \"label\": \"Blue\"}]. The response reflects these selections in product.selected and filters the returned variants accordingly."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Localization hint for the buyer country.",
                  "type": "STRING"
                },
                "language": {
                  "description": "Localization hint for the buyer language.",
                  "type": "STRING"
                },
                "currency": {
                  "description": "Localization hint for the buyer currency.",
                  "type": "STRING"
                },
                "intent": {
                  "description": "The buyer's intent or shopping context.",
                  "type": "STRING"
                }
              },
              "description": "Buyer context for localization (address_country, language, currency, and intent)."
            }
          },
          "required": [
            "id"
          ],
          "description": "The catalog object containing the product lookup parameters. All parameters are wrapped in a catalog object. Refer to the UCP catalog lookup spec for the complete schema."
        }
      },
      "required": [
        "catalog"
      ]
    }
  },
  {
    "name": "create_cart",
    "description": "Create a new cart with line items and optional buyer context. Use this when the buyer asks to place selected catalog products into a cart. The response includes the merchant-assigned cart ID, validated line items, estimated totals, and a 'continue_url' for continuing on the merchant's storefront.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "cart": {
          "type": "OBJECT",
          "properties": {
            "line_items": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "quantity": {
                    "type": "INTEGER",
                    "description": "The quantity to add for this line item."
                  },
                  "item": {
                    "type": "OBJECT",
                    "properties": {
                      "id": {
                        "type": "STRING",
                        "description": "The product variant id for this line item."
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ]
              },
              "description": "Array of items to add to the cart. Each item must include quantity and an item object with the product variant id."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Localization hint for the buyer country.",
                  "type": "STRING"
                },
                "address_region": {
                  "description": "Localization hint for the buyer region.",
                  "type": "STRING"
                },
                "postal_code": {
                  "description": "Localization hint for the buyer postal code.",
                  "type": "STRING"
                }
              },
              "description": "Localization hints including address_country, address_region, and postal_code. Merchants may use these as a signal for pricing, availability, and currency estimates, but context is not authoritative for shipping. If omitted, the merchant falls back to geo-IP."
            },
            "attribution": {
              "type": "OBJECT",
              "properties": {
                "referring_domain": {
                  "type": "STRING"
                },
                "click_id_tag": {
                  "type": "STRING"
                },
                "click_id_value": {
                  "type": "STRING"
                },
                "activity_id_tag": {
                  "type": "STRING"
                },
                "activity_id_value": {
                  "type": "STRING"
                },
                "utm_campaign": {
                  "type": "STRING"
                },
                "utm_source": {
                  "type": "STRING"
                },
                "utm_medium": {
                  "type": "STRING"
                },
                "utm_content": {
                  "type": "STRING"
                },
                "utm_term": {
                  "type": "STRING"
                }
              },
              "description": "Optional attribution metadata. Supported fields include referring_domain, click_id_tag, click_id_value, activity_id_tag, activity_id_value, utm_campaign, utm_source, utm_medium, utm_content, and utm_term."
            },
            "buyer": {
              "type": "OBJECT",
              "properties": {},
              "description": "Optional buyer information for personalized estimates."
            },
            "signals": {
              "type": "OBJECT",
              "properties": {},
              "description": "Optional platform-provided environment data for authorization and abuse prevention."
            }
          },
          "required": [
            "line_items"
          ],
          "description": "The cart object containing the cart data."
        }
      },
      "required": [
        "cart"
      ]
    }
  },
  {
    "name": "update_cart",
    "description": "Replace the contents of an existing cart. This tool uses PUT semantics: every request replaces the cart's full state with the supplied payload. Omitted fields, including 'line_items' or 'context', are removed. There is no server-side merge of partial updates. Preserve all existing state that the user has not asked to change.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "id": {
          "type": "STRING",
          "description": "The ID of the cart to update."
        },
        "cart": {
          "type": "OBJECT",
          "properties": {
            "line_items": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "quantity": {
                    "type": "INTEGER",
                    "description": "The full replacement quantity for this line item."
                  },
                  "item": {
                    "type": "OBJECT",
                    "properties": {
                      "id": {
                        "type": "STRING",
                        "description": "The product variant id for this line item."
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ]
              },
              "description": "Full replacement array of items."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Localization signal for the buyer country.",
                  "type": "STRING"
                },
                "address_region": {
                  "description": "Localization signal for the buyer region.",
                  "type": "STRING"
                },
                "postal_code": {
                  "description": "Localization signal for the buyer postal code.",
                  "type": "STRING"
                }
              },
              "description": "Localization signals. Context is a hint for pricing, availability, and currency and is not used as the shipping address at checkout."
            },
            "attribution": {
              "type": "OBJECT",
              "properties": {
                "referring_domain": {
                  "type": "STRING"
                },
                "click_id_tag": {
                  "type": "STRING"
                },
                "click_id_value": {
                  "type": "STRING"
                },
                "activity_id_tag": {
                  "type": "STRING"
                },
                "activity_id_value": {
                  "type": "STRING"
                },
                "utm_campaign": {
                  "type": "STRING"
                },
                "utm_source": {
                  "type": "STRING"
                },
                "utm_medium": {
                  "type": "STRING"
                },
                "utm_content": {
                  "type": "STRING"
                },
                "utm_term": {
                  "type": "STRING"
                }
              },
              "description": "Attribution metadata. Because the cart object is replaced, resend attribution if you want to preserve it."
            },
            "buyer": {
              "type": "OBJECT",
              "properties": {},
              "description": "Optional buyer information."
            },
            "signals": {
              "type": "OBJECT",
              "properties": {},
              "description": "Optional platform signals."
            }
          },
          "required": [
            "line_items"
          ],
          "description": "The cart object containing the full desired cart state. Any field you omit is removed from the cart. update_cart uses PUT semantics and does not merge partial updates."
        }
      },
      "required": [
        "id",
        "cart"
      ]
    }
  },
  {
    "name": "create_checkout",
    "description": "Create a new checkout session with line items, buyer information, and fulfillment preferences. Use this tool when a buyer is ready to purchase items and you need to initiate the checkout process. The response includes a `continue_url` for handing off to a trusted UI. When to use: Buyer says \"I want to buy this item\", or Agent has collected enough information to start checkout, and Buyer confirms their cart and wants to proceed.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "cart_id": {
          "type": "STRING",
          "description": "The optional ID of a cart built with Cart MCP to convert into this checkout."
        },
        "checkout": {
          "type": "OBJECT",
          "properties": {
            "currency": {
              "type": "STRING",
              "description": "ISO 4217 currency code, for example USD, EUR, or GBP."
            },
            "line_items": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "quantity": {
                    "type": "INTEGER",
                    "description": "The quantity to purchase for this line item."
                  },
                  "item": {
                    "type": "OBJECT",
                    "properties": {
                      "id": {
                        "type": "STRING",
                        "description": "The product variant id for this line item."
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ]
              },
              "description": "Array of items to purchase. Each item must include quantity and an item object with the product variant id."
            },
            "buyer": {
              "type": "OBJECT",
              "properties": {},
              "description": "Buyer information. Contact method email or phone_number must be provided, per-merchant configuration."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Provisional buyer signal for country.",
                  "type": "STRING"
                },
                "address_region": {
                  "description": "Provisional buyer signal for region.",
                  "type": "STRING"
                },
                "postal_code": {
                  "description": "Provisional buyer signal for postal code.",
                  "type": "STRING"
                },
                "intent": {
                  "description": "Provisional buyer intent signal.",
                  "type": "STRING"
                },
                "language": {
                  "description": "Provisional buyer language signal.",
                  "type": "STRING"
                },
                "currency": {
                  "description": "Provisional buyer currency signal.",
                  "type": "STRING"
                },
                "eligibility": {
                  "description": "Eligibility signals.",
                  "type": "ARRAY",
                  "items": {
                    "type": "STRING"
                  }
                }
              },
              "description": "Provisional buyer signals for intent, localization, currency, and eligibility decisions. A shipping address supersedes these context hints."
            },
            "attribution": {
              "type": "OBJECT",
              "properties": {
                "referring_domain": {
                  "type": "STRING"
                },
                "click_id_tag": {
                  "type": "STRING"
                },
                "click_id_value": {
                  "type": "STRING"
                },
                "activity_id_tag": {
                  "type": "STRING"
                },
                "activity_id_value": {
                  "type": "STRING"
                },
                "utm_campaign": {
                  "type": "STRING"
                },
                "utm_source": {
                  "type": "STRING"
                },
                "utm_medium": {
                  "type": "STRING"
                },
                "utm_content": {
                  "type": "STRING"
                },
                "utm_term": {
                  "type": "STRING"
                }
              },
              "description": "Optional attribution metadata. Supported fields include referring_domain, click_id_tag, click_id_value, activity_id_tag, activity_id_value, utm_campaign, utm_source, utm_medium, utm_content, and utm_term."
            },
            "fulfillment": {
              "type": "OBJECT",
              "properties": {},
              "description": "Fulfillment preferences including shipping methods and destinations."
            },
            "payment": {
              "type": "OBJECT",
              "properties": {},
              "description": "Payment configuration including available instruments and selected_instrument_id."
            }
          },
          "description": "The checkout object containing all checkout data. Optional when cart_id is provided, in which case the cart's contents are used instead."
        }
      },
      "required": []
    }
  },
  {
    "name": "update_checkout",
    "description": "Update an existing checkout session with new information. Use this tool to modify line items, update shipping address, change fulfillment method, or add buyer information before completing the checkout. When to use: Buyer wants to change quantity or remove items, Buyer provides or updates shipping address, Need to update buyer email or contact info, or Changing a delivery option. Caution: `update_checkout` uses PUT semantics. Each request replaces the full checkout state with the payload you send. Omit a field (for example `line_items` or `buyer`) and it is removed from the checkout. There is no server-side merge of partial updates. Before sending an update, remove response-only fields from the payload. `checkout.buyer.country_code` isn't accepted as input. `checkout.payment.instruments[].display` is response-only. For fulfillment updates, `checkout.fulfillment.methods[].id` is optional, but `line_item_ids` is required.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "id": {
          "type": "STRING",
          "description": "The ID of the checkout session to update."
        },
        "checkout": {
          "type": "OBJECT",
          "properties": {
            "line_items": {
              "type": "ARRAY",
              "items": {
                "type": "OBJECT",
                "properties": {
                  "id": {
                    "type": "STRING",
                    "description": "The existing checkout line item id."
                  },
                  "quantity": {
                    "type": "INTEGER",
                    "description": "The updated quantity for this line item."
                  },
                  "item": {
                    "type": "OBJECT",
                    "properties": {
                      "id": {
                        "type": "STRING",
                        "description": "The product variant id for this line item."
                      }
                    },
                    "required": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ]
              },
              "description": "Updated array of items. Replaces existing line items."
            },
            "buyer": {
              "type": "OBJECT",
              "properties": {},
              "description": "Updated buyer information. Contact method email or phone_number must be provided, per-merchant configuration."
            },
            "context": {
              "type": "OBJECT",
              "properties": {
                "address_country": {
                  "description": "Updated provisional buyer signal for country.",
                  "type": "STRING"
                },
                "address_region": {
                  "description": "Updated provisional buyer signal for region.",
                  "type": "STRING"
                },
                "postal_code": {
                  "description": "Updated provisional buyer signal for postal code.",
                  "type": "STRING"
                },
                "intent": {
                  "description": "Updated provisional buyer intent signal.",
                  "type": "STRING"
                },
                "language": {
                  "description": "Updated provisional buyer language signal.",
                  "type": "STRING"
                },
                "currency": {
                  "description": "Updated provisional buyer currency signal.",
                  "type": "STRING"
                },
                "eligibility": {
                  "description": "Updated eligibility signals.",
                  "type": "ARRAY",
                  "items": {
                    "type": "STRING"
                  }
                }
              },
              "description": "Updated provisional buyer signals for intent, localization, currency, and eligibility decisions. A shipping address supersedes these context hints."
            },
            "attribution": {
              "type": "OBJECT",
              "properties": {
                "referring_domain": {
                  "type": "STRING"
                },
                "click_id_tag": {
                  "type": "STRING"
                },
                "click_id_value": {
                  "type": "STRING"
                },
                "activity_id_tag": {
                  "type": "STRING"
                },
                "activity_id_value": {
                  "type": "STRING"
                },
                "utm_campaign": {
                  "type": "STRING"
                },
                "utm_source": {
                  "type": "STRING"
                },
                "utm_medium": {
                  "type": "STRING"
                },
                "utm_content": {
                  "type": "STRING"
                },
                "utm_term": {
                  "type": "STRING"
                }
              },
              "description": "Attribution metadata. Because the checkout object is replaced, resend attribution if you want to preserve it."
            },
            "fulfillment": {
              "type": "OBJECT",
              "properties": {},
              "description": "Updated fulfillment preferences. Each method must include line_item_ids."
            },
            "payment": {
              "type": "OBJECT",
              "properties": {},
              "description": "Updated payment configuration. Do not send response-only display fields from payment.instruments."
            }
          },
          "required": [
            "line_items",
            "buyer"
          ],
          "description": "The checkout object containing the complete updated checkout state. update_checkout uses PUT semantics. Omit a field and it is removed from the checkout. There is no server-side merge of partial updates."
        }
      },
      "required": [
        "id",
        "checkout"
      ]
    }
  },
  {
    "name": "search_shop_policies_and_faqs",
    "description": "Answers questions about the store's policies, products, and services to build customer trust. When to use: A customer asks \"What's your return policy?\", You need to clarify shipping or payment options, or A customer has questions about product care or warranties. Use natural language to query the search or the search will fail.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "store_domain": {
          "type": "STRING",
          "description": "The store domain to call. This maps to https://{storedomain}/api/mcp."
        },
        "query": {
          "type": "STRING",
          "description": "The question about policies or FAQs. For example, 'What is your return policy for sale items?'"
        },
        "context": {
          "type": "STRING",
          "description": "Additional context like the current product being viewed or the customer's situation."
        }
      },
      "required": [
        "store_domain",
        "query"
      ]
    }
  },
  {
    "name": "notify_cart_redirect",
    "description": "Open the buyer's current cart on the merchant storefront in a new tab. Call this ONLY when the buyer explicitly asks to see or edit their cart or to review their running total. Do NOT call this merely because an item was added to the cart — assume the buyer is still browsing until they say otherwise.",
    "parameters": {
      "type": "OBJECT",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "notify_checkout_redirect",
    "description": "Open checkout for the buyer's current cart on the merchant storefront in a new tab. Call this ONLY when the buyer confirms they are ready to pay and complete their purchase. Do NOT call this merely because a cart or checkout tool returned a checkout or continuation URL — wait for the buyer to say they are ready. You are also capable of creating out and redirecting the user if they explicitly get the complete total Then they can always click on back and come right back to you. That doesn't mean it's a check out or what not.",
    "parameters": {
      "type": "OBJECT",
      "properties": {},
      "required": []
    }
  },
  {
    "name": "get_ui_state",
    "description": "Retrieve the current state of the Commerce Layer. Use this tool to verify what the buyer is currently seeing on their screen, including selected product variants, cart contents, and the current stage of the shopping progression.",
    "parameters": {
      "type": "OBJECT",
      "properties": {},
      "required": []
    }
  }
] as const;

export const SERVER_TOOL_NAMES = SERVER_TOOL_DECLARATIONS.map(d => d.name);

/** Host-only tools the dispatcher intercepts locally — declared in the same
 *  array above so the model sees one uniform tool list. Never sent over the wire. */
export const INTERNAL_TOOL_NAMES = [
  "notify_cart_redirect",
  "notify_checkout_redirect",
  "get_ui_state",
] as const;

export function isServerTool(name: string): boolean {
  return (SERVER_TOOL_NAMES as readonly string[]).includes(name);
}
