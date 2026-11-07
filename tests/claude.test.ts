import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "@/lib/identify/claude";
import { PLANTS } from "@/data/plants";

describe("buildSystemPrompt", () => {
  it("lists every KB slug so the model can reference them", () => {
    const prompt = buildSystemPrompt();
    for (const p of PLANTS) expect(prompt).toContain(`- ${p.slug} |`);
    expect(prompt).toContain("Chiang Rai");
    expect(prompt).toContain("sign 67 |");
  });
});
