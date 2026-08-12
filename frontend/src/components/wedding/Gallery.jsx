// Gallery.jsx — swipeable carousel driven by the galleryImages array.
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionShell, SectionHeading } from "./Common";
import { galleryImages, muralBackgrounds } from "../../config/weddingConfig";
import { CornerFlourish } from "./Motifs";

export const Gallery = () => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <SectionShell id="gallery" mural={muralBackgrounds.b} tone="#0B4A34" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading overline="Moments, Framed in Gold" title="The Gallery" tone="#0B4A34" />

        <div className="relative mt-16">
          <div className="overflow-hidden" ref={emblaRef} data-testid="gallery-carousel">
            <div className="flex">
              {galleryImages.map((src, i) => (
                <div key={i} className="min-w-0 shrink-0 grow-0 basis-[85%] px-3 md:basis-[60%]">
                  <div className="relative p-3" style={{ background: "var(--ivory)", boxShadow: "inset 0 0 0 1px rgba(184,134,11,0.4)" }}>
                    <CornerFlourish className="absolute left-1 top-1 h-8 w-8 opacity-60" />
                    <CornerFlourish className="absolute right-1 top-1 h-8 w-8 -scale-x-100 opacity-60" />
                    <CornerFlourish className="absolute bottom-1 left-1 h-8 w-8 -scale-y-100 opacity-60" />
                    <CornerFlourish className="absolute bottom-1 right-1 h-8 w-8 -scale-100 opacity-60" />
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={src} alt={`Abel and Merlyn — moment ${i + 1}`} loading="lazy"
                        className={`h-full w-full object-cover transition-all duration-700 ${selected === i ? "scale-100 grayscale-0" : "scale-105 grayscale"}`} />
                      <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 60px rgba(28,43,36,0.25)" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button data-testid="gallery-prev" data-cursor="hover" onClick={() => embla && embla.scrollPrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex items-center gap-2">
              {galleryImages.map((_, i) => (
                <button key={i} data-cursor="hover" onClick={() => embla && embla.scrollTo(i)}
                  className="h-2 w-2 rounded-full transition-all"
                  style={{ background: selected === i ? "#B8860B" : "rgba(184,134,11,0.3)", width: selected === i ? 20 : 8 }} />
              ))}
            </div>
            <button data-testid="gallery-next" data-cursor="hover" onClick={() => embla && embla.scrollNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
