/**
 * Index Client-Safe pour les utilitaires blog
 * Facilite les imports côté client sans inclure les fonctions serveur
 */

// Types
export type { BlogPost, BlogMetadata } from './types';

// Utilitaires client-safe
export {
  formatBlogDate,
  formatReadingTime,
  getCategoryInfo,
  getAuthorInfo,
  getBlogPostUrl,
  getBlogCategoryUrl,
  getBlogTagUrl
} from './client-utils';

// Analytics (client-safe)
export {
  trackBlogPostView,
  trackBlogPostRead,
  trackBlogPostShare,
  trackBlogSearch,
  trackBlogCategoryFilter,
  trackBlogTagClick,
  trackBlogRelatedPostClick,
  trackBlogNewsletterSignup,
  trackBlogComment,
  trackBlogReadingProgress,
  trackBlogNotFound,
  trackBlogPerformance
} from './blog-analytics';
