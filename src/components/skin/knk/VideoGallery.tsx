"use client";

import { Reveal } from "./Reveal";

interface VideoItem {
  id: string;
  title: string;
}

const VIDEOS: VideoItem[] = [
  { id: "60vDLl5GIf4", title: "Treatment Highlights & Technique" },
  { id: "NRgCRRhtQMA", title: "Client Journey & Clinical Process" },
  { id: "MWqkJNWdoKg", title: "Aesthetics & Care Demonstration" },
  { id: "MiY6YS7Q0PU", title: "Skin Transformation Experience" },
];

interface VideoGalleryProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

const VideoGallery = ({
  eyebrow = "Video Gallery",
  title = "Treatments & Results in Motion",
  description = "Explore real client experiences, clinical protocols, and doctor-guided treatments at KNK SKKIN Lucknow.",
}: VideoGalleryProps) => {
  return (
    <section className="border-t border-border bg-card/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="label-xs text-gold">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display mt-3 text-3xl uppercase md:text-5xl">{title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {VIDEOS.map((video, idx) => (
            <Reveal key={video.id} delay={0.08 * idx}>
              <div className="group overflow-hidden rounded-md border border-border/70 bg-background shadow-sm transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden bg-black/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="p-4">
                  <p className="font-sans text-xs font-medium uppercase tracking-wider text-foreground/80 line-clamp-1">
                    {video.title}
                  </p>
                  <p className="mt-1 label-xs text-muted-foreground/60 text-[10px]">
                    KNK Awadh Salon &amp; Academy
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
