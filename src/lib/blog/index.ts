/**
 * Index pour les utilitaires blog
 * Facilite les imports et centralise les exports
 */

// Markdown Parser
export {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getAllBlogPosts,
  getAllBlogMetadata,
  getRelatedPosts,
  getUsedCategories,
  getUsedTags,
  searchBlogPosts,
  type BlogPost,
  type BlogMetadata
} from './markdown-parser';

// Utilitaires
export {
  formatBlogDate,
  formatReadingTime,
  generateExcerpt,
  getCategoryInfo,
  getAuthorInfo,
  getBlogPostUrl,
  getBlogCategoryUrl,
  getBlogTagUrl,
  generateBlogPostSEO,
  generateBlogPageSEO,
  isValidBlogSlug,
  generateSlugFromTitle,
  getBlogStats
} from './blog-utils';

// Analytics
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
