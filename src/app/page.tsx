"use client";

import Link from "next/link";
import { PLANTS } from "@/data/plants";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";
import { PlantCard } from "@/components/PlantBits";

const FEATURED = ["vallaris-glabra", "cananga-odorata", "pinus-kesiya"];

export default function Home() {
  const { lang } = useLang();
  const featured = PLANTS.filter((p) => FEATURED.includes(p.slug));
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-forest to-moss p-6 text-paper shadow-lg">
        <p className="text-sm uppercase tracking-widest text-leaf">森林浴 · Shinrin-Yoku</p>
        <h1 className="mt-2 text-2xl font-bold leading-snug">{t(UI.home.heroTitle, lang)}</h1>
        <p className="mt-3 text-sm leading-relaxed text-paper/90">{t(UI.home.heroBody, lang)}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href="/identify" className="btn-primary bg-sun text-ink hover:bg-sun/90">
            📷 {t(UI.home.ctaIdentify, lang)}
          </Link>
          <Link href="/walk" className="btn-secondary border-paper/40 bg-transparent text-paper hover:bg-paper/10">
            🚶 {t(UI.home.ctaWalk, lang)}
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-semibold text-forest">🏞️ {t(UI.home.aboutTitle, lang)}</h2>
          <p className="mt-1 text-sm leading-relaxed">{t(UI.home.aboutBody, lang)}</p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-forest">👃 {t(UI.home.whyTitle, lang)}</h2>
          <p className="mt-1 text-sm leading-relaxed">{t(UI.home.whyBody, lang)}</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-forest">{t(UI.nav.plants, lang)}</h2>
          <Link href="/plants" className="text-sm text-forest underline">
            {t(UI.home.ctaPlants, lang)} ({PLANTS.length} {t(UI.plant.count, lang)})
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {featured.map((p) => (
            <PlantCard key={p.slug} plant={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
