export default function BridalHero() {
  return (
    <section id="hero" className="relative w-full bg-[#0C0B0A] overflow-hidden">
      <div className="relative w-full aspect-video sm:h-[75vh] md:h-[82vh] max-h-[850px] min-h-[300px] flex items-center justify-center bg-black">
        {/* Bridal Makeup Hero Video */}
        <video
          src="/landing-page/videos/bridal-makeup.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
