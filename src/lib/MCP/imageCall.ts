import { IMAGE_MCP_ENDPOINT } from "../GeminiTools/config";

export async function callImageMcp(
  name: string,
  id: string,
  args: unknown,
) {
  const response = await fetch(IMAGE_MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: {
        name,
        arguments: {
          ...(args ?? {}),
          customer_id: "8918949199947",
        },
      },
    }),
  });

  const rawBody = await response.text();
  const payload = JSON.parse(rawBody.slice(rawBody.indexOf("{")));

  return payload.result.content[0].text;
}

export async function generateImage(prompt: string, id: string) {
  return callImageMcp("generate-image", id, { prompt });
}

export async function editImage(
  prompt: string,
  source: { image_url: string } | { image_b64: string },
  id: string,
) {
  return callImageMcp("edit-image", id, { prompt, ...source });
}
