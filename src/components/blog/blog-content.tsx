"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog/types';
import { formatBlogDate, formatReadingTime, getCategoryInfo, getAuthorInfo } from '@/lib/blog/client-utils';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';

interface BlogContentProps {
  post: BlogPost;
  locale: 'fr' | 'en';
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export const BlogContent: React.FC<BlogContentProps> = ({ post, locale, previousPost, nextPost }) => {
  const categoryInfo = getCategoryInfo(post.category, locale);
  const authorInfo = getAuthorInfo(post.author, locale);

  return (
    <>
      {/* Hero de l'article avec image de fond */}
      <article className="relative w-full overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image || "/images/blog/blog_header.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge catégorie */}
            <div className="inline-block px-4 py-2 rounded-full font-semibold mb-6" style={{ backgroundColor: categoryInfo.color, color: 'var(--on-secondary-container)' }}>
              {categoryInfo.name}
            </div>

            {/* Titre */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto text-white/90">
                {post.excerpt}
              </p>
            )}

            {/* Métadonnées */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm mb-8 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatBlogDate(post.date, locale)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-white">{formatReadingTime(post.readingTime, locale)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-white">{authorInfo.name}</span>
              </div>
            </div>

            {/* Navigation - Articles */}
            <div className="flex flex-wrap justify-center items-center gap-3">
            {/* Article précédent */}
            {previousPost && (
              <Link 
                href={`/${locale}/blog/${previousPost.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
                title={previousPost.title}
              >
                <ArrowLeft className="w-5 h-5" style={{ color: 'var(--on-secondary-container)' }} />
                <span className="font-medium" style={{ color: 'var(--on-secondary-container)' }}>
                  {locale === 'fr' ? 'Précédent' : 'Previous'}
                </span>
              </Link>
            )}

            {/* Retour au blog */}
            <Link 
              href={`/${locale}/blog`}
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#dcb26b' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
            >
              <span className="font-medium" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === 'fr' ? 'Retour au blog' : 'Back to blog'}
              </span>
            </Link>

            {/* Article suivant */}
            {nextPost && (
              <Link 
                href={`/${locale}/blog/${nextPost.slug}`}
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
                title={nextPost.title}
              >
                <span className="font-medium" style={{ color: 'var(--on-secondary-container)' }}>
                  {locale === 'fr' ? 'Suivant' : 'Next'}
                </span>
                <ArrowLeft className="w-5 h-5 rotate-180" style={{ color: 'var(--on-secondary-container)' }} />
              </Link>
            )}
            </div>
          </div>
        </div>
      </article>

      {/* Contenu de l'article */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <style jsx>{`
              .blog-content {
                color: var(--on-background);
              }
              .blog-content :global(h1),
              .blog-content :global(h2),
              .blog-content :global(h3),
              .blog-content :global(h4),
              .blog-content :global(h5),
              .blog-content :global(h6) {
                color: var(--on-background);
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
              .blog-content :global(p) {
                color: var(--on-background);
                margin-bottom: 1.5rem;
                line-height: 1.8;
              }
              .blog-content :global(li),
              .blog-content :global(span) {
                color: var(--on-background);
              }
              .blog-content :global(ul),
              .blog-content :global(ol) {
                margin-bottom: 1.5rem;
              }
              .blog-content :global(a) {
                color: var(--primary);
              }
              .blog-content :global(strong) {
                color: var(--on-background);
                font-weight: 600;
              }
              .blog-content :global(blockquote) {
                color: var(--on-background);
                border-left-color: var(--primary);
                padding-left: 1.5rem;
                margin: 1.5rem 0;
              }
            `}</style>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--outline)' }}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-md transition-colors"
                      style={{ 
                        backgroundColor: 'var(--surface-variant)',
                        color: 'var(--on-surface-variant)'
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation entre articles */}
            {(previousPost || nextPost) && (
              <div className="mt-16 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ borderTop: '1px solid var(--outline)' }}>
                {/* Article précédent */}
                {previousPost ? (
                  <Link 
                    href={`/${locale}/blog/${previousPost.slug}`}
                    className="group p-6 rounded-xl transition-all hover:shadow-lg"
                    style={{ backgroundColor: 'var(--surface-variant)' }}
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--on-surface-variant)' }}>
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {locale === 'fr' ? 'Article précédent' : 'Previous article'}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg group-hover:underline" style={{ color: 'var(--on-surface)' }}>
                      {previousPost.title}
                    </h3>
                  </Link>
                ) : (
                  <div></div>
                )}

                {/* Article suivant */}
                {nextPost && (
                  <Link 
                    href={`/${locale}/blog/${nextPost.slug}`}
                    className="group p-6 rounded-xl transition-all hover:shadow-lg text-right"
                    style={{ backgroundColor: 'var(--surface-variant)' }}
                  >
                    <div className="flex items-center justify-end gap-2 mb-2" style={{ color: 'var(--on-surface-variant)' }}>
                      <span className="text-sm font-medium">
                        {locale === 'fr' ? 'Article suivant' : 'Next article'}
                      </span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                    <h3 className="font-bold text-lg group-hover:underline" style={{ color: 'var(--on-surface)' }}>
                      {nextPost.title}
                    </h3>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
