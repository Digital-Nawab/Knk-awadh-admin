import Layout from '../layout/Layout';
import Home from '../components/homeComponents/Home';
import { getDynamicMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return await getDynamicMetadata('/', {
    title: "KNK Salon Awadh | Luxury Hair, Skin & Bridal Studio Lucknow",
    description: "Experience royal luxury at KNK Salon Awadh, Lucknow. Hair colour, keratin, HydraFacials, celebrity bridal makeup, and beauty academy.",
  });
}

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
