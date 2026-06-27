"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

const COLS = 5;
const PER_COL = 7;

// distribui os posts por colunas (round-robin)
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
 * Galeria = parede de posts VIVA: cada coluna flui continuamente em loop (umas
 * sobem, outras descem, a velocidades diferentes). Enche o ecrã, sem cortar as
 * imagens (rácio natural). O track é duplicado p/ o loop -50% ser perfeito.
 */
export default function GalleryGrid() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const tracks = Array.from(el.querySelectorAll<HTMLElement>(".eg-track"));
    let ctx: gsap.Context | null = null;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      ctx = gsap.context(() => {
        tracks.forEach((t, i) => {
          const dur = 38 + (i % 3) * 11; // velocidades variadas por coluna
          if (i % 2 === 0) gsap.fromTo(t, { yPercent: 0 }, { yPercent: -50, duration: dur, ease: "none", repeat: -1 });
          else gsap.fromTo(t, { yPercent: -50 }, { yPercent: 0, duration: dur, ease: "none", repeat: -1 });
        });
      }, el);

      // abrandar (não parar) quando o rato está por cima — toque premium
      if (window.matchMedia("(pointer: fine)").matches) {
        const setScale = (s: number) => tracks.forEach((t) => gsap.getTweensOf(t).forEach((tw) => tw.timeScale(s)));
        el.addEventListener("pointerenter", () => setScale(0.3));
        el.addEventListener("pointerleave", () => setScale(1));
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) start();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <div className="eg-frame" aria-hidden="true">
      <div className="eg" ref={root}>
        {COLUMNS.map((col, c) => (
          <div className="eg-col" key={c}>
            <div className="eg-track">
              {[...col, ...col].map((p, r) => (
                <div className="eg-cell" key={r}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
