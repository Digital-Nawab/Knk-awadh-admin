"use client";

import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CourseEnrollModal from "@/components/courses/CourseEnrollModal";
import { Sparkles, GraduationCap } from "lucide-react";

// Initial default courses matching academy specialties
const DEFAULT_COURSES = [
    {
        id: 1,
        title: "Professional Bridal Makeup Masterclass",
        altText: "Professional Bridal Makeup Masterclass at KNK Academy Lucknow",
        imageUrl: "/assets/images/new/academy.webp",
        displayOrder: 1,
        isActive: true,
    },
    {
        id: 2,
        title: "Advanced Hair Styling & Balayage Certification",
        altText: "Advanced Hair Styling and Chemical Work at KNK Academy Lucknow",
        imageUrl: "/assets/images/new/academyimg.webp",
        displayOrder: 2,
        isActive: true,
    },
    {
        id: 3,
        title: "Complete Cosmetology & Skin Aesthetics Diploma",
        altText: "Complete Cosmetology & Skin Aesthetics Diploma at KNK Academy",
        imageUrl: "/assets/images/about/academy-training.webp",
        displayOrder: 3,
        isActive: true,
    },
];

export default function EnrollCoursePageClient({ initialCourses = [] }) {
    const [courses, setCourses] = useState(
        initialCourses && initialCourses.length > 0 ? initialCourses : DEFAULT_COURSES
    );
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState("");

    // Load active courses dynamically from backend API
    useEffect(() => {
        let isMounted = true;
        fetch("/api/courses?activeOnly=true")
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                if (data.courses && Array.isArray(data.courses) && data.courses.length > 0 && isMounted) {
                    setCourses(data.courses);
                }
            })
            .catch(() => {
                // Keep default or initial courses
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter active courses in display order
    const activeCourses = courses.filter((c) => c.isActive);

    const handleOpenEnroll = (course) => {
        const title = course.title || course.altText || "Professional Academy Course";
        setSelectedCourseTitle(title);
        setIsEnrollModalOpen(true);
    };

    return (
        <div className="bg-[#FAF7F2] text-[#241D18] min-h-screen pt-28 pb-20 font-sans">
            {/* Breadcrumbs Navigation */}
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Academy", href: "/academy" },
                        { label: "Enroll For Course" },
                    ]}
                />
            </div>

            {/* Simple Clean Header Matching Offers Page */}
            <section className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-4 pb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C9A24A]/25 via-[#C9A24A]/15 to-transparent border border-[#C9A24A]/40 shadow-xs mb-3">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A24A] opacity-80" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A24A]" />
                    </span>
                    <span className="font-sans text-[10.5px] font-bold tracking-[0.25em] uppercase text-[#877443] flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-[#877443]" />
                        KNK Beauty Academy
                    </span>
                    <span className="text-[8.5px] bg-[#877443] text-white font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        ADMISSIONS OPEN
                    </span>
                </div>

                <h1 className="font-playfair text-3xl sm:text-5xl text-[#161413] font-bold leading-tight">
                    Enroll For Professional Courses
                </h1>

                <p className="font-sans text-xs sm:text-sm text-[#665A4E] max-w-xl mx-auto mt-2.5 font-normal tracking-wide leading-relaxed">
                    Elevate your artistry with master-level certifications in Bridal Makeup, Hair Couture, Aesthetics &amp; Cosmetology. Hands-on training by seasoned industry masters.
                </p>
            </section>

            {/* Reel-Size Course Posters Grid (Clean flyer images with 'Enroll For Course' underneath) */}
            <section className="max-w-6xl mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {activeCourses.map((course) => (
                        <div key={course.id} className="flex flex-col group">
                            {/* Reel-size Flyer Poster Card */}
                            <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4BC88]/60 bg-white shadow-[0_12px_36px_rgba(140,110,60,0.14)] transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(140,110,60,0.24)] group-hover:-translate-y-1">
                                <img
                                    src={course.imageUrl || "/assets/images/new/academy.webp"}
                                    alt={course.altText || course.title || "KNK Academy Course"}
                                    className="w-full aspect-[9/16] object-cover block rounded-2xl"
                                    onError={(e) => {
                                        e.currentTarget.src = "/assets/images/new/academy.webp";
                                    }}
                                />
                            </div>

                            {/* Enroll For Course Button (Olive-Gold Luxury Style) */}
                            <div className="mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleOpenEnroll(course)}
                                    className="w-full py-3.5 px-6 rounded-md bg-[#877443] hover:bg-[#736336] active:scale-[0.99] text-white font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(135,116,67,0.35)] hover:shadow-[0_6px_22px_rgba(135,116,67,0.5)] cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-[#F5DB99]" />
                                    <span>Enroll For Course</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {activeCourses.length === 0 && (
                    <div className="text-center py-16 px-4 bg-white/70 rounded-2xl border border-[#D4BC88]/40 my-8">
                        <GraduationCap className="w-8 h-8 text-[#877443] mx-auto mb-2" />
                        <p className="font-playfair text-2xl text-[#161413] font-bold">
                            Admissions opening soon for upcoming batches.
                        </p>
                        <p className="font-sans text-xs text-[#665A4E] mt-2">
                            Please check back soon or connect directly with our academy counsellor.
                        </p>
                    </div>
                )}
            </section>

            {/* Popup Academy Admissions Form (Modal) */}
            <CourseEnrollModal
                open={isEnrollModalOpen}
                onClose={() => setIsEnrollModalOpen(false)}
                courseTitle={selectedCourseTitle}
            />
        </div>
    );
}
