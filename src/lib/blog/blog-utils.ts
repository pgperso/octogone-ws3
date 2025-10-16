/**
 * Utilitaires Blog
 * 
 * Fonctions utilitaires pour le blog
 */

import blogConfig from '../../../content/blog/_data/blog-config.json';

/**
 * Formate une date pour l'affichage
 */
export function formatBlogDate(dateString: string, locale: 'fr' | 'en' = 'fr'): string {
  const date = new Date(dateString);
  
  if (locale === 'fr') {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

/**
 * Formate le temps de lecture
 */
export function formatReadingTime(minutes: number, locale: 'fr' | 'en' = 'fr'): string {
  if (locale === 'fr') {
    return `${minutes} min de lecture`;
  } else {
    return `${minutes} min read`;
  }
}

/**
 * Génère un excerpt à partir du contenu
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Supprimer le markdown
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/\n/g, ' ') // Line breaks
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Couper au dernier mot complet
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

/**
 * Obtient les informations d'une catégorie
 */
export function getCategoryInfo(categoryId: string, locale: 'fr' | 'en' = 'fr') {
  const category = blogConfig.categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return {
      id: categoryId,
      name: categoryId,
      description: '',
      color: '#6B7280'
    };
  }

  return {
    id: category.id,
    name: locale === 'fr' ? category.nameFr : category.nameEn,
    description: locale === 'fr' ? category.descriptionFr : category.descriptionEn,
    color: category.color
  };
}

/**
 * Obtient les informations d'un auteur
 */
export function getAuthorInfo(authorId: string, locale: 'fr' | 'en' = 'fr') {
  const author = blogConfig.authors.find(auth => auth.id === authorId);
  
  if (!author) {
    return {
      id: authorId,
      name: authorId,
      bio: '',
      avatar: '/images/authors/default.jpg',
      role: ''
    };
  }

  return {
    id: author.id,
    name: locale === 'fr' ? author.name : author.nameEn,
    bio: locale === 'fr' ? author.bio : author.bioEn,
    avatar: author.avatar,
    role: locale === 'fr' ? author.role : author.roleEn
  };
}

/**
 * Génère l'URL d'un article
 */
export function getBlogPostUrl(slug: string, locale: 'fr' | 'en' = 'fr'): string {
  return `/${locale}/blog/${slug}`;
}

/**
 * Génère l'URL d'une catégorie
 */
export function getBlogCategoryUrl(categoryId: string, locale: 'fr' | 'en' = 'fr'): string {
  return `/${locale}/blog/category/${categoryId}`;
}

/**
 * Génère l'URL d'un tag
 */
export function getBlogTagUrl(tag: string, locale: 'fr' | 'en' = 'fr'): string {
  return `/${locale}/blog/tag/${encodeURIComponent(tag)}`;
}

/**
 * Génère les métadonnées SEO pour un article
 */
export function generateBlogPostSEO(post: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}, locale: 'fr' | 'en' = 'fr') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://octogone.ca';
  const authorInfo = getAuthorInfo(post.author, locale);
  const categoryInfo = getCategoryInfo(post.category, locale);

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords.join(', '),
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.date,
      authors: [authorInfo.name],
      section: categoryInfo.name,
      tags: post.tags,
      images: [
        {
          url: `${baseUrl}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [`${baseUrl}${post.image}`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${post.title}`,
    },
  };
}

/**
 * Génère les métadonnées SEO pour la page blog
 */
export function generateBlogPageSEO(locale: 'fr' | 'en' = 'fr') {
  const config = blogConfig.seo;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://octogone.ca';

  return {
    title: locale === 'fr' ? config.defaultTitleFr : config.defaultTitleEn,
    description: locale === 'fr' ? config.defaultDescriptionFr : config.defaultDescriptionEn,
    keywords: config.defaultKeywords.join(', '),
    openGraph: {
      title: locale === 'fr' ? config.defaultTitleFr : config.defaultTitleEn,
      description: locale === 'fr' ? config.defaultDescriptionFr : config.defaultDescriptionEn,
      type: 'website',
      images: [
        {
          url: `${baseUrl}${blogConfig.social.defaultImage}`,
          width: 1200,
          height: 630,
          alt: 'Octogone Blog',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'fr' ? config.defaultTitleFr : config.defaultTitleEn,
      description: locale === 'fr' ? config.defaultDescriptionFr : config.defaultDescriptionEn,
      images: [`${baseUrl}${blogConfig.social.defaultImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
    },
  };
}

/**
 * Valide un slug de blog
 */
export function isValidBlogSlug(slug: string): boolean {
  // Slug doit être alphanumérique avec tirets, pas trop long
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
}

/**
 * Génère un slug à partir d'un titre
 */
export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garder seulement lettres, chiffres, espaces, tirets
    .replace(/\s+/g, '-') // Remplacer espaces par tirets
    .replace(/-+/g, '-') // Éviter les tirets multiples
    .replace(/^-|-$/g, ''); // Supprimer tirets en début/fin
}

/**
 * Calcule les statistiques du blog
 */
export function getBlogStats() {
  // Cette fonction sera utilisée pour des statistiques dynamiques
  // Pour l'instant, retourner des valeurs par défaut
  return {
    totalPosts: 0,
    totalCategories: blogConfig.categories.length,
    totalAuthors: blogConfig.authors.length,
    avgReadingTime: 5
  };
}
