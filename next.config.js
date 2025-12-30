/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'cma-education-strapi-production.up.railway.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Ne pas supprimer les console.log en production pour le debug
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;