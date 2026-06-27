"use client";

import { useEffect, useRef } from "react";
import { POSTS } from "@/lib/posts";
import { useT } from "@/components/LangProvider";

const N = 9; // quantidade FINITA de imagens (o rasto acaba)
const heroSrc = (s: string) => s.replace("/posts/", "/hero/");

const CARDS = Array.from({ length: N }, (_, i) => ({ src: heroSrc(POSTS[i % POSTS.length].src), i }));

// telemóvel: duas filas para um marquee horizontal (CSS puro, sem rAF)
const MROW1 = POSTS.slice(0, 10);
const MROW2 = POSTS.slice(10, 20);

/**
 * Arco 3D FINITO (estilo TRIONN): a um certo ponto do scroll começam a EMERGIR
 * imagens de um canto (baixo-esquerda), uma a uma, fazem o semicírculo por cima do
 * texto e descem para o canto direito, saindo de cena. Passa um número finito e o
 * rasto ACABA. Funciona em desktop E telemóvel — no telemóvel os cartões são mais
 * pequenos e passam MENOS de cada vez (mais espaçados) para não se sobreporem.
 */
export default function DesignMotion() {
  const t = useT();
  const sec = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sec.current;
    const stageEl = stage.current;
    if (!section || !stageEl) return;
    // telemóvel: marquee CSS (sem rAF, que travava) — sair sem montar o arco
    if (window.matchMedia("(max-width: 760px)").matches) return;
    const cards = Array.from(stageEl.querySelectorAll<HTMLElement>(".dm-card"));
    let raf = 0;
    let running = false;

    const gap = 0.12;
    const span = 1 + N * gap;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const W = window.innerWidth;
      const total = section.offsetHeight - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      const RX = Math.min(W * 0.4, 720);
      const RY = Math.min(vh * 0.2, 200);
      const baseY = vh * 0.06;
      const zAmp = 260;

      for (let i = 0; i < cards.length; i++) {
        const u = p * span - i * gap; // posição desta imagem ao longo do rasto
        const el = cards[i];
        if (u <= 0 || u >= 1) {
          el.style.opacity = "0"; // ainda não emergiu, ou já saiu
          continue;
        }
        // SEMICÍRCULO: esquerda-baixo -> apex (centro/cima) -> direita-baixo
        const ang = u * Math.PI; // 0..π
        const x = -Math.cos(ang) * RX; // -RX (esq) -> 0 -> +RX (dir)
        const y = baseY - Math.sin(ang) * RY; // apex em cima, pontas em baixo
        const z = Math.sin(ang) * zAmp; // aproxima-se no apex; nunca recua para trás
        const ry = (u - 0.5) * 22;
        const rz = (u - 0.5) * -30; // inclina ao longo da curva
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
        <div className="dm-heading">
          <p className="eyebrow2">{t.gallery.eyebrow}</p>
          <h2 className="h2">{t.gallery.h2}</h2>
          <p className="lead">{t.gallery.lead}</p>
        </div>
        <div className="dm-field">
          {CARDS.map((c) => (
            <div className="dm-card" key={c.i} style={{ opacity: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* telemóvel: marquee horizontal CSS (leve, sem rAF; imagens eager p/ aparecerem) */}
      <div className="dm-mobile">
        <p className="eyebrow2">{t.gallery.eyebrow}</p>
        <h2 className="h2">{t.gallery.h2}</h2>
        <p className="lead">{t.gallery.lead}</p>
        <div className="dm-marq" aria-hidden="true">
          <div className="dm-mrow">
            <div className="dm-mtrack">
              {[...MROW1, ...MROW1].map((p, i) => (
                <div className="dm-mcell" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroSrc(p.src)} alt="" loading="eager" />
                </div>
              ))}
            </div>
          </div>
          <div className="dm-mrow rev">
            <div className="dm-mtrack">
              {[...MROW2, ...MROW2].map((p, i) => (
                <div className="dm-mcell" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroSrc(p.src)} alt="" loading="eager" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
