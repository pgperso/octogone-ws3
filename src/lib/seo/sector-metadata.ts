/**
 * Générateur de métadonnées Next.js pour les pages secteurs
 * Optimisé pour SEO et partage social
 */

import { Metadata } from 'next';

interface SectorData {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

export function generateSectorMetadata(
  sector: SectorData,
  locale: string
): Metadata {
  const isEnglish = locale === 'en';
  
  const title = isEnglish ? sector.titleEn : sector.titleFr;
  const description = isEnglish ? sector.descriptionEn : sector.descriptionFr;
  
  const keywords = getSectorKeywords(sector.id, isEnglish);
  const url = `https://octogone.app/${locale}/secteurs/${sector.id}`;
  const imageUrl = `https://octogone.app/sectors/${sector.id}.jpg`;

  return {
    title: `${title} | Octogone`,
    description: description,
    keywords: keywords,
    authors: [{ name: 'Octogone' }],
    creator: 'Octogone',
    publisher: 'Octogone',
    
    // Open Graph
    openGraph: {
      title: `${title} | Octogone`,
      description: description,
      url: url,
      siteName: 'Octogone',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Octogone`,
      description: description,
      images: [imageUrl],
      creator: '@OctogoneApp',
    },
    
    // Autres métadonnées
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': `https://octogone.app/fr/secteurs/${sector.id}`,
        'en-CA': `https://octogone.app/en/secteurs/${sector.id}`,
      },
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

function getSectorKeywords(sectorId: string, isEnglish: boolean): string {
  const keywords: Record<string, { fr: string; en: string }> = {
    'chains-groups': {
      fr: 'gestion chaîne restaurants, multi-établissements, franchise restaurant, centralisation données, gestion groupe restauration',
      en: 'restaurant chain management, multi-location, franchise restaurant, data centralization, restaurant group management'
    },
    'independent-restaurants': {
      fr: 'restaurant indépendant, gestion restaurant unique, food cost restaurant, inventaire restaurant, optimisation restaurant',
      en: 'independent restaurant, single location management, restaurant food cost, restaurant inventory, restaurant optimization'
    },
    'caterers': {
      fr: 'gestion traiteur, événementiel, food cost traiteur, planification événements, gestion catering',
      en: 'catering management, event planning, catering food cost, event management, catering operations'
    },
    'brewers-distillers': {
      fr: 'gestion brasserie, distillerie, production boissons, inventaire brasseur, coût production',
      en: 'brewery management, distillery, beverage production, brewer inventory, production cost'
    },
    'purchasing-groups': {
      fr: 'regroupement achats, achats groupés, optimisation achats restaurant, gestion fournisseurs',
      en: 'purchasing group, group buying, restaurant procurement optimization, supplier management'
    },
    'retail-commerce': {
      fr: 'commerce détail alimentaire, gestion inventaire commerce, retail alimentaire, point de vente',
      en: 'food retail, retail inventory management, food commerce, point of sale'
    },
    'gastronomic': {
      fr: 'restaurant gastronomique, haute cuisine, gestion restaurant haut de gamme, food cost gastronomie',
      en: 'gastronomic restaurant, fine dining, high-end restaurant management, fine dining food cost'
    },
    'bistro-brasserie': {
      fr: 'gestion bistro, brasserie, restaurant décontracté, food cost bistro',
      en: 'bistro management, brasserie, casual dining, bistro food cost'
    },
    'fast-food': {
      fr: 'restauration rapide, fast food, gestion quick service, optimisation service rapide',
      en: 'fast food, quick service restaurant, QSR management, fast food optimization'
    },
    'casse-croute': {
      fr: 'casse-croûte, snack bar, restauration légère, gestion casse-croûte',
      en: 'snack bar, light dining, quick bite, snack management'
    },
    'family-restaurant': {
      fr: 'restaurant familial, cuisine familiale, gestion restaurant famille',
      en: 'family restaurant, family dining, family restaurant management'
    },
    'cafe': {
      fr: 'gestion café, coffee shop, café restaurant, inventaire café',
      en: 'cafe management, coffee shop, cafe restaurant, cafe inventory'
    },
    'pub-microbrewery': {
      fr: 'pub, microbrasserie, gestion pub, brasserie artisanale',
      en: 'pub, microbrewery, pub management, craft brewery'
    },
    'catering-corporate': {
      fr: 'traiteur corporatif, service alimentaire, restauration collective, catering entreprise',
      en: 'corporate catering, food service, collective dining, business catering'
    },
    'tourism-industrial': {
      fr: 'restauration touristique, restauration industrielle, service alimentaire tourisme',
      en: 'tourism dining, industrial catering, tourism food service'
    }
  };

  const keywordSet = keywords[sectorId];
  if (!keywordSet) return '';
  return isEnglish ? keywordSet.en : keywordSet.fr;
}
