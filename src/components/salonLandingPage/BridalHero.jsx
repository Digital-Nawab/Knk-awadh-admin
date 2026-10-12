export default function BridalHero() {
  return (
    <section
      id="hero"
      className="relative w-full h-[65vh] sm:h-[78vh] md:h-[85vh] lg:h-[90vh] bg-black overflow-hidden"
    >
      {/* Pure Full Hero Section Video */}
      <video
        src="/salon-landing-page/videos/salon-makeup.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center"
      />
    </section>
  );
}
