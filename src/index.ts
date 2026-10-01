/**
 * Entry point. Orchestrates the daily run:
 *   ingest → preview → (review gate) → publish
 *
 * TODO: wire up scheduling + config. Manual trigger first.
 */
async function main(): Promise<void> {
  console.log("newsletter-autopilot: pipeline not yet implemented (scaffold).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
