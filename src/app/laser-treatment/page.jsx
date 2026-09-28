import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("laser", "aesthetic");
    return await getDynamicMetadata('/laser-treatment', {
        title: service?.title || "Laser Skin Rejuvenation & Treatments in Lucknow | KNK Salon",
        description: service?.shortDesc || "Advanced laser skin toning and rejuvenation in Lucknow. Target sun tanning, dark spots, fine lines, and open pores with US-FDA approved laser technology.",
        image: service?.image || "/assets/images/new/aesthetics.webp"
    });
}

export default function LaserTreatmentPage() {
    const service = getServiceBySlug("laser", "aesthetic");
    return <ServiceDetailTemplate service={service} />;
}
