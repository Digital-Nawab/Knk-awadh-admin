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
        source: '/skkin',
        destination: '/aesthetic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

