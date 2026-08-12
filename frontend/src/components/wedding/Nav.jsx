// Nav.jsx — slim gold wayfinding ribbon, config-driven, appears after hero.
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildNavLinks } from "../../config/weddingConfig";
import { RopeLine } from "./Motifs";

export const StickyNav = ({ lenis }) => {
  const [show, setShow] = useState(false);
  const links = buildNavLinks();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50"
          data-testid="sticky-nav"
        >
          <div className="relative border-b border-[#B8860B]/30 bg-ivory/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
              <button
                data-testid="nav-monogram"
                data-cursor="hover"
                onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
                className="font-display text-lg font-semibold tracking-tight text-malachite"
              >
                A<span className="text-gold">&amp;</span>M
              </button>
              <ul className="flex items-center gap-1 sm:gap-2">
                {links.map((l) => (
                  <li key={l.id}>
                    <button
                      data-testid={`nav-link-${l.id}`}
                      data-cursor="hover"
                      onClick={() => go(l.id)}
                      className="font-accent px-2 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-bottle/80 transition-colors hover:text-gold sm:text-[0.7rem]"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <RopeLine className="h-1.5 w-full opacity-50" />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
