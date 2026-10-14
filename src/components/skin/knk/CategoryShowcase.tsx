"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Reveal, usePrefersReducedMotion } from "./Reveal";

export interface CategoryShowcaseItem {
  key: string;
  name: string;
  description: string;
  highlight?: string;
  /** When set, the whole item links out (e.g. cross-linking to the same treatment on another page). */
  to?: string;
}

interface CategoryShowcaseProps {
  slug: string;
  title: string;
  note?: string;
  items: CategoryShowcaseItem[];
  image: string;
}

/**
 * Treatments-page-only category layout: a full-bleed parallax banner photo per section
 * (same scroll-linked technique as the homepage Hero/Longevity backgrounds — a ref-scoped
 * useScroll + useTransform drift, not RevealImage's whileInView reveal), with that category's
 * treatments below in a contained, numbered text list — no per-treatment imagery anywhere,
 * at rest or on hover, since individual items don't have their own photography yet; the one
 * banner photo at the top represents the whole category.
 *
 * Used by both the Treatments and Wellness pages — one banner image per section, not per item.
 */
const CategoryShowcase = ({ slug, title, note, items, image }: CategoryShowcaseProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? ["0%", "0%"] : ["-12%", "12%"]);

  if (items.length === 0) return null;

  return (
    <section id={slug} className="scroll-mt-28 border-t border-border">
      {/* Edge-to-edge banner — deliberately outside the max-w content wrapper below. */}
      <div ref={bannerRef} className="relative h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[58vh]">
        <motion.img
          src={image}
          alt={`${title} at KNK SKKIN`}
          loading="lazy"
          style={{ y }}
          className="absolute inset-0 h-[130%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1600px] px-6 pb-8 md:px-10 md:pb-10">
            <Reveal>
              <h2 className="display text-3xl uppercase text-background md:text-5xl">{title}</h2>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 md:py-16">
        {note && (
          <Reveal>
            <p className="mb-10 max-w-2xl text-sm italic leading-loose text-muted-foreground">{note}</p>
          </Reveal>
        )}

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
          {items.map((item, i) => {
            const body = (
              <div className="group relative flex h-full items-start gap-5 overflow-hidden border border-border bg-card px-6 py-6 transition-colors duration-500 ease-lux hover:border-primary/30 hover:bg-muted/30 md:px-7 md:py-7">
                <span className="label-xs shrink-0 pt-1 text-gold">{String(i + 1).padStart(2, "0")}</span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.01em] text-foreground md:text-2xl">
                      {item.name}
                    </h3>
                    {item.highlight && (
                      <span className="label-xs shrink-0 border border-gold/50 bg-gold/10 px-2 py-1 text-gold">
                        {item.highlight}
                      </span>
                    )}
                    {item.to && <span className="label-xs shrink-0 text-primary">→</span>}
                  </div>
                  <p className="mt-2 text-sm leading-loose text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );

            return (
              <Reveal
                key={item.key}
                delay={reducedMotion ? 0 : 0.06 * (i % 9)}
                className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.333px)]"
              >
                {item.to ? (
                  <Link href={item.to} className="block h-full">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
