import React from 'react';

function Footer() {
    return (
        <>
            <footer className="bg-primary py-14 text-cream">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-center md:px-10">
                    <span className="font-display text-2xl tracking-[0.35em] uppercase">
                        KNK Awadh Salon & Academy · Lucknow

                    </span>
                    <div className="h-px w-40 animate-shimmer bg-gradient-to-r from-transparent via-gold to-transparent bg-[length:200%_100%]" />
                    <p className="text-xs tracking-[0.2em] uppercase opacity-70">
                        Awadh · Lucknow · Beauty with artistry
                    </p>
                    <p className="text-[11px] opacity-50">
                        © 2026 KNK Salon. All rights reserved.
                    </p>
                </div>
            </footer>
            {/* floating chat button */}
            <div className="fixed bottom-4 right-4 z-[60] md:bottom-7 md:right-7">
                <button
                    aria-label="Chat with us"
                    className="grid size-14 place-items-center rounded-full bg-gradient-gold text-primary shadow-luxe transition-transform hover:scale-110"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default Footer;