"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];
const MAX_IMAGE_MB = 5;
const MAX_VIDEO_MB = 25;

export default function HeroEdit({ heroId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const [mediaType, setMediaType] = useState("image");
    const [fileError, setFileError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [newMediaFile, setNewMediaFile] = useState(null);
    const [form, setForm] = useState({ altText: "", isActive: true });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [formError, setFormError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function loadHero() {
            const res = await fetch(`/api/hero/${heroId}`);
            const data = await res.json();
            if (res.ok && data.hero) {
                setPreview(data.hero.media_url);
                setMediaType(data.hero.media_type);
                setForm({ altText: data.hero.alt_text, isActive: !!data.hero.is_active });
            }
            setLoading(false);
        }
        loadHero();
    }, [heroId]);

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
            setFileError(`File too large (${sizeMB.toFixed(1)}MB). Max allowed is ${limit}MB.`);
            return;
        }

        setMediaType(isVideo ? "video" : "image");
        setPreview(URL.createObjectURL(file));
        setNewMediaFile(file);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!form.altText.trim()) {
            setFormError("Alt text is required.");
            return;
        }

        setSaving(true);
        setSaved(false);

        try {
            const payload = new FormData();
            if (newMediaFile) payload.append("media", newMediaFile);
            payload.append("altText", form.altText);
            payload.append("isActive", form.isActive);

            const res = await fetch(`/api/hero/${heroId}`, { method: "PATCH", body: payload });
            const data = await res.json();

            if (!res.ok) {
                setFormError(data.error || "Something went wrong.");
                setSaving(false);
                return;
            }

            setSaving(false);
            setSaved(true);
            setTimeout(() => router.push("/admin/hero"), 1200);
        } catch (err) {
            setFormError("Network error. Please try again.");
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="font-sans text-[13px] text-muted">Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="font-display text-4xl italic text-ink">Edit Hero Banner</h1>
                    <p className="mt-2 font-sans text-[13px] text-muted">
                        Update this banner slide's media, alt text or status.
                    </p>
                </div>
                {saved && (
                    <span className="inline-flex items-center gap-2 font-sans text-[12px] text-green-700 bg-green-50 border border-green-600/20 px-4 py-2 rounded-full shrink-0">
                        Saved
                    </span>
                )}
            </div>

            <form onSubmit={handleUpdate} className="relative bg-cream px-8 py-9 rounded-xl shadow-sm">
                <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-gold rounded-tl-xl" />
                <span aria-hidden="true" className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-gold rounded-br-xl" />

                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-3">Media</p>

                <div className="relative aspect-video rounded-lg overflow-hidden border border-border bg-ink group">
                    {mediaType === "video" ? (
                        <video src={preview} className="h-full w-full object-cover" autoPlay muted loop />
                    ) : (
                        <img src={preview} alt={form.altText} className="h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-ink/70 text-cream font-sans text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
                        {mediaType}
                    </span>

                    <label
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files?.[0]); }}
                        className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 font-sans text-[11px] px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                            isDragging ? "bg-gold text-cream" : "bg-white/90 hover:bg-white text-ink"
                        }`}
                    >
                        Replace media
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                            onChange={(e) => processFile(e.target.files?.[0])}
                            className="hidden"
                        />
                    </label>
                </div>

                {fileError && <p className="mt-2 font-sans text-[11px] text-red-600">{fileError}</p>}

                <div className="mt-7">
                    <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-muted mb-2">
                        Alt Text <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.altText}
                        onChange={(e) => setForm({ ...form, altText: e.target.value })}
                        className="w-full bg-transparent border-b border-border pb-2.5 text-ink focus:outline-none focus:border-gold transition-colors"
                    />
                </div>

                <div className="mt-7 flex items-center justify-between pt-6 border-t border-border">
                    <div>
                        <label className="block font-sans text-[11px] tracking-[0.15em] uppercase text-ink mb-1">
                            Active on Homepage
                        </label>
                        <p className="font-sans text-[10px] text-muted">
                            When turned off, this stays saved as a draft and won't show on the site.
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
                        onClick={() => router.push("/admin/hero")}
                        className="flex-1 border border-border text-ink font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full transition-colors hover:border-gold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-gold text-cream font-sans text-[11px] tracking-[0.2em] uppercase py-4 rounded-full shadow-luxe transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}