"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";

/**
 * Palco de entrada (estilo bridge.surf), tudo NO MESMO SÍTIO (sem slides):
 *  - Fase A (crossfade): a HERO desvanece e o mockup da app APARECE por cima,
 *    sem mexer de sítio. O mockup começa em ZOOM (ecrã a encher a tela).
 *  - Fase B (zoom-out): com o scroll, tira o zoom até ao dispositivo inteiro.
 *  - Fase C (defocus): o mockup vai para fora de foco enquanto a página
 *    seguinte ("O Problema") faz slide-up por cima (esta é puxada por CSS).
 * Conduzido por rAF a partir do progresso de scroll da secção fixada.
 */
export default function IntroStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const appLayer = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const hl = heroLayer.current;
    const al = appLayer.current;
    const fr = frame.current;
    if (!w || !hl || !al || !fr) return;

    const mobile = window.matchMedia("(max-width: 760px)").matches;
    if (mobile) {
      // no telemóvel não fixamos nada: hero e mockup ficam empilhados, visíveis
      hl.style.opacity = "1";
      al.style.opacity = "1";
      fr.style.transform = "scale(1)";
      return;
    }

    const img = fr.querySelector("img");
    let raf = 0;
    let cs = 1.3;
    const tick = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const total = w.offsetHeight - vh;
      const top = w.getBoundingClientRect().top;
      const p = total > 0 ? Math.min(1, Math.max(0, -top / total)) : 0;

      // zoom MÁXIMO = o ecrã da app preenche a tela PERFEITAMENTE (cobre, sem
      // ficar muito maior que a tela). Calculado a partir do tamanho real da print.
      let fill = 1.35;
      if (img && img.offsetWidth) fill = Math.max(vw / img.offsetWidth, vh / img.offsetHeight);

      // A crossfade LENTO [0,0.34] | B zoom-out [0.37,0.6] | C defocus [0.62,1]
      const fade = Math.min(1, p / 0.34);
      hl.style.opacity = (1 - fade).toFixed(3);
      hl.style.filter = fade > 0.02 ? `blur(${(fade * 7).toFixed(1)}px)` : "none";
      al.style.opacity = fade.toFixed(3);

      let target = fill;
      if (p >= 0.37 && p < 0.6) target = fill + ((p - 0.37) / 0.23) * (0.8 - fill);
      else if (p >= 0.6) target = 0.8;
      cs += (target - cs) * 0.16;

      const blur = p > 0.62 ? ((p - 0.62) / 0.38) * 9 : 0;
      fr.style.transform = `scale(${cs.toFixed(3)})`;
      fr.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : "none";

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="intro" ref={wrap}>
      <div className="intro-pin">
        <div className="intro-hero" ref={heroLayer}>
          <Hero />
        </div>
        <div className="intro-app" ref={appLayer}>
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
      </div>
    </section>
  );
}
