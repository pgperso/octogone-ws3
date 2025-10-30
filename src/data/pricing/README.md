# Configuration des forfaits

Ce dossier contient la configuration des forfaits affichés sur la page `/forfaits`.

## Fichiers

### `config.json`
Configuration globale de la page de pricing (textes, labels, rabais).

**Contenu :**
- `annualDiscount` : Pourcentage de rabais annuel (0.15 = 15%)
- `hero` : Textes de la section hero (badge, titre, description)
- `billing` : Labels des boutons mensuel/annuel
- `cta` : Textes des boutons d'action
- `labels` : Labels réutilisables (prix, économies, etc.)

### `plans.json`
Configuration principale des forfaits. Chaque forfait référence un module dans `/data/calculator/modules.json`.

**Structure :**
```json
{
  "id": "identifiant unique",
  "order": 1,                    // Ordre d'affichage (1-4)
  "moduleId": "inventory",       // Référence au module dans modules.json
  "highlighted": false,          // Carte mise en évidence
  "popular": false,              // Badge "Populaire"
  "badge": {                     // Badge personnalisé (optionnel)
    "textFr": "Texte français",
    "textEn": "English text",
    "color": "primary|secondary"
  },
  "customColors": {              // Couleurs personnalisées (optionnel)
    "background": "...",
    "text": "...",
    "iconBg": "...",
    "badgeBg": "..."
  },
  "priceMultiplier": 1,          // Multiplicateur de prix (défaut: 1)
  "specialEffects": {            // Effets spéciaux (optionnel)
    "shimmer": true,
    "scale": 1.08,
    "ring": "ring-4 ring-yellow-600/30"
  }
}
```

## Données liées

Les forfaits utilisent également :
- `/data/calculator/modules.json` - Informations des modules (nom, description, features, économies)
- `/data/calculator/pricing.json` - Grille de prix par nombre d'établissements

## Modification des forfaits

### Changer l'ordre d'affichage
Modifiez le champ `order` dans `plans.json`.

### Ajouter un nouveau forfait
1. Ajoutez le module dans `/data/calculator/modules.json`
2. Ajoutez la configuration dans `plans.json`

### Modifier les prix
Éditez `/data/calculator/pricing.json` pour ajuster les prix par palier d'établissements.

### Personnaliser l'apparence
Utilisez les champs `customColors` et `specialEffects` dans `plans.json`.

## Exemple : Carte PRO premium

La carte PRO utilise toutes les options de personnalisation :
- Gradient doré (`customColors.background`)
- Texte blanc (`customColors.text`)
- Effet de brillance (`specialEffects.shimmer`)
- Scale augmenté (`specialEffects.scale`)
- Ring doré (`specialEffects.ring`)
- Badge "Meilleure valeur"
- Prix multiplié par 4 (`priceMultiplier`)
