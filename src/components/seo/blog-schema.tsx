/**
 * Composant Schema JSON-LD pour les articles de blog
 */

import { BlogPost } from '@/lib/blog/types';
import { generateAllBlogSchemas } from '@/lib/seo/blog-schema-generator';

interface BlogSchemaProps {
  post: BlogPost;
  locale: 'fr' | 'en';
}

export function BlogSchema({ post, locale }: BlogSchemaProps) {
  const schemas = generateAllBlogSchemas(post, locale);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`blog-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
}
