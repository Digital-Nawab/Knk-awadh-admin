import { Reveal } from "./Reveal";

const SIGNATURES = [
  {
    name: "Red Light Therapy",
    description: "Support your skin's natural rhythm of repair and renewal.",
    image: "/skin/assets/images/light-therapy.webp",
  },
  {
    name: "Infrared Sauna",
    description: "Deep warmth designed to help the body slow down, release and recover.",
    image: "/skin/assets/images/infrared-sauna.webp",
  },
  {
    name: "Cold Plunge",
    description: "Controlled cold. A sharper reset for body and mind.",
    image: "/skin/assets/images/cold-plunge.webp",
  },
  {
    name: "Lymphatic Drainage",
    description: "Encourage movement. Ease fluid retention. Feel lighter.",
    image: "/skin/assets/images/lymphatic-drainage.webp",
  },
  {
    name: "IV Therapy",
    description: "Personalised wellness, delivered directly to where it's needed.",
    image: "/skin/assets/images/iv-therapy.webp",
  },
  {
    name: "Injectables",
    description: "Refined, precise enhancements designed to keep you looking like yourself.",
    image: "/skin/assets/images/injectables.webp",
  },
];

const SkkinSignatures = () => (
  <section id="skkin-signatures" className="bg-muted py-24 md:py-32">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <Reveal>
        <h2 className="display max-w-[20ch] text-[9vw] uppercase leading-[0.92] sm:text-[6vw] lg:text-[3.6vw]">
          The SKKIN Signatures
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SIGNATURES.map((s, i) => (
          <Reveal key={s.name} delay={0.05 + i * 0.08}>
            <div className="border-t border-border pt-6">
              <div className="mb-6 aspect-[4/3] w-full overflow-hidden bg-secondary">
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-sans text-xl font-medium uppercase leading-snug tracking-[0.01em] text-foreground md:text-2xl">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-loose text-muted-foreground">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SkkinSignatures;