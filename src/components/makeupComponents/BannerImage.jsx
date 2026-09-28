"use client";

import React from "react";
import { LINE } from "./Makeupdata";

export default function BannerImage({ src, alt }) {
    return (
        <section className="px-6 py-4">
            <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border" style={{ borderColor: LINE }}>
                <img src={src} alt={alt} className="w-full h-auto object-cover" />
            </div>
        </section>
    );
}