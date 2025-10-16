/**
 * Types pour le Blog
 * 
 * Types partagés entre server et client components
 */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateModified?: string;
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
