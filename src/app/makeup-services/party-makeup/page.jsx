import React from "react";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import { getServiceBySlug } from "@/data/servicesCatalog";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    const service = getServiceBySlug("party-makeup");
    return await getDynamicMetadata('/makeup-services/party-makeup', {
        title: service?.title || "Party & Cocktail Makeup in Lucknow | KNK Salon Awadh",
        description: service?.shortDesc || "Glamorous party, sangeet, and cocktail makeup in Lucknow. Bold statement eyes, dewy skin, and long-wear dance-floor durability.",
        image: service?.image || "/assets/images/new/home/bridal/5.webp"
    });
}

export default function PartyMakeupPage() {
    const service = getServiceBySlug("party-makeup");
    return <ServiceDetailTemplate service={service} />;
}
