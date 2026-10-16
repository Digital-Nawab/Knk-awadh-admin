"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
    GraduationCap,
    Plus,
    Search,
    RefreshCw,
    ExternalLink,
    Edit2,
    Trash2,
    Eye,
    X,
    UploadCloud,
    Check,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    MoveUp,
} from "lucide-react";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const MAX_FILE_SIZE_MB = 15;

export default function CoursesIndex() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Search query
    const [searchQuery, setSearchQuery] = useState("");

    // Add / Edit Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [modalError, setModalError] = useState("");

    // Form data
    const [formData, setFormData] = useState({
        altText: "",
        displayOrder: 1,
        isActive: true,
        imageUrl: "",
    });

    // File upload
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Delete modal
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDeleteCourse, setConfirmDeleteCourse] = useState(null);

    // Status toggling
    const [togglingId, setTogglingId] = useState(null);

    const loadCourses = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/courses");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load courses.");
            setCourses(data.courses || []);
        } catch (err) {
            setError(err.message || "Failed to load courses.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    // Open Add Modal
    const handleOpenAddModal = () => {
        setEditingCourse(null);
        setFormData({
            altText: "",
            displayOrder: (courses.length > 0 ? Math.max(...courses.map((c) => c.displayOrder || 0)) : 0) + 1,
            isActive: true,
            imageUrl: "",
        });
        setSelectedFile(null);
        setFilePreview("");
        setModalError("");
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleOpenEditModal = (course) => {
        setEditingCourse(course);
        setFormData({
            altText: course.altText || course.title || "",
            displayOrder: course.displayOrder || 1,
            isActive: course.isActive ?? true,
            imageUrl: course.imageUrl || "",
        });
        setSelectedFile(null);
        setFilePreview(course.imageUrl || "");
        setModalError("");
        setIsModalOpen(true);
    };

    // Handle File Drop / Select
    const handleFileChange = (file) => {
        if (!file) return;

        if (!IMAGE_TYPES.includes(file.type)) {
            setModalError("Invalid image type. Please select a JPG, PNG, WEBP, or AVIF image.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setModalError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
            return;
        }

        setModalError("");
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Submit Add or Edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalError("");

        const altText = formData.altText.trim();
        if (!altText) {
            setModalError("Alt text is required.");
            return;
        }

        if (!editingCourse && !selectedFile) {
            setModalError("Please select an image file to upload.");
            return;
        }

        setSubmitting(true);

        try {
            const formPayload = new FormData();
            formPayload.append("title", altText);
            formPayload.append("altText", altText);
            formPayload.append("displayOrder", String(formData.displayOrder || 1));
            formPayload.append("isActive", String(formData.isActive));

            if (selectedFile) {
                formPayload.append("image", selectedFile);
            }

            const url = editingCourse ? `/api/courses/${editingCourse.id}` : "/api/courses";
            const method = editingCourse ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                body: formPayload,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save course flyer.");

            setSuccessMessage(editingCourse ? "Course flyer updated successfully!" : "New course flyer created successfully!");
            setTimeout(() => setSuccessMessage(""), 4000);

            setIsModalOpen(false);
            loadCourses();
        } catch (err) {
            setModalError(err.message || "Failed to save course flyer.");
        } finally {
            setSubmitting(false);
        }
    };

    // Toggle Active Status
    const handleToggleStatus = async (course) => {
        setTogglingId(course.id);
        try {
            const nextStatus = !course.isActive;
            const res = await fetch(`/api/courses/${course.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: nextStatus }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to toggle status.");

            setCourses((prev) =>
                prev.map((c) => (c.id === course.id ? { ...c, isActive: nextStatus } : c))
            );
        } catch (err) {
            alert(err.message || "Failed to update status.");
        } finally {
            setTogglingId(null);
        }
    };

    // Confirm Delete
    const handleDelete = async () => {
        if (!confirmDeleteCourse) return;
        setDeletingId(confirmDeleteCourse.id);

        try {
            const res = await fetch(`/api/courses/${confirmDeleteCourse.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete course flyer.");

            setSuccessMessage("Course flyer deleted successfully.");
            setTimeout(() => setSuccessMessage(""), 4000);

            setConfirmDeleteCourse(null);
            loadCourses();
        } catch (err) {
            alert(err.message || "Failed to delete course flyer.");
        } finally {
            setDeletingId(null);
        }
    };

    // Filtered courses by search query
    const filteredCourses = courses.filter((c) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            (c.title && c.title.toLowerCase().includes(q)) ||
            (c.altText && c.altText.toLowerCase().includes(q))
        );
    });

    const activeCount = courses.filter((c) => c.isActive).length;
    const inactiveCount = courses.length - activeCount;

    return (
        <div className="space-y-6 w-full pb-16 font-sans">
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EAE2D5] rounded-3xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-[#877443]/10 border border-[#877443]/20 flex items-center justify-center text-[#877443]">
                            <GraduationCap className="w-5 h-5 text-[#877443]" />
                        </div>
                        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#161413]">
                            Enroll Courses CMS
                        </h1>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#877443]/10 text-[#877443] border border-[#877443]/20">
                            Live Admissions
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#7A726B]">
                        Manage reel-size course posters and flyers displayed on the{" "}
                        <Link href="/enroll-for-course" target="_blank" className="text-[#877443] font-semibold hover:underline">
                            /enroll-for-course
                        </Link>{" "}
                        page.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                        href="/enroll-for-course"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] hover:border-[#161413] text-xs font-medium transition cursor-pointer"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Live Page</span>
                    </Link>

                    <button
                        onClick={loadCourses}
                        disabled={loading}
                        className="p-2.5 rounded-2xl bg-white border border-[#EAE2D5] text-[#524B44] hover:text-[#161413] transition disabled:opacity-50 cursor-pointer"
                        title="Refresh list"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    </button>

                    <button
                        onClick={handleOpenAddModal}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#877443] hover:bg-[#736336] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add New Course Flyer</span>
                    </button>
                </div>
            </div>

            {/* Success Toast */}
            {successMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Error Banner */}
            {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* KPI Stats Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#EAE2D5] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-semibold text-[#7A726B] uppercase tracking-wider block">
                            Total Course Flyers
                        </span>
                        <span className="text-2xl font-bold font-playfair text-[#161413]">{courses.length}</span>
                    </div>
                    <GraduationCap className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EAE2D5] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-semibold text-[#7A726B] uppercase tracking-wider block">
                            Active Admissions
                        </span>
                        <span className="text-2xl font-bold font-playfair text-emerald-700">{activeCount}</span>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EAE2D5] flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-semibold text-[#7A726B] uppercase tracking-wider block">
                            Hidden / Inactive
                        </span>
                        <span className="text-2xl font-bold font-playfair text-[#A39990]">{inactiveCount}</span>
                    </div>
                    <X className="w-6 h-6 text-stone-300" />
                </div>
            </div>

            {/* Search Filter */}
            <div className="bg-white border border-[#EAE2D5] rounded-3xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#A39990] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by alt text..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#161413] placeholder-[#A39990] focus:outline-none focus:border-[#877443] bg-[#FAF5EE]/30"
                    />
                </div>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-xs text-[#7A726B] hover:text-[#161413] px-2 py-1"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Courses Grid View */}
            {loading ? (
                <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-[#EAE2D5]">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#877443] mx-auto" />
                    <p className="text-xs text-[#7A726B]">Loading course flyers...</p>
                </div>
            ) : filteredCourses.length === 0 ? (
                <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-[#EAE2D5] p-6">
                    <GraduationCap className="w-10 h-10 text-[#C9A24A] mx-auto" />
                    <h3 className="font-playfair text-lg font-bold text-[#161413]">No course flyers found</h3>
                    <p className="text-xs text-[#7A726B] max-w-sm mx-auto">
                        {searchQuery ? "No course flyers match your search query." : "Upload your first academy course flyer to start enrolling students."}
                    </p>
                    <button
                        onClick={handleOpenAddModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#877443] text-white text-xs font-semibold hover:bg-[#736336]"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add First Course Flyer</span>
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                                course.isActive ? "border-[#EAE2D5]" : "border-stone-200 opacity-60"
                            }`}
                        >
                            <div>
                                {/* Poster Image */}
                                <div className="relative h-56 sm:h-60 bg-[#FAF5EE] overflow-hidden border-b border-[#EAE2D5]">
                                    <img
                                        src={course.imageUrl}
                                        alt={course.altText || course.title || "Course Flyer"}
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            e.currentTarget.src = "/assets/images/new/academy.webp";
                                        }}
                                    />
                                    {/* Order Badge */}
                                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                                        Order #{course.displayOrder}
                                    </div>
                                    {/* Active Badge */}
                                    <div className="absolute top-3 right-3">
                                        {course.isActive ? (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full bg-stone-700/90 backdrop-blur-xs text-white text-[10px] font-bold">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-4 space-y-1">
                                    <h3 className="font-playfair text-base font-bold text-[#161413] line-clamp-2">
                                        {course.altText || course.title || `Course Flyer #${course.displayOrder}`}
                                    </h3>
                                </div>
                            </div>

                            {/* Actions Bar */}
                            <div className="p-4 pt-2 border-t border-[#EAE2D5] flex items-center justify-between gap-2">
                                <button
                                    onClick={() => handleToggleStatus(course)}
                                    disabled={togglingId === course.id}
                                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition cursor-pointer ${
                                        course.isActive
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                            : "bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200"
                                    }`}
                                >
                                    {course.isActive ? "Deactivate" : "Activate"}
                                </button>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handleOpenEditModal(course)}
                                        className="p-1.5 rounded-xl text-[#524B44] hover:text-[#161413] hover:bg-[#FAF5EE] transition cursor-pointer"
                                        title="Edit"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteCourse(course)}
                                        className="p-1.5 rounded-xl text-[#A39990] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal: Add / Edit Course Flyer */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-[#EAE2D5] shadow-2xl p-6 sm:p-7 space-y-5">
                        <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-3">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-[#877443]" />
                                <h3 className="font-playfair text-xl font-bold text-[#161413]">
                                    {editingCourse ? "Edit Course Flyer" : "Add New Course Flyer"}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 rounded-xl hover:bg-[#FAF5EE] text-[#7A726B] hover:text-[#161413]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {modalError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                                {modalError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            {/* Image Upload Area */}
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-[#161413] uppercase tracking-wider">
                                    Course Flyer Poster (Reel Size: 9:16 Aspect Ratio) <span className="text-[#B3203F]">*</span>
                                </label>

                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                            handleFileChange(e.dataTransfer.files[0]);
                                        }
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                                        isDragging
                                            ? "border-[#877443] bg-[#877443]/5"
                                            : "border-[#EAE2D5] bg-[#FAF5EE]/40 hover:border-[#877443]/50"
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/avif"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleFileChange(e.target.files[0]);
                                            }
                                        }}
                                        className="hidden"
                                    />

                                    {filePreview ? (
                                        <div className="relative mx-auto w-28 h-40 rounded-xl overflow-hidden border border-[#EAE2D5] shadow-xs">
                                            <img
                                                src={filePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition text-white text-[10px] font-semibold">
                                                Change Image
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-6 space-y-2">
                                            <UploadCloud className="w-8 h-8 text-[#877443] mx-auto" />
                                            <p className="text-xs font-semibold text-[#161413]">
                                                Click to upload or drag &amp; drop
                                            </p>
                                            <p className="text-[10px] text-[#A39990]">
                                                Supports JPG, PNG, WEBP (Max 15MB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Alt Text */}
                            <div className="space-y-1">
                                <label className="block text-[11px] font-bold text-[#161413] uppercase tracking-wider">
                                    Alt Text <span className="text-[#B3203F]">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Professional Bridal Makeup Masterclass at KNK Academy Lucknow"
                                    value={formData.altText}
                                    onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#EAE2D5] text-xs font-semibold text-[#161413] focus:outline-none focus:border-[#877443]"
                                />
                            </div>

                            {/* Display Order & Active status */}
                            <div className="grid grid-cols-2 gap-3 pt-1">
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-bold text-[#524B44]">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={formData.displayOrder}
                                        onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                                        className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#EAE2D5] text-xs text-[#161413] focus:outline-none focus:border-[#877443]"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[11px] font-bold text-[#524B44]">
                                        Status
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                        className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                                            formData.isActive
                                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                                : "bg-stone-100 text-stone-600 border-stone-300"
                                        }`}
                                    >
                                        <span className={`w-2 h-2 rounded-full ${formData.isActive ? "bg-emerald-500" : "bg-stone-400"}`} />
                                        <span>{formData.isActive ? "Active (Visible)" : "Hidden"}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#EAE2D5]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A726B] hover:text-[#161413]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 rounded-xl bg-[#877443] hover:bg-[#736336] text-white text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                                >
                                    {submitting ? "Saving..." : editingCourse ? "Save Changes" : "Create Course Flyer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Delete Confirmation */}
            {confirmDeleteCourse && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-[#EAE2D5] shadow-2xl space-y-4">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mx-auto">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="font-playfair text-lg font-bold text-[#161413]">
                                Delete Course Flyer?
                            </h3>
                            <p className="text-xs text-[#7A726B]">
                                Are you sure you want to delete &ldquo;{confirmDeleteCourse.title}&rdquo;? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setConfirmDeleteCourse(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A726B] hover:text-[#161413]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deletingId === confirmDeleteCourse.id}
                                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition disabled:opacity-50"
                            >
                                {deletingId === confirmDeleteCourse.id ? "Deleting..." : "Delete Course"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
