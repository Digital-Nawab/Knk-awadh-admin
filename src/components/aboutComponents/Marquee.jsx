"use client";

import React from "react";
import { marqueeItems } from "./AboutData";

export default function Marquee() {
    return (
        <div className="bg-primary py-4 overflow-hidden">
            <div className="flex w-max animate-marquee">
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                    <span key={i} className="flex items-center font-sans text-xs tracking-[0.25em] text-cream uppercase px-6">
                        {item}
                        <span className="mx-6 text-gold">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}