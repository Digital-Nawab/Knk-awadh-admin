import Layout from '../../layout/Layout'
import About from '../../components/aboutComponents/About'
import { getDynamicMetadata } from '@/lib/seo'

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata('/about', {
        title: "About Us | KNK Salon Awadh Lucknow",
        description: "Learn about the heritage, senior stylists, and luxury beauty craft at KNK Salon Awadh Lucknow.",
    })
}

export default function AboutPage() {
    return (
        <>
            <Layout>
                <About />
            </Layout>
        </>
    )
}

