import fs from 'node:fs';
import path from 'node:path';

// Ensure static assets exist at both /landing-page and /makeup-landing-page for cached redirects
try {
  const srcDir = path.resolve('public/landing-page');
  const destDir = path.resolve('public/makeup-landing-page');
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
  }
} catch (e) {
  console.error('Asset sync error:', e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
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
        destination: '/makeup-landing-page',
        permanent: true,
      },
      {
        source: '/landing-page/thank-you',
        destination: '/makeup-landing-page/thank-you',
        permanent: true,
      },
      {
        source: '/skkin',
        destination: '/aesthetic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

