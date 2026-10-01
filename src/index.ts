import { ingestDraft } from "./pipeline/ingest.js";
import { generatePreview } from "./pipeline/preview.js";
import { publishPreview } from "./pipeline/publish.js";

/**
 * Daily run: ingest → preview → (review gate) → publish.
 *
 * Safety default: PREVIEW_AUTO_PUBLISH is OFF. Without it, the run prints
 * the AI-written preview for human review instead of publishing — deliberate,
 * since this is public copy.
 */
async function main(): Promise<void> {
  const draft = await ingestDraft();
  const preview = await generatePreview(draft);

  if (process.env.PREVIEW_AUTO_PUBLISH === "true") {
    const articleId = await publishPreview(preview);
    console.log(`Published free preview as article id=${articleId}`);
  } else {
    console.log(
      "--- FREE PREVIEW (not published — set PREVIEW_AUTO_PUBLISH=true to publish) ---",
    );
    console.log(JSON.stringify(preview, null, 2));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
