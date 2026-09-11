export const IMAGE_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "generate_image",
        description:
          'Generate a new image with the image generation MCP endpoint from a text prompt. Use this when the user asks for a brand new image, illustration, concept art, photo-style render, mockup visual, or any other picture described in words. Provide the MCP endpoint and a prompt. The forwarded JSON-RPC tools/call request is sent to the MCP server\'s generate-image tool. The response includes a public image URL for the generated WEBP image.',
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the image generation MCP endpoint. This endpoint receives the forwarded JSON-RPC tools/call request.",
            },
            prompt: {
              type: "STRING",
              description:
                "A text description of the image to generate. Must be a non-empty string; longer, specific descriptions of subject, style, lighting, and composition produce better results.",
            },
          },
          required: ["merchant_mcp_url", "prompt"],
        },
      },

      {
        name: "edit_image",
        description:
          'Edit an existing image with the image generation MCP endpoint. Use this when the user wants changes applied to a source image they already have, such as restyling, removing or adding elements, changing background or lighting, or compositing. Provide the MCP endpoint, editing instructions, and the source image as either a public image_url or base64-encoded image_b64. The forwarded JSON-RPC tools/call request is sent to the MCP server\'s edit-image tool. The response includes a public image URL for the edited WEBP image.',
        parameters: {
          type: "OBJECT",
          properties: {
            merchant_mcp_url: {
              type: "STRING",
              description:
                "HTTPS URL for the image generation MCP endpoint. This endpoint receives the forwarded JSON-RPC tools/call request.",
            },
            prompt: {
              type: "STRING",
              description:
                "Instructions for editing the source image. Must be a non-empty string describing exactly what to change or preserve.",
            },
            image_url: {
              type: "STRING",
              description:
                "Public URL of the source image to edit.",
            },
            image_b64: {
              type: "STRING",
              description:
                "Base64-encoded source image to edit.",
            },
          },
          required: ["merchant_mcp_url", "prompt"],
        },
      },
    ],
  },
] as const;
