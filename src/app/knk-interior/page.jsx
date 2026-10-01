import Layout from '../../layout/Layout'
import InteriorGallery from '@/components/interiorComponents/InteriorGallery'
import { getDynamicMetadata } from '@/lib/seo'
import InteriorModel from '@/models/InteriorModel'

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata('/knk-interior', {
        title: "KNK Interiors | Luxury Salon Gallery | KNK Salon Awadh Lucknow",
        description: "Explore the royal Awadhi interiors of KNK Salon branches in Hazratganj and Gomti Nagar, Lucknow. Featuring imperial bridal suites and bespoke spa sanctuaries.",
    })
}

export default async function KnkInteriorPage() {
    let initialInterior = [];
    try {
        initialInterior = await InteriorModel.getAll({ activeOnly: true });
    } catch (e) {
        console.error("Error fetching interior gallery data:", e);
    }

    return (
        <Layout>
            <InteriorGallery initialData={JSON.parse(JSON.stringify(initialInterior))} />
        </Layout>
    )
}
