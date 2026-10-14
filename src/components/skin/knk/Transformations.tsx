import { Reveal } from "./Reveal";
import { IMG } from "./images";

const CASES = [
  { name: "Chemical Peel", ...IMG.transformations.chemicalPeel },
  { name: "Red Light Therapy", ...IMG.transformations.redLightTherapy },
  /*
   * Pigmentation Treatment still uses sample photography — the client's pin (https://pin.it/6rdDFKwgz)
   * resolves to a deactivated/removed Pinterest pin, so the real photo couldn't be fetched.
   * Swap IMG.transformations.pigmentation (src/components/knk/images.ts) for the real before/after
   * once the client re-shares it.
   */
  { name: "Pigmentation Treatment", ...IMG.transformations.pigmentation },
  { name: "Hair PRP Microneedling", ...IMG.transformations.hairPRP },
  { name: "Laser Hair Reduction", ...IMG.transformations.laserHairReduction },
  { name: "HIFU Face", ...IMG.transformations.hifuFace },
];

const Transformations = () => (
  <section id="transformations" className="bg-background py-24 md:py-40">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <Reveal>
        <h2 className="display max-w-[16ch] text-[9vw] uppercase leading-[0.92] sm:text-[6vw] lg:text-[3.6vw]">
          Client transformations
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => {
          // Some sample photos already contain a baked-in before/after split —
          // in that case before === after, so render it as a single full image
          // instead of duplicating it into two panels.
          const isSingleCollage = c.before === c.after;

          return (
            <Reveal key={c.name} delay={0.05 + i * 0.06}>
              <div className="border border-border bg-card">
                {isSingleCollage ? (
                  <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                    <img
                      src={c.before}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="label-xs absolute bottom-3 left-3 text-background/90 drop-shadow-sm">
                      Before
                    </span>
                    <span className="label-xs absolute bottom-3 right-3 text-background/90 drop-shadow-sm">
                      After
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={c.before}
                        alt={`Before — ${c.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="label-xs absolute bottom-3 left-3 text-background/90 drop-shadow-sm">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={c.after}
                        alt={`After — ${c.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <span className="label-xs absolute bottom-3 left-3 text-background/90 drop-shadow-sm">
                        After
                      </span>
                    </div>
                  </div>
                )}
                <div className="px-5 py-5">
                  <p className="font-sans text-lg font-medium uppercase">{c.name}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
export default Transformations;