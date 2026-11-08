"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PLANTS } from "@/data/plants";
import type { ScentFamily } from "@/data/types";
import { STATIONS } from "@/data/walk";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";
import { PlantCard, SCENT_FAMILY_LABEL } from "@/components/PlantBits";
import { PlantArt } from "@/components/PlantArt";

const FEATURED = ["hedychium-coronarium", "shorea-roxburghii", "magnolia-champaca", "radermachera-ignea", "wurfbainia-schmidtii", "melodorum-fruticosum", "cymbopogon-nardus", "mimusops-elengi"];
const FILTERS: (ScentFamily | "all")[] = ["all", "floral", "herbal", "citrus", "spicy"];

function HeroArt() {
  const picks = ["magnolia-champaca", "hedychium-coronarium", "cymbopogon-nardus"].map((s) => PLANTS.find((p) => p.slug === s)!);
  return (
    <div className="relative mx-auto grid w-full max-w-md grid-cols-3 items-end gap-3">
      <PlantArt plant={picks[0]} className="w-full drop-shadow-md" />
      <PlantArt plant={picks[1]} className="w-full -translate-y-6 drop-shadow-md" />
      <PlantArt plant={picks[2]} className="w-full drop-shadow-md" />
    </div>
  );
}

export default function Home() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<ScentFamily | "all">("all");
  const featured = useMemo(() => {
    const base = FEATURED.map((s) => PLANTS.find((p) => p.slug === s)!).filter(Boolean);
    const list = filter === "all" ? base : PLANTS.filter((p) => p.scentFamilies[0] === filter);
    return list.slice(0, 8);
  }, [filter]);

  const stats = [
    { n: PLANTS.length, label: UI.home.stats.species },
    { n: PLANTS.filter((p) => p.compounds.length > 0).length, label: UI.home.stats.withChem },
    { n: new Set(PLANTS.flatMap((p) => p.sources.map((s) => s.title))).size, label: UI.home.stats.sources },
    { n: STATIONS.length, label: UI.home.stats.stations },
  ];

  const features = [
    { icon: "📷", ...UI.home.features.ai },
    { icon: "👃", ...UI.home.features.scent },
    { icon: "📚", ...UI.home.features.sources },
    { icon: "🌏", ...UI.home.features.bilingual },
  ];

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-sage">
        <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-moss">森林浴 · Shinrin-Yoku</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-forest sm:text-4xl lg:text-5xl">{t(UI.home.heroTitle, lang)}</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75 sm:text-base">{t(UI.home.heroBody, lang)}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/identify" className="btn-primary">
                📷 {t(UI.home.ctaIdentify, lang)}
              </Link>
              <Link href="/walk" className="btn-secondary">
                ▶ {t(UI.home.ctaWalk, lang)}
              </Link>
            </div>
          </div>
          <HeroArt />
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 pb-6 sm:px-10 sm:pb-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label.en} className="rounded-2xl bg-cream/90 p-4 text-center shadow-sm">
              <div className="font-serif text-2xl font-semibold text-forest tabular-nums">{s.n}</div>
              <div className="text-xs text-ink/70">{t(s.label, lang)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section>
        <h2 className="section-title">{t(UI.home.whyHeading, lang)}</h2>
        <div className="mt-8 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="space-y-6">
            {features.slice(0, 2).map((f) => (
              <Feature key={f.title.en} {...f} lang={lang} />
            ))}
          </div>
          <PlantArt plant={PLANTS.find((p) => p.slug === "shorea-roxburghii")!} className="mx-auto hidden w-56 md:block" />
          <div className="space-y-6">
            {features.slice(2).map((f) => (
              <Feature key={f.title.en} {...f} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* About + why scent */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold text-forest">🏞️ {t(UI.home.aboutTitle, lang)}</h3>
          <p className="mt-1 text-sm leading-relaxed">{t(UI.home.aboutBody, lang)}</p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-forest">👃 {t(UI.home.whyTitle, lang)}</h3>
          <p className="mt-1 text-sm leading-relaxed">{t(UI.home.whyBody, lang)}</p>
        </div>
      </section>

      {/* Care banner */}
      <section className="rounded-3xl bg-forest p-6 text-paper sm:p-10">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t(UI.home.careHeading, lang)}</h2>
            <p className="mt-2 text-sm text-paper/80">{t(UI.home.careBody, lang)}</p>
            <Link href="/walk" className="btn-secondary mt-4 border-paper/30 bg-transparent text-paper hover:bg-paper/10">
              {t(UI.home.ctaWalk, lang)} →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/walk" className="rounded-2xl bg-cream p-5 text-ink transition hover:bg-sage">
              <div className="text-2xl">🚶</div>
              <div className="mt-2 font-semibold text-forest">{t(UI.home.careWalk.title, lang)}</div>
              <div className="text-xs text-ink/70">{t(UI.home.careWalk.body, lang)}</div>
            </Link>
            <Link href="/walk" className="rounded-2xl bg-cream p-5 text-ink transition hover:bg-sage">
              <div className="text-2xl">🫁</div>
              <div className="mt-2 font-semibold text-forest">{t(UI.home.careBreath.title, lang)}</div>
              <div className="text-xs text-ink/70">{t(UI.home.careBreath.body, lang)}</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Favourites */}
      <section>
        <h2 className="section-title">{t(UI.home.favHeading, lang)}</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`chip ${filter === f ? "bg-forest text-paper" : ""}`}>
              {f === "all" ? t(UI.plant.all, lang) : `${SCENT_FAMILY_LABEL[f].icon} ${t(SCENT_FAMILY_LABEL[f], lang)}`}
            </button>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <PlantCard key={p.slug} plant={p} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/plants" className="btn-secondary">
            {t(UI.home.viewAll, lang)} →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, body, lang }: { icon: string; title: { th: string; en: string }; body: { th: string; en: string }; lang: "th" | "en" }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-xl">{icon}</div>
      <div>
        <div className="font-semibold text-forest">{t(title, lang)}</div>
        <div className="text-sm text-ink/70">{t(body, lang)}</div>
      </div>
    </div>
  );
}
