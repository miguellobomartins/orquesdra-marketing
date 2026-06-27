"use client";

import { useEffect, useRef } from "react";
import { POSTS } from "@/lib/posts";

const COLS = 5;
const PER_COL = 6;

// distribui os posts por colunas (round-robin), repetindo para encher o ecrã
function buildColumns() {
  const cols: { src: string }[][] = Array.from({ length: COLS }, () => []);
  let idx = 0;
  for (let r = 0; r < PER_COL; r++) {
    for (let c = 0; c < COLS; c++) {
      cols[c].push(POSTS[idx % POSTS.length]);
      idx++;
    }
  }
  return cols;
}
const COLUMNS = buildColumns();

/**
 * Grelha elástica de posts (adaptação do "ElasticGridScroll" da Awwwards Pack):
 * cada coluna ARRASTA-SE atrás do scroll a um ritmo diferente (centro rápido,
 * bordas mais lentas) → curvatura elástica ao rolar. Enche o ecrã de imagens.
 */
export default function GalleryGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cols = Array.from(el.querySelectorAll<HTMLElement>(".eg-col"));
    const mid = (cols.length - 1) / 2;
    // parallax por coluna: centro desloca-se MAIS (lidera), bordas menos (atrasam)
    // -> curvatura elástica conforme a secção atravessa o ecrã
    const factor = cols.map((_, i) => 0.2 - Math.abs(i - mid) * 0.07); // centro 0.2, bordas ~0.06
    const CLAMP = 200;
    // posição-alvo e posição suavizada por coluna (lerp -> elástico, sem saltos)
    const cur = cols.map(() => 0);
    let raf = 0;
    let running = false;

    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let d = r.top + r.height / 2 - vh / 2; // distância do centro da secção ao centro do ecrã
      if (d > vh) d = vh;
      else if (d < -vh) d = -vh;
      for (let i = 0; i < cols.length; i++) {
        let target = d * factor[i];
        if (target > CLAMP) target = CLAMP;
        else if (target < -CLAMP) target = -CLAMP;
        cur[i] += (target - cur[i]) * 0.12; // suavização elástica
        cols[i].style.transform = `translate3d(0, ${cur[i].toFixed(1)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="eg-frame" aria-hidden="true">
      <div className="eg" ref={root}>
        {COLUMNS.map((col, c) => (
          <div className="eg-col" key={c}>
            {col.map((p, r) => (
              <div className="eg-cell" key={r}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
