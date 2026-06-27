"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/components/LangProvider";
import { POSTS } from "@/lib/posts";

const N = 14;
const CYCLES = 1.15; // quantas "voltas" do conveyor ao atravessar a secção
const heroSrc = (s: string) => s.replace("/posts/", "/hero/"); // versões leves

const CARDS = Array.from({ length: N }, (_, i) => ({ src: heroSrc(POSTS[i % POSTS.length].src), o: i / N }));

/**
 * "Design em movimento" — adaptação do efeito DESIGN IN MOTION do TRIONN:
 * uma linha 3D de posts que flui ao longo de uma curva conduzida pelo scroll —
 * entram longe/pequenos, aproximam-se da câmara ao centro (grandes) e saem
 * pela curva para cima/longe. Secção fixada (sticky) + posições calculadas no rAF.
 */
export default function DesignMotion() {
  const t = useT();
  const sec = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sec.current;
    const stageEl = stage.current;
    if (!section || !stageEl) return;
    const cards = Array.from(stageEl.querySelectorAll<HTMLElement>(".dm-card"));
    const frac = (x: number) => x - Math.floor(x);
    let raf = 0;
    let running = false;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      for (let i = 0; i < cards.length; i++) {
        const u = frac(CARDS[i].o + p * CYCLES); // 0..1 ao longo da curva
        const bump = Math.sin(u * Math.PI); // 0 (longe) -> 1 (perto) -> 0 (longe)
        const z = -1550 + 1980 * bump; // recua nas pontas, aproxima-se ao centro
        const x = (u - 0.5) * 1780; // varre da esquerda para a direita
        const y = (u - 0.5) * 360 - bump * 30; // entra por baixo, sai por cima
        const ry = (u - 0.5) * 44; // roda ao passar
        const op = Math.max(0, Math.min(1, bump * 1.7 - 0.12));
        const el = cards[i];
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg)`;
        el.style.opacity = op.toFixed(2);
        el.style.zIndex = String(Math.round(z + 2000));
      }
      raf = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(render);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "150px 0px" },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="dm-section" ref={sec}>
      <div className="dm-stage" ref={stage}>
        <p className="dm-eyebrow">{t.motion.eyebrow}</p>
        <h2 className="dm-bg" aria-hidden="true">{t.motion.h2}</h2>
        <div className="dm-field">
          {CARDS.map((c, i) => (
            <div className="dm-card" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="dm-foot">{t.motion.foot}</p>
      </div>
    </section>
  );
}
