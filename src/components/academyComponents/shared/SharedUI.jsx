"use client";

import React from "react";
import { INK, GOLD, GOLD_DEEP, LINE } from "./constants";

export function Eyebrow({ children, light = false }) {
    return (
        <p
            className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em]"
            style={{ color: light ? "#e3c9a3" : GOLD_DEEP }}
        >
            {children}
        </p>
    );
}

export function GoldDivider({ center = false }) {
    return (
        <div className={`mt-8 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
            <span className="h-[2px] w-16" style={{ backgroundColor: GOLD }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            <span className="h-px w-10" style={{ backgroundColor: LINE }} />
        </div>
    );
}

export function SectionHeading({ eyebrow, line1, line2, center = false, size = "lg" }) {
    const sizeClasses =
        size === "lg"
            ? "text-[64px] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px] leading-[0.8]"
            : "text-[40px] sm:text-[52px] md:text-[58px] leading-[0.9]";
    return (
        <div className={center ? "text-center" : ""}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
                className={`mt-6 font-['Cormorant_Garamond'] font-medium tracking-[-0.05em] ${sizeClasses}`}
                style={{ color: INK }}
            >
                {line1}
                {line2 && (
                    <>
                        <br />
                        <span className="italic" style={{ color: GOLD }}>{line2}</span>
                    </>
                )}
            </h2>
        </div>
    );
}