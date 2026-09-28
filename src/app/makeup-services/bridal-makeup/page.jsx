import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("bridal-makeup");
    return await getDynamicMetadata('/makeup-services/bridal-makeup', {
        title: service?.title || "Top Bridal Makeup Artist in Lucknow | KNK Salon",
        description: service?.shortDesc || "Book the Best Bridal Makeup Artist in Lucknow at KNK Salon. Flawless wedding makeup, HD & Airbrush bridal makeup, pre-bridal services, and customized bridal packages.",
        image: service?.image || "/assets/images/new/makeup-bride.webp"
    });
}

export default function BridalMakeupPage() {
    const service = getServiceBySlug("bridal-makeup");
    return <ServiceDetailTemplate service={service} />;
}
