"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** True when the user has requested reduced motion at the OS/browser level. */
export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
};

export const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.05 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/**
 * Image that unmasks with a clip-path wipe and settles from a slight scale.
 * Pass `parallax` for a subtle scroll-linked drift on top of the reveal (skipped
 * when the user prefers reduced motion).
 */
export const RevealImage = ({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  parallax = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  parallax?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !reducedMotion ? ["-4%", "4%"] : ["0%", "0%"]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20px 0px", amount: 0.05 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={parallax ? { y } : undefined}
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
      />
    </motion.div>
  );
};

/** Section eyebrow: number + label */
export const Eyebrow = ({ index, children }: { index: string; children: ReactNode }) => (
  <div className="flex items-center gap-4">
    <span className="label-xs text-gold">{index}</span>
    <span className="h-px w-8 bg-gold/50" />
    <span className="label-xs text-muted-foreground">{children}</span>
  </div>
);

/** Wraps a child so it pulls toward the cursor on hover, springing back on leave. Skipped on touch and reduced-motion. */
export const Magnetic = ({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.5 });

  const disabled =
    reducedMotion ||
    (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={disabled ? undefined : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

/** Animates a number counting up from 0 once it scrolls into view. Renders the static value when reduced motion is preferred. */
export const CountUp = ({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, duration, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
};

export { EASE };
