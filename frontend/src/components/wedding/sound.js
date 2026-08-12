// sound.js — tiny WebAudio helper for gentle chimes (no assets).
let ctx;
const getCtx = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const chime = (freq = 880, dur = 0.6, type = "sine") => {
  const c = getCtx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(c.destination);
  const now = c.currentTime;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  o.start(now);
  o.stop(now + dur + 0.05);
};

// a soft two-note flourish for completions
export const flourish = () => {
  chime(659, 0.5, "triangle");
  setTimeout(() => chime(880, 0.6, "triangle"), 130);
  setTimeout(() => chime(1174, 0.8, "sine"), 300);
};
