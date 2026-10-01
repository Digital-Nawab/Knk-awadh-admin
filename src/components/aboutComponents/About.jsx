"use client";

import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Intro from "./Intro";
import JaaliDivider from "./JaaliDivider";
import WhyChoose from "./WhyChoose";
import WhyBest from "./WhyBest";
import Services from "./Services";
import Marquee from "./Marquee";
import Experts from "./Experts";
import Academy from "./Academy";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import OfferStrip from "./OfferStrip";
import AboutOverview from "./AboutOverview";
import Locations from "./Locations";
import BookingSection from "./BookingSection";
import Faq from "./Faq";
import ClosingCTA from "./ClosingCTA";
import { DEFAULT_ABOUT_SECTIONS } from "@/data/aboutDefaults";

export default function About({ initialData = {} }) {
    const [data, setData] = useState({
        ...DEFAULT_ABOUT_SECTIONS,
        ...initialData,
    });

    useEffect(() => {
        let isMounted = true;
        fetch("/api/about")
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((json) => {
                if (isMounted && json.success && json.sections) {
                    setData((prev) => ({
                        ...prev,
                        ...json.sections,
                    }));
                }
            })
            .catch(() => {});

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="bg-cream text-ink font-sans">
            <Hero data={data.hero} />
            <JaaliDivider />
            <Intro data={data.intro} />
            <JaaliDivider />
            <WhyChoose data={data.why_choose} />
            <JaaliDivider />
            <WhyBest data={data.why_best} />
            <Services data={data.services} />
            <Marquee data={data.marquee} />
            <Experts data={data.experts} />
            <JaaliDivider />
            <Academy data={data.academy} />
            <Gallery data={data.gallery} />
            <JaaliDivider />
            <Testimonials data={data.testimonials} />
            <OfferStrip data={data.offer_strip} />
            <AboutOverview data={data.overview} />
            <JaaliDivider />
            <Locations data={data.locations} />
            <BookingSection data={data.booking} />
            <Faq data={data.faq} />
            <ClosingCTA data={data.closing_cta} />
        </div>
    );
}