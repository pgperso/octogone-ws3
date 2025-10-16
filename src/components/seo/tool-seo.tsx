/**
 * Composant SEO réutilisable pour les pages d'outils
 * Génère les schemas JSON-LD pour Google et AI crawlers
 */

import { Tool } from '@/data/tools/tools-content';
import { 
  generateToolSchema, 
  generateToolBreadcrumb,
  generateToolWebPageSchema 
} from '@/lib/seo/tool-schema-generator';

interface ToolSEOProps {
  tool: Tool;
  locale: string;
}

export function ToolSEO({ tool, locale }: ToolSEOProps) {
  const isEnglish = locale === 'en';
  const toolName = isEnglish ? tool.nameEn : tool.nameFr;

  // Générer les schemas
  const softwareSchema = generateToolSchema(tool, locale);
  const breadcrumbSchema = generateToolBreadcrumb(tool.id, toolName, locale);
  const webPageSchema = generateToolWebPageSchema(tool, locale);

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
