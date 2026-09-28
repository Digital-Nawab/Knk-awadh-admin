import Layout from '../../layout/Layout'
import Gallery from '../../components/galleryComponents/Gallery'
import { getDynamicMetadata } from '@/lib/seo'

export const revalidate = 60;

export async function generateMetadata() {
  return await getDynamicMetadata('/gallery', {
    title: "Artistry Gallery & Lookbook | KNK Salon Awadh",
    description: "Browse our bridal transformations, couture hair colors, and nail artistry portfolio in Lucknow.",
  })
}

export default function GalleryPage() {
  return (
    <>
      <Layout>
        <Gallery />
      </Layout>
    </>
  )
}

