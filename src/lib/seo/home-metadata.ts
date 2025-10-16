/**
 * Générateur de métadonnées Next.js pour la page d'accueil
 * Optimisé pour SEO et partage social
 */

import { Metadata } from 'next';

export function generateHomeMetadata(locale: string): Metadata {
  const isEnglish = locale === 'en';
  
  const title = isEnglish 
    ? 'Octogone - Restaurant Management Software | Food Cost & Inventory'
    : 'Octogone - Logiciel de gestion restaurant | Food Cost & Inventaire';
  
  const description = isEnglish
    ? 'Optimize your restaurant with Octogone. Real-time inventory, automatic food cost, AI predictions. Save 10-15 hours/week and reduce waste by 2-5%. Try it free!'
    : 'Optimisez votre restaurant avec Octogone. Inventaire temps réel, food cost automatique, prédictions IA. Économisez 10-15h/semaine et réduisez le gaspillage de 2-5%. Essai gratuit!';
  
  const keywords = isEnglish
    ? 'restaurant management software, food cost calculator, inventory management, restaurant POS, menu engineering, AI restaurant, reduce food waste, restaurant analytics'
    : 'logiciel gestion restaurant, calculateur food cost, gestion inventaire, POS restaurant, ingénierie menu, IA restaurant, réduire gaspillage, analytique restaurant';

  const url = `https://octogone.app/${locale}`;
  const imageUrl = 'https://octogone.app/og-home.jpg';

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: 'Octogone' }],
    creator: 'Octogone',
    publisher: 'Octogone',
    
    // Open Graph
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'Octogone',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Octogone - Restaurant Management Software',
        },
      ],
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      type: 'website',
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
      creator: '@OctogoneApp',
    },
    
    // Autres métadonnées
    alternates: {
      canonical: url,
      languages: {
        'fr-CA': 'https://octogone.app/fr',
        'en-CA': 'https://octogone.app/en',
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
    
    // Verification
    verification: {
      google: 'your-google-verification-code', // À remplacer
    },
  };
}
