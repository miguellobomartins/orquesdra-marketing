"use client";

import { useEffect, useRef } from "react";

/**
 * Mockup do computador: painel fixo com a HERO DESFOCADA por trás (não fundo
 * branco). À medida que o painel "O Problema" sobe (slide-up) por cima, o
 * dispositivo ENCOLHE e SOBE ao mesmo tempo — não fica cortado de forma esquisita.
 * Sem base/teclado, com as bolinhas da janela.
 */
export default function AppPreview() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const statement = document.querySelector<HTMLElement>(".statement-panel");
    let raf = 0;
    let cs = 1.3;
    let cy = 0;

    const tick = () => {
      const vh = window.innerHeight;
      // t: 1 = Problema ainda em baixo (mac grande) -> 0 = Problema a cobrir (mac pequeno)
      let t = 1;
      if (statement) {
        const top = statement.getBoundingClientRect().top;
        t = Math.min(1, Math.max(0, top / vh));
      }
      const ts = 0.8 + t * (1.3 - 0.8); // escala 1.3 -> 0.8
      const ty = (1 - t) * -0.07 * vh; // sobe enquanto encolhe
      cs += (ts - cs) * 0.14;
      cy += (ty - cy) * 0.14;
      el.style.transform = `translateY(${cy.toFixed(1)}px) scale(${cs.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="panel app">
      <div className="app-panel-inner">
        <div className="appframe" ref={frame}>
          <div className="mac">
            <div className="mac-screen">
              <div className="mac-inner">
                <div className="mac-chrome">
                  <span className="mac-dot r" />
                  <span className="mac-dot y" />
                  <span className="mac-dot g" />
                  <span className="mac-url">app.orquesdra.com</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-home.webp" alt="A app Orquesdra: a tua marca, geração de posts e calendário num só sítio" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
