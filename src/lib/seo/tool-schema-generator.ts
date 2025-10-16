/**
 * Générateur de Schema.org pour les pages d'outils (Inventaire, Foodcost, etc.)
 * Optimisé pour SEO et AI crawlers
 */

import { Tool } from '@/data/tools/tools-content';

/**
 * Génère le schema SoftwareApplication pour un outil
 */
export function generateToolSchema(tool: Tool, locale: string) {
  const isEnglish = locale === 'en';
  
  const toolDescriptions = {
    inventaire: {
      fr: 'Numérisez vos inventaires et suivez vos stocks en temps réel. Saisie collaborative, inventaire théorique automatique, analyse des écarts. Économisez 8 heures par semaine.',
      en: 'Digitize your inventory and track your stock in real-time. Collaborative entry, automatic theoretical inventory, variance analysis. Save 8 hours per week.'
    },
    foodcost: {
      fr: 'Calculez automatiquement votre food cost et optimisez vos marges. Recettes standardisées, coûts en temps réel, ingénierie de menu. Réduisez votre food cost de 2-5%.',
      en: 'Automatically calculate your food cost and optimize your margins. Standardized recipes, real-time costs, menu engineering. Reduce your food cost by 2-5%.'
    },
    thermometre: {
      fr: 'Surveillez vos températures en temps réel et automatisez vos rapports HACCP. Alertes instantanées, conformité garantie, zéro saisie manuelle.',
      en: 'Monitor your temperatures in real-time and automate your HACCP reports. Instant alerts, guaranteed compliance, zero manual entry.'
    },
    pourboire: {
      fr: 'Gérez la répartition des pourboires automatiquement selon vos conventions. Calculs précis, intégration POS, gestion des exceptions.',
      en: 'Manage tip distribution automatically according to your conventions. Accurate calculations, POS integration, exception management.'
    }
  };

  const keywords = {
    inventaire: {
      fr: 'inventaire restaurant, gestion stock restaurant, inventaire temps réel, inventaire collaboratif, réduction gaspillage',
      en: 'restaurant inventory, restaurant stock management, real-time inventory, collaborative inventory, waste reduction'
    },
    foodcost: {
      fr: 'food cost restaurant, calcul food cost, recettes standardisées, coût recettes, ingénierie menu',
      en: 'restaurant food cost, food cost calculation, standardized recipes, recipe costing, menu engineering'
    },
    thermometre: {
      fr: 'thermomètre connecté restaurant, surveillance température, HACCP automatique, conformité alimentaire',
      en: 'connected thermometer restaurant, temperature monitoring, automatic HACCP, food compliance'
    },
    pourboire: {
      fr: 'gestion pourboires restaurant, répartition pourboires, calcul pourboires automatique',
      en: 'restaurant tip management, tip distribution, automatic tip calculation'
    }
  };

  const description = toolDescriptions[tool.id as keyof typeof toolDescriptions]
    ? (isEnglish ? toolDescriptions[tool.id as keyof typeof toolDescriptions].en : toolDescriptions[tool.id as keyof typeof toolDescriptions].fr)
    : (isEnglish ? tool.descriptionEn : tool.descriptionFr);

  const keyword = keywords[tool.id as keyof typeof keywords]
    ? (isEnglish ? keywords[tool.id as keyof typeof keywords].en : keywords[tool.id as keyof typeof keywords].fr)
    : '';

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Octogone - ${isEnglish ? tool.nameEn : tool.nameFr}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": description,
    "url": `https://octogone.app/${locale}/fonctionnalites/${tool.id}`,
    "keywords": keyword,
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
    "featureList": tool.features.slice(0, 5).map(f => isEnglish ? f.titleEn : f.titleFr).join(", ")
  };
}

/**
 * Génère le breadcrumb schema pour une page d'outil
 */
export function generateToolBreadcrumb(toolId: string, toolName: string, locale: string) {
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
        "item": `https://octogone.app/${locale}/fonctionnalites`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": `https://octogone.app/${locale}/fonctionnalites/${toolId}`
      }
    ]
  };
}

/**
 * Génère le schema WebPage pour une page d'outil
 */
export function generateToolWebPageSchema(tool: Tool, locale: string) {
  const isEnglish = locale === 'en';
  const title = tool.headerTitleFr && tool.headerTitleEn
    ? (isEnglish ? tool.headerTitleEn : tool.headerTitleFr)
    : (isEnglish ? tool.nameEn : tool.nameFr);
  
  const description = tool.headerDescriptionFr && tool.headerDescriptionEn
    ? (isEnglish ? tool.headerDescriptionEn : tool.headerDescriptionFr)
    : (isEnglish ? tool.descriptionEn : tool.descriptionFr);
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": `https://octogone.app/${locale}/fonctionnalites/${tool.id}`,
    "inLanguage": locale,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Octogone",
      "url": "https://octogone.app"
    },
    "about": {
      "@type": "Thing",
      "name": isEnglish ? tool.nameEn : tool.nameFr,
      "description": isEnglish ? tool.descriptionEn : tool.descriptionFr
    }
  };
}
