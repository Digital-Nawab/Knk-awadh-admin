"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroIndex() {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [togglingId, setTogglingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        loadHeroes();
    }, []);

    const loadHeroes = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/hero");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load heroes.");
            setHeroes(data.heroes || []);
        } catch (err) {
            setError(err.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (hero) => {
        setTogglingId(hero.id);
        try {
            const fd = new FormData();
            fd.append("altText", hero.alt_text);
            fd.append("isActive", !hero.is_active);
            const res = await fetch(`/api/hero/${hero.id}`, { method: "PATCH", body: fd });
            if (!res.ok) throw new Error();
            setHeroes((prev) => prev.map((h) => (h.id === hero.id ? { ...h, is_active: h.is_active ? 0 : 1 } : h)));
        } catch {
            setError("Couldn't update status. Please try again.");
        } finally {
            setTogglingId(null);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setHeroes((prev) => prev.filter((h) => h.id !== id));
        } catch {
            setError("Couldn't delete this banner. Please try again.");
        } finally {
            setDeletingId(null);
            setConfirmId(null);
        }
    };

    const activeCount = heroes.filter((h) => h.is_active).length;

    return (
        <div className="max-w-8xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                    <h1 className="font-display text-4xl italic text-ink">Hero Banners</h1>
                    <p className="mt-2 font-sans text-[13px] text-muted">
                        {loading
                            ? "Loading banners..."
                            : `${heroes.length} total · ${activeCount} live on homepage`}
                    </p>
                </div>
                <Link
                    href="/admin/hero/create"
                    className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] shrink-0"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add New
                </Link>
            </div>

            {error && (
                <p className="mb-5 font-sans text-[12px] text-red-600 bg-red-50 border border-red-600/20 px-4 py-3 rounded-lg">
                    {error}
                </p>
            )}

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-video rounded-2xl bg-cream animate-pulse" />
                    ))}
                </div>
            ) : heroes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center bg-cream rounded-2xl py-20 px-6">
                    <span className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6 text-gold-deep">
                            <path d="M12 3c-4 2-6 5-6 9a6 6 0 0 0 12 0c0-4-2-7-6-9Z" />
                        </svg>
                    </span>
                    <p className="font-display text-xl italic text-ink mb-1">No hero banners yet</p>
                    <p className="font-sans text-[12px] text-muted mb-6 max-w-xs">
                        Add your first banner to start showing it on the homepage.
                    </p>
                    <Link
                        href="/admin/hero/create"
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02]"
                    >
                        Add New Hero
                    </Link>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {heroes.map((hero) => (
                        <div
                            key={hero.id}
                            className="relative bg-cream rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-0.5"
                        >
                            <div className="relative aspect-video bg-ink">
                                {hero.media_type === "video" ? (
                                    <video src={hero.media_url} className="h-full w-full object-cover" muted loop autoPlay />
                                ) : (
                                    <img src={hero.media_url} alt={hero.alt_text} className="h-full w-full object-cover" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                                <span className="absolute top-3 left-3 bg-ink/70 backdrop-blur-sm text-cream font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                                    {hero.media_type}
                                </span>

                                <span
                                    className={`absolute top-3 right-3 font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm ${
                                        hero.is_active ? "bg-green-600/90 text-white" : "bg-red-600/90 text-white"
                                    }`}
                                >
                                    {hero.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="p-4">
                                <p className="font-sans text-[12px] text-ink line-clamp-1 mb-3">{hero.alt_text}</p>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(hero)}
                                        disabled={togglingId === hero.id}
                                        className={`relative h-5 w-9 rounded-full transition-colors shrink-0 disabled:opacity-50 ${
                                            hero.is_active ? "bg-gold" : "bg-neutral-300"
                                        }`}
                                        title={hero.is_active ? "Turn off" : "Turn on"}
                                    >
                                        <span
                                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                                hero.is_active ? "translate-x-4" : "translate-x-0.5"
                                            }`}
                                        />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/hero/edit/${hero.id}`}
                                            className="font-sans text-[11px] tracking-[0.1em] uppercase text-ink border border-border px-3.5 py-2 rounded-full hover:border-gold transition-colors"
                                        >
                                            Edit
                                        </Link>

                                        {confirmId === hero.id ? (
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(hero.id)}
                                                    disabled={deletingId === hero.id}
                                                    className="font-sans text-[11px] tracking-[0.1em] uppercase text-white bg-red-600 px-3.5 py-2 rounded-full disabled:opacity-50"
                                                >
                                                    {deletingId === hero.id ? "..." : "Confirm"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmId(null)}
                                                    className="font-sans text-[11px] tracking-[0.1em] uppercase text-muted px-2 py-2"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setConfirmId(hero.id)}
                                                className="font-sans text-[11px] tracking-[0.1em] uppercase text-red-600 border border-red-600/30 px-3.5 py-2 rounded-full hover:bg-red-50 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}