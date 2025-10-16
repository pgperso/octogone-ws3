/**
 * Index pour les données blog
 * Facilite les imports et centralise les exports
 */

export { default as blogConfig } from './blog-config.json';

// Types pour TypeScript
export interface BlogConfig {
  postsPerPage: number;
  categories: Array<{
    id: string;
    nameFr: string;
    nameEn: string;
    descriptionFr: string;
    descriptionEn: string;
    color: string;
  }>;
  authors: Array<{
    id: string;
    name: string;
    nameEn: string;
    bio: string;
    bioEn: string;
    avatar: string;
    role: string;
    roleEn: string;
  }>;
  seo: {
    defaultTitleFr: string;
    defaultTitleEn: string;
    defaultDescriptionFr: string;
    defaultDescriptionEn: string;
    defaultKeywords: string[];
  };
  social: {
    enableSharing: boolean;
    platforms: string[];
    defaultImage: string;
  };
  reading: {
    wordsPerMinute: number;
    showReadingTime: boolean;
    showWordCount: boolean;
  };
}
