import { adminRest } from "../shopify/client.js";
import { config } from "../config.js";
import type { PreviewEdition } from "./preview.js";

/**
 * Step 3 — Publish the free preview edition to Shopify.
 *
 * Target: a blog article in the blog identified by SHOPIFY_PREVIEW_BLOG_ID.
 * (A blog is the natural home for dated newsletter editions; the blog ID is
 *  visible in the Shopify admin URL when you open the blog, or via
 *  GET /admin/api/<version>/blogs.json.)
 */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderArticleHtml(preview: PreviewEdition): string {
  const highlights = preview.highlights
    .map((h) => `  <li>${escapeHtml(h)}</li>`)
    .join("\n");
  const cta = config.ctaUrl
    ? `<p><a href="${escapeHtml(config.ctaUrl)}"><strong>Read the full issue — subscribe here</strong></a></p>`
    : "";
  return `<p>${escapeHtml(preview.teaser)}</p>\n<ul>\n${highlights}\n</ul>\n${cta}`;
}

/** Publishes the preview; resolves to the created article ID. */
export async function publishPreview(preview: PreviewEdition): Promise<string> {
  if (!config.previewBlogId) {
    throw new Error(
      "SHOPIFY_PREVIEW_BLOG_ID is not set — point it at the target blog's numeric ID.",
    );
  }
  const data = await adminRest<{ article: { id: number } }>(
    "POST",
    `/blogs/${config.previewBlogId}/articles.json`,
    {
      article: {
        title: preview.subject,
        body_html: renderArticleHtml(preview),
        tags: "newsletter, free-preview",
        published: true,
      },
    },
  );
  return String(data.article.id);
}
