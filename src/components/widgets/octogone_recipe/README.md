# Octogone Recipe Widget

Widget interactif pour créer et gérer des recettes de restaurant avec calcul automatique des coûts.

## 📁 Structure des fichiers

```
octogone_recipe/
├── OctogoneRecipeWidget.tsx    # Composant principal du widget
├── RecipeIngredientsList.tsx   # Liste des ingrédients avec calcul des coûts
├── RecipeSteps.tsx              # Gestion des étapes de préparation
├── ProductSideMenu.tsx          # Menu latéral pour ajouter des produits
├── index.ts                     # Exports du module
└── README.md                    # Documentation
```

## 🎯 Fonctionnalités

### Colonne Gauche - Ingrédients
- ✅ Liste des ingrédients avec quantités
- ✅ Calcul automatique du coût par ingrédient
- ✅ Calcul du coût total de la recette
- ✅ Modification des quantités en temps réel
- ✅ Suppression d'ingrédients
- ✅ Bouton "Ajouter" pour ouvrir le side menu

### Colonne Droite - Étapes de Préparation
- ✅ Liste numérotée des étapes
- ✅ Ajout de nouvelles étapes
- ✅ Édition des étapes existantes
- ✅ Suppression d'étapes
- ✅ Réorganisation (monter/descendre)

### Side Menu - Sélection de Produits
- ✅ Liste complète des produits disponibles
- ✅ Barre de recherche
- ✅ Filtrage par nom et catégorie
- ✅ Affichage du prix unitaire
- ✅ Sélection de la quantité
- ✅ Ajout à la recette

## 🚀 Utilisation

### Import
```tsx
import { OctogoneRecipeWidget } from '@/components/widgets/octogone_recipe';
```

### Intégration
```tsx
<OctogoneRecipeWidget locale="fr" />
```

### Props
- `locale` (optional): 'fr' | 'en' - Langue de l'interface (défaut: 'fr')

## 📊 Sources de données

Le widget utilise les mêmes données produits que le widget d'inventaire :
- `@/data/products/octogone_products_data.json`
- Traductions via `@/data/products/octogone_products_translations`

## 🎨 Design

- **Avatar**: Marc (Chef exécutif)
- **Layout**: 2 colonnes (Ingrédients | Étapes)
- **Responsive**: Adapté mobile et desktop
- **Thème**: Material Design 3 avec variables CSS

## 🔧 Composants utilisés

- `OctogoneButton` - Boutons stylisés
- `lucide-react` - Icônes (Plus, Trash2, Edit2, etc.)
- Traductions produits partagées

## 📝 Exemple de données

### Ingrédient
```typescript
{
  productId: 'prod-022',
  quantity: 2,
  unit: 'kg'
}
```

### Étape
```typescript
{
  id: 'step-1',
  order: 1,
  description: 'Préchauffer le four à 180°C'
}
```

## 🌐 Multilingue

Le widget supporte le français et l'anglais :
- Tous les textes UI sont traduits
- Les noms de produits utilisent le système de traduction existant
- Les unités sont traduites automatiquement

## 🎯 Page d'intégration

Le widget est intégré sur la page Food Cost :
- URL: `/fr/fonctionnalites/food-cost`
- Condition: `toolId === 'food-cost'`
- Hauteur: 800px

## 🔄 État et interactions

### État local
- `ingredients`: Liste des ingrédients de la recette
- `steps`: Liste des étapes de préparation
- `isSideMenuOpen`: État du menu latéral

### Callbacks
- `handleAddIngredient`: Ajouter un ingrédient
- `handleRemoveIngredient`: Supprimer un ingrédient
- `handleUpdateIngredient`: Modifier une quantité
- `handleAddStep`: Ajouter une étape
- `handleRemoveStep`: Supprimer une étape
- `handleUpdateStep`: Modifier une étape
- `handleReorderSteps`: Réorganiser les étapes

## 🎨 Personnalisation

Le widget utilise les variables CSS du thème :
- `--surface-container`: Fond des cartes
- `--primary`: Couleur principale
- `--error`: Couleur d'erreur
- `--outline`: Bordures
- etc.

## 📱 Responsive

- **Desktop**: 2 colonnes côte à côte
- **Mobile**: Colonnes empilées verticalement
- **Side Menu**: Pleine largeur sur mobile, 500px sur desktop
