import type { WikiPage, WikiProvider } from "./types.js";

export interface WikiBundle {
  generated: string;
  pageCount: number;
  pages: WikiPage[];
}

/**
 * Serves pages from a prebuilt JSON bundle (scripts/build-bundle.ts).
 * Used by hosted deployments (e.g. Cloudflare Workers) where there is no
 * filesystem — the wiki travels inside the deploy artifact.
 */
export class BundleWikiProvider implements WikiProvider {
  constructor(private readonly bundle: WikiBundle) {}

  async getPages(): Promise<WikiPage[]> {
    return this.bundle.pages;
  }
}
