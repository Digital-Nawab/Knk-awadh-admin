"use client";

import React from "react";

export default function JaaliDivider() {
    return (
        <div className="w-full overflow-hidden py-3 bg-cream" aria-hidden="true">
            <svg width="100%" height="28" viewBox="0 0 240 28" preserveAspectRatio="xMidYMid meet" className="text-gold">
                <defs>
                    <pattern id="jaali" width="30" height="28" patternUnits="userSpaceOnUse">
                        <path d="M15 2 L28 14 L15 26 L2 14 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <circle cx="15" cy="14" r="2" fill="currentColor" opacity="0.6" />
                    </pattern>
                </defs>
                <rect width="240" height="28" fill="url(#jaali)" />
            </svg>
        </div>
    );
}