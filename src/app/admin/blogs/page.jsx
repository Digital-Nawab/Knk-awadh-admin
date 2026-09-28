"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ search, category: categoryFilter });
            const res = await fetch(`/api/blogs?${query.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setBlogs(data.blogs || []);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    }, [search, categoryFilter]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 200);
        return () => clearTimeout(timer);
    }, [fetchBlogs]);

    const handleTogglePublish = async (id, currentStatus) => {
        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPublished: !currentStatus }),
            });
            if (res.ok) {
                setBlogs((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, is_published: !currentStatus ? 1 : 0 } : b))
                );
            }
        } catch (err) {
            console.error("Error toggling publish:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to permanently delete this blog post?")) return;
        try {
            const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
            if (res.ok) {
                setBlogs((prev) => prev.filter((b) => b.id !== id));
            }
        } catch (err) {
            console.error("Error deleting blog:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2dbd2] pb-6">
                <div>
                    <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                        Content Management
                    </span>
                    <h1 className="font-display text-4xl italic text-ink mt-1">
                        The Journal &amp; Editorial Stories
                    </h1>
                    <p className="font-sans text-xs text-muted mt-1">
                        Publish beauty guides, bridal secrets, and hair styling stories for KNK Salon Awadh.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blogs/create"
                        className="px-5 py-2.5 bg-ink hover:bg-gold-deep text-cream rounded-lg font-sans text-xs tracking-wider uppercase transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <span>+ Write New Story</span>
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#e8e2d5] flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by article title or keywords..."
                            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-xs font-sans focus:outline-none focus:border-gold"
                        />
                        <span className="absolute left-3 top-2.5 text-muted text-xs">🔍</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted font-sans text-[11px] uppercase tracking-wider">Category:</span>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border border-border rounded-lg px-3 py-1.5 font-sans bg-white focus:outline-none focus:border-gold"
                    >
                        <option value="all">All Categories</option>
                        <option value="Bridal Artistry">Bridal Artistry</option>
                        <option value="Hair Care">Hair Care</option>
                        <option value="Nails & Aesthetics">Nails &amp; Aesthetics</option>
                        <option value="Skin Rituals">Skin Rituals</option>
                        <option value="Trends">Trends</option>
                    </select>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf7] border-b border-[#e8e2d5] font-sans text-[10px] tracking-[0.18em] uppercase text-muted">
                                <th className="py-3.5 px-4 font-semibold">Story / Title</th>
                                <th className="py-3.5 px-4 font-semibold">Category</th>
                                <th className="py-3.5 px-4 font-semibold">Author</th>
                                <th className="py-3.5 px-4 font-semibold">Read Time</th>
                                <th className="py-3.5 px-4 font-semibold">Views</th>
                                <th className="py-3.5 px-4 font-semibold">Status</th>
                                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f2ede4] font-sans text-xs">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        Loading articles...
                                    </td>
                                </tr>
                            ) : blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-muted">
                                        No articles found. Click "+ Write New Story" to create one.
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#faf7f2] transition-colors">
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.cover_image || "/assets/images/new/home/celebrity/7.webp"}
                                                    alt={item.title}
                                                    className="w-12 h-12 object-cover rounded-lg border border-border shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-ink truncate max-w-sm">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] text-muted truncate max-w-xs">
                                                        /blog/{item.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#f5efe4] text-gold-deep border border-[#e5d8be]">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                                            {item.author}
                                        </td>
                                        <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                                            {item.read_time || "4 min"}
                                        </td>
                                        <td className="py-3.5 px-4 text-muted whitespace-nowrap font-mono">
                                            {item.views_count || 0}
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleTogglePublish(item.id, item.is_published)}
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border transition-colors ${
                                                    item.is_published
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                                                        : "bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200"
                                                }`}
                                            >
                                                {item.is_published ? "● Published" : "○ Draft"}
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                                            <Link
                                                href={`/blog/${item.slug}`}
                                                target="_blank"
                                                className="px-2.5 py-1 bg-cream hover:bg-gold-soft/50 text-ink rounded border border-border text-[11px] transition-colors"
                                            >
                                                View ↗
                                            </Link>
                                            <Link
                                                href={`/admin/blogs/edit/${item.id}`}
                                                className="px-2.5 py-1 bg-white hover:bg-secondary text-ink rounded border border-border text-[11px] transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
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
