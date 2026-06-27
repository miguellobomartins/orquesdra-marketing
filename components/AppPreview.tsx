"use client";

import { useEffect, useRef } from "react";

/**
 * Mockup do computador (estilo bridge.surf): painel fixo com a HERO DESFOCADA por
 * trás. Começa com o ecrã da app a ENCHER a tela (zoom), depois TIRA o zoom até ao
 * dispositivo inteiro (mais pequeno, por baixo do header) e fica FIXO enquanto o
 * painel "O Problema" faz slide-up por cima. Sem base/teclado, com as bolinhas.
 * O nome/email reais da print são cobertos com texto fictício (mesma fonte).
 */
export default function AppPreview() {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const statement = document.querySelector<HTMLElement>(".statement-panel");
    let raf = 0;
    let cs = 1.75;

    const tick = () => {
      const vh = window.innerHeight;
      // t: 1 = Problema ainda em baixo -> 0 = Problema a cobrir
      let t = 1;
      if (statement) {
        const top = statement.getBoundingClientRect().top;
        t = Math.min(1, Math.max(0, top / vh));
      }
      // fase 1 (t 1->0.5): ENCHE o ecrã (1.75) -> dispositivo inteiro (0.8)
      // fase 2 (t 0.5->0): fixo a 0.8 enquanto o "Problema" sobe por cima
      const target = t > 0.5 ? 0.8 + ((t - 0.5) / 0.5) * (1.75 - 0.8) : 0.8;
      cs += (target - cs) * 0.14;
      el.style.transform = `scale(${cs.toFixed(3)})`;
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
                <div className="mac-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/app-home.webp" alt="A app Orquesdra: a tua marca, geração de posts e calendário num só sítio" />
                  <div className="mac-mask greet">Olá de novo, Sofia Ramos</div>
                  <div className="mac-mask avatar">S</div>
                  <div className="mac-mask acct">
                    <span className="acct-name">Sofia Ramos</span>
                    <span className="acct-mail">sofia@velto.pt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
