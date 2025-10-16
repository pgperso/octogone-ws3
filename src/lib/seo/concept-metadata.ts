/**
 * Générateur de métadonnées Next.js pour les pages de concepts
 * Optimisé pour SEO et partage social
 */

import { Metadata } from 'next';
import { ConceptFeature } from '@/data/features/features-content';

export function generateConceptMetadata(
  concept: ConceptFeature,
  locale: string
): Metadata {
  const isEnglish = locale === 'en';
  
  const title = isEnglish ? concept.heroTitleEn : concept.heroTitleFr;
  const description = isEnglish ? concept.heroDescriptionEn : concept.heroDescriptionFr;
  const conceptName = isEnglish ? concept.nameEn : concept.nameFr;
  
  const url = `https://octogone.app/${locale}/${concept.id === 'cortex' ? 'cortex' : `features/${concept.id}`}`;
  const imageUrl = concept.heroImage.startsWith('http') ? concept.heroImage : `https://octogone.app${concept.heroImage}`;

  return {
    title: `${title} | Octogone`,
    description: description,
    keywords: getConceptKeywords(concept.id, isEnglish),
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
          alt: conceptName,
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
        'fr-CA': `https://octogone.app/fr/${concept.id === 'cortex' ? 'cortex' : `features/${concept.id}`}`,
        'en-CA': `https://octogone.app/en/${concept.id === 'cortex' ? 'cortex' : `features/${concept.id}`}`,
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

function getConceptKeywords(conceptId: string, isEnglish: boolean): string {
  const keywords: Record<string, { fr: string; en: string }> = {
    operate: {
      fr: 'gestion restaurant, inventaire temps réel, optimisation opérationnelle, réduction gaspillage, gain temps restaurant, food cost, gestion stocks',
      en: 'restaurant management, real-time inventory, operational optimization, waste reduction, restaurant time savings, food cost, stock management'
    },
    automate: {
      fr: 'automatisation restaurant, food cost automatique, calcul recettes, erreur zéro, mise à jour temps réel, gestion automatique',
      en: 'restaurant automation, automatic food cost, recipe calculation, zero error, real-time updates, automatic management'
    },
    analyze: {
      fr: 'analyse restaurant, rapports temps réel, ingénierie menu, optimisation marges, food cost, business intelligence',
      en: 'restaurant analytics, real-time reports, menu engineering, margin optimization, food cost, business intelligence'
    },
    predict: {
      fr: 'intelligence artificielle restaurant, prévision demande, IA restaurant, Cortex AI, prédiction stocks, machine learning',
      en: 'restaurant artificial intelligence, demand forecasting, restaurant AI, Cortex AI, inventory prediction, machine learning'
    },
    cortex: {
      fr: 'assistant IA restaurant, intelligence artificielle, Cortex AI, questions naturelles, réponses instantanées, optimisation données, chatbot restaurant',
      en: 'restaurant AI assistant, artificial intelligence, Cortex AI, natural questions, instant answers, data optimization, restaurant chatbot'
    }
  };

  const keywordSet = keywords[conceptId];
  if (!keywordSet) return '';
  return isEnglish ? keywordSet.en : keywordSet.fr;
}
