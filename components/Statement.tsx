"use client";

import { useT } from "@/components/LangProvider";

export default function Statement() {
  const t = useT();
  return (
    <section className="panel statement-panel">
      <div className="sp-inner">
        <p className="eyebrow2">{t.problem.eyebrow}</p>
        <h2 className="sp-h">
          {t.problem.headlinePre}
          <em>{t.problem.headlineEm}</em>
          {t.problem.headlinePost}
        </h2>
        <div className="alts">
          {t.problem.alts.map((a) => (
            <div className="alt" key={a.n}>
              <span className="n">{a.n}</span>
              <h3>{a.h}</h3>
              <p>{a.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
