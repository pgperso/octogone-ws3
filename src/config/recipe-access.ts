/**
 * Configuration pour l'accès au widget de recette
 * 
 * Pour activer/désactiver le système d'email gate,
 * il suffit de changer ENABLE_EMAIL_GATE à true/false
 */

export const RECIPE_ACCESS_CONFIG = {
  // Active/désactive le système d'email gate
  ENABLE_EMAIL_GATE: false, // Mettre à true pour activer
  
  // Code d'accès valide
  ACCESS_CODE: 'OCTOGONE2025',
  
  // Durée de validité du code (en minutes) - pour usage futur
  CODE_VALIDITY_MINUTES: 30,
} as const;
