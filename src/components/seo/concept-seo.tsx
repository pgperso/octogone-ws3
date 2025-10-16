/**
 * Composant SEO réutilisable pour les pages de concepts
 * Génère les schemas JSON-LD pour Google et AI crawlers
 */

import { ConceptFeature } from '@/data/features/features-content';
import { 
  generateConceptSchema, 
  generateConceptBreadcrumb,
  generateConceptWebPageSchema 
} from '@/lib/seo/concept-schema-generator';

interface ConceptSEOProps {
  concept: ConceptFeature;
  locale: string;
}

export function ConceptSEO({ concept, locale }: ConceptSEOProps) {
  const isEnglish = locale === 'en';
  const conceptName = isEnglish ? concept.nameEn : concept.nameFr;

  // Générer les schemas
  const softwareSchema = generateConceptSchema(concept, locale);
  const breadcrumbSchema = generateConceptBreadcrumb(concept.id, conceptName, locale);
  const webPageSchema = generateConceptWebPageSchema(concept, locale);

  return (
    <>
      {/* Schema SoftwareApplication pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema, null, 2),
        }}
      />
      
      {/* Schema Breadcrumb pour navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema, null, 2),
        }}
      />
      
      {/* Schema WebPage pour contexte */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema, null, 2),
        }}
      />
    </>
  );
}
