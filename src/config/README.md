# Configuration de l'accès au widget de recette

## Activer/Désactiver l'email gate

Pour activer ou désactiver le système d'email gate, modifiez le fichier `recipe-access.ts` :

```typescript
export const RECIPE_ACCESS_CONFIG = {
  ENABLE_EMAIL_GATE: false, // ← Changer à true pour activer
  ACCESS_CODE: 'OCTOGONE2025',
  CODE_VALIDITY_MINUTES: 30,
} as const;
```

## États

### ENABLE_EMAIL_GATE = false (Désactivé)
- Le bouton "Calculer le prix de ma recette" est **toujours actif**
- Aucun email n'est demandé
- Aucun code n'est requis
- Accès direct au widget

### ENABLE_EMAIL_GATE = true (Activé)
- Le visiteur doit entrer son email
- Le code s'affiche automatiquement : `OCTOGONE2025`
- Le visiteur entre le code pour débloquer
- Le bouton "Calculer" s'active après validation

## Flow utilisateur (quand activé)

1. **État initial** : Input email + Bouton "Recevoir le code" (bouton Calculer désactivé)
2. **Après email** : Affichage du code + Input code + Bouton "Valider" (bouton Calculer désactivé)
3. **Après validation** : Message "Accès débloqué" (bouton Calculer activé)
4. **Clic sur Calculer** : Animation → Widget de recette

## Tracking des emails

Les emails sont loggés dans la console via l'API route `/api/recipe/request-access`.

Pour sauvegarder dans une base de données, modifiez le fichier :
`src/app/api/recipe/request-access/route.ts`

## Changer le code d'accès

Modifiez `ACCESS_CODE` dans `recipe-access.ts` :

```typescript
ACCESS_CODE: 'VOTRE_NOUVEAU_CODE',
```

## Tracking HubSpot

Le système track automatiquement 3 événements dans HubSpot :

### 1. `recipe_access_requested`
**Quand** : Le visiteur entre son email et clique sur "Recevoir le code"
**Données trackées** :
- `email` : Email du visiteur
- `locale` : Langue (fr/en)
- `widget_type` : 'food_cost_calculator'
- `timestamp` : Date/heure
- `page_url` : URL de la page

### 2. `recipe_access_unlocked`
**Quand** : Le visiteur entre le bon code et débloque l'accès
**Données trackées** :
- `email` : Email du visiteur
- `locale` : Langue (fr/en)
- `widget_type` : 'food_cost_calculator'
- `timestamp` : Date/heure
- `page_url` : URL de la page

### 3. `recipe_calculation_started`
**Quand** : Le visiteur clique sur "Calculer le prix de ma recette"
**Données trackées** :
- `has_email_gate` : true/false (si l'email gate était activé)
- `locale` : Langue (fr/en)
- `widget_type` : 'food_cost_calculator'
- `timestamp` : Date/heure
- `page_url` : URL de la page

### Visualiser dans HubSpot

1. Aller dans **Rapports** > **Analytique** > **Événements personnalisés**
2. Chercher les événements :
   - `recipe_access_requested`
   - `recipe_access_unlocked`
   - `recipe_calculation_started`
3. Créer des rapports personnalisés pour analyser les conversions
