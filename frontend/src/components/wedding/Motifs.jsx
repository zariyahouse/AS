// ============================================================
//  Motifs.jsx — hand-drawn SVG line-art specific to this
//  Kerala Christian wedding. No emoji, no clipart.
// ============================================================
import React from "react";

const G = "#B8860B";
const GL = "#E8D399";

// ---- Ornate St. Thomas / Mar Thoma Cross (flory cross, budded arms,
//      lotus/stepped base, descending dove, radiating rays) ----
export const StThomasCross = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 200 300" className={className} fill="none" aria-hidden="true">
    {/* radiating rays */}
    <g stroke={stroke} strokeWidth="1" opacity="0.5">
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <line key={i} x1={100} y1={92}
            x2={100 + Math.cos(a) * 74} y2={92 + Math.sin(a) * 74} />
        );
      })}
    </g>
    {/* descending dove */}
    <g stroke={stroke} strokeWidth="1.6" strokeLinecap="round">
      <path d="M100 8 C93 16 92 24 100 30 C108 24 107 16 100 8 Z" fill={GL} fillOpacity="0.25" />
      <path d="M100 30 C96 34 92 33 88 30 M100 30 C104 34 108 33 112 30" />
    </g>
    {/* halo */}
    <circle cx="100" cy="92" r="40" stroke={stroke} strokeWidth="1.4" opacity="0.7" />
    {/* cross body */}
    <g stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill={GL} fillOpacity="0.14">
      {/* vertical */}
      <path d="M92 56 L108 56 L108 150 L118 150 L118 250 L82 250 L82 150 L92 150 Z" />
      {/* horizontal */}
      <path d="M52 100 L52 84 L148 84 L148 100 L108 100 L108 84 L92 84 L92 100 Z" />
      {/* budded/petal terminals */}
      <circle cx="100" cy="52" r="7" />
      <circle cx="48" cy="92" r="7" />
      <circle cx="152" cy="92" r="7" />
      <path d="M88 250 q12 14 24 0" />
    </g>
    {/* lotus / stepped base */}
    <g stroke={stroke} strokeWidth="2" strokeLinecap="round" fill={GL} fillOpacity="0.14">
      <path d="M70 250 q30 26 60 0" />
      <path d="M62 262 h76 M70 274 h60 M78 286 h44" />
      <path d="M100 250 q-10 -12 -22 -10 q10 8 22 10 q12 -2 22 -10 q-12 -2 -22 10Z" />
    </g>
  </svg>
);

// ---- Twisted gold rope (horizontal), the signature thread ----
export const RopeLine = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 400 16" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
    <path d="M0 8 Q 10 1 20 8 T 40 8 T 60 8 T 80 8 T 100 8 T 120 8 T 140 8 T 160 8 T 180 8 T 200 8 T 220 8 T 240 8 T 260 8 T 280 8 T 300 8 T 320 8 T 340 8 T 360 8 T 380 8 T 400 8"
      stroke={stroke} strokeWidth="2" opacity="0.9" />
    <path d="M0 8 Q 10 15 20 8 T 40 8 T 60 8 T 80 8 T 100 8 T 120 8 T 140 8 T 160 8 T 180 8 T 200 8 T 220 8 T 240 8 T 260 8 T 280 8 T 300 8 T 320 8 T 340 8 T 360 8 T 380 8 T 400 8"
      stroke={GL} strokeWidth="1.4" opacity="0.7" />
  </svg>
);

// ---- Rope circle (frame around monogram / portraits) ----
export const RopeCircle = ({ className = "", stroke = G, draw = false }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="94" stroke={stroke} strokeWidth="2.4"
      strokeDasharray="6 4" className={draw ? "" : ""} />
    <circle cx="100" cy="100" r="88" stroke={GL} strokeWidth="1.2" opacity="0.7" />
  </svg>
);

// ---- Nilavilakku (traditional Kerala oil lamp), line-art ----
export const OilLamp = ({ className = "", lit = false, stroke = G }) => (
  <svg viewBox="0 0 80 140" className={className} fill="none" aria-hidden="true">
    {/* flame */}
    <g className={lit ? "flame-flicker" : ""} style={{ opacity: lit ? 1 : 0.12 }}>
      <path d="M40 6 C46 16 52 22 46 34 C44 40 36 40 34 34 C28 22 34 16 40 6 Z"
        fill={lit ? "#FFCE6A" : "none"} stroke={lit ? "#F6A83A" : stroke} strokeWidth="1.6" />
      {lit && <circle cx="40" cy="26" r="14" fill="#FFD97A" opacity="0.35" />}
    </g>
    {/* lamp body */}
    <g stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" fill={GL} fillOpacity="0.16">
      <path d="M18 44 h44 l-6 10 h-32 z" />
      <path d="M40 6 v0 M40 34 v10" stroke={stroke} />
      <path d="M40 54 v40" />
      <path d="M28 96 q12 12 24 0 l6 8 q-18 14 -36 0 z" />
      <path d="M22 108 h36 M18 118 h44 M26 128 h28" />
      {/* peacock crest atop */}
      <path d="M34 44 q-8 -8 -2 -16 M46 44 q8 -8 2 -16 M40 40 v-14" stroke={stroke} strokeWidth="1.3" />
    </g>
  </svg>
);

// ---- Ornate crown (for the Crowning game) ----
export const Crown = ({ className = "", lit = false, stroke = G }) => (
  <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden="true">
    <g stroke={lit ? GL : stroke} strokeWidth="2.2" strokeLinejoin="round"
      fill={lit ? GL : G} fillOpacity={lit ? 0.35 : 0.12}>
      <path d="M14 74 L20 30 L42 54 L60 20 L78 54 L100 30 L106 74 Z" />
      <path d="M12 74 h96 v8 h-96 z" />
      <circle cx="20" cy="26" r="4" />
      <circle cx="60" cy="15" r="5" />
      <circle cx="100" cy="26" r="4" />
      {/* cross atop the crown (Orthodox nod) */}
      <path d="M60 15 v-9 M56 9 h8" strokeWidth="1.8" />
      <circle cx="42" cy="70" r="3" fill={stroke} />
      <circle cx="60" cy="70" r="3" fill={stroke} />
      <circle cx="78" cy="70" r="3" fill={stroke} />
    </g>
  </svg>
);

// ---- Interlocking wedding rings (footer flourish + corner motif) ----
export const RingMotif = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
    <circle cx="50" cy="50" r="34" stroke={stroke} strokeWidth="3" />
    <circle cx="50" cy="50" r="34" stroke={GL} strokeWidth="1.2" strokeDasharray="3 5" />
    <path d="M50 16 l4 -8 h-8 z" fill={stroke} />
    {/* facets */}
    <g stroke={GL} strokeWidth="1" opacity="0.7">
      <path d="M28 34 L40 22 M72 34 L60 22 M22 62 L34 74 M78 62 L66 74" />
    </g>
  </svg>
);

// ---- Minnu (wedding pendant/chain) icon ----
export const Minnu = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
    <path d="M14 14 Q40 4 66 14" stroke={stroke} strokeWidth="1.4" strokeDasharray="2 3" />
    <circle cx="40" cy="46" r="16" stroke={stroke} strokeWidth="2" fill={GL} fillOpacity="0.14" />
    {/* seven beads cross on the minnu */}
    <path d="M40 36 v20 M32 44 h16 M36 60 h8" stroke={stroke} strokeWidth="1.6" />
    <circle cx="40" cy="36" r="2" fill={stroke} /><circle cx="40" cy="56" r="2" fill={stroke} />
    <circle cx="32" cy="44" r="2" fill={stroke} /><circle cx="48" cy="44" r="2" fill={stroke} />
  </svg>
);

// ---- Kerala mural scrollwork divider (thin gold linework) ----
export const MuralDivider = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 600 60" className={className} fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g stroke={stroke} strokeWidth="1.4" strokeLinecap="round">
      <line x1="0" y1="30" x2="230" y2="30" opacity="0.5" />
      <line x1="370" y1="30" x2="600" y2="30" opacity="0.5" />
      {/* central lotus medallion */}
      <circle cx="300" cy="30" r="12" fill={GL} fillOpacity="0.2" />
      <path d="M300 12 q6 8 0 18 q-6 -10 0 -18 M300 48 q6 -8 0 -18 q-6 10 0 18" />
      <path d="M282 30 q8 6 18 0 q-10 6 -18 0 M318 30 q-8 6 -18 0 q10 6 18 0" />
      {/* symmetric scrolls */}
      <path d="M240 30 q10 -18 26 -8 q-14 -2 -12 12 q-1 -10 -14 -4" />
      <path d="M360 30 q-10 -18 -26 -8 q14 -2 12 12 q1 -10 14 -4" />
      <path d="M240 30 q10 18 26 8 q-14 2 -12 -12 q-1 10 -14 4" />
      <path d="M360 30 q-10 18 -26 8 q14 2 12 -12 q1 10 14 4" />
      <circle cx="230" cy="30" r="2.5" fill={stroke} />
      <circle cx="370" cy="30" r="2.5" fill={stroke} />
    </g>
  </svg>
);

// ---- Laurel sprig (small flourish) ----
export const Laurel = ({ className = "", stroke = G, flip = false }) => (
  <svg viewBox="0 0 60 40" className={className} fill="none" aria-hidden="true"
    style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <path d="M4 36 Q30 30 56 10" stroke={stroke} strokeWidth="1.4" />
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M${8 + i * 8} ${34 - i * 4} q-6 -6 2 -10 q4 6 -2 10`}
        stroke={stroke} strokeWidth="1.1" fill={GL} fillOpacity="0.2" />
    ))}
  </svg>
);

// ---- Small bloom (Golden Thread anchor) ----
export const Bloom = ({ className = "", stroke = G, active = false }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <g stroke={stroke} strokeWidth="1.3">
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <ellipse key={i} cx={12 + Math.cos(a) * 5} cy={12 + Math.sin(a) * 5}
            rx="3.4" ry="1.8" transform={`rotate(${(i / 6) * 360} ${12 + Math.cos(a) * 5} ${12 + Math.sin(a) * 5})`}
            fill={active ? GL : "none"} fillOpacity={active ? 0.8 : 0} />
        );
      })}
      <circle cx="12" cy="12" r="2.4" fill={active ? G : GL} />
    </g>
  </svg>
);

// ---- Couple silhouettes for the Crowning game (gold linework) ----
export const GroomSilhouette = ({ className = "", lit = false, stroke = G }) => (
  <svg viewBox="0 0 120 220" className={className} fill="none" aria-hidden="true">
    <g stroke={lit ? GL : stroke} strokeWidth="2" strokeLinejoin="round"
      fill={lit ? GL : "none"} fillOpacity={lit ? 0.18 : 0} className={lit ? "ambient-glow" : ""}>
      <circle cx="60" cy="42" r="22" />
      <path d="M38 58 q22 22 44 0" />
      {/* tux torso */}
      <path d="M34 78 q26 -14 52 0 l8 70 q-34 12 -68 0 z" />
      <path d="M60 66 v82" />
      <path d="M52 78 l8 24 l8 -24" />
      {/* bow */}
      <path d="M54 70 l6 4 l6 -4 l-2 6 h-8 z" fill={stroke} />
      {/* legs */}
      <path d="M40 148 l4 64 h14 l2 -50 l2 50 h14 l4 -64" />
    </g>
  </svg>
);

export const BrideSilhouette = ({ className = "", lit = false, stroke = G }) => (
  <svg viewBox="0 0 120 220" className={className} fill="none" aria-hidden="true">
    <g stroke={lit ? GL : stroke} strokeWidth="2" strokeLinejoin="round"
      fill={lit ? GL : "none"} fillOpacity={lit ? 0.18 : 0} className={lit ? "ambient-glow" : ""}>
      <circle cx="60" cy="42" r="22" />
      {/* veil */}
      <path d="M38 40 q-10 40 -6 120 M82 40 q10 40 6 120" opacity="0.6" />
      <path d="M40 60 q20 18 40 0" />
      {/* gown bodice + flowing skirt */}
      <path d="M42 78 q18 -12 36 0 l2 34 z" />
      <path d="M44 108 q16 -8 32 0 l18 100 q-34 14 -68 0 z" />
      <path d="M60 78 v130" opacity="0.5" />
    </g>
  </svg>
);

// ---- Large decorative mural corner (section ornament) ----
export const CornerFlourish = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 140 140" className={className} fill="none" aria-hidden="true">
    <g stroke={stroke} strokeWidth="1.3" strokeLinecap="round">
      <path d="M8 8 q60 0 60 60 q0 -40 -60 -40 M8 8 q0 60 60 60 q-40 0 -40 -60" />
      <path d="M8 40 q30 4 40 34 M40 8 q4 30 34 40" opacity="0.6" />
      <circle cx="70" cy="70" r="4" fill={stroke} />
      <path d="M70 70 q18 -6 30 6 q-14 -2 -18 10 q-2 -12 -12 -16" opacity="0.7" />
    </g>
  </svg>
);
