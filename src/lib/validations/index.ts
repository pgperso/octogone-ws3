import { z } from 'zod'

// Validation pour le formulaire de contact
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  email: z
    .string()
    .email('Adresse email invalide')
    .min(1, 'L\'email est requis'),
  
  company: z
    .string()
    .min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères')
    .max(100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Numéro de téléphone invalide')
    .optional(),
  
  establishmentCount: z
    .number()
    .min(1, 'Au moins 1 établissement requis')
    .max(1000, 'Maximum 1000 établissements'),
  
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
  
  acceptTerms: z
    .boolean()
    .refine(val => val === true, 'Vous devez accepter les conditions d\'utilisation'),
  
  newsletter: z.boolean().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Validation pour le calculateur ROI
export const roiCalculatorSchema = z.object({
  establishments: z
    .number()
    .min(1, 'Au moins 1 établissement requis')
    .max(1000, 'Maximum 1000 établissements'),
  
  avgRevenue: z
    .number()
    .min(1000, 'Revenus minimum de 1 000$')
    .max(10000000, 'Revenus maximum de 10 000 000$'),
  
  foodCostPercentage: z
    .number()
    .min(10, 'Coût alimentaire minimum de 10%')
    .max(60, 'Coût alimentaire maximum de 60%'),
  
  laborCostPercentage: z
    .number()
    .min(15, 'Coût de main-d\'œuvre minimum de 15%')
    .max(70, 'Coût de main-d\'œuvre maximum de 70%'),
  
  currentPos: z
    .string()
    .min(1, 'Système POS requis')
    .optional(),
  
  currentInventorySystem: z
    .string()
    .optional()
})

export type ROICalculatorData = z.infer<typeof roiCalculatorSchema>

// Validation pour les articles de blog (admin)
export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Le titre doit contenir au moins 5 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  
  slug: z
    .string()
    .min(3, 'Le slug doit contenir au moins 3 caractères')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  
  excerpt: z
    .string()
    .min(50, 'L\'extrait doit contenir au moins 50 caractères')
    .max(300, 'L\'extrait ne peut pas dépasser 300 caractères'),
  
  content: z
    .string()
    .min(100, 'Le contenu doit contenir au moins 100 caractères'),
  
  author: z
    .string()
    .min(2, 'Le nom de l\'auteur doit contenir au moins 2 caractères')
    .max(100, 'Le nom de l\'auteur ne peut pas dépasser 100 caractères'),
  
  category: z
    .enum(['actualites', 'guides', 'cas-etudes', 'technologie'], {
      errorMap: () => ({ message: 'Catégorie invalide' })
    }),
  
  tags: z
    .array(z.string())
    .max(10, 'Maximum 10 tags autorisés'),
  
  publishedAt: z
    .date()
    .optional(),
  
  isPublished: z.boolean(),
  
  featuredImage: z
    .string()
    .url('URL d\'image invalide')
    .optional(),
  
  seoTitle: z
    .string()
    .max(60, 'Le titre SEO ne peut pas dépasser 60 caractères')
    .optional(),
  
  seoDescription: z
    .string()
    .max(160, 'La description SEO ne peut pas dépasser 160 caractères')
    .optional()
})

export type BlogPostData = z.infer<typeof blogPostSchema>

// Validation pour l'authentification admin
export const loginSchema = z.object({
  email: z
    .string()
    .email('Adresse email invalide')
    .min(1, 'L\'email est requis'),
  
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères')
})

export type LoginData = z.infer<typeof loginSchema>

// Validation pour les paramètres utilisateur
export const userPreferencesSchema = z.object({
  language: z.enum(['fr', 'en']),
  theme: z.enum(['light', 'dark', 'system']),
  emailNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  timezone: z.string().optional()
})

export type UserPreferencesData = z.infer<typeof userPreferencesSchema>

// Utilitaires de validation
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success
}

export const validatePhone = (phone: string): boolean => {
  return z.string().regex(/^[\+]?[1-9][\d]{0,15}$/).safeParse(phone).success
}

export const validateUrl = (url: string): boolean => {
  return z.string().url().safeParse(url).success
}
