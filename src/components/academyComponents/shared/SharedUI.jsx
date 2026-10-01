"use client";

import React from "react";
import { INK, GOLD, GOLD_DEEP, LINE } from "./constants";
import { Sparkles } from "lucide-react";

export function Eyebrow({ children, light = false, icon = true }) {
    return (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border shadow-xs"
            style={{
                backgroundColor: light ? "rgba(255,253,249,0.08)" : "#F4EEE1",
                borderColor: light ? "rgba(230,222,206,0.3)" : "#E6DECE"
            }}>
            {icon && <Sparkles className="size-3 shrink-0" style={{ color: light ? "#e3c9a3" : GOLD }} />}
            <span
                className="font-['Inter'] text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: light ? "#f4eee1" : GOLD_DEEP }}
            >
                {children}
            </span>
            {icon && <Sparkles className="size-3 shrink-0" style={{ color: light ? "#e3c9a3" : GOLD }} />}
        </div>
    );
}

export function GoldDivider({ center = false, light = false }) {
    return (
        <div className={`mt-5 flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
            <span className="h-px w-8 sm:w-12" style={{ backgroundColor: light ? "rgba(230,222,206,0.3)" : LINE }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: light ? "#ead9ae" : GOLD }} />
            <span className="h-px w-12 sm:w-16" style={{ backgroundColor: light ? "#ead9ae" : GOLD }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: light ? "#ead9ae" : GOLD }} />
            <span className="h-px w-8 sm:w-12" style={{ backgroundColor: light ? "rgba(230,222,206,0.3)" : LINE }} />
        </div>
    );
}

export function SectionHeading({ eyebrow, line1, line2, description, center = false, size = "md", light = false }) {
    const headingSize =
        size === "lg"
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.12]"
            : "text-2xl sm:text-3xl md:text-4xl lg:text-[38px] leading-[1.18]";

    return (
        <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
            {eyebrow && (
                <div className="mb-3.5">
                    <Eyebrow light={light}>{eyebrow}</Eyebrow>
                </div>
            )}
            <h2
                className={`font-['Cormorant_Garamond'] font-normal tracking-[-0.02em] ${headingSize}`}
                style={{ color: light ? "#fbf7f0" : INK }}
            >
                {line1}{" "}
                {line2 && (
                    <span className="italic font-medium" style={{ color: light ? "#ead9ae" : GOLD }}>
                        {line2}
                    </span>
                )}
            </h2>
            {description && (
                <p
                    className="mt-4 font-['Inter'] text-[13px] sm:text-[14px] leading-[1.8]"
                    style={{ color: light ? "#d0c7bb" : "#71665c" }}
                >
                    {description}
                </p>
            )}
        </div>
    );
}