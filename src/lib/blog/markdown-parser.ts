/**
 * Markdown Parser pour le Blog
 * 
 * Parse les fichiers Markdown avec métadonnées frontmatter
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string;
  locale: 'fr' | 'en';
  published: boolean;
  content: string;
  readingTime: number;
  wordCount: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  relatedPosts?: string[];
}

export interface BlogMetadata {
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string;
  locale: 'fr' | 'en';
  published: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  relatedPosts?: string[];
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

/**
 * Obtient tous les slugs des articles de blog
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

/**
 * Obtient un article de blog par son slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Validation des métadonnées requises
    if (!data.title || !data.date || !data.locale || data.published === false) {
      return null;
    }

    // Calcul du temps de lecture et nombre de mots
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 mots par minute

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'equipe-octogone',
      category: data.category || 'conseils',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      image: data.image || '/images/blog/default.jpg',
      locale: data.locale,
      published: data.published !== false,
      content,
      readingTime,
      wordCount,
      seo: {
        title: data.seo?.title || data.title,
        description: data.seo?.description || data.excerpt || '',
        keywords: data.seo?.keywords || data.tags || []
      },
      relatedPosts: data.relatedPosts || []
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture de l'article ${slug}:`, error);
    return null;
  }
}

/**
 * Obtient tous les articles de blog avec filtres
 */
export function getAllBlogPosts(options: {
  locale?: 'fr' | 'en';
  category?: string;
  tag?: string;
  limit?: number;
  offset?: number;
  publishedOnly?: boolean;
} = {}): BlogPost[] {
  const {
    locale,
    category,
    tag,
    limit,
    offset = 0,
    publishedOnly = true
  } = options;

  const slugs = getAllBlogSlugs();
  let posts: BlogPost[] = [];

  for (const slug of slugs) {
    const post = getBlogPostBySlug(slug);
    if (post) {
      posts.push(post);
    }
  }

  // Filtres
  posts = posts.filter(post => {
    if (publishedOnly && !post.published) return false;
    if (locale && post.locale !== locale) return false;
    if (category && post.category !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    return true;
  });

  // Tri par date (plus récent en premier)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Pagination
  if (limit) {
    posts = posts.slice(offset, offset + limit);
  }

  return posts;
}

/**
 * Obtient les métadonnées de tous les articles
 */
export function getAllBlogMetadata(options: {
  locale?: 'fr' | 'en';
  publishedOnly?: boolean;
} = {}): BlogMetadata[] {
  const posts = getAllBlogPosts(options);
  
  return posts.map(post => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    author: post.author,
    category: post.category,
    tags: post.tags,
    excerpt: post.excerpt,
    image: post.image,
    locale: post.locale,
    published: post.published,
    seo: post.seo,
    relatedPosts: post.relatedPosts
  }));
}

/**
 * Obtient les articles liés
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  // Si des articles liés sont spécifiés manuellement
  if (currentPost.relatedPosts && currentPost.relatedPosts.length > 0) {
    const relatedPosts: BlogPost[] = [];
    for (const slug of currentPost.relatedPosts) {
      const post = getBlogPostBySlug(slug);
      if (post && post.published) {
        relatedPosts.push(post);
      }
    }
    return relatedPosts.slice(0, limit);
  }

  // Sinon, trouver des articles similaires par catégorie et tags
  const allPosts = getAllBlogPosts({
    locale: currentPost.locale,
    publishedOnly: true
  }).filter(post => post.slug !== currentSlug);

  // Score de similarité
  const scoredPosts = allPosts.map(post => {
    let score = 0;
    
    // Même catégorie = +3 points
    if (post.category === currentPost.category) score += 3;
    
    // Tags communs = +1 point par tag
    const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += commonTags.length;
    
    return { post, score };
  });

  // Trier par score et retourner les meilleurs
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

/**
 * Obtient les catégories utilisées
 */
export function getUsedCategories(locale?: 'fr' | 'en'): string[] {
  const posts = getAllBlogPosts({ locale, publishedOnly: true });
  const categories = [...new Set(posts.map(post => post.category))];
  return categories.sort();
}

/**
 * Obtient les tags utilisés
 */
export function getUsedTags(locale?: 'fr' | 'en'): string[] {
  const posts = getAllBlogPosts({ locale, publishedOnly: true });
  const tags = [...new Set(posts.flatMap(post => post.tags))];
  return tags.sort();
}

/**
 * Recherche dans les articles
 */
export function searchBlogPosts(query: string, locale?: 'fr' | 'en'): BlogPost[] {
  const posts = getAllBlogPosts({ locale, publishedOnly: true });
  const searchTerm = query.toLowerCase();

  return posts.filter(post => {
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
}
