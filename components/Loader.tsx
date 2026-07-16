"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import BrandMark from "@/components/BrandMark";

const BLOCKS = 9;

/**
 * Loading screen em sequência:
 *  1) contador grande 0->100 sobre fundo escuro
 *  2) colunas/retângulos (cor da marca) sobem para cobrir o ecrã
 *  3) as colunas saem em stagger e revelam a página — dispara `orq:loaded`
 *     para a grelha do hero arrancar a sua entrada exatamente na revelação.
 */
export default function Loader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  // O loader é a entrada do hero — só faz sentido na landing (PT em "/", EN em
  // "/en"). Em páginas utilitárias (termos, privacidade, reembolsos) não o
  // mostramos: seria um ecrã de 0->100 desnecessário antes de conteúdo legal.
  const isLanding = pathname === "/" || pathname === "/en";

  useEffect(() => {
    if (!isLanding) return;
    const el = root.current;
    if (!el) return;
    document.body.style.overflow = "hidden";
    const blocks = el.querySelectorAll<HTMLElement>(".lblock");

    const ctx = gsap.context(() => {
      gsap.from(".ld-brand", { y: 16, opacity: 0, duration: 0.7, ease: "power3.out" });
      gsap.from(".ld-counter", { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 1.35,
        ease: "power2.inOut",
        onUpdate() {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(2, "0");
        },
      });
    }, el);

    let exited = false;
    const exit = () => {
      if (exited) return;
      exited = true;
      gsap
        .timeline()
        // o ecrã do contador desvanece
        .to(".ld-stage", { opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
        // 1) colunas sobem para cobrir
        .set(".lblocks", { display: "grid" }, 0)
        .fromTo(
          blocks,
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "bottom center", duration: 0.5, ease: "power3.inOut", stagger: { each: 0.05, from: "start" } },
          0.08,
        )
        // tudo coberto: revelar a página por baixo + arrancar a entrada do hero
        .add(() => {
          el.style.background = "transparent";
          // Flag persistente além do evento: se o HeroGrid ligar o ouvinte tarde
          // (perde o evento), lê esta flag e revela na mesma (sem ficar em branco).
          (window as Window & { __orqLoaded?: boolean }).__orqLoaded = true;
          window.dispatchEvent(new Event("orq:loaded"));
        })
        // 2) colunas saem a revelar (sobem para fora)
        .to(blocks, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.6,
          ease: "power3.inOut",
          stagger: { each: 0.05, from: "start" },
          onComplete: () => {
            document.body.style.overflow = "";
            setDone(true);
          },
        });
    };

    const minTime = new Promise<void>((r) => window.setTimeout(r, 1500));
    // fonts.ready é um nice-to-have (evita revelar a meio do swap da fonte) mas
    // NUNCA pode segurar o site: uma fonte lenta deixava o loader escuro no ecrã
    // até ao failsafe (5,5s). Espera-se pelas fontes NO MÁXIMO até aos 2,3s —
    // a partir daí sai-se na mesma (o next/font já as pré-carrega; em condições
    // normais estão prontas muito antes dos 1,5s mínimos do intro).
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => {}).catch(() => {});
    const fontsCapped = Promise.race([fonts, new Promise<void>((r) => window.setTimeout(r, 2300))]);
    Promise.all([minTime, fontsCapped]).then(exit);
    const failsafe = window.setTimeout(exit, 5500);

    return () => {
      ctx.revert();
      window.clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [isLanding]);

  if (done || !isLanding) return null;

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="ld-stage">
        <div className="ld-brand">
          <BrandMark className="ld-mark" />
          <span>Orquesdra</span>
        </div>
        <div className="ld-counter">
          <span ref={countRef}>00</span>
          <i>%</i>
        </div>
      </div>
      <div className="lblocks">
        {Array.from({ length: BLOCKS }, (_, i) => (
          <span className="lblock" key={i} />
        ))}
      </div>
    </div>
  );
}
