// Interactive.jsx — three inline moments, played in place as the guest scrolls.
import React from "react";
import { SectionShell, SectionHeading, Reveal } from "./Common";
import { MuralDivider } from "./Motifs";
import { muralBackgrounds } from "../../config/weddingConfig";
import { Crowning } from "./Crowning";
import { LightLamps } from "./LightLamps";
import { Jigsaw } from "./Jigsaw";

const Moment = ({ index, overline, title, children, tone }) => (
  <div className="mx-auto max-w-3xl">
    <Reveal dir="up">
      <div className="flex flex-col items-center text-center">
        <span className="font-display text-5xl text-gold/40 tnum">{index}</span>
        <span className="font-accent mt-2 text-[0.65rem] uppercase tracking-[0.35em]" style={{ color: tone }}>{overline}</span>
        <h3 className="font-display mt-1 text-3xl font-semibold text-bottle md:text-4xl">{title}</h3>
        <MuralDivider className="mx-auto mt-4 h-6 w-52 opacity-70" stroke={tone} />
      </div>
    </Reveal>
    <div className="mt-10">{children}</div>
  </div>
);

export const Interactive = () => (
  <SectionShell id="moments" mural={muralBackgrounds.b} tone="#B8860B" className="py-24 md:py-32">
    <div className="mx-auto max-w-5xl px-6">
      <SectionHeading overline="Play, Linger, Smile" title="A Little Moment" tone="#B8860B" />

      <div className="mt-20 flex flex-col gap-28">
        <Moment index="I" overline="The Sacrament of Crowning" title="Crown the Beloved" tone="#B8860B">
          <Crowning />
        </Moment>
        <Moment index="II" overline="A Verse Uncovered by Light" title="Light the Lamps" tone="#0E5C57">
          <LightLamps />
        </Moment>
        <Moment index="III" overline="Piece Together Our Joy" title="Piece It Together" tone="#264D73">
          <Jigsaw />
        </Moment>
      </div>
    </div>
  </SectionShell>
);
