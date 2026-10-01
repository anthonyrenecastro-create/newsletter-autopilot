import type { Draft } from "./ingest.js";

/** Step 2 — Generate the AI-written free preview edition. TODO: implement. */
export interface PreviewEdition {
  subject: string;
  teaser: string;
  highlights: string[];
  ctaUrl: string;
}

export async function generatePreview(_draft: Draft): Promise<PreviewEdition> {
  throw new Error("generatePreview: not implemented (scaffold)");
}
