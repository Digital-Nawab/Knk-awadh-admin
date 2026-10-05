"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SECTION_METADATA, DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

function ImageUploader({ label, value, onChange, accept = "image/*", hidePath = false }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadErr, setUploadErr] = useState("");

    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        setUploadErr("");

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/about/upload", {
                method: "POST",
                body: fd,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Upload failed");
            }

            onChange(data.url);
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
                {/* Preview */}
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
                            {uploading ? "Uploading..." : (value ? "Change Photo" : "Upload Photo")}
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

                    {uploadErr && (
                        <p className="text-[11px] text-rose-600 font-sans">{uploadErr}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AboutIndex() {
    const [sections, setSections] = useState(DEFAULT_ABOUT_SECTIONS);
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
            const res = await fetch("/api/about");
            const data = await res.json();
            if (res.ok && data.sections) {
                setSections(data.sections);
            }
        } catch {
            showToast("error", "Failed to load About page content from server.");
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (sectionKey, newContent) => {
        setSections((prev) => ({
            ...prev,
            [sectionKey]: newContent,
        }));
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
            const res = await fetch(`/api/about/${sectionKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: sections[sectionKey] }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", `Section "${SECTION_METADATA.find(s => s.key === sectionKey)?.label || sectionKey}" updated successfully!`);
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
            const res = await fetch("/api/about", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sections }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                showToast("success", "All 16 About Page sections updated successfully!");
            } else {
                throw new Error(data.error || "Save failed");
            }
        } catch (err) {
            showToast("error", err.message || "Could not save changes.");
        } finally {
            setSavingAll(false);
        }
    };

    const currentMeta = SECTION_METADATA.find((s) => s.key === activeTab) || SECTION_METADATA[0];
    const currentSectionData = sections[activeTab] || DEFAULT_ABOUT_SECTIONS[activeTab] || {};

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-deep font-semibold">
                            Page Content CMS
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <span className="font-sans text-[10px] tracking-wider text-muted">
                            Dedicated Module
                        </span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl italic text-ink">About Us Page CMS</h1>
                    <p className="mt-1.5 font-sans text-xs sm:text-[13px] text-muted">
                        Manage all 16 sections, headings, images, videos, and texts dynamically for the public About page.
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Link
                        href="/about"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border bg-white text-ink font-sans text-xs tracking-wider uppercase hover:border-gold hover:text-gold transition-colors font-medium"
                    >
                        <span>View Live Page</span>
                        <span>↗</span>
                    </Link>

                    <button
                        type="button"
                        onClick={saveAllSections}
                        disabled={savingAll || loading}
                        className="inline-flex items-center gap-2 bg-gold text-cream font-sans text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-full shadow-luxe hover:scale-[1.02] transition-transform font-medium disabled:opacity-50"
                    >
                        {savingAll ? (
                            <>
                                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving All...</span>
                            </>
                        ) : (
                            <>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                <span>Save All Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Notification Toast */}
            {toast.message && (
                <div
                    className={`flex items-center justify-between gap-3 p-4 rounded-xl text-xs font-sans border transition-all ${
                        toast.type === "success"
                            ? "bg-emerald-50 border-emerald-600/20 text-emerald-800"
                            : "bg-rose-50 border-rose-600/20 text-rose-800"
                    }`}
                >
                    <div className="flex items-center gap-2">
                        {toast.type === "success" ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-emerald-600">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-rose-600">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        )}
                        <span>{toast.message}</span>
                    </div>
                    <button onClick={() => setToast({ type: "", message: "" })} className="font-bold">
                        ✕
                    </button>
                </div>
            )}

            {/* Layout: Sidebar Tabs + Content Panel */}
            <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
                {/* Sections Navigation */}
                <div className="bg-white rounded-2xl border border-border p-3 shadow-xs space-y-1">
                    <p className="px-3 py-2 text-[10px] font-sans uppercase tracking-[0.2em] text-muted font-bold">
                        About Page Sections
                    </p>
                    <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                        {SECTION_METADATA.map((s, idx) => {
                            const isSelected = activeTab === s.key;
                            return (
                                <button
                                    key={s.key}
                                    type="button"
                                    onClick={() => setActiveTab(s.key)}
                                    className={`w-full text-left px-3.5 py-2.5 rounded-xl font-sans text-xs tracking-wide transition-all flex items-center justify-between ${
                                        isSelected
                                            ? "bg-gold text-cream font-semibold shadow-xs"
                                            : "text-ink/80 hover:bg-neutral-100 hover:text-ink"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 truncate">
                                        <span className={`text-[10px] font-mono ${isSelected ? "text-cream/80" : "text-muted"}`}>
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="truncate">{s.label}</span>
                                    </div>
                                    {isSelected && <span>→</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Section Form Editor */}
                <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-xs space-y-6">
                    {/* Section Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                        <div>
                            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-deep font-semibold">
                                Section {SECTION_METADATA.findIndex(s => s.key === activeTab) + 1} of {SECTION_METADATA.length}
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl italic text-ink mt-0.5">
                                {currentMeta.label}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={() => saveSection(activeTab)}
                            disabled={savingTab || loading}
                            className="inline-flex items-center gap-2 bg-ink text-cream hover:bg-black font-sans text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-colors disabled:opacity-50 self-start sm:self-auto font-medium"
                        >
                            {savingTab ? (
                                <>
                                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    <span>Save This Section</span>
                                </>
                            )}
                        </button>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center space-y-3">
                            <span className="h-8 w-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin inline-block" />
                            <p className="font-sans text-xs text-muted">Loading section details...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* 1. HERO SECTION */}
                            {activeTab === "hero" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("hero", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Subheading
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.subheading || ""}
                                                onChange={(e) => handleFieldChange("hero", "subheading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Main Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("hero", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Italic Accent (Line 2)
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.headingHighlight || ""}
                                                onChange={(e) => handleFieldChange("hero", "headingHighlight", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Paragraph
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("hero", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button 1 Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.btn1Text || ""}
                                                onChange={(e) => handleFieldChange("hero", "btn1Text", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button 1 Target Link
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.btn1Link || ""}
                                                onChange={(e) => handleFieldChange("hero", "btn1Link", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button 2 Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.btn2Text || ""}
                                                onChange={(e) => handleFieldChange("hero", "btn2Text", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button 2 Target Link
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.btn2Link || ""}
                                                onChange={(e) => handleFieldChange("hero", "btn2Link", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <ImageUploader
                                        label="Hero Media (Video or Image)"
                                        value={currentSectionData.mediaUrl}
                                        accept="video/*,image/*"
                                        onChange={(url) => {
                                            handleFieldChange("hero", "mediaUrl", url);
                                            handleFieldChange("hero", "mediaType", url.endsWith(".webm") || url.endsWith(".mp4") ? "video" : "image");
                                        }}
                                    />
                                </div>
                            )}

                            {/* 2. INTRO SECTION */}
                            {activeTab === "intro" && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Main Serif Welcome Quote
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.quote || ""}
                                            onChange={(e) => handleFieldChange("intro", "quote", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heritage / Since Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("intro", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 3. WHY CHOOSE KNK */}
                            {activeTab === "why_choose" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("why_choose", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("why_choose", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("why_choose", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <ImageUploader
                                        label="Why Choose Featured Image"
                                        value={currentSectionData.image}
                                        onChange={(url) => handleFieldChange("why_choose", "image", url)}
                                    />

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Key Bullet Points
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.points || [];
                                                    handleFieldChange("why_choose", "points", [...cur, "New feature point"]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Point
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {(currentSectionData.points || []).map((pt, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pt}
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.points];
                                                            copy[i] = e.target.value;
                                                            handleFieldChange("why_choose", "points", copy);
                                                        }}
                                                        className="flex-1 px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.points.filter((_, idx) => idx !== i);
                                                            handleFieldChange("why_choose", "points", copy);
                                                        }}
                                                        className="text-muted hover:text-rose-600 p-2"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 4. WHAT SETS US APART */}
                            {activeTab === "why_best" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("why_best", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("why_best", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("why_best", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Feature Cards ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("why_best", "items", [
                                                        ...cur,
                                                        { title: "New Feature", description: "Feature description details" },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Card
                                            </button>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {(currentSectionData.items || []).map((card, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                            handleFieldChange("why_best", "items", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={card.title}
                                                        placeholder="Card Title"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].title = e.target.value;
                                                            handleFieldChange("why_best", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={card.description}
                                                        placeholder="Card Description"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].description = e.target.value;
                                                            handleFieldChange("why_best", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 5. SERVICES SHOWCASE */}
                            {activeTab === "services" && (
                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("services", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("services", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("services", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("services", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Services Cards ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("services", "items", [
                                                        ...cur,
                                                        {
                                                            title: `${cur.length + 1}. New Service`,
                                                            cleanTitle: "New Service",
                                                            text: "Description for this service",
                                                            img: "/assets/images/about/bridal-makeup.webp",
                                                            cta: "Explore Service →",
                                                            href: "/services",
                                                        },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Service Card
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {(currentSectionData.items || []).map((srv, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-3 relative">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-xs text-gold font-bold">Service #{i + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                                handleFieldChange("services", "items", copy);
                                                            }}
                                                            className="text-muted hover:text-rose-600 text-xs"
                                                        >
                                                            ✕ Remove
                                                        </button>
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            value={srv.title}
                                                            placeholder="Card Title (e.g. 1. Bridal Makeup)"
                                                            onChange={(e) => {
                                                                const copy = [...currentSectionData.items];
                                                                copy[i].title = e.target.value;
                                                                handleFieldChange("services", "items", copy);
                                                            }}
                                                            className="px-3 py-2 rounded-xl border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={srv.cleanTitle || ""}
                                                            placeholder="Clean Title / Alt Text"
                                                            onChange={(e) => {
                                                                const copy = [...currentSectionData.items];
                                                                copy[i].cleanTitle = e.target.value;
                                                                handleFieldChange("services", "items", copy);
                                                            }}
                                                            className="px-3 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                        />
                                                    </div>

                                                    <textarea
                                                        rows={2}
                                                        value={srv.text}
                                                        placeholder="Service description"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].text = e.target.value;
                                                            handleFieldChange("services", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />

                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        <input
                                                            type="text"
                                                            value={srv.cta}
                                                            placeholder="Button Text (e.g. Explore Bridal Makeup →)"
                                                            onChange={(e) => {
                                                                const copy = [...currentSectionData.items];
                                                                copy[i].cta = e.target.value;
                                                                handleFieldChange("services", "items", copy);
                                                            }}
                                                            className="px-3 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={srv.href}
                                                            placeholder="Link (e.g. /makeup)"
                                                            onChange={(e) => {
                                                                const copy = [...currentSectionData.items];
                                                                copy[i].href = e.target.value;
                                                                handleFieldChange("services", "items", copy);
                                                            }}
                                                            className="px-3 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                        />
                                                    </div>

                                                    <ImageUploader
                                                        label="Service Image"
                                                        value={srv.img}
                                                        onChange={(url) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].img = url;
                                                            handleFieldChange("services", "items", copy);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 6. MARQUEE STRIP */}
                            {activeTab === "marquee" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                            Running Ribbon Items
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const cur = currentSectionData.items || [];
                                                handleFieldChange("marquee", "items", [...cur, "NEW BRANCH"]);
                                            }}
                                            className="text-xs text-gold-deep hover:underline font-medium"
                                        >
                                            + Add Item
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {(currentSectionData.items || []).map((item, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => {
                                                        const copy = [...currentSectionData.items];
                                                        copy[i] = e.target.value;
                                                        handleFieldChange("marquee", "items", copy);
                                                    }}
                                                    className="flex-1 px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                        handleFieldChange("marquee", "items", copy);
                                                    }}
                                                    className="text-muted hover:text-rose-600 p-2"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 7. FOUNDERS & EXPERTS */}
                            {activeTab === "experts" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("experts", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Subtitle
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.subheading || ""}
                                                onChange={(e) => handleFieldChange("experts", "subheading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("experts", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Accent Line 2
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.headingHighlight || ""}
                                                onChange={(e) => handleFieldChange("experts", "headingHighlight", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("experts", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <ImageUploader
                                        label="Founders Photo"
                                        value={currentSectionData.image}
                                        onChange={(url) => handleFieldChange("experts", "image", url)}
                                    />

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Expertise Highlights
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.points || [];
                                                    handleFieldChange("experts", "points", [...cur, "New expertise highlight"]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Highlight
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {(currentSectionData.points || []).map((pt, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={pt}
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.points];
                                                            copy[i] = e.target.value;
                                                            handleFieldChange("experts", "points", copy);
                                                        }}
                                                        className="flex-1 px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.points.filter((_, idx) => idx !== i);
                                                            handleFieldChange("experts", "points", copy);
                                                        }}
                                                        className="text-muted hover:text-rose-600 p-2"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 8. ACADEMY */}
                            {activeTab === "academy" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("academy", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("academy", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("academy", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("academy", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaText || ""}
                                                onChange={(e) => handleFieldChange("academy", "ctaText", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Link
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaLink || ""}
                                                onChange={(e) => handleFieldChange("academy", "ctaLink", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <ImageUploader
                                        label="Academy Training Photo"
                                        value={currentSectionData.image}
                                        onChange={(url) => handleFieldChange("academy", "image", url)}
                                    />
                                </div>
                            )}

                            {/* 9. GALLERY SECTION */}
                            {activeTab === "gallery" && (
                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("gallery", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("gallery", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("gallery", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaText || ""}
                                                onChange={(e) => handleFieldChange("gallery", "ctaText", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Link
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaLink || ""}
                                                onChange={(e) => handleFieldChange("gallery", "ctaLink", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Gallery Photos Grid ({Math.min((currentSectionData.images || []).length, 6)})
                                            </label>
                                            {(!currentSectionData.images || currentSectionData.images.length < 6) && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const cur = currentSectionData.images || [];
                                                        if (cur.length >= 6) return;
                                                        handleFieldChange("gallery", "images", [
                                                            ...cur,
                                                            { alt: "Bridal look photo", src: `/assets/images/about/gallery-${cur.length + 1}.webp` },
                                                        ]);
                                                    }}
                                                    className="text-xs text-gold-deep hover:underline font-medium"
                                                >
                                                    + Add Photo
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {(currentSectionData.images || []).slice(0, 6).map((img, i) => (
                                                <div key={i} className="p-3.5 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = (currentSectionData.images || []).filter((_, idx) => idx !== i);
                                                            handleFieldChange("gallery", "images", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={img.alt}
                                                        placeholder="Alt Description"
                                                        onChange={(e) => {
                                                            const copy = [...(currentSectionData.images || [])];
                                                            copy[i] = { ...copy[i], alt: e.target.value };
                                                            handleFieldChange("gallery", "images", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                    <ImageUploader
                                                        value={img.src}
                                                        hidePath={true}
                                                        onChange={(url) => {
                                                            const copy = [...(currentSectionData.images || [])];
                                                            copy[i] = { ...copy[i], src: url };
                                                            handleFieldChange("gallery", "images", copy);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 10. TESTIMONIALS */}
                            {activeTab === "testimonials" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("testimonials", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("testimonials", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("testimonials", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Client Testimonials ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("testimonials", "items", [
                                                        ...cur,
                                                        { name: "Client Name", text: "Great experience at KNK Awadh!" },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Testimonial
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(currentSectionData.items || []).map((t, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                            handleFieldChange("testimonials", "items", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={t.name}
                                                        placeholder="Client Name"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].name = e.target.value;
                                                            handleFieldChange("testimonials", "items", copy);
                                                        }}
                                                        className="w-full sm:w-1/2 px-3 py-1.5 rounded-lg border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={t.text}
                                                        placeholder="Client review text..."
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].text = e.target.value;
                                                            handleFieldChange("testimonials", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 11. OFFER STRIP */}
                            {activeTab === "offer_strip" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Badge Label
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.badge || ""}
                                            onChange={(e) => handleFieldChange("offer_strip", "badge", e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Offer Headline
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.title || ""}
                                            onChange={(e) => handleFieldChange("offer_strip", "title", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Label
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaText || ""}
                                                onChange={(e) => handleFieldChange("offer_strip", "ctaText", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Link
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.ctaLink || ""}
                                                onChange={(e) => handleFieldChange("offer_strip", "ctaLink", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 12. BRAND OVERVIEW */}
                            {activeTab === "overview" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("overview", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("overview", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("overview", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Overview Summary Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("overview", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Overview Q&amp;A Accordion Items ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("overview", "items", [
                                                        ...cur,
                                                        { q: "New Question?", a: "Answer text goes here." },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Q&amp;A
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(currentSectionData.items || []).map((qa, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                            handleFieldChange("overview", "items", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={qa.q}
                                                        placeholder="Question..."
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].q = e.target.value;
                                                            handleFieldChange("overview", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={qa.a}
                                                        placeholder="Answer..."
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].a = e.target.value;
                                                            handleFieldChange("overview", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 13. LOCATIONS */}
                            {activeTab === "locations" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("locations", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("locations", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("locations", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("locations", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                Branch Locations ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("locations", "items", [
                                                        ...cur,
                                                        {
                                                            name: "KNK Branch Name",
                                                            address: "Branch address, Lucknow",
                                                            phone: "+91 99999 99999",
                                                            mapUrl: "https://maps.google.com",
                                                        },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add Branch
                                            </button>
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-4">
                                            {(currentSectionData.items || []).map((loc, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                            handleFieldChange("locations", "items", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={loc.name}
                                                        placeholder="Branch Name"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].name = e.target.value;
                                                            handleFieldChange("locations", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={loc.address}
                                                        placeholder="Address"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].address = e.target.value;
                                                            handleFieldChange("locations", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={loc.phone}
                                                        placeholder="Phone"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].phone = e.target.value;
                                                            handleFieldChange("locations", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={loc.mapUrl}
                                                        placeholder="Google Maps URL"
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].mapUrl = e.target.value;
                                                            handleFieldChange("locations", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 14. BOOKING HEADER */}
                            {activeTab === "booking" && (
                                <div className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("booking", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("booking", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("booking", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("booking", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                WhatsApp Note Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.whatsappText || ""}
                                                onChange={(e) => handleFieldChange("booking", "whatsappText", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                WhatsApp Phone (e.g. 918881000552)
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.whatsappNumber || ""}
                                                onChange={(e) => handleFieldChange("booking", "whatsappNumber", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 15. FAQ */}
                            {activeTab === "faq" && (
                                <div className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.eyebrow || ""}
                                                onChange={(e) => handleFieldChange("faq", "eyebrow", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("faq", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Heading Accent Line 2
                                        </label>
                                        <input
                                            type="text"
                                            value={currentSectionData.headingHighlight || ""}
                                            onChange={(e) => handleFieldChange("faq", "headingHighlight", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-sans text-[11px] uppercase tracking-wider text-ink font-semibold">
                                                FAQ Items ({currentSectionData.items?.length || 0})
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const cur = currentSectionData.items || [];
                                                    handleFieldChange("faq", "items", [
                                                        ...cur,
                                                        { q: "New Question?", a: "Answer text here." },
                                                    ]);
                                                }}
                                                className="text-xs text-gold-deep hover:underline font-medium"
                                            >
                                                + Add FAQ
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {(currentSectionData.items || []).map((faq, i) => (
                                                <div key={i} className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2 relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const copy = currentSectionData.items.filter((_, idx) => idx !== i);
                                                            handleFieldChange("faq", "items", copy);
                                                        }}
                                                        className="absolute top-2 right-2 text-muted hover:text-rose-600 p-1 text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={faq.q}
                                                        placeholder="Question..."
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].q = e.target.value;
                                                            handleFieldChange("faq", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink font-medium focus:outline-none focus:border-gold"
                                                    />
                                                    <textarea
                                                        rows={2}
                                                        value={faq.a}
                                                        placeholder="Answer..."
                                                        onChange={(e) => {
                                                            const copy = [...currentSectionData.items];
                                                            copy[i].a = e.target.value;
                                                            handleFieldChange("faq", "items", copy);
                                                        }}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 16. CLOSING CTA */}
                            {activeTab === "closing_cta" && (
                                <div className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Line 1
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.heading || ""}
                                                onChange={(e) => handleFieldChange("closing_cta", "heading", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Heading Accent Line 2
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.headingHighlight || ""}
                                                onChange={(e) => handleFieldChange("closing_cta", "headingHighlight", e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                            Description Text
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={currentSectionData.description || ""}
                                            onChange={(e) => handleFieldChange("closing_cta", "description", e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Contact Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.phone || ""}
                                                onChange={(e) => handleFieldChange("closing_cta", "phone", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-sans text-[11px] uppercase tracking-wider text-ink font-semibold mb-1">
                                                Button Label
                                            </label>
                                            <input
                                                type="text"
                                                value={currentSectionData.buttonText || ""}
                                                onChange={(e) => handleFieldChange("closing_cta", "buttonText", e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-border text-xs text-ink focus:outline-none focus:border-gold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
