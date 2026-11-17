import Layout from "@/layout/Layout";
import NailsService from "@/components/serviceComponents/NailsService";
import NailsModel from "@/models/NailsModel";
import { DEFAULT_NAILS_SECTIONS } from "@/data/nailsDefaults";
import { getDynamicMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
    return await getDynamicMetadata('/services/nails', {
        title: "Nails Services in Lucknow | KNK Salon Awadh",
        description: "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish.",
    });
}

export default async function NailsPage() {
    let nailsData = DEFAULT_NAILS_SECTIONS;
    try {
        nailsData = await NailsModel.getAllSections();
    } catch (err) {
        console.warn("Failed to prefetch nails sections on server:", err?.message || err);
    }

    return (
        <Layout>
            <NailsService initialData={nailsData} />
        </Layout>
    );
}
