"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import SmoothScroll from "@/components/knk/SmoothScroll";
import Cursor from "@/components/knk/Cursor";
import Loader from "@/components/knk/Loader";
import Navigation from "@/components/knk/Navigation";
import ScrollToHash from "@/components/knk/ScrollToHash";
import BackToTop from "@/components/knk/BackToTop";
import WhatsAppButton from "@/components/knk/WhatsAppButton";

/**
 * Site-wide chrome and providers — the direct equivalent of the original App.tsx, minus
 * BrowserRouter/Routes, which Next's app router now handles via the src/app directory.
 */
const ClientProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Loader />
        <Cursor />
        <SmoothScroll>
          <ScrollToHash />
          <Navigation />
          {children}
          <WhatsAppButton />
          <BackToTop />
        </SmoothScroll>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
