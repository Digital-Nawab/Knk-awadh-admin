"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext(undefined);

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("HD Bridal Makeup");

  const openBookingModal = (service) => {
    if (service) {
      // Normalize service title if needed
      if (service.includes("HD")) {
        setSelectedService("HD Bridal Makeup");
      } else if (service.includes("Airbrush")) {
        setSelectedService("Airbrush Bridal Makeup");
      } else if (service.includes("Engagement") || service.includes("Sagan")) {
        setSelectedService("Engagement / Sagan Makeup");
      } else if (service.includes("Reception") || service.includes("Cocktail")) {
        setSelectedService("Reception Glam Makeup");
      } else if (service.includes("Pre-Bridal")) {
        setSelectedService("Royal Pre-Bridal Ritual");
      } else {
        setSelectedService(service);
      }
    }
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isBookingOpen]);

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        selectedService,
        openBookingModal,
        closeBookingModal,
        setSelectedService,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingProvider");
  }
  return context;
}
