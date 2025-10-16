/**
 * Générateur de Schemas JSON-LD pour le Blog
 * Optimisé pour SEO AI (ChatGPT, Perplexity, Claude, etc.)
 */

import { BlogPost } from '@/lib/blog/types';
import { getAuthorInfo, getCategoryInfo } from '@/lib/blog/blog-utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://octogone.ca';

/**
 * Génère le schema BlogPosting pour un article
 */
export function generateBlogPostingSchema(post: BlogPost, locale: 'fr' | 'en') {
  const authorInfo = getAuthorInfo(post.author, locale);
  const categoryInfo = getCategoryInfo(post.category, locale);
  const articleUrl = `${SITE_URL}/${locale}/blog/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.seo?.title || post.title,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${post.image}`,
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: {
      '@type': 'Person',
      name: authorInfo.name,
      jobTitle: authorInfo.role,
      image: `${SITE_URL}${authorInfo.avatar}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Octogone',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/partners/logo_octogne_full.png`,
        width: 120,
        height: 35,
      },
      url: SITE_URL,
    },
    description: post.excerpt,
    articleBody: post.content,
    keywords: post.tags.join(', '),
    articleSection: categoryInfo.name,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime || 5}M`,
  };
}

/**
 * Génère le schema BreadcrumbList pour un article
 */
export function generateBlogBreadcrumbSchema(
  post: BlogPost,
  locale: 'fr' | 'en'
) {
  const categoryInfo = getCategoryInfo(post.category, locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'fr' ? 'Accueil' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryInfo.name,
        item: `${SITE_URL}/${locale}/blog/category/${post.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: `${SITE_URL}/${locale}/blog/${post.slug}`,
      },
    ],
  };
}

/**
 * Génère le schema Blog pour la page principale du blog
 */
export function generateBlogSchema(locale: 'fr' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'fr' ? 'Octogone Insight' : 'Octogone Insight',
    description:
      locale === 'fr'
        ? 'Articles, analyses et innovations pour transformer la gestion de votre restaurant par l\'intelligence et les données.'
        : 'Articles, analysis and innovations to transform your restaurant management through intelligence and data.',
    url: `${SITE_URL}/${locale}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Octogone',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/partners/logo_octogne_full.png`,
      },
    },
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
  };
}

/**
 * Génère le schema WebSite avec SearchAction pour le blog
 */
export function generateBlogWebSiteSchema(locale: 'fr' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Octogone Blog',
    url: `${SITE_URL}/${locale}/blog`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Génère tous les schemas pour un article de blog
 */
export function generateAllBlogSchemas(post: BlogPost, locale: 'fr' | 'en') {
  return [
    generateBlogPostingSchema(post, locale),
    generateBlogBreadcrumbSchema(post, locale),
  ];
}
