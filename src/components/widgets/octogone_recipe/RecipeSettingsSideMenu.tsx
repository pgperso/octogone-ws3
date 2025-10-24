"use client";

import React, { useState, useEffect } from 'react';
import { OctogoneSideMenu } from '@/components/ui/octogone-sidemenu';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface RecipeSettingsSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  recipeName: string;
  sellingPrice: number;
  targetFoodCost: number;
  category: string;
  onSave: (settings: {
    recipeName: string;
    sellingPrice: number;
    targetFoodCost: number;
    category: string;
  }) => void;
  locale?: 'fr' | 'en';
}

export const RecipeSettingsSideMenu: React.FC<RecipeSettingsSideMenuProps> = ({
  isOpen,
  onClose,
  recipeName,
  sellingPrice,
  targetFoodCost,
  category,
  onSave,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  
  const [name, setName] = useState(recipeName);
  const [price, setPrice] = useState(sellingPrice);
  const [foodCost, setFoodCost] = useState(targetFoodCost);
  const [cat, setCat] = useState(category);

  useEffect(() => {
    setName(recipeName);
    setPrice(sellingPrice);
    setFoodCost(targetFoodCost);
    setCat(category);
  }, [recipeName, sellingPrice, targetFoodCost, category]);

  const handleSave = () => {
    onSave({
      recipeName: name,
      sellingPrice: price,
      targetFoodCost: foodCost,
      category: cat
    });
    onClose();
  };

  return (
    <OctogoneSideMenu
      isOpen={isOpen}
      onClose={onClose}
      title={isEnglish ? 'Recipe Settings' : 'Paramètres de la Recette'}
      width="450px"
    >
      <div className="space-y-6">
        {/* Nom de la recette */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Recipe Name' : 'Nom de la Recette'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)',
              color: 'var(--on-surface)'
            }}
          />
        </div>

        {/* Prix de vente */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Selling Price ($)' : 'Prix de Vente ($)'}
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)',
              color: 'var(--on-surface)'
            }}
          />
        </div>

        {/* Food Cost cible */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Target Food Cost (%)' : 'Food Cost Cible (%)'}
          </label>
          <input
            type="number"
            step="1"
            value={foodCost}
            onChange={(e) => setFoodCost(parseFloat(e.target.value))}
            className="w-full px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)',
              color: 'var(--on-surface)'
            }}
          />
        </div>

        {/* Catégorie */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Category' : 'Catégorie'}
          </label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-full px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)',
              color: 'var(--on-surface)'
            }}
          >
            <option value="appetizer">{isEnglish ? 'Appetizer' : 'Entrée'}</option>
            <option value="main">{isEnglish ? 'Main Course' : 'Plat Principal'}</option>
            <option value="dessert">{isEnglish ? 'Dessert' : 'Dessert'}</option>
            <option value="drink">{isEnglish ? 'Drink' : 'Boisson'}</option>
            <option value="side">{isEnglish ? 'Side Dish' : 'Accompagnement'}</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex gap-3 pt-4">
          <OctogoneButton
            variant="secondary"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            {isEnglish ? 'Cancel' : 'Annuler'}
          </OctogoneButton>
          <OctogoneButton
            variant="primary"
            size="md"
            onClick={handleSave}
            className="flex-1"
          >
            {isEnglish ? 'Save' : 'Enregistrer'}
          </OctogoneButton>
        </div>
      </div>
    </OctogoneSideMenu>
  );
};
