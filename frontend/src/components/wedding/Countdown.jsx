// Countdown.jsx — custom numeral countdown to the wedding, flanked by mural.
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "./Common";
import { weddingDate, muralBackgrounds } from "../../config/weddingConfig";
import { MuralDivider } from "./Motifs";
import monogram from "../../assets/monogram.png";

const calc = () => {
  const diff = new Date(weddingDate.iso).getTime() - Date.now();
  const clamp = Math.max(diff, 0);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
};

const Unit = ({ value, label }) => (
  <div className="relative flex flex-col items-center">
    <div className="relative flex h-24 w-20 items-center justify-center md:h-32 md:w-28"
      style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}>
      <div className="pointer-events-none absolute inset-1 border border-gold/30" />
      <span className="font-display tnum text-4xl font-semibold text-malachite md:text-6xl">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="font-accent mt-3 text-[0.6rem] uppercase tracking-[0.3em] text-gold md:text-xs">{label}</span>
  </div>
);

export const Countdown = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <SectionShell id="countdown" mural={muralBackgrounds.b} tone="#264D73" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading overline="Counting the Days" title="Until We Are Crowned" tone="#264D73" />

        <div className="relative mt-16">
          <img src={monogram} alt="" aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:h-56 md:w-56" />
          <MuralDivider className="mx-auto mb-8 h-8 w-72 opacity-70" stroke="#264D73" />
          <motion.div className="flex items-center justify-center gap-3 md:gap-6"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <Unit value={t.days} label="Days" />
            <span className="font-display -mt-6 text-3xl text-gold/50 md:text-5xl">:</span>
            <Unit value={t.hours} label="Hours" />
            <span className="font-display -mt-6 text-3xl text-gold/50 md:text-5xl">:</span>
            <Unit value={t.minutes} label="Minutes" />
            <span className="font-display -mt-6 text-3xl text-gold/50 md:text-5xl">:</span>
            <Unit value={t.seconds} label="Seconds" />
          </motion.div>
          <MuralDivider className="mx-auto mt-8 h-8 w-72 opacity-70" stroke="#264D73" />
        </div>

        <p className="font-body mt-10 text-base italic text-bottle/75 md:text-lg">
          {weddingDate.displayDate} · {weddingDate.displayTime}
        </p>
      </div>
    </SectionShell>
  );
};
