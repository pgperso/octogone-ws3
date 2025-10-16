import { NextRequest } from 'next/server';

/**
 * Valide l'authentification admin pour les API routes
 */
export function validateAdminAuth(request: NextRequest): { valid: boolean; error?: string } {
  try {
    // Vérifier le cookie de session
    const sessionCookie = request.cookies.get('admin-session');
    
    if (!sessionCookie?.value) {
      return { valid: false, error: 'Non authentifié' };
    }

    // Vérifier la validité du token (format basique)
    const token = sessionCookie.value;
    if (!token.includes('-') || token.length < 50) {
      return { valid: false, error: 'Token invalide' };
    }

    // Vérifier l'expiration (24h max)
    const tokenParts = token.split('-');
    const timestamp = parseInt(tokenParts[tokenParts.length - 1]);
    
    if (isNaN(timestamp)) {
      return { valid: false, error: 'Token malformé' };
    }

    const tokenAge = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 heures

    if (tokenAge > maxAge) {
      return { valid: false, error: 'Session expirée' };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Erreur de validation' };
  }
}

/**
 * Sanitise une chaîne pour éviter les injections
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Supprimer < et >
    .replace(/javascript:/gi, '') // Supprimer javascript:
    .replace(/on\w+=/gi, '') // Supprimer les handlers d'événements
    .trim();
}

/**
 * Valide un slug d'article
 */
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100;
}

/**
 * Valide les données d'un article
 */
export function validateArticleData(data: Record<string, unknown>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Titre requis
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 5) {
    errors.push('Le titre doit contenir au moins 5 caractères');
  }

  // Slug requis et valide
  if (!data.slug || typeof data.slug !== 'string' || !validateSlug(data.slug)) {
    errors.push('Le slug doit être valide (lettres minuscules, chiffres et tirets uniquement)');
  }

  // Catégorie valide
  const validCategories = ['nouveautes', 'conseils', 'etudes-cas', 'tendances'];
  if (!data.category || typeof data.category !== 'string' || !validCategories.includes(data.category)) {
    errors.push('La catégorie doit être valide');
  }

  // Excerpt requis
  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim().length < 10) {
    errors.push('Le résumé doit contenir au moins 10 caractères');
  }

  // Contenu requis pour publication
  if (data.published && (!data.content || typeof data.content !== 'string' || data.content.trim().length < 50)) {
    errors.push('Le contenu doit contenir au moins 50 caractères pour être publié');
  }

  // Tags (optionnel mais doit être un tableau)
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('Les tags doivent être un tableau');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
