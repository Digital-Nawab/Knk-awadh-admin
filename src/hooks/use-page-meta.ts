"use client";

import { useEffect } from "react";

/** Sets document.title and the meta description tag for the current page — basic per-route SEO. */
export const usePageMeta = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
};
