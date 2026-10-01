"use client";

import React from "react";
import Hero from "./sections/Hero";
import StatsBar from "./sections/StatsBar";
import WhyAcademy from "./sections/WhyAcademy";
import Courses from "./sections/Courses";
import Curriculum from "./sections/Curriculum";
import Mentors from "./sections/Mentors";
import VideoShowcase from "./sections/VideoShowcase";
import HowToEnroll from "./sections/HowToEnroll";
import CertificationHighlight from "./sections/CertificationHighlight";
import WallOfFame from "./sections/WallOfFame";
import AchievementGallery from "./sections/AchievementGallery";
import Testimonials from "./sections/Testimonials";
import FaqSection from "./sections/FaqSection";
import BookAppointment from "./sections/BookAppointment";
import ClosingCTA from "./sections/ClosingCTA";

function Academy() {
    return (
        <div className="bg-[#fbf7f0] text-[#29231f] selection:bg-[#b58a52] selection:text-white overflow-x-hidden">
            <Hero />
            <StatsBar />
            <WhyAcademy />
            <Courses />
            <Curriculum />
            <Mentors />
            <VideoShowcase />
            <HowToEnroll />
            <CertificationHighlight />
            <WallOfFame />
            <AchievementGallery />
            <Testimonials />
            <FaqSection />
            <BookAppointment />
            <ClosingCTA />
        </div>
    );
}

export default Academy;
