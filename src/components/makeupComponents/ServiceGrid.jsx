"use client";

import React from "react";
import { INK, MUTED, LINE, makeupServices } from "./Makeupdata";

export default function ServiceGrid() {
    return (
        <section className="px-6 py-16 md:py-20" style={{ backgroundColor: "#f4eee1" }}>
            <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
                {makeupServices.map((s) => (
                    <div key={s.title} className="bg-[#fffdf9] border rounded-2xl p-7" style={{ borderColor: LINE }}>
                        <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium mb-2" style={{ color: INK }}>
                            {s.title}
                        </h3>
                        <p className="font-['Inter'] text-[13px] leading-relaxed" style={{ color: MUTED }}>
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}