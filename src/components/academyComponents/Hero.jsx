"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/* ---------- Shared style tokens ---------- */

const INK = "#29231f";
const MUTED = "#71665c";
const GOLD = "#b58a52";
const GOLD_DEEP = "#a17b5a";
const LINE = "#d0bda4";
const CREAM_DEEP = "#f4eee1";
const DARK = "#241d18";

/* ---------- Data (real content/images from knksalon.in academy pages) ---------- */

const whyAcademyImage = "/assets/images/academy/about1.webp";
const reelVideo = "/assets/videos/reel-content.webm";

const whyAcademyPoints = [
    "Globally trained experts with experience across the US, UK, Russia and more",
    "A curriculum that goes beyond makeup application — built on the belief that great skincare is the foundation of glowing beauty",
    "Backstage access to work with leading brands, celebrities, models and photographers",
    "A one-month internship with the academy's expert team, working alongside professional makeup artists",
    "Salon management training to build your business acumen and start-up skills",
    "IAF-certified training, recognised globally across the beauty industry",
];

const stats = [
    { value: "15+", label: "Years of Legacy" },
    { value: "1000+", label: "Students Trained" },
    { value: "12", label: "Specialised Courses" },
    { value: "IAF", label: "Certified Academy" },
];

const mentors = [
    {
        name: "Poonam Ranjan Chowdhary",
        role: "Founder & Lead Mentor",
        bio: "An internationally certified bridal makeup expert and cosmetologist, Poonam has spent years shaping Lucknow's makeup and hairstyling trends and personally mentors every batch at KNK Academy.",
    },
    {
        name: "Ishitta Chowdhary",
        role: "Co-Founder & Creative Director",
        bio: "A bridal MUA and backstage artist with international fashion-week experience, Ishitta leads the academy's creative and fashion makeup modules, bringing runway-level technique into the classroom.",
    },
];

const enrollSteps = [
    {
        title: "Book a Consultation",
        text: "Call, WhatsApp or fill the form below and our academy counsellor will help you shortlist the right course.",
    },
    {
        title: "Visit & Choose Your Course",
        text: "Tour the studio, meet the mentors and lock in your course, batch timing and kit.",
    },
    {
        title: "Start Learning",
        text: "Attend hands-on classes covering theory, live demos and guided practice from day one.",
    },
    {
        title: "Get Certified & Placed",
        text: "Finish with a portfolio shoot, IAF certification and support finding your first opportunities.",
    },
];

const curriculum = [
    {
        title: "Essential Basics",
        items: [
            "Skin care and hygiene",
            "Brush types and uses",
            "Tools and accessories",
            "Product knowledge and setting up",
            "Prepping your artist / client / model",
            "Basic facial anatomy",
            "Intro to creative journal keeping",
            "Intro to the world of beauty",
        ],
    },
    {
        title: "Getting Technical",
        items: [
            "Corrective makeup",
            "Natural / neutral makeup",
            "False lash application",
            "Photography and film makeup",
            "Tanning effects",
            "Male grooming",
            "Product mixing techniques",
            "Eyebrow proportions",
        ],
    },
    {
        title: "Art Into Makeup",
        items: [
            "Working with face charts",
            "Glamour / beauty makeup",
            "Catwalk / theatre makeup",
            "Fashion / editorial makeup",
            "Period makeup",
            "Bridal makeup design — traditional to contemporary",
        ],
    },
];

const courses = [
    {
        title: "Pro Makeup Course",
        duration: "1 Month",
        points: ["Product knowledge & colour wheel", "3 party & 3 trending bridal looks", "Men/groom makeup", "Airbrush makeup"],
    },
    {
        title: "Pro Makeup Course",
        duration: "3 Months",
        points: ["Free makeup kit", "Basic to advanced makeup & hairstyling", "Ramp/model & high-end fashion makeup", "Professional draping"],
    },
    {
        title: "Professional Makeup Artist Course",
        duration: "3 Months",
        points: ["History & colour theory of makeup", "Basic to advanced hairdos", "Airbrush theory & practical", "Portfolio building"],
        featured: true,
    },
    {
        title: "Pro Course — Industry Based",
        duration: "4 Months",
        points: ["Basic to advance bridal makeup", "Fashion & creative makeup", "Hair styling & professional draping", "Runway & portfolio shoots"],
    },
    {
        title: "Fast Track Makeup Course",
        duration: "1 Month",
        points: ["Day, party & engagement looks", "Traditional & contemporary bridal makeup", "Portfolio shoot", "Certification"],
    },
    {
        title: "Airbrush Makeup Course",
        duration: "1 Week",
        points: ["Airbrush vs normal makeup", "Machine operation & base application", "Blusher & contour with airbrush", "Gun cleaning & maintenance"],
    },
    {
        title: "Self Grooming Course",
        duration: "15 Days",
        points: ["Skin primers & skincare theory", "Foundation, concealer & contouring", "Eyeliner & mascara application", "Day & smokey eye looks"],
    },
    {
        title: "Hair Technician Course",
        duration: "3 Months",
        points: ["Blow dry, ironing & crimping", "Braids, ponys & buns", "Advance bridal hairdo", "Hair extensions & accessories"],
    },
    {
        title: "Nail Extension Course",
        duration: "15 Days",
        points: ["Gel & acrylic extensions", "French nails & refills", "10 types of nail art", "Drill machine use"],
    },
    {
        title: "Professional Draping",
        duration: "10 Days",
        points: ["Casual & bridal saree draping", "Lehenga & Sabhyasachi draping", "Bengali & Marathi draping", "Indo-western draping"],
    },
    {
        title: "Professional Henna Art",
        duration: "15 Days",
        points: ["Mehendi paste & cone making", "Indian, Gulf & Arabic designs", "Jewellery mehendi designs", "Bridal & leg mehendi designs"],
    },
    {
        title: "Diploma in Skin Cosmetology",
        duration: "6 Months",
        points: ["Skin texture & function", "Manicure, pedicure & waxing", "Complete makeup course", "Nail extension course"],
    },
];

const galleryImages = [
    "/assets/images/academy/gallery-1.webp",
    "/assets/images/academy/gallery-2.webp",
    "/assets/images/academy/gallery-3.webp",
    "/assets/images/academy/gallery-4.webp",
    "/assets/images/academy/gallery-5.webp",
    "/assets/images/academy/gallery-6.webp",
];

const wallOfFameImages = [
    "/assets/images/academy/wall-of-fame-1.webp",
    "/assets/images/academy/wall-of-fame-2.webp",
    "/assets/images/academy/wall-of-fame-3.webp",
    "/assets/images/academy/wall-of-fame-4.webp",
    "/assets/images/academy/wall-of-fame-5.webp",
    "/assets/images/academy/wall-of-fame-6.webp",
];

// Sample placeholders — swap in real graduate reviews when available.
const testimonials = [
    { name: "Academy Graduate", course: "Pro Makeup Course, 3 Months", text: "The hands-on classes and one-on-one attention gave me the confidence to start taking bridal clients right after certification." },
    { name: "Academy Graduate", course: "Airbrush Makeup Course", text: "Learning directly from Poonam and Ishitta ma'am on airbrush technique made all the difference — I now use it for every bridal booking." },
    { name: "Academy Graduate", course: "Professional Draping Course", text: "The draping module alone was worth the course — I get booked for saree draping at weddings every season now." },
];

const faqs = [
    {
        q: "Do I need prior makeup experience to enroll?",
        a: "No. Our Essential Basics module is designed for complete beginners, so most courses start from the ground up before moving into technical and advanced work.",
    },
    {
        q: "Is a makeup kit included in the course fee?",
        a: "Select courses like the Pro Makeup Course (3 Months) include a complimentary makeup kit. Ask your counsellor which courses include kits when you enquire.",
    },
    {
        q: "Will I get a certificate after completing the course?",
        a: "Yes, graduates receive an IAF-recognised certification, along with a portfolio shoot to showcase your work.",
    },
    {
        q: "Do you help with placements or internships?",
        a: "Students can take up a one-month internship with our expert team, and we support portfolio building and industry connections after graduation.",
    },
];

const courseOptions = [
    "Makeup Course",
    "Self Grooming Course",
    "Diploma",
    "Fashion & Photography Course",
    "Airbrush Makeup Course",
    "Hair Technician Course",
    "Nail Extension Course",
    "Self Drapping Course",
    "Professional Drapping Course",
    "Professional Henna Art",
    "Beautician Course",
];

/* ---------- Reusable heading pieces (matches hero heading style) ---------- */

function Eyebrow({ children, light = false }) {
    return (
        <p
            className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em]"
            style={{ color: light ? "#e3c9a3" : GOLD_DEEP }}
        >
            {children}
        </p>
    );
}

function GoldDivider({ center = false }) {
    return (
        <div className={`mt-8 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
            <span className="h-[2px] w-16" style={{ backgroundColor: GOLD }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            <span className="h-px w-10" style={{ backgroundColor: LINE }} />
        </div>
    );
}

function SectionHeading({ eyebrow, line1, line2, center = false, size = "lg" }) {
    const sizeClasses =
        size === "lg"
            ? "text-[64px] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px] leading-[0.8]"
            : "text-[40px] sm:text-[52px] md:text-[58px] leading-[0.9]";
    return (
        <div className={center ? "text-center" : ""}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
                className={`mt-6 font-['Cormorant_Garamond'] font-medium tracking-[-0.05em] ${sizeClasses}`}
                style={{ color: INK }}
            >
                {line1}
                {line2 && (
                    <>
                        <br />
                        <span className="italic" style={{ color: GOLD }}>{line2}</span>
                    </>
                )}
            </h2>
        </div>
    );
}

/* ---------- Booking form ---------- */

function BookingForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [formStartedAt] = useState(Date.now());
    const [form, setForm] = useState({ name: "", email: "", mobile: "", city: "", course: "", message: "", hp_company_url: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (name === "name") {
            sanitizedValue = value.replace(/[^a-zA-Z\s]/g, "");
        } else if (name === "mobile") {
            sanitizedValue = value.replace(/\D/g, "").slice(0, 13);
        }
        setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");
        if (!form.name || !form.mobile || !form.course) return;

        const cleanName = form.name.replace(/[^a-zA-Z\s]/g, "").trim();
        if (!cleanName || cleanName.length < 2) {
            setErrorMsg("Please enter your name (alphabets only, no numbers or special characters).");
            return;
        }

        const cleanPhone = form.mobile.replace(/\D/g, "");
        if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 13) {
            setErrorMsg("Please enter a valid contact number (10 to 13 digits, numbers only).");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_type: "academy",
                    name: form.name.trim(),
                    phone: cleanPhone,
                    email: form.email.trim() || null,
                    city: form.city.trim() || null,
                    course: form.course,
                    service: form.course,
                    location: form.city.trim() ? `Academy (${form.city.trim()})` : "KNK Academy Lucknow",
                    message: form.message.trim() || null,
                    hp_company_url: form.hp_company_url || null,
                    form_started_at: formStartedAt,
                }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                const queryParams = new URLSearchParams({
                    bookingId: data.bookingId ? String(data.bookingId) : "",
                    service: form.course || "Academy Course",
                    name: form.name.trim(),
                    date: new Date().toISOString().split("T")[0],
                    location: form.city.trim() ? `Academy (${form.city.trim()})` : "KNK Academy Lucknow",
                });
                router.push(`/thank-you?${queryParams.toString()}`);
            } else {
                setErrorMsg(data.error || "Failed to submit request. Please try again.");
            }
        } catch {
            setErrorMsg("Network error. Please try again or reach out via WhatsApp.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-[#fffdf9] border rounded-2xl p-8 md:p-10 grid sm:grid-cols-2 gap-5" style={{ borderColor: LINE }}>
            {/* Honeypot */}
            <input
                type="text"
                name="hp_company_url"
                value={form.hp_company_url}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            {errorMsg && (
                <div className="sm:col-span-2">
                    <p className="font-['Inter'] text-xs text-rose-600 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-lg">
                        {errorMsg}
                    </p>
                </div>
            )}

            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Your Name *</label>
                <input
                    name="name" value={form.name} onChange={handleChange} required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Your full name"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Contact Number *</label>
                <input
                    name="mobile"
                    type="tel"
                    maxLength={13}
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="10-13 digit number"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Email</label>
                <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="you@email.com"
                />
            </div>
            <div className="sm:col-span-1">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>City</label>
                <input
                    name="city" value={form.city} onChange={handleChange}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Lucknow"
                />
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Select Course *</label>
                <select
                    name="course" value={form.course} onChange={handleChange} required
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors"
                    style={{ borderColor: LINE, color: INK }}
                >
                    <option value="">Select a course</option>
                    {courseOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <div className="sm:col-span-2">
                <label className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase mb-2 block" style={{ color: MUTED }}>Your Message</label>
                <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full bg-[#fbf7f0] border rounded-lg px-4 py-3 font-['Inter'] text-sm outline-none transition-colors resize-none"
                    style={{ borderColor: LINE, color: INK }}
                    placeholder="Tell us which course you're interested in"
                />
            </div>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105 disabled:opacity-60"
                    style={{ backgroundColor: GOLD }}
                >
                    {loading ? "Submitting..." : "Book An Appointment"}
                </button>
            </div>
        </form>
    );
}

/* ---------- FAQ accordion ---------- */

function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: LINE }}>
            {faqs.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div key={item.q} className="py-5" style={{ borderColor: LINE }}>
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : i)}
                            className="w-full flex items-center justify-between gap-4 text-left"
                        >
                            <span className="font-['Cormorant_Garamond'] text-xl font-medium" style={{ color: INK }}>
                                {item.q}
                            </span>
                            <span
                                className="shrink-0 h-7 w-7 rounded-full border flex items-center justify-center font-['Inter'] text-sm transition-transform duration-300"
                                style={{ borderColor: GOLD, color: GOLD_DEEP, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                            >
                                +
                            </span>
                        </button>
                        {isOpen && (
                            <p className="mt-4 font-['Inter'] text-[13px] leading-[1.9] max-w-2xl" style={{ color: MUTED }}>
                                {item.a}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/* ---------- Page ---------- */

export default function Academy() {
    return (
        <div className="bg-[#fbf7f0]">

            {/* ---------- Hero ---------- */}
            <section className="relative overflow-hidden px-6 pt-20 pb-20 md:pt-28 md:pb-24">
                

                <svg aria-hidden="true" className="absolute inset-0 w-full h-full opacity-[0.05]" style={{ color: INK }} preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="academyJaali" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30 4 L56 26 L30 48 L4 26 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#academyJaali)" />
                </svg>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="relative z-10 max-w-[600px]">
                        <Eyebrow>Academy</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            Your passion.
                            <br />
                            <span className="italic text-[#b58a52]">Your career.</span>
                        </h2>
                        <GoldDivider />
                        <p className="mt-7 max-w-[500px] font-['Inter'] text-[13px] leading-[1.9] text-[#71665c] sm:text-[14px]">
                            Start a career as a makeup artist at the best makeup academy in
                            Lucknow. Learn from a globally trained team, build a portfolio
                            with real shoots, and walk away with an IAF-certified
                            qualification recognised across the beauty industry.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#book" data-booking-trigger="true" data-service="Academy Admission Consultation"
                                className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105"
                                style={{ backgroundColor: GOLD }}
                            >
                                Enroll Now
                            </a>
                            <a
                                href="#courses"
                                className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border transition-colors"
                                style={{ borderColor: GOLD, color: GOLD_DEEP }}
                            >
                                View Courses
                            </a>
                        </div>
                    </div>

                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(181,138,82,0.35)] border" style={{ borderColor: LINE }}>
                        <img src={whyAcademyImage} alt="KNK Makeup Academy students at work" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* ---------- Stats bar ---------- */}
            <section className="px-6" style={{ backgroundColor: DARK }}>
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="font-['Cormorant_Garamond'] text-[40px] sm:text-[48px] font-medium leading-none" style={{ color: GOLD }}>
                                {s.value}
                            </p>
                            <p className="mt-3 font-['Inter'] text-[10px] tracking-[0.2em] uppercase" style={{ color: "#d0c7bb" }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- Why KNK Academy ---------- */}
            <section className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div>
                        <SectionHeading eyebrow="Why Choose Us" line1="Why KNK" line2="Academy." />
                        <ul className="mt-7 space-y-3">
                            {whyAcademyPoints.map((point) => (
                                <li key={point} className="flex items-start gap-3 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border" style={{ borderColor: LINE }}>
                        <img src={whyAcademyImage} alt="KNK Academy classroom" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* ---------- Video showcase ---------- */}
            <section className="px-6 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[560px] mb-10">
                        <Eyebrow>Inside the Academy</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                            See the studio <span className="italic" style={{ color: GOLD }}>in motion.</span>
                        </h2>
                    </div>
                    <div className="rounded-2xl overflow-hidden border shadow-[0_24px_60px_-24px_rgba(181,138,82,0.35)]" style={{ borderColor: LINE }}>
                        <video
                            src={reelVideo}
                            controls
                            playsInline
                            preload="metadata"
                            poster={whyAcademyImage}
                            className="w-full h-auto max-h-[520px] object-cover bg-black"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            {/* ---------- Curriculum ---------- */}
            <section className="px-6 py-20 md:py-24">
                <div className="max-w-3xl mx-auto mb-14">
                    <SectionHeading eyebrow="What You'll Learn" line1="Our" line2="curriculum." center />
                    <div className="flex justify-center"><GoldDivider center /></div>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    {curriculum.map((block) => (
                        <div
                            key={block.title}
                            className="bg-[#fffdf9] border rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(181,138,82,0.4)]"
                            style={{ borderColor: LINE }}
                        >
                            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium mb-4" style={{ color: INK }}>
                                {block.title}
                            </h3>
                            <ul className="space-y-2">
                                {block.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- Meet Your Mentors ---------- */}
            <section className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-3xl mx-auto mb-14 text-center">
                    <Eyebrow>Learn From The Best</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Meet your <span className="italic" style={{ color: GOLD }}>mentors.</span>
                    </h2>
                    <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px] max-w-xl mx-auto" style={{ color: MUTED }}>
                        A mother-daughter duo leading a family-owned name across two
                        generations of makeup and hairstyling artistry in Lucknow.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
                    {mentors.map((m) => (
                        <div key={m.name} className="bg-[#fffdf9] border rounded-2xl p-8" style={{ borderColor: LINE }}>
                            <div
                                className="h-14 w-14 rounded-full flex items-center justify-center font-['Cormorant_Garamond'] text-2xl italic mb-5"
                                style={{ backgroundColor: "#f4eee1", color: GOLD_DEEP, border: `1px solid ${LINE}` }}
                            >
                                {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </div>
                            <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium" style={{ color: INK }}>
                                {m.name}
                            </h3>
                            <p className="mt-1 font-['Inter'] text-[10px] tracking-[0.2em] uppercase" style={{ color: GOLD_DEEP }}>
                                {m.role}
                            </p>
                            <p className="mt-4 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                                {m.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- How to Enroll ---------- */}
            <section className="px-6 py-20 md:py-24">
                <div className="max-w-3xl mx-auto mb-14">
                    <SectionHeading eyebrow="Getting Started" line1="How to" line2="enroll." center />
                    <div className="flex justify-center"><GoldDivider center /></div>
                </div>
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {enrollSteps.map((step, i) => (
                        <div key={step.title} className="relative bg-[#fffdf9] border rounded-2xl p-7" style={{ borderColor: LINE }}>
                            <span className="font-['Cormorant_Garamond'] text-5xl italic" style={{ color: "#e8dcc8" }}>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-3 font-['Cormorant_Garamond'] text-xl font-medium" style={{ color: INK }}>
                                {step.title}
                            </h3>
                            <p className="mt-3 font-['Inter'] text-[12px] leading-relaxed" style={{ color: MUTED }}>
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- Courses ---------- */}
            <section id="courses" className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <SectionHeading eyebrow="Enroll Today" line1="Our" line2="courses." center />
                    <div className="flex justify-center"><GoldDivider center /></div>
                    <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] sm:text-[14px]" style={{ color: MUTED }}>
                        From a one-week Airbrush course to a full 6-month diploma, pick the
                        program that matches where you want your career to go.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((c) => (
                        <div
                            key={c.title + c.duration}
                            className="relative rounded-2xl p-7 flex flex-col border transition-transform duration-300 hover:-translate-y-1"
                            style={{
                                borderColor: c.featured ? GOLD : LINE,
                                backgroundColor: c.featured ? "#241d18" : "#fffdf9",
                                boxShadow: c.featured ? "0 20px 40px -20px rgba(181,138,82,0.5)" : "none",
                            }}
                        >
                            {c.featured && (
                                <span
                                    className="absolute -top-3 left-7 font-['Inter'] text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                                    style={{ backgroundColor: GOLD, color: "#241d18" }}
                                >
                                    Most Popular
                                </span>
                            )}
                            <p
                                className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.25em]"
                                style={{ color: c.featured ? "#e3c9a3" : GOLD_DEEP }}
                            >
                                {c.duration}
                            </p>
                            <h3
                                className="mt-2 font-['Cormorant_Garamond'] text-2xl font-medium mb-4"
                                style={{ color: c.featured ? "#fbf7f0" : INK }}
                            >
                                {c.title}
                            </h3>
                            <ul className="space-y-2 mb-6 flex-1">
                                {c.points.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start gap-2 font-['Inter'] text-[12px] leading-relaxed"
                                        style={{ color: c.featured ? "#d0c7bb" : MUTED }}
                                    >
                                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: GOLD }} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#book"
                                className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-6 py-3 rounded-full transition-colors self-start"
                                style={
                                    c.featured
                                        ? { backgroundColor: GOLD, color: "#241d18" }
                                        : { border: `1px solid ${GOLD}`, color: GOLD_DEEP }
                                }
                            >
                                Book Now
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- Certification / Placement highlight ---------- */}
            <section className="px-6 py-20 md:py-24">
                <div className="max-w-6xl mx-auto rounded-2xl border overflow-hidden grid md:grid-cols-2" style={{ borderColor: LINE }}>
                    <div className="p-10 md:p-14">
                        <Eyebrow>Recognised Everywhere</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[36px] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[44px]" style={{ color: INK }}>
                            IAF-certified, <span className="italic" style={{ color: GOLD }}>industry ready.</span>
                        </h2>
                        <p className="mt-6 font-['Inter'] text-[13px] leading-[1.9]" style={{ color: MUTED }}>
                            Every graduate leaves with a certification recognised globally
                            in the beauty industry, a professional portfolio shoot, and a
                            month of hands-on internship experience working alongside our
                            expert artists — so you're ready to take on real clients from
                            day one.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#book"
                                className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#fbf7f0] transition-transform duration-300 hover:scale-105"
                                style={{ backgroundColor: GOLD }}
                            >
                                Get Certified
                            </a>
                        </div>
                    </div>
                    <div className="relative min-h-[260px]">
                        <img src={galleryImages[0]} alt="KNK Academy certification and portfolio work" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* ---------- International Achievement gallery ---------- */}
            <section className="px-6 py-16 md:py-20" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[560px] mb-12">
                        <Eyebrow>Recognition</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                            International <span className="italic" style={{ color: GOLD }}>achievement.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((src, i) => (
                            <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border transition-transform duration-300 hover:scale-[1.02]" style={{ borderColor: LINE }}>
                                <img src={src} alt={`Academy achievement ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Wall of Fame ---------- */}
            <section className="px-6 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-[560px] mb-12">
                        <Eyebrow>Our Students</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                            Wall of <span className="italic" style={{ color: GOLD }}>fame.</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {wallOfFameImages.map((src, i) => (
                            <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border transition-transform duration-300 hover:scale-[1.02]" style={{ borderColor: LINE }}>
                                <img src={src} alt={`Wall of fame ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Testimonials ---------- */}
            <section className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-[560px] mx-auto text-center mb-14">
                    <Eyebrow>Student Voices</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Loved by our <span className="italic" style={{ color: GOLD }}>graduates.</span>
                    </h2>
                </div>
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-[#fffdf9] border rounded-2xl p-7" style={{ borderColor: LINE }}>
                            <p className="font-['Cormorant_Garamond'] italic text-lg leading-snug mb-5" style={{ color: INK }}>
                                "{t.text}"
                            </p>
                            <p className="font-['Inter'] text-[11px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>
                                {t.name} · {t.course}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ---------- FAQ ---------- */}
            <section className="px-6 py-20 md:py-24">
                <div className="max-w-3xl mx-auto text-center mb-14">
                    <Eyebrow>Questions</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] sm:text-[52px] md:text-[58px]" style={{ color: INK }}>
                        Frequently <span className="italic" style={{ color: GOLD }}>asked.</span>
                    </h2>
                </div>
                <FaqAccordion />
            </section>

            {/* ---------- Book Appointment ---------- */}
            <section id="book" className="px-6 py-20 md:py-24" style={{ backgroundColor: CREAM_DEEP }}>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <Eyebrow>Reserve Your Seat</Eyebrow>
                        <h2 className="mt-6 font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.8] tracking-[-0.05em] text-[#29231f] sm:text-[78px] md:text-[92px] lg:text-[88px] xl:text-[105px]">
                            Book an
                            <br />
                            <span className="italic text-[#b58a52]">appointment.</span>
                        </h2>
                    </div>
                    <BookingForm />
                </div>
            </section>

            {/* ---------- Closing CTA ---------- */}
            <section className="px-6 py-20 md:py-24 text-center" style={{ backgroundColor: DARK }}>
                <div className="max-w-[560px] mx-auto">
                    <Eyebrow light>Start Today</Eyebrow>
                    <h2 className="mt-6 font-['Cormorant_Garamond'] text-[40px] font-medium leading-[0.9] tracking-[-0.05em] text-[#fbf7f0] sm:text-[52px] md:text-[58px]">
                        Shape your <span className="italic" style={{ color: GOLD }}>makeup career.</span>
                    </h2>
                    <p className="mt-7 font-['Inter'] text-[13px] leading-[1.9] text-[#d0c7bb] sm:text-[14px]">
                        Call our academy team or send a message and we'll help you pick
                        the right course to start your journey.
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <a
                            href="tel:+916390008020"
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full text-[#241d18] transition-transform duration-300 hover:scale-105"
                            style={{ backgroundColor: GOLD }}
                        >
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/918881000552?text=Hi%20there,%20I'm%20interested%20in%20enrolling%20at%20KNK%20Makeup%20Academy."
                            className="inline-flex items-center justify-center font-['Inter'] text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-[#4a4038] text-[#fbf7f0] transition-colors hover:bg-white/5"
                        >
                            Chat Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}