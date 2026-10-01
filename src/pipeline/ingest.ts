/** Step 1 — Ingest today's full-issue draft. TODO: implement. */
export interface Draft {
  title: string;
  body: string;
  date: string;
}

export async function ingestDraft(): Promise<Draft> {
  throw new Error("ingestDraft: not implemented (scaffold)");
}
