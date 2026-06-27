"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";
import { useT, LangDropdown } from "@/components/LangProvider";

export default function SiteNav() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="po-nav" id="nav">
        <span className="po-wordmark"><BrandMark className="po-mark" />Orquesdra</span>
        <div className="po-navlinks">
          {t.nav.links.map(({ href, label }) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="po-nav-right">
          <LangDropdown />
          <ThemeToggle />
          <a className="po-btn-primary magnetic po-nav-cta" href="https://app.orquesdra.com">
            {t.nav.cta}
          </a>
          <button
            className={`po-burger${open ? " open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`po-menu${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        <button className="po-menu-close" aria-label="Fechar menu" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="po-menu-inner" onClick={(e) => e.stopPropagation()}>
          {t.nav.links.map(({ href, label }, i) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{ ["--i" as string]: i }}>
              {label}
            </a>
          ))}
          <a
            className="po-menu-cta"
            href="https://app.orquesdra.com"
            onClick={() => setOpen(false)}
            style={{ ["--i" as string]: t.nav.links.length }}
          >
            {t.nav.cta}
          </a>
          <div className="po-menu-lang" style={{ ["--i" as string]: t.nav.links.length + 1 }}>
            <LangDropdown />
          </div>
        </div>
      </div>
    </>
  );
}
