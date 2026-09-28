"use client";

import React from "react";
import { GOLD, DARK, stats } from "../shared/constants";

export default function StatsBar() {
    return (
        <section className="px-6" style={{ backgroundColor: DARK }}>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                {stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="font-['Cormorant_Garamond'] text-[40px] sm:text-[48px] font-medium leading-none" style={{ color: GOLD }}>
                            {s.value}
                        </p>
                        <p className="mt-3 font-['Inter'] text-[10px] tracking-[0.2em] uppercase" style={{ color: "#d0c7bb" }}>
                            {s.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}