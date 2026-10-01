"use client";

import React, { useEffect, useState, useCallback } from 'react';

// Fallback local bridal gallery images (22 total, /assets/images/new/home/bridal/1.webp ... 22.webp).
// Distributed round-robin across the 3 columns so no image repeats anywhere.
const BRIDAL_PATH = (n) => `/assets/images/new/home/bridal/${n}.webp`;
const DEFAULT_BRIDAL_IMAGES = Array.from({ length: 22 }, (_, i) => BRIDAL_PATH(i + 1));

function ScrollColumn({ images, duration, reverse = false, onImageClick }) {
    if (!images || images.length === 0) return null;

    // Duplicate list so the loop is seamless at translateY(-50%)
    let loop = [...images];
    while (loop.length < 6) {
        loop = [...loop, ...images];
    }
    loop = [...loop, ...loop];

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

function GallerySection({ initialImages = [] }) {
    const [items, setItems] = useState(initialImages);
    const [lightboxSrc, setLightboxSrc] = useState(null);

    // Fetch fresh active gallery items on mount
    useEffect(() => {
        let isMounted = true;
        fetch('/api/gallery?active=true')
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                if (isMounted && data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
                    setItems(data.gallery);
                }
            })
            .catch(() => {
                // Keep initialImages or fallback
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Flatten image list to string URLs
    const imageList = (items && items.length > 0)
        ? items.map((item) => (typeof item === 'string' ? item : item.image_url)).filter(Boolean)
        : DEFAULT_BRIDAL_IMAGES;

    // Distribute round-robin across 3 columns matching original column layout
    const col1 = imageList.filter((_, idx) => idx % 3 === 0);
    const col2 = imageList.filter((_, idx) => idx % 3 === 1);
    const col3 = imageList.filter((_, idx) => idx % 3 === 2);

    // Flat list across columns for lightbox navigation
    const allImages = [...col1, ...col2, ...col3];

    const closeLightbox = useCallback(() => setLightboxSrc(null), []);

    const showNext = useCallback((dir) => {
        setLightboxSrc((current) => {
            if (!current || allImages.length === 0) return current;
            const idx = allImages.indexOf(current);
            if (idx === -1) return allImages[0];
            const nextIdx = (idx + dir + allImages.length) % allImages.length;
            return allImages[nextIdx];
        });
    }, [allImages]);

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
                    <ScrollColumn images={col1} duration={26} onImageClick={setLightboxSrc} />
                    <ScrollColumn images={col2} duration={32} reverse onImageClick={setLightboxSrc} />
                    <ScrollColumn images={col3} duration={24} onImageClick={setLightboxSrc} />
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