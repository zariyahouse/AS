// AmbientMusic.jsx — a soft, reverent WebAudio pad (harmonium-like) that the
// guest can toggle on; its volume gently fades IN as they scroll deeper.
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// build a warm, slow chord pad in D — no external audio file needed
const buildGraph = (ctx) => {
  const master = ctx.createGain();
  master.gain.value = 0.0001;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1150;
  lp.Q.value = 0.4;
  lp.connect(master);
  master.connect(ctx.destination);

  // reverent open chord (D2/A2/D3/F#3/A3) + a soft high shimmer
  const freqs = [73.42, 110.0, 146.83, 185.0, 220.0, 293.66];
  const oscs = freqs.map((f, i) => {
    const o = ctx.createOscillator();
    o.type = i % 2 === 0 ? "sine" : "triangle";
    o.frequency.value = f;
    o.detune.value = (i - 2) * 3; // gentle chorus-like spread
    const g = ctx.createGain();
    g.gain.value = 0.14 / (1 + i * 0.35);
    o.connect(g);
    g.connect(lp);
    o.start();
    return o;
  });

  // slow breathing swell on the master
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.015;
  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfo.start();

  return { master, oscs, lfo };
};

export const AmbientMusic = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const graphRef = useRef(null);
  const targetRef = useRef(0); // scroll-driven base volume

  const scrollVolume = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    // very soft; fades in from near-silent at top to a gentle presence deeper down
    return 0.035 + p * 0.19;
  };

  useEffect(() => {
    const onScroll = () => {
      targetRef.current = scrollVolume();
      const ctx = ctxRef.current, g = graphRef.current;
      if (playing && ctx && g) g.master.gain.setTargetAtTime(targetRef.current, ctx.currentTime, 1.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [playing]);

  const toggle = () => {
    if (!playing) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      let ctx = ctxRef.current;
      if (!ctx) { ctx = new AC(); ctxRef.current = ctx; graphRef.current = buildGraph(ctx); }
      if (ctx.state === "suspended") ctx.resume();
      targetRef.current = scrollVolume();
      graphRef.current.master.gain.cancelScheduledValues(ctx.currentTime);
      graphRef.current.master.gain.setTargetAtTime(targetRef.current, ctx.currentTime, 2.2); // slow fade-in
      setPlaying(true);
    } else {
      const ctx = ctxRef.current, g = graphRef.current;
      if (ctx && g) g.master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.6);
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      data-testid="music-toggle"
      data-cursor="hover"
      aria-label={playing ? "Turn off ambient music" : "Turn on ambient music"}
      aria-pressed={playing}
      className="group fixed bottom-5 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ivory/80 backdrop-blur-md transition-colors hover:bg-gold/10 md:bottom-6 md:left-6"
      style={{ boxShadow: "inset 0 0 0 1px rgba(232,211,153,0.55), 0 10px 24px -14px rgba(28,43,36,0.6)" }}
    >
      <span className={`pointer-events-none absolute inset-0 rounded-full ${playing ? "ambient-glow" : ""}`} />
      <AnimatePresence mode="wait" initial={false}>
        {playing ? (
          <motion.span key="on" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            className="flex items-end gap-[3px]" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span key={i} className="w-[3px] rounded-full bg-gold"
                animate={{ height: [5, 15, 8, 17, 6] }}
                transition={{ duration: 1.1 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }} />
            ))}
          </motion.span>
        ) : (
          <motion.svg key="off" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#B8860B" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 18V6l10-2v12" /><circle cx="6" cy="18" r="3" /><circle cx="16" cy="16" r="3" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
};
