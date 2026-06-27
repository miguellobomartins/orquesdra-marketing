"use client";

import { useEffect, useRef } from "react";
import { POSTS } from "@/lib/posts";

const N = 11;
const CYCLES = 1.0; // cada cartão percorre a hélice uma vez ao atravessar a secção
const TURNS = 1.45; // voltas da espiral
const T0 = Math.PI * 0.32; // ângulo de entrada (canto inferior-direito)
const heroSrc = (s: string) => s.replace("/posts/", "/hero/");

const CARDS = Array.from({ length: N }, (_, i) => ({ src: heroSrc(POSTS[i % POSTS.length].src), o: i / N }));

/**
 * Espiral 3D de posts (estilo TRIONN "Design in Motion"): as imagens ENTRAM por
 * um canto (longe/pequenas), fazem uma HÉLICE (orbitam enquanto se aproximam da
 * câmara) e SAEM por cima. Conduzida pelo scroll (secção sticky + rAF).
 */
export default function DesignMotion() {
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
        const u = frac(CARDS[i].o + p * CYCLES); // 0 (entrada) -> 1 (saída)
        const th = u * TURNS * Math.PI * 2 + T0; // ângulo da hélice
        const R = 340 + u * 300; // raio da órbita (abre ao aproximar)
        const x = Math.cos(th) * R;
        const yOrbit = Math.sin(th) * R * 0.58;
        const yRise = -Math.pow(u, 2.3) * 1650 + (1 - u) * 170; // sobe e sai por cima
        const y = yOrbit + yRise;
        const z = -2050 + u * 2450; // longe -> perto
        const ry = Math.cos(th) * 22;
        const rz = Math.sin(th) * 7;
        const op = Math.max(0, Math.min(1, Math.min(u / 0.07, (1 - u) / 0.16)));
        const el = cards[i];
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
        el.style.opacity = op.toFixed(2);
        el.style.zIndex = String(Math.round(z + 2200));
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
          {CARDS.map((c, i) => (
            <div className="dm-card" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
