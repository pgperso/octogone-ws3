/**
 * Point d'entrée pour la configuration du calculateur ROI
 * 
 * Pour migrer vers la version JSON :
 * 1. Changer l'import ci-dessous
 * 2. Tout le reste fonctionne identique
 */

// Version JSON (active)
export * from './calculator-config';

/**
 * MIGRATION GUIDE:
 * 
 * 1. Tester que tout fonctionne avec la version actuelle
 * 2. Commenter la ligne 8, décommenter la ligne 11
 * 3. Tester que tout fonctionne avec la version JSON
 * 4. Supprimer calculator-config.ts si tout est OK
 * 5. Renommer calculator-config-v2.ts en calculator-config.ts
 */
