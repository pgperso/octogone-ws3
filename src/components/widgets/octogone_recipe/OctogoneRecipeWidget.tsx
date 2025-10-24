"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Settings } from 'lucide-react';
import { RecipeIngredientsList } from './RecipeIngredientsList';
import { RecipeSteps } from './RecipeSteps';
import { ProductSideMenu } from './ProductSideMenu';
import { RecipeSettingsModal } from './RecipeSettingsModal';
import { OctogoneButton } from '@/components/ui/octogone-button';
import inventoryData from '@/data/products/octogone_products_data.json';

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  unit: string;
  availableUnits?: string[];
  unitCost: number;
  image?: string;
  storage?: string;
  minInventory?: number;
  initialQuantity?: number;
  theoreticalQuantity?: number;
  isRecipe?: boolean;
  nonInventoriable?: boolean;
}

interface RecipeIngredient {
  productId: string;
  quantity: number;
  unit: string;
}

interface RecipeStep {
  id: string;
  order: number;
  description: string;
}

interface OctogoneRecipeWidgetProps {
  locale?: 'fr' | 'en';
}

export const OctogoneRecipeWidget: React.FC<OctogoneRecipeWidgetProps> = ({ locale = 'fr' }) => {
  const isEnglish = locale === 'en';
  
  // Informations de la recette
  const [recipeName, setRecipeName] = useState('Cheeseburger Supreme');
  const [recipeImage] = useState('/products/supreme-cheesburger.avif');
  const [targetFoodCost, setTargetFoodCost] = useState(30); // Cible en %
  const [sellingPrice, setSellingPrice] = useState(15.99); // Prix de vente
  const [portions, setPortions] = useState(1); // Nombre de portions
  const [category, setCategory] = useState('main'); // Catégorie
  
  // État du modal de paramètres
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // État pour les ingrédients de la recette
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([
    { productId: 'prod-022', quantity: 2, unit: 'kg' }, // Farine
    { productId: 'prod-008', quantity: 0.5, unit: 'kg' }, // Beurre
    { productId: 'prod-031', quantity: 6, unit: 'unité' }, // Œufs
    { productId: 'prod-041', quantity: 0.3, unit: 'kg' }, // Sucre
  ]);

  // État pour les étapes de préparation
  const [steps, setSteps] = useState<RecipeStep[]>([
    { id: 'step-1', order: 1, description: isEnglish ? 'Preheat oven to 180°C (350°F)' : 'Préchauffer le four à 180°C (350°F)' },
    { id: 'step-2', order: 2, description: isEnglish ? 'Mix flour and butter until smooth' : 'Mélanger la farine et le beurre jusqu\'à obtenir une texture lisse' },
    { id: 'step-3', order: 3, description: isEnglish ? 'Add eggs one by one while mixing' : 'Ajouter les œufs un par un en mélangeant' },
    { id: 'step-4', order: 4, description: isEnglish ? 'Incorporate sugar gradually' : 'Incorporer le sucre progressivement' },
    { id: 'step-5', order: 5, description: isEnglish ? 'Bake for 25-30 minutes' : 'Cuire au four pendant 25-30 minutes' },
  ]);

  // État pour le side menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const products = inventoryData.products as Product[];

  // Ajouter un ingrédient
  const handleAddIngredient = (productId: string, quantity: number, unit: string) => {
    const existingIngredient = ingredients.find(ing => ing.productId === productId);
    
    if (existingIngredient) {
      // Mettre à jour la quantité si l'ingrédient existe déjà
      setIngredients(ingredients.map(ing => 
        ing.productId === productId 
          ? { ...ing, quantity: ing.quantity + quantity }
          : ing
      ));
    } else {
      // Ajouter un nouvel ingrédient
      setIngredients([...ingredients, { productId, quantity, unit }]);
    }
  };

  // Ajouter plusieurs ingrédients en une seule fois
  const handleAddMultipleIngredients = (newIngredients: Array<{ productId: string; quantity: number; unit: string }>) => {
    setIngredients(prevIngredients => {
      const updatedIngredients = [...prevIngredients];
      
      newIngredients.forEach(newIng => {
        const existingIndex = updatedIngredients.findIndex(ing => ing.productId === newIng.productId);
        
        if (existingIndex >= 0) {
          // Mettre à jour la quantité si existe
          updatedIngredients[existingIndex] = {
            ...updatedIngredients[existingIndex],
            quantity: updatedIngredients[existingIndex].quantity + newIng.quantity
          };
        } else {
          // Ajouter nouveau
          updatedIngredients.push(newIng);
        }
      });
      
      return updatedIngredients;
    });
  };

  // Supprimer un ingrédient
  const handleRemoveIngredient = (productId: string) => {
    setIngredients(ingredients.filter(ing => ing.productId !== productId));
  };

  // Mettre à jour la quantité et/ou l'unité d'un ingrédient
  const handleUpdateIngredient = (productId: string, quantity: number, unit?: string) => {
    setIngredients(ingredients.map(ing => 
      ing.productId === productId 
        ? { ...ing, quantity, ...(unit && { unit }) }
        : ing
    ));
  };

  // Ajouter une étape
  const handleAddStep = (description: string) => {
    const newStep: RecipeStep = {
      id: `step-${Date.now()}`,
      order: steps.length + 1,
      description
    };
    setSteps([...steps, newStep]);
  };

  // Supprimer une étape
  const handleRemoveStep = (stepId: string) => {
    const updatedSteps = steps
      .filter(step => step.id !== stepId)
      .map((step, index) => ({ ...step, order: index + 1 }));
    setSteps(updatedSteps);
  };

  // Mettre à jour une étape
  const handleUpdateStep = (stepId: string, description: string) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, description }
        : step
    ));
  };

  // Réorganiser les étapes
  const handleReorderSteps = (stepId: string, direction: 'up' | 'down') => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return;

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;

    if (targetIndex < 0 || targetIndex >= steps.length) return;

    [newSteps[stepIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[stepIndex]];

    const reorderedSteps = newSteps.map((step, index) => ({
      ...step,
      order: index + 1
    }));

    setSteps(reorderedSteps);
  };

  // Calculer le coût total des ingrédients
  const calculateTotalCost = (): number => {
    return ingredients.reduce((total, ingredient) => {
      const product = products.find(p => p.id === ingredient.productId);
      if (!product) return total;
      return total + (ingredient.quantity * product.unitCost);
    }, 0);
  };

  // Calculer le coût par portion
  const calculateCostPerPortion = (): number => {
    const totalCost = calculateTotalCost();
    return portions > 0 ? totalCost / portions : totalCost;
  };

  // Calculer le food cost en pourcentage
  const calculateFoodCostPercentage = (): number => {
    const costPerPortion = calculateCostPerPortion();
    if (sellingPrice === 0) return 0;
    return (costPerPortion / sellingPrice) * 100;
  };

  // Calculer la marge brute par portion
  const calculateGrossMargin = (): number => {
    return sellingPrice - calculateCostPerPortion();
  };

  // Sauvegarder les paramètres de la recette
  const handleSaveSettings = (settings: {
    recipeName: string;
    sellingPrice: number;
    portions: number;
    targetFoodCost: number;
    category: string;
  }) => {
    setRecipeName(settings.recipeName);
    setSellingPrice(settings.sellingPrice);
    setPortions(settings.portions);
    setTargetFoodCost(settings.targetFoodCost);
    setCategory(settings.category);
  };

  const totalCost = calculateTotalCost();
  const costPerPortion = calculateCostPerPortion();
  const foodCostPercentage = calculateFoodCostPercentage();
  const grossMargin = calculateGrossMargin();

  return (
    <div 
      className="w-full h-full rounded-xl overflow-hidden flex flex-col relative"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête avec avatar Marc - Même structure que widget inventaire */}
      <div 
        className="px-6 py-6"
        style={{ 
          backgroundColor: 'var(--surface-container)',
          borderBottom: '1px solid var(--outline)'
        }}
      >
        {/* Desktop: Avatar + Bouton en ligne */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
              style={{ 
                border: '2px solid var(--primary)',
                padding: '2px'
              }}
            >
              <Image
                src="/images/avatars/vincent.avif"
                alt="Vincent"
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center h-16">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Hello Vincent' : 'Bonjour Vincent'}
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                {isEnglish ? 'Executive Chef' : 'Chef Exécutif'}
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Bistro 8
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: Avatar */}
        <div className="lg:hidden">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
              style={{ 
                border: '2px solid var(--primary)',
                padding: '2px'
              }}
            >
              <Image
                src="/images/avatars/vincent.avif"
                alt="Vincent"
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center h-16">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Hello Vincent' : 'Bonjour Vincent'}
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                {isEnglish ? 'Executive Chef' : 'Chef Exécutif'}
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Bistro 8
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Header de la recette - Photo, Nom et Métriques */}
      <div 
        className="px-6 py-4"
        style={{ 
          backgroundColor: 'var(--surface-container-low)',
          borderBottom: '1px solid var(--outline)'
        }}
      >
        <div className="flex items-center gap-6">
          {/* Image de la recette */}
          <div 
            className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
            style={{ 
              border: '2px solid var(--outline)'
            }}
          >
            <Image
              src={recipeImage}
              alt={recipeName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nom de la recette */}
          <div className="flex-1">
            <h3 
              className="text-2xl font-bold"
              style={{ color: 'var(--on-surface)' }}
            >
              {recipeName}
            </h3>
            <p 
              className="text-sm mt-1"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish ? 'Recipe' : 'Recette'}
            </p>
          </div>

          {/* Métriques */}
          <div className="flex items-center gap-6">
            {/* Coût par portion */}
            <div className="text-right">
              <p 
                className="text-xs font-medium mb-1"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                {isEnglish ? 'Cost/Portion' : 'Coût/Portion'}
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: 'var(--on-surface)' }}
              >
                {costPerPortion.toFixed(2)} $
              </p>
            </div>

            {/* Food Cost */}
            <div className="text-right">
              <p 
                className="text-xs font-medium mb-1"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                Food Cost
              </p>
              <div className="flex items-baseline gap-2">
                <p 
                  className="text-2xl font-bold"
                  style={{ 
                    color: foodCostPercentage <= targetFoodCost ? 'var(--success)' : 'var(--error)'
                  }}
                >
                  {foodCostPercentage.toFixed(1)}%
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  / {targetFoodCost}%
                </p>
              </div>
            </div>

            {/* Bouton Paramètres */}
            <OctogoneButton
              variant="secondary"
              size="md"
              onClick={() => setIsSettingsOpen(true)}
              icon={<Settings size={18} />}
            >
              {isEnglish ? 'Settings' : 'Paramètres'}
            </OctogoneButton>
          </div>
        </div>
      </div>

      {/* Contenu principal - 2 colonnes */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Colonne gauche - Ingrédients */}
        <RecipeIngredientsList
          ingredients={ingredients}
          products={products}
          onAddIngredient={() => setIsSideMenuOpen(true)}
          onRemoveIngredient={handleRemoveIngredient}
          onUpdateIngredient={handleUpdateIngredient}
          locale={locale}
        />

        {/* Colonne droite - Étapes */}
        <RecipeSteps
          steps={steps}
          onAddStep={handleAddStep}
          onRemoveStep={handleRemoveStep}
          onUpdateStep={handleUpdateStep}
          onReorderStep={handleReorderSteps}
          locale={locale}
        />
      </div>

      {/* Side Menu pour ajouter des produits - Au niveau du conteneur principal */}
      {isSideMenuOpen && (
        <ProductSideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
          products={products}
          onAddProduct={handleAddIngredient}
          onAddMultipleProducts={handleAddMultipleIngredients}
          addedProductIds={ingredients.map(ing => ing.productId)}
          locale={locale}
        />
      )}

      {/* Modal de paramètres */}
      <RecipeSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        recipeName={recipeName}
        sellingPrice={sellingPrice}
        portions={portions}
        targetFoodCost={targetFoodCost}
        category={category}
        onSave={handleSaveSettings}
        locale={locale}
      />
    </div>
  );
};
