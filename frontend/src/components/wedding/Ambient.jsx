// Ambient.jsx — custom cursor, drifting gold particles, mouse-parallax context.
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ---------------- Mouse parallax context ----------------
const MouseCtx = createContext(null);
export const useMouseParallax = () => useContext(MouseCtx);

export const MouseProvider = ({ children }) => {
  // normalized -1..1 from centre, spring-smoothed
  const mx = useSpring(0, { stiffness: 40, damping: 20 });
  const my = useSpring(0, { stiffness: 40, damping: 20 });
  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  return <MouseCtx.Provider value={{ mx, my }}>{children}</MouseCtx.Provider>;
};

// ---------------- Custom gold cursor with trailing halo ----------------
export const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 24 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 24 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      const t = e.target;
      setHovering(!!(t.closest && t.closest("a,button,[data-cursor='hover'],input,textarea")));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", opacity: visible ? 1 : 0 }}>
      {/* outer rope ring */}
      <motion.div
        style={{
          x: ringX, y: ringY, position: "absolute", top: 0, left: 0,
          translateX: "-50%", translateY: "-50%",
          width: hovering ? 56 : 34, height: hovering ? 56 : 34,
          borderRadius: "50%",
          border: "1.5px solid rgba(184,134,11,0.75)",
          boxShadow: "0 0 14px rgba(232,211,153,0.55)",
          transition: "width .25s ease, height .25s ease",
        }}
      />
      {/* inner gold dot */}
      <motion.div
        style={{
          x: dotX, y: dotY, position: "absolute", top: 0, left: 0,
          translateX: "-50%", translateY: "-50%",
          width: 7, height: 7, borderRadius: "50%",
          background: "#B8860B",
          boxShadow: "0 0 10px rgba(232,211,153,0.9)",
        }}
      />
    </div>
  );
};

// ---------------- Drifting gold particles (ambient, always on) ----------------
export const GoldParticles = ({ count = 22, zClass = "z-[2]" }) => {
  const parts = useRef(
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: -Math.random() * 22,
      dur: 16 + Math.random() * 18,
      op: 0.25 + Math.random() * 0.5,
    }))
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${zClass}`} aria-hidden="true">
      {parts.current.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            bottom: -10,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #F0E2B8, rgba(184,134,11,0.2))",
            opacity: p.op,
            boxShadow: "0 0 6px rgba(232,211,153,0.7)",
            animation: `float-up ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
