"use client";

import React, { useState, useEffect } from 'react';
import { Delete, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitCost: number;
}

interface InventoryCalculatorProps {
  selectedProduct: Product | null;
  currentQuantity: number;
  onSave: (productId: string, quantity: number) => void;
}

export const InventoryCalculator: React.FC<InventoryCalculatorProps> = ({
  selectedProduct,
  currentQuantity,
  onSave
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isEditing, setIsEditing] = useState(false);

  // Réinitialiser quand le produit change
  useEffect(() => {
    if (selectedProduct) {
      setDisplayValue(currentQuantity > 0 ? currentQuantity.toString() : '0');
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

  const handleClear = () => {
    setDisplayValue('0');
    setIsEditing(true);
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

  // Fonction pour annuler - utilisée si besoin
  // const handleCancel = () => {
  //   setDisplayValue(currentQuantity > 0 ? currentQuantity.toString() : '0');
  //   setIsEditing(false);
  //   onCancel();
  // };

  const totalValue = selectedProduct 
    ? (parseFloat(displayValue) || 0) * selectedProduct.unitCost 
    : 0;

  return (
    <div className="flex flex-col h-full p-6">
      {/* Produit sélectionné */}
      <div className="mb-6">
        {selectedProduct ? (
          <div>
            <h3 
              className="text-lg font-semibold mb-1"
              style={{ color: 'var(--on-surface)' }}
            >
              {selectedProduct.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {selectedProduct.category} • {selectedProduct.unitCost.toFixed(2)} $ / {selectedProduct.unit}
            </p>
          </div>
        ) : (
          <p 
            className="text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            Sélectionnez un produit pour commencer
          </p>
        )}
      </div>

      {/* Affichage */}
      <div 
        className="mb-6 p-4 rounded-lg text-right"
        style={{ backgroundColor: 'var(--surface-variant)' }}
      >
        <div 
          className="text-4xl font-bold mb-2"
          style={{ color: 'var(--on-surface)' }}
        >
          {displayValue} {selectedProduct?.unit || ''}
        </div>
        <div 
          className="text-lg"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          Valeur: {totalValue.toFixed(2)} $
        </div>
      </div>

      {/* Calculatrice */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            disabled={!selectedProduct}
            className="p-4 rounded-lg text-xl font-semibold transition-colors disabled:opacity-50"
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
          className="p-4 rounded-lg transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--error-container)',
            color: 'var(--on-error-container)'
          }}
        >
          <Delete className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Boutons d'action */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button
          onClick={handleClear}
          disabled={!selectedProduct}
          className="p-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface)'
          }}
        >
          Effacer
        </button>
        
        <button
          onClick={handleSave}
          disabled={!selectedProduct || !isEditing}
          className="p-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)'
          }}
        >
          <Check className="w-5 h-5" />
          Enregistrer
        </button>
      </div>
    </div>
  );
};
