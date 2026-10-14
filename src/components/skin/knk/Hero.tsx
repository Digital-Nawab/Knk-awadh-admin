"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EASE, Magnetic, usePrefersReducedMotion } from "./Reveal";
import { BOOK_CONSULTATION_HASH } from "./brand";
import { IMG } from "./images";

/** Hero background rotation — 2 static images + 1 video, in this order. */
const SLIDES = [
  { type: "image" as const, src: IMG.hero, alt: "Close portrait of luminous, healthy skin", position: "object-[60%_center]" },
  { type: "video" as const, src: IMG.heroVideo, alt: "A skincare treatment in motion", position: "object-center" },
  { type: "image" as const, src: IMG.hero2, alt: "Editorial portrait with natural, glowing skin", position: "object-center" },
];

const SLIDE_DURATION = 6000;

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const reducedMotion = usePrefersReducedMotion();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const active = SLIDES[slide];

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-secondary text-secondary-foreground grain"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <AnimatePresence mode="sync">
          {active.type === "video" ? (
            <motion.video
              key={slide}
              src={active.src}
              poster={IMG.heroVideoPoster}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 h-[118%] w-full object-cover ${active.position}`}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: slide === 0 ? 0.9 : 0, ease: EASE }}
            />
          ) : (
            <motion.img
              key={slide}
              src={active.src}
              alt={active.alt}
              fetchPriority={slide === 0 ? "high" : undefined}
              className={`absolute inset-0 h-[118%] w-full object-cover ${active.position}`}
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: slide === 0 ? 0.9 : 0, ease: EASE }}
            />
          )}
        </AnimatePresence>

        <div className="absolute bottom-6 left-6 z-10 hidden gap-2 md:flex">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-lux ${
                i === slide ? "w-6 bg-gold" : "w-1.5 bg-background/40 hover:bg-background/70"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-36 md:px-10 md:pb-24"
      >
        <h1 className="display max-w-[16ch] text-[13vw] uppercase leading-[0.9] sm:text-[9vw] lg:text-[6.4vw]">
          {["Advanced Aesthetics", "& Wellness"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "text-gold" : "text-secondary-foreground"}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1.25 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 border-t border-background/15 pt-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: EASE }}
            className="max-w-md"
          >
            <p className="font-sans text-xl font-medium leading-snug text-background/90 md:text-2xl">
              Skin, Hair, Injectables &amp; Longevity
            </p>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              All thoughtfully brought together under one roof, guided by specialist skin doctors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.85, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <a
                href="#our-treatments"
                className="group inline-flex items-center justify-between gap-8 border border-background/30 px-7 py-4 label-xs text-background transition-colors duration-500 ease-lux hover:bg-background hover:text-foreground"
              >
                Explore Treatments
                <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href={BOOK_CONSULTATION_HASH}
                className="group inline-flex items-center justify-between gap-8 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
              >
                Book a Consultation
                <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.span
        className="label-xs absolute bottom-6 right-6 hidden text-background/40 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        Scroll
      </motion.span>
    </section>
  );
};

export default Hero;
