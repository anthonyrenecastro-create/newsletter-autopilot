/** Minimal Shopify Admin REST client (fetch-based, no dependencies). */
import { config } from "../config.js";

export class ShopifyError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Shopify API ${status}: ${body.slice(0, 300)}`);
    this.name = "ShopifyError";
  }
}

export async function adminRest<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<T> {
  const url = `https://${config.shopDomain}/admin/api/${config.apiVersion}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "X-Shopify-Access-Token": config.adminToken,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new ShopifyError(res.status, text);
  return JSON.parse(text) as T;
}

/** Quick connectivity check: returns the shop name. */
export async function checkConnection(): Promise<string> {
  const data = await adminRest<{ shop: { name: string } }>("GET", "/shop.json");
  return data.shop.name;
}
