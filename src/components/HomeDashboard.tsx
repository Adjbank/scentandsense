"use client";

import Image from "next/image";
import Link from "next/link";
import { EVIDENCE, MODE_LABEL, SESSIONS, storyOfDay } from "@/data/mindful";
import { PLANTS, getPlant } from "@/data/plants";
import { t } from "@/lib/i18n";
import {
  dayKey,
  moodStore,
  sessionStore,
  setMood,
  streak,
  type Mood,
} from "@/lib/journal";
import { useLang } from "@/lib/lang-context";
import { useNow } from "@/lib/use-now";

// ใช้ตอน prerender ก่อนรู้เวลาจริงของผู้ใช้ (ค่ากลางวัน)
const FALLBACK = new Date(2026, 0, 1, 9);

const MOODS: { v: Mood; face: string; label: { th: string; en: string } }[] = [
  { v: 1, face: "😣", label: { th: "หนักใจ", en: "Heavy" } },
  { v: 2, face: "😕", label: { th: "ไม่ค่อยดี", en: "Low" } },
  { v: 3, face: "😐", label: { th: "เฉยๆ", en: "Okay" } },
  { v: 4, face: "🙂", label: { th: "ดี", en: "Good" } },
  { v: 5, face: "😊", label: { th: "เบิกบาน", en: "Joyful" } },
];

function greeting(h: number, lang: "th" | "en") {
  if (h < 11) return lang === "th" ? "อรุณสวัสดิ์" : "Good morning";
  if (h < 16) return lang === "th" ? "สวัสดียามบ่าย" : "Good afternoon";
  if (h < 19) return lang === "th" ? "สวัสดียามเย็น" : "Good evening";
  return lang === "th" ? "ราตรีสวัสดิ์" : "Good night";
}

export function HomeDashboard() {
  const { lang } = useLang();
  const now = useNow() ?? FALLBACK;
  const logs = sessionStore.use();
  const moods = moodStore.use();
  const today = dayKey(now);
  const todayMood = moods.find((m) => m.day === today)?.mood;
  const todayLogs = logs.filter((l) => dayKey(new Date(l.at)) === today);

  const story = storyOfDay(now);
  const storyPlant = getPlant(story.slug)!;
  const hour = now.getHours();
  const suggested = SESSIONS.find(
    (s) => s.mode === (hour < 12 ? "focus" : hour < 17 ? "ground" : "calm"),
  )!;

  // แผนวันนี้: เชื่อมกับข้อมูลจริงในเครื่อง
  const plan = [
    {
      done: todayMood !== undefined,
      title: { th: "เช็กอินใจวันนี้", en: "Check in with your mood" },
      sub: { th: "1 นาที · รู้ใจตัวเอง", en: "1 min · notice how you feel" },
      href: "#mood",
    },
    {
      done: todayLogs.some((l) => l.id === suggested.id),
      title: suggested.title,
      sub: suggested.subtitle,
      href: `/meditate/${suggested.id}`,
    },
    {
      done: todayLogs.some((l) => l.id === "breath-478"),
      title: { th: "หายใจ 4-7-8", en: "4-7-8 breathing" },
      sub: { th: "3 นาที · ก่อนนอน", en: "3 min · before sleep" },
      href: "/meditate/breath-478",
    },
    {
      done: false,
      title: {
        th: `ดม${storyPlant.thaiName} (ป้าย ${storyPlant.signNo})`,
        en: `Smell ${storyPlant.englishName} (sign ${storyPlant.signNo})`,
      },
      sub: {
        th: "เดินไปหาต้นจริงในแปลงลำไย",
        en: "Find the real plant in the longan plot",
      },
      href: `/plants/${storyPlant.slug}`,
    },
  ];
  const doneCount = plan.filter((p) => p.done).length;
  const pct = Math.round((doneCount / plan.length) * 100);

  const actions = [
    {
      href: "/meditate",
      icon: "🧘",
      label: { th: "นั่งสมาธิ", en: "Meditate" },
    },
    {
      href: "/meditate/breath-478",
      icon: "🌬️",
      label: { th: "หายใจ", en: "Breathe" },
    },
    {
      href: "/identify",
      icon: "📷",
      label: { th: "ถ่ายรูปต้นไม้", en: "Identify" },
    },
    { href: "/plants", icon: "🌼", label: { th: "พืชหอม", en: "Plants" } },
  ];

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* คอลัมน์ซ้าย */}
      <div className="space-y-5">
        <header className="pt-1">
          <p className="text-ink/70">{greeting(hour, lang)},</p>
          <h1 className="font-serif text-4xl font-semibold text-forest">
            {lang === "th" ? "ผู้มาเยือนป่า 🌿" : "Forest friend 🌿"}
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            {lang === "th"
              ? "ใจที่สงบ กลิ่นที่ตื่นรู้"
              : "A calmer mind, a wakeful nose."}
          </p>
        </header>

        <Link
          href={`/meditate/${suggested.id}`}
          className="group relative block overflow-hidden rounded-[2rem] shadow-md"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/images/meditation-meadow.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/30 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h2 className="max-w-[12rem] font-serif text-3xl font-semibold leading-tight text-forest">
              {lang === "th" ? "ก้าวเล็กๆ ใจที่สงบ" : "Small steps, big calm."}
            </h2>
            <p className="mt-2 max-w-[13rem] text-sm text-ink/75">
              {t(suggested.title, lang)} · {suggested.minutes}{" "}
              {lang === "th" ? "นาที" : "min"}
            </p>
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper">
              {lang === "th" ? "เริ่มวันนี้" : "Start today"} →
            </span>
          </div>
        </Link>

        <div className="grid grid-cols-4 gap-3">
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-cream py-3 text-xs text-ink/75 shadow-sm transition hover:bg-sage"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-lg">
                {a.icon}
              </span>
              {t(a.label, lang)}
            </Link>
          ))}
        </div>

        <section id="mood" className="rounded-[2rem] bg-forest p-5 text-paper">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-semibold">
              {lang === "th" ? "ใจของคุณวันนี้" : "Your mood today"}
            </h3>
            <span className="text-xs text-paper/60">
              🔥 {streak(logs, now)}{" "}
              {lang === "th" ? "วันติดกัน" : "day streak"}
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            {MOODS.map((m) => (
              <button
                key={m.v}
                type="button"
                onClick={() => setMood(m.v)}
                aria-label={t(m.label, lang)}
                aria-pressed={todayMood === m.v}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition ${todayMood === m.v ? "scale-110 bg-cream shadow" : "bg-paper/15 hover:bg-paper/25"}`}
              >
                {m.face}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-paper/70">
            {todayMood
              ? t(MOODS[todayMood - 1].label, lang)
              : lang === "th"
                ? "แตะเพื่อบันทึกความรู้สึก"
                : "Tap to log how you feel"}
          </p>
        </section>
      </div>

      {/* คอลัมน์ขวา */}
      <div className="space-y-5">
        <section className="rounded-[2rem] bg-cream p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-forest">
                {lang === "th" ? "แผนวันนี้" : "Today's plan"}
              </h3>
              <p className="text-xs text-ink/60">
                {doneCount} / {plan.length}{" "}
                {lang === "th" ? "เสร็จแล้ว" : "completed"}
              </p>
            </div>
            <span className="font-serif text-lg font-semibold tabular-nums text-forest">
              {pct}%
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
            <div
              className="h-full rounded-full bg-forest transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ul className="mt-4 space-y-1">
            {plan.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="flex items-center gap-3 rounded-xl px-1 py-2 hover:bg-sage/60"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs ${p.done ? "border-forest bg-forest text-paper" : "border-ink/25"}`}
                  >
                    {p.done ? "✓" : ""}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-medium ${p.done ? "text-ink/50 line-through" : "text-ink"}`}
                    >
                      {t(p.title, lang)}
                    </span>
                    <span className="block truncate text-xs text-ink/55">
                      {t(p.sub, lang)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href={`/plants/${storyPlant.slug}`}
          className="group block overflow-hidden rounded-[2rem] bg-cream shadow-sm"
        >
          <div className="relative aspect-[16/9]">
            <Image
              src={
                story.mode === "calm"
                  ? "/images/dusk-flowers.jpg"
                  : story.mode === "focus"
                    ? "/images/white-blossoms.jpg"
                    : "/images/tree-sunset.jpg"
              }
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-forest">
              {MODE_LABEL[story.mode].icon}{" "}
              {lang === "th" ? "กลิ่นช่วยสมาธิวันนี้" : "Scent for today"}
            </span>
          </div>
          <div className="p-5">
            <div className="text-xs text-moss">
              {lang === "th" ? "ป้าย" : "Sign"} {storyPlant.signNo} ·{" "}
              {t(MODE_LABEL[story.mode], lang)}
            </div>
            <h3 className="font-serif text-2xl font-semibold text-forest">
              {lang === "th" ? storyPlant.thaiName : storyPlant.englishName}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {t(story.story, lang)}
            </p>
            <p className="mt-3 text-[11px] text-ink/55">
              {lang === "th" ? "งานวิจัย" : "Evidence"}:{" "}
              {story.evidence
                .map(
                  (e) =>
                    `${EVIDENCE[e].compound} — ${EVIDENCE[e].source.authors?.split(",")[0]} ${EVIDENCE[e].source.year}`,
                )
                .join(" · ")}
            </p>
          </div>
        </Link>

        <blockquote className="rounded-[2rem] bg-sage p-6 text-center font-serif text-lg text-forest">
          “
          {lang === "th"
            ? "ดอกไม้ไม่เคยรีบบาน กลิ่นก็ไม่เคยรีบมา จงหายใจให้ช้าพอจะได้พบกัน"
            : "Flowers never hurry to bloom, nor scent to arrive. Breathe slowly enough to meet them."}
          ”
          <footer className="mt-2 font-sans text-xs text-ink/60">
            {PLANTS.length}{" "}
            {lang === "th"
              ? "ชนิดพืชในแปลงลำไย รอให้คุณมาทักทาย"
              : "species in the longan plot are waiting to meet you"}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
