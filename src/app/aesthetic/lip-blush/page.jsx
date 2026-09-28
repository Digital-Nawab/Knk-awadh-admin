import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("lip-blush", "aesthetic");
    return await getDynamicMetadata('/aesthetic/lip-blush', {
        title: service?.title || "Semi-Permanent Lip Blush in Lucknow | Natural Tinted Lips | KNK Salon",
        description: service?.shortDesc || "Semi-permanent lip blush and dark lip neutralization in Lucknow. Restore natural symmetry, contour, and rosy tint with organic watercolor pigments.",
        image: service?.image || "/assets/images/new/aesthetics-adv.webp"
    });
}

export default function LipBlushPage() {
    const service = getServiceBySlug("lip-blush", "aesthetic");
    return <ServiceDetailTemplate service={service} />;
}
