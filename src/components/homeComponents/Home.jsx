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

  return (
    <>
      <Hero />
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
