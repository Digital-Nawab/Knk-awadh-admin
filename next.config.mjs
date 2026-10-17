import fs from 'node:fs';
import path from 'node:path';

// Ensure static assets exist across aliases
try {
  const srcDir = path.resolve('public/makeup-landing-page');
  const destDir = path.resolve('public/landing-page');
  if (fs.existsSync(srcDir) && !fs.existsSync(destDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
  }
} catch (e) {
  console.error('Asset sync error:', e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/contact-us',
        statusCode: 301,
      },
      {
        source: '/academy',
        destination: '/makeup-academy',
        statusCode: 301,
      },
      {
        source: '/knk-makeup-academy',
        destination: '/makeup-academy',
        statusCode: 301,
      },
      {
        source: '/makuep-academy',
        destination: '/makeup-academy',
        statusCode: 301,
      },
      {
        source: '/gallery/makeup',
        destination: '/gallery',
        statusCode: 301,
      },
      {
        source: '/gallery/knk-interior',
        destination: '/knk-interior',
        statusCode: 301,
      },
      {
        source: '/men-grooming',
        destination: '/services/men-grooming',
        permanent: true,
      },
      {
        source: '/men-grooming/:path*',
        destination: '/services/men-grooming',
        permanent: true,
      },
      {
        source: '/landing-page',
        destination: '/makeup-artist-lucknow',
        permanent: true,
      },
      {
        source: '/landing-page/thank-you',
        destination: '/makeup-artist-lucknow/thank-you',
        permanent: true,
      },
      {
        source: '/makeup-landing-page',
        destination: '/makeup-artist-lucknow',
        permanent: true,
      },
      {
        source: '/makeup-landing-page/thank-you',
        destination: '/makeup-artist-lucknow/thank-you',
        permanent: true,
      },
      {
        source: '/salon-landing-page',
        destination: '/salon-services-lucknow',
        permanent: true,
      },
      {
        source: '/salon-landing-page/thank-you',
        destination: '/salon-services-lucknow/thank-you',
        permanent: true,
      },
      {
        source: '/skkin',
        destination: '/aesthetic',
        permanent: true,
      },
      {
        source: '/best-deal',
        destination: '/offers',
        statusCode: 301,
      },
      {
        source: '/best-deal/:path*',
        destination: '/offers',
        statusCode: 301,
      },
      {
        source: '/best-deals',
        destination: '/offers',
        statusCode: 301,
      },
      {
        source: '/best-deals/:path*',
        destination: '/offers',
        statusCode: 301,
      },
    ];
  },
};


export default nextConfig;

