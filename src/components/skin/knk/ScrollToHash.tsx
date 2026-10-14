"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js doesn't scroll to the URL hash on route change — only real same-document
 * `<a href="#...">` clicks get that native browser behavior. This covers the cross-page case
 * (e.g. a "/#our-vision" link clicked from /treatments) by scrolling to the matching element
 * once the destination page has mounted.
 */
const ScrollToHash = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTarget = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (!hash) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const t1 = setTimeout(scrollToTarget, 80);
    const t2 = setTimeout(scrollToTarget, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
};

export default ScrollToHash;
