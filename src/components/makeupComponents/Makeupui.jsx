"use client";

import React from "react";
import { GOLD, GOLD_DEEP, LINE } from "./Makeupdata";

export function Eyebrow({ children }) {
    return (
        <p className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em]" style={{ color: GOLD_DEEP }}>
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