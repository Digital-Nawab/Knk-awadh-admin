"use client";

import React, { useEffect, useRef } from 'react';

function ParallaxBanner() {
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.parentElement.getBoundingClientRect();
      const speed = 0.35;
      el.style.transform = `translateY(${rect.top * -speed}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[22rem] overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -top-24 h-[calc(100%+12rem)]">
        <img
          src="/assets/images/new/parallel-img.webp"
          alt="KNK Salon interior"
          width={1400}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-primary/55" />
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <p className="max-w-xl font-display text-3xl italic text-cream md:text-5xl">
          "An experience shaped by expertise and care."
        </p>
      </div>
    </section>
  );
}

export default ParallaxBanner;