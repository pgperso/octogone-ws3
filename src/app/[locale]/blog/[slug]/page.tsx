import { notFound } from 'next/navigation';
import { getBlogPostBySlugServer, getRelatedPostsServer, getAllBlogPostsServer } from '@/lib/blog/server-actions';
import { generateBlogPostSEO } from '@/lib/blog/blog-utils';
import { BlogContent } from '@/components/blog/blog-content';
import { BlogRelatedPosts } from '@/components/blog/blog-related-posts';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { BlogSchema } from '@/components/seo/blog-schema';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const typedLocale = locale as 'fr' | 'en';

  // Récupérer l'article dans la langue demandée
  const post = await getBlogPostBySlugServer(slug, typedLocale);

  // Si l'article n'existe pas ou n'est pas dans la bonne locale
  if (!post || post.locale !== typedLocale || !post.published) {
    notFound();
  }

  // Récupérer tous les articles pour la navigation
  const allPosts = await getAllBlogPostsServer({
    locale: typedLocale,
    publishedOnly: true
  });

  // Trouver l'index de l'article actuel
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  
  // Navigation en boucle
  const previousPost = currentIndex > 0 
    ? allPosts[currentIndex - 1] 
    : allPosts[allPosts.length - 1]; // Dernier article si on est au premier
  
  const nextPost = currentIndex < allPosts.length - 1 
    ? allPosts[currentIndex + 1] 
    : allPosts[0]; // Premier article si on est au dernier

  // Récupérer les articles liés
  const relatedPosts = await getRelatedPostsServer(slug, 3);

  return (
    <>
      {/* Schemas JSON-LD pour SEO AI */}
      <BlogSchema post={post} locale={typedLocale} />
      
      <main className="min-h-screen">
        {/* Contenu de l'article */}
        <BlogContent 
          post={post} 
          locale={typedLocale}
          previousPost={previousPost}
          nextPost={nextPost}
        />

        {/* Articles liés */}
        {relatedPosts.length > 0 && (
          <ResponsiveSection 
            bgColor="bg-gray-50" 
            spacing="xl"
          >
            <BlogRelatedPosts 
              posts={relatedPosts}
              currentSlug={slug}
              locale={typedLocale}
            />
          </ResponsiveSection>
        )}
      </main>
    </>
  );
}

// Génération statique des pages
export async function generateStaticParams() {
  // Cette fonction sera appelée au build pour générer toutes les pages
  // Pour l&rsquo;instant, on retourne un tableau vide - les pages seront générées à la demande
  return [];
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const typedLocale = locale as 'fr' | 'en';
  
  const post = await getBlogPostBySlugServer(slug, typedLocale);
  
  if (!post || post.locale !== typedLocale) {
    return {
      title: 'Article non trouvé',
      description: 'Cet article n\'existe pas ou n\'est plus disponible.'
    };
  }

  return generateBlogPostSEO(post, typedLocale);
}
