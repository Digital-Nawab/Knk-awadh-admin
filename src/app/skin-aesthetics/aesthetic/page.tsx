"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import CatalogueHero from "@/components/knk/CatalogueHero";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { Reveal } from "@/components/knk/Reveal";
import VideoGallery from "@/components/knk/VideoGallery";
import { BOOK_CONSULTATION_HASH } from "@/components/knk/brand";
import { usePageMeta } from "@/hooks/use-page-meta";

const AestheticPage = () => {
  usePageMeta(
    "Enhance Your Beauty with the Best Aesthetic Treatments | KNK SKKIN",
    "Discover the most effective aesthetic treatments for glowing, youthful skin in Lucknow. Hollywood treatments, non-surgical skin lifting, Ultherapy, RF therapy and thread lifts guided by licensed skin doctors.",
  );

  return (
    <>
      <main>
        {/* Full-bleed Editorial Hero Banner */}
        <CatalogueHero
          eyebrow="Aesthetics & Skin Science"
          heading={
            <>
              Best Aesthetic Treatments That Will{" "}
              <span className="text-gold">Change Your Look.</span>
            </>
          }
          subtext="Revolutionary non-surgical cosmetic treatments designed to enhance your natural beauty. Painless, non-invasive procedures with zero downtime, guided by specialist skin doctors in Hazratganj, Lucknow."
          image="/skin/assets/aesthetics/aesthetic-hero.jpg"
          imageAlt="Luxury aesthetics treatment room at KNK SKKIN"
          ctaLabel="Explore Aesthetic Treatments"
          ctaHref="#treatments"
        />

        {/* Introduction Philosophy Section */}
        <section id="treatments" className="scroll-mt-24 border-b border-border bg-background py-16 md:py-24">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Reveal>
                  <p className="label-xs text-gold">The Art of Non-Surgical Aesthetics</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Enhance Your <br />
                    <span className="text-gold">Natural Beauty</span>
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay={0.12}>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    Aesthetic treatments have revolutionized modern beauty, offering non-surgical cosmetic
                    procedures that accentuate your authentic features. Every treatment at KNK SKKIN is
                    doctor-led, non-invasive, and virtually painless, requiring little to no downtime.
                    Whether you are seeking comprehensive skin rejuvenation or age-defying structural firming,
                    our clinical protocols deliver luminous, lasting refinement.
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { icon: Sparkles, label: "Zero Downtime" },
                      { icon: ShieldCheck, label: "Doctor-Guided" },
                      { icon: Award, label: "US-FDA Approved" },
                      { icon: HeartHandshake, label: "Bespoke Plans" },
                    ].map((pill, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center rounded-sm border border-border/80 bg-card/60 p-4 text-center transition-all duration-300 hover:border-gold/50"
                      >
                        <pill.icon className="h-5 w-5 text-gold" />
                        <span className="mt-2 text-xs font-medium uppercase tracking-wider text-foreground/80">
                          {pill.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Hollywood Treatment */}
        <section className="border-b border-border bg-card/30 py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Image Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-background shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/hollywood-facial.webp"
                        alt="Hollywood Treatment Facial at KNK SKKIN Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-secondary/80 px-4 py-1.5 backdrop-blur-md">
                      <span className="label-xs text-gold-light text-[11px]">Celebrity Red-Carpet Protocol</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Text Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">VIP Skin Experience</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Hollywood Treatment <br />
                    <span className="text-gold">Feel Like a Celebrity</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    The Hollywood treatment is like a VIP experience for your body and skin. It&rsquo;s a top-tier
                    makeover that celebrities adore, giving you the complete red-carpet look. This luxurious
                    aesthetic treatment includes high-end facials, soothing massage, and skincare therapies that
                    leave your skin glowing, deeply hydrated, and refreshed with a flawless porcelain finish.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8">
                    <h3 className="label-xs font-semibold text-foreground">Treatment Inclusions:</h3>
                    <ul className="mt-4 space-y-3">
                      {[
                        "Deep-cleansing carbon laser and gentle purifying facials",
                        "High-end medical-grade active botanicals and concentrated serums",
                        "Relaxing facial lymphatic drainage massage for reduced puffiness",
                        "Red-carpet-ready luminous glow with refined pores and instant radiance",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-10">
                    <Link
                      href={BOOK_CONSULTATION_HASH}
                      className="group inline-flex items-center gap-4 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
                    >
                      Book Hollywood Treatment
                      <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Skin Lifting Treatment */}
        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Text Col */}
              <div className="order-2 lg:order-1 lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">Advanced Anti-Ageing</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Skin Lifting Treatment <br />
                    <span className="text-gold">The Secret to Youthful Skin</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Skin lifting treatments are among the most effective anti-aging treatments available
                    today. As skin naturally loses elasticity over time, wrinkles and sagging appear. Our
                    non-surgical skin lifting therapies stimulate natural collagen production from within,
                    restoring firmness, lifting contour, and delivering a youthful appearance without the need
                    for surgery.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8 space-y-4">
                    <h3 className="label-xs font-semibold text-foreground">Popular Skin Lifting Procedures:</h3>

                    <div className="rounded-sm border border-border/70 bg-card/40 p-4 transition-colors hover:border-gold/40">
                      <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
                        Ultherapy &ndash; Ultrasound Skin Lift
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Utilizes focused ultrasound energy to reach foundational tissue layers, stimulating
                        fresh collagen synthesis to lift and firm sagging skin on the brow, neck, and under the chin.
                      </p>
                    </div>

                    <div className="rounded-sm border border-border/70 bg-card/40 p-4 transition-colors hover:border-gold/40">
                      <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
                        Radiofrequency (RF) Therapy
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        Delivers gentle, controlled thermal energy into the dermis to contract relaxed collagen
                        strands, soften deep wrinkles, and restore luminous skin bounce.
                      </p>
                    </div>

                    <div className="rounded-sm border border-border/70 bg-card/40 p-4 transition-colors hover:border-gold/40">
                      <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
                        Laser Skin Tightening
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        A non-invasive phototherapy procedure that stimulates cellular turnover, improves dermal
                        elasticity, and refines uneven skin texture for a smoothed contour.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Image Col */}
              <div className="order-1 lg:order-2 lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-background shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/skin-lifting.webp"
                        alt="Skin Lifting and Tightening Treatment Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="absolute right-4 top-4 rounded-full bg-secondary/80 px-4 py-1.5 backdrop-blur-md">
                      <span className="label-xs text-gold-light text-[11px]">Collagen Renewal Protocol</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Thread Lift */}
        <section className="border-b border-border bg-card/30 py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Image Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-background shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/thread-lift.webp"
                        alt="Thread Lift Procedure at KNK SKKIN Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-secondary/80 px-4 py-1.5 backdrop-blur-md">
                      <span className="label-xs text-gold-light text-[11px]">Instant Non-Surgical Lift</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Text Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">Contour Definition</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Thread Lift <br />
                    <span className="text-gold">A Non-Surgical Facelift</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                    A thread lift is an advanced non-surgical cosmetic treatment that provides an immediate,
                    discernible lift to sagging facial contours without the incisions, anesthesia, or downtime
                    of traditional surgery. Dissolvable polydioxanone (PDO) threads are delicately positioned
                    beneath the skin, anchoring lax tissue while stimulating a continuous wave of natural
                    collagen synthesis as they safely dissolve.
                  </p>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8">
                    <h3 className="label-xs font-semibold text-foreground">Key Benefits of Thread Lift:</h3>
                    <ul className="mt-4 space-y-3">
                      {[
                        "Stimulates natural structural collagen and elastin synthesis",
                        "Lifts sagging contours across cheeks, jawline, jowls, and neck",
                        "Minimally invasive with rapid recovery and minimal downtime",
                        "Immediate visible improvement that continues to refine over months",
                        "Performed strictly by licensed, experienced skin doctors in Lucknow",
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-10">
                    <Link
                      href={BOOK_CONSULTATION_HASH}
                      className="group inline-flex items-center gap-4 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
                    >
                      Consult for Thread Lift
                      <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Video Gallery */}
        <VideoGallery
          eyebrow="Video Gallery"
          title="Aesthetic Treatments in Motion"
          description="Watch our aesthetics specialists and clinical procedures in action at KNK SKKIN Hazratganj, Lucknow."
        />

        {/* Consultation Section */}
        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default AestheticPage;
