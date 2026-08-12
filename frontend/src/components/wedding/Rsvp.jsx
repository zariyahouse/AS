// Rsvp.jsx — Name + Guest Count; celebratory crown confirmation.
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, SectionHeading, Reveal, GoldButton } from "./Common";
import { submitRsvp } from "../../lib/api";
import { muralBackgrounds, couple } from "../../config/weddingConfig";
import { Crown, RopeCircle } from "./Motifs";
import { GoldParticles } from "./Ambient";
import { flourish } from "./sound";

export const Rsvp = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setErr("Kindly share your name."); return; }
    setStatus("loading"); setErr("");
    try {
      await submitRsvp(name.trim(), Number(count));
      setStatus("done");
      flourish();
    } catch (e2) {
      setErr(e2.message || "Something went wrong."); setStatus("error");
    }
  };

  return (
    <SectionShell id="rsvp" mural={muralBackgrounds.a} tone="#0B4A34" className="py-24 md:py-32">
      <div className="mx-auto max-w-xl px-6">
        <SectionHeading overline="Grace Us With Your Presence" title="Kindly Respond" tone="#0B4A34" />

        <Reveal dir="up" delay={0.1}>
          <div className="relative mt-14 p-8 md:p-10" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}>
            <div className="pointer-events-none absolute inset-[7px] border border-gold/25" />
            <AnimatePresence mode="wait">
              {status !== "done" ? (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -10 }} className="relative space-y-6" data-testid="rsvp-form">
                  <div>
                    <label className="font-accent text-[0.65rem] uppercase tracking-[0.25em] text-gold">Your Name</label>
                    <input
                      data-testid="rsvp-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="font-body mt-2 w-full border-b border-gold/40 bg-transparent py-2 text-lg text-bottle outline-none placeholder:text-bottle/35 focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="font-accent text-[0.65rem] uppercase tracking-[0.25em] text-gold">Number of Guests</label>
                    <div className="mt-3 flex items-center gap-4">
                      <button type="button" data-testid="rsvp-minus" data-cursor="hover"
                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                        className="flex h-10 w-10 items-center justify-center border border-gold/50 text-xl text-gold transition-colors hover:bg-gold/10">−</button>
                      <span data-testid="rsvp-count" className="font-display tnum w-10 text-center text-3xl font-semibold text-malachite">{count}</span>
                      <button type="button" data-testid="rsvp-plus" data-cursor="hover"
                        onClick={() => setCount((c) => Math.min(50, c + 1))}
                        className="flex h-10 w-10 items-center justify-center border border-gold/50 text-xl text-gold transition-colors hover:bg-gold/10">+</button>
                    </div>
                  </div>
                  {err && <p className="font-body text-sm italic text-oxblood" data-testid="rsvp-error">{err}</p>}
                  <GoldButton testid="rsvp-submit" variant="solid" className="w-full" as="button">
                    {status === "loading" ? "Sending…" : "Accept With Joy"}
                  </GoldButton>
                </motion.form>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative flex flex-col items-center py-6 text-center" data-testid="rsvp-confirmation">
                  <GoldParticles count={24} zClass="z-0" />
                  <div className="relative">
                    <RopeCircle className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] ambient-glow" />
                    <Crown className="h-16 w-24 ambient-glow" lit />
                  </div>
                  <p className="font-display mt-6 text-3xl font-semibold text-malachite md:text-4xl">A crown awaits you.</p>
                  <p className="font-body mt-3 max-w-sm text-base italic text-bottle/75">
                    Thank you, {name.split(" ")[0]}. Your place at {couple.groom.short} &amp; {couple.bride.short}’s celebration is joyfully reserved.
                  </p>
                  <button data-testid="rsvp-reset" data-cursor="hover" onClick={() => { setStatus("idle"); setName(""); setCount(1); }}
                    className="font-accent mt-6 text-[0.65rem] uppercase tracking-[0.25em] text-gold underline-offset-4 hover:underline">
                    Respond for someone else
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};
