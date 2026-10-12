import Image from "next/image";

export default function BridalHero() {
  return (
    <section id="hero" className="relative w-full bg-[#0C0B0A] overflow-hidden">
      <div className="relative w-full aspect-video sm:h-[75vh] md:h-[82vh] max-h-[850px] min-h-[300px] flex items-center justify-center bg-black">
        {/* Bridal Makeup Hero Image */}
        <Image
          src="/landing-page/videos/makeup-landing-page.webp"
          alt="KNK Awadh Bridal Makeup"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
