/**
 * Utilitaires Blog - Client Safe
 * 
 * Fonctions utilitaires qui peuvent être utilisées côté client
 */

import blogConfig from '../../../content/blog/_data/blog-config.json';

/**
 * Formate une date pour l'affichage
 */
export function formatBlogDate(dateString: string, locale: 'fr' | 'en' = 'fr'): string {
  // Ajouter 'T12:00:00' pour éviter les problèmes de fuseau horaire
  const date = new Date(dateString + 'T12:00:00');
  
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
