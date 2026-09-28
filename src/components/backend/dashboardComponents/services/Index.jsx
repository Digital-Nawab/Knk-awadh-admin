"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function ServiceIndex() {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const loadServices = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const queryParams = new URLSearchParams();
            if (selectedCategory !== "All") {
                queryParams.set("category", selectedCategory);
            }
            if (search.trim()) {
                queryParams.set("search", search.trim());
            }

            const res = await fetch(`/api/services?${queryParams.toString()}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load services.");
            setServices(data.services || []);
            if (data.categories && Array.isArray(data.categories)) {
                setCategories(data.categories);
            }
        } catch (err) {
            setError(err.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, search]);

    useEffect(() => {
        // Also ensure categories loaded
        fetch("/api/services/categories?all=true")
            .then((r) => r.json())
            .then((d) => {
                if (d.categories && Array.isArray(d.categories)) {
                    setCategories(d.categories);
                }
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadServices();
        }, 200);
        return () => clearTimeout(timer);
    }, [loadServices]);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setServices((prev) => prev.filter((s) => s.id !== id));
        } catch {
            setError("Couldn't delete this service. Please try again.");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    const handleToggleStatus = async (service) => {
        setTogglingId(service.id);
        try {
            const newStatus = !service.is_active;
            const res = await fetch(`/api/services/${service.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            if (res.ok) {
                setServices((prev) =>
                    prev.map((s) => (s.id === service.id ? { ...s, is_active: newStatus ? 1 : 0 } : s))
                );
            }
        } catch (err) {
            console.error("Failed to toggle status", err);
        } finally {
            setTogglingId(null);
        }
    };

    const activeCount = services.filter((s) => s.is_active).length;
    const categoryNames = ["All", ...categories.map((c) => c.name)];

    return (
        <div className="max-w-7xl mx-auto pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-display text-4xl italic text-ink">Services Management</h1>
                    <p className="mt-1.5 font-sans text-[13px] text-muted">
                        {loading
                            ? "Loading salon services..."
                            : `${services.length} services loaded · ${activeCount} active on website`}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href="/admin/services/categories"
                        className="inline-flex items-center gap-2 border border-border bg-white text-ink font-sans text-[11px] tracking-[0.15em] uppercase px-5 py-3 rounded-full hover:border-gold hover:text-gold-deep transition-all shadow-sm font-medium"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                            <path d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Manage Categories
                    </Link>
                    <Link
                        href="/admin/services/create"
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] shrink-0 cursor-pointer font-medium"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add New Service
                    </Link>
                </div>
            </div>

            {/* Filter Pills & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5">
                    {categoryNames.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        return (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`font-sans text-[11px] tracking-wider uppercase px-4 py-2 rounded-full transition-all cursor-pointer ${
                                    isSelected
                                        ? "bg-ink text-gold font-semibold shadow-sm"
                                        : "bg-cream text-muted hover:text-ink hover:bg-cream/80 border border-border"
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative min-w-[260px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-full text-xs text-ink placeholder:text-muted/60 focus:outline-none focus:border-gold"
                    />
                </div>
            </div>

            {error && (
                <p className="mb-6 font-sans text-[12px] text-red-600 bg-red-50 border border-red-600/20 px-4 py-3 rounded-lg">
                    {error}
                </p>
            )}

            {/* Loading Skeletons */}
            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-[4/5] rounded-2xl bg-cream animate-pulse border border-border" />
                    ))}
                </div>
            ) : services.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center text-center bg-cream rounded-2xl py-20 px-6 border border-border">
                    <span className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6 text-gold-deep">
                            <path d="M12 3c-4 2-6 5-6 9a6 6 0 0 0 12 0c0-4-2-7-6-9Z" />
                        </svg>
                    </span>
                    <p className="font-display text-2xl italic text-ink mb-1">No services found</p>
                    <p className="font-sans text-[13px] text-muted mb-6 max-w-sm">
                        {selectedCategory !== "All"
                            ? `No services registered under '${selectedCategory}'. Add your first treatment.`
                            : "Add your first salon service to publish it to your website."}
                    </p>
                    <Link
                        href="/admin/services/create"
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                        Add New Service
                    </Link>
                </div>
            ) : (
                /* Services Grid */
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => {
                        const itemNumber = service.display_order ? String(service.display_order).padStart(2, "0") : String(index + 1).padStart(2, "0");
                        return (
                            <div
                                key={service.id}
                                className="group relative bg-cream rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] border border-border/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                            >
                                <div>
                                    {/* 4:5 Hero Thumbnail */}
                                    <div className="relative aspect-[4/5] bg-ink overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                                        {/* Status Toggle Badge */}
                                        <button
                                            type="button"
                                            onClick={() => handleToggleStatus(service)}
                                            disabled={togglingId === service.id}
                                            title="Click to toggle publish status"
                                            className={`absolute top-3 right-3 font-sans text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-sm cursor-pointer transition-opacity hover:opacity-85 ${
                                                service.is_active
                                                    ? "bg-emerald-600/90 text-white"
                                                    : "bg-rose-600/90 text-white"
                                            }`}
                                        >
                                            {togglingId === service.id ? "..." : (service.is_active ? "Active" : "Hidden")}
                                        </button>

                                        {/* Category Badge & Order */}
                                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                            <span className="font-sans text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-ink/80 text-gold backdrop-blur-sm border border-gold/30">
                                                {service.category_name}
                                            </span>
                                            <span className="font-['Cormorant_Garamond',serif] italic text-xs text-white/90 bg-ink/70 px-2 py-0.5 rounded-full border border-white/20">
                                                NO. {itemNumber}
                                            </span>
                                        </div>

                                        {/* Text Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            {service.filter_category && (
                                                <span className="inline-block font-sans text-[9px] tracking-wider uppercase text-gold/90 mb-1">
                                                    ✦ {service.filter_category}
                                                </span>
                                            )}
                                            <p className="font-display italic text-lg text-cream leading-tight">
                                                {service.name}
                                            </p>
                                            {service.short_desc && (
                                                <p className="mt-1 font-sans text-[11px] text-cream/70 line-clamp-2 leading-relaxed">
                                                    {service.short_desc}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tags Preview */}
                                    {service.highlights && service.highlights.length > 0 && (
                                        <div className="p-3 pb-0 flex flex-wrap gap-1">
                                            {service.highlights.slice(0, 3).map((tag, tIdx) => (
                                                <span
                                                    key={tIdx}
                                                    className="text-[9.5px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-border text-muted"
                                                >
                                                    ✦ {tag}
                                                </span>
                                            ))}
                                            {service.highlights.length > 3 && (
                                                <span className="text-[9.5px] font-sans px-1.5 py-0.5 text-muted">
                                                    +{service.highlights.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Actions Footer */}
                                <div className="p-3 border-t border-border/60 mt-3">
                                    {confirmId === service.id ? (
                                        <div className="flex items-center gap-1.5">
                                            <p className="flex-1 font-sans text-[10px] text-muted">Delete?</p>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(service.id)}
                                                disabled={deletingId === service.id}
                                                className="font-sans text-[10px] tracking-wider uppercase text-white bg-red-600 px-3 py-1.5 rounded-full disabled:opacity-50 cursor-pointer"
                                            >
                                                {deletingId === service.id ? "..." : "Confirm"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmId(null)}
                                                className="font-sans text-[10px] tracking-wider uppercase text-muted px-2 py-1.5 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/services/edit/${service.id}`}
                                                className="flex-1 text-center font-sans text-[10px] tracking-[0.15em] uppercase text-ink border border-border py-2 rounded-full hover:border-gold hover:text-gold-deep transition-colors font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/services/${service.category_slug}/${service.slug}`}
                                                target="_blank"
                                                title="View live page"
                                                className="p-2 rounded-full border border-border text-muted hover:text-gold-deep hover:border-gold transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmId(service.id)}
                                                className="font-sans text-[10px] tracking-[0.15em] uppercase text-red-600 border border-red-600/30 px-3 py-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}