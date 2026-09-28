"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 25;

export default function HeroCreate() {
    const router = useRouter();
    const [preview, setPreview] = useState(null);
    const [mediaType, setMediaType] = useState("image");
    const [fileError, setFileError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [form, setForm] = useState({ mediaFile: null, altText: "", isActive: true });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formError, setFormError] = useState("");
    const fileInputRef = useRef(null);


    const processFile = (file) => {
        if (!file) return;
        setFileError("");

        const isImage = IMAGE_TYPES.includes(file.type);
        const isVideo = VIDEO_TYPES.includes(file.type);

        if (!isImage && !isVideo) {
            setFileError("Only JPG, PNG, WEBP images or MP4, WEBM videos are allowed.");
            return;
        }

        const sizeMB = file.size / (1024 * 1024);
        const limit = isImage ? MAX_IMAGE_MB : MAX_VIDEO_MB;

        if (sizeMB > limit) {
            setFileError(`File too large (${sizeMB.toFixed(1)}MB). Max allowed is ${limit}MB for ${isImage ? "images" : "videos"}.`);
            return;
        }

        setMediaType(isVideo ? "video" : "image");
        setPreview(URL.createObjectURL(file));
        setForm((prev) => ({ ...prev, mediaFile: file }));
    };

    const handleFileChange = (e) => processFile(e.target.files?.[0]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files?.[0]);
    };

    const handleRemoveMedia = () => {
        setPreview(null);
        setForm((prev) => ({ ...prev, mediaFile: null }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!form.mediaFile) {
            setFormError("Please upload an image or video for the hero.");
            return;
        }
        if (!form.altText.trim()) {
            setFormError("Alt text is required.");
            return;
        }

        setSaving(true);
        setSaved(false);

        try {
            const payload = new FormData();
            payload.append("media", form.mediaFile);
            payload.append("altText", form.altText);
            payload.append("isActive", form.isActive);

            const res = await fetch("/api/hero", { method: "POST", body: payload });
            const data = await res.json();

            if (!res.ok) {
                setFormError(data.error || "Something went wrong.");
                setSaving(false);
                return;
            }

            setSaving(false);
            setSaved(true);
            setTimeout(() => router.push("/admin/hero"), 1200);
        } catch {
            setFormError("Network error. Please try again.");
            setSaving(false);
        }
    };

    const handleReset = () => {
        setPreview(null);
        setMediaType("image");
        setFileError("");
        setFormError("");
        setForm({ mediaFile: null, altText: "", isActive: true });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                    <Link
                        href="/admin/hero"
                        className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-[0.1em] uppercase text-muted hover:text-gold-deep transition-colors mb-3"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Hero Banners
                    </Link>
                    <h1 className="font-display text-4xl italic text-ink">Add New Hero Banner</h1>
                    <p className="mt-2 font-sans text-[13px] text-muted">
                        Upload a new banner slide for the homepage hero section.
                    </p>
                </div>
                {saved && (
                    <span className="inline-flex items-center gap-2 font-sans text-[12px] text-green-700 bg-green-50 border border-green-600/20 px-4 py-2 rounded-full shrink-0">
                        Saved
                    </span>
                )}
            </div>

            <form onSubmit={handleCreate} className="relative bg-cream px-8 py-9 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
                <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-gold rounded-tl-2xl" />
                <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-gold rounded-br-2xl" />

                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-3">
                    Media <span className="text-red-500">*</span>
                </p>

                {preview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-ink group">
                        {mediaType === "video" ? (
                            <video src={preview} className="h-full w-full object-cover" autoPlay muted loop />
                        ) : (
                            <img src={preview} alt={form.altText || "Hero preview"} className="h-full w-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

                        <span className="absolute top-3 left-3 bg-ink/70 backdrop-blur-sm text-cream font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                            {mediaType}
                        </span>

                        {!form.isActive && (
                            <span className="absolute top-3 right-3 bg-red-600 text-white font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                                Inactive
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleRemoveMedia}
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-ink font-sans text-[11px] px-3.5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                                <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
                            </svg>
                            Remove
                        </button>
                    </div>
                ) : (
                    <label
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center gap-2.5 py-14 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${isDragging ? "border-gold bg-gold/5" : "border-border hover:border-gold hover:bg-gold/5"
                            }`}
                    >
                        <span className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-gold-deep">
                                <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                                <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
                            </svg>
                        </span>
                        <span className="font-sans text-[13px] text-ink">
                            <span className="text-gold-deep font-medium">Click to upload</span> or drag and drop
                        </span>
                        <span className="font-sans text-[11px] text-muted text-center px-6">
                            JPG, PNG, WEBP (max {MAX_IMAGE_MB}MB) or MP4, WEBM (max {MAX_VIDEO_MB}MB) · 1920×1080 recommended
                        </span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                )}

                {fileError && <p className="mt-2 font-sans text-[11px] text-red-600">{fileError}</p>}

                <div className="mt-7">
                    <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2">
                        Alt Text <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.altText}
                        onChange={(e) => setForm({ ...form, altText: e.target.value })}
                        placeholder="e.g. Bridal makeup close-up shot"
                        className="w-full bg-transparent border-b border-border pb-2.5 text-ink focus:outline-none focus:border-gold transition-colors"
                    />
                    <p className="mt-1.5 font-sans text-[10px] text-muted">
                        For SEO and accessibility — briefly describe what's shown in the image or video.
                    </p>
                </div>

                <div className="mt-7 flex items-center justify-between pt-6 border-t border-border">
                    <div>
                        <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-ink mb-1">
                            Active on Homepage
                        </label>
                        <p className="font-sans text-[10px] text-muted">
                            When turned off, this will be saved as a draft and won't show on the site.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setForm({ ...form, isActive: !form.isActive })}
                        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${form.isActive ? "bg-gold" : "bg-neutral-300"}`}
                    >
                        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                </div>

                {formError && <p className="mt-5 font-sans text-[11px] text-red-600">{formError}</p>}

                <div className="mt-8 flex gap-3">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 border border-border text-ink font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full transition-colors hover:border-gold"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {saving ? "Creating..." : "Create Hero"}
                    </button>
                </div>
            </form>
        </div>
    );
}