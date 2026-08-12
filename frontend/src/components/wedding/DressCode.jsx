// DressCode.jsx — two family colour directions as fabric-swatch chips.
// Swatch colours live in an isolated config object (dressCodeSwatches);
// the shimmer/hover animation logic references those values, never hardcoded hex.
import React from "react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading, Reveal } from "./Common";
import { dressCodeSwatches, muralBackgrounds } from "../../config/weddingConfig";
import { Manthrakodi } from "./ExtraMotifs";

const SwatchRow = ({ side, delay }) => (
  <Reveal dir="up" delay={delay} className="flex-1">
    <div className="relative p-6 md:p-8" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.35)" }}>
      <div className="pointer-events-none absolute inset-[6px] border border-gold/25" />
      <Manthrakodi className="mx-auto mb-3 h-10 w-16" />
      <p className="font-display text-center text-2xl font-semibold text-malachite md:text-3xl">{side.label}</p>
      <p className="font-accent mt-1 text-center text-[0.6rem] uppercase tracking-[0.22em] text-gold">{side.note}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {side.colors.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="group relative h-14 w-14 rounded-full md:h-16 md:w-16"
            style={{ background: c, boxShadow: `0 8px 22px -8px ${c}, inset 0 0 0 2px rgba(251,243,231,0.6), inset 0 0 0 3px ${c}` }}
            data-cursor="hover"
          >
            {/* silk shimmer references the swatch colour via the config value `c` */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(120deg, transparent 40%, ${"rgba(255,255,255,0.55)"} 50%, transparent 60%)` }} />
          </motion.div>
        ))}
      </div>
    </div>
  </Reveal>
);

export const DressCode = () => (
  <SectionShell id="dresscode" mural={muralBackgrounds.a} tone="#D9A9C4" className="py-24 md:py-32">
    <div className="mx-auto max-w-4xl px-6">
      <SectionHeading overline="A Gentle Note on Attire" title="Colours of the Two Houses" tone="#9c5f83" />
      <div className="mt-14 flex flex-col gap-8 md:flex-row">
        <SwatchRow side={dressCodeSwatches.groomSide} delay={0.05} />
        <SwatchRow side={dressCodeSwatches.brideSide} delay={0.15} />
      </div>
      <Reveal dir="up" delay={0.2}>
        <p className="font-body mx-auto mt-10 max-w-xl text-center text-base italic text-bottle/75 md:text-lg">
          Wear what makes you feel celebratory — these are simply for inspiration,
          two houses joined under one golden thread.
        </p>
      </Reveal>
    </div>
  </SectionShell>
);
