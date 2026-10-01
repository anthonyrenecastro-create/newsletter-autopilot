/** Central config. Secrets come from the environment — never committed. */
function required(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing required env var: ${name}`);
  return v.trim();
}

function normalizeDomain(d: string): string {
  return d.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export const config = {
  /** e.g. "mystore.myshopify.com" */
  shopDomain: normalizeDomain(required("SHOPIFY_STORE_DOMAIN")),
  /** Admin API access token from the custom app (shpat_...). */
  adminToken: required("SHOPIFY_ADMIN_API_TOKEN"),
  /** Pinned Admin API version. Override only if you know why. */
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-10",
  /** Numeric ID of the blog the free preview is published to. */
  previewBlogId: process.env.SHOPIFY_PREVIEW_BLOG_ID ?? "",
  /** Subscribe URL used in the preview's call-to-action. */
  ctaUrl: process.env.PREVIEW_CTA_URL ?? "",
};
