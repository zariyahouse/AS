// Footer.jsx — closing note, names, date, credits, monogram watermark.
import React from "react";
import { motion } from "framer-motion";
import monogram from "../../assets/monogram.png";
import { couple, weddingDate, credits } from "../../config/weddingConfig";
import { MuralDivider, Laurel, StThomasCross } from "./Motifs";
import { GoldParticles } from "./Ambient";
import { Reveal } from "./Common";

export const Footer = () => (
  <footer id="closing" className="relative isolate overflow-hidden py-28 md:py-36" style={{ background: "#1C2B24" }}>
    {/* mural + glow layers so it's never flat */}
    <div className="pointer-events-none absolute inset-0 z-0" style={{
      background: "radial-gradient(90% 60% at 50% 0%, rgba(184,134,11,0.18), transparent 60%), radial-gradient(70% 50% at 50% 100%, rgba(11,74,52,0.5), transparent 60%)",
    }} />
    <img src={monogram} alt="" aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:h-96 md:w-96" />
    <GoldParticles count={20} zClass="z-[1]" />

    <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
      <Reveal dir="scale">
        <StThomasCross className="mx-auto h-28 w-20 ambient-glow" stroke="#E8D399" />
      </Reveal>

      <Reveal dir="up" delay={0.1}>
        <p className="font-body mt-8 text-lg italic leading-relaxed text-ivory/80 md:text-xl">
          With grateful hearts, we await the day our two houses become one flame.
          Come, and let your presence be our greatest blessing.
        </p>
      </Reveal>

      <Reveal dir="up" delay={0.16}>
        <h2 className="font-display mt-12 text-5xl font-semibold leading-none text-ivory md:text-7xl">
          {couple.groom.short} <span className="gold-shimmer-text italic">&amp;</span> {couple.bride.short}
        </h2>
      </Reveal>

      <Reveal dir="scale" delay={0.2}>
        <MuralDivider className="mx-auto mt-6 h-8 w-72" stroke="#C9A15D" />
      </Reveal>

      <Reveal dir="up" delay={0.24}>
        <p className="font-accent mt-3 text-sm uppercase tracking-[0.35em] text-gold-light tnum">
          {weddingDate.displayDate}
        </p>
      </Reveal>

      {/* credits */}
      <Reveal dir="up" delay={0.3}>
        <div className="mt-16 flex flex-col items-center">
          <Laurel className="h-5 w-16" stroke="#C9A15D" />
          <p className="font-accent mt-4 text-[0.6rem] uppercase tracking-[0.3em] text-gold/70">{credits.note}</p>
          <p className="font-body mt-2 max-w-md text-sm text-ivory/70 md:text-base">
            {credits.people.map((p, i) => (
              <span key={i}>
                <span className="text-ivory/90">{p.name}</span>, {p.relation}
                {i < credits.people.length - 1 ? ", and " : "."}
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      <motion.p className="font-accent mt-16 text-[0.55rem] uppercase tracking-[0.4em] text-ivory/30">
        A &amp; M · MMXXVI
      </motion.p>
    </div>
  </footer>
);
