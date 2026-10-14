"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Search } from "lucide-react";
import { CATEGORY_ICON } from "./categoryIcons";

interface CatalogueNavProps {
  categories: { slug: string; title: string }[];
  query: string;
  onQueryChange: (query: string) => void;
}

/** Sticky quick-jump chip row + search box for a long treatment catalogue page, with scroll-spy on the chips. */
const CatalogueNav = ({ categories, query, onQueryChange }: CatalogueNavProps) => {
  const [active, setActive] = useState<string>(categories[0]?.slug ?? "");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // Re-observe whenever the visible category set changes (e.g. after a search filters some out).
  }, [categories]);

  useEffect(() => {
    // Instant, not smooth: a concurrent smooth-scroll on this same row corrupts Framer
    // Motion's layoutId FLIP measurement for the sliding active-pill indicator below,
    // leaving it stuck interpolating between stale positions.
    const activeChip = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    activeChip?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
  }, [active]);

  // Edge-fade tracking: only fade the side that still has more chips to reveal.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [categories]);

  // Cmd/Ctrl+K jumps into search — additive power-user shortcut, doesn't replace click/tap.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const fadeMask =
    canScrollLeft && canScrollRight
      ? "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)"
      : canScrollLeft
        ? "linear-gradient(to right, transparent, black 2rem)"
        : canScrollRight
          ? "linear-gradient(to right, black calc(100% - 2rem), transparent)"
          : undefined;

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/90 shadow-[0_12px_28px_-22px_rgba(0,0,0,0.4)] backdrop-blur-sm md:top-[72px]">
      <div className="mx-auto max-w-[1600px] px-6 py-4 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Scopes the sliding active-pill's layoutId FLIP animation to this nav only. */}
          <LayoutGroup id="catalogue-nav">
            <nav
              ref={navRef}
              aria-label="Jump to category"
              className="flex gap-2 overflow-x-auto [scrollbar-width:none] md:flex-1 [&::-webkit-scrollbar]:hidden"
              style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
            >
              {categories.map((c) => {
                const Icon = CATEGORY_ICON[c.slug];
                const isActive = active === c.slug;
                return (
                  <a
                    key={c.slug}
                    href={`#${c.slug}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`label-xs relative isolate shrink-0 whitespace-nowrap border px-4 py-2 transition-colors duration-300 ${
                      isActive
                        ? "border-primary text-primary-foreground"
                        : "border-foreground/15 text-foreground/70 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="catalogue-active-pill"
                        className="absolute inset-0 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5">
                      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />}
                      {c.title}
                    </span>
                  </a>
                );
              })}
            </nav>
          </LayoutGroup>

          <div className="relative shrink-0 md:w-64">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search treatments…"
              aria-label="Search treatments"
              className="w-full rounded-full border border-border/70 bg-muted/40 py-2.5 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {!query && (
              <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground/70 lg:inline-block">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogueNav;
