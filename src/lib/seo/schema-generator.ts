/**
 * Générateur de Schema.org pour les témoignages
 * Centralise la logique pour cohérence et évolutivité
 */

import { testimonials } from '@/data/testimonials-data';

export interface TestimonialSchemaData {
  id: string;
  nameFr: string;
  nameEn: string;
  businessFr: string;
  businessEn: string;
  quoteFr: string;
  quoteEn: string;
  rating: number;
  isReal?: boolean;
  image?: string;
}

/**
 * Génère le schema AggregateRating basé sur les vrais témoignages
 */
export function generateAggregateRating() {
  const realTestimonials = testimonials.filter(t => t.isReal);
  const totalRating = realTestimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgRating = realTestimonials.length > 0 ? totalRating / realTestimonials.length : 5;

  return {
    "@type": "AggregateRating",
    "ratingValue": avgRating,
    "reviewCount": realTestimonials.length,
    "bestRating": 5,
    "worstRating": Math.min(...realTestimonials.map(t => t.rating))
  };
}

/**
 * Génère un schema Review individuel
 */
export function generateReviewSchema(testimonial: TestimonialSchemaData, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": "Octogone",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://octogone.ca"
    },
    "author": {
      "@type": testimonial.isReal ? "Person" : "Organization",
      "name": locale === "fr" ? testimonial.nameFr : testimonial.nameEn,
      "jobTitle": locale === "fr" ? testimonial.businessFr : testimonial.businessEn
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.rating,
      "bestRating": 5
    },
    "reviewBody": locale === "fr" ? testimonial.quoteFr : testimonial.quoteEn,
    "datePublished": new Date().toISOString().split('T')[0],
    ...(testimonial.image && { "image": testimonial.image })
  };
}

/**
 * Génère tous les schemas de reviews pour le schema global
 */
export function generateAllReviewsSchema(locale: string) {
  // Prioriser les vrais témoignages, puis ajouter quelques fictifs
  const realTestimonials = testimonials.filter(t => t.isReal);
  const demoTestimonials = testimonials.filter(t => !t.isReal).slice(0, 4);
  const selectedTestimonials = [...realTestimonials, ...demoTestimonials];

  return selectedTestimonials.map(t => ({
    "@type": "Review",
    "author": {
      "@type": t.isReal ? "Person" : "Organization",
      "name": locale === "fr" ? t.nameFr : t.nameEn
    },
    "reviewBody": locale === "fr" ? t.quoteFr : t.quoteEn,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": t.rating,
      "bestRating": 5
    }
  }));
}

/**
 * Génère le schema Product avec reviews pour la page d'accueil
 */
export function generateProductSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Octogone Restaurant Management",
    "description": locale === "fr" 
      ? "Plateforme de gestion restaurant avec IA Cortex : inventaire temps réel, food cost automatique, prédictions intelligentes"
      : "Restaurant management platform with Cortex AI: real-time inventory, automatic food cost, intelligent predictions",
    "url": "https://octogone.ca",
    "brand": {
      "@type": "Brand",
      "name": "Octogone"
    },
    "aggregateRating": generateAggregateRating(),
    "review": generateAllReviewsSchema(locale)
  };
}

/**
 * Génère le schema Organization avec témoignages intégrés
 * Pour AI crawlers (ChatGPT, Perplexity, Claude, etc.)
 */
export function generateOrganizationWithTestimonials(locale: string) {
  const realTestimonials = testimonials.filter(t => t.isReal);
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Octogone",
    "url": "https://octogone.ca",
    "logo": "https://octogone.ca/logo.png",
    "description": locale === "fr"
      ? "Plateforme de gestion restaurant avec IA Cortex. Automatisation inventaire, calcul food cost, prédictions intelligentes. Clients : restaurants indépendants, chaînes, hôtels, traiteurs."
      : "Restaurant management platform with Cortex AI. Inventory automation, food cost calculation, intelligent predictions. Clients: independent restaurants, chains, hotels, caterers.",
    "aggregateRating": generateAggregateRating(),
    "review": realTestimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": locale === "fr" ? t.nameFr : t.nameEn,
        "jobTitle": locale === "fr" ? t.businessFr : t.businessEn
      },
      "reviewBody": locale === "fr" ? t.quoteFr : t.quoteEn,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating,
        "bestRating": 5
      }
    }))
  };
}

/**
 * Génère le breadcrumb schema pour les pages de témoignages
 */
export function generateTestimonialBreadcrumb(testimonialId: string, testimonialName: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === "fr" ? "Accueil" : "Home",
        "item": `https://octogone.ca/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": locale === "fr" ? "Témoignages" : "Testimonials",
        "item": `https://octogone.ca/${locale}/temoignages`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": testimonialName,
        "item": `https://octogone.ca/${locale}/temoignages/${testimonialId}`
      }
    ]
  };
}
