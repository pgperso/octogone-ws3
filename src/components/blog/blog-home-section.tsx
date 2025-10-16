import React from 'react';
import Link from 'next/link';
import { BlogCard } from './blog-card';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';

/**
 * Section Blog pour la page d'accueil
 * Affiche les 3 articles les plus récents
 */
export const BlogHomeSection: React.FC<{ 
  locale: 'fr' | 'en';
  posts: BlogPost[];
}> = ({ locale, posts }) => {

  // Si pas d'articles, ne pas afficher la section
  if (posts.length === 0) {
    return null;
  }

  return (
    <ResponsiveSection 
      bgColor="bg-white" 
      spacing="xxxl"
    >
      <div className="text-center mb-12">
        {/* Icône et titre */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gold-600" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-marine-900 mb-6">
          {locale === 'fr' 
            ? 'Conseils et actualités restaurant' 
            : 'Restaurant tips and news'
          }
        </h2>

        <p className="text-lg md:text-xl text-marine-700 max-w-3xl mx-auto mb-8">
          {locale === 'fr'
            ? 'Découvrez nos derniers conseils d\'experts pour optimiser la gestion de votre restaurant et maximiser votre rentabilité.'
            : 'Discover our latest expert tips to optimize your restaurant management and maximize your profitability.'
          }
        </p>
      </div>

      {/* Grille des articles récents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post} 
            locale={locale}
            showExcerpt={true}
            showAuthor={false}
            showReadingTime={true}
            showCategory={true}
          />
        ))}
      </div>

      {/* CTA vers le blog complet */}
      <div className="text-center">
        <Link href={`/${locale}/blog`}>
          <OctogoneButton 
            variant="secondary"
            size="lg"
            className="group"
          >
            {locale === 'fr' ? 'Voir tous les articles' : 'View all articles'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </OctogoneButton>
        </Link>
      </div>

      {/* Statistiques blog */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-center items-center gap-8 text-sm text-marine-600">
          <div className="text-center">
            <div className="font-bold text-2xl text-gold-600 mb-1">
              {posts.length}+
            </div>
            <div>{locale === 'fr' ? 'Articles' : 'Articles'}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-gold-600 mb-1">4</div>
            <div>{locale === 'fr' ? 'Catégories' : 'Categories'}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-2xl text-gold-600 mb-1">5min</div>
            <div>{locale === 'fr' ? 'Lecture moy.' : 'Avg. read'}</div>
          </div>
        </div>
      </div>
    </ResponsiveSection>
  );
};
