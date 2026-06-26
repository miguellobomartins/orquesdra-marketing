"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ITEMS = [
  { name: "Restaurants", img: "/images/food1.webp" },
  { name: "Coffee shops", img: "/images/coffee.webp" },
  { name: "Skincare & beauty", img: "/images/skincare.webp" },
  { name: "Fashion", img: "/images/fashion.webp" },
  { name: "Retail & home", img: "/images/rack.webp" },
  { name: "Hotels & hospitality", img: "/images/hotel.webp" },
  { name: "Wellness & fitness", img: "/images/wellness.webp" },
];

const FIG_W = 260;
const FIG_H = 330;

export default function Industries() {
  const wrap = useRef<HTMLDivElement>(null);
  const fig = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const wrapEl = wrap.current;
    const figEl = fig.current;
    if (!wrapEl || !figEl) return;

    const xTo = gsap.quickTo(figEl, "x", { duration: 0.55, ease: "power3" });
    const yTo = gsap.quickTo(figEl, "y", { duration: 0.55, ease: "power3" });

    const move = (e: PointerEvent) => {
      const r = wrapEl.getBoundingClientRect();
      xTo(e.clientX - r.left - FIG_W / 2);
      yTo(e.clientY - r.top - FIG_H / 2);
    };
    const show = () => gsap.to(figEl, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    const hide = () => gsap.to(figEl, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power3.out" });

    wrapEl.addEventListener("pointermove", move);
    wrapEl.addEventListener("pointerenter", show);
    wrapEl.addEventListener("pointerleave", hide);

    const rows = Array.from(wrapEl.querySelectorAll<HTMLElement>(".ind-row"));
    const cleanups = rows.map((row) => {
      const onEnter = () => {
        if (img.current) img.current.src = row.dataset.img || "";
      };
      row.addEventListener("pointerenter", onEnter);
      return () => row.removeEventListener("pointerenter", onEnter);
    });

    return () => {
      wrapEl.removeEventListener("pointermove", move);
      wrapEl.removeEventListener("pointerenter", show);
      wrapEl.removeEventListener("pointerleave", hide);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="section industries">
      <div className="wrap">
        <div className="measure reveal fade-only" style={{ marginBottom: 4 }}>
          <p className="eyebrow2">Made for your industry</p>
          <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>
            Built for every kind of brand.
          </h2>
        </div>

        <div className="ind-wrap" ref={wrap}>
          <ul className="ind-list">
            {ITEMS.map((it, i) => (
              <li className="ind-row" key={it.name} data-img={it.img}>
                <span className="ind-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="ind-name">{it.name}</span>
                <span className="ind-arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
          <div className="ind-cursor" ref={fig} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={img} src={ITEMS[0].img} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
