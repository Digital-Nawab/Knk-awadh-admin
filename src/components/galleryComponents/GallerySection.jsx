"use client";

import React, { useEffect, useState, useCallback } from 'react';

// Local bridal gallery images (22 total, /assets/images/new/home/bridal/1.webp ... 22.webp).
// Distributed round-robin across the 3 columns so no image repeats anywhere.
const BRIDAL_PATH = (n) => `/assets/images/new/home/bridal/${n}.webp`;

const COLUMN_1 = [1, 4, 7, 10, 13, 16, 19, 22].map(BRIDAL_PATH);
const COLUMN_2 = [2, 5, 8, 11, 14, 17, 20].map(BRIDAL_PATH);
const COLUMN_3 = [3, 6, 9, 12, 15, 18, 21].map(BRIDAL_PATH);

// Flat list (in on-screen order across the 3 columns) used for the lightbox
// so left/right navigation moves through every photo, not just one column.
const ALL_IMAGES = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3];

function ScrollColumn({ images, duration, reverse = false, onImageClick }) {
    // duplicate the list so the loop is seamless at translateY(-50%)
    const loop = [...images, ...images];

    return (
        <div className="relative h-full w-full overflow-hidden">
            <div
                className="gallery-track flex flex-col gap-4"
                style={{
                    animationDuration: `${duration}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {loop.map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onImageClick(src)}
                        className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl border border-border cursor-zoom-in"
                    >
                        <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

function GallerySection() {
    const [lightboxSrc, setLightboxSrc] = useState(null);

    const closeLightbox = useCallback(() => setLightboxSrc(null), []);

    const showNext = useCallback((dir) => {
        setLightboxSrc((current) => {
            if (!current) return current;
            const idx = ALL_IMAGES.indexOf(current);
            const nextIdx = (idx + dir + ALL_IMAGES.length) % ALL_IMAGES.length;
            return ALL_IMAGES[nextIdx];
        });
    }, []);

    useEffect(() => {
        if (!lightboxSrc) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext(1);
            if (e.key === 'ArrowLeft') showNext(-1);
        };
        window.addEventListener('keydown', onKeyDown);
        // lock background scroll while the lightbox is open
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [lightboxSrc, closeLightbox, showNext]);

    return (
        <section className="relative bg-white pt-36 pb-28 px-6 overflow-hidden">

            {/* =================================================
                HEADER — same eyebrow / heading / gold-divider
                pattern used across the other sections
            ================================================== */}
            <div className="relative mx-auto max-w-5xl text-center mb-16">
                {/* Eyebrow */}
                <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#a17b5a]">
                    Gallery
                </p>
                {/* Heading */}
                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[56px] font-medium leading-[0.9] tracking-[-0.03em] text-[#29231f] sm:text-[68px] md:text-[80px] lg:text-[84px]">
                    Moments we've
                    <br />
                    <span className="italic text-[#b58a52]">created.</span>
                </h2>
                {/* Gold divider */}
                <div className="mt-7 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-[#d0bda4]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b58a52]" />
                    <span className="h-[2px] w-16 bg-[#b58a52]" />
                </div>
            </div>

            {/* scrolling image gallery — 3 auto-scrolling columns */}
            <div className="relative mx-auto max-w-5xl">
                <div
                    className="relative grid grid-cols-3 gap-4 h-[640px] sm:h-[720px] rounded-2xl"
                    style={{
                        // softer fade than before — only the outer ~6% fades,
                        // so images don't look cropped/cut mid-photo
                        maskImage:
                            'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                    }}
                >
                    <ScrollColumn images={COLUMN_1} duration={26} onImageClick={setLightboxSrc} />
                    <ScrollColumn images={COLUMN_2} duration={32} reverse onImageClick={setLightboxSrc} />
                    <ScrollColumn images={COLUMN_3} duration={24} onImageClick={setLightboxSrc} />
                </div>
            </div>

            {/* lightbox */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
                    onClick={closeLightbox}
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Close"
                        className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl leading-none"
                    >
                        &times;
                    </button>

                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext(-1);
                        }}
                        className="absolute left-3 sm:left-6 text-white/70 hover:text-white text-4xl leading-none px-2"
                    >
                        &#8249;
                    </button>

                    <img
                        src={lightboxSrc}
                        alt=""
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[85vh] max-w-2xl w-full object-contain rounded-lg"
                    />

                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext(1);
                        }}
                        className="absolute right-3 sm:right-6 text-white/70 hover:text-white text-4xl leading-none px-2"
                    >
                        &#8250;
                    </button>
                </div>
            )}

            <style>{`
        @keyframes gallery-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .gallery-track {
          animation-name: gallery-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-track { animation: none; }
        }
      `}</style>
        </section>
    );
}

export default GallerySection;