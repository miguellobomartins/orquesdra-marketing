"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POSTS } from "@/lib/posts";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 880px)", () => {
      const trackEl = track.current;
      const secEl = sec.current;
      if (!trackEl || !secEl) return;
      const dist = () => Math.max(0, trackEl.scrollWidth - window.innerWidth + 48);
      const tween = gsap.to(trackEl, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: secEl,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="hgal" id="gallery" ref={sec} style={{ scrollMarginTop: 100 }}>
      <div className="hgal-track" ref={track}>
        <div className="hgal-intro">
          <p className="eyebrow2">Real output</p>
          <h2 className="hgal-h" data-anim="lines">
            Generated from a brand and a few photos.
          </h2>
          <p className="hgal-sub">Scroll across. Every post built from a brand profile and a handful of images.</p>
        </div>

        {[...POSTS, ...POSTS.slice(0, 4)].map((p, i) => (
          <article className="hcard" key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.cap} loading="lazy" />
            <span className="hcard-cap">{p.cap}</span>
            <span className="hcard-brand">
              <i />
              {p.brand}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
