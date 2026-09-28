import React from 'react';

function Academy() {
    return (
        <>
            <section
                id="hair-artistry"
                className="relative overflow-hidden bg-[#eadcc9]"
            >
                <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-2">
                    {/* =====================================================
                            LEFT CONTENT
                        ====================================================== */}
                    <div className="relative flex items-center px-7 py-20 sm:px-12 md:px-16 lg:px-[10%] lg:py-24 xl:px-[12%]">
                        {/* Decorative background text */}
                        <span className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 select-none font-['Cormorant_Garamond'] text-[180px] leading-none text-[#dfcfba]/60 xl:block">
                            ACADEMY
                        </span>
                        <div className="relative z-10 max-w-[540px]">
                            {/* Section Number */}
                            {/* <div className="mb-9 flex items-center gap-4">
                                <span className="h-px w-7 bg-[#a47d52]" />
                                <span className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.35em] text-[#8b694d]">
                                    08 / KNK Academy
                                </span>
                            </div> */}
                            {/* Heading */}
                            <h2 className="font-['Cormorant_Garamond'] text-[62px] font-medium leading-[0.9] tracking-[-0.045em] text-[#29231f] sm:text-[76px] md:text-[88px] lg:text-[78px] xl:text-[92px]">
                                Makeup & Beauty Academy in
                                <br />
                                <span className="italic text-[#c59b55]">Lucknow</span>
                            </h2>

                            <p className="mt-6 max-w-xl font-['Cormorant_Garamond'] text-2xl leading-tight text-[#29231f] sm:text-3xl md:text-4xl">
                                Shaping Global Beauty Professionals
                            </p>
                            {/* Description */}
                            <p className="mt-8 max-w-[470px] font-['Inter'] text-[13px] leading-[1.8] text-[#766b61] sm:text-[14px]">
                                Choose from professional makeup, bridal makeup, hair styling, beauty, nail and cosmetology courses with practical training and expert guidance
                            </p>
                            {/* =================================================
                                COURSE TAGS
                            ================================================== */}
                            <div className="mt-8 flex flex-wrap gap-2.5">
                                <a
                                    href="#hair-course"
                                    className="group border border-[#c9b69f] px-4 py-2.5 font-['Inter'] text-[9px] font-medium tracking-[0.04em] text-[#594d43] transition-all duration-300 hover:border-[#29231f] hover:bg-[#29231f] hover:text-[#fffaf3]"
                                >
                                    Hair Course
                                </a>
                                <a
                                    href="#makeup-course"
                                    className="group border border-[#c9b69f] px-4 py-2.5 font-['Inter'] text-[9px] font-medium tracking-[0.04em] text-[#594d43] transition-all duration-300 hover:border-[#29231f] hover:bg-[#29231f] hover:text-[#fffaf3]"
                                >
                                    Makeup Course
                                </a>
                                <a
                                    href="#beauty-course"
                                    className="group border border-[#c9b69f] px-4 py-2.5 font-['Inter'] text-[9px] font-medium tracking-[0.04em] text-[#594d43] transition-all duration-300 hover:border-[#29231f] hover:bg-[#29231f] hover:text-[#fffaf3]"
                                >
                                    Beauty Course
                                </a>
                                <a
                                    href="#nail-course"
                                    className="group border border-[#c9b69f] px-4 py-2.5 font-['Inter'] text-[9px] font-medium tracking-[0.04em] text-[#594d43] transition-all duration-300 hover:border-[#29231f] hover:bg-[#29231f] hover:text-[#fffaf3]"
                                >
                                    Nail Course
                                </a>
                                <a
                                    href="#professional-training"
                                    className="group border border-[#c9b69f] px-4 py-2.5 font-['Inter'] text-[9px] font-medium tracking-[0.04em] text-[#594d43] transition-all duration-300 hover:border-[#29231f] hover:bg-[#29231f] hover:text-[#fffaf3]"
                                >
                                    Professional Training
                                </a>
                            </div>
                            {/* =================================================
                                COURSE HIGHLIGHTS
                            ================================================== */}
                            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[#d8cbbd] pt-6 sm:grid-cols-3">
                                <div>
                                    <p className="font-['Cormorant_Garamond'] text-[25px] leading-none text-[#a47d52]">
                                        100%
                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.14em] text-[#81766c]">
                                        Practical Training
                                    </p>
                                </div>
                                <div>
                                    <p className="font-['Cormorant_Garamond'] text-[25px] leading-none text-[#a47d52]">
                                        1:1
                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.14em] text-[#81766c]">
                                        Expert Guidance
                                    </p>
                                </div>
                                <div>
                                    <p className="font-['Cormorant_Garamond'] text-[25px] leading-none text-[#a47d52]">
                                        Career

                                    </p>
                                    <p className="mt-1 font-['Inter'] text-[8px] uppercase tracking-[0.14em] text-[#81766c]">
                                        Focused Training
                                    </p>
                                </div>
                            </div>
                            {/* =================================================
                                    CTA
                                ================================================== */}
                            <div className="mt-10 flex flex-wrap items-center gap-7">
                                <a
                                    href="#academy-courses"
                                    className="group inline-flex items-center gap-4 border-b border-[#a98251] pb-3 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.22em] text-[#59483b]"
                                >
                                    <span>Explore Academy Courses</span>
                                    <span className="text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-2">
                                        →
                                    </span>
                                </a>
                                <a
                                    href="#enquiry"
                                    className="font-['Inter'] text-[9px] font-medium uppercase tracking-[0.2em] text-[#9a8878] transition-colors duration-300 hover:text-[#a47d52]"
                                >
                                    Enquire Now
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* =====================================================
                        RIGHT IMAGE
                    ====================================================== */}
                    <div className="group relative min-h-[550px] overflow-hidden lg:min-h-[720px]">
                        {/* Image */}
                        <img
                            src="/assets/images/new/academyimg.webp"
                            alt="Luxury hair artistry"
                            width={600}
                            height={720}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                        />
                        {/* Soft overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#9e7785]/10 via-transparent to-[#29231f]/10" />
                        {/* Image grain / glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.15),transparent_35%)]" />
                        {/* Vertical label */}
                        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 lg:block">
                            <span className="font-['Inter'] text-[8px] font-medium uppercase tracking-[0.4em] text-white/80">
                                Signature Hair Collection
                            </span>
                        </div>
                        {/* Bottom image detail */}
                        <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-9 sm:left-10 sm:right-10">
                            <div>
                                <p className="font-['Inter'] text-[8px] uppercase tracking-[0.3em] text-white/70">
                                    KNK Hair Studio
                                </p>
                                <p className="mt-2 font-['Cormorant_Garamond'] text-[25px] italic text-white">
                                    Made to be remembered.
                                </p>
                            </div>
                            {/* Image Arrow */}
                            <a
                                href="#services"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#c59b55] hover:border-[#c59b55]"
                            >
                                <span className="text-[20px]">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* =====================================================
                    FLOATING SERVICE NAV
                    ====================================================== */}
                <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-5 rounded-full border border-[#c9b69f]/60 bg-[#f8f0e4]/80 px-5 py-2.5 backdrop-blur-md lg:flex">
                    <span className="font-['Inter'] text-[8px] uppercase tracking-[0.25em] text-[#8c7762]">
                        Hair
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#c49a55]" />
                    <a
                        href="#makeup"
                        className="font-['Inter'] text-[8px] uppercase tracking-[0.25em] text-[#8c7762] transition hover:text-[#29231f]"
                    >
                        Makeup
                    </a>
                    <span className="h-1 w-1 rounded-full bg-[#c49a55]" />
                    <a
                        href="#beauty"
                        className="font-['Inter'] text-[8px] uppercase tracking-[0.25em] text-[#8c7762] transition hover:text-[#29231f]"
                    >
                        Beauty
                    </a>
                </div>
            </section>
        </>

    );
}
export default Academy;