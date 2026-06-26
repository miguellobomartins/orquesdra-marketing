# Orquesdra site — restructure (process-led)

**Date:** 2026-06-18
**Goal:** Rebuild the marketing page so a first-time visitor (a) fully understands the product and (b) is continuously pulled, section by section, toward wanting to buy. Spine = **the process** (how it works).

## Problems with the current page
- The same ~8 generated posts appear in **5 places** (hero grid, "Generation" grid, calendar mock, Gallery, Industries hover) → repetitive, and they overlay each other via sticky panels → looks ridiculous.
- **No section explains the process** (how your photos + brand become a faithful post). The "Generation" feature is weak: bland title ("Posts that actually look like your brand.") and it only *shows* posts instead of explaining the mechanism.
- Bland copy in several headlines.

## New section flow (top → bottom)
1. **Hero** — keep. Output shown once, as backdrop.
2. **Product at a glance** — keep the (now large) app-preview mockup.
3. **The problem** (Statement) — keep, sharpen copy. Agencies / design tools / generic AI.
4. **★ How it works — the process** (NEW centerpiece, `#how`) — 5 connected, numbered steps with motion:
   1. Connect your brand (paste site → logo, colors, fonts).
   2. Add your photos (your products/spaces/people = the subject).
   3. **Generate** — composes finished posts: your photo as hero, your brand as the system. Shows the **input → output** (raw photo → finished on-brand post). The "aha", shown ONCE.
   4. Approve & schedule (calendar + approval).
   5. Publish everywhere (IG/FB/TikTok/X/LinkedIn…).
   Replaces the 4 scattered feature blocks with one coherent story.
5. **It's actually yours** — short differentiation band (not templates / not stock / not generic).
6. **Competitor insights** — the one capability outside the core flow, condensed.
7. **Proof** (merge bigstat + Gallery + quote) — "One photo. A week of posts." + ONE clean wall of real posts + customer quote. Output reappears here, earned, as proof.
8. **Pricing** — keep, sharper headline.
9. **Billing trust** — keep.
10. **FAQ** — keep.
11. **Final CTA + Footer** — keep, sharper.

## Cuts / merges
- Cut standalone **Industries** (hover list) and standalone **Gallery** (horizontal scroll); Gallery folds into the Proof wall.
- Remove the repeated post-grids from old feature blocks. Generated posts now appear in **3 intentional moments**: hero backdrop → process step 3 (input/output) → proof wall.

## Copy direction (examples)
- "Posts that actually look like your brand." → **"Your photo goes in. A finished, on-brand post comes out."**
- "Clear pricing. Clear limits." → **"Priced per brand. Not per credit."**
- Concrete, specific, no filler. EN root (matches hero). No em-dashes in output-style copy.

## Implementation notes
- Rewrite `components/Sections.tsx`; reuse existing mock components (brand-kit card, calendar, comp-rows) inside the process steps.
- Input→output uses existing images (a plain photo paired with the same/related image as a finished post with caption + brand overlay). No new assets generated.
- Reuse existing motion primitives (`.reveal`, `data-anim="lines|clip"`, `data-parallax`) + GSAP already wired in `SmoothScroll`.
- Must work in both **light and dark** themes and stay responsive (verify 375 → 1920).
- No git commit without asking (project rule).
