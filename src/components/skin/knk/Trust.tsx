import { CountUp, Reveal } from "./Reveal";

/** Real stats only — no review count/rating/doctor count exist in the source doc, so none are invented here. */
const Trust = () => (
  <section id="trust" className="border-y border-primary/20 bg-gold-gradient py-10 md:py-0">
    <div className="mx-auto max-w-[1600px] px-6 md:px-10">
      <div className="flex flex-col divide-y divide-primary/20 md:flex-row md:divide-x md:divide-y-0">
        <Reveal delay={0.05} className="flex-1 py-5 text-center md:py-8 md:text-left">
          <p className="display text-4xl text-primary md:text-5xl">
            <CountUp value={500} suffix="+" />
          </p>
          <p className="label-xs mt-2 font-bold text-foreground/70">Happy Clients</p>
        </Reveal>
        <Reveal delay={0.1} className="flex-1 py-5 text-center md:px-8 md:py-8 md:text-left">
          <p className="display text-4xl text-primary md:text-5xl">
            <CountUp value={15} suffix="+" />
          </p>
          <p className="label-xs mt-2 font-bold text-foreground/70">Years of KNK Expertise</p>
        </Reveal>
        <Reveal delay={0.15} className="flex-1 py-5 text-center md:px-8 md:py-8 md:text-left">
          <p className="display text-4xl text-primary md:text-5xl">Specialist</p>
          <p className="label-xs mt-2 font-bold text-foreground/70">Skin Doctors</p>
        </Reveal>
        <Reveal delay={0.2} className="flex-1 py-5 text-center md:px-8 md:py-8 md:text-left">
          <p className="display text-4xl text-primary md:text-5xl">Now Open</p>
          <p className="label-xs mt-2 font-bold text-foreground/70">Lucknow · Hazratganj</p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Trust;
