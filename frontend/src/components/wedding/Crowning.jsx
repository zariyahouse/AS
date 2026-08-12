// Crowning.jsx — place two crowns on the couple (drag OR tap), then reveal.
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, GroomSilhouette, BrideSilhouette } from "./Motifs";
import { crowningReveal } from "../../config/weddingConfig";
import { chime, flourish } from "./sound";
import { GoldParticles } from "./Ambient";

const Silhouette = ({ who, crowned, onPlace }) => {
  const Body = who === "groom" ? GroomSilhouette : BrideSilhouette;
  return (
    <div
      data-crown-target={who}
      data-testid={`crowning-target-${who}`}
      data-cursor="hover"
      onClick={() => onPlace(who)}
      className="relative flex flex-col items-center"
    >
      <AnimatePresence>
        {crowned && (
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.6 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
            className="absolute -top-6 z-10"
          >
            <Crown className="h-10 w-16 ambient-glow" lit />
          </motion.div>
        )}
      </AnimatePresence>
      <Body className="h-52 w-28 md:h-60 md:w-32" lit={crowned} />
      <span className="font-accent mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-gold">
        {who === "groom" ? "The Groom" : "The Bride"}
      </span>
    </div>
  );
};

const DraggableCrown = ({ id, onDropTarget }) => {
  const controls = useRef(null);
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragMomentum={false}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      onDragEnd={(e, info) => {
        const el = document.elementFromPoint(info.point.x, info.point.y);
        const target = el && el.closest && el.closest("[data-crown-target]");
        if (target) onDropTarget(target.getAttribute("data-crown-target"), id);
      }}
      data-testid={`crowning-crown-${id}`}
      data-cursor="hover"
      className="cursor-grab active:cursor-grabbing"
    >
      <Crown className="h-12 w-16 ambient-glow" />
    </motion.div>
  );
};

export const Crowning = () => {
  const [crowned, setCrowned] = useState({ groom: false, bride: false });
  const [usedCrowns, setUsedCrowns] = useState([]);
  const bothDone = crowned.groom && crowned.bride;

  const place = (who, crownId) => {
    setCrowned((c) => {
      if (c[who]) return c;
      chime(who === "groom" ? 784 : 988, 0.6, "triangle");
      const next = { ...c, [who]: true };
      if (next.groom && next.bride) setTimeout(flourish, 250);
      return next;
    });
    if (crownId != null) setUsedCrowns((u) => (u.includes(crownId) ? u : [...u, crownId]));
  };

  // tap-to-place fallback: clicking a silhouette places the next crown
  const tapPlace = (who) => {
    const nextCrown = [0, 1].find((i) => !usedCrowns.includes(i));
    place(who, nextCrown);
  };

  return (
    <div className="relative mx-auto max-w-xl">
      <p className="font-body text-center text-sm italic text-bottle/70">
        Drag each crown onto the couple — or simply tap them — to begin the crowning.
      </p>

      {/* crowns to place */}
      <div className="mt-6 flex items-center justify-center gap-10">
        {[0, 1].map((id) =>
          usedCrowns.includes(id) ? (
            <div key={id} className="h-12 w-16 opacity-20"><Crown className="h-12 w-16" /></div>
          ) : (
            <DraggableCrown key={id} id={id} onDropTarget={(who, cid) => place(who, cid)} />
          )
        )}
      </div>

      {/* couple */}
      <div className="relative mt-8 flex items-end justify-center gap-8 md:gap-16">
        {bothDone && <GoldParticles count={26} zClass="z-0" />}
        <Silhouette who="groom" crowned={crowned.groom} onPlace={tapPlace} />
        <Silhouette who="bride" crowned={crowned.bride} onPlace={tapPlace} />
      </div>

      {/* reveal */}
      <AnimatePresence>
        {bothDone && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            data-testid="crowning-reveal"
            className="relative mt-10 p-6 text-center"
            style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}
          >
            <div className="pointer-events-none absolute inset-[6px] border border-gold/30" />
            <p className="font-display text-2xl italic leading-snug text-malachite md:text-3xl">
              {crowningReveal}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
