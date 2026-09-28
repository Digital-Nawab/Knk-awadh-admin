"use client";

import React from "react";
import { INK, GOLD, LINE, whyAcademyImage, reelVideo } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";

export default function VideoShowcase() {
    return (
        <section className="px-6 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[560px] mb-10">
                    <Eyebrow>Inside the Academy</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        See the studio <span className="italic" style={{ color: GOLD }}>in motion.</span>
                    </h2>
                </div>
                <div className="rounded-2xl overflow-hidden border shadow-[0_24px_60px_-24px_rgba(181,138,82,0.35)]" style={{ borderColor: LINE }}>
                    <video
                        src={reelVideo}
                        controls
                        playsInline
                        poster={whyAcademyImage}
                        className="w-full h-auto max-h-[520px] object-cover bg-black"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}