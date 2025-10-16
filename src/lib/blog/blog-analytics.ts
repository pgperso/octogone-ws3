/**
 * Analytics Blog - HubSpot + Google Analytics 4
 * 
 * Tracking spécialisé pour les articles de blog
 */

import { trackEvent } from '@/lib/analytics/hubspot';
import { trackGA4Event } from '@/lib/analytics/google-analytics';

/**
 * Track la lecture d'un article de blog
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
  // HubSpot
  trackEvent('blog_post_viewed', {
    blog_post_slug: postData.slug,
    blog_post_title: postData.title,
    blog_category: postData.category,
    blog_author: postData.author,
    blog_tags: postData.tags.join(','),
    blog_reading_time: postData.readingTime,
    blog_word_count: postData.wordCount
  });

  // Google Analytics 4
  trackGA4Event('page_view', {
    page_title: postData.title,
    content_group1: 'Blog',
    content_group2: postData.category,
    content_group3: postData.author,
    custom_parameter_1: postData.tags.join(','),
    custom_parameter_2: postData.readingTime.toString()
  });
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
  // HubSpot
  trackEvent('blog_post_read_complete', {
    blog_post_slug: postData.slug,
    blog_post_title: postData.title,
    blog_category: postData.category,
    time_spent_seconds: postData.timeSpent
  });

  // Google Analytics 4
  trackGA4Event('blog_read_complete', {
    event_category: 'blog_engagement',
    event_label: postData.title,
    value: postData.timeSpent,
    blog_category: postData.category
  });
}

/**
 * Track le partage d'un article
 */
export function trackBlogPostShare(postData: {
  slug: string;
  title: string;
  platform: 'facebook' | 'twitter' | 'linkedin' | 'email' | 'copy';
}) {
  // HubSpot
  trackEvent('blog_post_shared', {
    blog_post_slug: postData.slug,
    blog_post_title: postData.title,
    share_platform: postData.platform
  });

  // Google Analytics 4
  trackGA4Event('share', {
    method: postData.platform,
    content_type: 'blog_post',
    item_id: postData.slug,
    event_label: postData.title
  });
}

/**
 * Track la recherche dans le blog
 */
export function trackBlogSearch(searchData: {
  query: string;
  resultsCount: number;
  locale: string;
}) {
  // HubSpot
  trackEvent('blog_search', {
    search_query: searchData.query,
    search_results_count: searchData.resultsCount,
    search_locale: searchData.locale
  });

  // Google Analytics 4
  trackGA4Event('search', {
    search_term: searchData.query,
    event_category: 'blog',
    custom_parameter_1: searchData.resultsCount.toString(),
    custom_parameter_2: searchData.locale
  });
}

/**
 * Track le filtrage par catégorie
 */
export function trackBlogCategoryFilter(categoryData: {
  category: string;
  locale: string;
  postsCount: number;
}) {
  // HubSpot
  trackEvent('blog_category_filtered', {
    blog_category: categoryData.category,
    category_locale: categoryData.locale,
    category_posts_count: categoryData.postsCount
  });

  // Google Analytics 4
  trackGA4Event('blog_category_filter', {
    event_category: 'blog_navigation',
    event_label: categoryData.category,
    value: categoryData.postsCount
  });
}

/**
 * Track le clic sur un tag
 */
export function trackBlogTagClick(tagData: {
  tag: string;
  postTitle: string;
  locale: string;
}) {
  // HubSpot
  trackEvent('blog_tag_clicked', {
    blog_tag: tagData.tag,
    source_post_title: tagData.postTitle,
    tag_locale: tagData.locale
  });

  // Google Analytics 4
  trackGA4Event('blog_tag_click', {
    event_category: 'blog_navigation',
    event_label: tagData.tag,
    custom_parameter_1: tagData.postTitle
  });
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
  // HubSpot
  trackEvent('blog_related_post_clicked', {
    from_post_slug: clickData.fromSlug,
    from_post_title: clickData.fromTitle,
    to_post_slug: clickData.toSlug,
    to_post_title: clickData.toTitle,
    related_post_position: clickData.position
  });

  // Google Analytics 4
  trackGA4Event('blog_related_click', {
    event_category: 'blog_navigation',
    event_label: clickData.toTitle,
    value: clickData.position,
    custom_parameter_1: clickData.fromTitle
  });
}

/**
 * Track l'inscription à la newsletter depuis le blog
 */
export function trackBlogNewsletterSignup(signupData: {
  email: string;
  source: 'blog_sidebar' | 'blog_post_end' | 'blog_popup';
  postSlug?: string;
}) {
  // HubSpot
  trackEvent('blog_newsletter_signup', {
    email: signupData.email,
    signup_source: signupData.source,
    source_post_slug: signupData.postSlug || ''
  });

  // Google Analytics 4
  trackGA4Event('newsletter_signup', {
    event_category: 'lead_generation',
    event_label: signupData.source,
    custom_parameter_1: signupData.postSlug || 'none'
  });
}

/**
 * Track les commentaires (si implémentés)
 */
export function trackBlogComment(commentData: {
  postSlug: string;
  postTitle: string;
  commentLength: number;
}) {
  // HubSpot
  trackEvent('blog_comment_posted', {
    blog_post_slug: commentData.postSlug,
    blog_post_title: commentData.postTitle,
    comment_length: commentData.commentLength
  });

  // Google Analytics 4
  trackGA4Event('blog_comment', {
    event_category: 'blog_engagement',
    event_label: commentData.postTitle,
    value: commentData.commentLength
  });
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
  // Seulement tracker à certains seuils pour éviter le spam
  const trackingThresholds = [25, 50, 75, 90];
  
  if (trackingThresholds.includes(progressData.scrollPercentage)) {
    // HubSpot
    trackEvent('blog_reading_progress', {
      blog_post_slug: progressData.slug,
      blog_post_title: progressData.title,
      scroll_percentage: progressData.scrollPercentage,
      time_spent_seconds: progressData.timeSpent
    });

    // Google Analytics 4
    trackGA4Event('blog_reading_progress', {
      event_category: 'blog_engagement',
      event_label: `${progressData.scrollPercentage}%`,
      value: progressData.timeSpent,
      custom_parameter_1: progressData.title
    });
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
  // HubSpot
  trackEvent('blog_post_not_found', {
    requested_slug: errorData.requestedSlug,
    referrer_url: errorData.referrer,
    error_locale: errorData.locale
  });

  // Google Analytics 4
  trackGA4Event('blog_404', {
    event_category: 'error',
    event_label: errorData.requestedSlug,
    custom_parameter_1: errorData.referrer
  });
}

/**
 * Track les performances du blog (pour les admins)
 */
export function trackBlogPerformance(perfData: {
  loadTime: number;
  postsCount: number;
  locale: string;
}) {
  // Google Analytics 4 seulement (données techniques)
  trackGA4Event('blog_performance', {
    event_category: 'performance',
    value: perfData.loadTime,
    custom_parameter_1: perfData.postsCount.toString(),
    custom_parameter_2: perfData.locale
  });
}
