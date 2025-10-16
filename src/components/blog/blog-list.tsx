"use client";

import React, { useState } from 'react';
import { BlogPost } from '@/lib/blog/types';
import { BlogCard } from './blog-card';
import { getCategoryInfo } from '@/lib/blog/client-utils';
import blogConfig from '../../../content/blog/_data/blog-config.json';

interface BlogListProps {
  posts: BlogPost[];
  locale: 'fr' | 'en';
  showFilters?: boolean;
  showSearch?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  locale,
  showFilters = false,
  showSearch = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title'>('date-desc');

  // Filtrer et trier les articles
  const filteredAndSortedPosts = posts
    .filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div>
      {/* Filtres, recherche et tri */}
      {(showFilters || showSearch) && (
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Recherche */}
            {showSearch && (
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder={locale === 'fr' ? 'Rechercher un article...' : 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                style={{ 
                  borderColor: 'var(--outline)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                  '--tw-ring-color': 'var(--primary)'
                } as React.CSSProperties}
              />
            </div>
          )}

          {/* Filtres catégories */}
          {showFilters && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#dcb26b',
                  color: 'var(--on-secondary-container)',
                  opacity: !selectedCategory ? 1 : 0.6
                }}
              >
                {locale === 'fr' ? 'Tous' : 'All'}
              </button>
              {blogConfig.categories.map((category) => {
                const categoryInfo = getCategoryInfo(category.id, locale);
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
                    style={{
                      backgroundColor: categoryInfo.color,
                      color: 'var(--on-secondary-container)',
                      opacity: isSelected ? 1 : 0.6
                    }}
                  >
                    {categoryInfo.name}
                  </button>
                );
              })}
            </div>
          )}
          </div>

          {/* Tri */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              {locale === 'fr' ? 'Trier par :' : 'Sort by:'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('date-desc')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: sortBy === 'date-desc' ? '#dcb26b' : 'var(--surface-variant)',
                  color: sortBy === 'date-desc' ? '#002236' : 'var(--on-surface-variant)'
                }}
              >
                {locale === 'fr' ? 'Plus récent' : 'Newest'}
              </button>
              <button
                onClick={() => setSortBy('date-asc')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: sortBy === 'date-asc' ? '#dcb26b' : 'var(--surface-variant)',
                  color: sortBy === 'date-asc' ? '#002236' : 'var(--on-surface-variant)'
                }}
              >
                {locale === 'fr' ? 'Plus ancien' : 'Oldest'}
              </button>
              <button
                onClick={() => setSortBy('title')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: sortBy === 'title' ? '#dcb26b' : 'var(--surface-variant)',
                  color: sortBy === 'title' ? '#002236' : 'var(--on-surface-variant)'
                }}
              >
                {locale === 'fr' ? 'Titre (A-Z)' : 'Title (A-Z)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grille d'articles */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              showExcerpt={true}
              showAuthor={true}
              showReadingTime={true}
              showCategory={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {locale === 'fr' 
              ? 'Aucun article trouvé.' 
              : 'No articles found.'}
          </p>
        </div>
      )}
    </div>
  );
};
