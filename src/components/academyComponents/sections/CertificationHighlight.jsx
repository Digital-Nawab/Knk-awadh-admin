"use client";

import React from "react";
import { galleryImages, bridalArtImage } from "../shared/constants";
import { SectionHeading, GoldDivider } from "../shared/SharedUI";
import { Award, CheckCircle2, ShieldCheck, Globe, Camera, Briefcase, ArrowUpRight } from "lucide-react";

export default function CertificationHighlight() {
    return (
        <section className="px-5 sm:px-8 py-20 md:py-28 bg-[#f4eee1] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Text & Accreditation Pillars */}
                    <div className="lg:col-span-7">
                        <SectionHeading
                            eyebrow="Global Accreditation & Credentialing"
                            line1="IAF-certified,"
                            line2="globally recognized & industry ready."
                            description="Every graduate leaves with a qualification accredited by the International Accreditation Forum (IAF) — recognized across 80+ countries. Coupled with a directed portfolio shoot and hands-on internship, you graduate with immediate market authority."
                        />
                        <GoldDivider />

                        <div className="mt-8 grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xs">
                                <Globe className="size-4 text-[#b58a52] mb-1.5" />
                                <h4 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-semibold text-[#29231f]">
                                    Global Recognition
                                </h4>
                                <p className="font-['Inter'] text-[12px] leading-relaxed text-[#71665c] mt-0.5">
                                    Accredited certification valid across international salons, bridal studios, and cosmetic brands worldwide.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xs">
                                <Camera className="size-4 text-[#b58a52] mb-1.5" />
                                <h4 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-semibold text-[#29231f]">
                                    Editorial Portfolio Shoot
                                </h4>
                                <p className="font-['Inter'] text-[12px] leading-relaxed text-[#71665c] mt-0.5">
                                    Finish with professional studio shoots on live models to showcase high-definition bridal and creative looks.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xs">
                                <Briefcase className="size-4 text-[#b58a52] mb-1.5" />
                                <h4 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-semibold text-[#29231f]">
                                    1-Month Live Internship
                                </h4>
                                <p className="font-['Inter'] text-[12px] leading-relaxed text-[#71665c] mt-0.5">
                                    Work alongside KNK’s senior bridal artists and cosmetology experts on real clientele in our luxury salons.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#fffdf9] border border-[#d0bda4] shadow-xs">
                                <ShieldCheck className="size-4 text-[#b58a52] mb-1.5" />
                                <h4 className="font-['Cormorant_Garamond'] text-base sm:text-lg font-semibold text-[#29231f]">
                                    Placement & Brand Launch
                                </h4>
                                <p className="font-['Inter'] text-[12px] leading-relaxed text-[#71665c] mt-0.5">
                                    Post-graduation guidance on freelance bridal rate cards, social media positioning, and salon recruitment.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                            <a
                                href="#book"
                                className="inline-flex items-center justify-center gap-2 font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 sm:py-4 rounded-full text-white shadow-md transition-all duration-300 hover:scale-105 text-center"
                                style={{ backgroundColor: "#b58a52" }}
                            >
                                <span>Get Certified With KNK</span>
                                <ArrowUpRight className="size-3.5" />
                            </a>
                            <span className="font-['Inter'] text-[12px] text-[#71665c] text-center sm:text-left">
                                Admissions Helpline: <strong className="text-[#29231f]">+91 88810 00552</strong>
                            </span>
                        </div>
                    </div>

                    {/* Right: Asymmetric Editorial Certificate Frame */}
                    <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                        <div className="relative max-w-[400px] sm:max-w-[440px] mx-auto">
                            {/* Decorative background border */}
                            <div
                                className="absolute -inset-2 sm:-inset-4 rounded-3xl border border-[#b58a52]/40 pointer-events-none -rotate-1"
                                aria-hidden="true"
                            />

                            {/* Main Certificate Showcase Image */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#d0bda4] bg-white p-2.5 sm:p-3">
                                <div className="w-full h-full rounded-xl overflow-hidden border border-[#e8dfc8] bg-[#fbf7f0] flex items-center justify-center">
                                    <img
                                        src={galleryImages[0]}
                                        alt="KNK Academy IAF certification and student achievement"
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>
                            </div>

                            {/* Overlapping Gold Seal Badge (Top-Right) */}
                            <div className="absolute -top-4 right-0 sm:-right-6 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#29231f] text-white border border-[#b58a52] shadow-xl flex items-center gap-2">
                                <Award className="size-3.5 sm:size-4 text-[#ead9ae]" />
                                <span className="font-['Inter'] text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold text-[#ead9ae]">
                                    IAF Accredited Seal
                                </span>
                            </div>

                            {/* Overlapping Bottom Polaroid (Bottom-Left) */}
                            <div className="absolute -bottom-6 -left-6 w-44 rounded-xl bg-white p-2 border border-[#d0bda4] shadow-xl hidden sm:block">
                                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-1.5">
                                    <img
                                        src={bridalArtImage}
                                        alt="Student portfolio shoot sample"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-['Inter'] text-[8.5px] uppercase tracking-wider font-semibold text-[#a17b5a] text-center">
                                    Student Portfolio Output
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}