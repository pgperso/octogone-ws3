"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface RecipeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeName: string;
  sellingPrice: number;
  portions: number;
  targetFoodCost: number;
  category: string;
  onSave: (settings: {
    recipeName: string;
    sellingPrice: number;
    portions: number;
    targetFoodCost: number;
    category: string;
  }) => void;
  locale?: 'fr' | 'en';
}

export const RecipeSettingsModal: React.FC<RecipeSettingsModalProps> = ({
  isOpen,
  onClose,
  recipeName: initialRecipeName,
  sellingPrice: initialSellingPrice,
  portions: initialPortions,
  targetFoodCost: initialTargetFoodCost,
  category: initialCategory,
  onSave,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  // États locaux pour le formulaire
  const [recipeName, setRecipeName] = useState(initialRecipeName);
  const [sellingPrice, setSellingPrice] = useState(initialSellingPrice);
  const [portions, setPortions] = useState(initialPortions);
  const [targetFoodCost, setTargetFoodCost] = useState(initialTargetFoodCost);
  const [category, setCategory] = useState(initialCategory);

  // Réinitialiser les valeurs quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setRecipeName(initialRecipeName);
      setSellingPrice(initialSellingPrice);
      setPortions(initialPortions);
      setTargetFoodCost(initialTargetFoodCost);
      setCategory(initialCategory);
    }
  }, [isOpen, initialRecipeName, initialSellingPrice, initialPortions, initialTargetFoodCost, initialCategory]);

  const handleSave = () => {
    onSave({
      recipeName,
      sellingPrice,
      portions,
      targetFoodCost,
      category
    });
    onClose();
  };

  const categories = [
    { value: 'appetizer', label: isEnglish ? 'Appetizer' : 'Entrée' },
    { value: 'main', label: isEnglish ? 'Main Course' : 'Plat Principal' },
    { value: 'side', label: isEnglish ? 'Side Dish' : 'Accompagnement' },
    { value: 'dessert', label: isEnglish ? 'Dessert' : 'Dessert' },
    { value: 'beverage', label: isEnglish ? 'Beverage' : 'Boisson' },
    { value: 'other', label: isEnglish ? 'Other' : 'Autre' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--scrim)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)'
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{
                backgroundColor: 'var(--surface-container)',
                borderBottom: '1px solid var(--outline)'
              }}
            >
              <h2
                className="text-xl font-bold"
                style={{ color: 'var(--on-surface)' }}
              >
                {isEnglish ? 'Recipe Settings' : 'Paramètres de la Recette'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--on-surface-variant)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-5">
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
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-base transition-all"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    color: 'var(--on-surface)',
                    border: '2px solid var(--outline)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline)';
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-base transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    color: 'var(--on-surface)',
                    border: '2px solid var(--outline)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline)';
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid pour les champs numériques */}
              <div className="grid grid-cols-2 gap-4">
                {/* Nombre de portions */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {isEnglish ? 'Yield (portions)' : 'Rendement (portions)'}
                  </label>
                  <input
                    type="number"
                    value={portions}
                    onChange={(e) => setPortions(parseFloat(e.target.value) || 1)}
                    min="1"
                    step="1"
                    className="w-full px-4 py-2.5 rounded-lg text-base transition-all"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface)',
                      border: '2px solid var(--outline)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--outline)';
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
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2.5 rounded-lg text-base transition-all"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface)',
                      border: '2px solid var(--outline)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--outline)';
                    }}
                  />
                </div>
              </div>

              {/* Cible Food Cost */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish ? 'Target Food Cost (%)' : 'Cible Food Cost (%)'}
                </label>
                <input
                  type="number"
                  value={targetFoodCost}
                  onChange={(e) => setTargetFoodCost(parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="1"
                  className="w-full px-4 py-2.5 rounded-lg text-base transition-all"
                  style={{
                    backgroundColor: 'var(--surface-variant)',
                    color: 'var(--on-surface)',
                    border: '2px solid var(--outline)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--outline)';
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-end gap-3"
              style={{
                backgroundColor: 'var(--surface-container)',
                borderTop: '1px solid var(--outline)'
              }}
            >
              <OctogoneButton
                variant="secondary"
                size="md"
                onClick={onClose}
              >
                {isEnglish ? 'Cancel' : 'Annuler'}
              </OctogoneButton>
              <OctogoneButton
                variant="primary"
                size="md"
                onClick={handleSave}
              >
                {isEnglish ? 'Save' : 'Enregistrer'}
              </OctogoneButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
