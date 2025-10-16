/**
 * Section Articles Récents - Client Component
 * Affiche les 3 derniers articles du blog sur la page d'accueil
 */

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatBlogDate, getCategoryInfo } from '@/lib/blog/client-utils';
import { Calendar, ArrowRight } from 'lucide-react';

interface RecentBlogPostsProps {
  locale: 'fr' | 'en';
}

interface SimpleBlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  locale: 'fr' | 'en';
}

export default function RecentBlogPosts({ locale }: RecentBlogPostsProps) {
  const [posts, setPosts] = useState<SimpleBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/blog/recent?locale=${locale}&limit=3`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [locale]);

  if (loading) {
    return (
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Ne rien afficher s'il n'y a pas d'articles
  }

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--on-surface)' }}>
            {locale === 'fr' ? 'Derniers Articles' : 'Latest Articles'}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--on-surface-variant)' }}>
            {locale === 'fr'
              ? 'Découvrez nos dernières analyses et innovations pour transformer votre gestion'
              : 'Discover our latest analysis and innovations to transform your management'}
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => {
            const categoryInfo = getCategoryInfo(post.category, locale);
            
            return (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
                style={{
                  backgroundColor: 'var(--surface-variant)',
                  border: '1px solid var(--outline)',
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || '/images/blog/blog_header.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Badge catégorie */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: categoryInfo.color,
                      color: 'var(--on-secondary-container)',
                    }}
                  >
                    {categoryInfo.name}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--on-surface-variant)' }}>
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {formatBlogDate(post.date, locale)}
                    </time>
                  </div>

                  {/* Titre */}
                  <h3
                    className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#dcb26b] transition-colors"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm line-clamp-3 mb-4" style={{ color: 'var(--on-surface-variant)' }}>
                    {post.excerpt}
                  </p>

                  {/* Lien "Lire la suite" */}
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: '#dcb26b' }}>
                    {locale === 'fr' ? 'Lire la suite' : 'Read more'}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bouton "Voir tous les articles" */}
        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: '#dcb26b',
              color: '#002236',
            }}
          >
            {locale === 'fr' ? 'Voir tous les articles' : 'View all articles'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
