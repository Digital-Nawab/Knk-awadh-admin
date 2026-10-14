import React from 'react';
import dynamic from 'next/dynamic';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Makeup from './Makeup';
import Academy from './Academy';
import Aesthetics from './Aesthetics';
import HeroModel from '@/models/HeroModel';
import BlogModel from '@/models/BlogModel';
import HomeModel from '@/models/HomeModel';
import { DEFAULT_HOME_SECTIONS } from '@/data/homeDefaults';

const CelebrityMakeup = dynamic(() => import('./CelebrityMakeup'), {
  loading: () => <div className="min-h-[500px] bg-[#3b2419]" />,
});

const Location = dynamic(() => import('./Location'));
const ParallaxBanner = dynamic(() => import('./ParallexBanner'));
const BlogSection = dynamic(() => import('./BlogSection'));
const Review = dynamic(() => import('./Review'));
const Faq = dynamic(() => import('./Faq'));
const LuxuryBooking = dynamic(() => import('./LuxuryBooking'));

async function Home() {
  const [blogsRes, heroRes, homeDataRes] = await Promise.allSettled([
    BlogModel.getAll({ publishedOnly: true }),
    HeroModel.getActive(),
    HomeModel.getAllSections(),
  ]);

  let initialBlogs = [];
  if (blogsRes.status === 'fulfilled' && blogsRes.value && blogsRes.value.length > 0) {
    initialBlogs = blogsRes.value.slice(0, 3);
  }

  let initialHero = null;
  if (heroRes.status === 'fulfilled' && heroRes.value && heroRes.value.length > 0) {
    const topHero = heroRes.value[0];
    initialHero = {
      id: topHero.id,
      media_url: topHero.media_url,
      media_type: topHero.media_type,
      alt_text: topHero.alt_text,
      is_active: topHero.is_active,
    };
  }

  let homeData = DEFAULT_HOME_SECTIONS;
  if (homeDataRes.status === 'fulfilled' && homeDataRes.value) {
    homeData = homeDataRes.value;
  }

  return (
    <>
      <Hero initialHero={initialHero} />
      <About data={homeData?.about} />
      <Services data={homeData?.services} />
      <Makeup data={homeData?.grooming} />
      <Aesthetics data={homeData?.aesthetics} />
      <Academy data={homeData?.academy} />
      <CelebrityMakeup data={homeData?.celebrity} />
      <Location data={homeData?.locations} />
      <ParallaxBanner data={homeData?.banner} />
      <BlogSection initialBlogs={initialBlogs} />
      <Review data={homeData?.reviews} />
      <Faq data={homeData?.faq} />
      <LuxuryBooking data={homeData?.booking} />
    </>
  );
}

export default Home;
