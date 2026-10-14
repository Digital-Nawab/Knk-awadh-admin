"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./Reveal";

/** Drives buttery smooth scroll physics site-wide; falls back to native scroll for reduced-motion users. */
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
};

export default SmoothScroll;
