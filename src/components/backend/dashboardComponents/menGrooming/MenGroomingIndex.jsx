"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    MEN_GROOMING_SECTION_METADATA,
    DEFAULT_MEN_GROOMING_SECTIONS,
} from "@/data/menGroomingDefaults";

function ImageUploader({ label, value, onChange, accept = "image/*" }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        setUploadErr("");
        setUploadSuccess(false);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/men-grooming/upload", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Upload failed");
            }

            onChange(data.url);
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 6000);
        } catch (err) {
            setUploadErr(err.message || "Failed to upload asset.");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-3">
                {value ? (
                    <div className="relative h-16 w-20 rounded-xl overflow-hidden border border-border bg-ink/5 shrink-0">
                        {value.endsWith(".webm") || value.endsWith(".mp4") ? (
                            <video src={value} className="h-full w-full object-cover" muted />
                        ) : (
                            <img src={value} alt="Preview" className="h-full w-full object-cover" />
                        )}
                    </div>
                ) : (
                    <div className="h-16 w-20 rounded-xl border border-dashed border-border bg-ink/5 flex items-center justify-center text-[10px] text-muted shrink-0">
                        No Image
                    </div>
                )}

                <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                            className="px-4 py-2 rounded-xl bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white font-sans text-xs tracking-wider uppercase font-semibold transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {uploading ? "Uploading..." : (value ? "Change File" : "Upload File")}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-600 bg-rose-50/60 hover:bg-rose-100 font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept}
                        onChange={(e) => handleFile(e.target.files?.[0])}
                        className="hidden"
                    />

                    {uploadErr && <p className="text-[11px] text-rose-600 font-sans">{uploadErr}</p>}
                    {uploadSuccess && (
                        <p className="text-[11px] text-emerald-700 font-sans font-medium">
                            ✓ Image uploaded! Click &ldquo;Save Section&rdquo; below to save changes.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MenGroomingIndex() {
    const [sections, setSections] = useState(DEFAULT_MEN_GROOMING_SECTIONS);
    const [activeTab, setActiveTab] = useState("hero");
    const [loading, setLoading] = useState(true);
    const [savingTab, setSavingTab] = useState(false);
    const [savingAll, setSavingAll] = useState(false);
    const [toast, setToast] = useState({ type: "", message: "" });

    useEffect(() => {
        loadData();
    }, []);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast({ type: "", message: "" }), 4000);
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/men-grooming");
            const data = await res.json();
            if (res.ok && data.sections) {
                setSections(data.sections);
            }
        } catch {
            showToast("error", "Failed to load Men Grooming content from server.");
        } finally {
            setLoading(false);
        }
    };

    const handleFieldChange = (sectionKey, field, val) => {
        setSections((prev) => ({
            ...prev,
            [sectionKey]: {
                ...(prev[sectionKey] || {}),
                [field]: val,
            },
        }));
    };

    const saveSection = async (sectionKey) => {
        setSavingTab(true);
        try {
            const res = await fetch(`/api/men-grooming/${sectionKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections[sectionKey] }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast(
                    "success",
                    `Section "${MEN_GROOMING_SECTION_METADATA.find((s) => s.key === sectionKey)?.label || sectionKey}" updated successfully!`
                );
            } else {
                throw new Error(data.error || "Save failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save section.");
        } finally {
            setSavingTab(false);
        }
    };

    const saveAllSections = async () => {
        setSavingAll(true);
        try {
            const res = await fetch("/api/men-grooming", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sections }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "All Men Grooming sections saved successfully!");
            } else {
                throw new Error(data.error || "Save all failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save all sections.");
        } finally {
            setSavingAll(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 sm:p-12 space-y-6 max-w-6xl mx-auto">
                <div className="h-8 w-64 bg-border/40 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-border/30 rounded-xl animate-pulse" />
                <div className="h-96 w-full bg-border/20 rounded-2xl animate-pulse" />
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 font-sans">
            {/* Toast notification */}
            {toast.message && (
                <div
                    className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl font-sans text-xs font-semibold tracking-wide border flex items-center gap-3 transition-all ${
                        toast.type === "success"
                            ? "bg-emerald-900/90 text-emerald-100 border-emerald-500/40"
                            : "bg-rose-900/90 text-rose-100 border-rose-500/40"
                    }`}
                >
                    <span>{toast.type === "success" ? "✓" : "⚠"}</span>
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Link
                            href="/admin/dashboard"
                            className="text-xs text-muted hover:text-gold transition-colors"
                        >
                            Dashboard
                        </Link>
                        <span className="text-muted/50 text-xs">/</span>
                        <span className="text-xs font-semibold text-gold-deep">Men's Grooming CMS</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink">
                        Men's Grooming Atelier CMS
                    </h1>
                    <p className="text-xs text-muted mt-1">
                        Manage all 8 sections for the `/services/men-grooming` landing page.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/services/men-grooming"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-ink hover:border-gold hover:text-gold-deep bg-card text-xs font-medium tracking-wider uppercase transition-all"
                    >
                        <span>View Live Page</span>
                        <span>↗</span>
                    </Link>
                    <button
                        type="button"
                        onClick={saveAllSections}
                        disabled={savingAll}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-deep text-white text-xs font-semibold tracking-wider uppercase shadow-md transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {savingAll ? "Saving All..." : "Save All Sections"}
                    </button>
                </div>
            </div>

            {/* Section Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/80 scrollbar-none">
                {MEN_GROOMING_SECTION_METADATA.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                                isActive
                                    ? "bg-gold text-white font-semibold shadow-sm"
                                    : "bg-card text-muted hover:text-ink hover:bg-secondary border border-border/60"
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Content Form Card */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-8 shadow-sm">
                {/* 1. HERO TAB */}
                {activeTab === "hero" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Hero Section</h2>
                            <p className="text-xs text-muted mt-1">
                                Main cinematic banner, titles, badges, and trust indicators.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Top Pill Badge
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.badge || ""}
                                    onChange={(e) => handleFieldChange("hero", "badge", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.primaryBtnText || ""}
                                    onChange={(e) => handleFieldChange("hero", "primaryBtnText", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Heading Prefix
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.titlePrefix || ""}
                                    onChange={(e) => handleFieldChange("hero", "titlePrefix", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Heading Highlight (Gold Italic)
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.titleHighlight || ""}
                                    onChange={(e) => handleFieldChange("hero", "titleHighlight", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Phone Number (Tel link)
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.phone || ""}
                                    onChange={(e) => handleFieldChange("hero", "phone", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Phone Button Display Text
                                </label>
                                <input
                                    type="text"
                                    value={sections.hero?.phoneText || ""}
                                    onChange={(e) => handleFieldChange("hero", "phoneText", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                Hero Description Paragraph
                            </label>
                            <textarea
                                rows={3}
                                value={sections.hero?.description || ""}
                                onChange={(e) => handleFieldChange("hero", "description", e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs text-ink focus:outline-none focus:border-gold"
                            />
                        </div>

                        {/* Trust Badges */}
                        <div className="space-y-3 pt-4 border-t border-border/60">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-ink">
                                Trust Badges (4 Metrics)
                            </label>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {(sections.hero?.trustBadges || []).map((badge, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl border border-border bg-secondary/50 space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Stat (e.g. 100%)"
                                            value={badge.stat || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.hero?.trustBadges || [])];
                                                next[idx] = { ...next[idx], stat: e.target.value };
                                                handleFieldChange("hero", "trustBadges", next);
                                            }}
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-gold-deep"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Label (e.g. Single-Use Blades)"
                                            value={badge.label || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.hero?.trustBadges || [])];
                                                next[idx] = { ...next[idx], label: e.target.value };
                                                handleFieldChange("hero", "trustBadges", next);
                                            }}
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-[11px] text-ink"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Showcase Card */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                Right Column Luxury Showcase Card
                            </h3>
                            <ImageUploader
                                label="Showcase Portrait Image"
                                value={sections.hero?.showcaseImage || ""}
                                onChange={(url) => handleFieldChange("hero", "showcaseImage", url)}
                            />

                            <div className="grid sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink mb-1">
                                        Card Badge
                                    </label>
                                    <input
                                        type="text"
                                        value={sections.hero?.showcaseBadge || ""}
                                        onChange={(e) => handleFieldChange("hero", "showcaseBadge", e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs text-ink"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink mb-1">
                                        Card Title
                                    </label>
                                    <input
                                        type="text"
                                        value={sections.hero?.showcaseTitle || ""}
                                        onChange={(e) => handleFieldChange("hero", "showcaseTitle", e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs text-ink"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-ink mb-1">
                                        Status Tag
                                    </label>
                                    <input
                                        type="text"
                                        value={sections.hero?.showcaseStatus || ""}
                                        onChange={(e) => handleFieldChange("hero", "showcaseStatus", e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs text-ink"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. CORE DISCIPLINES TAB */}
                {activeTab === "disciplines" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Core Disciplines (Stations)</h2>
                            <p className="text-xs text-muted mt-1">
                                The 5 main grooming stations with duration, inclusions, and photography.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.disciplines?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("disciplines", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Section Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.disciplines?.heading || ""}
                                    onChange={(e) => handleFieldChange("disciplines", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.disciplines?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("disciplines", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                Subtitle / Description
                            </label>
                            <input
                                type="text"
                                value={sections.disciplines?.description || ""}
                                onChange={(e) => handleFieldChange("disciplines", "description", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                            />
                        </div>

                        {/* Station Cards */}
                        <div className="space-y-6 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    Discipline Cards ({(sections.disciplines?.items || []).length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = [
                                            ...(sections.disciplines?.items || []),
                                            {
                                                id: `station-${Date.now()}`,
                                                number: `0${(sections.disciplines?.items || []).length + 1}`,
                                                title: "New Grooming Service",
                                                subtitle: "Craft Subtitle",
                                                duration: "45 MINS",
                                                badge: "Service Tag",
                                                image: "/assets/images/new/home/services/haircut.webp",
                                                shortDesc: "Description of the station craft.",
                                                inclusions: ["Inclusion 1", "Inclusion 2"],
                                                idealFor: "Who this station is ideal for.",
                                            },
                                        ];
                                        handleFieldChange("disciplines", "items", next);
                                    }}
                                    className="px-3.5 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                >
                                    + Add New Discipline
                                </button>
                            </div>

                            <div className="space-y-6">
                                {(sections.disciplines?.items || []).map((svc, idx) => (
                                    <div
                                        key={svc.id || idx}
                                        className="p-5 rounded-2xl border border-border bg-secondary/30 space-y-4"
                                    >
                                        <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="h-6 w-6 rounded-full bg-gold text-white text-xs font-bold flex items-center justify-center">
                                                    {svc.number || idx + 1}
                                                </span>
                                                <span className="text-xs font-bold text-ink">
                                                    {svc.title || `Station ${idx + 1}`}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (sections.disciplines?.items || []).filter((_, i) => i !== idx);
                                                    handleFieldChange("disciplines", "items", next);
                                                }}
                                                className="text-xs text-rose-600 hover:text-rose-800"
                                            >
                                                Delete Station
                                            </button>
                                        </div>

                                        <div className="grid sm:grid-cols-4 gap-3">
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Number (e.g. 01)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.number || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], number: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Station Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.title || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], title: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Subtitle
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.subtitle || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], subtitle: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.duration || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], duration: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Card Badge
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.badge || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], badge: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Ideal For
                                                </label>
                                                <input
                                                    type="text"
                                                    value={svc.idealFor || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = { ...next[idx], idealFor: e.target.value };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                Short Description
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={svc.shortDesc || ""}
                                                onChange={(e) => {
                                                    const next = [...(sections.disciplines?.items || [])];
                                                    next[idx] = { ...next[idx], shortDesc: e.target.value };
                                                    handleFieldChange("disciplines", "items", next);
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                            />
                                        </div>

                                        <ImageUploader
                                            label="Discipline Banner Image"
                                            value={svc.image || ""}
                                            onChange={(url) => {
                                                const next = [...(sections.disciplines?.items || [])];
                                                next[idx] = { ...next[idx], image: url };
                                                handleFieldChange("disciplines", "items", next);
                                            }}
                                        />

                                        {/* Inclusions */}
                                        <div className="space-y-1.5 pt-2 border-t border-border/40">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-[10px] uppercase font-semibold text-muted">
                                                    Inclusions List (Rituals Included)
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const next = [...(sections.disciplines?.items || [])];
                                                        next[idx] = {
                                                            ...next[idx],
                                                            inclusions: [...(next[idx].inclusions || []), "New inclusion ritual"],
                                                        };
                                                        handleFieldChange("disciplines", "items", next);
                                                    }}
                                                    className="text-[10px] text-gold-deep font-semibold"
                                                >
                                                    + Add Inclusion
                                                </button>
                                            </div>
                                            {(svc.inclusions || []).map((inc, iIdx) => (
                                                <div key={iIdx} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={inc}
                                                        onChange={(e) => {
                                                            const next = [...(sections.disciplines?.items || [])];
                                                            const nextInc = [...(next[idx].inclusions || [])];
                                                            nextInc[iIdx] = e.target.value;
                                                            next[idx] = { ...next[idx], inclusions: nextInc };
                                                            handleFieldChange("disciplines", "items", next);
                                                        }}
                                                        className="flex-1 px-2.5 py-1 rounded-lg border border-border bg-white text-xs"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const next = [...(sections.disciplines?.items || [])];
                                                            const nextInc = (next[idx].inclusions || []).filter((_, i) => i !== iIdx);
                                                            next[idx] = { ...next[idx], inclusions: nextInc };
                                                            handleFieldChange("disciplines", "items", next);
                                                        }}
                                                        className="text-xs text-rose-500 hover:text-rose-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. PACKAGES & COMBOS TAB */}
                {activeTab === "packages" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Grooming Packages & Combos</h2>
                            <p className="text-xs text-muted mt-1">
                                Multi-discipline executive combos, pricing tier rituals, and wedding groom prep.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.packages?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("packages", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.packages?.heading || ""}
                                    onChange={(e) => handleFieldChange("packages", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.packages?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("packages", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                Description
                            </label>
                            <input
                                type="text"
                                value={sections.packages?.description || ""}
                                onChange={(e) => handleFieldChange("packages", "description", e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                            />
                        </div>

                        {/* Package Cards List */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    Packages List ({(sections.packages?.items || []).length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = [
                                            ...(sections.packages?.items || []),
                                            {
                                                id: `pkg-${Date.now()}`,
                                                title: "New Ritual Combo",
                                                tag: "Maintenance",
                                                duration: "1 Hr 30 Mins",
                                                desc: "Comprehensive grooming package description.",
                                                features: ["Feature 1", "Feature 2", "Feature 3"],
                                                highlight: false,
                                            },
                                        ];
                                        handleFieldChange("packages", "items", next);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                >
                                    + Add New Package
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {(sections.packages?.items || []).map((pkg, idx) => (
                                    <div
                                        key={pkg.id || idx}
                                        className={`p-5 rounded-2xl border space-y-4 relative ${
                                            pkg.highlight
                                                ? "bg-gold/10 border-gold shadow-sm"
                                                : "bg-secondary/40 border-border"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                            <span className="text-xs font-bold text-ink">
                                                Package #{idx + 1}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (sections.packages?.items || []).filter((_, i) => i !== idx);
                                                    handleFieldChange("packages", "items", next);
                                                }}
                                                className="text-xs text-rose-600 hover:text-rose-800"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                Package Title
                                            </label>
                                            <input
                                                type="text"
                                                value={pkg.title || ""}
                                                onChange={(e) => {
                                                    const next = [...(sections.packages?.items || [])];
                                                    next[idx] = { ...next[idx], title: e.target.value };
                                                    handleFieldChange("packages", "items", next);
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Tag (Eyebrow)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pkg.tag || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.packages?.items || [])];
                                                        next[idx] = { ...next[idx], tag: e.target.value };
                                                        handleFieldChange("packages", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pkg.duration || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.packages?.items || [])];
                                                        next[idx] = { ...next[idx], duration: e.target.value };
                                                        handleFieldChange("packages", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={pkg.desc || ""}
                                                onChange={(e) => {
                                                    const next = [...(sections.packages?.items || [])];
                                                    next[idx] = { ...next[idx], desc: e.target.value };
                                                    handleFieldChange("packages", "items", next);
                                                }}
                                                className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id={`pkg-hl-${idx}`}
                                                checked={Boolean(pkg.highlight)}
                                                onChange={(e) => {
                                                    const next = [...(sections.packages?.items || [])];
                                                    next[idx] = { ...next[idx], highlight: e.target.checked };
                                                    handleFieldChange("packages", "items", next);
                                                }}
                                                className="h-4 w-4 rounded text-gold focus:ring-gold"
                                            />
                                            <label htmlFor={`pkg-hl-${idx}`} className="text-xs font-semibold text-ink">
                                                Master Recommendation (Highlight)
                                            </label>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-1.5 pt-2 border-t border-border/50">
                                            <div className="flex items-center justify-between">
                                                <label className="block text-[10px] uppercase font-semibold text-muted">
                                                    Features Checklist
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const next = [...(sections.packages?.items || [])];
                                                        next[idx] = {
                                                            ...next[idx],
                                                            features: [...(next[idx].features || []), "New Included Service"],
                                                        };
                                                        handleFieldChange("packages", "items", next);
                                                    }}
                                                    className="text-[10px] text-gold-deep font-semibold"
                                                >
                                                    + Add Feature
                                                </button>
                                            </div>
                                            {(pkg.features || []).map((feat, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={feat}
                                                        onChange={(e) => {
                                                            const next = [...(sections.packages?.items || [])];
                                                            const nextFeat = [...(next[idx].features || [])];
                                                            nextFeat[fIdx] = e.target.value;
                                                            next[idx] = { ...next[idx], features: nextFeat };
                                                            handleFieldChange("packages", "items", next);
                                                        }}
                                                        className="flex-1 px-2.5 py-1 rounded-lg border border-border bg-white text-xs"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const next = [...(sections.packages?.items || [])];
                                                            const nextFeat = (next[idx].features || []).filter((_, i) => i !== fIdx);
                                                            next[idx] = { ...next[idx], features: nextFeat };
                                                            handleFieldChange("packages", "items", next);
                                                        }}
                                                        className="text-xs text-rose-500 hover:text-rose-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. PROTOCOL TAB */}
                {activeTab === "protocol" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">4-Step Barbershop Craft Protocol</h2>
                            <p className="text-xs text-muted mt-1">
                                Explain the hygienic discipline and step-by-step master process.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.protocol?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("protocol", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.protocol?.heading || ""}
                                    onChange={(e) => handleFieldChange("protocol", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.protocol?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("protocol", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        {/* Steps List */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                Protocol Steps ({(sections.protocol?.items || []).length})
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(sections.protocol?.items || []).map((step, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <input
                                                type="text"
                                                value={step.number || ""}
                                                onChange={(e) => {
                                                    const next = [...(sections.protocol?.items || [])];
                                                    next[idx] = { ...next[idx], number: e.target.value };
                                                    handleFieldChange("protocol", "items", next);
                                                }}
                                                className="w-16 px-2 py-1 rounded border border-border bg-white text-sm font-display italic text-gold-deep"
                                            />
                                            <span className="text-[10px] text-muted uppercase font-semibold">Step {idx + 1}</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={step.title || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.protocol?.items || [])];
                                                next[idx] = { ...next[idx], title: e.target.value };
                                                handleFieldChange("protocol", "items", next);
                                            }}
                                            placeholder="Step Title"
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-ink"
                                        />
                                        <textarea
                                            rows={3}
                                            value={step.desc || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.protocol?.items || [])];
                                                next[idx] = { ...next[idx], desc: e.target.value };
                                                handleFieldChange("protocol", "items", next);
                                            }}
                                            placeholder="Step Description"
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs text-muted"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. TREATMENT MENU TAB */}
                {activeTab === "menu" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Treatment Menu & Rate Card</h2>
                            <p className="text-xs text-muted mt-1">
                                Full interactive menu item catalog with categories and durations.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.menu?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("menu", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.menu?.heading || ""}
                                    onChange={(e) => handleFieldChange("menu", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.menu?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("menu", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        {/* Menu Items List */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    Menu Items ({(sections.menu?.items || []).length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = [
                                            ...(sections.menu?.items || []),
                                            {
                                                cat: "hair",
                                                name: "New Grooming Service",
                                                duration: "30 min",
                                                desc: "Service procedure description.",
                                            },
                                        ];
                                        handleFieldChange("menu", "items", next);
                                    }}
                                    className="px-3.5 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                >
                                    + Add Menu Item
                                </button>
                            </div>

                            <div className="space-y-3">
                                {(sections.menu?.items || []).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                                    >
                                        <div className="grid sm:grid-cols-3 gap-3 flex-1 w-full">
                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Category
                                                </label>
                                                <select
                                                    value={item.cat || "hair"}
                                                    onChange={(e) => {
                                                        const next = [...(sections.menu?.items || [])];
                                                        next[idx] = { ...next[idx], cat: e.target.value };
                                                        handleFieldChange("menu", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium"
                                                >
                                                    <option value="hair">Hair & Fades</option>
                                                    <option value="beard">Beard & Shave</option>
                                                    <option value="skin">Face & Detan</option>
                                                    <option value="spa">Scalp & Massage</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Service Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.name || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.menu?.items || [])];
                                                        next[idx] = { ...next[idx], name: e.target.value };
                                                        handleFieldChange("menu", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-ink"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.duration || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.menu?.items || [])];
                                                        next[idx] = { ...next[idx], duration: e.target.value };
                                                        handleFieldChange("menu", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label className="block text-[10px] uppercase font-semibold text-muted mb-1">
                                                    Short Details
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.desc || ""}
                                                    onChange={(e) => {
                                                        const next = [...(sections.menu?.items || [])];
                                                        next[idx] = { ...next[idx], desc: e.target.value };
                                                        handleFieldChange("menu", "items", next);
                                                    }}
                                                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs text-muted"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                const next = (sections.menu?.items || []).filter((_, i) => i !== idx);
                                                handleFieldChange("menu", "items", next);
                                            }}
                                            className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 text-xs font-semibold shrink-0 cursor-pointer"
                                        >
                                            Delete Item
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. PATRON REVIEWS TAB */}
                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Client Reviews & Testimonials</h2>
                            <p className="text-xs text-muted mt-1">
                                Verified testimonials from executives, wedding grooms, and regulars.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.reviews?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("reviews", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.reviews?.heading || ""}
                                    onChange={(e) => handleFieldChange("reviews", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.reviews?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("reviews", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    Reviews List ({(sections.reviews?.items || []).length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = [
                                            ...(sections.reviews?.items || []),
                                            {
                                                rating: 5,
                                                quote: "Review quote from guest.",
                                                name: "Guest Name",
                                                location: "Location or Profession",
                                            },
                                        ];
                                        handleFieldChange("reviews", "items", next);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                >
                                    + Add Review
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {(sections.reviews?.items || []).map((rev, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gold-deep text-xs font-bold">★★★★★</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (sections.reviews?.items || []).filter((_, i) => i !== idx);
                                                    handleFieldChange("reviews", "items", next);
                                                }}
                                                className="text-xs text-rose-500 hover:text-rose-700"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <textarea
                                            rows={4}
                                            value={rev.quote || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.reviews?.items || [])];
                                                next[idx] = { ...next[idx], quote: e.target.value };
                                                handleFieldChange("reviews", "items", next);
                                            }}
                                            placeholder="Quote..."
                                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-xs italic text-ink"
                                        />

                                        <input
                                            type="text"
                                            value={rev.name || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.reviews?.items || [])];
                                                next[idx] = { ...next[idx], name: e.target.value };
                                                handleFieldChange("reviews", "items", next);
                                            }}
                                            placeholder="Guest Name"
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold text-ink"
                                        />

                                        <input
                                            type="text"
                                            value={rev.location || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.reviews?.items || [])];
                                                next[idx] = { ...next[idx], location: e.target.value };
                                                handleFieldChange("reviews", "items", next);
                                            }}
                                            placeholder="Designation / Branch"
                                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-white text-[11px] text-muted"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 7. FAQ TAB */}
                {activeTab === "faq" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">Frequently Asked Questions</h2>
                            <p className="text-xs text-muted mt-1">
                                Essential inquiries regarding blade hygiene, shave safety, and wedding groom prep.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.faq?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("faq", "eyebrow", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.faq?.heading || ""}
                                    onChange={(e) => handleFieldChange("faq", "heading", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1">
                                    Heading Highlight
                                </label>
                                <input
                                    type="text"
                                    value={sections.faq?.headingHighlight || ""}
                                    onChange={(e) => handleFieldChange("faq", "headingHighlight", e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        {/* FAQs List */}
                        <div className="space-y-4 pt-4 border-t border-border/60">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
                                    FAQ Questions ({(sections.faq?.items || []).length})
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const next = [
                                            ...(sections.faq?.items || []),
                                            {
                                                q: "New question here?",
                                                a: "Detailed answer explaining salon protocols.",
                                            },
                                        ];
                                        handleFieldChange("faq", "items", next);
                                    }}
                                    className="px-3.5 py-1.5 rounded-lg bg-gold/15 text-gold-deep border border-gold/30 hover:bg-gold hover:text-white text-xs font-semibold transition-all cursor-pointer"
                                >
                                    + Add New FAQ
                                </button>
                            </div>

                            <div className="space-y-4">
                                {(sections.faq?.items || []).map((faq, idx) => (
                                    <div key={idx} className="p-4 rounded-xl border border-border bg-secondary/30 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-ink">Question #{idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const next = (sections.faq?.items || []).filter((_, i) => i !== idx);
                                                    handleFieldChange("faq", "items", next);
                                                }}
                                                className="text-xs text-rose-500 hover:text-rose-700"
                                            >
                                                Delete FAQ
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            value={faq.q || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.faq?.items || [])];
                                                next[idx] = { ...next[idx], q: e.target.value };
                                                handleFieldChange("faq", "items", next);
                                            }}
                                            placeholder="Question..."
                                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-xs font-semibold text-ink"
                                        />

                                        <textarea
                                            rows={3}
                                            value={faq.a || ""}
                                            onChange={(e) => {
                                                const next = [...(sections.faq?.items || [])];
                                                next[idx] = { ...next[idx], a: e.target.value };
                                                handleFieldChange("faq", "items", next);
                                            }}
                                            placeholder="Answer..."
                                            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-xs text-muted"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 8. VIP BOOKING CTA TAB */}
                {activeTab === "cta" && (
                    <div className="space-y-6">
                        <div className="border-b border-border/60 pb-4">
                            <h2 className="font-display text-2xl text-ink font-medium">VIP Booking Concierge CTA</h2>
                            <p className="text-xs text-muted mt-1">
                                Bottom conversion card inviting guests to book chairs or contact master barbers directly.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Eyebrow Tag
                                </label>
                                <input
                                    type="text"
                                    value={sections.cta?.eyebrow || ""}
                                    onChange={(e) => handleFieldChange("cta", "eyebrow", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={sections.cta?.primaryBtnText || ""}
                                    onChange={(e) => handleFieldChange("cta", "primaryBtnText", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Section Heading
                                </label>
                                <input
                                    type="text"
                                    value={sections.cta?.heading || ""}
                                    onChange={(e) => handleFieldChange("cta", "heading", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Direct Phone (Tel link)
                                </label>
                                <input
                                    type="text"
                                    value={sections.cta?.phone || ""}
                                    onChange={(e) => handleFieldChange("cta", "phone", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                    Phone Button Display Text
                                </label>
                                <input
                                    type="text"
                                    value={sections.cta?.phoneText || ""}
                                    onChange={(e) => handleFieldChange("cta", "phoneText", e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wider text-ink mb-1.5">
                                Description
                            </label>
                            <textarea
                                rows={2}
                                value={sections.cta?.description || ""}
                                onChange={(e) => handleFieldChange("cta", "description", e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-xs"
                            />
                        </div>
                    </div>
                )}

                {/* Footer Save Button for Current Tab */}
                <div className="pt-6 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted">
                        Editing: <strong className="text-ink">{MEN_GROOMING_SECTION_METADATA.find((s) => s.key === activeTab)?.label || activeTab}</strong>
                    </span>
                    <button
                        type="button"
                        onClick={() => saveSection(activeTab)}
                        disabled={savingTab}
                        className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-deep text-white text-xs font-semibold tracking-wider uppercase shadow-md transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {savingTab ? "Saving Section..." : "Save Section"}
                    </button>
                </div>
            </div>
        </div>
    );
}
