// ExtraMotifs.jsx — additional line-art icons.
import React from "react";
const G = "#B8860B";
const GL = "#E8D399";

// Manthrakodi (bridal shawl) — draped cloth with border pattern
export const Manthrakodi = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 120 70" className={className} fill="none" aria-hidden="true">
    <g stroke={stroke} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M8 14 Q60 -2 112 14 L104 60 Q60 48 16 60 Z" fill={GL} fillOpacity="0.14" />
      <path d="M14 20 Q60 6 106 20" opacity="0.7" />
      <path d="M16 52 Q60 40 104 52" strokeDasharray="3 3" />
      <path d="M20 60 v6 M32 60 v7 M44 60 v6 M56 60 v7 M68 60 v6 M80 60 v7 M92 60 v6" />
    </g>
  </svg>
);

// Quill (guestbook) 
export const Quill = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
    <g stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 8 C40 12 22 26 14 44 C24 42 42 32 52 8 Z" fill={GL} fillOpacity="0.16" />
      <path d="M52 8 C44 20 30 34 16 42" opacity="0.6" />
      <path d="M14 44 L8 52 M8 52 h14" />
    </g>
  </svg>
);

// Garland (mala) 
export const Garland = ({ className = "", stroke = G }) => (
  <svg viewBox="0 0 200 60" className={className} fill="none" aria-hidden="true">
    <path d="M4 8 Q100 78 196 8" stroke={stroke} strokeWidth="1.4" strokeDasharray="2 3" />
    {Array.from({ length: 11 }).map((_, i) => {
      const x = 4 + (i / 10) * 192;
      const y = 8 + Math.sin((i / 10) * Math.PI) * 46;
      return <circle key={i} cx={x} cy={y} r="4" stroke={stroke} strokeWidth="1.2" fill={GL} fillOpacity="0.3" />;
    })}
  </svg>
);
