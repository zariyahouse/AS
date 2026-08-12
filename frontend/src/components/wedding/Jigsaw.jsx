// Jigsaw.jsx — SVG clip-path jigsaw of a couple photo; snaps into a gold frame.
import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jigsawImage, weddingDate } from "../../config/weddingConfig";
import { chime, flourish } from "./sound";

const COLS = 3, ROWS = 2;
const W = 300, H = 224;
const w = W / COLS, h = H / ROWS;      // 100 x 112
const R = 16;                           // tab reach
const BW = w + 2 * R, BH = h + 2 * R;   // box 132 x 144
const stageW = 340, stageH = 540;
const boardX = (stageW - W) / 2, boardY = 12;
const SNAP = 30;

// build a cubic "knob" edge between A and B
const edge = (ax, ay, bx, by, ux, uy, ox, oy, sign) => {
  if (sign === 0) return `L ${bx} ${by} `;
  const rad = 15;
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  const sx = mx - ux * rad, sy = my - uy * rad;
  const ex = mx + ux * rad, ey = my + uy * rad;
  const px = ox * sign, py = oy * sign;
  const k = 2.2 * rad;
  const c1x = sx - ux * 0.4 * rad + px * k, c1y = sy - uy * 0.4 * rad + py * k;
  const c2x = ex + ux * 0.4 * rad + px * k, c2y = ey + uy * 0.4 * rad + py * k;
  return `L ${sx} ${sy} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey} L ${bx} ${by} `;
};

const buildPaths = () => {
  const vSign = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS - 1 }, () => (Math.random() > 0.5 ? 1 : -1)));
  const hSign = Array.from({ length: ROWS - 1 }, () =>
    Array.from({ length: COLS }, () => (Math.random() > 0.5 ? 1 : -1)));
  const paths = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const top = r === 0 ? 0 : -hSign[r - 1][c];
      const bottom = r === ROWS - 1 ? 0 : hSign[r][c];
      const left = c === 0 ? 0 : -vSign[r][c - 1];
      const right = c === COLS - 1 ? 0 : vSign[r][c];
      const TLx = R, TLy = R, TRx = R + w, TRy = R, BRx = R + w, BRy = R + h, BLx = R, BLy = R + h;
      let d = `M ${TLx} ${TLy} `;
      d += edge(TLx, TLy, TRx, TRy, 1, 0, 0, -1, top);
      d += edge(TRx, TRy, BRx, BRy, 0, 1, 1, 0, right);
      d += edge(BRx, BRy, BLx, BLy, -1, 0, 0, 1, bottom);
      d += edge(BLx, BLy, TLx, TLy, 0, -1, -1, 0, left);
      d += "Z";
      paths.push({ r, c, d });
    }
  }
  return paths;
};

export const Jigsaw = () => {
  const paths = useMemo(buildPaths, []);
  const [pieces, setPieces] = useState(() => {
    const arr = paths.map((p, i) => ({
      ...p,
      i,
      homeX: boardX + p.c * w - R,
      homeY: boardY + p.r * h - R,
      x: 8 + Math.random() * (stageW - BW - 16),
      y: boardY + H + 24 + Math.random() * (stageH - (boardY + H + 24) - BH),
      rot: -18 + Math.random() * 36,
      placed: false,
      z: 1,
    }));
    return arr;
  });
  const drag = useRef(null);
  const stageRef = useRef(null);
  const [topZ, setTopZ] = useState(10);

  const complete = pieces.every((p) => p.placed);

  const onPointerDown = (e, i) => {
    const piece = pieces[i];
    if (piece.placed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const z = topZ + 1;
    setTopZ(z);
    drag.current = { i, startX: e.clientX, startY: e.clientY, baseX: piece.x, baseY: piece.y };
    setPieces((ps) => ps.map((p) => (p.i === i ? { ...p, z } : p)));
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    const { i, startX, startY, baseX, baseY } = drag.current;
    const nx = baseX + (e.clientX - startX);
    const ny = baseY + (e.clientY - startY);
    setPieces((ps) => ps.map((p) => (p.i === i ? { ...p, x: nx, y: ny } : p)));
  };

  const onPointerUp = () => {
    if (!drag.current) return;
    const { i } = drag.current;
    drag.current = null;
    setPieces((ps) => {
      const next = ps.map((p) => {
        if (p.i !== i) return p;
        const dist = Math.hypot(p.x - p.homeX, p.y - p.homeY);
        if (dist < SNAP) {
          chime(660 + p.i * 60, 0.5, "sine");
          return { ...p, x: p.homeX, y: p.homeY, rot: 0, placed: true, z: 0 };
        }
        return p;
      });
      if (next.every((p) => p.placed) && !ps.every((p) => p.placed)) setTimeout(flourish, 200);
      return next;
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center">
      <p className="font-body text-center text-sm italic text-bottle/70">
        Drag the pieces home — each will settle with a soft chime.
      </p>

      {/* clip-path defs */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          {pieces.map((p) => (
            <clipPath key={p.i} id={`jig-${p.i}`} clipPathUnits="userSpaceOnUse">
              <path d={p.d} />
            </clipPath>
          ))}
        </defs>
      </svg>

      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative mt-6 touch-none select-none"
        style={{ width: stageW, height: stageH }}
      >
        {/* board outline / gold frame */}
        <div
          className={`absolute transition-all duration-700 ${complete ? "ambient-glow" : ""}`}
          style={{
            left: boardX, top: boardY, width: W, height: H,
            boxShadow: complete
              ? "inset 0 0 0 3px rgba(184,134,11,0.9), 0 0 40px rgba(232,211,153,0.6)"
              : "inset 0 0 0 1px rgba(184,134,11,0.35)",
            background: "repeating-linear-gradient(45deg, rgba(184,134,11,0.05) 0 8px, transparent 8px 16px)",
          }}
        />

        {pieces.map((p) => (
          <div
            key={p.i}
            data-testid={`jigsaw-piece-${p.i}`}
            onPointerDown={(e) => onPointerDown(e, p.i)}
            className={p.placed ? "" : "cursor-grab active:cursor-grabbing"}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: BW,
              height: BH,
              transform: `rotate(${p.rot}deg)`,
              zIndex: p.z,
              backgroundImage: `url(${jigsawImage})`,
              backgroundSize: `${W}px ${H}px`,
              backgroundPosition: `${R - p.c * w}px ${R - p.r * h}px`,
              clipPath: `url(#jig-${p.i})`,
              WebkitClipPath: `url(#jig-${p.i})`,
              filter: p.placed ? "none" : "drop-shadow(0 6px 10px rgba(28,43,36,0.35))",
              transition: p.placed ? "left .2s ease, top .2s ease, transform .2s ease" : "none",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            data-testid="jigsaw-reveal"
            className="mt-6 text-center"
          >
            <p className="font-display tnum text-4xl font-semibold text-malachite md:text-5xl">
              {weddingDate.displayDate}
            </p>
            <p className="font-body mt-2 text-base italic text-bottle/75">
              We can’t wait to celebrate with you.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
