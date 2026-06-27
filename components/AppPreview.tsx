"use client";

import { useEffect, useRef } from "react";

/**
 * Mockup do computador (estilo bridge.surf): SEM base/teclado. Secção própria de
 * scroll-scrub — o conteúdo (print real) começa a ENCHER o ecrã e, ao fazer scroll,
 * dá ZOOM-OUT até se ver o dispositivo INTEIRO (ocupa só parte do ecrã). Fica inteiro
 * no fim. (Não tem base; não fica estático a meio.)
 */
export default function AppPreview() {
  const sec = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sec.current;
    const el = frame.current;
    if (!s || !el) return;
    let raf = 0;
    let cur = 1.75;

    const tick = () => {
      const vh = window.innerHeight;
      const total = s.offsetHeight - vh;
      const top = s.getBoundingClientRect().top;
      const p = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0;
      // 0 -> 0.6: enche (1.75) -> inteiro (0.84); depois fica inteiro
      const target = p < 0.6 ? 1.75 + (p / 0.6) * (0.84 - 1.75) : 0.84;
      cur += (target - cur) * 0.16; // suavização
      el.style.transform = `scale(${cur.toFixed(3)})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="app-sec" ref={sec}>
      <div className="app-stage">
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
