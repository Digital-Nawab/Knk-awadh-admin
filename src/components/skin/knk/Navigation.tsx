"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOK_CONSULTATION_HASH, LOGO_ON_DARK, LOGO_ON_LIGHT, NAV_LINKS, type NavLink } from "./brand";
import { EASE, Magnetic } from "./Reveal";

/** Resolves a nav link to a router target, accounting for anchors that may need a cross-page jump. */
const linkTarget = (link: NavLink, isHome: boolean) =>
  link.kind === "route" ? link.to : link.kind === "anchor" ? (isHome ? link.hash : `/skin-aesthetics${link.hash}`) : "#";

const Navigation = () => {
  const pathname = usePathname();
  const isHome = pathname === "/skin-aesthetics";

  const [scrolled, setScrolled] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? current;
    setHidden(current > previous && current > 160);
  });

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.filter((l): l is NavLink & { kind: "anchor" } => l.kind === "anchor")
      .map((l) => document.querySelector(l.hash))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (link: NavLink) => {
    if (link.kind === "route") return pathname === link.to;
    if (link.kind === "anchor") return isHome && active === link.hash;
    if (link.kind === "dropdown") return link.items.some((item) => pathname === item.to);
    return false;
  };

  const handleSmoothAnchor = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (target.startsWith("#")) {
      e.preventDefault();
      const id = target.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", target);
        setActive(target);
      }
    }
  };

  // The consultation form is embedded on every page, so this is always a same-page anchor.
  const bookHref = BOOK_CONSULTATION_HASH;

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !open ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`relative transition-[background-color,border-color,padding] duration-700 ease-lux ${
            scrolled
              ? "border-b border-border bg-background/90 py-3 backdrop-blur-md"
              : "border-b border-transparent py-6"
          }`}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gold-gradient"
            style={{ scaleX: progress }}
          />
          <nav
            aria-label="Primary"
            className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10"
          >
            <Link href="/skin-aesthetics" aria-label="KNK SKKIN home" className="shrink-0">
              <img
                src={scrolled ? LOGO_ON_LIGHT : LOGO_ON_DARK}
                alt="KNK SKKIN"
                className={`w-auto transition-all duration-700 ease-lux ${
                  scrolled ? "h-8 md:h-9" : "h-10 md:h-12"
                }`}
              />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => {
                if (link.kind === "dropdown") {
                  return (
                    <li
                      key={link.label}
                      className="relative group"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        aria-expanded={dropdownOpen}
                        className={`label-xs flex items-center gap-1 transition-colors duration-500 ${
                          scrolled
                            ? isActive(link)
                              ? "text-primary"
                              : "text-foreground/70 hover:text-primary group-hover:text-primary"
                            : isActive(link)
                              ? "text-gold-light"
                              : "text-background/75 hover:text-background group-hover:text-background"
                        }`}
                      >
                        {link.label}
                        <span className="text-[9px] leading-none transition-transform duration-200">
                          ▾
                        </span>
                      </button>

                      <div
                        className={`absolute left-0 top-full mt-2 min-w-[170px] rounded-sm bg-white py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#e8ded4] z-50 overflow-hidden transition-all duration-200 ${
                          dropdownOpen
                            ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            : "opacity-0 invisible translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
                        }`}
                      >
                        {link.items.map((item) => {
                          const isItemActive = pathname === item.to;
                          return (
                            <Link
                              key={item.to}
                              href={item.to}
                              onClick={() => setDropdownOpen(false)}
                              className={`block px-4 py-2.5 text-sm font-sans tracking-wide text-left transition-colors duration-200 ${
                                isItemActive
                                  ? "bg-[#d4c0ab] text-white"
                                  : "text-[#2b2520] hover:bg-[#d4c0ab] hover:text-white"
                              }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </li>
                  );
                }

                const target = linkTarget(link, isHome);
                return (
                  <li key={link.label}>
                    <Link
                      href={target}
                      onClick={(e) => handleSmoothAnchor(e, target)}
                      className={`label-xs link-line transition-colors duration-500 ${
                        scrolled
                          ? isActive(link)
                            ? "text-primary"
                            : "text-foreground/70 hover:text-primary"
                          : isActive(link)
                            ? "text-gold-light"
                            : "text-background/75 hover:text-background"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4">
              <Magnetic className="hidden sm:block">
                <Link
                  href={bookHref}
                  onClick={(e) => handleSmoothAnchor(e, bookHref)}
                  className={`group inline-flex items-center gap-3 border px-6 py-3 label-xs transition-colors duration-500 ease-lux ${
                    scrolled
                      ? "border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground"
                      : "border-background/40 text-background hover:bg-background hover:text-foreground"
                  }`}
                >
                  Book a consultation
                  <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              >
                <span
                  className={`h-px w-6 transition-colors duration-500 ${scrolled ? "bg-foreground" : "bg-background"}`}
                />
                <span
                  className={`h-px w-6 transition-colors duration-500 ${scrolled ? "bg-foreground" : "bg-background"}`}
                />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col bg-secondary text-secondary-foreground lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <img src={LOGO_ON_DARK} alt="KNK SKKIN" className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="label-xs text-secondary-foreground/70"
              >
                Close
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6 overflow-y-auto">
              {NAV_LINKS.map((link, i) => {
                if (link.kind === "dropdown") {
                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                    >
                      <div className="py-2">
                        <span className="display block py-1 text-3xl uppercase text-secondary-foreground/90">
                          {link.label}
                        </span>
                        <div className="mt-1 flex flex-col gap-2 pl-4 border-l border-gold/40">
                          {link.items.map((item) => (
                            <Link
                              key={item.to}
                              href={item.to}
                              onClick={() => setOpen(false)}
                              className={`label-xs py-1 transition-colors duration-300 ${
                                pathname === item.to
                                  ? "text-gold-light"
                                  : "text-secondary-foreground/70 hover:text-gold-light"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.li>
                  );
                }

                const target = linkTarget(link, isHome);
                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={target}
                      onClick={(e) => {
                        setOpen(false);
                        if (target.startsWith("#")) {
                          e.preventDefault();
                          const id = target.slice(1);
                          setTimeout(() => {
                            const el = document.getElementById(id);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "start" });
                              window.history.pushState(null, "", target);
                              setActive(target);
                            }
                          }, 200);
                        }
                      }}
                      className="display block py-3 text-4xl uppercase text-secondary-foreground/90"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="px-6 pb-12">
              <Link
                href={bookHref}
                onClick={(e) => {
                  setOpen(false);
                  if (bookHref.startsWith("#")) {
                    e.preventDefault();
                    const id = bookHref.slice(1);
                    setTimeout(() => {
                      const el = document.getElementById(id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", bookHref);
                      }
                    }, 200);
                  }
                }}
                className="flex items-center justify-between border border-gold/40 px-6 py-5 label-xs text-gold-light"
              >
                Book a consultation <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
