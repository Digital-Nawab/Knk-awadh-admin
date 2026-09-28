"use client";

import React from "react";
import { Eyebrow, GoldDivider } from "./Makeupui";
import { INK, MUTED, GOLD } from "./Makeupdata";

export default function Services() {
    return (
        <section id="services" className="px-6 py-20 md:py-24">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-[560px] mx-auto text-center mb-16">
                    <Eyebrow>Book Your Slot</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Bridal makeup <span className="italic" style={{ color: GOLD }}>services.</span>
                    </h2>
                    <GoldDivider center />
                    <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                        Ready to lock in your wedding makeup appointment? Our artists are
                        focused on one thing — making sure you look composed, radiant and
                        entirely camera-ready on the day itself.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-14 items-center">
                    <div>
                        <h3 className="font-['Cormorant_Garamond'] text-[28px] font-medium leading-tight mb-4" style={{ color: INK }}>
                            Airbrush Bridal Makeup
                        </h3>
                        <p className="font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                            Airbrush has become the default for brides who want makeup that
                            photographs beautifully without feeling heavy on the skin. A fine
                            mist of foundation blends seamlessly and holds up through long
                            ceremonies, giving a natural, breathable finish rather than a
                            mask — the same technique celebrities and wedding professionals
                            reach for.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-['Cormorant_Garamond'] text-[28px] font-medium leading-tight mb-4" style={{ color: INK }}>
                            Party Makeup
                        </h3>
                        <p className="font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                            For receptions, sangeets and every celebration in between, our
                            party makeup service pairs a polished, long-wear finish with
                            styling that photographs well under any lighting — glamorous
                            without needing constant touch-ups through the evening.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}