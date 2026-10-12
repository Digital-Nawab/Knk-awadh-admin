import Image from "next/image";

export default function BridalHero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[65vh] sm:h-[78vh] md:h-[85vh] lg:h-[90vh] bg-black overflow-hidden"
    >
      {/* Pure Full Hero Section Image */}
      <Image
        src="/salon-landing-page/videos/salon-landing-page.webp"
        alt="KNK Awadh Luxury Salon"
        fill
        priority
        sizes="100vw"
        className="w-full h-full object-cover object-center"
      />
    </section>
  );
}
