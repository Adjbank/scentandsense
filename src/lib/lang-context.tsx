"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { LANG_STORAGE_KEY, type Lang } from "./i18n";
import { createLocalStore } from "./local-store";

const store = createLocalStore<Lang>(LANG_STORAGE_KEY, "th", (raw) => (raw === "en" ? "en" : "th"));

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({ lang: "th", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = store.use();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // ผู้ใช้ที่เบราว์เซอร์ไม่ใช่ภาษาไทยและยังไม่เคยเลือกภาษา → ตั้งค่าเริ่มต้นเป็นอังกฤษ
  useEffect(() => {
    try {
      if (window.localStorage.getItem(LANG_STORAGE_KEY) === null && !navigator.language.toLowerCase().startsWith("th")) {
        store.set("en");
      }
    } catch {
      /* ignore */
    }
  }, []);

  return <Ctx.Provider value={{ lang, setLang: store.set }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}
