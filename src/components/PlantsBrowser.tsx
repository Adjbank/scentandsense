"use client";

import { useMemo, useState } from "react";
import { PLANTS } from "@/data/plants";
import type { ScentFamily } from "@/data/types";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";
import { PlantCard, SCENT_FAMILY_LABEL } from "./PlantBits";

const FAMILIES = Object.keys(SCENT_FAMILY_LABEL) as ScentFamily[];

export function PlantsBrowser() {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [family, setFamily] = useState<ScentFamily | "all">("all");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PLANTS.filter((p) => {
      if (family !== "all" && !p.scentFamilies.includes(family)) return false;
      if (!needle) return true;
      return [p.thaiName, p.englishName, p.scientificName, ...(p.otherNames ?? [])].some((n) => n.toLowerCase().includes(needle));
    });
  }, [q, family]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-forest">{t(UI.nav.plants, lang)}</h1>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t(UI.plant.search, lang)}
        className="w-full rounded-full border border-moss/30 bg-white/80 px-4 py-2.5 text-sm outline-none focus:border-forest"
      />
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        <button type="button" onClick={() => setFamily("all")} className={`chip whitespace-nowrap ${family === "all" ? "bg-forest text-paper" : ""}`}>
          {t(UI.plant.all, lang)}
        </button>
        {FAMILIES.map((f) => (
          <button key={f} type="button" onClick={() => setFamily(f)} className={`chip whitespace-nowrap ${family === f ? "bg-forest text-paper" : ""}`}>
            {SCENT_FAMILY_LABEL[f].icon} {t(SCENT_FAMILY_LABEL[f], lang)}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink/60">
        {list.length} {t(UI.plant.count, lang)}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => (
          <PlantCard key={p.slug} plant={p} />
        ))}
      </div>
    </div>
  );
}
