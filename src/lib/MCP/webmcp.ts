import { callCatalogMcp } from "./MCP/catalogCall";
import { callCartMcp } from "./MCP/cartCall";
import { callFaqMcp } from "./MCP/faqCall";
import { callImageMcp } from "./MCP/imageCall";

declare global {
  interface Document {
    modelContext?: {
      registerTool: (tool: unknown, options?: unknown) => Promise<unknown>;
    };
  }
}

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute: (args: any) => Promise<string>;
};

const READ = { readOnlyHint: true, untrustedContentHint: true };

const newId = () => crypto.randomUUID();

const ingest = (data: unknown) => {
  (window as any).LiveCommerce?.ingest(data);
};

function firstText(raw: string): string {
  const lines = raw
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trim())
    .filter(Boolean)
    .join("\n");
  const payload = JSON.parse(lines || raw);
  const text = payload?.result?.content?.find(
    (c: { type?: string; text?: string }) =>
      c.type === "text" && typeof c.text === "string",
  )?.text;
  return text ?? JSON.stringify(payload);
}

const TOOLS: WebMcpTool[] = [
  {
    name: "search_catalog",
    description:
      "Search for products across the global multi-store catalog. Returns matching products with prices in ISO 4217 minor units.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What the buyer is looking for." },
        store_domain: { type: "string", description: "Optional store to restrict the search to." },
      },
      required: ["query"],
    },
    annotations: READ,
    execute: async (args) => {
      const data = await callCatalogMcp("search_catalog", newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "get_product",
    description:
      "Retrieve details for a specific product: specifications, variants, availability.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Product or variant identifier." },
      },
      required: ["id"],
    },
    annotations: READ,
    execute: async (args) => {
      const data = await callCatalogMcp("get_product", newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "lookup_catalog",
    description:
      "Resolve multiple product or variant identifiers from the global catalog in one call.",
    inputSchema: {
      type: "object",
      properties: {
        ids: { type: "array", items: { type: "string" } },
      },
      required: ["ids"],
    },
    annotations: READ,
    execute: async (args) => {
      const data = await callCatalogMcp("lookup_catalog", newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "search_faq",
    description:
      "Search FAQ content for a specific store: shipping times, returns, sizing, materials, care, warranty.",
    inputSchema: {
      type: "object",
      properties: {
        store_domain: { type: "string" },
        query: { type: "string" },
        context: { type: "string" },
      },
      required: ["store_domain", "query"],
    },
    annotations: READ,
    execute: async (args) => firstText(await callFaqMcp("search_faq", newId(), args)),
  },
  {
    name: "get_policy",
    description:
      "Retrieve a formal policy document for a specific store: returns, privacy, terms, shipping.",
    inputSchema: {
      type: "object",
      properties: {
        store_domain: { type: "string" },
        query: { type: "string" },
        context: { type: "string" },
      },
      required: ["store_domain", "query"],
    },
    annotations: READ,
    execute: async (args) => firstText(await callFaqMcp("get_policy", newId(), args)),
  },
  {
    name: "list_policies",
    description: "List the policies available for a specific store.",
    inputSchema: {
      type: "object",
      properties: {
        store_domain: { type: "string" },
      },
      required: ["store_domain"],
    },
    annotations: READ,
    execute: async (args) => firstText(await callFaqMcp("list_policies", newId(), args)),
  },
  {
    name: "get_ui_state",
    description:
      "Retrieve the current state of the Commerce Layer: what the buyer sees on screen right now, including selected variants, cart contents, and shopping stage.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: async () =>
      // Rename getState to whatever method your LiveCommerce exposes for its snapshot.
      JSON.stringify((window as any).LiveCommerce?.getState?.() ?? null),
  },
  {
    name: "create_cart",
    description:
      "Create a new cart with line items. Returns the merchant cart ID, validated lines, estimated totals, and a continue_url.",
    inputSchema: {
      type: "object",
      properties: {
        line_items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              quantity: { type: "integer" },
              item: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"],
              },
            },
            required: ["quantity", "item"],
          },
        },
      },
      required: ["line_items"],
    },
    annotations: { untrustedContentHint: true },
    execute: async (args) => {
      const data = await callCartMcp("create_cart" as any, newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "get_cart",
    description: "Retrieve the current full state of an existing cart.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    annotations: READ,
    execute: async (args) => {
      const data = await callCartMcp("get_cart" as any, newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "update_cart",
    description:
      "Replace the full state of an existing cart. PUT semantics: omitted fields are removed, so send everything that should remain.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        line_items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              quantity: { type: "integer" },
              item: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"],
              },
            },
            required: ["quantity", "item"],
          },
        },
      },
      required: ["id", "line_items"],
    },
    annotations: { untrustedContentHint: true },
    execute: async (args) => {
      const data = await callCartMcp("update_cart" as any, newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "cancel_cart",
    description:
      "Permanently cancel an existing cart. Destructive: the cart is removed from merchant storage.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    },
    annotations: { consequentialHint: true },
    execute: async (args) => {
      const data = await callCartMcp("cancel_cart" as any, newId(), args);
      ingest(data);
      return JSON.stringify(data);
    },
  },
  {
    name: "generate_image",
    description:
      "Generate an original image from a text prompt. Returns a public image URL for the generated image.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "What the image should show." },
      },
      required: ["prompt"],
    },
    execute: async (args) =>
      firstText(await callImageMcp("generate_image", newId(), args)),
  },
];

export async function registerWebMcpTools() {
  const mc =
    (document as any).modelContext ?? (navigator as any).modelContext;
  if (!mc) return;

  for (const tool of TOOLS) {
    await mc.registerTool(tool);
  }
}
