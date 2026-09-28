import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("microblading", "aesthetic");
    return await getDynamicMetadata('/aesthetic/microblading', {
        title: service?.title || "Eyebrow Microblading in Lucknow | Semi-Permanent Brows | KNK Salon",
        description: service?.shortDesc || "Featherlight hyper-realistic eyebrow microblading in Lucknow. Organic pigments, customized facial brow mapping, and painless topical numbing.",
        image: service?.image || "/assets/images/new/aesthetics-adv.webp"
    });
}

export default function MicrobladingPage() {
    const service = getServiceBySlug("microblading", "aesthetic");
    return <ServiceDetailTemplate service={service} />;
}
