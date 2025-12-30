/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclure le dossier CMS du build TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclure explicitement les fichiers CMS du build
  webpack: (config, { isServer }) => {
    // Ignorer complètement les fichiers du dossier cms-cma
    config.module.rules.push({
      test: /cms-cma[\\/]/,
      use: 'ignore-loader'
    })
    
    // Ajouter un loader personnalisé pour ignorer les fichiers CMS
    config.resolveLoader.alias = {
      ...config.resolveLoader.alias,
      'ignore-loader': require.resolve('./ignore-loader.js')
    }
    
    return config
  },
  // output: 'standalone', // Temporairement désactivé pour tester l'hydratation
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
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
        hostname: 'api.dicebear.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://cma-education.vercel.app',
  },
}

// Ignorer les warnings ESLint en production
nextConfig.eslint = {
  ignoreDuringBuilds: process.env.NODE_ENV === 'production',
}

module.exports = nextConfig