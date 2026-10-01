import Layout from '../../layout/Layout'
import Gallery from '../../components/galleryComponents/Gallery'
import { getDynamicMetadata } from '@/lib/seo'
import GalleryModel from '@/models/GalleryModel'

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getDynamicMetadata('/gallery', {
    title: "Artistry Gallery & Lookbook | KNK Salon Awadh",
    description: "Browse our bridal transformations, couture hair colors, and nail artistry portfolio in Lucknow.",
  })
}

export default async function GalleryPage() {
  let images = [];
  try {
    images = await GalleryModel.getActive();
  } catch (error) {
    console.error("Failed to load gallery images on server:", error);
    images = [];
  }

  return (
    <Layout>
      <Gallery initialImages={images} />
    </Layout>
  )
}
