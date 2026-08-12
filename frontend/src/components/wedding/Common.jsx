// Common.jsx — reusable shell, reveal, headings, buttons, calendar menu.
import React, { useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useMouseParallax, GoldParticles } from "./Ambient";
import { CornerFlourish, MuralDivider, Bloom } from "./Motifs";
import { googleCalUrl, buildIcs } from "../../config/weddingConfig";

// -------- Direction-aware scroll reveal --------
const dirVariants = {
  up: { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -48 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } },
};

export const Reveal = ({ children, dir = "up", delay = 0, className = "", once = true }) => (
  <motion.div
    className={className}
    variants={dirVariants[dir]}
    initial="hidden"
    whileInView="show"
    viewport={{ once, amount: 0.25 }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// -------- Mural background layer with mouse parallax --------
const MuralLayer = ({ url, opacity = 0.09, depth = 20 }) => {
  const ctx = useMouseParallax();
  const x = useTransform(ctx?.mx ?? { get: () => 0 }, (v) => (v || 0) * depth);
  const y = useTransform(ctx?.my ?? { get: () => 0 }, (v) => (v || 0) * depth);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        x, y,
        scale: 1.1,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity,
        filter: "sepia(0.6) saturate(0.7) contrast(0.9)",
        mixBlendMode: "multiply",
      }}
    />
  );
};

// -------- Section shell: never-empty, layered background --------
export const SectionShell = ({ id, mural, particles = true, corners = true, className = "", children, tone = "#B8860B" }) => (
  <section
    id={id}
    className={`relative isolate overflow-hidden ${className}`}
    style={{ backgroundColor: "var(--ivory)" }}
  >
    {mural && <MuralLayer url={mural} />}
    {/* radial vignette + warm glow so nothing is flat */}
    <div className="pointer-events-none absolute inset-0 z-0"
      style={{ background: `radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.5), transparent 55%), radial-gradient(100% 60% at 50% 120%, ${tone}22, transparent 60%)` }} />
    {particles && <GoldParticles count={16} />}
    {corners && (
      <>
        <CornerFlourish className="absolute left-3 top-3 z-[3] h-16 w-16 opacity-40 md:h-24 md:w-24" stroke={tone} />
        <CornerFlourish className="absolute right-3 top-3 z-[3] h-16 w-16 -scale-x-100 opacity-40 md:h-24 md:w-24" stroke={tone} />
        <CornerFlourish className="absolute bottom-3 left-3 z-[3] h-16 w-16 -scale-y-100 opacity-40 md:h-24 md:w-24" stroke={tone} />
        <CornerFlourish className="absolute bottom-3 right-3 z-[3] h-16 w-16 -scale-100 opacity-40 md:h-24 md:w-24" stroke={tone} />
      </>
    )}
    <div className="relative z-10">{children}</div>
  </section>
);

// -------- Overline + title heading --------
export const SectionHeading = ({ overline, title, tone = "#B8860B", light = false }) => (
  <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
    {overline && (
      <Reveal dir="down">
        <span className="font-accent text-xs uppercase tracking-[0.4em] md:text-sm"
          style={{ color: tone }}>{overline}</span>
      </Reveal>
    )}
    <Reveal dir="up" delay={0.08}>
      <h2 className={`font-display mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${light ? "text-ivory" : "text-bottle"}`}>
        {title}
      </h2>
    </Reveal>
    <Reveal dir="scale" delay={0.16}>
      <MuralDivider className="mx-auto mt-5 h-8 w-64 md:w-80 ambient-glow" stroke={tone} />
    </Reveal>
  </div>
);

// -------- Gold outlined button --------
export const GoldButton = ({ children, onClick, href, as, className = "", testid, variant = "solid", ...rest }) => {
  const base =
    "group relative inline-flex items-center justify-center gap-2 font-accent text-xs uppercase tracking-[0.2em] px-6 py-3 transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "text-ivory bg-gradient-to-b from-[#C9A15D] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8a6608]"
      : "text-[#8a6608] hover:text-[#B8860B] bg-transparent";
  const cls = `${base} ${styles} ${className}`;
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 border border-[#B8860B]/60" />
      <span className="pointer-events-none absolute inset-[3px] border border-[#E8D399]/40" />
      <span className="relative">{children}</span>
    </>
  );
  if (href)
    return (
      <a href={href} data-testid={testid} data-cursor="hover" className={cls} target={rest.target} rel={rest.rel}>
        {inner}
      </a>
    );
  return (
    <button onClick={onClick} data-testid={testid} data-cursor="hover" className={cls} {...rest}>
      {inner}
    </button>
  );
};

// -------- Add to Calendar menu (gold linework, Google / Apple) --------
export const CalendarMenu = ({ event, tone = "#B8860B", testidPrefix }) => {
  const [open, setOpen] = useState(false);

  const downloadIcs = () => {
    const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.key}-abel-merlyn.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        data-testid={`${testidPrefix}-addcal-btn`}
        data-cursor="hover"
        onClick={() => setOpen((o) => !o)}
        className="font-accent inline-flex items-center gap-2 border border-[#B8860B]/60 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#8a6608] transition-colors hover:bg-[#B8860B]/10"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke={tone} strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="17" rx="1.5" /><path d="M3 9h18M8 2v4M16 2v4M12 12v5M9.5 14.5h5" />
        </svg>
        Add to Calendar
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute left-1/2 z-30 mt-2 w-48 -translate-x-1/2 border border-[#B8860B]/50 bg-ivory p-1.5 shadow-[0_20px_40px_-20px_rgba(28,43,36,0.6)]"
            style={{ boxShadow: "inset 0 0 0 1px rgba(232,211,153,0.5)" }}
          >
            <a
              data-testid={`${testidPrefix}-cal-google`}
              href={googleCalUrl(event)}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              onClick={() => setOpen(false)}
              className="font-accent flex items-center gap-2 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-bottle transition-colors hover:bg-[#B8860B]/10"
            >
              <Bloom className="h-4 w-4" stroke={tone} active /> Google
            </a>
            <div className="gold-hairline mx-2 my-1" />
            <button
              data-testid={`${testidPrefix}-cal-apple`}
              data-cursor="hover"
              onClick={downloadIcs}
              className="font-accent flex w-full items-center gap-2 px-3 py-2 text-left text-[0.65rem] uppercase tracking-[0.18em] text-bottle transition-colors hover:bg-[#B8860B]/10"
            >
              <Bloom className="h-4 w-4" stroke={tone} active /> Apple / Outlook
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};
