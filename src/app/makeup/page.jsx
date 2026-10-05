import Layout from '../../layout/Layout';
import Makeup from '../../components/makeupComponents/Makeup';
import MakeupModel from '@/models/MakeupModel';
import { DEFAULT_MAKEUP_SECTIONS } from '@/data/makeupDefaults';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
