// TheJourney.jsx — one flowing gold rope path; events emerge along it on scroll.
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SectionShell, SectionHeading, Reveal, GoldButton, CalendarMenu } from "./Common";
import { events, mapsUrl, muralBackgrounds } from "../../config/weddingConfig";
import { RingMotif, OilLamp, Crown } from "./Motifs";

const toneMap = {
  groom: { c: "#B37FA0", label: "#9c5f83" },
  bride: { c: "#0E5C57", label: "#0b4a46" },
};
const EventIcon = ({ k, tone }) => {
  if (k === "engagement") return <RingMotif className="h-10 w-10" stroke={tone} />;
  if (k === "wedding") return <Crown className="h-10 w-14" stroke={tone} />;
  return <OilLamp className="h-12 w-8" stroke={tone} />;
};

const JourneyEvent = ({ ev, idx }) => {
  const tone = toneMap[ev.thread];
  const flip = idx % 2 === 1;
  return (
    <Reveal dir={flip ? "right" : "left"} className="relative">
      <div className={`relative flex items-center gap-4 md:gap-8 ${flip ? "md:flex-row-reverse" : ""}`}>
        {/* mobile node icon on the left rail */}
        <div className="absolute -left-[52px] top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ivory md:hidden ambient-glow"
          style={{ boxShadow: "inset 0 0 0 1px rgba(232,211,153,0.6)" }}>
          <EventIcon k={ev.key} tone={tone.c} />
        </div>
        {/* content plate */}
        <div className={`w-full md:w-[46%] ${flip ? "md:text-right md:pr-2" : "md:pl-2"}`}>
          <div className="relative p-6 md:p-8" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.35), 0 24px 50px -34px rgba(28,43,36,0.55)" }}>
            <div className="pointer-events-none absolute inset-[6px] border" style={{ borderColor: tone.c + "44" }} />
            <span className="font-accent text-[0.65rem] uppercase tracking-[0.35em]" style={{ color: tone.label }}>{ev.label}</span>
            <h3 className="font-display mt-1 text-3xl font-semibold text-bottle md:text-4xl">{ev.title}</h3>
            <p className="font-accent mt-3 text-sm uppercase tracking-[0.2em] text-gold tnum">{ev.day}, {ev.date}</p>
            <p className="font-body text-sm italic text-bottle/70">{ev.time}</p>
            <div className="gold-hairline my-4" />
            <p className="font-display text-xl font-semibold text-malachite">{ev.venue}</p>
            <p className="font-body mt-1 text-sm leading-relaxed text-bottle/75">{ev.address}</p>
            <p className="font-body mt-1 text-xs uppercase tracking-wide text-bottle/50">Plus Code · {ev.plusCode}</p>
            <div className={`mt-5 flex flex-wrap items-center gap-3 ${flip ? "md:justify-end" : ""}`}>
              <GoldButton href={mapsUrl(ev.mapsQuery)} target="_blank" rel="noreferrer" testid={`journey-map-${ev.key}`} variant="solid" className="!px-4 !py-2 text-[0.6rem]">
                View on Maps
              </GoldButton>
              <CalendarMenu event={ev} tone={tone.c} testidPrefix={`journey-${ev.key}`} />
            </div>
          </div>
        </div>

        {/* centre node icon (desktop) */}
        <div className="relative z-10 hidden shrink-0 items-center justify-center md:flex">
          <div className="ambient-glow flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-ivory md:h-20 md:w-20"
            style={{ boxShadow: "inset 0 0 0 1px rgba(232,211,153,0.6)" }}>
            <EventIcon k={ev.key} tone={tone.c} />
          </div>
        </div>
        <div className="hidden md:block md:w-[46%]" />
      </div>
    </Reveal>
  );
};

export const TheJourney = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const fill = useTransform(p, [0.05, 0.9], [0, 1]);

  return (
    <SectionShell id="journey" mural={muralBackgrounds.a} tone="#0E5C57" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading overline="Two Days, One Covenant" title="The Journey" tone="#0E5C57" />

        <div ref={ref} className="relative mt-20">
          {/* central flowing rope path (fills on scroll) */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-[3px] -translate-x-1/2 md:block">
            <div className="absolute inset-0 rounded-full bg-gold/20" />
            <motion.div className="absolute left-0 top-0 w-full origin-top rounded-full"
              style={{ scaleY: fill, height: "100%", background: "linear-gradient(#E8D399,#B8860B)", boxShadow: "0 0 10px rgba(232,211,153,0.7)" }} />
          </div>
          {/* mobile rope on the left */}
          <div className="absolute left-[24px] top-0 bottom-0 w-[3px] md:hidden">
            <div className="absolute inset-0 rounded-full bg-gold/20" />
            <motion.div className="absolute left-0 top-0 w-full origin-top rounded-full"
              style={{ scaleY: fill, height: "100%", background: "linear-gradient(#E8D399,#B8860B)" }} />
          </div>

          <div className="flex flex-col gap-16 pl-14 md:gap-24 md:pl-0">
            {events.map((ev, i) => (
              <JourneyEvent key={ev.key} ev={ev} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
