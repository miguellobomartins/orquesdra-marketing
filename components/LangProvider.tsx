"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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

/** Seletor de língua em dropdown (PT / EN) para o header. */
export function LangDropdown() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items: { code: Lang; label: string }[] = [
    { code: "pt", label: "Português" },
    { code: "en", label: "English" },
  ];

  return (
    <div className={`lang-dd${open ? " open" : ""}`} ref={ref}>
      <button type="button" className="lang-dd-btn" aria-haspopup="listbox" aria-expanded={open} aria-label="Língua" onClick={() => setOpen((v) => !v)}>
        <svg className="lang-dd-globe" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18" />
        </svg>
        <span>{lang.toUpperCase()}</span>
        <svg className="lang-dd-chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className="lang-dd-menu" role="listbox" aria-label="Língua">
          {items.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={lang === code}
              className={lang === code ? "on" : ""}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
            >
              <span className="lang-dd-code">{code.toUpperCase()}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
