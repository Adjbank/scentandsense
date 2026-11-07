import type { Plant } from "@/data/types";
import { getPlant } from "@/data/plants";
import type { Candidate, VisionResult } from "./schema";

export interface IdentifiedCandidate extends Candidate {
  /** true ถ้าพบในฐานข้อมูลพืชของแอป */
  inKnowledgeBase: boolean;
  plant: Plant | null;
}

export interface IdentifyResult {
  isPlant: boolean;
  observedFeatures: string[];
  candidates: IdentifiedCandidate[];
  /** ใช้เมื่อพืชอันดับหนึ่งไม่อยู่ในฐานข้อมูล */
  scentSummary: { th: string; en: string } | null;
  historySummary: { th: string; en: string } | null;
  model: string;
}

/** ค้นหาพืชใน KB ด้วย slug ที่โมเดลให้มา หรือเทียบชื่อวิทยาศาสตร์แบบไม่สนตัวพิมพ์ */
export function resolvePlant(c: Candidate, lookup: (slug: string) => Plant | undefined = getPlant, all: Plant[] = []): Plant | null {
  if (c.matchedSlug) {
    const p = lookup(c.matchedSlug);
    if (p) return p;
  }
  const sci = normalizeSci(c.scientificName);
  if (!sci) return null;
  const genus = sci.split(" ")[0];
  const byName = all.find((p) => {
    const kb = normalizeSci(p.scientificName);
    // ตรงทั้งชื่อ หรือ KB เป็นระดับสกุล (เช่น "Bambusa spp.") และสกุลตรงกัน
    return kb === sci || (!kb.includes(" ") && kb === genus);
  });
  return byName ?? null;
}

/** "Magnolia × alba" → "magnolia alba", "Bambusa spp." → "bambusa", "C. sinensis var. assamica" → "c sinensis" */
export function normalizeSci(s: string): string {
  return s
    .toLowerCase()
    .replace(/\bvar\..*$/, "")
    .replace(/\bspp?\.?$/, "")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function mergeWithKnowledgeBase(vision: VisionResult, model: string, all: Plant[]): IdentifyResult {
  const candidates: IdentifiedCandidate[] = vision.candidates
    .map((c) => {
      const plant = resolvePlant(c, undefined, all);
      return { ...c, matchedSlug: plant?.slug ?? null, inKnowledgeBase: plant !== null, plant };
    })
    .sort((a, b) => b.confidence - a.confidence);

  const top = candidates[0];
  const topInKb = top?.inKnowledgeBase ?? false;
  const nonEmpty = (l: { th: string; en: string }) => l.th.trim().length > 0 || l.en.trim().length > 0;

  return {
    isPlant: vision.isPlant,
    observedFeatures: vision.observedFeatures,
    candidates,
    scentSummary: !topInKb && nonEmpty(vision.scentSummary) ? vision.scentSummary : null,
    historySummary: !topInKb && nonEmpty(vision.historySummary) ? vision.historySummary : null,
    model,
  };
}
