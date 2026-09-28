import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("skin-treatments", "aesthetic");
    return await getDynamicMetadata('/aesthetic/skin-treatments', {
        title: service?.title || "Clinical Skin Treatments & Rejuvenation in Lucknow | KNK Salon",
        description: service?.shortDesc || "Clinical skin rejuvenation treatments in Lucknow for acne scarring, melasma, open pores, and textural roughness. Custom peels and collagen induction therapy.",
        image: service?.image || "/assets/images/new/aesthetics.webp"
    });
}

export default function SkinTreatmentsPage() {
    const service = getServiceBySlug("skin-treatments", "aesthetic");
    return <ServiceDetailTemplate service={service} />;
}
