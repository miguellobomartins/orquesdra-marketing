"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

const heroSrc = (src: string) => src.replace("/posts/", "/hero/");

const COLS = 5;
const ROWS = 4;
const frac = (x: number) => x - Math.floor(x);
const rnd = (i: number, n: number) => frac(Math.sin(i * 12.9898 + n * 78.233) * 43758.5453);

type Card = { src: string; x: number; y: number; z: number; rot: number; w: number; blur: number; opacity: number };

// Layout determinístico (mesmo no SSR e no cliente): grelha 5x4 com jitter + z variado.
// arredondar para 2 casas evita mismatch de hidratacao (SSR arredonda, cliente nao)
const r2 = (n: number) => Math.round(n * 100) / 100;
const CARDS: Card[] = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const x = r2(((col + 0.5) / COLS) * 100 + (rnd(i, 1) - 0.5) * 18);
  const y = r2(((row + 0.5) / ROWS) * 100 + (rnd(i, 2) - 0.5) * 18);
  const z = r2(-740 + rnd(i, 3) * 940); // -740 (longe) .. 200 (perto)
  const rot = r2((rnd(i, 4) - 0.5) * 14);
  const w = r2(150 + rnd(i, 5) * 100);
  const blur = r2(Math.max(0, -z / 165));
  const opacity = r2(Math.max(0.32, Math.min(1, 1 + z / 1000)));
  return { src: heroSrc(POSTS[i % POSTS.length].src), x, y, z, rot, w, blur, opacity };
});

const UNIQUE_SRCS = Array.from(new Set(CARDS.map((c) => c.src)));

export default function HeroDepth() {
  const scene = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scene.current;
    const fld = field.current;
    if (!el || !fld) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".hd-card"));

    let ctx: gsap.Context | null = null;
    let revealed = false;
    const cleanups: Array<() => void> = [];

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      ctx = gsap.context(() => {
        // ENTRADA: a parede monta-se desde o fundo (cada cartão vem de mais longe).
        gsap.fromTo(
          cards,
          { opacity: 0, z: (i) => CARDS[i].z - 1000 },
          {
            opacity: (i) => CARDS[i].opacity,
            z: (i) => CARDS[i].z,
            duration: 1.4,
            ease: "power3.out",
            stagger: { amount: 1.0, from: "random" },
            onComplete: () => {
              // float subtil contínuo (cada cartão respira em y)
              cards.forEach((c, i) => {
                gsap.to(c, { y: 6 + rnd(i, 8) * 10, duration: 3 + rnd(i, 9) * 2.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: rnd(i, 10) * 1.5 });
              });
            },
          },
        );
      }, el);

      // parallax 3D ao rato: o campo inclina-se; os cartões perto deslocam-se mais.
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) {
        const rotX = gsap.quickTo(fld, "rotationX", { duration: 1.1, ease: "power3.out" });
        const rotY = gsap.quickTo(fld, "rotationY", { duration: 1.1, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          rotY(nx * 7);
          rotX(-ny * 5);
        };
        window.addEventListener("mousemove", onMove);
        cleanups.push(() => window.removeEventListener("mousemove", onMove));
      }
    };

    // pré-carregar as imagens (leves); revelar quando prontas ou após timeout.
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
    const fallback = window.setTimeout(reveal, 1400);

    return () => {
      window.clearTimeout(fallback);
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return (
    <div className="hd-scene" ref={scene} aria-hidden="true">
      <div className="hd-field" ref={field}>
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="hd-card"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.w}px`,
              transform: `translate(-50%, -50%) translateZ(${c.z}px) rotate(${c.rot}deg)`,
              filter: c.blur ? `blur(${c.blur}px)` : undefined,
            }}
          >
            <div className="hd-img" style={{ backgroundImage: `url(${c.src})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
