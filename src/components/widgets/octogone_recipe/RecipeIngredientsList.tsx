"use client";

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { translateProduct, translateUnit } from '@/data/products/octogone_products_translations';

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  unit: string;
  unitCost: number;
}

interface RecipeIngredient {
  productId: string;
  quantity: number;
  unit: string;
}

interface RecipeIngredientsListProps {
  ingredients: RecipeIngredient[];
  products: Product[];
  onAddIngredient: () => void;
  onRemoveIngredient: (productId: string) => void;
  onUpdateIngredient: (productId: string, quantity: number) => void;
  locale?: 'fr' | 'en';
}

export const RecipeIngredientsList: React.FC<RecipeIngredientsListProps> = ({
  ingredients,
  products,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  // Calculer le coût total
  const totalCost = ingredients.reduce((sum, ingredient) => {
    const product = products.find(p => p.id === ingredient.productId);
    if (!product) return sum;
    return sum + (ingredient.quantity * product.unitCost);
  }, 0);

  return (
    <div 
      className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: 'var(--surface-container)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête */}
      <div 
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: 'var(--outline)' }}
      >
        <h4 
          className="text-lg font-semibold"
          style={{ color: 'var(--on-surface)' }}
        >
          {isEnglish ? 'Ingredients' : 'Ingrédients'}
        </h4>
        <OctogoneButton
          variant="primary"
          size="sm"
          onClick={onAddIngredient}
          icon={<Plus size={16} />}
        >
          {isEnglish ? 'Add' : 'Ajouter'}
        </OctogoneButton>
      </div>

      {/* Liste des ingrédients */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {ingredients.length === 0 ? (
          <div 
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'No ingredients yet. Click "Add" to start.' : 'Aucun ingrédient. Cliquez sur "Ajouter" pour commencer.'}
          </div>
        ) : (
          ingredients.map((ingredient) => {
            const product = products.find(p => p.id === ingredient.productId);
            if (!product) return null;

            const ingredientCost = ingredient.quantity * product.unitCost;

            return (
              <div
                key={ingredient.productId}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline)'
                }}
              >
                {/* Quantité éditable */}
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => onUpdateIngredient(ingredient.productId, parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 rounded text-center"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    color: 'var(--on-surface)',
                    border: '1px solid var(--outline)'
                  }}
                  step="0.1"
                  min="0"
                />

                {/* Unité */}
                <span 
                  className="text-sm font-medium w-16"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  {translateUnit(ingredient.unit, locale)}
                </span>

                {/* Nom du produit */}
                <div className="flex-1">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {translateProduct(product.name, locale)}
                  </p>
                </div>

                {/* Coût */}
                <span 
                  className="text-sm font-semibold w-20 text-right"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {ingredientCost.toFixed(2)} $
                </span>

                {/* Bouton supprimer */}
                <button
                  onClick={() => onRemoveIngredient(ingredient.productId)}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{ 
                    backgroundColor: 'var(--error-container)',
                    color: 'var(--on-error-container)'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer avec coût total */}
      <div 
        className="p-4 border-t"
        style={{ 
          backgroundColor: 'var(--surface-variant)',
          borderColor: 'var(--outline)'
        }}
      >
        <div className="flex items-center justify-between">
          <span 
            className="text-lg font-semibold"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Total Cost' : 'Coût total'}
          </span>
          <span 
            className="text-2xl font-bold"
            style={{ color: 'var(--primary)' }}
          >
            {totalCost.toFixed(2)} $
          </span>
        </div>
      </div>
    </div>
  );
};
