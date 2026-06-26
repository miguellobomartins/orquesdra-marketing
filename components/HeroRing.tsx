"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { POSTS } from "@/lib/posts";

// 10 cartões a partir dos posts (ciclados) para um anel cheio
const CARDS = Array.from({ length: 10 }, (_, i) => POSTS[i % POSTS.length]);

export default function HeroRing() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneEl = scene.current;
    if (!sceneEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        { isDesktop: "(min-width: 880px)", isMobile: "(max-width: 879px)" },
        (self) => {
          const isDesktop = !!self.conditions?.isDesktop;
          const cards = gsap.utils.toArray<HTMLElement>(".ring-card");
          const count = cards.length;
          const slice = (2 * Math.PI) / count;
          const imgEl = sceneEl.querySelector<HTMLElement>(".ring-card__img");
          const h = imgEl?.clientHeight || 130;
          // raio do anel — grande o suficiente para emoldurar o título centrado
          const R = isDesktop
            ? Math.min(420, Math.max(330, window.innerWidth * 0.3))
            : 168;

          gsap.set(cards, { xPercent: -50, yPercent: -50 });

          const tl = gsap.timeline();
          tl
            // entrada: sobem de baixo, em pilha, com rotateX e escala
            .from(cards, {
              y: window.innerHeight / 2 + h * 1.5,
              rotateX: -180,
              scale: 2.6,
              opacity: 0.5,
              stagger: 0.08,
              duration: 0.55,
              ease: "power2.out",
            })
            // expandem para as posições do anel + rotação tangente
            .to(
              cards,
              {
                x: (i) => Math.round(R * Math.cos(slice * i - Math.PI / 2)),
                y: (i) => Math.round(R * Math.sin(slice * i - Math.PI / 2)),
                rotation: (i) => (i * 360) / count,
                duration: 1,
                ease: "power3.out",
              },
              ">-0.15"
            )
            // o grupo gira continuamente
            .to(
              ".ring-group",
              { rotation: 360, duration: 28, repeat: -1, ease: "none" },
              "<+=0.2"
            );

          return () => {
            tl.kill();
          };
        }
      );
    }, sceneEl);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene" ref={scene} aria-hidden="true">
      <div className="ring-group">
        {CARDS.map((p, i) => (
          <div className="ring-card" key={i}>
            <div className="ring-card__img" style={{ backgroundImage: `url(${p.src})` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
