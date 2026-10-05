"use client";

import React from "react";
import { LINE } from "./Makeupdata";

export default function BannerImage({ src, alt, data }) {
    const bannerSrc = data?.image || data?.src || src;
    const bannerAlt = data?.altText || data?.alt_text || alt || "KNK Awadh Makeup Studio Lucknow";

    return (
        <section className="px-6 py-4">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border" style={{ borderColor: LINE }}>
                <img src={bannerSrc} alt={bannerAlt} loading="lazy" decoding="async" className="w-full h-auto object-cover" />
            </div>
        </section>
    );
}