import React from "react";
import Layout from "@/layout/Layout";
import Link from "next/link";
import BlogModel from "@/models/BlogModel";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata("/blog", {
        title: "The Luxury Beauty & Hair Journal | KNK Salon Awadh",
        description: "Explore bridal secrets, hair care masterclasses, and aesthetic wellness guides from the master stylists at KNK Salon Awadh Lucknow.",
    });
}

export default async function BlogIndexPage({ searchParams }) {
    const params = await searchParams;
    const category = params?.category || "all";

    let blogs = [];
    try {
        blogs = await BlogModel.getAll({ category, publishedOnly: true });
    } catch {
        blogs = [];
    }

    const categories = [
        { label: "All Stories", value: "all" },
        { label: "Bridal Artistry", value: "Bridal Artistry" },
        { label: "Hair Care", value: "Hair Care" },
        { label: "Nails & Aesthetics", value: "Nails & Aesthetics" },
        { label: "Skin Rituals", value: "Skin Rituals" },
    ];

    const featured = blogs[0];
    const restBlogs = blogs.slice(1);

    return (
        <Layout>
            <main className="bg-[#fbf7f0] min-h-screen pt-28 pb-24 text-ink">
                {/* Header */}
                <section className="px-5 md:px-10 lg:px-16 max-w-7xl mx-auto text-center pt-8 pb-14">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-10 bg-gold" />
                        <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold-deep font-semibold">
                            The KNK Journal
                        </span>
                        <span className="h-px w-10 bg-gold" />
                    </div>
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl italic font-medium tracking-tight text-[#241d18]">
                        Chronicles of Elegance &amp; Craft
                    </h1>
                    <p className="mt-5 font-sans text-xs sm:text-sm text-muted max-w-2xl mx-auto leading-relaxed">
                        Curated guides, bridal preparations, and haircare secrets from Lucknow's premier luxury salon and artistry academy.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
                        {categories.map((c) => {
                            const isActive = category === c.value;
                            return (
                                <Link
                                    key={c.value}
                                    href={c.value === "all" ? "/blog" : `/blog?category=${encodeURIComponent(c.value)}`}
                                    className={`px-5 py-2 rounded-full font-sans text-[11px] tracking-wider uppercase transition-all duration-300 ${
                                        isActive
                                            ? "bg-ink text-cream shadow-sm"
                                            : "bg-[#f4ede1] text-muted hover:text-ink hover:bg-[#eae0d0]"
                                    }`}
                                >
                                    {c.label}
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 space-y-16">
                    {/* Featured Article Hero Spotlight */}
                    {featured && category === "all" && (
                        <div className="bg-white rounded-3xl border border-[#e6dece] overflow-hidden shadow-luxe grid lg:grid-cols-[1.2fr_0.8fr] group">
                            <div className="relative h-72 sm:h-96 lg:h-full overflow-hidden">
                                <img
                                    src={featured.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                                    alt={featured.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-ink/80 backdrop-blur text-cream px-3 py-1 rounded-full font-sans text-[10px] tracking-wider uppercase">
                                        Featured Story
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 sm:p-12 flex flex-col justify-between bg-card">
                                <div>
                                    <div className="flex items-center gap-3 text-gold-deep font-sans text-[11px] tracking-[0.2em] uppercase mb-4">
                                        <span>{featured.category}</span>
                                        <span>•</span>
                                        <span>{featured.read_time || "4 min read"}</span>
                                    </div>
                                    <Link href={`/blog/${featured.slug}`}>
                                        <h2 className="font-display text-3xl sm:text-4xl italic text-ink hover:text-gold-deep transition-colors leading-tight">
                                            {featured.title}
                                        </h2>
                                    </Link>
                                    <p className="mt-4 font-sans text-xs sm:text-[13px] text-muted leading-relaxed line-clamp-3">
                                        {featured.excerpt}
                                    </p>
                                </div>
                                <div className="pt-8 flex items-center justify-between border-t border-border mt-6">
                                    <span className="font-sans text-[11px] text-muted uppercase tracking-wider">
                                        By {featured.author}
                                    </span>
                                    <Link
                                        href={`/blog/${featured.slug}`}
                                        className="font-sans text-xs tracking-[0.18em] uppercase text-ink font-semibold flex items-center gap-1.5 hover:text-gold-deep transition-colors"
                                    >
                                        Read Article <span>↗</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Article Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(category === "all" ? restBlogs : blogs).map((article) => (
                            <article
                                key={article.id}
                                className="bg-white rounded-2xl border border-[#e6dece] overflow-hidden flex flex-col justify-between hover:shadow-luxe transition-all duration-300 group"
                            >
                                <div>
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={article.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-sans text-[9px] tracking-wider uppercase font-semibold text-gold-deep">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 font-sans text-[10px] text-muted tracking-wider uppercase mb-2">
                                            <span>{new Date(article.published_at || article.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                                            <span>•</span>
                                            <span>{article.read_time || "3 min read"}</span>
                                        </div>
                                        <Link href={`/blog/${article.slug}`}>
                                            <h3 className="font-display text-2xl italic text-ink hover:text-gold-deep transition-colors leading-snug line-clamp-2">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="mt-3 font-sans text-xs text-muted leading-relaxed line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </div>
                                <div className="px-6 pb-6 pt-2 border-t border-[#f2ede4] flex items-center justify-between">
                                    <span className="font-sans text-[10px] text-muted uppercase">
                                        {article.author}
                                    </span>
                                    <Link
                                        href={`/blog/${article.slug}`}
                                        className="font-sans text-[11px] tracking-wider uppercase text-gold-deep font-semibold hover:underline flex items-center gap-1"
                                    >
                                        Read More <span>→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {blogs.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-border p-8">
                            <p className="font-display text-2xl italic text-muted">No journal stories found in this section.</p>
                            <Link href="/blog" className="mt-4 inline-block font-sans text-xs tracking-wider uppercase text-gold-deep hover:underline">
                                View all stories
                            </Link>
                        </div>
                    )}

                    {/* Bottom CTA Banner */}
                    <section className="rounded-3xl bg-ink text-cream p-8 sm:p-14 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-xl mx-auto space-y-4">
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold">
                                Experience The Craft
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl italic">
                                Ready to bring your hair and skin vision to life?
                            </h2>
                            <p className="font-sans text-xs sm:text-[13px] text-cream/70 leading-relaxed">
                                Book a tailored consultation with our master artists across Mahanagar, Hazratganj, and Gomti Nagar.
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/#book"
                                    className="inline-block bg-gradient-gold px-8 py-3.5 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase text-primary font-semibold shadow-luxe hover:scale-105 transition-transform"
                                >
                                    Reserve Your Appointment
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
