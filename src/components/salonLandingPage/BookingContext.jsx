"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext(undefined);

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Hair Services");

  const openBookingModal = (service) => {
    if (service) {
      if (
        service.includes("Hair") ||
        service.includes("Balayage") ||
        service.includes("Colour") ||
        service.includes("Nanoplastia") ||
        service.includes("Keratin")
      ) {
        setSelectedService("Hair Services");
      } else if (service.includes("Makeup") || service.includes("Bridal")) {
        setSelectedService("Makeup Services");
      } else if (service.includes("Skin") || service.includes("Facial") || service.includes("Hydra")) {
        setSelectedService("Skin and Facial");
      } else if (service.includes("Nail")) {
        setSelectedService("Nail Services");
      } else if (service.includes("Beauty")) {
        setSelectedService("Beauty Services");
      } else if (service.includes("Men") || service.includes("Grooming") || service.includes("Barbershop")) {
        setSelectedService("Men's Grooming");
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
