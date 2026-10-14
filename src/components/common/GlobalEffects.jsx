"use client";

import Cursor from "@/components/skin/knk/Cursor";
import SmoothScroll from "@/components/skin/knk/SmoothScroll";

export default function GlobalEffects({ children }) {
  return (
    <SmoothScroll>
      <Cursor />
      {children}
    </SmoothScroll>
  );
}
