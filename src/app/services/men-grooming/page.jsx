import Layout from '@/layout/Layout';
import MenGroomingService from '@/components/serviceComponents/MenGroomingService';
import { getDynamicMetadata } from '@/lib/seo';

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata('/services/men-grooming', {
        title: "Men’s Grooming: Haircut, Beard, Shaving, Facial, Hair Spa in Lucknow | KNK Salon",
        description: "Premier men's grooming salon & barbershop in Lucknow. Precision haircuts & skin fades, beard sculpting, traditional hot towel shaves, detox facials, and hair spa.",
        image: "/assets/images/new/home/MEN'S GROOMING.webp",
        keywords: "men grooming salon lucknow, mens haircut lucknow, beard trim styling, hot towel wet shave, mens facial detan, mens hair spa",
    });
}

export default function MenGroomingPage() {
    return (
        <Layout>
            <MenGroomingService />
        </Layout>
    );
}
