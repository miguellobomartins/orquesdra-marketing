"use client";

import { useEffect, useRef } from "react";
import { POSTS } from "@/lib/posts";

const N = 9; // quantidade FINITA de imagens (o rasto acaba)
const GAP = 0.12; // desfasamento entre imagens ao longo do rasto
const SPAN = 1 + N * GAP; // quanto progresso é preciso para escoar tudo
const TURNS = 1.25; // voltas da espiral
const SPIRAL_R = 175; // raio do enrolamento
const PH = Math.PI * 0.9; // fase de entrada
const heroSrc = (s: string) => s.replace("/posts/", "/hero/");

const CARDS = Array.from({ length: N }, (_, i) => ({ src: heroSrc(POSTS[i % POSTS.length].src), i }));

/**
 * Espiral 3D FINITA (estilo TRIONN): a um certo ponto do scroll começam a EMERGIR
 * imagens de um canto (baixo-esquerda), uma a uma, fazem a espiral e sobem para o
 * canto direito, saindo de cena. Passa um número finito de imagens e o rasto ACABA
 * (não é um loop infinito). Conduzida pelo scroll (secção sticky + rAF).
 */
export default function DesignMotion() {
  const sec = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sec.current;
    const stageEl = stage.current;
    if (!section || !stageEl) return;
    const cards = Array.from(stageEl.querySelectorAll<HTMLElement>(".dm-card"));
    let raf = 0;
    let running = false;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      for (let i = 0; i < cards.length; i++) {
        const u = p * SPAN - i * GAP; // posição desta imagem ao longo do rasto
        const el = cards[i];
        if (u <= 0 || u >= 1) {
          el.style.opacity = "0"; // ainda não emergiu, ou já saiu
          continue;
        }
        const ang = u * TURNS * Math.PI * 2 + PH;
        const x = -660 + u * 1360 + Math.cos(ang) * SPIRAL_R; // canto-esq -> canto-dir
        const y = 340 - u * 900 + Math.sin(ang) * SPIRAL_R; // baixo -> cima
        const z = -750 + Math.sin(u * Math.PI) * 1150; // aproxima a meio
        const ry = Math.cos(ang) * 18;
        const rz = Math.sin(ang) * 7;
        const op = Math.max(0, Math.min(1, Math.min(u / 0.07, (1 - u) / 0.12)));
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
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
    <div className="dm-section" ref={sec}>
      <div className="dm-stage" ref={stage}>
        <div className="dm-field">
          {CARDS.map((c) => (
            <div className="dm-card" key={c.i} style={{ opacity: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
