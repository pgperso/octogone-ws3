"use client";

import React, { useState, useEffect } from 'react';
import { Delete, Check, ChevronUp, ChevronDown } from 'lucide-react';
import { ProductCard } from './ProductCard';

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

interface InventoryCalculatorProps {
  selectedProduct: Product | null;
  currentQuantity: number;
  onSave: (productId: string, quantity: number) => void;
  onNavigateNext?: () => void;
  onNavigatePrevious?: () => void;
  locale?: 'fr' | 'en';
}

export const InventoryCalculator: React.FC<InventoryCalculatorProps> = ({
  selectedProduct,
  currentQuantity,
  onSave,
  onNavigateNext,
  onNavigatePrevious,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [displayValue, setDisplayValue] = useState('0');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string>('');

  // Réinitialiser quand le produit change
  useEffect(() => {
    if (selectedProduct) {
      setDisplayValue(currentQuantity > 0 ? currentQuantity.toString() : '0');
      setSelectedUnit(selectedProduct.unit);
      setIsEditing(false);
    }
  }, [selectedProduct, currentQuantity]);

  const handleNumberClick = (num: string) => {
    setIsEditing(true);
    if (displayValue === '0') {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleDecimalClick = () => {
    setIsEditing(true);
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleBackspace = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedProduct) {
      const quantity = parseFloat(displayValue) || 0;
      onSave(selectedProduct.id, quantity);
      setIsEditing(false);
    }
  };

  const totalValue = selectedProduct 
    ? (parseFloat(displayValue) || 0) * selectedProduct.unitCost 
    : 0;

  return (
    <div className="flex flex-col h-full p-6">
      {/* Carte produit */}
      {selectedProduct ? (
        <ProductCard 
          product={selectedProduct} 
          locale={locale}
          currentQuantity={parseFloat(displayValue) || 0}
          onAddToOrder={() => {
            // Fonction pour ajouter à la commande (à implémenter)
            console.log('Ajouter à la commande:', selectedProduct.name);
          }}
        />
      ) : (
        <div className="mb-6">
          <p 
            className="text-sm text-center py-8"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'Select a product to start' : 'Sélectionnez un produit pour commencer'}
          </p>
        </div>
      )}

      {/* Affichage quantité avec sélecteur d'unités */}
      <div 
        className="mb-6 p-4 rounded-lg"
        style={{ backgroundColor: 'var(--surface-variant)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <div 
            className="text-4xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {displayValue}
          </div>
          {selectedProduct && selectedProduct.availableUnits && selectedProduct.availableUnits.length > 1 && (
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="ml-4 px-3 py-2 rounded-lg text-lg font-semibold border-2 focus:outline-none cursor-pointer"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--primary)',
                color: 'var(--on-surface)'
              }}
            >
              {selectedProduct.availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          )}
          {selectedProduct && (!selectedProduct.availableUnits || selectedProduct.availableUnits.length <= 1) && (
            <span className="ml-4 text-2xl font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
              {selectedUnit}
            </span>
          )}
        </div>
        <div 
          className="text-lg text-right"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          {isEnglish ? 'Value:' : 'Valeur:'} {totalValue.toFixed(2)} $
        </div>
      </div>

      {/* Calculatrice */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={!selectedProduct}
            className="p-4 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface)'
            }}
          >
            {num}
          </button>
        ))}
        
        <button
          onClick={handleDecimalClick}
          disabled={!selectedProduct}
          className="p-4 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface)'
          }}
        >
          .
        </button>
        
        <button
          onClick={() => handleNumberClick('0')}
          disabled={!selectedProduct}
          className="p-4 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface)'
          }}
        >
          0
        </button>
        
        <button
          onClick={handleBackspace}
          disabled={!selectedProduct}
          className="p-4 rounded-lg transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--error-container)',
            color: 'var(--on-error-container)'
          }}
        >
          <Delete className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Boutons d'action */}
      <div className="mt-auto flex gap-3">
        {/* Bouton Ajouter - prend tout l'espace disponible */}
        <button
          onClick={handleSave}
          disabled={!selectedProduct || !isEditing}
          className="flex-1 p-4 rounded-lg font-bold text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg cursor-pointer disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)'
          }}
        >
          <Check className="w-6 h-6" />
          {isEnglish ? 'Add' : 'Ajouter'}
        </button>

        {/* Boutons de navigation - carrés */}
        <div className="flex flex-col gap-3">
          {/* Bouton Précédent */}
          <button
            onClick={onNavigatePrevious}
            disabled={!onNavigatePrevious}
            className="w-12 h-12 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--secondary-container)',
              color: 'var(--on-secondary-container)'
            }}
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Bouton Suivant */}
          <button
            onClick={onNavigateNext}
            disabled={!onNavigateNext}
            className="w-12 h-12 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--secondary-container)',
              color: 'var(--on-secondary-container)'
            }}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
