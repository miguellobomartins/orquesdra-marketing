import { POSTS } from "@/lib/posts";
import BrandMark from "@/components/BrandMark";

function Check() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TIERS = [
  { name: "Solo", price: "99", desc: "For the solo brand", feats: ["1 brand", "2 seats", "100 images / month", "Publishing and competitor insights"], featured: false },
  { name: "Studio", price: "299", desc: "For small teams", feats: ["Everything in Solo, plus:", "5 brands", "5 seats", "500 images / month"], featured: true },
  { name: "Agency", price: "899", desc: "For agencies", feats: ["Everything in Studio, plus:", "25 brands", "15 seats", "2,500 images / month"], featured: false },
];

const FAQ = [
  { q: "Will the posts really look like my brand?", a: "Yes. Orquesdra builds each post from your photos, in your colors, your type and your layout, so the output looks made for you, not generic." },
  { q: "Where do the photos come from?", a: "From you. You add your own product, space or people photos and they stay the subject of every post. No stock, no invented imagery." },
  { q: "Which networks can I publish to?", a: "Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest and Threads, through a publishing connection you link to your account." },
  { q: "Do I need design skills?", a: "No. You add a brand and a few photos, Orquesdra builds the posts, and you edit only what you want before approving." },
  { q: "How is this different from Canva or Buffer?", a: "Design tools give you a blank canvas and schedulers just queue posts. Orquesdra generates the post in your brand and carries it all the way to publishing, in one place." },
  { q: "Are my photos and brand mine?", a: "Always. Your photos, your brand and your content stay yours, on every plan, and you can cancel anytime." },
];

const NETWORKS = ["Instagram", "Facebook", "TikTok", "X", "LinkedIn", "YouTube", "Pinterest", "Threads"];

export default function Sections() {
  return (
    <>
      {/* trust */}
      <section className="trust">
        <p className="trust-label reveal">Brands already running on Orquesdra</p>
        <div className="trust-marquee">
          <div className="trust-track">
            {[...POSTS, ...POSTS].map((p, i) => (
              <span className="trust-brand" key={i}>{p.brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — the process (centerpiece) ===== */}
      <section className="wrap" id="how" style={{ scrollMarginTop: 100 }}>
        <div className="measure reveal fade-only" style={{ marginBottom: "clamp(12px, 2vw, 28px)" }}>
          <p className="eyebrow2">How it works</p>
          <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>Your brand in. A month of posts out.</h2>
          <p className="lead">Five steps from your photos to posts that are unmistakably yours, ready to publish.</p>
        </div>

        <div className="features">
          {/* 01 — Brand */}
          <div className="feature">
            <div className="feature-text reveal fade-only">
              <p className="feature-step"><span>01</span><b>Brand</b></p>
              <h3 className="feature-h" data-anim="lines">Paste your site. It learns your brand.</h3>
              <p className="feature-p">Orquesdra reads your website, lifts your logo, pulls your colors straight from it and detects your fonts. One brand profile every post then follows.</p>
              <ul className="feature-list">
                <li><Check />Logo, colors and fonts, detected for you</li>
                <li><Check />No brand guidelines to upload</li>
              </ul>
            </div>
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <div className="mock-input"><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />yourbrand.com</div>
              </div>
              <div className="mock-card">
                <span className="mock-label">Brand kit</span>
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
            <div className="feature-text reveal fade-only">
              <p className="feature-step"><span>02</span><b>Photos</b></p>
              <h3 className="feature-h" data-anim="lines">Add your photos. They stay the star.</h3>
              <p className="feature-p">Drop in your products, your space, your people. Orquesdra builds around your real photos, so every post is genuinely yours, never stock and never an invented model.</p>
              <ul className="feature-list">
                <li><Check />Your products, spaces and people</li>
                <li><Check />No stock, no generic AI imagery</li>
              </ul>
            </div>
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="photos">
                <img src={POSTS[3].src} alt="" loading="lazy" />
                <img src={POSTS[7].src} alt="" loading="lazy" />
                <img src={POSTS[1].src} alt="" loading="lazy" />
              </div>
            </div>
          </div>

          {/* 03 — Generate (the aha: input → output) */}
          <div className="feature">
            <div className="feature-text reveal fade-only">
              <p className="feature-step"><span>03</span><b>Generate</b></p>
              <h3 className="feature-h" data-anim="lines">Your photo goes in. A finished, on-brand post comes out.</h3>
              <p className="feature-p">Your photo becomes the hero and your brand becomes the system: colors, type and editorial layout, composed into a post that is ready to publish, not a template to fill in.</p>
              <ul className="feature-list">
                <li><Check />Editorial layouts, sized for every network</li>
                <li><Check />Ready to edit, never starting from blank</li>
              </ul>
            </div>
            <div className="vpanel accent" data-parallax="5" data-anim="clip">
              <div className="io">
                <div className="io-card io-in">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={POSTS[4].src} alt="Your photo" loading="lazy" />
                  <span className="io-tag">Your photo</span>
                </div>
                <div className="io-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
                <div className="io-card io-out">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={POSTS[4].src} alt="On-brand post generated in Orquesdra" loading="lazy" />
                  <span className="io-cap">{POSTS[4].cap}</span>
                  <span className="io-brand"><i />{POSTS[4].brand}</span>
                  <span className="io-tag accent">On-brand post</span>
                </div>
              </div>
            </div>
          </div>

          {/* 04 — Plan */}
          <div className="feature flip">
            <div className="feature-text reveal fade-only">
              <p className="feature-step"><span>04</span><b>Plan</b></p>
              <h3 className="feature-h" data-anim="lines">Approve once. Fill your month.</h3>
              <p className="feature-p">Lay the month out on a calendar, approve each post, and watch the gaps disappear. Draft, pending, approved, published, all in one view.</p>
              <ul className="feature-list">
                <li><Check />Calendar and approval flow built in</li>
                <li><Check />See the whole month at a glance</li>
              </ul>
            </div>
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <div className="mock-row" style={{ justifyContent: "space-between", marginBottom: 14, display: "flex" }}>
                  <span className="mock-label">June</span>
                  <span className="mock-label" style={{ color: "var(--accent-ink)" }}>12 scheduled</span>
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
                <span className="status"><span className="dot" />Approved and scheduled</span>
              </div>
            </div>
          </div>

          {/* 05 — Publish */}
          <div className="feature">
            <div className="feature-text reveal fade-only">
              <p className="feature-step"><span>05</span><b>Publish</b></p>
              <h3 className="feature-h" data-anim="lines">One approval. Every channel.</h3>
              <p className="feature-p">Approved posts go out to your networks on schedule, so you show up every day without living inside eight different apps.</p>
              <ul className="feature-list">
                <li><Check />Instagram, Facebook, TikTok, X, LinkedIn and more</li>
                <li><Check />Scheduled, then published for you</li>
              </ul>
            </div>
            <div className="vpanel accent" data-parallax="5" data-anim="clip">
              <div className="mock-card">
                <span className="mock-label">Publishing to</span>
                <div className="networks" style={{ marginTop: 14 }}>
                  {NETWORKS.map((n) => (<span className="net-chip" key={n}>{n}</span>))}
                </div>
                <span className="status"><span className="dot" />Live · publishing to 8 networks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* it's actually yours — differentiation band */}
      <section className="section">
        <div className="wrap center">
          <div className="measure center reveal fade-only">
            <p className="eyebrow2">Made for you, literally</p>
            <h2 className="h2" data-anim="lines">If it doesn&rsquo;t look like your brand, it doesn&rsquo;t ship.</h2>
            <p className="lead">Every post is built from your colors, your type and your photos. Not a template you fill in. Not stock. Not a generic model that never saw your brand.</p>
          </div>
        </div>
      </section>

      {/* competitor insights — the one capability outside the core flow */}
      <section className="wrap">
        <div className="features">
          <div className="feature flip">
            <div className="feature-text reveal fade-only">
              <p className="feature-eyebrow">Competitor insights</p>
              <h2 className="feature-h" data-anim="lines">See what they post. Find the gaps.</h2>
              <p className="feature-p">Orquesdra suggests the competitors that matter for your brand and reads their feeds, so you can spot the themes, the cadence and the openings they keep missing.</p>
              <ul className="feature-list">
                <li><Check />Competitors found for your brand</li>
                <li><Check />Themes, cadence and gaps, side by side</li>
              </ul>
            </div>
            <div className="vpanel" data-parallax="6" data-anim="clip">
              <div className="mock-card">
                <span className="mock-label">Posting activity, this week</span>
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

      {/* proof — one photo → a month of posts (merged: bigstat + wall + quote) */}
      <section className="section" id="gallery" style={{ scrollMarginTop: 100 }}>
        <div className="wrap">
          <div className="measure center reveal fade-only" style={{ marginInline: "auto" }}>
            <p className="eyebrow2">The result</p>
            <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>One photo. A week of posts.</h2>
            <p className="lead">Real posts generated in Orquesdra, each one carrying its own brand.</p>
          </div>
          <div className="ggrid reveal" style={{ marginTop: "clamp(28px, 4vw, 52px)" }}>
            {POSTS.map((p, i) => (
              <div className="pcard" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.cap} loading="lazy" />
                <div className="cap">{p.cap}</div>
                <div className="brand"><i />{p.brand}</div>
              </div>
            ))}
          </div>
          <div className="quote center reveal" style={{ marginTop: "clamp(40px, 6vw, 72px)" }}>
            <p>&ldquo;We went from posting once a week to every day, and it still looks like us.&rdquo;</p>
            <p className="who">Ana Reis, owner · Atlas Brand</p>
          </div>
        </div>
      </section>

      {/* pricing */}
      <section className="section" id="pricing" style={{ scrollMarginTop: 100 }}>
        <div className="wrap center">
          <div className="measure center reveal fade-only">
            <p className="eyebrow2">Pricing</p>
            <h2 className="h2" data-anim="lines" style={{ marginTop: 14 }}>Priced per brand. Not per credit.</h2>
            <p className="lead">Three plans with limits you can read at a glance. Every plan starts with 10 free generations, no time limit.</p>
          </div>
          <div className="tiers" style={{ textAlign: "left" }}>
            {TIERS.map((t) => (
              <div className={`tier reveal${t.featured ? " featured" : ""}`} key={t.name}>
                {t.featured && <span className="badge">Most popular</span>}
                <span className="tname">{t.name}</span>
                <div className="price">{t.price} EUR<span> / month</span></div>
                <p className="desc">{t.desc}</p>
                <ul>
                  {t.feats.map((f, k) => (<li key={k}><Check />{f}</li>))}
                </ul>
                <div className="cta-row">
                  {t.featured ? (
                    <a className="po-btn-primary po-btn-lg magnetic" style={{ display: "block", textAlign: "center" }} href="https://app.orquesdra.com">Start with {t.name}</a>
                  ) : (
                    <a className="tier-btn" href="https://app.orquesdra.com">Start with {t.name}</a>
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
            <h2 className="h2" data-anim="lines" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>No credits. No surprises.</h2>
            <p className="lead" style={{ maxWidth: 540, margin: "14px auto 0" }}>Clear monthly limits you can read at a glance. Your brand and your content stay yours, and you can cancel anytime.</p>
            <div className="billing-points">
              <span><Check /> No credits</span>
              <span><Check /> You own everything</span>
              <span><Check /> Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="measure center reveal fade-only">
            <h2 className="h2" data-anim="lines">Questions, answered before you buy.</h2>
          </div>
          <div className="faq reveal">
            {FAQ.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}<span className="plus" aria-hidden="true">+</span></summary>
                <p className="ans">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final cta */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="finalcta reveal fade-only">
            <h2 data-anim="lines">Show up every day, looking exactly like you.</h2>
            <div className="po-ctas">
              <a className="po-btn-primary po-btn-lg magnetic" href="https://app.orquesdra.com">Get started</a>
              <a className="po-btn-ghost" href="#pricing">See plans</a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="fbrand"><BrandMark className="po-mark" />Orquesdra</div>
              <p className="ftag">Turn your photos into on-brand posts, from generating to publishing.</p>
            </div>
            <div>
              <h4>Product</h4>
              <a href="#how">How it works</a>
              <a href="#gallery">Examples</a>
              <a href="#pricing">Pricing</a>
              <a href="https://app.orquesdra.com">Get started</a>
            </div>
            <div>
              <h4>Compare</h4>
              <a href="#">vs Canva</a>
              <a href="#">vs Buffer</a>
              <a href="#">vs Later</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Orquesdra</span>
            <span>Made for brands everywhere · EN / PT</span>
          </div>
        </div>
      </footer>
    </>
  );
}
