// ScrollMotifs.jsx — Golden Thread (edge progress) + Two Rings (converging).
import React from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { RingMotif, Bloom } from "./Motifs";

// Section anchor points along the thread (as scroll fractions, approximate)
const ANCHORS = [0.14, 0.32, 0.52, 0.68, 0.82, 0.93];

// ---------------- The Golden Thread ----------------
export const GoldenThread = () => {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const fillH = useTransform(p, [0, 1], ["0%", "100%"]);
  const fillW = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Desktop: vertical rope strip on right edge */}
      <div className="pointer-events-none fixed right-3 top-24 bottom-6 z-40 hidden w-[10px] md:block" aria-hidden="true">
        <div className="absolute inset-0 mx-auto w-[2px] bg-[#B8860B]/20" />
        <motion.div className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full"
          style={{ height: fillH, background: "linear-gradient(#E8D399,#B8860B)", boxShadow: "0 0 8px rgba(232,211,153,0.8)" }} />
        {ANCHORS.map((a, i) => (
          <ThreadBloom key={i} progress={p} at={a} vertical />
        ))}
      </div>

      {/* Mobile: thin horizontal bar just below the nav */}
      <div className="pointer-events-none fixed left-0 right-0 top-[52px] z-40 h-[6px] md:hidden" aria-hidden="true">
        <div className="absolute inset-x-3 top-1/2 h-[2px] -translate-y-1/2 bg-[#B8860B]/20" />
        <motion.div className="absolute left-3 top-1/2 h-[3px] -translate-y-1/2 rounded-full"
          style={{ width: fillW, background: "linear-gradient(90deg,#E8D399,#B8860B)", boxShadow: "0 0 8px rgba(232,211,153,0.8)" }} />
      </div>
    </>
  );
};

const ThreadBloom = ({ progress, at, vertical }) => {
  const scale = useTransform(progress, [at - 0.04, at], [0.5, 1.25]);
  const op = useTransform(progress, [at - 0.06, at], [0.2, 1]);
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: `${at * 100}%`, scale, opacity: op }}
    >
      <motion.div style={{ opacity: op }}>
        <Bloom className="h-4 w-4 ambient-glow" active />
      </motion.div>
    </motion.div>
  );
};

// ---------------- Two Rings converging ----------------
export const TwoRings = () => {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 24 });

  // horizontal convergence toward centre
  const leftPct = useTransform(p, [0, 1], [3, 46]);
  const rightPct = useTransform(p, [0, 1], [3, 46]);
  const leftCss = useMotionTemplate`${leftPct}%`;
  const rightCss = useMotionTemplate`${rightPct}%`;

  // downward drift (vh)
  const topVh = useTransform(p, [0, 1], [2.5, 80]);
  const topCss = useMotionTemplate`${topVh}vh`;

  // rotation driven by scroll (settles to stop when scrolling stops)
  const rotL = useTransform(p, [0, 1], [0, 540]);
  const rotR = useTransform(p, [0, 1], [0, -540]);

  // grow + brighten as they meet
  const size = useTransform(p, [0, 0.85, 1], [46, 52, 78]);
  const sizeCss = useMotionTemplate`${size}px`;
  const glow = useTransform(p, [0.8, 1], [0.45, 1]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-hidden="true">
      <motion.div className="absolute" style={{ left: leftCss, top: topCss, width: sizeCss, height: sizeCss, rotate: rotL, opacity: glow }}>
        <RingMotif className="h-full w-full ambient-glow" />
      </motion.div>
      <motion.div className="absolute" style={{ right: rightCss, top: topCss, width: sizeCss, height: sizeCss, rotate: rotR, opacity: glow }}>
        <RingMotif className="h-full w-full ambient-glow" />
      </motion.div>
    </div>
  );
};
