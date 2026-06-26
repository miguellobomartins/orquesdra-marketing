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

      // parallax subtil com o rato
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) {
        const win = { w: window.innerWidth };
        const onResize = () => (win.w = window.innerWidth);
        const mouse = { x: win.w / 2 };
        const onMove = (e: MouseEvent) => (mouse.x = e.clientX);
        const state = rows.map((_, i) => ({ x: 0, amt: 0.06 + (i % 3) * 0.015 }));
        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMove);
        const render = () => {
          const nx = (mouse.x / win.w) * 2 - 1;
          const target = nx * 0.04 * win.w;
          rows.forEach((row, i) => {
            const s = state[i];
            const dir = i % 2 === 0 ? 1 : -1;
            s.x += (target * dir - s.x) * s.amt;
            gsap.set(row, { x: s.x });
          });
          raf = requestAnimationFrame(render);
        };
        raf = requestAnimationFrame(render);
        cleanups.push(() => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", onMove);
        });
      }
    };

    // pré-carregar as imagens do hero; revelar quando prontas (ou após timeout)
    let loaded = 0;
    const total = UNIQUE_SRCS.length || 1;
    const tick = () => {
      loaded += 1;
      if (loaded >= total) reveal();
    };
    UNIQUE_SRCS.forEach((s) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = s;
    });
    const fallback = window.setTimeout(reveal, 1500);

    return () => {
      window.clearTimeout(fallback);
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
