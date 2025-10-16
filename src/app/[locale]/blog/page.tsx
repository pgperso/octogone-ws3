import { getAllBlogPostsServer } from '@/lib/blog/server-actions';
import { generateBlogPageSEO } from '@/lib/blog/blog-utils';
import { BlogList } from '@/components/blog/blog-list';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { generateBlogSchema, generateBlogWebSiteSchema } from '@/lib/seo/blog-schema-generator';
import Image from 'next/image';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as 'fr' | 'en';

  // Récupérer tous les articles pour cette locale
  const posts = await getAllBlogPostsServer({ 
    locale: typedLocale, 
    publishedOnly: true 
  });

  const displayPosts = posts;

  // Générer les schemas pour la page blog
  const blogSchema = generateBlogSchema(typedLocale);
  const websiteSchema = generateBlogWebSiteSchema(typedLocale);

  return (
    <>
      {/* Schemas JSON-LD pour SEO AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema, null, 2),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 2),
        }}
      />
      
      <main className="min-h-screen">
      {/* Hero Section Blog - Style secteur */}
      <ResponsiveSection 
        spacing="xl" 
        className="relative overflow-hidden"
      >
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/blog_header.jpg"
            alt="Blog Octogone"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Titre */}
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Octogone Insight
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {typedLocale === 'fr'
              ? 'Articles, analyses et innovations pour une restauration guidée par l\'intelligence et la donnée. Opérer. Automatiser. Analyser. Prédire.'
              : 'Articles, analysis and innovations for data-driven restaurant management. Operate. Automate. Analyze. Predict.'
            }
          </p>
          
          {/* Statistiques */}
          <div className="flex justify-center items-center gap-8 text-sm text-white/80">
            <div>
              <span className="font-bold text-white">{displayPosts.length}</span>
              {' '}
              {typedLocale === 'fr' ? 'articles' : 'articles'}
            </div>
            <div>
              <span className="font-bold text-white">4</span>
              {' '}
              {typedLocale === 'fr' ? 'catégories' : 'categories'}
            </div>
            <div>
              <span className="font-bold text-white">5 min</span>
              {' '}
              {typedLocale === 'fr' ? 'de lecture moyenne' : 'average read'}
            </div>
          </div>
        </div>
      </ResponsiveSection>

      {/* Liste des articles */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {displayPosts.length > 0 ? (
            <BlogList 
              posts={displayPosts} 
              locale={typedLocale}
              showFilters={true}
              showSearch={true}
            />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--on-background)' }}>
                {typedLocale === 'fr' ? 'Aucun article disponible' : 'No articles available'}
              </h3>
              <p style={{ color: 'var(--on-surface-variant)' }}>
                {typedLocale === 'fr' 
                  ? 'Les articles seront bientôt disponibles dans cette langue.'
                  : 'Articles will be available in this language soon.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  );
}

// Métadonnées SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateBlogPageSEO(locale as 'fr' | 'en');
}
