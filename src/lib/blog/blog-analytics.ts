/**
 * Analytics pour le blog
 * Fonctions pour tracker les interactions utilisateur
 * Version simplifiée pour éviter erreurs build
 */

/**
 * Track la vue d'un article de blog
 */
export function trackBlogPostView(postData: {
  slug: string;
  title: string;
  category: string;
  author: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
}) {
  console.log('Blog post view tracked:', postData.slug);
}

/**
 * Track la lecture complète d'un article (scroll 100%)
 */
export function trackBlogPostRead(postData: {
  slug: string;
  title: string;
  category: string;
  timeSpent: number;
}) {
  console.log('Blog post read complete:', postData.slug);
}

/**
 * Track le partage d'un article
 */
export function trackBlogPostShare(postData: {
  slug: string;
  title: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'email' | 'copy';
}) {
  console.log('Blog post shared:', postData.slug, postData.platform);
}

/**
 * Track la recherche dans le blog
 */
export function trackBlogSearch(searchData: {
  query: string;
  resultsCount: number;
  locale: string;
}) {
  console.log('Blog search:', searchData.query);
}

/**
 * Track le filtrage par catégorie
 */
export function trackBlogCategoryFilter(categoryData: {
  category: string;
  locale: string;
  postsCount: number;
}) {
  console.log('Blog category filter:', categoryData.category);
}

/**
 * Track le clic sur un tag
 */
export function trackBlogTagClick(tagData: {
  tag: string;
  postTitle: string;
  locale: string;
}) {
  console.log('Blog tag click:', tagData.tag);
}

/**
 * Track le clic sur un article lié
 */
export function trackBlogRelatedPostClick(clickData: {
  fromSlug: string;
  fromTitle: string;
  toSlug: string;
  toTitle: string;
  position: number;
}) {
  console.log('Blog related post click:', clickData.toSlug);
}

/**
 * Track l'inscription à la newsletter depuis le blog
 */
export function trackBlogNewsletterSignup(signupData: {
  email: string;
  source: 'blog_sidebar' | 'blog_post_end' | 'blog_popup';
  postSlug?: string;
}) {
  console.log('Blog newsletter signup:', signupData.source);
}

/**
 * Track les commentaires (si implémentés)
 */
export function trackBlogComment(commentData: {
  postSlug: string;
  postTitle: string;
  commentLength: number;
}) {
  console.log('Blog comment posted:', commentData.postSlug);
}

/**
 * Track le temps passé sur un article (appelé périodiquement)
 */
export function trackBlogReadingProgress(progressData: {
  slug: string;
  title: string;
  scrollPercentage: number;
  timeSpent: number;
}) {
  const trackingThresholds = [25, 50, 75, 90];
  
  if (trackingThresholds.includes(progressData.scrollPercentage)) {
    console.log('Blog reading progress:', progressData.slug, progressData.scrollPercentage + '%');
  }
}

/**
 * Track les erreurs 404 sur le blog
 */
export function trackBlogNotFound(errorData: {
  requestedSlug: string;
  referrer: string;
  locale: string;
}) {
  console.log('Blog 404 error:', errorData.requestedSlug);
}
