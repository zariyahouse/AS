// InvitationNote.jsx — spiritual anchor: St. Thomas Cross + Hosea 2:19-20.
import React from "react";
import { motion } from "framer-motion";
import { SectionShell, Reveal } from "./Common";
import { StThomasCross } from "./Motifs";
import { hoseaVerse, couple, muralBackgrounds } from "../../config/weddingConfig";

export const InvitationNote = () => (
  <SectionShell id="invitation" mural={muralBackgrounds.b} tone="#B8860B" className="py-24 md:py-36">
    <div className="mx-auto max-w-3xl px-6 text-center">
      <Reveal dir="scale">
        <StThomasCross className="mx-auto h-44 w-28 ambient-glow md:h-56 md:w-36" />
      </Reveal>

      <Reveal dir="up" delay={0.1}>
        <p className="font-accent mt-8 text-xs uppercase tracking-[0.4em] text-gold md:text-sm">An Invitation</p>
      </Reveal>

      <Reveal dir="up" delay={0.16}>
        <p className="font-body mt-6 text-lg leading-relaxed text-bottle/85 md:text-xl">
          With hearts full of gratitude and with the blessings of our families,
          we invite you to witness and bless the covenant of holy matrimony
          between <span className="font-display italic text-malachite">{couple.groom.name}</span> and{" "}
          <span className="font-display italic text-malachite">{couple.bride.name}</span>.
        </p>
      </Reveal>

      {/* Hosea verse — set as illuminated display type, not a plain quote-block */}
      <Reveal dir="up" delay={0.24}>
        <figure className="relative mx-auto mt-14 max-w-2xl">
          <span className="font-display absolute -left-2 -top-8 text-7xl leading-none text-gold/30 md:text-8xl">“</span>
          <blockquote className="font-display text-2xl italic leading-snug text-bottle sm:text-3xl md:text-4xl">
            {hoseaVerse.text}
          </blockquote>
          <span className="font-display absolute -bottom-14 right-0 text-7xl leading-none text-gold/30 md:text-8xl">”</span>
          <figcaption className="font-accent mt-8 text-sm uppercase tracking-[0.3em] text-gold">
            — {hoseaVerse.ref}
          </figcaption>
        </figure>
      </Reveal>

      <Reveal dir="up" delay={0.3}>
        <motion.p className="font-body mt-12 text-base italic text-bottle/70 md:text-lg">
          Invited with love, by our families.
        </motion.p>
      </Reveal>
    </div>
  </SectionShell>
);
