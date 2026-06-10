import { describe, expect, it } from "vitest";
import { extractWikilinks, firstProseLine, parseCitation } from "../src/parse.js";

describe("extractWikilinks", () => {
  it("extracts plain, aliased, and fragment links, deduplicated", () => {
    const body = `
See [[building-permits]] and [[stephanie-volz|Volz]] on this.
Also [[building-permits]] again, and [[p2-building-permits#page-25]].
`;
    const links = extractWikilinks(body);
    expect(links.map((l) => l.slug)).toEqual(["building-permits", "stephanie-volz", "p2-building-permits"]);
    expect(links[2].fragment).toBe("page-25");
  });

  it("ignores empty and malformed links", () => {
    expect(extractWikilinks("[[]] [[ ]] [not-a-link]")).toEqual([]);
  });
});

describe("parseCitation", () => {
  it("parses slug#page-N", () => {
    expect(parseCitation("p2-building-permits#page-25")).toEqual({ sourceSlug: "p2-building-permits", page: 25 });
  });
  it("parses 'slug p. N' prose form", () => {
    expect(parseCitation("p2-building-permits p. 25")).toEqual({ sourceSlug: "p2-building-permits", page: 25 });
    expect(parseCitation("p2-building-permits p.7")).toEqual({ sourceSlug: "p2-building-permits", page: 7 });
    expect(parseCitation("00-overview-phase2-build-and-share S. 17")).toEqual({
      sourceSlug: "00-overview-phase2-build-and-share",
      page: 17,
    });
  });
  it("parses bare slug as whole-source", () => {
    expect(parseCitation("p1-smart-parking")).toEqual({ sourceSlug: "p1-smart-parking" });
  });
  it("rejects garbage", () => {
    expect(parseCitation("not a citation at all!!")).toBeNull();
  });
});

describe("firstProseLine", () => {
  it("skips headings, callouts, and tables", () => {
    const body = "# Title\n\n> [!gap] something\n\n| a | b |\n\nReal prose here.\n";
    expect(firstProseLine(body)).toBe("Real prose here.");
  });
});
