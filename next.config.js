/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Note: La configuration i18n a été supprimée car elle n'est pas supportée dans App Router
  // L'internationalisation est gérée via le middleware et les paramètres de route [locale]
  
  // Optimisation Framer Motion - Solution éprouvée Vercel/Netflix
  experimental: {
    optimizePackageImports: ['framer-motion']
  }
}

module.exports = nextConfig
