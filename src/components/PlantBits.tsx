"use client";

import Link from "next/link";
import { PLOT, type Plant, type ScentFamily } from "@/data/types";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";
import { PlantArt } from "./PlantArt";

export const SCENT_FAMILY_LABEL: Record<
  ScentFamily,
  { th: string; en: string; icon: string }
> = {
  floral: { th: "ดอกไม้", en: "Floral", icon: "🌸" },
  citrus: { th: "ซิทรัส", en: "Citrus", icon: "🍋" },
  herbal: { th: "สมุนไพร", en: "Herbal", icon: "🌱" },
  spicy: { th: "เครื่องเทศ", en: "Spicy", icon: "🌶️" },
  woody: { th: "ไม้", en: "Woody", icon: "🪵" },
  resinous: { th: "ยางไม้", en: "Resinous", icon: "🌲" },
  green: { th: "เขียว", en: "Green", icon: "🍃" },
  sweet: { th: "หวาน", en: "Sweet", icon: "🍯" },
  camphoraceous: { th: "การบูร", en: "Camphor", icon: "❄️" },
};

export const PART_LABEL: Record<
  Plant["scentedPart"],
  { th: string; en: string }
> = {
  flower: { th: "ดอก", en: "flower" },
  leaf: { th: "ใบ", en: "leaf" },
  rhizome: { th: "เหง้า", en: "rhizome" },
  wood: { th: "เนื้อไม้", en: "wood" },
  resin: { th: "ยาง/แก่นหอม", en: "resin" },
  fruit: { th: "ผล/ผิวผล", en: "fruit/peel" },
  whole: { th: "ทั้งต้น", en: "whole plant" },
};

export function ScentChips({ families }: { families: ScentFamily[] }) {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap gap-1.5">
      {families.map((f) => (
        <span key={f} className="chip">
          {SCENT_FAMILY_LABEL[f].icon} {t(SCENT_FAMILY_LABEL[f], lang)}
        </span>
      ))}
    </div>
  );
}

export function PlantCard({ plant }: { plant: Plant }) {
  const { lang } = useLang();
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group card flex flex-col gap-3 !p-3 transition hover:border-moss/40 hover:shadow"
    >
      <div className="relative">
        <PlantArt plant={plant} className="w-full rounded-xl" />
        <span className="absolute left-2 top-2 rounded-md bg-forest/90 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-paper">
          {t(UI.plant.sign, lang)} {plant.signNo}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-forest">
            {lang === "th" ? plant.thaiName : plant.englishName}
          </h3>
          <p className="truncate text-xs italic text-ink/60">
            {plant.scientificName}
          </p>
          <p className="mt-1 truncate text-xs text-ink/70">
            {t(plant.scentDescriptors, lang)}
          </p>
        </div>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-paper transition group-hover:bg-moss"
        >
          →
        </span>
      </div>
    </Link>
  );
}

function shareText(min?: number, max?: number): string {
  if (min === undefined && max === undefined) return "—";
  if (min !== undefined && max !== undefined) return `${min}–${max}%`;
  return `${min ?? max}%`;
}

export function CompoundTable({ plant }: { plant: Plant }) {
  const { lang } = useLang();
  if (plant.compounds.length === 0) {
    return (
      <p className="text-sm text-ink/70">
        {plant.compoundNote ? t(plant.compoundNote, lang) : "—"}
      </p>
    );
  }
  const hasParts = plant.compounds.some(
    (c) => c.part && c.part !== plant.scentedPart,
  );
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-moss/20 text-left text-xs uppercase tracking-wide text-ink/60">
              <th className="py-1 pr-2">{t(UI.plant.compound, lang)}</th>
              {hasParts && (
                <th className="py-1 pr-2">{t(UI.plant.scentedPart, lang)}</th>
              )}
              <th className="py-1 pr-2 whitespace-nowrap">
                {t(UI.plant.share, lang)}
              </th>
              <th className="py-1">{t(UI.plant.odor, lang)}</th>
            </tr>
          </thead>
          <tbody>
            {plant.compounds.map((c) => (
              <tr key={c.name} className="border-b border-moss/10 align-top">
                <td className="py-1.5 pr-2 font-medium">
                  {c.name}
                  {c.cas && (
                    <span className="block text-[11px] font-normal text-ink/50">
                      CAS {c.cas}
                    </span>
                  )}
                </td>
                {hasParts && (
                  <td className="py-1.5 pr-2 text-ink/70">
                    {t(PART_LABEL[c.part ?? plant.scentedPart], lang)}
                  </td>
                )}
                <td className="py-1.5 pr-2 whitespace-nowrap tabular-nums">
                  {shareText(c.shareMin, c.shareMax)}
                </td>
                <td className="py-1.5 text-ink/80">{t(c.odor, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {plant.compoundNote && (
        <p className="mt-2 text-xs text-ink/60">
          {t(plant.compoundNote, lang)}
        </p>
      )}
    </div>
  );
}

export function SourceList({ plant }: { plant: Plant }) {
  return (
    <ol className="list-decimal space-y-1 pl-5 text-xs text-ink/70">
      {plant.sources.map((s) => (
        <li key={s.title}>
          {s.authors && <span>{s.authors} </span>}
          {s.year && <span>({s.year}). </span>}
          <span className="italic">{s.title}</span>. {s.publisher}.
          {s.url && (
            <>
              {" "}
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-forest underline"
              >
                {s.url.replace(/^https?:\/\//, "")}
              </a>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

/** รายละเอียดพืชเต็ม — ใช้ทั้งหน้า /plants/[slug] และการ์ดผลสแกน */
export function PlantDetail({
  plant,
  compact = false,
}: {
  plant: Plant;
  compact?: boolean;
}) {
  const { lang } = useLang();
  return (
    <div className="space-y-5">
      {!compact && (
        <header className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-start">
          <PlantArt plant={plant} className="w-40 rounded-2xl" />
          <div>
            <p className="mb-1 text-xs text-ink/60">
              <span className="rounded-md bg-forest px-1.5 py-0.5 font-semibold tabular-nums text-paper">
                {t(UI.plant.sign, lang)} {plant.signNo}
              </span>{" "}
              · {t(UI.plant.plot, lang)}: {t(PLOT.name, lang)} ·{" "}
              {t(PLOT.plantedLabel, lang)}
            </p>
            <h1 className="text-2xl font-bold text-forest">
              {lang === "th" ? plant.thaiName : plant.englishName}
            </h1>
            <p className="text-ink/70">
              {lang === "th" ? plant.englishName : plant.thaiName}
            </p>
            <p className="italic text-ink/60">
              {plant.scientificName} ·{" "}
              <span className="not-italic">
                {t(UI.plant.family, lang)} {plant.family}
              </span>
            </p>
            {plant.otherNames && plant.otherNames.length > 0 && (
              <p className="mt-1 text-sm text-ink/60">
                {t(UI.plant.otherNames, lang)}: {plant.otherNames.join(", ")}
              </p>
            )}
            {plant.identityUncertain && (
              <p className="mt-2 rounded-lg border border-sun/50 bg-sun/10 px-3 py-1.5 text-xs text-bark">
                ⚠️ {t(UI.plant.uncertain, lang)}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ScentChips families={plant.scentFamilies} />
              <span className="text-xs text-ink/60">
                {t(UI.plant.scentedPart, lang)}:{" "}
                {t(PART_LABEL[plant.scentedPart], lang)}
              </span>
            </div>
          </div>
        </header>
      )}

      <section className="card">
        <h2 className="mb-1 font-semibold text-forest">
          {t(UI.identify.scent, lang)}
        </h2>
        <p className="mb-2 text-sm font-medium text-bark">
          {t(plant.scentDescriptors, lang)}
        </p>
        <p className="text-sm leading-relaxed">{t(plant.scent, lang)}</p>
        <p className="mt-2 text-xs text-ink/60">
          {t(UI.plant.bestTime, lang)}: {t(plant.bestTime, lang)}
        </p>
      </section>

      <section className="card">
        <h2 className="mb-2 font-semibold text-forest">
          {t(UI.plant.compounds, lang)}
        </h2>
        <CompoundTable plant={plant} />
      </section>

      <section className="card">
        <h2 className="mb-1 font-semibold text-forest">
          {t(UI.identify.history, lang)}
        </h2>
        <p className="text-sm leading-relaxed">{t(plant.history, lang)}</p>
      </section>

      {!compact && (
        <section className="card">
          <h2 className="mb-1 font-semibold text-forest">
            {t(UI.plant.description, lang)}
          </h2>
          <p className="text-sm leading-relaxed">
            {t(plant.description, lang)}
          </p>
        </section>
      )}

      <section className="rounded-2xl border border-sun/40 bg-sun/10 p-4">
        <h2 className="mb-1 font-semibold text-bark">
          🧘 {t(UI.plant.sensePrompt, lang)}
        </h2>
        <p className="text-sm leading-relaxed">{t(plant.sensePrompt, lang)}</p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold text-forest">
          {t(UI.plant.sources, lang)}
        </h2>
        <SourceList plant={plant} />
      </section>
    </div>
  );
}
