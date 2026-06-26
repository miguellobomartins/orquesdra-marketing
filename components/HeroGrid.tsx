"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

const ROWS = 6;
const PER_ROW = 10; // base por linha (duplicada para loop contínuo)

// versões leves do hero (public/hero) — carregam ~3x mais rápido que as da galeria
const heroSrc = (src: string) => src.replace("/posts/", "/hero/");

function rowImages(row: number) {
  return Array.from({ length: PER_ROW }, (_, i) => heroSrc(POSTS[(row * 3 + i) % POSTS.length].src));
}

const UNIQUE_SRCS = Array.from(new Set(POSTS.map((p) => heroSrc(p.src))));

export default function HeroGrid() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".gridrow"));
    const gitems = Array.from(el.querySelectorAll<HTMLElement>(".gitem"));

    let ctx: gsap.Context | null = null;
    let revealed = false;
    let raf = 0;
    const cleanups: Array<() => void> = [];

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      ctx = gsap.context(() => {
        // marquee infinito (corre já, escondido, para os cartões surgirem a derivar)
        rows.forEach((row, i) => {
          const track = row.querySelector<HTMLElement>(".gridrow-track");
          if (!track) return;
          const dur = 50 + (i % 4) * 9;
          const tween = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: dur, ease: "none", repeat: -1 });
          tween.progress((i * 0.17) % 1);
        });

        // ENTRADA: a moldura assenta + os cartões surgem em cascata aleatória.
        gsap.fromTo(".gridrot", { scale: 1.08 }, { scale: 1, duration: 1.6, ease: "power3.out" });
        gsap.fromTo(
          gitems,
          { opacity: 0, scale: 0.84, yPercent: 6 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 0.85, ease: "power3.out", stagger: { amount: 0.9, from: "random" } },
        );
      }, el);

      // reatividade ao rato (estilo IntroGridMotion): as linhas deslizam todas no
      // mesmo sentido (a do meio mais rápida) e o slab escurece + contrasta para as
      // bordas — efeito cinematográfico de "holofote ao centro".
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) {
        const gridrot = el.querySelector<HTMLElement>(".gridrot");
        const win = { w: window.innerWidth };
        const onResize = () => (win.w = window.innerWidth);
        const mouse = { x: win.w / 2 };
        const onMove = (e: MouseEvent) => (mouse.x = e.clientX);
        const mid = Math.floor(rows.length / 2);
        const state = rows.map((_, i) => ({ x: 0, amt: Math.max(0.1 - Math.abs(i - mid) * 0.018, 0.045) }));
        const filt = { b: 100, c: 100 };
        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMove);
        const render = () => {
          const nx = (mouse.x / win.w) * 2 - 1; // -1..1
          const tX = nx * 0.16 * win.w; // alvo partilhado (~16% da largura)
          const f = Math.min(Math.abs(nx), 1) ** 2; // não-linear
          const tB = 100 - f * 40; // 100 -> 60
          const tC = 100 + f * 22; // 100 -> 122
          rows.forEach((row, i) => {
            const s = state[i];
            s.x += (tX - s.x) * s.amt;
            gsap.set(row, { x: s.x });
          });
          filt.b += (tB - filt.b) * 0.09;
          filt.c += (tC - filt.c) * 0.09;
          if (gridrot) gsap.set(gridrot, { filter: `brightness(${filt.b}%) contrast(${filt.c}%)` });
          raf = requestAnimationFrame(render);
        };
        raf = requestAnimationFrame(render);
        cleanups.push(() => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", onMove);
        });
      }
    };

    // pré-carregar as imagens do hero para estarem prontas quando revelar
    UNIQUE_SRCS.forEach((s) => {
      const img = new window.Image();
      img.src = s;
    });
    // revelar quando o loader termina (sincronizado com a revelação da página);
    // failsafe caso o loader não exista ou falhe.
    window.addEventListener("orq:loaded", reveal);
    const fallback = window.setTimeout(reveal, 3000);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("orq:loaded", reveal);
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return (
    <div className="gridscene" ref={scene} aria-hidden="true">
      <div className="gridrot">
        {Array.from({ length: ROWS }, (_, r) => {
          const imgs = rowImages(r);
          return (
            <div className="gridrow" key={r}>
              <div className="gridrow-track">
                {[...imgs, ...imgs].map((src, c) => (
                  <div className="gitem" key={c}>
                    <div className="gitem-img" style={{ backgroundImage: `url(${src})` }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
