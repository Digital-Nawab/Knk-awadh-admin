import Layout from '../../layout/Layout'
import About from '../../components/aboutComponents/About'
import { getDynamicMetadata } from '@/lib/seo'
import AboutModel from '@/models/AboutModel'

export const dynamic = "force-dynamic";

export async function generateMetadata() {
    return await getDynamicMetadata('/about', {
        title: "About Us | KNK Salon Awadh Lucknow",
        description: "Learn about the heritage, senior stylists, and luxury beauty craft at KNK Salon Awadh Lucknow.",
    })
}

export default async function AboutPage() {
    let aboutData = {};
    try {
        aboutData = await AboutModel.getAllSections();
    } catch (error) {
        console.error("Failed to load about data on server:", error);
        aboutData = {};
    }

    return (
        <Layout>
            <About initialData={aboutData} />
        </Layout>
    )
}
