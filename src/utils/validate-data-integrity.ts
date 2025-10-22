/**
 * Script de validation de l'intégrité des données
 * Vérifie que les références entre produits et recettes sont cohérentes
 */

import productsData from '@/data/products/octogone_products_data.json';
import recipesData from '@/data/recipes/octogone_recipes_data.json';

interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  context?: string;
}

const errors: ValidationError[] = [];

/**
 * Valide que tous les product_id dans les recettes existent
 */
function validateRecipeProductReferences() {
  console.log('🔍 Validation des références produits dans les recettes...');
  
  const productIds = new Set(productsData.products.map(p => p.id));
  
  recipesData.recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!productIds.has(ingredient.product_id)) {
        errors.push({
          type: 'error',
          message: `Produit introuvable: ${ingredient.product_id}`,
          context: `Recette: ${recipe.id} (${recipe.name})`
        });
      }
    });
  });
}

/**
 * Valide que tous les recipe_id dans l'enrichment des produits existent
 */
function validateProductRecipeReferences() {
  console.log('🔍 Validation des références recettes dans les produits...');
  
  const recipeIds = new Set(recipesData.recipes.map(r => r.id));
  
  productsData.products.forEach(product => {
    if (product.enrichment?.recipes) {
      product.enrichment.recipes.forEach(recipeId => {
        if (!recipeIds.has(recipeId)) {
          errors.push({
            type: 'error',
            message: `Recette introuvable: ${recipeId}`,
            context: `Produit: ${product.id} (${product.name})`
          });
        }
      });
    }
  });
}

/**
 * Valide que tous les pairs_well_with pointent vers des produits valides
 */
function validatePairsWellWith() {
  console.log('🔍 Validation des suggestions de produits complémentaires...');
  
  const productIds = new Set(productsData.products.map(p => p.id));
  
  productsData.products.forEach(product => {
    if (product.enrichment?.pairs_well_with) {
      product.enrichment.pairs_well_with.forEach(pairedId => {
        if (!productIds.has(pairedId)) {
          errors.push({
            type: 'error',
            message: `Produit complémentaire introuvable: ${pairedId}`,
            context: `Produit: ${product.id} (${product.name})`
          });
        }
      });
    }
  });
}

/**
 * Valide la cohérence bidirectionnelle produits ↔ recettes
 */
function validateBidirectionalReferences() {
  console.log('🔍 Validation de la cohérence bidirectionnelle...');
  
  // Créer un map des produits utilisés par chaque recette
  const recipeProducts = new Map<string, Set<string>>();
  
  recipesData.recipes.forEach(recipe => {
    const productSet = new Set<string>();
    recipe.ingredients.forEach(ing => {
      productSet.add(ing.product_id);
    });
    recipeProducts.set(recipe.id, productSet);
  });
  
  // Vérifier que si un produit dit être dans une recette, la recette l'utilise vraiment
  productsData.products.forEach(product => {
    if (product.enrichment?.recipes) {
      product.enrichment.recipes.forEach(recipeId => {
        const productsInRecipe = recipeProducts.get(recipeId);
        if (productsInRecipe && !productsInRecipe.has(product.id)) {
          errors.push({
            type: 'warning',
            message: `Le produit déclare être dans la recette ${recipeId}, mais la recette ne l'utilise pas`,
            context: `Produit: ${product.id} (${product.name})`
          });
        }
      });
    }
  });
  
  // Vérifier que si une recette utilise un produit, le produit le sait
  recipesData.recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      const product = productsData.products.find(p => p.id === ingredient.product_id);
      if (product && product.enrichment?.recipes) {
        if (!product.enrichment.recipes.includes(recipe.id)) {
          errors.push({
            type: 'warning',
            message: `La recette utilise le produit, mais le produit ne le déclare pas`,
            context: `Recette: ${recipe.id} (${recipe.name}), Produit: ${product.id} (${product.name})`
          });
        }
      }
    });
  });
}

/**
 * Valide les unités utilisées dans les recettes
 */
function validateRecipeUnits() {
  console.log('🔍 Validation des unités dans les recettes...');
  
  const validUnits = ['kg', 'g', 'L', 'mL', 'un', 'lb', 'oz'];
  
  recipesData.recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!validUnits.includes(ingredient.unit)) {
        errors.push({
          type: 'error',
          message: `Unité invalide: ${ingredient.unit}`,
          context: `Recette: ${recipe.id} (${recipe.name}), Produit: ${ingredient.product_id}`
        });
      }
      
      // Vérifier que l'unité est compatible avec le produit
      const product = productsData.products.find(p => p.id === ingredient.product_id);
      if (product && product.availableUnits && !product.availableUnits.includes(ingredient.unit)) {
        errors.push({
          type: 'warning',
          message: `L'unité ${ingredient.unit} n'est pas dans les unités disponibles du produit`,
          context: `Recette: ${recipe.id}, Produit: ${product.id} (${product.name})`
        });
      }
    });
  });
}

/**
 * Statistiques générales
 */
function displayStats() {
  console.log('\n📊 Statistiques:');
  console.log(`   Produits: ${productsData.products.length}`);
  console.log(`   Recettes: ${recipesData.recipes.length}`);
  
  const productsWithEnrichment = productsData.products.filter(p => p.enrichment).length;
  console.log(`   Produits enrichis: ${productsWithEnrichment}`);
  
  const totalIngredients = recipesData.recipes.reduce((sum, r) => sum + r.ingredients.length, 0);
  console.log(`   Ingrédients total dans recettes: ${totalIngredients}`);
}

/**
 * Fonction principale
 */
export function validateDataIntegrity(): boolean {
  console.log('🚀 Démarrage de la validation de l\'intégrité des données\n');
  
  validateRecipeProductReferences();
  validateProductRecipeReferences();
  validatePairsWellWith();
  validateBidirectionalReferences();
  validateRecipeUnits();
  
  console.log('\n' + '='.repeat(60));
  
  if (errors.length === 0) {
    console.log('✅ Aucune erreur détectée ! Les données sont cohérentes.');
    displayStats();
    return true;
  } else {
    const errorCount = errors.filter(e => e.type === 'error').length;
    const warningCount = errors.filter(e => e.type === 'warning').length;
    
    console.log(`❌ ${errorCount} erreur(s) et ${warningCount} avertissement(s) détecté(s):\n`);
    
    errors.forEach((error, index) => {
      const icon = error.type === 'error' ? '❌' : '⚠️';
      console.log(`${icon} ${index + 1}. ${error.message}`);
      if (error.context) {
        console.log(`   → ${error.context}`);
      }
      console.log('');
    });
    
    displayStats();
    return errorCount === 0; // Retourne true si seulement des warnings
  }
}

// Exécution si appelé directement
if (require.main === module) {
  const isValid = validateDataIntegrity();
  process.exit(isValid ? 0 : 1);
}
