"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const FALLBACK_BLOGS = [
    {
        id: 1,
        title: "The Royal Bridal Glow: Timeless Makeup Secrets from Awadh",
        slug: "royal-bridal-glow-awadh-makeup-secrets",
        excerpt: "Discover how regal Awadhi aesthetics, traditional skin preps, and contemporary HD artistry merge to craft the quintessential bridal radiance.",
        cover_image: "/assets/images/new/home/celebrity/7.webp",
        category: "Bridal Artistry",
        read_time: "5 min read",
    },
    {
        id: 2,
        title: "Nanoplastia vs Keratin: Which Treatment Restores Your Crown?",
        slug: "nanoplastia-vs-keratin-hair-treatment-guide",
        excerpt: "An expert breakdown on hair restructuring, organic amino acids, and choosing the perfect salon therapy for glossy, humidity-proof hair.",
        cover_image: "/assets/images/new/home/celebrity/5.webp",
        category: "Hair Care",
        read_time: "4 min read",
    },
    {
        id: 3,
        title: "The Art of Modern Gel Nail Extensions & French Accents",
        slug: "modern-gel-nail-extensions-french-accents",
        excerpt: "Why precision manicure care and custom-shaped gel extensions have become the ultimate subtle luxury accessory for modern women.",
        cover_image: "/assets/images/new/home/celebrity/4.webp",
        category: "Nails & Aesthetics",
        read_time: "3 min read",
    },
];

export default function BlogSection({ initialBlogs }) {
    const [blogs, setBlogs] = useState(() => (initialBlogs && initialBlogs.length > 0 ? initialBlogs : FALLBACK_BLOGS));

    useEffect(() => {
        if (initialBlogs && initialBlogs.length > 0) return;
        async function fetchLatest() {
            try {
                const res = await fetch("/api/blogs?publishedOnly=true");
                if (res.ok) {
                    const data = await res.json();
                    if (data.blogs && data.blogs.length > 0) {
                        setBlogs(data.blogs.slice(0, 3));
                    }
                }
            } catch {
                // Keep fallbacks
            }
        }
        fetchLatest();
    }, []);

    return (
        <section id="journal" className="relative overflow-hidden bg-[#f8f6f1] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-[#e8e2d5]">
            {/* Ambient decorative background glows */}
            <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#c49a4d]/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#9e7785]/5 blur-3xl" />

            {/* Subtle background typography watermark */}
            <span className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-['Cormorant_Garamond'] text-[170px] lg:text-[230px] font-medium leading-none text-[#29231f]/[0.025] hidden xl:block">
                JOURNAL
            </span>

            <div className="relative mx-auto max-w-[1280px]">
                {/* Header — aligned with Services & FAQ pattern */}
                <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1fr_auto]">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#c49a4d]" />
                            <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.35em] text-[#a47a59]">
                                The KNK Journal
                            </span>
                        </div>
                        <h2 className="font-['Cormorant_Garamond'] text-[52px] sm:text-[68px] lg:text-[82px] font-medium leading-[0.88] tracking-[-0.04em] text-[#272523]">
                            Tales of Artistry
                            <br />
                            <span className="italic text-[#c49a4d]">&amp; Care.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start lg:items-end justify-end gap-4 pb-1">
                        <p className="max-w-[320px] font-['Inter'] text-[13px] font-normal leading-[1.75] text-[#5e5a55] lg:text-right">
                            Curated beauty masterclasses, bridal rituals, and hair artistry straight from Awadh.
                        </p>
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-3 border-b border-[#272523] pb-1.5 font-['Inter'] text-[10px] font-medium tracking-[0.22em] uppercase text-[#272523] transition-all duration-300 hover:border-[#c49a4d] hover:text-[#c49a4d]"
                        >
                            <span>Explore The Entire Journal</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((item) => (
                        <article
                            key={item.id}
                            className="group relative bg-[#fffdf9] rounded-3xl border border-[#e6dece] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe hover:border-[#c49a4d]/50"
                        >
                            <div>
                                <div className="relative h-60 sm:h-64 overflow-hidden">
                                    <img
                                        src={item.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                                        alt={item.title}
                                        width={400}
                                        height={256}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full font-['Inter'] text-[9px] tracking-[0.16em] uppercase font-semibold text-[#8b694d] shadow-sm border border-[#e6dece]/80">
                                        {item.category || "Journal"}
                                    </span>
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="h-px w-3 bg-[#c49a4d]" />
                                        <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.2em] text-[#a47a59]">
                                            {item.read_time || "4 min read"}
                                        </span>
                                    </div>
                                    <Link href={`/blog/${item.slug}`} className="block">
                                        <h3 className="font-['Cormorant_Garamond'] text-[24px] sm:text-[26px] font-medium leading-[1.22] tracking-[-0.015em] text-[#272523] group-hover:text-[#c49a4d] transition-colors line-clamp-2 min-h-[3.6rem]">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="mt-3 font-['Inter'] text-[13px] font-normal leading-[1.75] text-[#6b6257] line-clamp-3 min-h-[4.4rem]">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </div>
                            <div className="px-7 pb-6 pt-0">
                                <div className="pt-5 border-t border-[#f0eae1] flex items-center justify-between">
                                    <Link
                                        href={`/blog/${item.slug}`}
                                        className="font-['Inter'] text-[10px] tracking-[0.2em] uppercase font-semibold text-[#272523] group-hover:text-[#c49a4d] transition-colors flex items-center gap-1.5"
                                    >
                                        <span>Read Story</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                                    </Link>
                                    <span className="font-['Inter'] text-[9px] tracking-[0.18em] uppercase text-[#a49a90]">
                                        KNK Awadh
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
