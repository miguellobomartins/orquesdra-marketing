"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrandMark from "@/components/BrandMark";

/**
 * Loading screen (intro). Escura, wordmark + contador 0->100 + barra roxa.
 * Ao terminar, desliza para cima e revela a pagina; dispara `orq:loaded` para o
 * hero (HeroDepth) comecar a sua entrada exatamente quando e revelado.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.from(".ld-brand", { y: 18, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".ld-meta", { opacity: 0, duration: 0.6, delay: 0.25 });
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 1.55,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.round(counter.v);
          if (countRef.current) countRef.current.textContent = String(v);
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
        },
      });
    }, el);

    let exited = false;
    const exit = () => {
      if (exited) return;
      exited = true;
      // dispara a entrada do hero ao comecar a revelar
      window.dispatchEvent(new Event("orq:loaded"));
      gsap
        .timeline({
          onComplete: () => {
            document.body.style.overflow = "";
            setDone(true);
          },
        })
        .to(".ld-brand, .ld-meta", { y: -26, opacity: 0, duration: 0.5, ease: "power3.in" })
        .to(el, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.18");
    };

    // sair quando: tempo minimo passou E as fontes carregaram
    const minTime = new Promise<void>((r) => window.setTimeout(r, 1750));
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => {}).catch(() => {});
    Promise.all([minTime, fonts]).then(exit);
    // failsafe: nunca deixar o loader preso
    const failsafe = window.setTimeout(exit, 5000);

    return () => {
      ctx.revert();
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="ld-brand">
        <BrandMark className="ld-mark" />
        <span>Orquesdra</span>
      </div>
      <div className="ld-meta">
        <span className="ld-count">
          <span ref={countRef}>0</span>
          <i>%</i>
        </span>
        <span className="ld-tag">a preparar a tua marca</span>
      </div>
      <span className="ld-bar">
        <span ref={barRef} />
      </span>
    </div>
  );
}
