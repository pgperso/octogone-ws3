import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Ignorer les erreurs ESLint et TypeScript pendant le build
  eslint: {
    ignoreDuringBuilds: true,
    dirs: [], // Ne pas linter aucun répertoire
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimisations d'images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 an
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Optimisations de performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-accordion', 'recharts'],
    // Activer la minification CSS agressive
    cssChunking: 'strict',
  },
  
  // Optimiser le code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Séparer les gros packages
            recharts: {
              name: 'recharts',
              test: /[\\/]node_modules[\\/](recharts|d3-.*)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  
  // Désactiver les polyfills pour navigateurs modernes (économise ~24 KB)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Désactiver les polyfills legacy
  swcMinify: true,
  
  // Compression
  compress: true,
  
  // Headers de sécurité et cache
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
      ],
    },
    // Cache pour les assets statiques (images, fonts, etc.)
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // Cache pour les fichiers statiques (JS, CSS)
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // Cache pour les SVG et autres assets
    {
      source: '/:path*.svg',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*.avif',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*.webp',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
  
  // Optimisations de cache
  poweredByHeader: false,
  
  // Configuration pour l'internationalisation
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
};

export default withBundleAnalyzer(nextConfig);
