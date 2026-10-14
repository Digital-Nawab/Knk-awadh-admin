"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "./Reveal";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input[type='submit'], input[type='button'], select, [data-cursor-hover]";

/** Subtle gold dot + ring cursor. Desktop (fine pointer) only; renders nothing on touch, reduced-motion, or admin dashboard. */
const Cursor = () => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(query.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled || reducedMotion || isAdmin) {
      document.documentElement.classList.remove("custom-cursor");
      return;
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.documentElement.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled, reducedMotion, isAdmin, x, y]);

  if (!enabled || reducedMotion || isAdmin) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#C9A24A]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[#C9A24A]/70 shadow-xs"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 48 : 28, height: hovering ? 48 : 28, opacity: hovering ? 0.95 : 0.6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
};

export default Cursor;
