import Layout from '../../layout/Layout'
import Academy from '../../components/academyComponents/Academy'
import { getDynamicMetadata } from '@/lib/seo'

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata('/academy', {
        title: "Beauty & Hair Academy Lucknow | KNK Salon Awadh",
        description: "Professional certified beauty, makeup, and hair styling courses at KNK Academy Lucknow.",
    })
}

export default function AcademyPage() {
    return (
        <>
            <Layout>
                <Academy />
            </Layout>
        </>
    )
}

