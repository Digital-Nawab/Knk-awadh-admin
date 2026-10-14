"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal, usePrefersReducedMotion } from "./Reveal";
import { TESTIMONIALS } from "@/content/testimonials";

/** Horizontal snap-scroll carousel (drag/swipe or the arrow buttons) instead of a static grid. */
const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 380) + 32;
    track.scrollBy({ left: dir * step, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section id="testimonials" className="overflow-hidden bg-muted py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[9vw] uppercase leading-[0.92] sm:text-[6vw] lg:text-[3.6vw]">
              What our clients are saying
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="hidden gap-3 md:flex">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollByCard(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-500 ease-lux hover:border-[#6B4324] hover:bg-[#6B4324] hover:text-secondary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollByCard(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors duration-500 ease-lux hover:border-[#6B4324] hover:bg-[#6B4324] hover:text-secondary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </Reveal>
        </div>

        <div
          ref={trackRef}
          role="region"
          aria-label="Client testimonials"
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2"
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={0.05 + i * 0.05}
              className="shrink-0 snap-start basis-[85%] sm:basis-[55%] lg:basis-[31%]"
            >
              <figure data-card className="flex h-full flex-col border border-border bg-card p-8">
                <Quote className="h-7 w-7 text-[hsl(var(--gold))]" strokeWidth={1.5} aria-hidden />
                <p className="mt-5 font-sans text-xl font-medium leading-snug text-primary">
                  &ldquo;{t.pullQuote}&rdquo;
                </p>
                <p className="mt-5 flex-1 text-sm leading-loose text-muted-foreground">{t.body}</p>
                <figcaption className="label-xs mt-6 border-t border-border pt-5 text-foreground/70">
                  — {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
