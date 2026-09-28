import React from "react";
import Layout from "@/layout/Layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogModel from "@/models/BlogModel";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await BlogModel.getBySlug(slug);

    if (!blog) {
        return {
            title: "Article Not Found | KNK Salon Awadh",
        };
    }

    return await getDynamicMetadata(`/blog/${slug}`, {
        title: `${blog.title} | KNK Salon Awadh`,
        description: blog.excerpt,
        ogImage: blog.cover_image || "/assets/images/new/home/celebrity/7.webp",
        keywords: blog.tags || blog.category || "beauty, hair, salon awadh",
    });
}


export default async function SingleBlogPage({ params }) {
    const { slug } = await params;
    const blog = await BlogModel.getBySlug(slug);

    if (!blog) {
        notFound();
    }

    let relatedArticles = [];
    try {
        const all = await BlogModel.getAll({ category: blog.category, publishedOnly: true });
        relatedArticles = all.filter((b) => b.id !== blog.id).slice(0, 3);
    } catch {
        relatedArticles = [];
    }

    return (
        <Layout>
            <main className="bg-[#fbf7f0] min-h-screen pt-28 pb-24 text-ink">
                {/* Article Header Container */}
                <article className="max-w-4xl mx-auto px-5 sm:px-8 pt-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 font-sans text-[11px] text-muted tracking-wider uppercase mb-8">
                        <Link href="/" className="hover:text-ink">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-ink">The Journal</Link>
                        <span>/</span>
                        <span className="text-gold-deep truncate max-w-[200px]">{blog.category}</span>
                    </nav>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="bg-[#f3ece0] text-gold-deep border border-[#e4d8c1] px-3.5 py-1 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase font-semibold">
                            {blog.category}
                        </span>
                        <span className="text-muted text-xs font-sans">
                            {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-IN", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span className="text-muted text-xs font-sans">•</span>
                        <span className="text-muted text-xs font-sans">{blog.read_time || "4 min read"}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl italic text-[#221c17] leading-[1.1] tracking-tight">
                        {blog.title}
                    </h1>

                    {/* Author sub-header */}
                    <div className="flex items-center gap-4 py-6 border-y border-[#e6dece] mt-8 mb-8">
                        <div className="w-11 h-11 rounded-full bg-ink text-gold font-display text-xl flex items-center justify-center font-bold">
                            K
                        </div>
                        <div>
                            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink">
                                {blog.author}
                            </p>
                            <p className="font-sans text-[11px] text-muted">
                                Senior Editorial &amp; Salon Master Stylists, Awadh
                            </p>
                        </div>
                    </div>

                    {/* Full Hero Cover Image */}
                    <div className="relative rounded-3xl overflow-hidden border border-[#e2dacb] shadow-luxe mb-12">
                        <img
                            src={blog.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                            alt={blog.title}
                            className="w-full h-auto max-h-[520px] object-cover"
                        />
                    </div>

                    {/* Article Body */}
                    <div
                        className="prose prose-stone max-w-none font-sans text-[15px] sm:text-base leading-relaxed text-[#3a322c] space-y-6 [&>p]:leading-[1.85] [&>h3]:font-display [&>h3]:text-3xl [&>h3]:italic [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-3 [&>blockquote]:border-l-2 [&>blockquote]:border-gold [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:font-display [&>blockquote]:text-[#221c17] [&>blockquote]:my-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul>li]:text-[#3a322c]"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    {blog.tags && (
                        <div className="pt-10 mt-10 border-t border-[#e6dece] flex flex-wrap items-center gap-2">
                            <span className="font-sans text-[11px] uppercase tracking-wider text-muted mr-2">Tags:</span>
                            {blog.tags.split(",").map((t, idx) => (
                                <span
                                    key={idx}
                                    className="bg-white border border-border px-3 py-1 rounded-lg text-xs font-sans text-muted"
                                >
                                    #{t.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Social Share & Back */}
                    <div className="mt-10 p-6 bg-white rounded-2xl border border-border flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="font-sans text-xs uppercase tracking-wider text-muted font-semibold">
                                Share Story:
                            </span>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(blog.title)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-sans font-medium flex items-center gap-1.5"
                            >
                                WhatsApp
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-ink text-cream rounded-lg text-xs font-sans font-medium"
                            >
                                X (Twitter)
                            </a>
                        </div>
                        <Link
                            href="/blog"
                            className="font-sans text-xs uppercase tracking-wider text-gold-deep hover:underline"
                        >
                            ← Back to all stories
                        </Link>
                    </div>

                    {/* In-Article Booking Card */}
                    <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-secondary/80 border border-border text-center space-y-4">
                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep font-semibold">
                            Indulge in Awadh Royalty
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl italic text-ink">
                            Ready for your personalized transformation?
                        </h3>
                        <p className="font-sans text-xs text-muted max-w-md mx-auto leading-relaxed">
                            Book a bespoke styling, skin glow, or bridal look with the creators behind this story.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/#book"
                                className="inline-block bg-ink text-cream hover:bg-gold-deep px-8 py-3.5 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-md"
                            >
                                Book Appointment Now ↗
                            </Link>
                        </div>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-[#e2dacb]">
                            <h3 className="font-display text-3xl italic text-ink mb-8 text-center sm:text-left">
                                More Stories You'll Adore
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedArticles.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        href={`/blog/${rel.slug}`}
                                        className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-luxe transition-all duration-300 group block"
                                    >
                                        <div className="h-44 overflow-hidden">
                                            <img
                                                src={rel.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                                                alt={rel.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <span className="font-sans text-[9px] uppercase tracking-wider text-gold-deep font-semibold block mb-1">
                                                {rel.category}
                                            </span>
                                            <h4 className="font-display text-xl italic text-ink line-clamp-2 leading-snug group-hover:text-gold-deep transition-colors">
                                                {rel.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </main>
        </Layout>
    );
}
