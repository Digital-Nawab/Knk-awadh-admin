"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Reveal, EASE } from "./Reveal";
import { IMG } from "./images";

const GROUPS = [
  {
    key: "skin",
    title: "Skin",
    tagline: "Facials · Peels · Rejuvenation · Pigmentation",
    to: "/skin-aesthetics/treatments#skin-rejuvenation",
    image: IMG.ourTreatments.skin,
  },
  {
    key: "wellness",
    title: "Wellness",
    tagline: "Red Light · IV Therapy · Infrared · Cold Plunge",
    to: "/skin-aesthetics/wellness",
    image: IMG.ourTreatments.wellness,
  },
  {
    key: "ageing",
    title: "Ageing & Contouring",
    tagline: "HIFU · Fillers · Botox · Face Lift",
    to: "/skin-aesthetics/treatments#anti-ageing",
    image: IMG.ourTreatments.ageingContouring,
  },
  {
    key: "hair",
    title: "Hair",
    tagline: "Hair Fall · PRP · GFC · Exosomes",
    to: "/skin-aesthetics/treatments#hair",
    image: IMG.ourTreatments.hair,
  },
  {
    key: "acne",
    title: "Acne & Scars",
    tagline: "Acne · Scarring · Microneedling · MNRF",
    to: "/skin-aesthetics/treatments#acne-scar-management",
    image: IMG.ourTreatments.acneScars,
  },
  {
    key: "laser",
    title: "Laser",
    tagline: "Skin · Hair Reduction · Resurfacing",
    to: "/skin-aesthetics/treatments#laser",
    image: IMG.ourTreatments.laser,
  },
  {
    key: "body",
    title: "Body",
    tagline: "Contouring · Firming · Lymphatic · Pressotherapy",
    to: "/skin-aesthetics/treatments#body-contouring",
    image: IMG.ourTreatments.body,
  },
  {
    key: "bridal",
    title: "Bridal",
    tagline: "Glow · Radiance · Pre-Event",
    to: "/skin-aesthetics/treatments#pre-bridal",
    image: IMG.ourTreatments.bridal,
  },
];

const Treatments = () => {
  const [activeKey, setActiveKey] = useState(GROUPS[0].key);
  const active = GROUPS.find((g) => g.key === activeKey)!;

  return (
    <section id="our-treatments" className="bg-background py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal>
          <h2 className="display max-w-[20ch] text-[9vw] uppercase leading-[0.92] sm:text-[6.5vw] lg:text-[4.4vw]">
            Our Treatments
          </h2>
        </Reveal>

        <p className="label-xs mt-12 text-muted-foreground">Explore a discipline</p>

        <div className="mt-6 grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {GROUPS.map((g, i) => {
              const isActive = g.key === activeKey;
              return (
                <Reveal key={g.key} delay={i * 0.06}>
                  <li className="border-t border-border last:border-b">
                    <Link
                      href={g.to}
                      onMouseEnter={() => setActiveKey(g.key)}
                      onFocus={() => setActiveKey(g.key)}
                      className="group grid w-full grid-cols-1 items-baseline gap-2 py-7 text-left sm:grid-cols-[1fr_auto] sm:gap-8"
                    >
                      <span
                        className={`display text-3xl uppercase leading-[1.6] transition-all duration-500 ease-lux sm:text-4xl sm:leading-[1.6] lg:text-[3.2rem] lg:leading-[1.0] ${
                          isActive ? "translate-x-2 text-primary" : "text-foreground/85"
                        }`}
                      >
                        {g.title}
                      </span>
                      <span className="label-xs text-muted-foreground sm:text-right">{g.tagline}</span>
                    </Link>

                    {/* Mobile inline image */}
                    {isActive && (
                      <motion.img
                        key={`${g.key}-m`}
                        src={g.image}
                        alt={g.title}
                        loading="lazy"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 220 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mb-7 w-full object-cover lg:hidden"
                      />
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden bg-muted">
              <AnimatePresence>
                <motion.img
                  key={active.key}
                  src={active.image}
                  alt={active.title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/skin-aesthetics/treatments"
            className="group mt-16 inline-flex items-center gap-6 border border-foreground/20 px-8 py-5 label-xs transition-colors duration-500 ease-lux hover:bg-[#6B4324] hover:text-secondary-foreground"
          >
            View all treatments
            <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Treatments;
