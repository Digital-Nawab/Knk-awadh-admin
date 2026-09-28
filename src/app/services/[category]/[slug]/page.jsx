import React from "react";
import { notFound } from "next/navigation";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import ServiceModel from "@/models/ServiceModel";
import { getServiceBySlug as getCatalogServiceBySlug } from "@/data/servicesCatalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { category, slug } = await params;
    let service = null;

    try {
        service = await ServiceModel.getServiceBySlug(slug, category);
    } catch {
        // fallback
    }

    if (!service) {
        service = getCatalogServiceBySlug(slug);
    }

    if (!service) {
        return {
            title: "Salon Service | KNK Salon Awadh Lucknow",
            description: "Luxury salon services and bespoke artistry at KNK Salon Awadh Lucknow.",
        };
    }

    const title = service.title || `${service.name} in Lucknow | KNK Salon Awadh`;
    const description = service.short_desc || service.shortDesc || `Book your ${service.name} appointment at KNK Salon Awadh. Luxury care and certified specialists.`;
    const image = service.image || "/assets/images/new/service/NAILS.webp";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image.startsWith("http") ? image : `https://www.knksalon.in${image}`,
                    width: 1200,
                    height: 1500,
                    alt: service.name,
                },
            ],
        },
    };
}

export default async function ServiceDetailPage({ params }) {
    const { category, slug } = await params;
    let service = null;

    try {
        service = await ServiceModel.getServiceBySlug(slug, category);
    } catch (err) {
        console.error("Error fetching dynamic service:", err);
    }

    // Fallback to static catalog if DB query doesn't match
    if (!service) {
        service = getCatalogServiceBySlug(slug);
    }

    if (!service) {
        notFound();
    }

    return <ServiceDetailTemplate service={service} />;
}
