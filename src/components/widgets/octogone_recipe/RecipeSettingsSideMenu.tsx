"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';
import { OctogoneDropdownButton } from '@/components/ui/octogone-dropdown-button';

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

  // Détecter si des changements ont été faits
  const hasChanges = 
    name !== recipeName ||
    price !== sellingPrice ||
    foodCost !== targetFoodCost ||
    cat !== category;

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
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 p-4">
          {/* Overlay avec animation de fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Side Menu avec animation de glissement et effet flottant */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="absolute top-4 right-4 bottom-4 w-[calc(100%-2rem)] md:w-[450px] flex flex-col rounded-2xl overflow-hidden z-40"
            style={{ 
              backgroundColor: 'var(--surface-container)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* En-tête */}
            <div 
              className="flex items-center justify-between p-4 border-b"
              style={{ 
                backgroundColor: 'var(--primary)',
                borderColor: 'var(--outline)'
              }}
            >
              <h3 
                className="text-xl font-semibold"
                style={{ color: 'var(--on-primary-container)' }}
              >
                {isEnglish ? 'Recipe Settings' : 'Paramètres de la Recette'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-all cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--secondary-container)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
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
          <OctogoneQuantitySelector
            value={price}
            onChange={setPrice}
            min={0}
            max={999}
            step={0.25}
            size="md"
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
          <OctogoneQuantitySelector
            value={foodCost}
            onChange={setFoodCost}
            min={0}
            max={100}
            step={1}
            size="md"
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
          <OctogoneDropdownButton
            options={[
              { value: 'appetizer', label: isEnglish ? 'Appetizer' : 'Entrée' },
              { value: 'main', label: isEnglish ? 'Main Course' : 'Plat Principal' },
              { value: 'dessert', label: isEnglish ? 'Dessert' : 'Dessert' },
              { value: 'drink', label: isEnglish ? 'Drink' : 'Boisson' },
              { value: 'side', label: isEnglish ? 'Side Dish' : 'Accompagnement' }
            ]}
            value={cat}
            onChange={setCat}
            variant="outline"
            size="md"
          />
        </div>
              </div>
            </div>

            {/* Boutons fixés en bas - Affichés seulement si changements */}
            {hasChanges && (
              <div 
                className="p-4 border-t"
                style={{ 
                  backgroundColor: 'var(--surface-container)',
                  borderColor: 'var(--outline)'
                }}
              >
                <div className="flex gap-3">
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
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
