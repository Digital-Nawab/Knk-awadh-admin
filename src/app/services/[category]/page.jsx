import React from "react";
import Layout from "@/layout/Layout";
import DynamicCategoryPage from "@/components/serviceComponents/DynamicCategoryPage";
import ServiceModel from "@/models/ServiceModel";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { category: categorySlug } = await params;
    let cat = null;

    try {
        cat = await ServiceModel.getCategoryBySlug(categorySlug);
    } catch {
        // fallback
    }

    const catName = cat?.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace("-", " ");
    const title = cat?.title || `${catName} Services in Lucknow | KNK Salon Awadh`;
    const description = cat?.short_desc || `Experience luxury ${catName.toLowerCase()} services and treatments at KNK Salon Awadh Lucknow.`;
    const image = cat?.image || "/assets/images/new/service/NAILS.webp";

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
                    alt: catName,
                },
            ],
        },
    };
}

export default async function CategoryPage({ params }) {
    const { category } = await params;
    return (
        <Layout>
            <DynamicCategoryPage categorySlug={category} />
        </Layout>
    );
}
