import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://octogone.ca'
  
  // Pages principales
  const routes = [
    '',
    '/fr',
    '/en',
    '/fr/fonctionnalites',
    '/en/fonctionnalites',
    '/fr/fonctionnalites/catalogue',
    '/en/fonctionnalites/catalogue',
    '/fr/fonctionnalites/prise-inventaire',
    '/en/fonctionnalites/prise-inventaire',
    '/fr/fonctionnalites/recettes-food-cost',
    '/en/fonctionnalites/recettes-food-cost',
    '/fr/fonctionnalites/inventaire-temps-reel',
    '/en/fonctionnalites/inventaire-temps-reel',
    '/fr/fonctionnalites/facturation',
    '/en/fonctionnalites/facturation',
    '/fr/fonctionnalites/pourboires',
    '/en/fonctionnalites/pourboires',
    '/fr/fonctionnalites/employes',
    '/en/fonctionnalites/employes',
    '/fr/fonctionnalites/thermometres',
    '/en/fonctionnalites/thermometres',
    '/fr/fonctionnalites/production-cuisine',
    '/en/fonctionnalites/production-cuisine',
    '/fr/modules',
    '/en/modules',
    '/fr/modules/octogone-360',
    '/en/modules/octogone-360',
    '/fr/modules/octogone-hq',
    '/en/modules/octogone-hq',
    '/fr/support',
    '/en/support',
    '/fr/support/accompagnement',
    '/en/support/accompagnement',
    '/fr/support/banque-heures',
    '/en/support/banque-heures',
    '/fr/support/conciergerie',
    '/en/support/conciergerie',
    '/fr/support/onboarding',
    '/en/support/onboarding',
    '/fr/contact',
    '/en/contact',
    '/fr/login',
    '/en/login',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/fr' || route === '/en' ? 'daily' : 'weekly',
    priority: route === '' || route === '/fr' || route === '/en' ? 1 : 0.8,
  }))
}
