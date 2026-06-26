"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

const ROWS = 6;
const PER_ROW = 10; // base por linha (duplicada para loop contínuo)

// imagens por linha, cicladas com desfasamento para variar
function rowImages(row: number) {
  return Array.from({ length: PER_ROW }, (_, i) => POSTS[(row * 3 + i) % POSTS.length].src);
}

export default function HeroGrid() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".gridrow"));

    const ctx = gsap.context(() => {
      // entrada
      gsap.from(".gridrot", { scale: 1.12, opacity: 0, duration: 1.3, ease: "power3.out" });
      // marquee contínuo, direções e velocidades alternadas
      rows.forEach((row, i) => {
        const track = row.querySelector<HTMLElement>(".gridrow-track");
        if (!track) return;
        const dur = 46 + (i % 3) * 10;
        if (i % 2 === 0) {
          gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: dur, ease: "none", repeat: -1 });
        } else {
          gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: dur, ease: "none", repeat: -1 });
        }
      });
    }, el);

    // parallax subtil com o rato (offset por cima do marquee)
    const fine = window.matchMedia("(pointer: fine)").matches;
    let raf = 0;
    const win = { w: window.innerWidth };
    const onResize = () => (win.w = window.innerWidth);
    const mouse = { x: win.w / 2 };
    const onMove = (e: MouseEvent) => (mouse.x = e.clientX);
    const state = rows.map((_, i) => ({ x: 0, amt: 0.06 + (i % 3) * 0.015 }));

    if (fine) {
      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMove);
      const render = () => {
        const nx = (mouse.x / win.w) * 2 - 1; // -1..1
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
    }

    return () => {
      ctx.revert();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
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
