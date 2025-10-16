/**
 * Générateur de Schema.org pour les pages de concepts (Opérer, Automatiser, Analyser, Prédire)
 * Optimisé pour SEO et AI crawlers (ChatGPT, Perplexity, Claude, etc.)
 */

import { ConceptFeature } from '@/data/features/features-content';

/**
 * Génère le schema SoftwareApplication pour un concept
 */
export function generateConceptSchema(concept: ConceptFeature, locale: string) {
  const isEnglish = locale === 'en';
  
  const conceptNames = {
    operate: { fr: 'Opérer', en: 'Operate' },
    automate: { fr: 'Automatiser', en: 'Automate' },
    analyze: { fr: 'Analyser', en: 'Analyze' },
    predict: { fr: 'Prédire', en: 'Predict' },
    cortex: { fr: 'Assistant IA', en: 'AI Assistant' }
  };

  const conceptDescriptions = {
    operate: {
      fr: 'Optimisez vos opérations de restaurant avec Octogone. Économisez 10-15 heures par semaine, réduisez le gaspillage de 2-5% et boostez votre efficacité opérationnelle.',
      en: 'Optimize your restaurant operations with Octogone. Save 10-15 hours per week, reduce waste by 2-5%, and boost operational efficiency.'
    },
    automate: {
      fr: 'Automatisez vos calculs et éliminez les erreurs humaines. Mises à jour instantanées, food cost automatique, zéro erreur de calcul.',
      en: 'Automate your calculations and eliminate human errors. Instant updates, automatic food cost, zero calculation errors.'
    },
    analyze: {
      fr: 'Analysez vos performances et prenez les bonnes décisions. Rapports en temps réel, ingénierie de menu, optimisation des marges.',
      en: 'Analyze your performance and make the right decisions. Real-time reports, menu engineering, margin optimization.'
    },
    predict: {
      fr: 'Anticipez avec l\'intelligence artificielle. Prévisions de demande, détection d\'anomalies, recommandations intelligentes avec Cortex AI.',
      en: 'Anticipate with artificial intelligence. Demand forecasting, anomaly detection, intelligent recommendations with Cortex AI.'
    },
    cortex: {
      fr: 'Votre assistant IA qui transforme vos données en décisions. Posez des questions, obtenez des réponses instantanées et optimisez vos opérations sans effort.',
      en: 'Your AI assistant that transforms data into decisions. Ask questions, get instant answers, and optimize your restaurant operations effortlessly.'
    }
  };

  const keywords = {
    operate: {
      fr: 'gestion restaurant, inventaire temps réel, optimisation opérationnelle, réduction gaspillage, gain temps restaurant',
      en: 'restaurant management, real-time inventory, operational optimization, waste reduction, restaurant time savings'
    },
    automate: {
      fr: 'automatisation restaurant, food cost automatique, calcul recettes, erreur zéro, mise à jour temps réel',
      en: 'restaurant automation, automatic food cost, recipe calculation, zero error, real-time updates'
    },
    analyze: {
      fr: 'analyse restaurant, rapports temps réel, ingénierie menu, optimisation marges, food cost',
      en: 'restaurant analytics, real-time reports, menu engineering, margin optimization, food cost'
    },
    predict: {
      fr: 'intelligence artificielle restaurant, prévision demande, IA restaurant, Cortex AI, prédiction stocks',
      en: 'restaurant artificial intelligence, demand forecasting, restaurant AI, Cortex AI, inventory prediction'
    },
    cortex: {
      fr: 'assistant IA restaurant, intelligence artificielle, Cortex AI, questions naturelles, réponses instantanées, optimisation données',
      en: 'restaurant AI assistant, artificial intelligence, Cortex AI, natural questions, instant answers, data optimization'
    }
  };

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Octogone - ${isEnglish ? conceptNames[concept.id].en : conceptNames[concept.id].fr}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": isEnglish ? conceptDescriptions[concept.id].en : conceptDescriptions[concept.id].fr,
    "url": `https://octogone.app/${locale}/${concept.id === 'cortex' ? 'cortex' : `features/${concept.id}`}`,
    "keywords": isEnglish ? keywords[concept.id].en : keywords[concept.id].fr,
    "offers": {
      "@type": "Offer",
      "price": "159",
      "priceCurrency": "CAD",
      "priceValidUntil": "2025-12-31"
    },
    "provider": {
      "@type": "Organization",
      "name": "Octogone",
      "url": "https://octogone.app"
    },
    "featureList": isEnglish 
      ? "Real-time inventory, Automatic food cost calculation, Menu engineering, AI predictions, Multi-location management"
      : "Inventaire temps réel, Calcul food cost automatique, Ingénierie de menu, Prédictions IA, Gestion multi-établissements"
  };
}

/**
 * Génère le breadcrumb schema pour une page de concept
 */
export function generateConceptBreadcrumb(conceptId: string, conceptName: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "fr" ? "Accueil" : "Home",
        "item": `https://octogone.app/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === "fr" ? "Fonctionnalités" : "Features",
        "item": `https://octogone.app/${locale}/features`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": conceptName,
        "item": `https://octogone.app/${locale}/${conceptId === 'cortex' ? 'cortex' : `features/${conceptId}`}`
      }
    ]
  };
}

/**
 * Génère le schema WebPage pour une page de concept
 */
export function generateConceptWebPageSchema(concept: ConceptFeature, locale: string) {
  const isEnglish = locale === 'en';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isEnglish ? concept.heroTitleEn : concept.heroTitleFr,
    "description": isEnglish ? concept.heroDescriptionEn : concept.heroDescriptionFr,
    "url": `https://octogone.app/${locale}/${concept.id === 'cortex' ? 'cortex' : `features/${concept.id}`}`,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Octogone",
      "url": "https://octogone.app"
    },
    "about": {
      "@type": "Thing",
      "name": isEnglish ? concept.nameEn : concept.nameFr,
      "description": isEnglish ? concept.contentEn.substring(0, 200) : concept.contentFr.substring(0, 200)
    }
  };
}
