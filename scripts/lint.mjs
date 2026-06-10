#!/usr/bin/env node
/**
 * Wiki lint pass — the checks promised in wiki/CONVENTIONS.md §8.
 *
 * One-time setup:   cd mcp-server && npm install && npm run build
 * Run:              node scripts/lint.mjs            (from the repo root)
 * Strict mode:      node scripts/lint.mjs --strict   (warnings also fail)
 *
 * Errors (exit 1): broken wikilinks, type/folder mismatch, missing required
 * frontmatter, hand-written #para- anchors, invalid or unfenced insight_domain,
 * citations pointing at nonexistent sources.
 * Warnings (exit 0 unless --strict): orphan pages, pages missing from index.md,
 * stale freshness, insight_domain on types that should not carry it.
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FsWikiProvider } from "../mcp-server/dist/fs-provider.js";
import { extractWikilinks } from "../mcp-server/dist/parse.js";

const WIKI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "wiki");
const STRICT = process.argv.includes("--strict");

const REQUIRED_FIELDS = {
  project: ["title", "phase", "sector", "sources", "status"],
  concept: ["title"],
  regulation: ["title", "jurisdiction", "instrument"],
  stakeholder: ["title", "kind"],
  lesson: ["title", "phase", "insight_domain", "project", "sources", "confidence", "freshness"],
  source: ["title", "source_type", "language", "year"],
  synthesis: ["title", "insight_domain", "connects"],
};
const DOMAIN_VALUES = new Set(["ai-deployment", "sandbox-operations", "both"]);
const DOMAIN_TYPES = new Set(["lesson", "synthesis"]);
const EDGE_FIELDS = [
  "sources", "project", "concept", "regulation", "stakeholder",
  "related", "related_projects", "appears_in", "connects", "affiliation",
  "canonical_source", "parent", "authors",
];

const pages = await new FsWikiProvider(WIKI_ROOT).getPages();
const content = pages.filter((p) => p.type !== "meta");
const slugs = new Set(pages.map((p) => p.slug));
const sourceSlugs = new Set(content.filter((p) => p.type === "source").map((p) => p.slug));
const errors = [];
const warnings = [];

// Incoming references: body wikilinks + frontmatter edges, from every page.
const incoming = new Map();
for (const p of pages) {
  for (const ref of extractWikilinks(p.body)) {
    if (ref.slug !== p.slug) incoming.set(ref.slug, (incoming.get(ref.slug) ?? 0) + 1);
  }
  for (const field of EDGE_FIELDS) {
    const v = p.frontmatter[field];
    const list = Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
    for (const raw of list) {
      if (typeof raw !== "string") continue;
      const slug = raw.split("#")[0];
      if (slug && slug !== p.slug) incoming.set(slug, (incoming.get(slug) ?? 0) + 1);
    }
  }
}

const indexPage = pages.find((p) => p.slug === "index");
const indexLinks = new Set(indexPage ? extractWikilinks(indexPage.body).map((r) => r.slug) : []);

for (const p of content) {
  const where = p.path;

  // 1. type matches folder (FsWikiProvider derives type from folder; check frontmatter agrees)
  const fmType = p.frontmatter.type;
  if (fmType && fmType !== p.type) {
    errors.push(`${where}: frontmatter type "${fmType}" does not match folder type "${p.type}"`);
  }

  // 2. required frontmatter
  for (const field of REQUIRED_FIELDS[p.type] ?? []) {
    const v = p.frontmatter[field];
    if (v === undefined || v === null || (Array.isArray(v) && v.length === 0) || v === "") {
      errors.push(`${where}: missing required frontmatter "${field}"`);
    }
  }
  if (p.type === "source" && !p.frontmatter.path && !p.frontmatter.url) {
    errors.push(`${where}: source needs "path" or "url"`);
  }

  // 3. forbidden #para- anchors (dormant spec, CONVENTIONS §6)
  const paraHits = [...p.body.matchAll(/#para-[\w-]+/g), ...JSON.stringify(p.frontmatter).matchAll(/#para-[\w-]+/g)];
  if (paraHits.length > 0) {
    errors.push(`${where}: ${paraHits.length} hand-written "#para-" anchor(s) — the paragraph pipeline is dormant; cite #page-N`);
  }

  // 4. insight_domain rules
  const domain = p.frontmatter.insight_domain;
  if (DOMAIN_TYPES.has(p.type)) {
    if (typeof domain !== "string" || !DOMAIN_VALUES.has(domain)) {
      errors.push(`${where}: insight_domain missing or invalid (must be ai-deployment | sandbox-operations | both)`);
    } else if (domain === "both") {
      const hasOps = p.body.includes("[!sandbox-operations]");
      const hasDep = p.body.includes("[!ai-deployment]");
      if (!hasOps || !hasDep) {
        errors.push(`${where}: insight_domain "both" requires both > [!sandbox-operations] and > [!ai-deployment] callouts in the body`);
      }
    }
  } else if (domain !== undefined) {
    warnings.push(`${where}: insight_domain set on type "${p.type}" — the field belongs on lessons and synthesis only`);
  }

  // 5. broken wikilinks
  for (const ref of extractWikilinks(p.body)) {
    if (!slugs.has(ref.slug)) {
      errors.push(`${where}: broken wikilink [[${ref.slug}]]`);
    }
  }

  // 6. frontmatter citations point at real sources
  const fmSources = Array.isArray(p.frontmatter.sources) ? p.frontmatter.sources : [];
  for (const raw of fmSources) {
    if (typeof raw !== "string") continue;
    const slug = raw.split("#")[0];
    if (!sourceSlugs.has(slug)) {
      errors.push(`${where}: sources entry "${raw}" does not resolve to a sources/ page`);
    }
  }

  // 7. orphans
  if ((incoming.get(p.slug) ?? 0) === 0) {
    warnings.push(`${where}: orphan — no incoming wikilink or frontmatter edge from any page`);
  }

  // 8. index coverage
  if (!indexLinks.has(p.slug)) {
    warnings.push(`${where}: not listed in index.md`);
  }

  // 9. stale freshness (lessons; 18-month horizon)
  const freshness = p.frontmatter.freshness;
  if (typeof freshness === "string" && /^\d{4}-\d{2}$/.test(freshness)) {
    const [y, m] = freshness.split("-").map(Number);
    const ageMonths = (new Date().getFullYear() - y) * 12 + (new Date().getMonth() + 1 - m);
    if (ageMonths > 18) {
      warnings.push(`${where}: freshness ${freshness} is ${ageMonths} months old — review with > [!update-needed]`);
    }
  }
}

// Report
const fmt = (list) => list.map((l) => `  - ${l}`).join("\n");
console.log(`Wiki lint: ${content.length} content pages checked\n`);
if (errors.length) console.log(`ERRORS (${errors.length}):\n${fmt(errors)}\n`);
if (warnings.length) console.log(`WARNINGS (${warnings.length}):\n${fmt(warnings)}\n`);
if (!errors.length && !warnings.length) console.log("Clean. No findings.");

process.exit(errors.length || (STRICT && warnings.length) ? 1 : 0);
