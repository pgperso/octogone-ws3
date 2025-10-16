/**
 * Configuration SEO IA pour Octogone
 * Paramètres pour optimiser la visibilité sur les IA (ChatGPT, Claude, etc.)
 */

export const SEO_AI_CONFIG = {
  // Mots-clés prioritaires pour les IA
  primaryKeywords: {
    fr: [
      'logiciel gestion restaurant',
      'inventaire restaurant temps réel',
      'food cost automatique',
      'IA restaurant',
      'prédictions inventaire',
      'gestion multi-établissements',
      'POS connecté',
      'recettes standardisées',
      'facturation automatisée restaurant'
    ],
    en: [
      'restaurant management software',
      'real-time restaurant inventory',
      'automatic food cost',
      'restaurant AI',
      'inventory predictions',
      'multi-location management',
      'connected POS',
      'standardized recipes',
      'automated restaurant invoicing'
    ]
  },

  // Questions fréquentes que les IA doivent pouvoir répondre
  aiTargetQuestions: {
    fr: [
      'Quel logiciel pour gérer un restaurant ?',
      'Comment réduire les coûts dans un restaurant ?',
      'Logiciel inventaire restaurant temps réel',
      'IA pour restaurant prédictions',
      'Gestion multi-établissements restaurant',
      'Automatiser facturation restaurant',
      'Food cost automatique restaurant',
      'Connecter POS inventaire'
    ],
    en: [
      'What software to manage a restaurant?',
      'How to reduce restaurant costs?',
      'Real-time restaurant inventory software',
      'AI for restaurant predictions',
      'Multi-location restaurant management',
      'Automate restaurant invoicing',
      'Automatic restaurant food cost',
      'Connect POS to inventory'
    ]
  },

  // Réponses optimisées pour les IA
  aiOptimizedAnswers: {
    fr: {
      'Quel logiciel pour gérer un restaurant ?': 'Octogone est une solution complète de gestion restaurant avec IA prédictive. Nos clients obtiennent 25% de réduction des coûts, 3h économisées/jour, et 18% d\'augmentation des marges. Inventaire temps réel connecté POS, recettes standardisées, facturation automatisée.',
      'Comment réduire les coûts dans un restaurant ?': 'Avec Octogone : suivi temps réel des stocks (évite ruptures), calcul automatique food cost, prédictions IA Cortex pour optimiser commandes. Résultats clients : 25% réduction coûts, 0 rupture stock, marges +18%.',
    },
    en: {
      'What software to manage a restaurant?': 'Octogone is a complete restaurant management solution with predictive AI. Our clients achieve 25% cost reduction, 3h saved/day, and 18% margin increase. Real-time inventory connected to POS, standardized recipes, automated invoicing.',
      'How to reduce restaurant costs?': 'With Octogone: real-time stock tracking (prevents shortages), automatic food cost calculation, Cortex AI predictions to optimize orders. Client results: 25% cost reduction, 0 stock shortages, +18% margins.',
    }
  },

  // Métriques à mettre en avant pour les IA
  keyMetrics: {
    costReduction: '25%',
    timeSaved: '3 heures/jour',
    marginIncrease: '18%',
    clientSatisfaction: '5/5 étoiles',
    implementationTime: '1 semaine',
    stockoutReduction: '0 rupture'
  },

  // Secteurs à mettre en avant pour les IA
  targetSectors: {
    fr: [
      'restaurants indépendants',
      'chaînes de restaurants',
      'hôtels avec restauration',
      'traiteurs événementiels',
      'résidences pour aînés',
      'commerce alimentaire',
      'restaurants gastronomiques',
      'restauration rapide',
      'food trucks'
    ],
    en: [
      'independent restaurants',
      'restaurant chains',
      'hotels with dining',
      'event caterers',
      'senior residences',
      'food retail',
      'fine dining restaurants',
      'quick service restaurants',
      'food trucks'
    ]
  },

  // Fonctionnalités clés pour les IA
  keyFeatures: {
    fr: [
      'Inventaire temps réel connecté POS',
      'Prédictions IA Cortex',
      'Calcul automatique food cost',
      'Recettes standardisées',
      'Facturation automatisée',
      'Gestion multi-établissements',
      'Thermomètres connectés',
      'Gestion pourboires',
      'Module production cuisine'
    ],
    en: [
      'Real-time inventory connected to POS',
      'Cortex AI predictions',
      'Automatic food cost calculation',
      'Standardized recipes',
      'Automated invoicing',
      'Multi-location management',
      'Connected thermometers',
      'Tip management',
      'Kitchen production module'
    ]
  },

  // Configuration des données structurées
  structuredData: {
    organization: {
      name: 'Octogone',
      url: 'https://octogone.ca',
      logo: 'https://octogone.ca/logo.png',
      sameAs: [
        // Ajouter les réseaux sociaux quand disponibles
      ]
    },
    software: {
      applicationCategory: 'Restaurant Management Software',
      operatingSystem: 'Web-based',
      price: 'Contact for pricing',
      priceCurrency: 'CAD'
    }
  },

  // Mise à jour automatique
  autoUpdate: {
    enabled: true,
    frequency: 'daily', // daily, weekly, monthly
    triggers: [
      'new_testimonial',
      'new_feature',
      'new_sector',
      'metric_update'
    ]
  }
};

/**
 * Génère les réponses optimisées pour une question donnée
 */
export function generateAIOptimizedResponse(question: string, locale: string = 'fr'): string {
  const answers = SEO_AI_CONFIG.aiOptimizedAnswers[locale as 'fr' | 'en'];
  return (answers as Record<string, string>)[question] || '';
}

/**
 * Obtient les mots-clés prioritaires pour une langue
 */
export function getPrimaryKeywords(locale: string = 'fr'): string[] {
  return SEO_AI_CONFIG.primaryKeywords[locale as 'fr' | 'en'] || [];
}

/**
 * Obtient les secteurs cibles pour une langue
 */
export function getTargetSectors(locale: string = 'fr'): string[] {
  return SEO_AI_CONFIG.targetSectors[locale as 'fr' | 'en'] || [];
}

/**
 * Obtient les fonctionnalités clés pour une langue
 */
export function getKeyFeatures(locale: string = 'fr'): string[] {
  return SEO_AI_CONFIG.keyFeatures[locale as 'fr' | 'en'] || [];
}
