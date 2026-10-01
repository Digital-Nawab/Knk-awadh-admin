"use client";

import React, { useRef, useState } from "react";
import { INK, GOLD, LINE, whyAcademyImage, reelVideo } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Play, Sparkles, Check, Volume2, Maximize } from "lucide-react";

export default function VideoShowcase() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function togglePlay() {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }

    return (
        <section className="relative px-5 sm:px-8 py-20 md:py-28 bg-[#241d18] text-[#fbf7f0] overflow-hidden">
            {/* Ambient luxury glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#b58a52]/10 blur-3xl pointer-events-none rounded-full"
                aria-hidden="true"
            />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
                    <SectionHeading
                        eyebrow="Campus & Culture"
                        line1="Experience the studio"
                        line2="in motion."
                        description="Step inside our Lucknow masterclass studios. Watch our mentors and students sculpt high-fashion looks, perfect bridal contouring, and test runway hairstyles under professional lighting."
                        center
                        light
                    />
                    <div className="flex justify-center">
                        <GoldDivider center light />
                    </div>
                </div>

                {/* Cinema Letterbox Frame */}
                <div className="relative rounded-3xl overflow-hidden border border-[#b58a52]/40 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.8)] bg-black max-w-4xl mx-auto group">
                    {/* Decorative gold corner brackets */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#ead9ae] z-20 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#ead9ae] z-20 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#ead9ae] z-20 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#ead9ae] z-20 pointer-events-none" />

                    <video
                        ref={videoRef}
                        src={reelVideo}
                        controls
                        playsInline
                        preload="metadata"
                        poster={whyAcademyImage}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-auto max-h-[540px] object-cover mx-auto cursor-pointer"
                        onClick={togglePlay}
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Subtle Overlay Badge */}
                    <div className="absolute top-3 left-3 sm:top-5 sm:left-6 pointer-events-none z-10 flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 text-[#ead9ae]">
                        <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-['Inter'] text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] font-semibold">
                            Studio Reel • Live Session
                        </span>
                    </div>
                </div>

                {/* Studio Feature Pillars */}
                <div className="mt-8 sm:mt-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Sparkles className="size-4 text-[#ead9ae] mx-auto mb-1.5" />
                        <p className="font-['Cormorant_Garamond'] text-base sm:text-lg font-medium text-white">High-CRI Lighting</p>
                        <p className="font-['Inter'] text-[10.5px] sm:text-[11px] text-[#a89d91]">True-to-skin color vanity mirrors</p>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Sparkles className="size-4 text-[#ead9ae] mx-auto mb-1.5" />
                        <p className="font-['Cormorant_Garamond'] text-base sm:text-lg font-medium text-white">Live Model Demos</p>
                        <p className="font-['Inter'] text-[10.5px] sm:text-[11px] text-[#a89d91]">Hands-on practice every week</p>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Sparkles className="size-4 text-[#ead9ae] mx-auto mb-1.5" />
                        <p className="font-['Cormorant_Garamond'] text-base sm:text-lg font-medium text-white">Airbrush Stations</p>
                        <p className="font-['Inter'] text-[10.5px] sm:text-[11px] text-[#a89d91]">Professional compressor guns</p>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                        <Sparkles className="size-4 text-[#ead9ae] mx-auto mb-1.5" />
                        <p className="font-['Cormorant_Garamond'] text-base sm:text-lg font-medium text-white">Editorial Shoots</p>
                        <p className="font-['Inter'] text-[10.5px] sm:text-[11px] text-[#a89d91]">Dedicated portfolio lighting studio</p>
                    </div>
                </div>
            </div>
        </section>
    );
}