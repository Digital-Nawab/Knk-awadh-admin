import Layout from '@/layout/Layout';
import MenGroomingService from '@/components/serviceComponents/MenGroomingService';
import MenGroomingModel from '@/models/MenGroomingModel';
import { DEFAULT_MEN_GROOMING_SECTIONS } from '@/data/menGroomingDefaults';
import { getDynamicMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
    return await getDynamicMetadata('/services/men-grooming', {
        title: "Men’s Grooming: Haircut, Beard, Shaving, Facial, Hair Spa in Lucknow | KNK Salon",
        description: "Premier men's grooming salon & barbershop in Lucknow. Precision haircuts & skin fades, beard sculpting, traditional hot towel shaves, detox facials, and hair spa.",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        keywords: "men grooming salon lucknow, mens haircut lucknow, beard trim styling, hot towel wet shave, mens facial detan, mens hair spa",
    });
}

export default async function MenGroomingPage() {
    let menGroomingData = DEFAULT_MEN_GROOMING_SECTIONS;
    try {
        menGroomingData = await MenGroomingModel.getAllSections();
    } catch (err) {
        console.warn("Failed to prefetch men grooming sections on server:", err?.message || err);
    }

    return (
        <Layout>
            <MenGroomingService initialData={menGroomingData} />
        </Layout>
    );
}
