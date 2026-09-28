"use client";

import React from "react";
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
import Locations from "./Locations";
import BookingSection from "./BookingSection";
import ClosingCTA from "./ClosingCTA";

export default function About() {
    return (
        <div className="bg-cream text-ink font-sans">
            <Hero />
            <JaaliDivider />
            <Intro />
            <JaaliDivider />
            <WhyChoose />
            <JaaliDivider />
            <WhyBest />
            <Services />
            <Marquee />
            <Experts />
            <JaaliDivider />
            <Academy />
            <Gallery />
            <JaaliDivider />
            <Testimonials />
            <OfferStrip />
            <Locations />
            <BookingSection />
            <ClosingCTA />
        </div>
    );
}

