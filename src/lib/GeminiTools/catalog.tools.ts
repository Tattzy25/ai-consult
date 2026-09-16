export const CATALOG_TOOLS = [
  {
    "name": "search_catalog",
    "description": "Searches the store's product catalog. The response conforms to the UCP catalog search response, including a UCP metadata envelope; products with title, description, price range (minor units), media, and variants; and cursor-based pagination. Use this when a customer asks for products matching specific criteria or wants to browse items in a category.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain (e.g., 'your-shop-domain.myshopify.com')."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string",
                  "description": "The profile URL of the UCP agent."
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Free-text search query. Can be combined with 'like' for multimodal search."
            },
            "catalog_id": {
              "type": "string",
              "description": "GID of a saved catalog configuration. Used for affiliate attribution and promoted placements."
            },
            "view": {
              "type": "string",
              "description": "The view mode. Use 'offer' for comparison shopping results."
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string",
                  "description": "ISO 3166-1 alpha-2 country code."
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                },
                "language": {
                  "type": "string"
                },
                "currency": {
                  "type": "string"
                },
                "intent": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code",
                "language",
                "currency",
                "intent"
              ]
            },
            "filters": {
              "type": "object",
              "properties": {
                "available": {
                  "type": "boolean",
                  "description": "If true, only return sale-ready items. Defaults to true."
                },
                "condition": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "new",
                      "secondhand"
                    ]
                  }
                },
                "ships_to": {
                  "type": "object",
                  "properties": {
                    "country": {
                      "type": "string"
                    },
                    "region": {
                      "type": "string"
                    },
                    "postal_code": {
                      "type": "string"
                    }
                  },
                  "propertyOrdering": [
                    "country",
                    "region",
                    "postal_code"
                  ]
                },
                "ships_from": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "country": {
                        "type": "string"
                      }
                    },
                    "propertyOrdering": [
                      "country"
                    ]
                  }
                },
                "price": {
                  "type": "object",
                  "properties": {
                    "min": {
                      "type": "integer",
                      "description": "Min price in minor units."
                    },
                    "max": {
                      "type": "integer",
                      "description": "Max price in minor units."
                    }
                  },
                  "propertyOrdering": [
                    "min",
                    "max"
                  ]
                },
                "price_tier": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "low",
                      "medium",
                      "high"
                    ]
                  }
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "enum": [
                          "Color",
                          "Size",
                          "Target gender"
                        ]
                      },
                      "values": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "propertyOrdering": [
                      "name",
                      "values"
                    ]
                  }
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "variant": {
                      "type": "object",
                      "properties": {
                        "min": {
                          "type": "number"
                        },
                        "min_count": {
                          "type": "integer"
                        }
                      },
                      "propertyOrdering": [
                        "min",
                        "min_count"
                      ]
                    }
                  },
                  "propertyOrdering": [
                    "variant"
                  ]
                }
              },
              "propertyOrdering": [
                "available",
                "condition",
                "ships_to",
                "ships_from",
                "price",
                "price_tier",
                "attributes",
                "rating"
              ]
            },
            "like": {
              "type": "array",
              "description": "Similarity search references (Product/Variant GID or Base64 image).",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "image": {
                    "type": "object",
                    "properties": {
                      "content_type": {
                        "type": "string"
                      },
                      "data": {
                        "type": "string",
                        "description": "Base64 encoded image."
                      }
                    },
                    "propertyOrdering": [
                      "content_type",
                      "data"
                    ]
                  }
                },
                "propertyOrdering": [
                  "id",
                  "image"
                ]
              }
            },
            "pagination": {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "integer",
                  "description": "Max results (1-250)."
                },
                "cursor": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "limit",
                "cursor"
              ]
            }
          },
          "propertyOrdering": [
            "query",
            "catalog_id",
            "view",
            "context",
            "filters",
            "like",
            "pagination"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "lookup_catalog",
    "description": "Retrieves products or variants by identifier. The response conforms to the UCP catalog lookup response, including products with inputs correlation on each variant and not_found messages for unresolved identifiers. Use this when you have product or variant IDs from search results or deep links, need to resolve multiple identifiers in a single request, or are validating cart items against current catalog data..",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "ids": {
              "type": "array",
              "description": "Array of up to 10 GIDs (Product or Variant).",
              "items": {
                "type": "string"
              }
            },
            "filters": {
              "type": "object",
              "properties": {
                "available": {
                  "type": "boolean"
                }
              },
              "propertyOrdering": [
                "available"
              ]
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country"
              ]
            }
          },
          "required": [
            "ids"
          ],
          "propertyOrdering": [
            "ids",
            "filters",
            "context"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "get_product",
    "description": "Retrieves full details for a single product with optional variant selection. The response conforms to the UCP catalog get_product response, including product.selected reflecting effective option selections, option values with available and exists signals, and variants matching the selection. Use this when a customer has selected a product and needs full details, you need to show variant options with availability signals, or a customer is making option selections (Color, Size, and so on)..",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The Product or Variant GID."
            },
            "selected": {
              "type": "array",
              "description": "Option selections to narrow down to a specific variant.",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "label": {
                    "type": "string"
                  }
                },
                "propertyOrdering": [
                  "name",
                  "label"
                ]
              }
            },
            "preferences": {
              "type": "array",
              "description": "Option names in relaxation priority order.",
              "items": {
                "type": "string"
              }
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country"
              ]
            },
            "view": {
              "type": "string",
              "description": "View mode. Use 'summary' for condensed detail."
            }
          },
          "required": [
            "id"
          ],
          "propertyOrdering": [
            "id",
            "selected",
            "preferences",
            "context",
            "view"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "global_search_catalog",
    "description": "Searches for products across all Shopify merchants. The response conforms to the UCP catalog search response, including a UCP metadata envelope; products with title, description, price range (minor units), media, and variants. Use this when a customer asks for products matching criteria from any merchant, or wants to compare products across multiple stores. Some response fields (description, options, metadata.attributes, metadata.tech_specs, metadata.top_features, metadata.unique_selling_points, variants[].condition) are inferred by Shopify and may not always be present or may vary in accuracy. Treat them as discovery and merchandising signals, not as merchant-authored source text.",
    "parameters": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "description": "Agent metadata required for every request.",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string",
                  "description": "The profile URL of the UCP agent."
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Free-text search query. Can be used alone or combined with 'like' for multimodal search."
            },
            "catalog_id": {
              "type": "string",
              "description": "GID of a saved catalog configuration. Used for affiliate attribution and promoted placements."
            },
            "view": {
              "type": "string",
              "description": "The view mode. Use 'offer' for comparison shopping results."
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string",
                  "description": "ISO 3166-1 alpha-2 country code."
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                },
                "language": {
                  "type": "string",
                  "description": "e.g., 'en-US'"
                },
                "currency": {
                  "type": "string",
                  "description": "ISO 4217 currency code."
                },
                "intent": {
                  "type": "string",
                  "description": "Description of buyer intent to help refine results."
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code",
                "language",
                "currency",
                "intent"
              ]
            },
            "filters": {
              "type": "object",
              "properties": {
                "available": {
                  "type": "boolean",
                  "description": "If true, only return sale-ready items. Defaults to true."
                },
                "condition": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "new",
                      "secondhand"
                    ]
                  },
                  "description": "Filter by product condition."
                },
                "ships_to": {
                  "type": "object",
                  "properties": {
                    "country": {
                      "type": "string",
                      "description": "ISO 3166-1 alpha-2 country code."
                    },
                    "region": {
                      "type": "string"
                    },
                    "postal_code": {
                      "type": "string"
                    }
                  },
                  "propertyOrdering": [
                    "country",
                    "region",
                    "postal_code"
                  ]
                },
                "ships_from": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "country": {
                        "type": "string"
                      }
                    },
                    "propertyOrdering": [
                      "country"
                    ]
                  }
                },
                "shops": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Restrict results to specific shop GIDs (max 1000)."
                },
                "price": {
                  "type": "object",
                  "properties": {
                    "min": {
                      "type": "integer",
                      "description": "Min price in minor units."
                    },
                    "max": {
                      "type": "integer",
                      "description": "Max price in minor units."
                    }
                  },
                  "propertyOrdering": [
                    "min",
                    "max"
                  ]
                },
                "price_tier": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "low",
                      "medium",
                      "high"
                    ]
                  }
                },
                "categories": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Taxonomy category GIDs."
                },
                "attributes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "enum": [
                          "Color",
                          "Size",
                          "Target gender"
                        ]
                      },
                      "values": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    },
                    "propertyOrdering": [
                      "name",
                      "values"
                    ]
                  }
                },
                "rating": {
                  "type": "object",
                  "properties": {
                    "variant": {
                      "type": "object",
                      "properties": {
                        "min": {
                          "type": "number",
                          "description": "Min rating (0-5)."
                        },
                        "min_count": {
                          "type": "integer",
                          "description": "Min number of reviews."
                        }
                      },
                      "propertyOrdering": [
                        "min",
                        "min_count"
                      ]
                    }
                  },
                  "propertyOrdering": [
                    "variant"
                  ]
                }
              },
              "propertyOrdering": [
                "available",
                "condition",
                "ships_to",
                "ships_from",
                "shops",
                "price",
                "price_tier",
                "categories",
                "attributes",
                "rating"
              ]
            },
            "like": {
              "type": "array",
              "description": "Similarity search references. Can be a GID or an image.",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Product or Variant GID."
                  },
                  "image": {
                    "type": "object",
                    "properties": {
                      "content_type": {
                        "type": "string",
                        "description": "MIME type (e.g., image/jpeg)."
                      },
                      "data": {
                        "type": "string",
                        "description": "Base64 encoded image data."
                      }
                    },
                    "propertyOrdering": [
                      "content_type",
                      "data"
                    ]
                  }
                },
                "propertyOrdering": [
                  "id",
                  "image"
                ]
              }
            },
            "pagination": {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "integer",
                  "description": "Max results (1-50)."
                },
                "cursor": {
                  "type": "string",
                  "description": "Cursor for the next page of results."
                }
              },
              "propertyOrdering": [
                "limit",
                "cursor"
              ]
            }
          },
          "propertyOrdering": [
            "query",
            "catalog_id",
            "view",
            "context",
            "filters",
            "like",
            "pagination"
          ]
        }
      },
      "required": [
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "global_lookup_catalog",
    "description": "Retrieves products or variants by identifier from across all Shopify merchants. The response conforms to the UCP catalog lookup response, including products with inputs correlation on each variant and not_found messages for unresolved identifiers. Use this when you have product or variant IDs from search results or deep links, need to resolve multiple identifiers in a single request, or are validating cart items against current catalog data.",
    "parameters": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "ids": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Array of 1-50 identifiers (gid://shopify/p/... or Shopify URLs)."
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code"
              ]
            }
          },
          "required": [
            "ids"
          ],
          "propertyOrdering": [
            "ids",
            "context"
          ]
        }
      },
      "required": [
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "global_get_product",
    "description": "Retrieves full details for a single product with optional variant selection. The response conforms to the UCP catalog get_product response, including product.selected reflecting effective option selections, option values with available and exists signals, and variants matching the selection. Use this when a customer has selected a product and needs full details, you need to show variant options with availability signals, or a customer is making option selections (Color, Size, and so on). Some response fields (description, options, metadata.attributes, metadata.tech_specs, metadata.top_features, metadata.unique_selling_points, variants[].condition) are inferred by Shopify and may not always be present or may vary in accuracy. Treat them as discovery and merchandising signals, not as merchant-authored source text.",
    "parameters": {
      "type": "object",
      "properties": {
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "catalog": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The product or variant GID."
            },
            "selected": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Option name (e.g., 'Color')."
                  },
                  "label": {
                    "type": "string",
                    "description": "Option value (e.g., 'Black')."
                  }
                },
                "propertyOrdering": [
                  "name",
                  "label"
                ]
              },
              "description": "Specific options selected to narrow down to a variant."
            },
            "preferences": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Option names in order of relaxation priority."
            },
            "view": {
              "type": "string",
              "description": "View mode. Use 'summary' for a condensed view."
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country"
              ]
            }
          },
          "required": [
            "id"
          ],
          "propertyOrdering": [
            "id",
            "selected",
            "preferences",
            "view",
            "context"
          ]
        }
      },
      "required": [
        "meta",
        "catalog"
      ],
      "propertyOrdering": [
        "meta",
        "catalog"
      ]
    }
  },
  {
    "name": "create_cart",
    "description": "Create a new cart with line items and optional buyer context. Use this when the buyer asks to place selected catalog products into a cart. The response includes the merchant-assigned cart ID, validated line items, estimated totals, and a 'continue_url' for continuing on the merchant's storefront.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain (e.g., 'your-shop-domain.myshopify.com')."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string",
                  "description": "The profile URL of the UCP agent."
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "cart": {
          "type": "object",
          "properties": {
            "line_items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "quantity": {
                    "type": "integer"
                  },
                  "item": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Product Variant GID."
                      }
                    },
                    "required": [
                      "id"
                    ],
                    "propertyOrdering": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ],
                "propertyOrdering": [
                  "quantity",
                  "item"
                ]
              }
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string",
                  "description": "ISO 3166-1 alpha-2 country code."
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code"
              ]
            },
            "attribution": {
              "type": "object",
              "properties": {
                "referring_domain": {
                  "type": "string"
                },
                "click_id_tag": {
                  "type": "string"
                },
                "click_id_value": {
                  "type": "string"
                },
                "activity_id_tag": {
                  "type": "string"
                },
                "activity_id_value": {
                  "type": "string"
                },
                "utm_campaign": {
                  "type": "string"
                },
                "utm_source": {
                  "type": "string"
                },
                "utm_medium": {
                  "type": "string"
                },
                "utm_content": {
                  "type": "string"
                },
                "utm_term": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "referring_domain",
                "click_id_tag",
                "click_id_value",
                "activity_id_tag",
                "activity_id_value",
                "utm_campaign",
                "utm_source",
                "utm_medium",
                "utm_content",
                "utm_term"
              ]
            }
          },
          "propertyOrdering": [
            "line_items",
            "context",
            "attribution"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "cart"
      ]
    }
  },
  {
    "name": "get_cart",
    "description": "Retrieve the current state of an existing cart. Use this to review its contents, refresh estimated totals, or obtain the current full state before an update. If the cart does not exist or has expired, the tool may return a successful JSON-RPC result whose messages array contains an unrecoverable error with code 'not_found'. Check the returned business outcome rather than assuming that a successful transport response means the cart exists.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "id": {
          "type": "string",
          "description": "The cart GID (e.g., 'gid://shopify/Cart/cart_abc123')."
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id"
      ]
    }
  },
  {
    "name": "update_cart",
    "description": "Replace the contents of an existing cart. This tool uses PUT semantics: every request replaces the cart's full state with the supplied payload. Omitted fields, including 'line_items' or 'context', are removed. There is no server-side merge of partial updates. Preserve all existing state that the user has not asked to change.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "id": {
          "type": "string",
          "description": "The cart GID."
        },
        "cart": {
          "type": "object",
          "properties": {
            "line_items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "quantity": {
                    "type": "integer"
                  },
                  "item": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id"
                    ],
                    "propertyOrdering": [
                      "id"
                    ]
                  }
                },
                "propertyOrdering": [
                  "quantity",
                  "item"
                ]
              }
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code"
              ]
            },
            "attribution": {
              "type": "object",
              "properties": {
                "utm_source": {
                  "type": "string"
                },
                "utm_medium": {
                  "type": "string"
                },
                "utm_campaign": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "utm_source",
                "utm_medium",
                "utm_campaign"
              ]
            }
          },
          "propertyOrdering": [
            "line_items",
            "context",
            "attribution"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id",
        "cart"
      ]
    }
  },
  {
    "name": "cancel_cart",
    "description": "Cancel an active cart. Requires meta[\"idempotency-key\"] containing a UUID, in addition to meta[\"ucp-agent\"]. Cancellation removes the cart from storage. Subsequent requests for the same cart ID return a 'not_found' business outcome. Use this only when the user requests or clearly authorizes cancellation.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            },
            "idempotency-key": {
              "type": "string",
              "description": "A unique UUID to prevent duplicate cancellation requests."
            }
          },
          "required": [
            "ucp-agent",
            "idempotency-key"
          ],
          "propertyOrdering": [
            "ucp-agent",
            "idempotency-key"
          ]
        },
        "id": {
          "type": "string",
          "description": "The cart GID to be cancelled."
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id"
      ]
    }
  },
  {
    "name": "create_checkout",
    "description": "Create a new checkout session with line items, buyer information, and fulfillment preferences. Use this tool when a buyer is ready to purchase items and you need to initiate the checkout process. The response includes a `continue_url` for handing off to a trusted UI. When to use: Buyer says \"I want to buy this item\", or Agent has collected enough information to start checkout, and Buyer confirms their cart and wants to proceed.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain (e.g., 'your-shop-domain.myshopify.com')."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string",
                  "description": "The profile URL of the UCP agent."
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "cart_id": {
          "type": "string",
          "description": "The GID of the cart to convert to a checkout (e.g., 'gid://shopify/Cart/abc')."
        },
        "checkout": {
          "type": "object",
          "properties": {
            "currency": {
              "type": "string",
              "description": "ISO 4217 currency code (e.g., 'USD')."
            },
            "line_items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "quantity": {
                    "type": "integer"
                  },
                  "item": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Product Variant GID."
                      }
                    },
                    "required": [
                      "id"
                    ],
                    "propertyOrdering": [
                      "id"
                    ]
                  }
                },
                "required": [
                  "quantity",
                  "item"
                ],
                "propertyOrdering": [
                  "quantity",
                  "item"
                ]
              }
            },
            "buyer": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "email"
              ]
            },
            "context": {
              "type": "object",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Description of buyer intent."
                },
                "language": {
                  "type": "string",
                  "description": "e.g., 'en-US'"
                },
                "currency": {
                  "type": "string"
                },
                "eligibility": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Loyalty or eligibility tags."
                }
              },
              "propertyOrdering": [
                "intent",
                "language",
                "currency",
                "eligibility"
              ]
            },
            "attribution": {
              "type": "object",
              "properties": {
                "referring_domain": {
                  "type": "string"
                },
                "click_id_tag": {
                  "type": "string"
                },
                "click_id_value": {
                  "type": "string"
                },
                "activity_id_tag": {
                  "type": "string"
                },
                "activity_id_value": {
                  "type": "string"
                },
                "utm_campaign": {
                  "type": "string"
                },
                "utm_source": {
                  "type": "string"
                },
                "utm_medium": {
                  "type": "string"
                },
                "utm_content": {
                  "type": "string"
                },
                "utm_term": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "referring_domain",
                "click_id_tag",
                "click_id_value",
                "activity_id_tag",
                "activity_id_value",
                "utm_campaign",
                "utm_source",
                "utm_medium",
                "utm_content",
                "utm_term"
              ]
            }
          },
          "propertyOrdering": [
            "currency",
            "line_items",
            "buyer",
            "context",
            "attribution"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "cart_id",
        "checkout"
      ]
    }
  },
  {
    "name": "get_checkout",
    "description": "Retrieve the current state of an existing checkout session. Use this tool to check the status of a checkout, see updated totals after changes, or verify what information is still needed before completion. When to use: Need to refresh checkout state after buyer returns, Want to show current totals and line items, or Checking if checkout is ready for payment.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "id": {
          "type": "string",
          "description": "The checkout GID including the key (e.g., 'gid://shopify/Checkout/abc?key=xyz')."
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id"
      ]
    }
  },
  {
    "name": "update_checkout",
    "description": "Update an existing checkout session with new information. Use this tool to modify line items, update shipping address, change fulfillment method, or add buyer information before completing the checkout. When to use: Buyer wants to change quantity or remove items, Buyer provides or updates shipping address, Need to update buyer email or contact info, or Changing a delivery option. Caution: `update_checkout` uses PUT semantics. Each request replaces the full checkout state with the payload you send. Omit a field (for example `line_items` or `buyer`) and it is removed from the checkout. There is no server-side merge of partial updates. Before sending an update, remove response-only fields from the payload. `checkout.buyer.country_code` isn't accepted as input. `checkout.payment.instruments[].display` is response-only. For fulfillment updates, `checkout.fulfillment.methods[].id` is optional, but `line_item_ids` is required.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            }
          },
          "required": [
            "ucp-agent"
          ],
          "propertyOrdering": [
            "ucp-agent"
          ]
        },
        "id": {
          "type": "string",
          "description": "The checkout GID including the key."
        },
        "checkout": {
          "type": "object",
          "properties": {
            "line_items": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "The CartLine GID."
                  },
                  "quantity": {
                    "type": "integer"
                  },
                  "item": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id"
                    ],
                    "propertyOrdering": [
                      "id"
                    ]
                  }
                },
                "propertyOrdering": [
                  "id",
                  "quantity",
                  "item"
                ]
              }
            },
            "buyer": {
              "type": "object",
              "properties": {
                "email": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "email"
              ]
            },
            "context": {
              "type": "object",
              "properties": {
                "address_country": {
                  "type": "string"
                },
                "address_region": {
                  "type": "string"
                },
                "postal_code": {
                  "type": "string"
                },
                "intent": {
                  "type": "string"
                },
                "language": {
                  "type": "string"
                },
                "currency": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "address_country",
                "address_region",
                "postal_code",
                "intent",
                "language",
                "currency"
              ]
            },
            "attribution": {
              "type": "object",
              "properties": {
                "utm_source": {
                  "type": "string"
                }
              },
              "propertyOrdering": [
                "utm_source"
              ]
            }
          },
          "propertyOrdering": [
            "line_items",
            "buyer",
            "context",
            "attribution"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id",
        "checkout"
      ]
    }
  },
  {
    "name": "complete_checkout",
    "description": "Submit payment and place the order. Requires `meta[\"idempotency-key\"]` (UUID) in addition to `meta[\"ucp-agent\"]`. Use this tool when the checkout is ready and the buyer has authorized payment. This finalizes the transaction and creates an order. When to use: Checkout status is `ready_for_complete`, Buyer has reviewed and confirmed the order, or Payment credential has been collected.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            },
            "idempotency-key": {
              "type": "string",
              "description": "A unique UUID to ensure the request is processed only once."
            }
          },
          "required": [
            "ucp-agent",
            "idempotency-key"
          ],
          "propertyOrdering": [
            "ucp-agent",
            "idempotency-key"
          ]
        },
        "id": {
          "type": "string",
          "description": "The checkout GID including the key."
        },
        "checkout": {
          "type": "object",
          "properties": {
            "payment": {
              "type": "object",
              "properties": {
                "instruments": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Payment instrument ID."
                      },
                      "handler_id": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string",
                        "description": "e.g., 'card'"
                      }
                    },
                    "propertyOrdering": [
                      "id",
                      "handler_id",
                      "type"
                    ]
                  }
                }
              },
              "propertyOrdering": [
                "instruments"
              ]
            }
          },
          "propertyOrdering": [
            "payment"
          ]
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id",
        "checkout"
      ]
    }
  },
  {
    "name": "cancel_checkout",
    "description": "Cancel an active checkout session. Requires `meta[\"idempotency-key\"]` (UUID) in addition to `meta[\"ucp-agent\"]`. Use this tool when a buyer abandons the checkout or explicitly requests cancellation. Canceled checkouts can't be resumed. Cancellation expires the checkout immediately. The canceled checkout resource includes `expires_at`, which is set to the cancellation timestamp. When to use: Buyer explicitly cancels the order, Session has been abandoned, or Need to start fresh with a new checkout.",
    "parameters": {
      "type": "object",
      "properties": {
        "shop_domain": {
          "type": "string",
          "description": "The Shopify shop domain."
        },
        "meta": {
          "type": "object",
          "properties": {
            "ucp-agent": {
              "type": "object",
              "properties": {
                "profile": {
                  "type": "string"
                }
              },
              "required": [
                "profile"
              ],
              "propertyOrdering": [
                "profile"
              ]
            },
            "idempotency-key": {
              "type": "string",
              "description": "A unique UUID to ensure the request is processed only once."
            }
          },
          "required": [
            "ucp-agent",
            "idempotency-key"
          ],
          "propertyOrdering": [
            "ucp-agent",
            "idempotency-key"
          ]
        },
        "id": {
          "type": "string",
          "description": "The checkout GID including the key."
        }
      },
      "required": [
        "shop_domain",
        "meta",
        "id"
      ],
      "propertyOrdering": [
        "shop_domain",
        "meta",
        "id"
      ]
    }
  },
  {
    "name": "search_shop_policies_and_faqs",
    "description": "Answers questions about the store's policies, products, and services to build customer trust. When to use: A customer asks \"What's your return policy?\", You need to clarify shipping or payment options, or A customer has questions about product care or warranties. Use natural language to query the search or the search will fail.",
    "parameters": {
      "type": "object",
      "properties": {
        "store_domain": {
          "type": "string",
          "description": "The store domain to call. This maps to https://{storedomain}/api/mcp."
        },
        "query": {
          "type": "string",
          "description": "The question about policies or FAQs. For example, 'What is your return policy for sale items?'"
        },
        "context": {
          "type": "string",
          "description": "Additional context like the current product being viewed or the customer's situation."
        }
      },
      "required": [
        "store_domain",
        "query"
      ],
      "propertyOrdering": [
        "store_domain",
        "query",
        "context"
      ]
    }
  }
]