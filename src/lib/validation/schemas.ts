import { z } from 'zod';

/**
 * Schéma de validation pour le formulaire de contact
 */
export const contactSchema = z.object({
  email: z
    .string()
    .email('Email invalide')
    .max(255, 'Email trop long'),
  firstName: z
    .string()
    .min(1, 'Le prénom est requis')
    .max(100, 'Prénom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom contient des caractères invalides'),
  lastName: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Nom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  company: z
    .string()
    .max(200, 'Nom de l\'entreprise trop long')
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s()-]{10,20}$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message est trop long')
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Schéma de validation pour le formulaire de démo
 */
export const demoSchema = z.object({
  email: z
    .string()
    .email('Email invalide')
    .max(255, 'Email trop long'),
  firstName: z
    .string()
    .min(1, 'Le prénom est requis')
    .max(100, 'Prénom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom contient des caractères invalides'),
  lastName: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Nom trop long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),
  company: z
    .string()
    .min(1, 'Le nom de l\'entreprise est requis')
    .max(200, 'Nom de l\'entreprise trop long'),
  phone: z
    .string()
    .regex(/^\+?[0-9\s()-]{10,20}$/, 'Numéro de téléphone invalide'),
  restaurantCount: z
    .string()
    .refine((val) => ['1', '2-5', '6-10', '11+'].includes(val), {
      message: 'Nombre de restaurants invalide'
    })
});

export type DemoFormData = z.infer<typeof demoSchema>;

/**
 * Schéma de validation pour l'authentification admin
 */
export const adminLoginSchema = z.object({
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .max(100, 'Mot de passe trop long')
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

/**
 * Schéma de validation pour les articles de blog
 */
export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(200, 'Le titre est trop long'),
  slug: z
    .string()
    .min(3, 'Le slug doit contenir au moins 3 caractères')
    .max(100, 'Le slug est trop long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'),
  excerpt: z
    .string()
    .min(10, 'Le résumé doit contenir au moins 10 caractères')
    .max(500, 'Le résumé est trop long'),
  content: z
    .string()
    .min(50, 'Le contenu doit contenir au moins 50 caractères')
    .max(50000, 'Le contenu est trop long'),
  category: z
    .enum(['nouveautes', 'conseils', 'etudes-cas', 'tendances'], {
      errorMap: () => ({ message: 'Catégorie invalide' })
    }),
  author: z
    .string()
    .min(1, 'L\'auteur est requis'),
  tags: z
    .array(z.string())
    .max(10, 'Maximum 10 tags')
    .optional(),
  published: z
    .boolean()
    .default(false),
  locale: z
    .enum(['fr', 'en'], {
      errorMap: () => ({ message: 'Locale invalide' })
    })
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
