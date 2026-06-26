"use client";

import { Fragment } from "react";
import HeroGrid from "@/components/HeroGrid";
import { useT } from "@/components/LangProvider";

export default function Hero() {
  const t = useT();
  const words = t.hero.headline.split(" ");
  return (
    <section className="hero hero-grid">
      <HeroGrid />

      <div className="hero-foot">
        <div className="hero-actions">
          <a className="hero-btn hero-btn-glass magnetic" href="https://app.orquesdra.com">{t.hero.ctaPrimary}</a>
          <a className="hero-btn hero-btn-fill" href="#pricing">{t.hero.ctaSecondary}</a>
        </div>

        <div className="hero-bl">
          <h1 className="po-h1 hero-bl-h" key={t.hero.headline}>
            <span className="h1line">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className="word" style={{ ["--d" as string]: `${(0.05 + i * 0.06).toFixed(2)}s` }}>
                    <span>{w}</span>
                  </span>{" "}
                </Fragment>
              ))}
            </span>
          </h1>
          <p className="hero-bl-sub">{t.hero.sub}</p>
        </div>
      </div>
    </section>
  );
}
