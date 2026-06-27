"use client";

import { useState } from "react";
import { POSTS } from "@/lib/posts";
import DesignMotion from "@/components/DesignMotion";
import BrandMark from "@/components/BrandMark";
import { useT } from "@/components/LangProvider";
import type { Feature, Qa } from "@/lib/i18n";

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeatureText({ f, i }: { f: Feature; i: number }) {
  return (
    <div className="feature-text reveal fade-only">
      <p className="feature-step"><span>{String(i + 1).padStart(2, "0")}</span><b>{f.step}</b></p>
      <h3 className="feature-h" data-anim="lines">{f.h}</h3>
      <p className="feature-p">{f.p}</p>
      <ul className="feature-list">
        {f.list.map((item, k) => (<li key={k}><Check />{item}</li>))}
      </ul>
    </div>
  );
}

function Faq({ items }: { items: Qa[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq reveal">
      {items.map((f, i) => (
        <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
          <button className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <span className="faq-ic" aria-hidden="true" />
          </button>
          <div className="faq-a-wrap">
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const NETWORKS = ["Instagram", "Facebook", "TikTok", "X", "LinkedIn", "YouTube", "Pinterest", "Threads"];

export default function Sections() {
  const t = useT();
  const F = t.how.features;
  return (
    <>
      {/* ===== HOW IT WORKS — the process (centerpiece) ===== */}
      <section className="wrap" id="how" style={{ scrollMarginTop: 100 }}>
        <div className="measure reveal fade-only" style={{ marginBottom: "clamp(12px, 2vw, 28px)" }}>
          <p className="eyebrow2">{t.how.eyebrow}</p>
          <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>{t.how.h2}</h2>
          <p className="lead">{t.how.lead}</p>
        </div>

        <div className="features">
          {/* 01 — Brand */}
          <div className="feature">
            <FeatureText f={F[0]} i={0} />
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <div className="mock-input"><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />yourbrand.com</div>
              </div>
              <div className="mock-card">
                <span className="mock-label">{t.mock.brandKit}</span>
                <div className="mock-row" style={{ marginTop: 14, gap: 12, display: "flex", alignItems: "center" }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ink)", display: "grid", placeItems: "center", color: "var(--bg)", fontWeight: 800, fontSize: 18 }}>A</span>
                  <div className="swatches" style={{ marginTop: 0 }}>
                    <span style={{ background: "#5b5bd6" }} />
                    <span style={{ background: "#1f2024" }} />
                    <span style={{ background: "#e7ded4" }} />
                    <span style={{ background: "#9c8d76" }} />
                  </div>
                </div>
                <div className="mock-input" style={{ marginTop: 14, justifyContent: "space-between" }}><span>Hanken Grotesk</span><span style={{ color: "var(--accent-ink)", fontWeight: 700 }}>Aa</span></div>
              </div>
            </div>
          </div>

          {/* 02 — Photos */}
          <div className="feature flip">
            <FeatureText f={F[1]} i={1} />
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="photos">
                <img src={POSTS[3].src} alt="" loading="lazy" />
                <img src={POSTS[7].src} alt="" loading="lazy" />
                <img src={POSTS[1].src} alt="" loading="lazy" />
              </div>
            </div>
          </div>

          {/* 03 — Generate */}
          <div className="feature">
            <FeatureText f={F[2]} i={2} />
            <div className="vpanel accent" data-parallax="5" data-anim="clip">
              <div className="io-solo">
                <div className="io-card io-solo-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={POSTS[5].src} alt={`${POSTS[5].brand} — ${POSTS[5].cap}`} loading="lazy" />
                  <span className="io-tag accent">{t.mock.onBrandPost}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 04 — Plan */}
          <div className="feature flip">
            <FeatureText f={F[3]} i={3} />
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <div className="mock-row" style={{ justifyContent: "space-between", marginBottom: 14, display: "flex" }}>
                  <span className="mock-label">{t.mock.month}</span>
                  <span className="mock-label" style={{ color: "var(--accent-ink)" }}>{t.mock.scheduled}</span>
                </div>
                <div className="cal">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const imgs: Record<number, string> = { 2: POSTS[1].src, 5: POSTS[6].src, 6: POSTS[3].src, 9: POSTS[7].src, 11: POSTS[5].src };
                    return (
                      <div className={`day${imgs[i] ? " has" : ""}`} key={i}>
                        {imgs[i] ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={imgs[i]} alt="" loading="lazy" />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <span className="status"><span className="dot" />{t.mock.approvedScheduled}</span>
              </div>
            </div>
          </div>

          {/* 05 — Publish */}
          <div className="feature">
            <FeatureText f={F[4]} i={4} />
            <div className="vpanel accent" data-parallax="5" data-anim="clip">
              <div className="mock-card">
                <span className="mock-label">{t.mock.publishingTo}</span>
                <div className="networks" style={{ marginTop: 14 }}>
                  {NETWORKS.map((n) => (<span className="net-chip" key={n}>{n}</span>))}
                </div>
                <span className="status"><span className="dot" />{t.mock.livePublishing}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* it's actually yours — differentiation band (marquee cinético) */}
      <section className="section diff-band">
        <div className="wrap center">
          <p className="eyebrow2 reveal fade-only" style={{ textAlign: "center" }}>{t.diff.eyebrow}</p>
        </div>
        <div className="kmarquee" aria-hidden="true">
          <div className="kmarquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span className={i % 2 ? "ko" : undefined} key={i}>
                {t.diff.h2}
                <i className="kdot">✦</i>
              </span>
            ))}
          </div>
        </div>
        <h2 className="sr-only">{t.diff.h2}</h2>
        <div className="wrap center">
          <p className="lead measure center reveal fade-only" style={{ marginInline: "auto" }}>{t.diff.lead}</p>
        </div>
      </section>

      {/* competitor insights */}
      <section className="wrap">
        <div className="features">
          <div className="feature flip">
            <div className="feature-text reveal fade-only">
              <p className="feature-eyebrow">{t.competitor.eyebrow}</p>
              <h2 className="feature-h" data-anim="lines">{t.competitor.h2}</h2>
              <p className="feature-p">{t.competitor.p}</p>
              <ul className="feature-list">
                {t.competitor.list.map((item, k) => (<li key={k}><Check />{item}</li>))}
              </ul>
            </div>
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <span className="mock-label">{t.competitor.mockLabel}</span>
                <div style={{ marginTop: 10 }}>
                  {[["NV", "Norvelle", 86], ["KA", "Kaffe & Co", 64], ["LM", "Lumen", 48], ["BR", "Brava", 33]].map(([ini, name, val], i) => (
                    <div className="comp-row" key={i}>
                      <span className="comp-av">{ini as string}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, width: 96 }}>{name}</span>
                      <span className="comp-bar"><i style={{ width: `${val}%` }} /></span>
                      <span className="comp-n" data-count={val as number}>{val as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* proof — gallery */}
      <section className="section" id="gallery" style={{ scrollMarginTop: 100, paddingTop: 0 }}>
        <div className="wrap">
          <DesignMotion />
          <div className="quote center reveal" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
            <p>&ldquo;{t.gallery.quote}&rdquo;</p>
            <p className="who">{t.gallery.author}</p>
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="section" id="pricing" style={{ scrollMarginTop: 100 }}>
        <div className="wrap center">
          <div className="measure center reveal fade-only">
            <p className="eyebrow2">{t.pricing.eyebrow}</p>
            <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>{t.pricing.h2}</h2>
            <p className="lead">{t.pricing.lead}</p>
          </div>
          <div className="tiers" style={{ textAlign: "left" }}>
            {t.pricing.tiers.map((tier) => (
              <div className={`tier reveal${tier.featured ? " featured" : ""}`} key={tier.name}>
                {tier.featured && <span className="badge">{t.pricing.mostPopular}</span>}
                <span className="tname">{tier.name}</span>
                <div className="price">{tier.price} EUR<span> {t.pricing.perMonth}</span></div>
                <p className="desc">{tier.desc}</p>
                <ul>
                  {tier.feats.map((f, k) => (<li key={k}><Check />{f}</li>))}
                </ul>
                <div className="cta-row">
                  {tier.featured ? (
                    <a className="po-btn-primary po-btn-lg magnetic" style={{ display: "block", textAlign: "center" }} href="https://app.orquesdra.com">{t.pricing.startWith} {tier.name}</a>
                  ) : (
                    <a className="tier-btn" href="https://app.orquesdra.com">{t.pricing.startWith} {tier.name}</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* billing trust */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="billing reveal fade-only">
            <h2 className="h2" data-anim="lines" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>{t.billing.h2}</h2>
            <p className="lead" style={{ maxWidth: 540, margin: "14px auto 0" }}>{t.billing.lead}</p>
            <div className="billing-points">
              {t.billing.points.map((p, i) => (<span key={i}><Check /> {p}</span>))}
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="measure center reveal fade-only">
            <h2 className="h2" data-anim="lines">{t.faq.h2}</h2>
          </div>
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* footer (com CTA grande integrado, estilo TRIONN) */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-cta reveal fade-only">
            <h2 data-anim="lines">{t.finalCta.h2}</h2>
            <div className="po-ctas">
              <a className="po-btn-primary po-btn-lg magnetic" href="https://app.orquesdra.com">{t.finalCta.ctaPrimary}</a>
              <a className="po-btn-ghost" href="#pricing">{t.finalCta.ctaSecondary}</a>
            </div>
          </div>
          <div className="footer-grid">
            <div>
              <div className="fbrand"><BrandMark className="po-mark" />Orquesdra</div>
              <p className="ftag">{t.footer.tagline}</p>
            </div>
            {t.footer.cols.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map((l) => (<a key={l.label} href={l.href}>{l.label}</a>))}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>{t.footer.copyright}</span>
            <div className="footer-legal">
              {t.footer.legal.map((l) => (<a key={l.label} href={l.href}>{l.label}</a>))}
            </div>
            <span>{t.footer.madeFor}</span>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">Orquesdra</div>
      </footer>
    </>
  );
}
