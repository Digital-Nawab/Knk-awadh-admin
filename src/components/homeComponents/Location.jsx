import React from 'react';

function Location() {
    return (
        <>
            <section className="bg-[#f7f3eb] px-6 py-20 sm:px-8 lg:px-16 xl:px-20">
                <div className="mx-auto max-w-[1230px]">
                    {/* ================= HEADER ================= */}
                    <div className="mb-16">
                        {/* Small Label */}
                        {/* <div className="mb-7 flex items-center gap-4">
                            <span className="h-px w-7 bg-[#aa8060]" />
                            <span className="font-['Inter'] text-[10px] font-medium uppercase tracking-[0.35em] text-[#987257]">
                                N° 13 — LOCATIONS
                            </span>
                        </div> */}
                        {/* Main Heading */}
                        <h2 className="font-['Cormorant_Garamond'] text-[64px] font-medium leading-[0.82] tracking-[-0.035em] text-[#29231f] sm:text-[76px] md:text-[86px] lg:text-[92px]">
                            Find
                            <br />
                            <span className="italic text-[#a27d5e]">Your KNK.</span>
                        </h2>
                    </div>
                    {/* ================= LOCATION LIST ================= */}
                    <div className="border-t border-[#d8d1c7]">
                        {/* ================= LOCATION 01 ================= */}
                        <div className="grid min-h-[198px] grid-cols-1 items-center gap-8 border-b border-[#d8d1c7] py-10 md:grid-cols-[1fr_auto] md:py-11">
                            {/* Location Information */}
                            <div>
                                <h3 className="mb-3 font-['Cormorant_Garamond'] text-[38px] font-semibold italic leading-none tracking-[-0.02em] text-[#29231f] sm:text-[42px]">
                                    KNK Salon Mahanagar
                                </h3>
                                <p className="max-w-[390px] font-['Inter'] text-[13px] leading-[1.65] text-[#98928b]">
                                    Mahanagar Crossing (Chowraha), Mahanagar Colony,
                                    <br className="hidden sm:block" />
                                    Lucknow
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <a
                                        href="tel:+919559321711"
                                        className="font-['Inter'] text-[10px] tracking-[0.04em] text-[#a47a59] transition hover:text-[#29231f]"
                                    >
                                        +91-9559321711
                                    </a>

                                </div>
                            </div>
                            {/* CTA */}
                            <div className="md:pr-0">
                                <a
                                    href="#"
                                    className="group inline-flex items-center gap-2 border-b border-[#5c5149] pb-2 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.23em] text-[#493e37] transition hover:text-[#a47a59]"
                                >
                                    Get Directions
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                            </div>
                        </div>
                        {/* ================= LOCATION 02 ================= */}
                        <div className="grid min-h-[178px] grid-cols-1 items-center gap-8 border-b border-[#d8d1c7] py-10 md:grid-cols-[1fr_auto] md:py-11">
                            <div>
                                <h3 className="mb-3 font-['Cormorant_Garamond'] text-[38px] font-semibold italic leading-none tracking-[-0.02em] text-[#29231f] sm:text-[42px]">
                                    KNK Salon Gomti Nagar
                                </h3>
                                <p className="font-['Inter'] text-[13px] leading-[1.65] text-[#98928b]">
                                    02/01 Vipul Khand, Gomti Nagar, Lucknow
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <a
                                        href="tel:+918881000551"
                                        className="font-['Inter'] text-[10px] tracking-[0.04em] text-[#a47a59] transition hover:text-[#29231f]"
                                    >
                                        +91-8881000551
                                    </a>

                                </div>
                            </div>
                            <div>
                                <a
                                    href="#"
                                    className="group inline-flex items-center gap-2 border-b border-[#5c5149] pb-2 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.23em] text-[#493e37] transition hover:text-[#a47a59]"
                                >
                                    Get Directions
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                            </div>
                        </div>
                        {/* ================= LOCATION 03 ================= */}
                        <div className="grid min-h-[178px] grid-cols-1 items-center gap-8 border-b border-[#d8d1c7] py-10 md:grid-cols-[1fr_auto] md:py-11">
                            <div>
                                <h3 className="mb-3 font-['Cormorant_Garamond'] text-[38px] font-semibold italic leading-none tracking-[-0.02em] text-[#29231f] sm:text-[42px]">
                                    KNK Awadh Salon & Academy – Hazratganj
                                </h3>
                                <p className="max-w-[500px] font-['Inter'] text-[13px] leading-[1.65] text-[#98928b]">
                                    Ground Floor 11B, Tilak Marg, Opp. Ganna Sansthaan,
                                    <br className="hidden sm:block" />
                                    Hazratganj Colony, Lucknow 226001
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-x-3">
                                    <a
                                        href="tel:+918881000529"
                                        className="font-['Inter'] text-[10px] tracking-[0.04em] text-[#a47a59] transition hover:text-[#29231f]"
                                    >
                                        +91-8881000529
                                    </a>

                                </div>
                            </div>
                            <div>
                                <a
                                    href="tel:+918881000529"
                                    className="group inline-flex items-center gap-2 border-b border-[#5c5149] pb-2 font-['Inter'] text-[9px] font-medium uppercase tracking-[0.23em] text-[#493e37] transition hover:text-[#a47a59]"
                                >
                                    Call Salon
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
export default Location;