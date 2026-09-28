"use client";

import React from "react";
import Hero from "./sections/Hero";
import StatsBar from "./sections/StatsBar";
import WhyAcademy from "./sections/WhyAcademy";
import VideoShowcase from "./sections/VideoShowcase";
import Curriculum from "./sections/Curriculum";
import Mentors from "./sections/Mentors";
import HowToEnroll from "./sections/HowToEnroll";
import Courses from "./sections/Courses";
import CertificationHighlight from "./sections/CertificationHighlight";
import AchievementGallery from "./sections/AchievementGallery";
import WallOfFame from "./sections/WallOfFame";
import Testimonials from "./sections/Testimonials";
import FaqSection from "./sections/FaqSection";
import BookAppointment from "./sections/BookAppointment";
import ClosingCTA from "./sections/ClosingCTA";

function Academy() {
    return (
        <div className="bg-[#fbf7f0]">
            <Hero />
            <StatsBar />
            <Courses />
            <WhyAcademy />
            <VideoShowcase />
            <Curriculum />
            <Mentors />
            <HowToEnroll />
            <CertificationHighlight />
            <AchievementGallery />
            <WallOfFame />
            <Testimonials />
            <FaqSection />
            <BookAppointment />
            <ClosingCTA />
        </div>
    );
}

export default Academy;
