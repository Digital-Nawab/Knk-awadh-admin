"use client";

import React from "react";
import { INK, MUTED, GOLD, GOLD_DEEP, LINE, CREAM_DEEP, mentors } from "../shared/constants";
import { Eyebrow } from "../shared/SharedUI";

export default function Mentors() {
    return (
        <section className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
            <div className="max-w-3xl mx-auto mb-14 text-center">
                <Eyebrow>Learn From The Best</Eyebrow>
                <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                    Meet your <span className="italic" style={{ color: GOLD }}>mentors.</span>
                </h2>
                <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px] max-w-xl mx-auto" style={{ color: MUTED }}>
                    A mother-daughter duo leading a family-owned name across two
                    generations of makeup and hairstyling artistry in Lucknow.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
                {mentors.map((m) => (
                    <div key={m.name} className="bg-[#fffdf9] border rounded-2xl p-8" style={{ borderColor: LINE }}>
                        <div
                            className="h-14 w-14 rounded-full flex items-center justify-center font-['Cormorant_Garamond'] text-2xl italic mb-5"
                            style={{ backgroundColor: "#f4eee1", color: GOLD_DEEP, border: `1px solid ${LINE}` }}
                        >
                            {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium" style={{ color: INK }}>
                            {m.name}
                        </h3>
                        <p className="mt-1 font-['Inter'] text-[10px] tracking-[0.2em] uppercase" style={{ color: GOLD_DEEP }}>
                            {m.role}
                        </p>
                        <p className="mt-4 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                            {m.bio}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}