"use client";

import { useEffect, useRef, useState } from "react";
import { POSTS } from "@/lib/posts";

type Mode = "fisheye" | "arcs" | "scurve";
const MODES: Mode[] = ["fisheye", "arcs", "scurve"];

/* ===================== ARCS = fita de filme em U ===================== */

const ARC_AR = "3 / 4"; // molduras todas iguais
const ARC_VGAP = 64; // espaço vertical entre molduras (ao longo da fita)
const ARC_ROWGAP = 14; // espaço entre as 2 filas de cada lado
const ARC_SPEED = 52; // px/s ao longo da fita (loop contínuo)

function arcCardW(W: number) {
  return Math.round(Math.min(150, Math.max(116, W * 0.096)));
}

type UPoint = { x: number; y: number; u: number; len: number };
type ULayout = { pts: UPoint[]; total: number; armLen: number; spread: number; range: number };

function computeU(W: number, H: number): ULayout {
  const cx = W / 2;
  const spread = 0.48 * W; // abertura do U no topo (curva maior)
  const yTop = -0.22 * H; // molduras saem por cima
  const yBottom = 1.26 * H; // vértice do U escondido por baixo do hero
  const range = yBottom - yTop;
  const SAMPLES = 400;
  const pts: UPoint[] = [];
  let len = 0;
  let prev: UPoint | null = null;
  for (let i = 0; i <= SAMPLES; i++) {
    const u = -1 + (2 * i) / SAMPLES;
    const x = cx + u * spread;
    const y = yTop + (1 - u * u) * range;
    if (prev) len += Math.hypot(x - prev.x, y - prev.y);
    const p = { x, y, u, len };
    pts.push(p);
    prev = p;
  }
  return { pts, total: len, armLen: len / 2, spread, range };
}

function atLen(L: ULayout, target: number): UPoint {
  const pts = L.pts;
  const t = Math.min(L.total, Math.max(0, target));
  let lo = 0;
  let hi = pts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].len < t) lo = mid + 1;
    else hi = mid;
  }
  const b = pts[lo];
  const a = pts[lo > 0 ? lo - 1 : 0];
  const seg = b.len - a.len || 1;
  const f = (t - a.len) / seg;
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, u: a.u + (b.u - a.u) * f, len: t };
}

// foto sempre ao direito, só inclina a acompanhar a curva
function arcRotation(u: number, spread: number, range: number) {
  const a = (Math.atan2(spread, 2 * Math.abs(u) * range) * 180) / Math.PI; // ~90º no vértice → ~15º no topo
  return (u >= 0 ? 1 : -1) * a;
}

function arcPerArm(W: number, H: number) {
  const L = computeU(W, H);
  const w = arcCardW(W);
  const [aw, ah] = ARC_AR.split("/").map((n) => Number(n.trim()));
  const ch = w * (ah / aw);
  const spacing = ch + ARC_VGAP;
  return Math.max(3, Math.ceil(L.armLen / spacing) + 2);
}

/* ===================== modos secundários (fallback) ===================== */

const LANES: Record<"fisheye" | "scurve", number[]> = {
  fisheye: [0.08, 0.21, 0.34, 0.5, 0.66, 0.79, 0.92],
  scurve: [0.08, 0.2, 0.33, 0.67, 0.8, 0.92],
};
const PER_LANE = 4;
const LANE_AR = ["3 / 4", "4 / 5", "1 / 1", "5 / 7", "2 / 3"];

type Card = {
  kind: "arc" | "lane";
  side: number;
  row: number;
  laneX: number;
  phase: number;
  speed: number;
  w: number;
  hw: number;
  ar: string;
  src: string;
  cap: string;
  brand: string;
};

function buildCards(mode: Mode, W: number, H: number): Card[] {
  const out: Card[] = [];
  if (mode === "arcs") {
    const w = arcCardW(W);
    const [aw, ah] = ARC_AR.split("/").map((n) => Number(n.trim()));
    const perArm = arcPerArm(W, H);
    let i = 0;
    for (const side of [-1, 1]) {
      for (const row of [0, 1]) {
        for (let k = 0; k < perArm; k++) {
          const p = POSTS[i % POSTS.length];
          out.push({
            kind: "arc",
            side,
            row,
            laneX: 0,
            phase: k,
            speed: 0,
            w,
            hw: ah / aw,
            ar: ARC_AR,
            src: p.src,
            cap: p.cap,
            brand: p.brand,
          });
          i++;
        }
      }
    }
    return out;
  }

  const lanes = LANES[mode];
  let i = 0;
  lanes.forEach((laneX, lane) => {
    for (let k = 0; k < PER_LANE; k++) {
      const p = POSTS[i % POSTS.length];
      const ar = LANE_AR[i % LANE_AR.length];
      const [aw, ah] = ar.split("/").map((n) => Number(n.trim()));
      out.push({
        kind: "lane",
        side: laneX < 0.5 ? -1 : 1,
        row: 0,
        laneX,
        phase: (k / PER_LANE + (lane % 2) * 0.12) % 1,
        speed: 0.028 + (lane % 3) * 0.006,
        w: 150 + (i % 3) * 28,
        hw: ah / aw,
        ar,
        src: p.src,
        cap: p.cap,
        brand: p.brand,
      });
      i++;
    }
  });
  return out;
}

function resolveMode(): Mode {
  if (typeof window !== "undefined") {
    const q = new URLSearchParams(window.location.search).get("warp");
    if (q && MODES.includes(q as Mode)) return q as Mode;
  }
  const env = process.env.NEXT_PUBLIC_WARP_MODE as Mode | undefined;
  if (env && MODES.includes(env)) return env;
  return "arcs";
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export default function WarpField() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const m = resolveMode();
    setMode(m);
    setCards(buildCards(m, window.innerWidth, window.innerHeight));
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || !mode || cards.length === 0) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".wcard"));

    let layout = mode === "arcs" ? computeU(window.innerWidth, window.innerHeight) : null;
    const onResize = () => {
      if (mode === "arcs") layout = computeU(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // nº de molduras por arm/fila (para o período do loop)
    const perArm = mode === "arcs" ? cards.filter((c) => c.side === -1 && c.row === 0).length : 0;

    let raf = 0;
    let start = 0;

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const W = window.innerWidth;
      const H = window.innerHeight;

      if (mode === "arcs" && layout) {
        const L = layout;
        const w = arcCardW(W);
        const ch = w * cards[0].hw;
        const spacing = ch + ARC_VGAP;
        const cycle = perArm * spacing; // ciclo completo (loop contínuo, sem reset)
        const drift = t * ARC_SPEED;
        for (let j = 0; j < els.length; j++) {
          const c = cards[j];
          const el = els[j];
          const s = (c.phase * spacing + drift) % cycle; // distância a partir do vértice escondido
          if (s > L.armLen) {
            el.style.opacity = "0";
            continue;
          }
          const absLen = c.side > 0 ? L.armLen + s : L.armLen - s;
          const pt = atLen(L, absLen);
          // normal à curva para separar as 2 filas
          const Tx = L.spread;
          const Ty = -2 * pt.u * L.range;
          const tl = Math.hypot(Tx, Ty) || 1;
          const nx = -Ty / tl;
          const ny = Tx / tl;
          const off = (c.row === 0 ? -1 : 1) * (w / 2 + ARC_ROWGAP / 2);
          const x = pt.x + nx * off;
          const y = pt.y + ny * off;
          const rot = arcRotation(pt.u, L.spread, L.range);
          const tn = s / L.armLen;
          const op = smoothstep(0, 0.05, tn) * (1 - smoothstep(0.9, 1, tn));
          el.style.opacity = String(op);
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
        }
        raf = requestAnimationFrame(frame);
        return;
      }

      // fallback: fisheye / scurve
      const cx = W / 2;
      for (let j = 0; j < els.length; j++) {
        const m = cards[j];
        const el = els[j];
        const ch = m.w * m.hw;
        const span = H + ch + 80;
        let p = (m.phase + t * m.speed) % 1;
        if (p < 0) p += 1;
        const ynat = H + ch - p * span;
        const xnat = m.laneX * W;
        const yc = ynat + ch / 2;
        const side = m.side;
        let x = xnat;
        let y = ynat;
        let rot = 0;
        let skew = 0;
        let scale = 1;
        if (mode === "fisheye") {
          const dx = xnat - cx;
          const dy = yc - H * 0.5;
          const r = Math.hypot(dx, dy);
          const rmax = Math.hypot(W * 0.5, H * 0.5);
          const norm = Math.min(1, r / rmax);
          const k = Math.pow(1 - norm, 1.6);
          const push = 0.46 * W * k;
          x = xnat + (dx / (r || 1)) * push;
          y = ynat + (dy / (r || 1)) * push * 0.45;
          scale = 1 + 0.6 * k;
          rot = side * 4 * (1 - norm);
        } else {
          const d = (yc - H * 0.46) / (H * 0.22);
          const env = Math.max(0, 1 - d * d);
          x = xnat + side * 0.16 * W * env;
          skew = side * 14 * env;
          rot = side * 8 * env;
        }
        const fade = H * 0.12;
        let op = 1;
        if (yc < fade) op = Math.max(0, yc / fade);
        else if (yc > H - fade) op = Math.max(0, (H - yc) / fade);
        el.style.opacity = String(op);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translateX(-50%) rotate(${rot}deg) skewX(${skew}deg) scale(${scale})`;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    root.classList.add("ready");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [mode, cards]);

  return (
    <div className={`warpfield warp-${mode ?? "none"}`} ref={ref} aria-hidden="true">
      {cards.map((c, idx) => (
        <div className="pcard wcard" key={idx} style={{ width: c.w, ["--ar" as string]: c.ar }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt="" loading="lazy" />
          <span className="cap">{c.cap}</span>
          <span className="brand">
            <i />
            {c.brand}
          </span>
        </div>
      ))}
    </div>
  );
}
