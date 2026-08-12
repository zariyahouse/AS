// TheCouple.jsx — two facing illuminated-manuscript portrait plates with 3D tilt.
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionShell, SectionHeading, Reveal } from "./Common";
import { couple, muralBackgrounds } from "../../config/weddingConfig";
import { RopeCircle, Laurel, Minnu } from "./Motifs";

const PortraitPlate = ({ person, tone, testid, delay = 0 }) => {
  const ref = useRef(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateX = useTransform(rx, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(ry, [-0.5, 0.5], [-8, 8]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <Reveal dir="up" delay={delay} className="flex-1">
      <motion.div
        ref={ref}
        data-testid={testid}
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onTouchStart={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative mx-auto max-w-sm"
      >
        {/* ornamental frame */}
        <div className="relative p-4" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}>
          <div className="pointer-events-none absolute inset-2 border" style={{ borderColor: tone + "66" }} />
          <RopeCircle className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] opacity-0 transition-opacity duration-500 group-hover:opacity-70 ambient-glow" />

          {/* photo */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={person.photo}
              alt={`${person.name} portrait`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${tone}cc)` }} />
            {/* light sweep on hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            {/* nameplate */}
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <p className="font-display text-3xl font-semibold text-ivory md:text-4xl">{person.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center text-center">
          <Laurel className="h-5 w-16" stroke={tone} />
          <p className="font-body mt-2 max-w-xs text-sm italic leading-relaxed text-bottle/75 md:text-base">
            {person.parents}
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
};

export const TheCouple = () => (
  <SectionShell id="couple" mural={muralBackgrounds.a} tone="#0B4A34" className="py-24 md:py-32">
    <div className="mx-auto max-w-5xl px-6">
      <SectionHeading overline="The Beloved" title="The Bridegroom & The Bride" tone="#0B4A34" />

      <div className="mt-16 flex flex-col items-stretch gap-12 md:flex-row md:gap-8">
        <PortraitPlate person={couple.groom} tone="#264D73" testid="couple-groom" delay={0.05} />
        {/* central Minnu motif linking the two */}
        <div className="flex items-center justify-center md:flex-col">
          <div className="hidden h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent md:block" />
          <Minnu className="my-4 h-16 w-16 ambient-glow" />
          <div className="hidden h-24 w-px bg-gradient-to-b from-transparent via-gold to-transparent md:block" />
        </div>
        <PortraitPlate person={couple.bride} tone="#0E5C57" testid="couple-bride" delay={0.15} />
      </div>
    </div>
  </SectionShell>
);
