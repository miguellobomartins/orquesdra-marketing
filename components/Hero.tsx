"use client";

import { Fragment } from "react";
import HeroDepth from "@/components/HeroDepth";
import { useT } from "@/components/LangProvider";

export default function Hero() {
  const t = useT();
  const lines = t.hero.headlineLines.map((l) => l.split(" "));
  let idx = 0;
  return (
    <section className="hero hero-grid">
      <HeroDepth />

      <div className="hero-foot">
        <div className="hero-actions">
          <a className="hero-btn hero-btn-glass magnetic" href="https://app.orquesdra.com">{t.hero.ctaPrimary}</a>
          <a className="hero-btn hero-btn-fill" href="#pricing">{t.hero.ctaSecondary}</a>
        </div>

        <div className="hero-bl">
          <h1 className="po-h1 hero-bl-h" key={t.hero.headlineLines.join("|")}>
            {lines.map((words, li) => (
              <span className="h1line" key={li}>
                {words.map((w, wi) => {
                  const d = (0.05 + idx++ * 0.06).toFixed(2);
                  return (
                    <Fragment key={wi}>
                      <span className="word" style={{ ["--d" as string]: `${d}s` }}>
                        <span>{w}</span>
                      </span>{" "}
                    </Fragment>
                  );
                })}
              </span>
            ))}
          </h1>
          <p className="hero-bl-sub">{t.hero.sub}</p>
        </div>
      </div>
    </section>
  );
}
