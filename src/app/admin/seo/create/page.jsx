"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSeoCreatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const [form, setForm] = useState({
        pagePath: "/",
        pageName: "Homepage",
        metaTitle: "KNK Salon Awadh | Luxury Hair, Skin & Bridal Studio Lucknow",
        metaDescription: "Experience royal luxury at KNK Salon Awadh, Lucknow. Hair colour, keratin, HydraFacials, celebrity bridal makeup, and beauty academy.",
        metaKeywords: "luxury salon lucknow, bridal makeup awadh, best hair salon lucknow",
        canonicalUrl: "",
        robots: "index, follow",
    });

    const routePresets = [
        { path: "/", name: "Homepage" },
        { path: "/about", name: "About Us" },
        { path: "/services", name: "All Services" },
        { path: "/services/hair", name: "Hair Services" },
        { path: "/services/nail-art", name: "Nails & Art" },
        { path: "/services/beauty", name: "Beauty & Waxing" },
        { path: "/services/facial", name: "Facials & Skincare" },
        { path: "/services/body", name: "Body Therapies" },
        { path: "/makeup", name: "Celebrity & Bridal Makeup" },
        { path: "/academy", name: "Beauty Academy" },
        { path: "/gallery", name: "Lookbook Gallery" },
        { path: "/blog", name: "The Journal" },
    ];

    const handlePresetSelect = (preset) => {
        setForm((prev) => ({
            ...prev,
            pagePath: preset.path,
            pageName: preset.name,
        }));
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

        if (!form.pagePath.trim()) {
            setError("Page URL path is required.");
            return;
        }
        if (!form.metaTitle.trim()) {
            setError("Meta title is required.");
            return;
        }
        if (!form.metaDescription.trim()) {
            setError("Meta description is required.");
            return;
        }

        const formData = new FormData(e.target);

        setLoading(true);
        try {
            const res = await fetch("/api/seo", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                router.push("/admin/seo");
            } else {
                setError(data.error || "Failed to save SEO metadata.");
            }
        } catch {
            setError("Network error while saving SEO metadata.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-[#e2dbd2] pb-6">
                <div>
                    <Link
                        href="/admin/seo"
                        className="text-xs font-sans uppercase tracking-wider text-muted hover:text-ink flex items-center gap-1 mb-2"
                    >
                        ← Back to Master SEO
                    </Link>
                    <h1 className="font-display text-4xl italic text-ink">Add Page SEO Metadata</h1>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-sans">
                    {error}
                </div>
            )}

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-sm space-y-6">
                        {/* Route Presets */}
                        <div>
                            <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                                Quick Select Route Presets:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {routePresets.map((p) => (
                                    <button
                                        key={p.path}
                                        type="button"
                                        onClick={() => handlePresetSelect(p)}
                                        className={`px-3 py-1 rounded-lg text-xs font-mono border transition-colors ${
                                            form.pagePath === p.path
                                                ? "bg-ink text-cream border-ink"
                                                : "bg-[#f8f5ee] border-border text-muted hover:text-ink"
                                        }`}
                                    >
                                        {p.path}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Path & Name */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                                    Page URL Path *
                                </label>
                                <input
                                    type="text"
                                    name="pagePath"
                                    value={form.pagePath}
                                    onChange={(e) => setForm({ ...form, pagePath: e.target.value })}
                                    required
                                    placeholder="/services/hair"
                                    className="w-full px-4 py-2.5 border border-border rounded-xl font-mono text-xs text-ink focus:outline-none focus:border-gold bg-[#fbfaf7]"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                                    Page Name / Friendly Label *
                                </label>
                                <input
                                    type="text"
                                    name="pageName"
                                    value={form.pageName}
                                    onChange={(e) => setForm({ ...form, pageName: e.target.value })}
                                    required
                                    placeholder="Hair Care Studio"
                                    className="w-full px-4 py-2.5 border border-border rounded-xl font-sans text-xs text-ink focus:outline-none focus:border-gold bg-[#fbfaf7]"
                                />
                            </div>
                        </div>

                        {/* Meta Title */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted font-semibold">
                                    Meta Title *
                                </label>
                                <span
                                    className={`font-mono text-[10px] ${
                                        form.metaTitle.length >= 50 && form.metaTitle.length <= 60
                                            ? "text-emerald-600 font-bold"
                                            : form.metaTitle.length > 60
                                            ? "text-amber-600"
                                            : "text-muted"
                                    }`}
                                >
                                    {form.metaTitle.length}/60 chars (Recommended: 50-60)
                                </span>
                            </div>
                            <input
                                type="text"
                                name="metaTitle"
                                value={form.metaTitle}
                                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-sm text-ink focus:outline-none focus:border-gold"
                            />
                        </div>

                        {/* Meta Description */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted font-semibold">
                                    Meta Description *
                                </label>
                                <span
                                    className={`font-mono text-[10px] ${
                                        form.metaDescription.length >= 130 && form.metaDescription.length <= 160
                                            ? "text-emerald-600 font-bold"
                                            : form.metaDescription.length > 160
                                            ? "text-amber-600"
                                            : "text-muted"
                                    }`}
                                >
                                    {form.metaDescription.length}/160 chars (Recommended: 130-160)
                                </span>
                            </div>
                            <textarea
                                name="metaDescription"
                                rows={3}
                                value={form.metaDescription}
                                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-border rounded-xl font-sans text-xs text-ink focus:outline-none focus:border-gold resize-none leading-relaxed"
                            />
                        </div>

                        {/* Keywords */}
                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                Meta Keywords (Comma separated)
                            </label>
                            <input
                                type="text"
                                name="metaKeywords"
                                value={form.metaKeywords}
                                onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                                placeholder="salon lucknow, bridal makeup, hair keratin, best beauty parlour"
                                className="w-full px-4 py-2.5 border border-border rounded-xl font-sans text-xs text-ink focus:outline-none focus:border-gold"
                            />
                        </div>

                        {/* OG Social Image */}
                        <div>
                            <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2 font-semibold">
                                OpenGraph Social Share Image (1200x630 for Facebook/WhatsApp/X)
                            </label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-dashed border-[#dcd2c3] p-4 rounded-xl bg-[#faf7f2]">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-28 h-16 object-cover rounded-lg border border-border shadow-xs shrink-0"
                                    />
                                ) : (
                                    <div className="w-28 h-16 bg-cream rounded-lg border border-border flex items-center justify-center text-muted text-[10px] shrink-0">
                                        Default Logo
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="ogImage"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="text-xs text-muted file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-ink file:text-cream hover:file:bg-gold-deep cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Canonical & Robots */}
                        <div className="grid sm:grid-cols-2 gap-5 pt-2">
                            <div>
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                    Canonical URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="canonicalUrl"
                                    value={form.canonicalUrl}
                                    onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                                    placeholder="https://knksalon.in/services/hair"
                                    className="w-full px-4 py-2 border border-border rounded-xl font-mono text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted block mb-2">
                                    Robots Directive
                                </label>
                                <select
                                    name="robots"
                                    value={form.robots}
                                    onChange={(e) => setForm({ ...form, robots: e.target.value })}
                                    className="w-full px-4 py-2 border border-border rounded-xl font-sans text-xs text-ink bg-white focus:outline-none focus:border-gold"
                                >
                                    <option>index, follow</option>
                                    <option>noindex, follow</option>
                                    <option>noindex, nofollow</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/admin/seo"
                            className="px-6 py-3 border border-border rounded-xl font-sans text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-ink hover:bg-gold-deep text-cream rounded-xl font-sans text-xs uppercase tracking-wider transition-colors disabled:opacity-60 shadow-md"
                        >
                            {loading ? "Saving..." : "Save SEO Metadata ↗"}
                        </button>
                    </div>
                </form>

                {/* Live Previews Panel */}
                <div className="space-y-6 sticky top-8">
                    {/* Google SERP Preview */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted font-bold flex items-center gap-1.5">
                                <span className="text-blue-500">G</span>oogle Search Preview
                            </span>
                            <span className="text-[10px] text-muted">Live Snippet</span>
                        </div>

                        <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#ebe5da] space-y-1.5 font-sans">
                            <div className="flex items-center gap-2 text-[11px] text-[#202124]">
                                <div className="w-5 h-5 rounded-full bg-gold-soft flex items-center justify-center text-[10px] font-bold text-ink">
                                    K
                                </div>
                                <div className="leading-tight">
                                    <p className="text-[11px] font-medium text-[#202124]">KNK Salon Awadh</p>
                                    <p className="text-[10px] text-[#5f6368] font-mono">
                                        https://knksalon.in{form.pagePath}
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] hover:underline text-base font-normal leading-snug cursor-pointer line-clamp-1">
                                {form.metaTitle || "Page Title Goes Here"}
                            </h3>
                            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                                {form.metaDescription || "Page description preview snippet will be displayed here in search results."}
                            </p>
                        </div>
                    </div>

                    {/* Social Share Card Preview */}
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted font-bold flex items-center gap-1.5">
                                💬 Social / WhatsApp / X Card Preview
                            </span>
                            <span className="text-[10px] text-muted">OpenGraph</span>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-[#ebe5da] bg-[#f8f6f0] font-sans">
                            <div className="h-44 bg-cream overflow-hidden relative">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted text-xs bg-[#f4ede1]">
                                        OG Banner Image (1200x630)
                                    </div>
                                )}
                            </div>
                            <div className="p-3.5 space-y-1">
                                <p className="text-[10px] tracking-wider uppercase text-muted font-mono">
                                    knksalon.in
                                </p>
                                <p className="text-xs font-semibold text-ink line-clamp-1">
                                    {form.metaTitle || "Page Title"}
                                </p>
                                <p className="text-[11px] text-muted line-clamp-2">
                                    {form.metaDescription || "Social preview description."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
