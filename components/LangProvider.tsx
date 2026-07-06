"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { STRINGS, type Dict, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangContext = createContext<Ctx | null>(null);

/**
 * Language is driven by the URL now (PT at "/", EN at "/en"), so each route
 * mounts the provider with an explicit `initialLang`. The server renders the
 * page in that language (indexable per URL); the switcher is a real <a href>
 * to the other URL (crawlable + full navigation into the right SSR language).
 */
export default function LangProvider({
  initialLang = "pt",
  children,
}: {
  initialLang?: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

/** Seletor de língua (PT / EN) para o header — links reais para "/" e "/en". */
export function LangDropdown() {
  const { lang } = useLang();
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

  const items: { code: Lang; label: string; href: string }[] = [
    { code: "pt", label: "Português", href: "/" },
    { code: "en", label: "English", href: "/en" },
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
          {items.map(({ code, label, href }) => (
            <a
              key={code}
              role="option"
              aria-selected={lang === code}
              hrefLang={code}
              href={href}
              className={lang === code ? "on" : ""}
              onClick={() => setOpen(false)}
            >
              <span className="lang-dd-code">{code.toUpperCase()}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
