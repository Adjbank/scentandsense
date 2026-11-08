"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";

const TABS = [
  { href: "/", key: "home", icon: "🏡" },
  { href: "/identify", key: "identify", icon: "📷" },
  { href: "/plants", key: "plants", icon: "🌿" },
  { href: "/walk", key: "walk", icon: "🚶" },
] as const;

function isActive(href: string, path: string) {
  return href === "/" ? path === "/" : path.startsWith(href);
}

export function Header() {
  const { lang, setLang } = useLang();
  const path = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-moss/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold text-forest">
          <span aria-hidden className="text-xl">🍃</span>
          <span>{t(UI.appName, lang)}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
          {TABS.map((tab) => (
            <Link key={tab.href} href={tab.href} className={isActive(tab.href, path) ? "font-semibold text-forest" : "text-ink/70 hover:text-forest"}>
              {t(UI.nav[tab.key], lang)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/identify" className="hidden items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper shadow-sm transition hover:bg-forest/90 md:inline-flex">
            📷 {t(UI.nav.identify, lang)}
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            className="rounded-full border border-moss/30 px-3 py-1.5 text-sm font-medium text-forest hover:bg-sage"
            aria-label="Toggle language"
          >
            {lang === "th" ? "EN" : "ไทย"}
          </button>
        </div>
      </div>
    </header>
  );
}

export function TabBar() {
  const { lang } = useLang();
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-moss/15 bg-paper/95 backdrop-blur md:hidden" aria-label="Main">
      <ul className="mx-auto flex max-w-3xl justify-around">
        {TABS.map((tab) => {
          const active = isActive(tab.href, path);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs ${active ? "text-forest font-semibold" : "text-ink/60"}`}
                aria-current={active ? "page" : undefined}
              >
                <span aria-hidden className="text-lg leading-none">{tab.icon}</span>
                {t(UI.nav[tab.key], lang)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-24 pt-10 text-xs text-ink/60 md:pb-10">
      <div className="border-t border-moss/15 pt-6">
        <p>{t(UI.footer.by, lang)}</p>
        <p className="mt-1">{t(UI.footer.disclaimer, lang)}</p>
      </div>
    </footer>
  );
}
