"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;

    // reveal-on-scroll via IntersectionObserver (robusto, com stagger por entrada)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const sibs = Array.from(el.parentElement?.children || []).filter((c) => c.classList.contains("reveal"));
            const i = sibs.indexOf(el);
            el.style.transitionDelay = `${Math.min(i, 6) * 0.08}s`;
            el.classList.add("in");
            io.unobserve(el);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // count-up para números [data-count]
    const cio = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const end = parseFloat(el.dataset.count || "0");
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1000);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toString();
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        }),
      { threshold: 0.6 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

    // Lenis smooth scroll, ligado ao ScrollTrigger (parallax)
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true });
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Conteúdo de altura variável (galeria masonry + imagens lazy) cresce DEPOIS de
    // o Lenis fixar o limite de scroll. Sem isto, o scroll trancava antes do fim da
    // página. Observamos a altura e refrescamos Lenis + ScrollTrigger quando muda.
    let resizeRaf = 0;
    const refreshAll = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(refreshAll);
    });
    ro.observe(document.body);
    // o wordmark gigante muda de altura quando a fonte carrega; e há imagens lazy.
    // Garantir o limite final exato em fonts.ready, no load e num refresh tardio.
    document.fonts?.ready?.then(refreshAll).catch(() => {});
    window.addEventListener("load", refreshAll);
    const lateRefresh = window.setTimeout(refreshAll, 1200);

    // Header: expandido (lado a lado) no topo e ao subir; compacto ao descer.
    const nav = document.getElementById("nav");
    let lastY = 0;
    // header sobe (sai da posição descida da hero) assim que se começa a deslizar
    const setRaised = (s: number) => nav?.classList.toggle("raised", s > 40);
    setRaised(typeof window !== "undefined" ? window.scrollY : 0);
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const goingDown = scroll > lastY + 1;
      const goingUp = scroll < lastY - 1;
      if (scroll < 60 || goingUp) nav?.classList.remove("compact");
      else if (goingDown && scroll > 100) nav?.classList.add("compact");
      setRaised(scroll);
      lastY = scroll;
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "12");
        gsap.fromTo(
          el,
          { yPercent: amt },
          { yPercent: -amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // fundo (hero) desfoca + escurece enquanto a demo sobe
      const heroEl = document.querySelector(".hero");
      const appPanel = document.querySelector(".panel.app");
      if (heroEl && appPanel) {
        gsap.fromTo(
          heroEl,
          { "--hb": 0, opacity: 1 },
          { "--hb": 9, opacity: 0.78, ease: "none", scrollTrigger: { trigger: appPanel, start: "top bottom", end: "top top", scrub: true } }
        );
      }

      // mockup (container scroll): entra inclinado para trás e endireita ao subir — sempre nítido (sem blur)
      const appFrame = appPanel?.querySelector<HTMLElement>(".appframe");
      if (appPanel && appFrame) {
        gsap.fromTo(
          appFrame,
          { rotateX: 18, scale: 1.04 },
          { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: appPanel, start: "top bottom", end: "top 18%", scrub: true } }
        );
      }

      // títulos revelados linha-a-linha (máscara slide-up), responsivo via autoSplit
      gsap.utils.toArray<HTMLElement>('[data-anim="lines"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "split-line",
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            });
          },
        });
      });

      // clip-reveal (wipe de baixo p/ cima) + leve zoom da imagem interior
      gsap.utils.toArray<HTMLElement>('[data-anim="clip"]').forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
        const img = el.querySelector("img");
        if (img) {
          gsap.from(img, {
            scale: 1.16,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
        }
      });

      // acento scramble (uma palavra/linha decodifica ao entrar)
      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((el) => {
        const text = el.textContent || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 84%",
          once: true,
          onEnter: () =>
            gsap.to(el, { duration: 1.1, ease: "none", scrambleText: { text, chars: "upperCase", speed: 0.5 } }),
        });
      });
    });

    const magnetCleanups: Array<() => void> = [];
    if (fine) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.4);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
        };
        const reset = () => { xTo(0); yTo(0); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        magnetCleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); });
      });
    }

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("load", refreshAll);
      window.clearTimeout(lateRefresh);
      ctx.revert();
      gsap.ticker.remove(ticker);
      magnetCleanups.forEach((fn) => fn());
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
