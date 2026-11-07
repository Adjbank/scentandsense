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

export function Header() {
  const { lang, setLang } = useLang();
  return (
    <header className="sticky top-0 z-20 border-b border-moss/15 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-forest">
          <span aria-hidden className="text-xl">🍃</span>
          <span>{t(UI.appName, lang)}</span>
        </Link>
        <button
          type="button"
          onClick={() => setLang(lang === "th" ? "en" : "th")}
          className="rounded-full border border-moss/30 px-3 py-1 text-sm font-medium text-forest hover:bg-moss/10"
          aria-label="Toggle language"
        >
          {lang === "th" ? "EN" : "ไทย"}
        </button>
      </div>
    </header>
  );
}

export function TabBar() {
  const { lang } = useLang();
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-moss/15 bg-paper/95 backdrop-blur" aria-label="Main">
      <ul className="mx-auto flex max-w-3xl justify-around">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? path === "/" : path.startsWith(tab.href);
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
    <footer className="mx-auto max-w-3xl px-4 pb-24 pt-8 text-xs text-ink/60">
      <p>{t(UI.footer.by, lang)}</p>
      <p className="mt-1">{t(UI.footer.disclaimer, lang)}</p>
    </footer>
  );
}
