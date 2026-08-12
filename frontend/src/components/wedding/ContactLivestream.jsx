// ContactLivestream.jsx — contact numbers + livestream placeholder.
import React from "react";
import { SectionShell, SectionHeading, Reveal, GoldButton } from "./Common";
import { contacts, livestream, muralBackgrounds } from "../../config/weddingConfig";
import { RopeLine } from "./Motifs";

export const Contact = () => (
  <SectionShell id="contact" mural={muralBackgrounds.a} tone="#264D73" className="py-24 md:py-28">
    <div className="mx-auto max-w-3xl px-6">
      <SectionHeading overline="For Any Assistance" title="Contact & Queries" tone="#264D73" />
      <div className="mt-14 flex flex-col items-stretch justify-center gap-6 md:flex-row">
        {contacts.map((c, i) => (
          <Reveal key={i} dir="up" delay={i * 0.08} className="flex-1">
            <div className="relative p-6 text-center" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.35)" }}>
              <p className="font-accent text-[0.65rem] uppercase tracking-[0.25em] text-gold">{c.name}</p>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`} data-cursor="hover"
                className="font-display mt-2 block text-2xl font-semibold text-malachite transition-colors hover:text-gold tnum">
                {c.phone}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SectionShell>
);

export const Livestream = () => (
  <SectionShell id="livestream" mural={muralBackgrounds.b} tone="#0E5C57" particles={false} className="py-20 md:py-24">
    <div className="mx-auto max-w-2xl px-6 text-center">
      <SectionHeading overline="Near or Far, Be With Us" title="The Livestream" tone="#0E5C57" />
      <Reveal dir="up" delay={0.1}>
        <div className="relative mx-auto mt-12 max-w-lg p-8" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.35)" }}>
          <div className="pointer-events-none absolute inset-[7px] border border-gold/25" />
          {livestream.url ? (
            <GoldButton href={livestream.url} target="_blank" rel="noreferrer" testid="livestream-link" variant="solid">
              Watch the Ceremony
            </GoldButton>
          ) : (
            <>
              <RopeLine className="mx-auto h-3 w-40 opacity-60" />
              <p className="font-body mt-5 text-base italic text-bottle/75" data-testid="livestream-placeholder">
                {livestream.note}
              </p>
            </>
          )}
        </div>
      </Reveal>
    </div>
  </SectionShell>
);
