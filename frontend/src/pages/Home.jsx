// Home.jsx — the one-page experience, assembled with Lenis + ambient layers.
import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { MouseProvider, CustomCursor } from "../components/wedding/Ambient";
import { GoldenThread, TwoRings } from "../components/wedding/ScrollMotifs";
import { StickyNav } from "../components/wedding/Nav";
import { Hero } from "../components/wedding/Hero";
import { InvitationNote } from "../components/wedding/InvitationNote";
import { TheCouple } from "../components/wedding/TheCouple";
import { TheJourney } from "../components/wedding/TheJourney";
import { Countdown } from "../components/wedding/Countdown";
import { DressCode } from "../components/wedding/DressCode";
import { Gallery } from "../components/wedding/Gallery";
import { Interactive } from "../components/wedding/Interactive";
import { Rsvp } from "../components/wedding/Rsvp";
import { Guestbook } from "../components/wedding/Guestbook";
import { Contact, Livestream } from "../components/wedding/ContactLivestream";
import { Footer } from "../components/wedding/Footer";
import { AmbientMusic } from "../components/wedding/AmbientMusic";
import { sectionVisibility } from "../config/weddingConfig";

export default function Home() {
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef();

  useEffect(() => {
    const l = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 });
    setLenis(l);
    if (typeof window !== "undefined") window.__lenis = l;
    document.body.classList.add("hide-cursor");
    const raf = (t) => { l.raf(t); rafRef.current = requestAnimationFrame(raf); };
    rafRef.current = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafRef.current); l.destroy(); document.body.classList.remove("hide-cursor"); };
  }, []);

  return (
    <MouseProvider>
      <CustomCursor />
      <GoldenThread />
      <TwoRings />
      <StickyNav lenis={lenis} />
      <AmbientMusic />

      <main>
        <Hero />
        <InvitationNote />
        <TheCouple />
        <TheJourney />
        <Countdown />
        {sectionVisibility.dressCode && <DressCode />}
        <Gallery />
        <Interactive />
        {sectionVisibility.rsvp && <Rsvp />}
        <Guestbook />
        {sectionVisibility.contact && <Contact />}
        {sectionVisibility.livestream && <Livestream />}
        <Footer />
      </main>
    </MouseProvider>
  );
}
