import { Reveal } from "./Reveal";
import { IMG } from "./images";

const POINTS = [
    {
        label: "FDA-approved technology",
        text: "advanced devices selected for precision, safety and proven performance",
    },
    {
        label: "Expert-led care",
        text: "personalised treatments guided by experienced aesthetics professionals and licensed skin doctors",
    },
    {
        label: "A complete approach",
        text: "skin, hair, body, injectables and wellness, thoughtfully brought together under one roof",
    },
    {
        label: "Luxury, discreet & private",
        text: "a premium, unhurried experience designed around you",
    },
];

const AboutIntro = () => (
    <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="grid border border-border lg:grid-cols-2">
                <Reveal>
                    <div className="relative aspect-[4/3] h-full w-full overflow-hidden bg-muted lg:aspect-auto">
                        <img
                            src={IMG.aboutIntro.image}
                            alt="KNK SKKIN Clinic"
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="flex h-full flex-col justify-center px-6 py-10 sm:px-10 md:py-14">
                        <h2 className="display text-[8vw] uppercase leading-[0.95] sm:text-[5vw] lg:text-[2.6vw]">
                            Lucknow&rsquo;s New Standard in Skin &amp; Wellness
                        </h2>

                        <p className="mt-6 max-w-[46ch] font-sans text-base leading-relaxed text-muted-foreground">
                            KNK SKKIN brings together aesthetic expertise and personalised
                            well-being, where advanced treatments are complemented by a
                            distinctly luxurious experience.
                        </p>

                        <ul className="mt-8 space-y-4">
                            {POINTS.map((p) => (
                                <li
                                    key={p.label}
                                    className="font-sans text-base leading-relaxed text-muted-foreground"
                                >
                                    <span className="font-semibold text-foreground">{p.label}</span>{" "}
                                    — {p.text}
                                </li>
                            ))}
                        </ul>

                        {/* <a
                            href=""
                            className="group mt-10 inline-flex w-fit items-center gap-6 border border-foreground/20 px-8 py-5 label-xs transition-colors duration-500 ease-lux hover:bg-[#6B4324] hover:text-secondary-foreground"
                        >
                            Learn more
                            <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">
                                →
                            </span>
                        </a> */}
                    </div>
                </Reveal>
            </div>
        </div >
    </section >
);

export default AboutIntro;