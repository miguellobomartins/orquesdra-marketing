"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { STRINGS, type Dict, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "orq-lang";

export default function LangProvider({ children }: { children: React.ReactNode }) {
  // Default PT-PT on both server and first client render (no hydration mismatch);
  // switch to a stored preference (e.g. EN) after mount.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (stored === "en" || stored === "pt") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Atalho para o dicionário da língua atual. */
export function useT(): Dict {
  return useLang().t;
}

/** Toggle PT / EN para o header. */
export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Língua">
      <button className={lang === "pt" ? "on" : ""} aria-pressed={lang === "pt"} onClick={() => setLang("pt")}>
        PT
      </button>
      <button className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}
