# Architecture

## Goal

Run a free daily newsletter with minimum manual effort:

The newsletter is fully free and open. Zebulon writes the full daily issue;
this app automates an AI-written preview edition generated from each day's
draft, published free as the public edition.

Shopify hosts publication (the `news` blog). This app owns the automation
between "draft exists" and "edition published". There is no paid tier.

## Components

### 1. Ingest (`src/pipeline/ingest.ts`)
Fetches today's full-issue draft from whichever source is chosen:
- a markdown file dropped in a watched folder / repo,
- a Google Doc,
- or a headless CMS.

Output: normalized draft object `{ title, body, date }`.

### 2. AI preview writer (`src/pipeline/preview.ts`)
Takes the draft and produces the free preview edition:
- a hook/teaser that does **not** give away the full issue,
- 2–4 highlighted takeaways,
- a subscribe CTA pointing at the Shopify subscription product.

The prompt must encode the publication's voice. The full draft is never
published by this step — only the preview it generates.

**Open decision:** AI provider and model (Gemini, OpenAI, etc.).

### 3. Shopify publish (`src/pipeline/publish.ts`)
Delivers the preview edition to the chosen Shopify surface:
- **Shopify Email** campaign to the free segment, and/or
- a **blog post / page** on the storefront.

Uses the Shopify Admin API. Requires a custom app / API token with the
relevant write scopes.

**Open decision:** Email vs. blog vs. both.

### 4. Orchestration (`src/index.ts`)
Daily run: ingest → preview → (optional human approval) → publish.
Start with a manual trigger; graduate to a scheduled job once the preview
quality is trusted.

A **human review gate** before auto-publish is strongly recommended at first —
AI-written public copy should be eyeballed until the voice is dialed in.

## Data flow

```
draft source ──▶ ingest ──▶ preview (AI) ──▶ [review gate] ──▶ Shopify ──▶ readers
                                     │                              │
                                     │                              ▼
                                     │                         payments (Shopify)
                                     ▼
                              preview stored
                              (audit trail)
```

## Secrets

`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_API_TOKEN`, `AI_API_KEY`, `AI_MODEL`.
Local `.env` (gitignored) for dev; host secret store in production.
