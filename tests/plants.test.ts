import { describe, expect, it } from "vitest";
import { PLANTS, getPlant } from "@/data/plants";

describe("plant knowledge base", () => {
  it("has at least 20 species", () => {
    expect(PLANTS.length).toBeGreaterThanOrEqual(20);
  });

  it("has unique slugs and scientific names", () => {
    const slugs = PLANTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const sci = PLANTS.map((p) => p.scientificName);
    expect(new Set(sci).size).toBe(sci.length);
  });

  it("every entry has bilingual text, a scent family and at least one source", () => {
    for (const p of PLANTS) {
      for (const field of [p.description, p.history, p.scent, p.scentDescriptors, p.bestTime, p.sensePrompt]) {
        expect(field.th.trim().length, `${p.slug} th`).toBeGreaterThan(0);
        expect(field.en.trim().length, `${p.slug} en`).toBeGreaterThan(0);
      }
      expect(p.scentFamilies.length, p.slug).toBeGreaterThan(0);
      expect(p.sources.length, p.slug).toBeGreaterThan(0);
      for (const s of p.sources) expect(s.publisher.trim().length, p.slug).toBeGreaterThan(0);
    }
  });

  it("compound share ranges are sane (0–100, min ≤ max, sum of minima ≤ 100)", () => {
    for (const p of PLANTS) {
      const sumMinByPart = new Map<string, number>();
      for (const c of p.compounds) {
        const part = c.part ?? p.scentedPart;
        if (c.shareMin !== undefined) {
          expect(c.shareMin, `${p.slug}/${c.name}`).toBeGreaterThanOrEqual(0);
          sumMinByPart.set(part, (sumMinByPart.get(part) ?? 0) + c.shareMin);
        }
        if (c.shareMax !== undefined) expect(c.shareMax, `${p.slug}/${c.name}`).toBeLessThanOrEqual(100);
        if (c.shareMin !== undefined && c.shareMax !== undefined) expect(c.shareMin).toBeLessThanOrEqual(c.shareMax);
      }
      for (const [part, sumMin] of sumMinByPart) expect(sumMin, `${p.slug}/${part}`).toBeLessThanOrEqual(100);
    }
  });

  it("entries without quantitative compounds explain why", () => {
    for (const p of PLANTS) {
      if (p.compounds.length === 0) expect(p.compoundNote?.th, p.slug).toBeTruthy();
    }
  });

  it("getPlant finds by slug", () => {
    expect(getPlant("jasminum-sambac")?.thaiName).toBe("มะลิลา");
    expect(getPlant("nope")).toBeUndefined();
  });
});
