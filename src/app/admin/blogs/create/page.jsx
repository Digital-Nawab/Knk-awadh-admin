"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBlogCreatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        category: "Bridal Artistry",
        author: "KNK Editorial Team",
        excerpt: "",
        content: "",
        tags: "",
        isPublished: true,
    });

    const handleTitleChange = (e) => {
        const val = e.target.value;
        const autoSlug = val
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        setForm((prev) => ({ ...prev, title: val, slug: autoSlug }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.title.trim()) {
            setError("Title is required.");
            return;
        }
        if (!form.excerpt.trim()) {
            setError("Short excerpt is required.");
            return;
        }
        if (!form.content.trim()) {
            setError("Content is required.");
            return;
        }

        const formData = new FormData(e.target);
        formData.set("isPublished", form.isPublished ? "true" : "false");

        setLoading(true);
        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/admin/blogs");
            } else {
                setError(data.error || "Failed to publish article.");
            }
        } catch {
            setError("Network error while creating article.");
        } finally {
            setLoading(false);
        }
    };

    const insertFormatting = (tag) => {
        let snippet = "";
        if (tag === "h3") snippet = "<h3>Heading</h3>\n";
        if (tag === "p") snippet = "<p>Your paragraph text here...</p>\n";
        if (tag === "quote") snippet = '<blockquote>"A memorable quote or client tip"</blockquote>\n';
        if (tag === "ul") snippet = "<ul>\n  <li>Feature point 1</li>\n  <li>Feature point 2</li>\n</ul>\n";

        setForm((prev) => ({ ...prev, content: prev.content + "\n" + snippet }));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-[#e2dbd2] pb-6">
                <div>
                    <Link
                        href="/admin/blogs"
                        className="text-xs font-sans uppercase tracking-wider text-muted hover:text-ink flex items-center gap-1 mb-2"
                    >
                        ← Back to Stories
                    </Link>
                    <h1 className="font-display text-4xl italic text-ink">Write New Editorial Story</h1>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-sans">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6">
                    {/* Title & Slug */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                                Story Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleTitleChange}
                                required
                                placeholder="e.g. The Royal Bridal Glow: Timeless Makeup Secrets from Awadh"
                                className="w-full px-4 py-3 border border-border rounded-xl font-display text-xl text-ink focus:outline-none focus:border-gold bg-[#fbfaf7]"
                            />
                        </div>

                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                URL Slug (Auto-generated)
                            </label>
                            <div className="flex items-center border border-border rounded-xl bg-[#f7f4ee] px-3">
                                <span className="text-muted text-xs font-mono">/blog/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={form.slug}
                                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    className="w-full py-2.5 px-1 bg-transparent font-mono text-xs text-ink focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-2.5 border border-border rounded-xl font-sans text-xs text-ink bg-white focus:outline-none focus:border-gold"
                            >
                                <option>Bridal Artistry</option>
                                <option>Hair Care</option>
                                <option>Nails &amp; Aesthetics</option>
                                <option>Skin Rituals</option>
                                <option>Trends &amp; Styling</option>
                            </select>
                        </div>
                    </div>

                    {/* Author & Tags */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                Author Name
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={form.author}
                                onChange={(e) => setForm({ ...form, author: e.target.value })}
                                className="w-full px-4 py-2.5 border border-border rounded-xl font-sans text-xs text-ink bg-white focus:outline-none focus:border-gold"
                            />
                        </div>
                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                Keywords / Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={form.tags}
                                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                                placeholder="Bridal, Hair, Keratin, Lucknow"
                                className="w-full px-4 py-2.5 border border-border rounded-xl font-sans text-xs text-ink bg-white focus:outline-none focus:border-gold"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                            Short Excerpt (Preview summary for home and listing cards) *
                        </label>
                        <textarea
                            name="excerpt"
                            rows={3}
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            required
                            placeholder="A concise 2-3 sentence overview of this story..."
                            className="w-full px-4 py-3 border border-border rounded-xl font-sans text-xs text-ink bg-[#fbfaf7] focus:outline-none focus:border-gold resize-none"
                        />
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                        <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                            Cover Image (Recommended: 1200x800 WEBP or JPG)
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-2 border-dashed border-[#dcd2c3] p-5 rounded-2xl bg-[#faf7f2]">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-24 object-cover rounded-xl border border-border shadow-sm shrink-0"
                                />
                            ) : (
                                <div className="w-32 h-24 bg-cream rounded-xl border border-border flex items-center justify-center text-muted text-xs shrink-0">
                                    No image
                                </div>
                            )}
                            <div className="space-y-1">
                                <input
                                    type="file"
                                    name="coverImage"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-ink file:text-cream hover:file:bg-gold-deep cursor-pointer"
                                />
                                <p className="text-[11px] text-muted">
                                    Upload luxury high-resolution photo for the article banner.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted font-semibold">
                                Article Content (HTML / Rich Format) *
                            </label>
                            <div className="flex items-center gap-1.5 text-[11px] font-sans">
                                <span className="text-muted mr-1">Insert:</span>
                                <button
                                    type="button"
                                    onClick={() => insertFormatting("h3")}
                                    className="px-2 py-0.5 bg-cream border border-border rounded hover:bg-gold-soft/50"
                                >
                                    + Heading
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertFormatting("p")}
                                    className="px-2 py-0.5 bg-cream border border-border rounded hover:bg-gold-soft/50"
                                >
                                    + Paragraph
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertFormatting("quote")}
                                    className="px-2 py-0.5 bg-cream border border-border rounded hover:bg-gold-soft/50"
                                >
                                    + Quote
                                </button>
                                <button
                                    type="button"
                                    onClick={() => insertFormatting("ul")}
                                    className="px-2 py-0.5 bg-cream border border-border rounded hover:bg-gold-soft/50"
                                >
                                    + List
                                </button>
                            </div>
                        </div>
                        <textarea
                            name="content"
                            rows={12}
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            required
                            placeholder="Write your story using HTML tags like <p>, <h3>, <blockquote>, <ul>, etc."
                            className="w-full p-4 border border-border rounded-xl font-sans text-xs text-ink bg-white focus:outline-none focus:border-gold leading-relaxed font-mono"
                        />
                    </div>

                    {/* Publish checkbox */}
                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="isPublished"
                            checked={form.isPublished}
                            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                            className="h-4 w-4 rounded border-border text-gold focus:ring-gold"
                        />
                        <label htmlFor="isPublished" className="font-sans text-xs text-ink font-medium cursor-pointer">
                            Publish immediately to website and homepage
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Link
                        href="/admin/blogs"
                        className="px-6 py-3 border border-border rounded-xl font-sans text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-ink hover:bg-gold-deep text-cream rounded-xl font-sans text-xs uppercase tracking-wider transition-colors disabled:opacity-60 shadow-md"
                    >
                        {loading ? "Publishing..." : "Publish Editorial Story ↗"}
                    </button>
                </div>
            </form>
        </div>
    );
}
