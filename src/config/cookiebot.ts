/**
 * Configuration Cookiebot
 * Gestion des cookies conforme : RGPD, PIPEDA, Loi 25 (Québec), CCPA/CPRA (USA)
 */

export const COOKIEBOT_CONFIG = {
  // Votre Cookiebot ID
  cbid: process.env.NEXT_PUBLIC_COOKIEBOT_ID || 'd6a4b4c0-2a1c-4162-ac30-add8b00588a4',
  
  // Activer/désactiver Cookiebot
  enabled: process.env.NEXT_PUBLIC_COOKIEBOT_ENABLED !== 'false',
};
