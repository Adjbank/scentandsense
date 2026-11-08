import { describe, expect, it } from "vitest";
import { EVIDENCE, SCENT_STORIES, SESSIONS, cueAt, storyOfDay } from "@/data/mindful";
import { getPlant } from "@/data/plants";
import { dayKey, streak } from "@/lib/journal";

describe("mindfulness data", () => {
  it("every scent story points to a plant on the sign list and to cited evidence", () => {
    for (const s of SCENT_STORIES) {
      expect(getPlant(s.slug), s.slug).toBeDefined();
      expect(s.evidence.length).toBeGreaterThan(0);
      for (const e of s.evidence) expect(EVIDENCE[e].source.publisher.length).toBeGreaterThan(0);
    }
  });

  it("sessions have unique ids, valid plants, cues starting at 0 and ascending", () => {
    expect(new Set(SESSIONS.map((s) => s.id)).size).toBe(SESSIONS.length);
    for (const s of SESSIONS) {
      if (s.plantSlug) expect(getPlant(s.plantSlug), s.id).toBeDefined();
      expect(s.cues[0].at).toBe(0);
      for (let i = 1; i < s.cues.length; i++) expect(s.cues[i].at).toBeGreaterThan(s.cues[i - 1].at);
      expect(s.image).toMatch(/^\/images\/.+\.jpg$/);
    }
  });

  it("cueAt returns the latest cue reached", () => {
    const s = SESSIONS[0];
    expect(cueAt(s, 0)).toEqual(s.cues[0].text);
    expect(cueAt(s, 0.99)).toEqual(s.cues[s.cues.length - 1].text);
  });

  it("storyOfDay is stable within a day and rotates across days", () => {
    const a = storyOfDay(new Date(2026, 10, 8, 7));
    expect(storyOfDay(new Date(2026, 10, 8, 22))).toBe(a);
    const week = new Set(Array.from({ length: 7 }, (_, i) => storyOfDay(new Date(2026, 10, 8 + i)).slug));
    expect(week.size).toBeGreaterThan(1);
  });
});

describe("journal streak", () => {
  it("counts consecutive days ending today or yesterday", () => {
    const now = new Date(2026, 10, 8, 12);
    const at = (d: number) => new Date(2026, 10, d, 9).getTime();
    expect(streak([{ id: "x", at: at(8), minutes: 5 }, { id: "x", at: at(7), minutes: 5 }, { id: "x", at: at(5), minutes: 5 }], now)).toBe(2);
    expect(streak([{ id: "x", at: at(7), minutes: 5 }, { id: "x", at: at(6), minutes: 5 }], now)).toBe(2);
    expect(streak([{ id: "x", at: at(5), minutes: 5 }], now)).toBe(0);
    expect(dayKey(now)).toBe("2026-11-08");
  });
});
