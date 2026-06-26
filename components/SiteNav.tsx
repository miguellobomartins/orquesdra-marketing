"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";

const LINKS: [string, string][] = [
  ["#how", "Product"],
  ["#pricing", "Pricing"],
  ["#gallery", "Gallery"],
  ["#", "Blog"],
];

export default function SiteNav() {
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
          {LINKS.map(([href, label]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="po-nav-right">
          <ThemeToggle />
          <a className="po-btn-primary magnetic po-nav-cta" href="https://app.orquesdra.com">
            Get started
          </a>
          <button
            className={`po-burger${open ? " open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`po-menu${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        <div className="po-menu-inner" onClick={(e) => e.stopPropagation()}>
          {LINKS.map(([href, label], i) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{ ["--i" as string]: i }}>
              {label}
            </a>
          ))}
          <a
            className="po-menu-cta"
            href="https://app.orquesdra.com"
            onClick={() => setOpen(false)}
            style={{ ["--i" as string]: LINKS.length }}
          >
            Get started
          </a>
        </div>
      </div>
    </>
  );
}
