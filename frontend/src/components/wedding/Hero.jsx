// Hero.jsx — monogram seal reveal: rope circle self-draws, light-sweep, names fade in.
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import monogram from "../../assets/monogram.png";
import { couple, weddingDate, muralBackgrounds } from "../../config/weddingConfig";
import { GoldParticles, useMouseParallax } from "./Ambient";
import { Laurel, MuralDivider } from "./Motifs";

export const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 0.2], [0, 120]);
  const yFront = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const ctx = useMouseParallax();
  const mLeafX = useTransform(ctx?.mx ?? { get: () => 0 }, (v) => (v || 0) * 14);

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--ivory)" }}>
      {/* layered mural background (slow parallax) */}
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ y: yBg }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${muralBackgrounds.a})`, backgroundSize: "cover", backgroundPosition: "center",
          opacity: 0.1, filter: "sepia(0.7) saturate(0.6)", mixBlendMode: "multiply",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(120% 90% at 50% 30%, rgba(255,255,255,0.65), transparent 55%), radial-gradient(90% 60% at 50% 110%, rgba(184,134,11,0.18), transparent 60%)",
        }} />
      </motion.div>

      <GoldParticles count={30} zClass="z-[2]" />

      <motion.div className="relative z-10 flex flex-col items-center px-6 text-center" style={{ y: yFront, opacity: fade }}>
        {/* overline */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="flex items-center gap-4">
          <Laurel className="h-6 w-10" />
          <span className="font-accent text-[0.65rem] uppercase tracking-[0.5em] text-gold md:text-sm">Together, by grace</span>
          <Laurel className="h-6 w-10" flip />
        </motion.div>

        {/* Monogram with self-drawing rope ring + light sweep */}
        <div className="relative mt-8 h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80">
          {/* drawing rope circle */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <motion.circle cx="100" cy="100" r="96" stroke="#B8860B" strokeWidth="1.6"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 2, ease: "easeInOut" }} />
            <motion.circle cx="100" cy="100" r="90" stroke="#E8D399" strokeWidth="1" strokeDasharray="4 5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }} className="slow-spin" style={{ transformOrigin: "100px 100px" }} />
          </svg>
          {/* monogram image scales back into place */}
          <motion.div className="absolute inset-4 overflow-hidden rounded-full"
            initial={{ scale: 1.35, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
            <img src={monogram} alt="Abel and Merlyn interlocked monogram" className="h-full w-full object-cover" />
            {/* light-sweep shimmer */}
            <motion.div className="absolute inset-0"
              initial={{ x: "-120%" }} animate={{ x: "120%" }}
              transition={{ delay: 1.8, duration: 1.4, ease: "easeInOut" }}
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,247,221,0.75) 50%, transparent 60%)" }} />
          </motion.div>
          <div className="ambient-glow absolute inset-0 rounded-full" />
        </div>

        {/* Names */}
        <motion.h1 className="font-display mt-10 text-5xl font-semibold leading-[0.95] tracking-tight text-bottle sm:text-6xl md:text-7xl lg:text-8xl text-shadow-warm"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1.2 }}>
          <span className="block">{couple.groom.short}</span>
          <span className="gold-shimmer-text my-1 block text-4xl italic sm:text-5xl md:text-6xl">&amp;</span>
          <span className="block">{couple.bride.short}</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1.2 }}
          className="mt-6 flex flex-col items-center">
          <MuralDivider className="h-6 w-56" />
          <p className="font-accent mt-3 text-sm uppercase tracking-[0.35em] text-malachite md:text-base tnum">
            {weddingDate.displayDate}
          </p>
          <p className="font-body mt-1 text-sm italic text-bottle/70">Mount Tabor Dayara · Kerala</p>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }} style={{ opacity: fade }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="font-accent flex flex-col items-center gap-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold">
          Scroll
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#B8860B" strokeWidth="1.5"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
