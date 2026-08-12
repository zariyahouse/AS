// Guestbook.jsx — leave a blessing; entries flow below in manuscript style.
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, SectionHeading, Reveal, GoldButton } from "./Common";
import { getBlessings, submitBlessing } from "../../lib/api";
import { muralBackgrounds } from "../../config/weddingConfig";
import { Quill } from "./ExtraMotifs";
import { chime } from "./sound";

export const Guestbook = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    try { setItems(await getBlessings()); } catch { /* silent */ }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) { setErr("A name and a blessing, please."); return; }
    setBusy(true); setErr("");
    try {
      const created = await submitBlessing(name.trim(), message.trim());
      setItems((it) => [created, ...it]);
      setName(""); setMessage("");
      chime(880, 0.5, "triangle");
    } catch (e2) { setErr(e2.message || "Could not post."); }
    setBusy(false);
  };

  return (
    <SectionShell id="guestbook" mural={muralBackgrounds.b} tone="#B8860B" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading overline="Write Us Into Memory" title="Blessings & Wishes" tone="#B8860B" />

        <Reveal dir="up" delay={0.1}>
          <form onSubmit={submit} data-testid="guestbook-form"
            className="relative mx-auto mt-14 max-w-2xl p-8" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}>
            <div className="pointer-events-none absolute inset-[7px] border border-gold/25" />
            <Quill className="absolute right-6 top-5 h-10 w-10 opacity-60" />
            <input
              data-testid="guestbook-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="font-body w-full border-b border-gold/40 bg-transparent py-2 text-lg text-bottle outline-none placeholder:text-bottle/35 focus:border-gold"
            />
            <textarea
              data-testid="guestbook-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a blessing for Abel & Merlyn…"
              rows={3}
              className="font-body mt-4 w-full resize-none border-b border-gold/40 bg-transparent py-2 text-base text-bottle outline-none placeholder:text-bottle/35 focus:border-gold"
            />
            {err && <p className="font-body mt-3 text-sm italic text-oxblood">{err}</p>}
            <div className="mt-6">
              <GoldButton testid="guestbook-submit" variant="solid">{busy ? "Sending…" : "Offer a Blessing"}</GoldButton>
            </div>
          </form>
        </Reveal>

        {/* flowing blessings */}
        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3" data-testid="guestbook-list">
          <AnimatePresence>
            {items.map((b) => (
              <motion.figure
                key={b.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 break-inside-avoid p-5"
                style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.3)" }}
              >
                <span className="font-display text-4xl leading-none text-gold/40">“</span>
                <blockquote className="font-body -mt-3 text-base italic leading-relaxed text-bottle/85">{b.message}</blockquote>
                <figcaption className="font-accent mt-3 text-[0.65rem] uppercase tracking-[0.22em] text-malachite">— {b.name}</figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <p className="font-body col-span-full text-center text-base italic text-bottle/55">
              Be the first to leave a blessing.
            </p>
          )}
        </div>
      </div>
    </SectionShell>
  );
};
