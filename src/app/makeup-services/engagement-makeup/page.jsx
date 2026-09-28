import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("engagement-makeup");
    return await getDynamicMetadata('/makeup-services/engagement-makeup', {
        title: service?.title || "Engagement & Ring Ceremony Makeup in Lucknow | KNK Salon",
        description: service?.shortDesc || "Romantic, luminous engagement and ring ceremony makeup in Lucknow. Designed for pastel lehengas, soft lighting, and picture-perfect photography.",
        image: service?.image || "/assets/images/new/home/bridal/8.webp"
    });
}

export default function EngagementMakeupPage() {
    const service = getServiceBySlug("engagement-makeup");
    return <ServiceDetailTemplate service={service} />;
}
