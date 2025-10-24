"use client";

import React from 'react';
import Image from 'next/image';
import { Plus, Trash2, ImageIcon } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { OctogoneUnitSelector } from '@/components/ui/octogone-unit-selector';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';
import { RecipeMultiplierToggle } from './RecipeMultiplierToggle';
import { translateProduct, translateUnit } from '@/data/products/octogone_products_translations';
import { getProductImage } from '@/utils/productImageMapping';

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  unit: string;
  availableUnits?: string[];
  unitCost: number;
  image?: string;
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
  onUpdateIngredient: (productId: string, quantity: number, unit?: string) => void;
  isMultiplierView: boolean;
  multiplier: number;
  onToggleMultiplier: (enabled: boolean) => void;
  onMultiplierChange: (value: number) => void;
  locale?: 'fr' | 'en';
}

export const RecipeIngredientsList: React.FC<RecipeIngredientsListProps> = ({
  ingredients,
  products,
  onAddIngredient,
  onRemoveIngredient,
  onUpdateIngredient,
  isMultiplierView,
  multiplier,
  onToggleMultiplier,
  onMultiplierChange,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  // Fonction de conversion d'unités vers l'unité de base du produit
  const convertToBaseUnit = (quantity: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return quantity;

    // Conversions de poids
    const weightConversions: Record<string, number> = {
      'kg': 1,
      'g': 0.001,
      'lb': 0.453592,
      'oz': 0.0283495
    };

    // Conversions de volume
    const volumeConversions: Record<string, number> = {
      'L': 1,
      'mL': 0.001
    };

    // Si les deux unités sont dans le même système
    if (weightConversions[fromUnit] && weightConversions[toUnit]) {
      return (quantity * weightConversions[fromUnit]) / weightConversions[toUnit];
    }
    if (volumeConversions[fromUnit] && volumeConversions[toUnit]) {
      return (quantity * volumeConversions[fromUnit]) / volumeConversions[toUnit];
    }

    // Si pas de conversion possible, retourner la quantité telle quelle
    return quantity;
  };

  // Calculer le coût d'un ingrédient avec conversion d'unité
  const calculateIngredientCost = (ingredient: RecipeIngredient, product: Product): number => {
    const convertedQuantity = convertToBaseUnit(ingredient.quantity, ingredient.unit, product.unit);
    return convertedQuantity * product.unitCost;
  };

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
        className="p-4 border-b"
        style={{ borderColor: 'var(--outline)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 
              className="text-lg font-semibold"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Ingredients' : 'Ingrédients'}
            </h4>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: 'var(--secondary-container)',
                color: 'var(--on-secondary-container)'
              }}
            >
              {ingredients.length}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Toggle multiplicateur */}
            <RecipeMultiplierToggle
              isMultiplierView={isMultiplierView}
              multiplier={multiplier}
              onToggle={onToggleMultiplier}
              onMultiplierChange={onMultiplierChange}
              locale={locale}
            />
            
            {/* Bouton Ajouter (désactivé en mode multiplier) */}
            <OctogoneButton
              variant="primary"
              size="sm"
              onClick={onAddIngredient}
              icon={<Plus size={16} />}
              disabled={isMultiplierView}
            >
              {isEnglish ? 'Add' : 'Ajouter'}
            </OctogoneButton>
          </div>
        </div>
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

            // Quantité affichée (multipliée si vue multiplicateur activée)
            const displayedQuantity = isMultiplierView ? ingredient.quantity * multiplier : ingredient.quantity;
            
            const ingredientCost = calculateIngredientCost(ingredient, product);

            const unitOptions = (product.availableUnits || [product.unit]).map(unit => ({
              value: unit,
              label: translateUnit(unit, locale)
            }));

            // Vue Multiplication (lecture seule)
            if (isMultiplierView) {
              return (
                <div key={ingredient.productId} className="flex items-center gap-3">
                  {/* Image du produit à gauche (cachée sur mobile) */}
                  <div className="hidden md:block flex-shrink-0">
                    <div 
                      className="w-16 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'var(--surface-variant)',
                        border: '1px solid var(--outline)',
                        alignSelf: 'stretch'
                      }}
                    >
                      {(product.image || getProductImage(product.name)) !== '/products/placeholder.avif' ? (
                        <Image
                          src={product.image || getProductImage(product.name)}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <ImageIcon size={24} style={{ color: 'var(--on-surface-variant)', opacity: 0.3 }} />
                      )}
                    </div>
                  </div>

                  {/* Row du produit */}
                  <div
                    className="flex items-center justify-between p-3 rounded-lg flex-1"
                    style={{ 
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--outline)'
                    }}
                  >
                    {/* Nom du produit */}
                    <p 
                      className="text-sm font-medium flex-1"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {translateProduct(product.name, locale)}
                    </p>

                  {/* Quantité (texte simple) */}
                  <p 
                    className="text-sm font-bold mx-4"
                    style={{ color: 'var(--primary)' }}
                  >
                    {displayedQuantity.toFixed(2).replace(/\.?0+$/, '')} {translateUnit(ingredient.unit, locale)}
                  </p>

                  {/* Coût */}
                  <span 
                    className="text-sm font-semibold w-20 text-right"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {(ingredientCost * multiplier).toFixed(2)} $
                  </span>
                  </div>
                </div>
              );
            }

            // Vue Originale (éditable)
            return (
              <div key={ingredient.productId} className="flex items-stretch gap-3">
                {/* Image du produit à gauche (cachée sur mobile) */}
                <div className="hidden md:flex flex-shrink-0">
                  <div 
                    className="w-16 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ 
                      backgroundColor: 'var(--surface-variant)',
                      border: '1px solid var(--outline)',
                      alignSelf: 'stretch'
                    }}
                  >
                    {(product.image || getProductImage(product.name)) !== '/products/placeholder.avif' ? (
                      <Image
                        src={product.image || getProductImage(product.name)}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <ImageIcon size={24} style={{ color: 'var(--on-surface-variant)', opacity: 0.3 }} />
                    )}
                  </div>
                </div>

                {/* Row du produit */}
                <div
                  className="flex items-stretch gap-3 p-3 rounded-lg flex-1"
                  style={{ 
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--outline)'
                  }}
                >
                  {/* Nom du produit - À gauche */}
                  <div className="flex-1 min-w-0 flex items-center">
                    <p 
                      className="text-sm font-medium truncate"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {translateProduct(product.name, locale)}
                    </p>
                  </div>

                {/* Sélecteur de quantité avec OctogoneQuantitySelector */}
                <OctogoneQuantitySelector
                  value={ingredient.quantity}
                  onChange={(newQuantity) => onUpdateIngredient(ingredient.productId, newQuantity)}
                  min={0}
                  step={0.1}
                  size="sm"
                />

                {/* Sélecteur d'unité avec OctogoneUnitSelector */}
                <OctogoneUnitSelector
                  options={unitOptions}
                  value={ingredient.unit}
                  onChange={(newUnit: string) => onUpdateIngredient(ingredient.productId, ingredient.quantity, newUnit)}
                  size="sm"
                />

                {/* Coût */}
                <div className="flex items-center">
                  <span 
                    className="text-sm font-semibold w-20 text-right"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {ingredientCost.toFixed(2)} $
                  </span>
                </div>

                {/* Bouton supprimer */}
                <button
                  onClick={() => onRemoveIngredient(ingredient.productId)}
                  className="p-2 rounded-lg transition-all flex-shrink-0 cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--error-container)',
                    color: 'var(--on-error-container)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--error)';
                    e.currentTarget.style.color = 'var(--on-error)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--error-container)';
                    e.currentTarget.style.color = 'var(--on-error-container)';
                  }}
                >
                  <Trash2 size={16} />
                </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
