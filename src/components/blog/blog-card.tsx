"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog/types';
import { formatBlogDate, formatReadingTime, getCategoryInfo, getAuthorInfo, getBlogPostUrl } from '@/lib/blog/client-utils';
import { Calendar, Clock, User, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  locale: 'fr' | 'en';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showReadingTime?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  locale,
  showExcerpt = true,
  showAuthor = true,
  showReadingTime = true,
  showCategory = true,
  showTags = false,
  className = ''
}) => {
  const categoryInfo = getCategoryInfo(post.category, locale);
  const authorInfo = getAuthorInfo(post.author, locale);
  const postUrl = getBlogPostUrl(post.slug, locale);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}
      style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--outline)' }}
    >
      <Link href={postUrl} className="block">
        {/* Image de l'article */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || "/images/blog/blog_header.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.log('Erreur image:', post.image || "/images/blog/blog_header.jpg");
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Badge catégorie */}
          {showCategory && (
            <div className="absolute top-4 left-4">
              <span 
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: categoryInfo.color, color: 'var(--on-secondary-container)' }}
              >
                {categoryInfo.name}
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Métadonnées */}
          <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'var(--on-surface)' }}>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {formatBlogDate(post.date, locale)}
              </time>
            </div>
            
            {showReadingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" style={{ color: 'var(--on-surface)' }} />
                <span style={{ color: 'var(--on-surface)' }}>{formatReadingTime(post.readingTime, locale)}</span>
              </div>
            )}
          </div>

          {/* Titre */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--on-surface)' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p className="mb-4 line-clamp-3" style={{ color: 'var(--on-surface)' }}>
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {showTags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} {locale === 'fr' ? 'autres' : 'more'}
                </span>
              )}
            </div>
          )}

          {/* Auteur */}
          {showAuthor && (
            <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--outline)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-container)' }}>
                <User className="w-4 h-4" style={{ color: 'var(--on-primary-container)' }} />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                  {authorInfo.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                  {authorInfo.role}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};
