# 📊 Système de Données Octogone

## Architecture

Ce système gère les données pour 3 widgets interconnectés :
- **Widget Inventory** (actuel)
- **Widget Recipes** (futur)
- **Widget Dashboard** (futur)

```
data/
├── products/
│   ├── octogone_products_data.json       ← SOURCE CENTRALE (54 produits)
│   ├── octogone_products_translations.ts ← Traductions FR/EN
│   └── recipes-reference.md              ← Documentation
└── recipes/
    └── octogone_recipes_data.json        ← 4 recettes (référence les produits)
```

## 🔗 Intégrité Référentielle

### Produits → Recettes
Les produits déclarent dans quelles recettes ils sont utilisés :

```json
{
  "id": "prod-001",
  "name": "Bœuf haché",
  "enrichment": {
    "recipes": ["recipe-001"],           // ← Recettes qui utilisent ce produit
    "recipe_role": "protein",            // ← Rôle dans les recettes
    "pairs_well_with": ["prod-006"]      // ← Suggestions de produits complémentaires
  }
}
```

### Recettes → Produits
Les recettes référencent les produits via `product_id` :

```json
{
  "id": "recipe-001",
  "name": "Cheeseburger Suprême",
  "ingredients": [
    {
      "product_id": "prod-001",  // ← Référence vers le produit
      "quantity": 150,
      "unit": "g"
    }
  ]
}
```

## ✅ Validation

### Exécuter la validation

```bash
npm run validate:data
```

### Ce qui est vérifié

1. ✅ Tous les `product_id` dans les recettes existent
2. ✅ Tous les `recipes` dans l'enrichment existent
3. ✅ Tous les `pairs_well_with` pointent vers des produits valides
4. ✅ Cohérence bidirectionnelle produits ↔ recettes
5. ✅ Unités valides et compatibles

### Exemple de sortie

```
🚀 Démarrage de la validation de l'intégrité des données

🔍 Validation des références produits dans les recettes...
🔍 Validation des références recettes dans les produits...
🔍 Validation des suggestions de produits complémentaires...
🔍 Validation de la cohérence bidirectionnelle...
🔍 Validation des unités dans les recettes...

============================================================
✅ Aucune erreur détectée ! Les données sont cohérentes.

📊 Statistiques:
   Produits: 54
   Recettes: 4
   Produits enrichis: 16
   Ingrédients total dans recettes: 30
```

## 📝 Règles à Suivre

### ⚠️ NE JAMAIS

1. ❌ Modifier les champs de base des produits sans validation
2. ❌ Supprimer un produit sans vérifier les recettes
3. ❌ Utiliser un `product_id` qui n'existe pas
4. ❌ Utiliser une unité non valide (kg, g, L, mL, un, lb, oz)

### ✅ TOUJOURS

1. ✅ Exécuter `npm run validate:data` après modification
2. ✅ Vérifier que le widget d'inventaire fonctionne
3. ✅ Maintenir la cohérence bidirectionnelle
4. ✅ Documenter les nouveaux produits/recettes

## 🎯 Utilisation par Widget

### Widget Inventory (actuel)
```typescript
import productsData from '@/data/products/octogone_products_data.json';

// Lit uniquement les champs de base
const products = productsData.products;
```

### Widget Recipes (futur)
```typescript
import recipesData from '@/data/recipes/octogone_recipes_data.json';
import productsData from '@/data/products/octogone_products_data.json';

// Récupère une recette avec ses produits
const recipe = recipesData.recipes[0];
const ingredients = recipe.ingredients.map(ing => {
  const product = productsData.products.find(p => p.id === ing.product_id);
  return { ...ing, product };
});
```

### Widget Dashboard (futur)
```typescript
import productsData from '@/data/products/octogone_products_data.json';
import recipesData from '@/data/recipes/octogone_recipes_data.json';

// Produits sous le minimum
const lowStock = productsData.products.filter(p => 
  p.theoreticalQuantity < p.minInventory
);

// Recettes réalisables avec le stock actuel
const availableRecipes = recipesData.recipes.filter(recipe => {
  return recipe.ingredients.every(ing => {
    const product = productsData.products.find(p => p.id === ing.product_id);
    return product && product.theoreticalQuantity > 0;
  });
});
```

## 🔄 Workflow de Modification

### Ajouter un nouveau produit

1. Ajouter dans `octogone_products_data.json`
2. Ajouter traduction dans `octogone_products_translations.ts`
3. Si utilisé dans une recette, ajouter `enrichment`
4. Exécuter `npm run validate:data`
5. Tester le widget d'inventaire

### Ajouter une nouvelle recette

1. Ajouter dans `octogone_recipes_data.json`
2. Mettre à jour l'`enrichment` des produits utilisés
3. Exécuter `npm run validate:data`
4. Vérifier la cohérence bidirectionnelle

### Supprimer un produit

1. Vérifier qu'aucune recette ne l'utilise
2. Supprimer de `octogone_products_data.json`
3. Supprimer la traduction
4. Exécuter `npm run validate:data`

## 📚 Documentation Complète

- `recipes-reference.md` : Liste détaillée des recettes et ingrédients
- `validate-data-integrity.ts` : Code source du validateur
- Ce fichier : Guide d'utilisation

## 🆘 En cas d'erreur

Si la validation échoue :

1. Lire attentivement le message d'erreur
2. Identifier le fichier et la ligne concernés
3. Corriger la référence invalide
4. Re-exécuter `npm run validate:data`
5. Si le problème persiste, vérifier la cohérence bidirectionnelle

## 🚀 Prochaines Étapes

- [ ] Créer le Widget Recipes
- [ ] Créer le Widget Dashboard
- [ ] Ajouter plus de recettes
- [ ] Implémenter le calcul automatique des coûts de recettes
- [ ] Ajouter des suggestions intelligentes de recettes selon le stock
