import Layout from '../../layout/Layout';
import Makeup from '../../components/makeupComponents/Makeup';
import MakeupModel from '@/models/MakeupModel';
import { DEFAULT_MAKEUP_SECTIONS } from '@/data/makeupDefaults';
import { getDynamicMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
    return await getDynamicMetadata('/makeup', {
        title: "Celebrity Bridal & HD Makeup Studio Lucknow | KNK Salon Awadh",
        description: "Transform your bridal look with Lucknow's elite artists. Airbrush, HD bridal, cocktail, and celebrity makeup services.",
    });
}

export default async function MakeupPage() {
    let makeupData = DEFAULT_MAKEUP_SECTIONS;
    try {
        makeupData = await MakeupModel.getAllSections();
    } catch (err) {
        console.warn("Failed to prefetch makeup sections on server:", err?.message || err);
    }

    return (
        <Layout>
            <Makeup initialData={makeupData} />
        </Layout>
    );
}
