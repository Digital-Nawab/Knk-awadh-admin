"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function AdminSeoPage() {
    const [seoList, setSeoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [seeding, setSeeding] = useState(false);

    const fetchSeo = useCallback(async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ search });
            const res = await fetch(`/api/seo?${query.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setSeoList(data.seoList || []);
            }
        } catch (err) {
            console.error("Error fetching SEO records:", err);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSeo();
        }, 200);
        return () => clearTimeout(timer);
    }, [fetchSeo]);

    const handleSeedDefaults = async () => {
        try {
            setSeeding(true);
            const res = await fetch("/api/init-db", { method: "POST" });
            if (res.ok) {
                await fetchSeo();
                alert("Default SEO routes seeded successfully!");
            }
        } catch {
            alert("Error seeding default routes.");
        } finally {
            setSeeding(false);
        }
    };

    const handleDelete = async (id, path) => {
        if (!confirm(`Are you sure you want to delete SEO settings for "${path}"?`)) return;
        try {
            const res = await fetch(`/api/seo/${id}`, { method: "DELETE" });
            if (res.ok) {
                setSeoList((prev) => prev.filter((item) => item.id !== id));
            }
        } catch (err) {
            console.error("Error deleting SEO record:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dbd2] pb-6">
                <div>
                    <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                        Master SEO Manager
                    </span>
                    <h1 className="font-display text-4xl italic text-ink mt-1">
                        Search Engine &amp; Social Metadata
                    </h1>
                    <p className="font-sans text-xs text-muted mt-1">
                        Control meta titles, descriptions, keywords, and OpenGraph social images across all URLs of KNK Awadh.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={handleSeedDefaults}
                        disabled={seeding}
                        className="px-4 py-2.5 bg-white border border-border hover:border-gold rounded-lg font-sans text-xs tracking-wider uppercase text-ink transition-colors disabled:opacity-50"
                    >
                        {seeding ? "Seeding..." : "⚡ Seed Standard Routes"}
                    </button>
                    <Link
                        href="/admin/seo/create"
                        className="px-5 py-2.5 bg-ink hover:bg-gold-deep text-cream rounded-lg font-sans text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <span>+ Add URL Metadata</span>
                    </Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#e8e2d5] flex items-center justify-between gap-4 shadow-sm">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by URL path, page name, or title..."
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-xs font-sans focus:outline-none focus:border-gold"
                    />
                    <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
                </div>
                <div className="font-sans text-xs text-muted">
                    Total Configured Pages: <span className="font-bold text-ink">{seoList.length}</span>
                </div>
            </div>

            {/* SEO Table */}
            <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf7] border-b border-[#e8e2d5] font-sans text-[10px] tracking-[0.18em] uppercase text-muted">
                                <th className="py-3.5 px-4 font-semibold">Page / URL Path</th>
                                <th className="py-3.5 px-4 font-semibold">Meta Title</th>
                                <th className="py-3.5 px-4 font-semibold">Description Snippet</th>
                                <th className="py-3.5 px-4 font-semibold">OG Image</th>
                                <th className="py-3.5 px-4 font-semibold">Robots</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2ede4] font-sans text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-muted">
                                        Loading SEO records...
                                    </td>
                                </tr>
                            ) : seoList.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-muted">
                                        No SEO configurations found. Click "⚡ Seed Standard Routes" or "+ Add URL Metadata".
                                    </td>
                                </tr>
                            ) : (
                                seoList.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#faf7f2] transition-colors">
                                        <td className="py-3.5 px-4">
                                            <p className="font-semibold text-ink">{item.page_name}</p>
                                            <span className="font-mono text-[11px] text-gold-deep bg-cream px-2 py-0.5 rounded border border-border inline-block mt-0.5">
                                                {item.page_path}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 max-w-xs">
                                            <p className="font-medium text-ink truncate" title={item.meta_title}>
                                                {item.meta_title}
                                            </p>
                                            <span className="text-[10px] text-muted">
                                                {item.meta_title.length} chars
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 max-w-sm">
                                            <p className="text-muted line-clamp-2 text-[11px] leading-relaxed" title={item.meta_description}>
                                                {item.meta_description}
                                            </p>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {item.og_image ? (
                                                <img
                                                    src={item.og_image}
                                                    alt="OG Preview"
                                                    className="w-12 h-8 object-cover rounded border border-border"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-muted">Default</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-100 text-stone-700">
                                                {item.robots || "index, follow"}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                            <Link
                                                href={item.page_path}
                                                target="_blank"
                                                className="px-2.5 py-1 bg-cream hover:bg-gold-soft/50 text-ink rounded border border-border text-[11px] transition-colors"
                                            >
                                                Live ↗
                                            </Link>
                                            <Link
                                                href={`/admin/seo/edit/${item.id}`}
                                                className="px-2.5 py-1 bg-white hover:bg-secondary text-ink rounded border border-border text-[11px] transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id, item.page_path)}
                                                className="px-2.5 py-1 bg-white hover:bg-red-50 text-red-600 rounded border border-red-200 text-[11px] transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
