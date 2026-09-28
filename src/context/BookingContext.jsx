"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import BookingModal from "@/components/common/BookingModal";

const BookingContext = createContext({
    isOpen: false,
    openBooking: () => {},
    closeBooking: () => {},
});

export function BookingProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialService, setInitialService] = useState("");

    const openBooking = useCallback((service = "") => {
        setInitialService(typeof service === "string" ? service : "");
        setIsOpen(true);
    }, []);

    const closeBooking = useCallback(() => {
        setIsOpen(false);
    }, []);

    // Global listener to seamlessly intercept any #book or /book triggers anywhere on the site
    useEffect(() => {
        const handleGlobalClick = (event) => {
            const trigger = event.target.closest('a[href="#book"], a[href="/book"], [data-booking-trigger]');
            if (trigger) {
                // If it's on the homepage and points to #book, let's see if the page has an in-page section #book.
                // But the user requested: "Har Book An Appointment / Book Slot / Book Now button ... click karne par ek popup/modal booking form khulna chahiye (naya page navigate na ho, same page par modal open ho)."
                event.preventDefault();
                const serviceName =
                    trigger.getAttribute("data-service") ||
                    trigger.getAttribute("title") ||
                    "";
                openBooking(serviceName);
            }
        };

        document.addEventListener("click", handleGlobalClick, { capture: true });
        return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
    }, [openBooking]);

    return (
        <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
            {children}
            <BookingModal
                isOpen={isOpen}
                onClose={closeBooking}
                initialService={initialService}
            />
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
