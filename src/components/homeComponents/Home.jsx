import React from 'react';
import dynamic from 'next/dynamic';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Makeup from './Makeup';
import Academy from './Academy';
import Aesthetics from './Aesthetics';
import Location from './Location';
import ParallaxBanner from './ParallexBanner';
import Review from './Review';
import BlogSection from './BlogSection';
import Faq from './Faq';
import LuxuryBooking from './LuxuryBooking';
import HeroModel from '@/models/HeroModel';
import BlogModel from '@/models/BlogModel';

const CelebrityMakeup = dynamic(() => import('./CelebrityMakeup'), {
  loading: () => <div className="min-h-[500px] bg-[#3b2419]" />,
});

async function Home() {
  let initialBlogs = [];
  try {
    const allBlogs = await BlogModel.getAll({ publishedOnly: true });
    if (allBlogs && allBlogs.length > 0) {
      initialBlogs = allBlogs.slice(0, 3);
    }
  } catch (err) {
    console.warn("Failed to prefetch blogs on server:", err?.message || err);
  }

  let initialHero = null;
  try {
    const activeHeroes = await HeroModel.getActive();
    if (activeHeroes && activeHeroes.length > 0) {
      const topHero = activeHeroes[0];
      initialHero = {
        id: topHero.id,
        media_url: topHero.media_url,
        media_type: topHero.media_type,
        alt_text: topHero.alt_text,
        is_active: topHero.is_active,
      };
    }
  } catch (err) {
    console.warn("Failed to prefetch hero on server:", err?.message || err);
  }

  return (
    <>
      <Hero initialHero={initialHero} />
      <About />
      <Services />
      <Makeup />
      <Aesthetics />
      <Academy />
      <CelebrityMakeup />
      <Location />
      <ParallaxBanner />
      <BlogSection initialBlogs={initialBlogs} />
      <Review />
      <Faq />
      <LuxuryBooking />
    </>
  );
}

export default Home;
