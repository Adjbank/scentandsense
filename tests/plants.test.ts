import { describe, expect, it } from "vitest";
import { PLANTS, getPlant, getPlantBySign } from "@/data/plants";

describe("plant knowledge base", () => {
  it("has exactly the 67 species on the longan-plot sign list, numbered 1–67 without gaps", () => {
    expect(PLANTS.length).toBe(67);
    const nos = PLANTS.map((p) => p.signNo);
    expect(nos).toEqual(Array.from({ length: 67 }, (_, i) => i + 1));
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

  it("getPlant finds by slug and getPlantBySign by sign number", () => {
    expect(getPlant("alpinia-galanga")?.thaiName).toBe("ข่า");
    expect(getPlant("nope")).toBeUndefined();
    expect(getPlantBySign(67)?.thaiName).toBe("อินทนิล");
    expect(getPlantBySign(1)?.slug).toBe("irvingia-malayana");
  });

  it("sign names match the garden list for a sample of entries", () => {
    const expected: Record<number, string> = { 2: "กันเกรา", 13: "ไคร้หอม (ตะไคร้หอม)", 29: "บุนนาค", 45: "มหาหงส์", 60: "สาวสันทราย", 66: "เหลืองเชียงราย" };
    for (const [no, name] of Object.entries(expected)) expect(getPlantBySign(Number(no))?.thaiName).toBe(name);
  });
});
