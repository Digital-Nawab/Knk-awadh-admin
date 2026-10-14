"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Feather, Sparkles, Clock, Compass, Shield } from "lucide-react";
import CatalogueHero from "@/components/knk/CatalogueHero";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { Reveal } from "@/components/knk/Reveal";
import VideoGallery from "@/components/knk/VideoGallery";
import { BOOK_CONSULTATION_HASH } from "@/components/knk/brand";
import { usePageMeta } from "@/hooks/use-page-meta";

const MicrobladingPage = () => {
  usePageMeta(
    "Permanent Microblading in Lucknow | KNK Awadh Salon & Academy",
    "Discover premier microblading services in Lucknow at KNK Awadh Salon & Academy. Achieve fuller, symmetrical, natural-looking eyebrows with painless semi-permanent hair-stroke artistry.",
  );

  return (
    <>
      <main>
        {/* Full-bleed Editorial Hero Banner */}
        <CatalogueHero
          eyebrow="Eyebrow Artistry & Semi-Permanent Makeup"
          heading={
            <>
              Microblading Services in Lucknow{" "}
              <span className="text-gold">Will Change Your Look.</span>
            </>
          }
          subtext="Say goodbye to sparse, uneven brows. Discover semi-permanent eyebrow sculpting crafted with hyper-realistic hair-like strokes for effortless elegance every day at KNK Awadh Salon & Academy."
          image="/skin/assets/aesthetics/microblading-hero.jpg"
          imageAlt="Permanent microblading eyebrow procedure at KNK SKKIN Lucknow"
          ctaLabel="Explore Microblading"
          ctaHref="#overview"
        />

        {/* Detailed Overview Section */}
        <section id="overview" className="scroll-mt-24 border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Image Col */}
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-md">
                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/microblading.webp"
                        alt="Microblading Eyebrow Procedure Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded bg-secondary/85 p-4 text-center backdrop-blur-md">
                      <p className="label-xs text-gold-light text-[11px]">Precision Brow Sculpting</p>
                      <p className="mt-1 font-sans text-xs text-secondary-foreground/80">
                        Hair-fine strokes tailored to your facial geometry
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Text Col */}
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="label-xs text-gold">The Permanent Solution</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Fuller, Sculpted Brows <br />
                    <span className="text-gold">Crafted with Precision</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <p>
                      For those who are tired of dealing with the frustration of thin, sparse, or asymmetrical
                      eyebrows, microblading offers a transformative semi-permanent solution. Get a fresh,
                      redefined look at KNK Awadh Salon &amp; Academy, where precision artistry and clinical
                      hygiene meet to elevate your natural brow structure.
                    </p>
                    <p>
                      Microblading is an advanced cosmetic technique that delicately implants medical-grade
                      pigment into the upper dermal layer to create individual hair-like strokes. Unlike a
                      traditional permanent tattoo which penetrates deep and can discolor over time,
                      microblading utilizes specialized feather-light blades and refined organic pigments.
                      Results last beautifully for up to 18 to 24 months before gently softening, allowing
                      updates to shape and shade as your aesthetic tastes evolve.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "100% bespoke brow mapping based on the Golden Ratio",
                      "Medical-grade numbing for a painless experience",
                      "High-purity hypoallergenic mineral pigments",
                      "Natural, undetectable feathered hair strokes",
                    ].map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3 rounded-sm border border-border/80 bg-card/40 p-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-medium text-foreground/85">{point}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-10">
                    <Link
                      href={BOOK_CONSULTATION_HASH}
                      className="group inline-flex items-center gap-4 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
                    >
                      Book Your Brow Consultation
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

        {/* Section: Important Facts on Microblading (From Reference) */}
        <section className="border-b border-border bg-card/30 py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <p className="label-xs text-gold">Clinical Transparency</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                  Important Facts on <span className="text-gold">Microblading</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Everything you need to know about the safety, comfort, and longevity of your microblading procedure.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {[
                {
                  icon: Feather,
                  title: "Hand-Held Tool",
                  desc: "The process involves a precision hand-held microblade tool with sterile micro-needles, allowing the artist full tactile control to sculpt hyper-realistic, hair-fine strokes.",
                },
                {
                  icon: Shield,
                  title: "Entirely Painless",
                  desc: "Even though a micro-needle is used to deposit pigment, pre-procedure medical-grade topical anesthetic makes the treatment comfortable and causes zero harm to the skin.",
                },
                {
                  icon: Clock,
                  title: "Semi-Permanent",
                  desc: "The color effect gently softens over 12 to 24 months without discoloration. Touch-ups are recommended annually to maintain crisp definition and richness.",
                },
                {
                  icon: Compass,
                  title: "Expert Consultation",
                  desc: "On the day of the procedure, you sit down with our master brow specialist to review your facial anatomy, symmetry, questions, and desired shape before any ink is applied.",
                },
              ].map((fact, idx) => (
                <Reveal key={idx} delay={0.08 * idx}>
                  <div className="group h-full rounded-md border border-border bg-background p-6 shadow-sm transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-primary">
                      <fact.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans mt-5 text-base font-semibold uppercase tracking-wider text-foreground">
                      {fact.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {fact.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section: The Microblading Process */}
        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">The Journey</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    The Microblading <span className="text-gold">Process</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    From your initial brow consultation to final post-healing review, every step is designed for
                    absolute comfort, aesthetic precision, and flawless symmetry.
                  </p>
                </Reveal>

                <div className="mt-10 space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Brow Mapping & Custom Design",
                      desc: "We analyze your natural bone structure and measure facial symmetry to draw a temporary outline you review and approve before beginning.",
                    },
                    {
                      step: "02",
                      title: "Topical Anesthetic Application",
                      desc: "A soothing medical-grade numbing cream is applied for 20 minutes to ensure a completely calm, painless procedure.",
                    },
                    {
                      step: "03",
                      title: "Precision Hair-Stroke Sculpting",
                      desc: "Using the hand-held microblade, feather-light strokes are crafted one by one to replicate natural brow hairs with bespoke pigment.",
                    },
                    {
                      step: "04",
                      title: "Aftercare & Complimentary Touch-Up",
                      desc: "You receive our soothing healing balm and guidance. A 4 to 6-week perfecting session ensures all strokes set flawlessly.",
                    },
                  ].map((s, idx) => (
                    <Reveal key={s.step} delay={0.06 * idx}>
                      <div className="flex gap-4">
                        <span className="font-serif text-2xl font-light text-gold md:text-3xl">
                          {s.step}
                        </span>
                        <div>
                          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-foreground">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/microblading-detail.webp"
                        alt="Microblading preparation and facial care at KNK Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="label-xs text-gold">Who Is Microblading Perfect For?</p>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-foreground/80">
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Naturally thin or sparse eyebrows</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Over-plucked or uneven brow arches</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Alopecia or age-related thinning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Busy people wanting ready-to-go brows</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Video Gallery */}
        <VideoGallery
          eyebrow="Video Gallery"
          title="Eyebrow Transformations in Motion"
          description="Watch our master artists creating stunning eyebrow transformations at KNK Awadh Salon & Academy Lucknow."
        />

        {/* Consultation Section */}
        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default MicrobladingPage;
