"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Zap, Sparkles, ShieldCheck, HeartHandshake, Award } from "lucide-react";
import CatalogueHero from "@/components/knk/CatalogueHero";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { Reveal } from "@/components/knk/Reveal";
import VideoGallery from "@/components/knk/VideoGallery";
import { BOOK_CONSULTATION_HASH } from "@/components/knk/brand";
import { usePageMeta } from "@/hooks/use-page-meta";

const LaserTreatmentPage = () => {
  usePageMeta(
    "Best Skin Laser Treatments in Lucknow | KNK Awadh Salon & Academy",
    "Discover the best skin laser treatments and painless laser hair removal in Lucknow at KNK Awadh Salon & Academy. Advanced cooling diode laser technology for smooth, glowing, ingrown-free skin.",
  );

  return (
    <>
      <main>
        {/* Full-bleed Editorial Hero Banner */}
        <CatalogueHero
          eyebrow="Clinical Laser Therapy & Hair Reduction"
          heading={
            <>
              The Best Skin Laser Treatments in Lucknow{" "}
              <span className="text-gold">for Flawless Skin.</span>
            </>
          }
          subtext="Experience the wonders of clinical laser therapy and painless laser hair reduction. Target follicles, eliminate ingrowns, and reveal smooth, glowing skin with doctor-guided precision at KNK Awadh Salon & Academy."
          image="/skin/assets/aesthetics/laser-hero.jpg"
          imageAlt="Advanced skin laser treatment at KNK SKKIN Lucknow"
          ctaLabel="Explore Laser Treatments"
          ctaHref="#overview"
        />

        {/* Overview Section */}
        <section id="overview" className="scroll-mt-24 border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Image Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/laser-treatment.webp"
                        alt="Skin Laser Hair Removal at KNK Awadh Salon Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="absolute left-4 top-4 rounded-full bg-secondary/80 px-4 py-1.5 backdrop-blur-md">
                      <span className="label-xs text-gold-light text-[11px]">Sapphire Cooling Precision</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Text Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">Advanced Phototherapy</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    Transform Your Skin with <br />
                    <span className="text-gold">Clinical Laser Therapy</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <p>
                      Experience the wonders of laser hair removal, which destroys hair follicles at the root
                      to prevent unwanted hair from growing and stops painful ingrown hairs, leaving you with
                      consistently silky, convenient skin. KNK Awadh Salon &amp; Academy offers premier skin
                      laser treatments in Lucknow that will transform your beauty routine.
                    </p>
                    <p>
                      Our laser hair removal procedures can be tailored to different body parts, providing
                      smooth skin with a delicate and precise touch. You can get rid of undesired hair easily,
                      from your legs and arms to underarms, bikini, and facial areas. Get the glowing, bump-free
                      skin you&rsquo;ve always wanted with a safe, proven, and medical-grade method of laser therapy.
                    </p>
                    <p>
                      Wondering about laser therapy costs in Lucknow? Our transparent, budget-friendly packages
                      guarantee exceptional clinical affordability without compromising quality or safety.
                      With reliable skin laser treatments in Lucknow, you can enjoy glowing skin and lasting
                      self-confidence.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="mt-8">
                    <Link
                      href={BOOK_CONSULTATION_HASH}
                      className="group inline-flex items-center gap-4 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
                    >
                      Book Your Laser Consultation
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

        {/* Benefits of Laser Hair Reduction (Directly from Reference Page) */}
        <section className="border-b border-border bg-card/30 py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <p className="label-xs text-gold">Why Choose Laser Therapy</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                  Benefits of Laser <span className="text-gold">Hair Reduction</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Enjoy the gold standard in permanent hair reduction, designed for all Indian skin types with
                  sub-zero contact cooling.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {[
                {
                  icon: Zap,
                  title: "Painless Sessions",
                  desc: "Enjoy comfortable, virtually painless sessions equipped with dynamic sapphire contact cooling that protects your epidermal layer while disabling hair roots.",
                },
                {
                  icon: ShieldCheck,
                  title: "No Ingrown Hairs",
                  desc: "Permanently eliminate folliculitis and painful ingrown hairs caused by frequent waxing or shaving, leaving pores refined and smooth.",
                },
                {
                  icon: Sparkles,
                  title: "Fast & Durable",
                  desc: "Take advantage of rapid-pulse technology for quick sessions and durable, permanent hair reduction that saves time and money over a lifetime.",
                },
                {
                  icon: Award,
                  title: "No Marks or Scars",
                  desc: "Say goodbye to razor burns, blisters, hyperpigmentation marks, and skin cuts. Laser light targets only melanin in follicles, sparing surrounding tissue.",
                },
                {
                  icon: HeartHandshake,
                  title: "Smooth & Hairless Skin",
                  desc: "Drastically reduce razor bumps and strawberry legs for touchably smooth, flawless skin. Offered at a reasonable laser treatment cost in Lucknow at KNK Awadh Salon & Academy.",
                },
                {
                  icon: ShieldCheck,
                  title: "Doctor-Led Safety",
                  desc: "Every protocol is calibrated according to your skin type and hair density by experienced skin doctors and certified laser practitioners.",
                },
              ].map((benefit, idx) => (
                <Reveal key={idx} delay={0.08 * idx}>
                  <div className="group h-full rounded-md border border-border bg-background p-6 shadow-sm transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-primary">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-sans mt-5 text-base font-semibold uppercase tracking-wider text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {benefit.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Section: The Laser Hair Reduction Process (Directly from Reference) */}
        <section className="border-b border-border bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Text / Steps Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="label-xs text-gold">Step-by-Step Clinical Protocol</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-3 text-3xl uppercase md:text-5xl">
                    The Laser Hair <span className="text-gold">Reduction Process</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    A clinical, transparent process crafted to ensure maximum comfort, hygiene, and rapid
                    permanent follicle reduction.
                  </p>
                </Reveal>

                <div className="mt-10 space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Consultation & Skin Assessment",
                      desc: "A thorough diagnostic consultation determines your skin type, Fitzpatrick score, and hair density to select the precise wavelength and energy parameters.",
                    },
                    {
                      step: "02",
                      title: "Area Preparation",
                      desc: "The targeted treatment area is shaved and prepped in advance so laser energy is channeled directly into the follicle without burning surface hair.",
                    },
                    {
                      step: "03",
                      title: "Laser Treatment Session",
                      desc: "Ultra-fast optical laser pulses focus directly onto melanin within the hair roots, delivering rapid thermal destruction with continuous sapphire cooling.",
                    },
                    {
                      step: "04",
                      title: "Post-Treatment Care",
                      desc: "Calming aloe lotions and soothing emulsions are applied to soothe the skin. We advise sun avoidance and hydration between sessions.",
                    },
                    {
                      step: "05",
                      title: "Follow-Up Sessions",
                      desc: "Scheduled periodic sessions (spaced 4–6 weeks apart) target hairs cycling through their active anagen growth phase for permanent clearance.",
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

              {/* Secondary Image Col */}
              <div className="lg:col-span-6">
                <Reveal>
                  <div className="relative overflow-hidden rounded-md border border-border bg-card shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/skin/assets/aesthetics/laser-skin.webp"
                        alt="Laser facial and skin rejuvenation at KNK SKKIN Lucknow"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-lux hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="label-xs text-gold">Targeted Laser Treatment Areas</p>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs text-foreground/80">
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Facial &amp; Upper Lip Laser</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Underarms &amp; Bikini Line</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Full Arms &amp; Full Legs</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-gold shrink-0" />
                          <span>Back, Chest &amp; Full Body Packages</span>
                        </li>
                      </ul>
                      <div className="mt-6 border-t border-border/80 pt-4">
                        <p className="font-sans text-xs text-muted-foreground">
                          Budget-friendly packages available for men and women with tailored installment plans.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Video Gallery */}
        <VideoGallery
          eyebrow="Laser Video Gallery"
          title="Skin Laser Treatments in Action"
          description="Explore real laser treatment procedures, client results, and expert insights at KNK Awadh Salon & Academy Lucknow."
        />

        {/* Consultation Section */}
        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default LaserTreatmentPage;
