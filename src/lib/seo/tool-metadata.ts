/**
 * Générateur de métadonnées Next.js pour les pages outils
 * Optimisé pour SEO et partage social
 */

import { Metadata } from 'next';

interface ToolData {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

export function generateToolMetadata(
  tool: ToolData,
  locale: string
): Metadata {
  const isEnglish = locale === 'en';
  
  const title = isEnglish ? tool.nameEn : tool.nameFr;
  const description = isEnglish ? tool.descriptionEn : tool.descriptionFr;
  
  const keywords = getToolKeywords(tool.id, isEnglish);
  const url = `https://octogone.app/${locale}/fonctionnalites/${tool.id}`;
  const imageUrl = `https://octogone.app/tools/${tool.id}.jpg`;

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
        'fr-CA': `https://octogone.app/fr/fonctionnalites/${tool.id}`,
        'en-CA': `https://octogone.app/en/fonctionnalites/${tool.id}`,
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

function getToolKeywords(toolId: string, isEnglish: boolean): string {
  const keywords: Record<string, { fr: string; en: string }> = {
    'inventaire': {
      fr: 'inventaire restaurant, gestion stocks, inventaire temps réel, numérisation inventaire, valeur inventaire',
      en: 'restaurant inventory, stock management, real-time inventory, inventory digitization, inventory value'
    },
    'recettes': {
      fr: 'recettes restaurant, standardisation recettes, food cost recettes, coût recettes, gestion recettes',
      en: 'restaurant recipes, recipe standardization, recipe food cost, recipe costing, recipe management'
    },
    'produits': {
      fr: 'catalogue produits, gestion produits restaurant, fiche technique, centralisation produits',
      en: 'product catalog, restaurant product management, technical sheet, product centralization'
    },
    'facturation': {
      fr: 'facturation restaurant, gestion factures, automatisation facturation, suivi factures',
      en: 'restaurant invoicing, invoice management, invoice automation, invoice tracking'
    },
    'analyses': {
      fr: 'analyses restaurant, rapports restaurant, business intelligence, tableaux de bord, KPI restaurant',
      en: 'restaurant analytics, restaurant reports, business intelligence, dashboards, restaurant KPI'
    },
    'ressources-humaines': {
      fr: 'RH restaurant, gestion horaires, labor cost, coût main-d\'œuvre, planification équipe',
      en: 'restaurant HR, schedule management, labor cost, workforce cost, team planning'
    },
    'thermometres': {
      fr: 'thermomètres restaurant, HACCP, sécurité alimentaire, température aliments, traçabilité',
      en: 'restaurant thermometers, HACCP, food safety, food temperature, traceability'
    },
    'pourboires': {
      fr: 'gestion pourboires, répartition pourboires, tips restaurant, distribution pourboires',
      en: 'tip management, tip distribution, restaurant tips, tip allocation'
    }
  };

  const keywordSet = keywords[toolId];
  if (!keywordSet) return '';
  return isEnglish ? keywordSet.en : keywordSet.fr;
}
