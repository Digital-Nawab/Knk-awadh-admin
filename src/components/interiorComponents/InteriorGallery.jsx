"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    X,
    Maximize2,
    MapPin,
    Phone,
    Sparkles,
    ArrowUpRight,
    Compass
} from "lucide-react";
import { BRANCH_INTERIORS } from "@/data/interiorData";

export default function InteriorGallery({ initialData = [] }) {
    const [selectedBranch, setSelectedBranch] = useState("all");
    const [dbItems, setDbItems] = useState(initialData);

    const [lightboxState, setLightboxState] = useState({
        isOpen: false,
        image: null,
        branchTitle: "",
        currentIndex: 0,
        imageList: []
    });

    // Touch swipe refs for mobile
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Fetch latest active images on client mount
    useEffect(() => {
        let isMounted = true;
        async function fetchInterior() {
            try {
                const res = await fetch("/api/interior?active=true");
                const data = await res.json();
                if (isMounted && data.interior && Array.isArray(data.interior)) {
                    setDbItems(data.interior);
                }
            } catch (err) {
                console.error("Error refreshing interior data:", err);
            }
        }
        fetchInterior();
        return () => {
            isMounted = false;
        };
    }, []);

    // Merge database items into the 2 branches (Hazratganj and Gomti Nagar)
    const branches = useMemo(() => {
        return BRANCH_INTERIORS.map((baseBranch) => {
            const branchId = baseBranch.id.toLowerCase();
            const branchDbImages = dbItems
                .filter(
                    (item) =>
                        (item.branch || "").toLowerCase() === branchId &&
                        (item.is_active === 1 || item.is_active === true || item.is_active === undefined)
                )
                .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
                .map((item) => ({
                    id: String(item.id),
                    src: item.image_url,
                    alt: item.alt_text || item.title || baseBranch.name,
                    title: item.alt_text || item.title || baseBranch.name,
                    aspect: "aspect-auto",
                    description: item.alt_text || item.title || baseBranch.name,
                }));

            return {
                ...baseBranch,
                images: branchDbImages.length > 0 ? branchDbImages : baseBranch.images.map((img) => ({
                    ...img,
                    alt: img.title || baseBranch.name,
                })),
            };
        });
    }, [dbItems]);

    // Compute all images for the "all" view lightbox
    const allImagesFlat = useMemo(() => {
        return branches.flatMap((branch) =>
            branch.images.map((img) => ({
                ...img,
                branchName: branch.name,
                branchLocation: branch.location,
            }))
        );
    }, [branches]);

    // Filter branches according to selected tab
    const visibleBranches = useMemo(() => {
        return selectedBranch === "all"
            ? branches
            : branches.filter((b) => b.id === selectedBranch);
    }, [selectedBranch, branches]);

    // Open lightbox
    const openLightbox = (image, branch) => {
        const currentList =
            selectedBranch === "all"
                ? allImagesFlat
                : branch.images.map((img) => ({
                      ...img,
                      branchName: branch.name,
                      branchLocation: branch.location,
                  }));

        const idx = currentList.findIndex((item) => String(item.id) === String(image.id));

        setLightboxState({
            isOpen: true,
            image: currentList[idx !== -1 ? idx : 0],
            branchTitle: branch.name,
            currentIndex: idx !== -1 ? idx : 0,
            imageList: currentList,
        });
    };

    // Close lightbox
    const closeLightbox = useCallback(() => {
        setLightboxState((prev) => ({ ...prev, isOpen: false, image: null }));
    }, []);

    // Navigate in lightbox
    const navigateLightbox = useCallback((direction) => {
        setLightboxState((prev) => {
            if (!prev.isOpen || prev.imageList.length === 0) return prev;
            const newIndex = (prev.currentIndex + direction + prev.imageList.length) % prev.imageList.length;
            const nextImg = prev.imageList[newIndex];
            return {
                ...prev,
                currentIndex: newIndex,
                image: nextImg,
                branchTitle: nextImg.branchName || prev.branchTitle,
            };
        });
    }, []);

    // Keyboard navigation & body scroll lock
    useEffect(() => {
        if (!lightboxState.isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [lightboxState.isOpen, closeLightbox, navigateLightbox]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
            navigateLightbox(1);
        } else if (diff < -50) {
            navigateLightbox(-1);
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <div className="bg-[#FBF7F0] text-[#29231f] min-h-screen selection:bg-[#C9A24A]/20 selection:text-[#29231f]">
            {/* =========================================================================
                HERO SECTION
            ========================================================================== */}
            <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#E6DECE]/80">
                {/* Subtle Awadhi Jaali background motif */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
                    <svg className="w-full h-full text-[#29231f]" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="interiorHeroJaali" width="64" height="64" patternUnits="userSpaceOnUse">
                                <path d="M32 4 L60 32 L32 60 L4 32 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                                <circle cx="32" cy="32" r="3" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#interiorHeroJaali)" />
                    </svg>
                </div>

                {/* Soft ambient lighting gradient */}
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#C9A24A]/10 to-transparent blur-3xl pointer-events-none rounded-full"
                    aria-hidden="true"
                />

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    {/* Breadcrumbs Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-8 flex items-center justify-center">
                        <ol className="inline-flex items-center gap-2 text-[11px] font-['Inter'] uppercase tracking-[0.25em] text-[#8B7D6E]">
                            <li>
                                <Link href="/" className="hover:text-[#b58a52] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li className="text-[#C9A24A]/60">/</li>
                            <li className="text-[#29231f] font-medium" aria-current="page">
                                KNK Interior
                            </li>
                        </ol>
                    </nav>

                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EEE1] border border-[#E6DECE] mb-6">
                        <Sparkles className="size-3 text-[#b58a52]" />
                        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17b5a]">
                            Architecture & Ambience
                        </span>
                        <Sparkles className="size-3 text-[#b58a52]" />
                    </div>

                    {/* Heading */}
                    <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.0] tracking-[-0.03em] text-[#29231f] max-w-4xl mx-auto">
                        Sanctuaries of Awadhi
                        <br />
                        <span className="italic font-medium text-[#b58a52]">Opulence & Artistry.</span>
                    </h1>

                    {/* Subheading Narrative */}
                    <p className="mt-6 max-w-2xl mx-auto font-['Inter'] text-[14px] sm:text-[15px] md:text-[16px] text-[#71665c] leading-[1.8] font-normal">
                        Step inside KNK Awadh’s premier branches across Lucknow. Each salon is an architectural symphony of handcrafted Awadhi jharokhas, warm crystal chandeliers, gilded arched mirrors, and private sanctuary suites designed for regal comfort.
                    </p>

                    {/* Gold Divider */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <span className="h-px w-12 bg-[#d0bda4]" />
                        <span className="h-2 w-2 rounded-full bg-[#b58a52]" />
                        <span className="h-[2px] w-20 bg-[#b58a52]" />
                        <span className="h-2 w-2 rounded-full bg-[#b58a52]" />
                        <span className="h-px w-12 bg-[#d0bda4]" />
                    </div>

                    {/* Quick Branch Nav / Filters */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => setSelectedBranch("all")}
                            className={`px-5 py-2.5 rounded-full text-xs font-['Inter'] tracking-[0.16em] uppercase transition-all duration-300 ${
                                selectedBranch === "all"
                                    ? "bg-[#29231f] text-[#FBF7F0] shadow-soft"
                                    : "bg-white/80 hover:bg-white text-[#71665c] hover:text-[#29231f] border border-[#E6DECE]"
                            }`}
                        >
                            All Branches ({allImagesFlat.length} Views)
                        </button>
                        {branches.map((branch) => {
                            const isSelected = selectedBranch === branch.id;
                            return (
                                <button
                                    key={branch.id}
                                    type="button"
                                    onClick={() => setSelectedBranch(branch.id)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-['Inter'] tracking-[0.16em] uppercase transition-all duration-300 ${
                                        isSelected
                                            ? "bg-[#b58a52] text-white shadow-soft"
                                            : "bg-white/80 hover:bg-white text-[#71665c] hover:text-[#29231f] border border-[#E6DECE]"
                                    }`}
                                >
                                    {branch.name.replace("KNK ", "")} ({branch.images.length})
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                BRANCH SECTIONS (MASONRY GALLERY)
            ========================================================================== */}
            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-16 md:py-24 space-y-24 md:space-y-32">
                {visibleBranches.map((branch, branchIdx) => (
                    <section
                        key={branch.id}
                        id={branch.id}
                        className="scroll-mt-28 relative"
                    >
                        {/* Branch Title & Meta Information Card */}
                        <div className="bg-[#FFFDF9] border border-[#E6DECE] rounded-3xl p-6 sm:p-10 md:p-12 mb-12 shadow-soft relative overflow-hidden">
                            {/* Decorative background watermark */}
                            <div className="absolute right-4 -bottom-6 select-none pointer-events-none opacity-[0.03] font-['Cormorant_Garamond'] text-[140px] md:text-[200px] leading-none text-[#29231f]">
                                0{branchIdx + 1}
                            </div>

                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                                <div className="max-w-2xl">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="font-['Inter'] text-[10px] font-bold tracking-[0.25em] uppercase text-[#b58a52] bg-[#F4EEE1] px-3 py-1 rounded-full border border-[#EAD9AE]">
                                            {branch.badge}
                                        </span>
                                        <span className="text-xs text-[#8B7D6E] font-['Inter'] tracking-wider">
                                            Branch 0{branchIdx + 1}
                                        </span>
                                    </div>

                                    <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] text-[#29231f]">
                                        {branch.name}
                                        <span className="block text-xl sm:text-2xl md:text-3xl font-normal italic text-[#b58a52] mt-1">
                                            {branch.subtitle}
                                        </span>
                                    </h2>

                                    <p className="mt-4 font-['Inter'] text-[13px] sm:text-[14px] text-[#71665c] leading-[1.8]">
                                        {branch.description}
                                    </p>

                                    {/* Architectural features pills */}
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {branch.features.map((feat, i) => (
                                            <span
                                                key={i}
                                                className="text-[11px] font-['Inter'] font-medium text-[#71665c] bg-[#FBF7F0] border border-[#E6DECE] px-3 py-1 rounded-md"
                                            >
                                                ✦ {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Location Details & Quick Actions */}
                                <div className="lg:min-w-[300px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E6DECE] pt-6 lg:pt-0 lg:pl-8 space-y-4">
                                    <div>
                                        <div className="flex items-start gap-2.5 text-xs text-[#71665c] leading-relaxed">
                                            <MapPin className="size-4 shrink-0 text-[#b58a52] mt-0.5" />
                                            <span>{branch.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-xs text-[#71665c] mt-3">
                                            <Phone className="size-4 shrink-0 text-[#b58a52]" />
                                            <a
                                                href={`tel:${branch.phoneClean}`}
                                                className="hover:text-[#b58a52] transition-colors font-medium font-['Inter'] tracking-wide"
                                            >
                                                {branch.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <a
                                            href={branch.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold font-['Inter'] uppercase tracking-[0.14em] text-[#b58a52] hover:text-[#9C7A2E] transition-colors"
                                        >
                                            Get Directions
                                            <ArrowUpRight className="size-3.5" />
                                        </a>
                                        <span className="text-[#d0bda4]">|</span>
                                        <a
                                            href={`tel:${branch.phoneClean}`}
                                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold font-['Inter'] uppercase tracking-[0.14em] text-[#29231f] hover:text-[#b58a52] transition-colors"
                                        >
                                            Call Branch
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =========================================================================
                            MASONRY GRID LAYOUT
                            Clean multi-column masonry without text overlay on images
                        ========================================================================== */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                            {branch.images.map((img) => (
                                <figure
                                    key={img.id}
                                    onClick={() => openLightbox(img, branch)}
                                    className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden bg-[#FFFDF9] border border-[#E6DECE] hover:border-[#C9A24A]/80 shadow-soft hover:shadow-luxe transition-all duration-500 cursor-zoom-in"
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative w-full overflow-hidden">
                                        <img
                                            src={img.src}
                                            alt={img.alt || img.title || `${branch.name} Interior`}
                                            loading="lazy"
                                            className="w-full h-auto object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Subtle Clean Hover Overlay without any text */}
                                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="size-11 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                                <Maximize2 className="size-5" />
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                            ))}
                        </div>

                        {/* Subtle divider between branches */}
                        {branchIdx < visibleBranches.length - 1 && (
                            <div className="mt-24 flex items-center justify-center gap-3">
                                <span className="h-px w-24 bg-[#E6DECE]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A24A]" />
                                <span className="h-px w-24 bg-[#E6DECE]" />
                            </div>
                        )}
                    </section>
                ))}
            </main>

            {/* =========================================================================
                VISIT / APPOINTMENT INVITATION BANNER
            ========================================================================== */}
            <section className="bg-gradient-to-b from-[#FBF7F0] via-[#F4EEE1] to-[#EAE2D2] border-t border-[#E6DECE] text-[#29231f] py-20 px-6 relative overflow-hidden">
                {/* Decorative Jaali overlay in footer banner */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" aria-hidden="true">
                    <svg className="w-full h-full text-[#29231f]" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="visitJaali" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#visitJaali)" />
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#E6DECE] mb-6 shadow-sm">
                        <Compass className="size-3.5 text-[#b58a52]" />
                        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a17b5a]">
                            Visit KNK Awadh
                        </span>
                    </div>

                    <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#29231f]">
                        Experience the Grandeur
                        <br />
                        <span className="italic text-[#b58a52]">In Person.</span>
                    </h2>

                    <p className="mt-5 max-w-xl mx-auto font-['Inter'] text-sm sm:text-base text-[#71665c] leading-relaxed">
                        Step into any of our two Lucknow sanctuaries for an extraordinary bespoke beauty experience. Reserve your consultation or pampering session today.
                    </p>

                    <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
                        {branches.map((b) => (
                            <div
                                key={b.id}
                                className="bg-[#FFFDF9] border border-[#E6DECE] rounded-2xl p-6 shadow-soft hover:shadow-luxe hover:border-[#C9A24A]/70 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#29231f]">
                                        {b.name}
                                    </h3>
                                    <p className="font-['Inter'] text-xs text-[#71665c] mt-2 line-clamp-2 leading-relaxed">
                                        {b.address}
                                    </p>
                                </div>
                                <a
                                    href={`tel:${b.phoneClean}`}
                                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#a17b5a] hover:text-[#b58a52] font-semibold tracking-wide transition-colors font-['Inter']"
                                >
                                    <Phone className="size-3 text-[#b58a52]" />
                                    {b.phone}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/contact-us"
                            className="px-8 py-3.5 rounded-full bg-gradient-gold text-primary font-semibold text-xs tracking-[0.16em] uppercase hover:scale-105 transition-transform shadow-luxe"
                        >
                            Book an Appointment
                        </Link>
                        <a
                            href="https://wa.me/918881000552"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 rounded-full bg-[#241D18] hover:bg-[#342a22] text-[#FBF7F0] border border-[#241D18] text-xs tracking-[0.16em] uppercase hover:scale-105 transition-all shadow-soft"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                PREMIUM LIGHTBOX / FULLSCREEN VIEWER
            ========================================================================== */}
            {lightboxState.isOpen && lightboxState.image && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image Lightbox Viewer"
                    className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 select-none"
                    onClick={closeLightbox}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Top Control Bar */}
                    <div
                        className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-['Inter'] text-xs text-white/60 tracking-wider">
                                {lightboxState.currentIndex + 1} / {lightboxState.imageList.length}
                            </span>
                        </div>

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={closeLightbox}
                            aria-label="Close Lightbox"
                            className="size-11 sm:size-12 rounded-full bg-white/10 hover:bg-[#b58a52] text-white hover:text-[#241D18] flex items-center justify-center transition-all duration-200 border border-white/20"
                        >
                            <X className="size-6" />
                        </button>
                    </div>

                    {/* Middle: Main Image & Floating Navigation Arrows */}
                    <div
                        className="relative flex-1 flex items-center justify-center px-4 sm:px-16 md:px-24 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Previous Button */}
                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={() => navigateLightbox(-1)}
                            className="absolute left-3 sm:left-6 z-20 size-12 sm:size-14 rounded-full bg-black/50 hover:bg-[#b58a52] text-white hover:text-[#241D18] border border-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:scale-105"
                        >
                            <ChevronLeft className="size-7" />
                        </button>

                        {/* Image Display */}
                        <div className="relative max-h-[78vh] sm:max-h-[82vh] max-w-5xl w-full flex items-center justify-center p-2">
                            <img
                                key={lightboxState.image.id}
                                src={lightboxState.image.src}
                                alt={lightboxState.image.alt || lightboxState.image.title || lightboxState.branchTitle || "KNK Interior"}
                                className="max-h-[78vh] sm:max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={() => navigateLightbox(1)}
                            className="absolute right-3 sm:right-6 z-20 size-12 sm:size-14 rounded-full bg-black/50 hover:bg-[#b58a52] text-white hover:text-[#241D18] border border-white/20 flex items-center justify-center transition-all duration-200 backdrop-blur-md hover:scale-105"
                        >
                            <ChevronRight className="size-7" />
                        </button>
                    </div>

                    {/* Bottom: Thumbnail Strip */}
                    <div
                        className="relative z-20 px-4 sm:px-8 py-4 sm:py-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Quick Thumbnail Navigation */}
                        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 px-2">
                            {lightboxState.imageList.map((img, i) => {
                                const isCurrent = i === lightboxState.currentIndex;
                                return (
                                    <button
                                        key={img.id}
                                        type="button"
                                        aria-label={`Jump to image ${i + 1}`}
                                        onClick={() => {
                                            setLightboxState((prev) => ({
                                                ...prev,
                                                currentIndex: i,
                                                image: prev.imageList[i],
                                                branchTitle: prev.imageList[i].branchName || prev.branchTitle,
                                            }));
                                        }}
                                        className={`size-12 sm:size-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                            isCurrent
                                                ? "border-[#b58a52] scale-110 shadow-lg ring-2 ring-[#b58a52]/40"
                                                : "border-white/30 opacity-50 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt || img.title || "Thumbnail"}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
