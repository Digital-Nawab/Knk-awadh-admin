import Layout from '../layout/Layout';
import Home from '../components/homeComponents/Home';

export const revalidate = 60;

export default function HomePage() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
