"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

const COLS = 5;
const PER_COL = 5;

// cada coluna começa noutro offset; imagens cicladas com desfasamento por coluna
function colImages(col: number) {
  return Array.from({ length: PER_COL }, (_, r) => POSTS[(col * 2 + r * 3) % POSTS.length].src);
}

export default function HeroReveal() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(".rgrid", { scale: 1.06 });
      const tl = gsap.timeline();
      tl.to(".rcol", { top: 0, duration: 1.1, ease: "power4.inOut" })
        .to(".c1 .ritem", { top: 0, stagger: 0.08, duration: 1.1, ease: "power4.inOut" }, "-=0.7")
        .to(".c2 .ritem", { top: 0, stagger: -0.08, duration: 1.1, ease: "power4.inOut" }, "-=1.1")
        .to(".c3 .ritem", { top: 0, stagger: 0.08, duration: 1.1, ease: "power4.inOut" }, "-=1.1")
        .to(".c4 .ritem", { top: 0, stagger: -0.08, duration: 1.1, ease: "power4.inOut" }, "-=1.1")
        .to(".c5 .ritem", { top: 0, stagger: 0.08, duration: 1.1, ease: "power4.inOut" }, "-=1.1")
        .to(".rgrid", { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="rgridscene" ref={elRef} aria-hidden="true">
        <div className="rgrid">
          {Array.from({ length: COLS }, (_, c) => (
            <div className={`rcol c${c + 1}`} key={c}>
              {colImages(c).map((src, r) => (
                <div className="ritem" key={r}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="eager" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scrim" aria-hidden="true" />
    </>
  );
}
