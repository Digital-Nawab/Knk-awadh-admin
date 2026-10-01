"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const quickLinks = [
    {
        title: "Bookings & Leads",
        desc: "View and manage live inquiries from Hero Concierge, Luxury Studio, Makeup, and Academy.",
        href: "/admin/bookings",
        actionText: "View Leads",
    },
    {
        title: "The Journal (Blogs)",
        desc: "Publish and edit editorial stories, bridal guides, and haircare tips.",
        href: "/admin/blogs",
        actionText: "Manage Stories",
    },
    {
        title: "Master SEO Manager",
        desc: "Configure URL-specific meta titles, descriptions, keywords, and OpenGraph social images.",
        href: "/admin/seo",
        actionText: "Open SEO Suite",
    },
    {
        title: "Services & Categories",
        desc: "Add, edit, or reorder services across Hair, Beauty, Nails, Facial, and Body.",
        href: "/admin/services",
        actionText: "Manage Services",
    },
    {
        title: "Artistry Gallery Lookbook",
        desc: "Upload, view, and manage bridal transformations and salon lookbook photos.",
        href: "/admin/gallery",
        actionText: "Manage Gallery",
    },
    {
        title: "About Us Page CMS",
        desc: "Customize hero video, brand story, founders, academy, and FAQ content on the About page.",
        href: "/admin/about",
        actionText: "Manage About Page",
    },
];

export default function Dashboard() {
    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [stats, setStats] = useState({
        todayBookings: 0,
        totalBookings: 0,
        totalBlogs: 3,
        totalSeo: 7,
        totalGallery: 22,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const [bRes, blRes, sRes, gRes] = await Promise.all([
                    fetch("/api/bookings"),
                    fetch("/api/blogs"),
                    fetch("/api/seo"),
                    fetch("/api/gallery"),
                ]);
                const bData = bRes.ok ? await bRes.json() : null;
                const blData = blRes.ok ? await blRes.json() : null;
                const sData = sRes.ok ? await sRes.json() : null;
                const gData = gRes.ok ? await gRes.json() : null;

                setStats({
                    todayBookings: bData?.stats?.today ?? 0,
                    totalBookings: bData?.stats?.total ?? 0,
                    totalBlogs: blData?.blogs?.length ?? 3,
                    totalSeo: sData?.seoList?.length ?? 7,
                    totalGallery: gData?.gallery?.length ?? 22,
                });
            } catch {
                // Fallback stats
            }
        }
        fetchStats();
    }, []);

    const metricCards = [
        { label: "Today's Bookings", value: stats.todayBookings, link: "/admin/bookings" },
        { label: "Total Client Leads", value: stats.totalBookings, link: "/admin/bookings" },
        { label: "Published Stories", value: stats.totalBlogs, link: "/admin/blogs" },
        { label: "Configured SEO Pages", value: stats.totalSeo, link: "/admin/seo" },
    ];

    return (
        <div className="max-w-6xl space-y-10">
            {/* Header */}
            <div>
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-deep mb-2 font-semibold">
                    {today}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl italic text-ink">Welcome back to KNK Awadh</h1>
                <p className="mt-2 font-sans text-xs sm:text-[13px] text-muted">
                    Your luxury salon management console: bookings, bridal leads, editorial journal, and search engine optimization.
                </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.link}
                        className="relative bg-white px-6 py-6 rounded-xl border border-border shadow-xs hover:border-gold hover:shadow-sm transition-all group block"
                    >
                        <span aria-hidden="true" className="absolute left-0 top-0 h-4 w-4 border-l border-t border-gold" />
                        <span aria-hidden="true" className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold" />
                        <p className="font-display text-4xl italic text-ink group-hover:text-gold-deep transition-colors">
                            {stat.value}
                        </p>
                        <p className="mt-2 font-sans text-[11px] tracking-[0.1em] uppercase text-muted font-medium">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick links */}
            <div>
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-muted mb-4 font-semibold">
                    Quick Management Actions
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group flex flex-col justify-between border-t-2 border-gold bg-white p-6 rounded-xl shadow-xs hover:shadow-luxe transition-all duration-300 border border-border/80"
                        >
                            <div>
                                <h3 className="font-display text-2xl italic text-ink group-hover:text-gold-deep transition-colors">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 font-sans text-xs leading-relaxed text-muted">
                                    {item.desc}
                                </p>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase text-gold-deep font-semibold group-hover:translate-x-1 transition-transform">
                                {item.actionText}
                                <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}