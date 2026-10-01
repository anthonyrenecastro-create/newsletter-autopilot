# Newsletter Autopilot

Companion app for the Shopify storefront. It manages the newsletter operation:

- **Shopify** handles payments and publication (subscriptions, checkout, delivery).
- **This app** automates the free tier: every day it takes the main newsletter
  draft (written by you) and generates an **AI-written free preview edition**
  that teases the full daily issue — then hands it to Shopify for publication.

Related project: [cyberpunk-shopify-storefront](https://github.com/anthonycastro-spaceace01/cyberpunk-shopify-storefront)

## How it works

```
You write the daily issue
        │  (draft in: markdown file, Google Doc, or CMS — TBD)
        ▼
┌─────────────────┐
│  1. Ingest      │  Pull today's draft
└────────┬────────┘
         ▼
┌─────────────────┐
│  2. AI preview  │  Generate a free preview edition:
└────────┬────────┘  teaser, highlights, CTA to subscribe
         ▼
┌─────────────────┐
│  3. Publish     │  Push the free edition to Shopify
└─────────────────┘  (Shopify Email / blog / page — TBD)
```

The full daily issue stays subscriber-only. The free preview is the funnel.

## Project layout

```
src/
  index.ts            Entry point / scheduler wiring
  pipeline/
    ingest.ts       Step 1 — fetch today's draft (stub)
    preview.ts      Step 2 — AI-written free preview (stub)
    publish.ts      Step 3 — hand off to Shopify (stub)
docs/
  architecture.md   Components, data flow, integrations
```

## Configuration (planned)

| Variable | Purpose |
|---|---|
| `SHOPIFY_STORE_DOMAIN` | Storefront domain |
| `SHOPIFY_ADMIN_API_TOKEN` | Admin API access for publishing |
| `AI_API_KEY` | Provider key for preview generation |
| `AI_MODEL` | Model used for the preview writer |

> Secrets go in a local `.env` (gitignored) or the host's secret store —
> never committed.

## Roadmap

- [ ] Decide draft source (file drop, Google Doc, CMS)
- [ ] Decide AI provider + preview prompt/voice
- [ ] Decide Shopify publication surface (Email, blog post, page)
- [ ] Implement ingest → preview → publish pipeline
- [ ] Daily scheduler (cron / hosted job)
- [ ] Preview review/approval step before auto-publish
- [ ] Metrics: free → paid conversion tracking

## Status

Scaffold only — pipeline stages are stubs. No secrets, no deploys.
