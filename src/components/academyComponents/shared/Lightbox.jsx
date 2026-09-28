"use client";

import React, { useEffect } from "react";

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
    useEffect(() => {
        if (index === null) return;
        function handleKey(e) {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [index, onClose, onPrev, onNext]);

    if (index === null) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-10"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10"
            >
                &times;
            </button>

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrev();
                        }}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10 sm:left-6"
                    >
                        &#8249;
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10 sm:right-6"
                    >
                        &#8250;
                    </button>
                </>
            )}

            <img
                src={images[index]}
                alt=""
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
        </div>
    );
}