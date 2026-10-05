import Layout from '../layout/Layout';
import Home from '../components/homeComponents/Home';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
