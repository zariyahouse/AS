// LightLamps.jsx — tap oil lamps to progressively illuminate the verse.
import React, { useState } from "react";
import { motion } from "framer-motion";
import { OilLamp } from "./Motifs";
import { songOfSolomon } from "../../config/weddingConfig";
import { chime } from "./sound";

export const LightLamps = () => {
  const segs = songOfSolomon.segments;
  const [lit, setLit] = useState(Array(segs.length).fill(false));
  const allLit = lit.every(Boolean);

  const light = (i) => {
    if (lit[i]) return;
    chime(523 + i * 90, 0.7, "sine");
    setLit((l) => l.map((v, idx) => (idx === i ? true : v)));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-body text-center text-sm italic text-bottle/70">
        Light each lamp to let the words rise out of the shadow.
      </p>

      {/* lamps */}
      <div className="mt-8 flex items-end justify-center gap-3 md:gap-6">
        {segs.map((_, i) => (
          <button
            key={i}
            data-testid={`lamp-${i}`}
            data-cursor="hover"
            onClick={() => light(i)}
            className="transition-transform hover:-translate-y-1"
            aria-label={`Light lamp ${i + 1}`}
          >
            <OilLamp className="h-24 w-14 md:h-28 md:w-16" lit={lit[i]} />
          </button>
        ))}
      </div>

      {/* verse — segments illuminate as lamps light */}
      <div className="relative mt-10 px-4 text-center" data-testid="lamps-verse">
        <p className="font-display text-2xl italic leading-relaxed md:text-3xl">
          {segs.map((s, i) => (
            <motion.span
              key={i}
              animate={{
                opacity: lit[i] ? 1 : 0.08,
                color: lit[i] ? "#0B4A34" : "#1C2B24",
                textShadow: lit[i] ? "0 0 18px rgba(232,211,153,0.7)" : "none",
              }}
              transition={{ duration: 1 }}
              className="inline"
            >
              {s}{" "}
            </motion.span>
          ))}
        </p>
        <motion.p
          animate={{ opacity: allLit ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="font-accent mt-6 text-sm uppercase tracking-[0.3em] text-gold"
        >
          — {songOfSolomon.ref}
        </motion.p>
      </div>
    </div>
  );
};
