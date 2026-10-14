import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface CatalogueHeroProps {
  eyebrow: string;
  heading: ReactNode;
  subtext: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Full-bleed hero banner shared by /treatments and /wellness, matching the homepage Hero's visual treatment. */
const CatalogueHero = ({ eyebrow, heading, subtext, image, imageAlt, ctaLabel, ctaHref }: CatalogueHeroProps) => (
  <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-secondary text-secondary-foreground grain">
    <div className="absolute inset-0">
      <img src={image} alt={imageAlt} loading="eager" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/70" />
    </div>

    <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 pt-36 md:px-10 md:pb-20">
      <Reveal>
        <p className="label-xs text-gold">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h1 className="display mt-6 max-w-[20ch] text-[10vw] uppercase leading-[0.92] sm:text-[7vw] lg:text-[4vw]">
          {heading}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-background/70">{subtext}</p>
      </Reveal>
      <Reveal delay={0.15}>
        <a
          href={ctaHref}
          className="group mt-10 inline-flex items-center gap-4 bg-gold-gradient px-7 py-4 label-xs text-[#6B4324]"
        >
          {ctaLabel}
          <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">↓</span>
        </a>
      </Reveal>
    </div>
  </section>
);

export default CatalogueHero;
