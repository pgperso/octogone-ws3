"use client";

import React, { useState, useEffect } from 'react';
import { Delete, Check, ChevronUp, ChevronDown, Loader2, EqualNot } from 'lucide-react';
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
  minInventory?: number;
  initialQuantity?: number;
  theoreticalQuantity?: number;
  isRecipe?: boolean;
  nonInventoriable?: boolean;
}

interface InventoryCalculatorProps {
  selectedProduct: Product | null;
  hasExistingEntry: boolean;
  currentInventoryQuantity?: number; // Quantité actuelle dans l'inventaire
  onSave: (productId: string, quantity: number) => void;
  onNavigateNext?: () => void;
  onNavigatePrevious?: () => void;
  onToggleNonInventoriable?: (productId: string) => void;
  locale?: 'fr' | 'en';
}

export const InventoryCalculator: React.FC<InventoryCalculatorProps> = ({
  selectedProduct,
  hasExistingEntry,
  currentInventoryQuantity = 0,
  onSave,
  onNavigateNext,
  onNavigatePrevious,
  onToggleNonInventoriable,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [displayValue, setDisplayValue] = useState('0');
  const [isEditing, setIsEditing] = useState(false);
  // TODO: selectedUnit n'est pas encore utilisé dans la sauvegarde
  // Pour l'implémenter correctement, il faudra :
  // 1. Modifier InventoryItem pour inclure l'unité
  // 2. Passer l'unité à onSave(productId, quantity, unit)
  // 3. Ajouter un système de conversion d'unités
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Réinitialiser quand le produit change
  useEffect(() => {
    if (selectedProduct) {
      setDisplayValue('0');
      setSelectedUnit(selectedProduct.unit);
      setIsEditing(false);
    }
  }, [selectedProduct]); // Dépendance complète pour éviter les warnings

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
    if (selectedProduct && !isSaving) {
      const quantity = parseFloat(displayValue) || 0;
      
      // Étape 1: Montrer le spinner (600ms)
      setIsSaving(true);
      
      setTimeout(() => {
        // Étape 2: Sauvegarder et montrer la confirmation (800ms)
        onSave(selectedProduct.id, quantity);
        setDisplayValue('0');
        setIsEditing(false);
        setIsSaving(false);
        setShowSuccess(true);
        
        // Étape 3: Retour à l'état normal (800ms après)
        setTimeout(() => {
          setShowSuccess(false);
        }, 800);
      }, 600);
    }
  };

  const totalValue = selectedProduct 
    ? (parseFloat(displayValue) || 0) * selectedProduct.unitCost 
    : 0;

  // Si le produit est non-inventoriable, afficher un message
  if (selectedProduct?.nonInventoriable) {
    return (
      <div className="p-6 flex flex-col h-full">
        <ProductCard 
          product={selectedProduct} 
          locale={locale}
          currentQuantity={0}
          onAddToOrder={() => {
            console.log('Ajouter à la commande:', selectedProduct.name);
          }}
        />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <EqualNot 
              className="w-16 h-16 mx-auto mb-4" 
              style={{ color: 'var(--error)' }}
            />
            <p 
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? "Don't count" : 'Ne pas compter'}
            </p>
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish ? 'This product is not tracked in inventory' : 'Ce produit n\'est pas suivi en inventaire'}
            </p>
          </div>
          {onToggleNonInventoriable && (
            <button
              onClick={() => onToggleNonInventoriable(selectedProduct.id)}
              className="px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)'
              }}
            >
              {isEnglish ? 'Enable inventory tracking' : 'Activer le suivi d\'inventaire'}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6">
      {/* Carte produit */}
      {selectedProduct ? (
        <ProductCard 
          product={selectedProduct} 
          locale={locale}
          currentQuantity={
            isEditing 
              ? parseFloat(displayValue) || 0 
              : (currentInventoryQuantity > 0 
                  ? currentInventoryQuantity 
                  : (selectedProduct.theoreticalQuantity || selectedProduct.initialQuantity || 0))
          }
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
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface)'
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
          disabled={!selectedProduct || !isEditing || isSaving || showSuccess}
          className="flex-1 p-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 cursor-pointer"
          style={{
            backgroundColor: (isSaving || showSuccess) 
              ? 'var(--success)' 
              : (!selectedProduct || !isEditing) 
                ? '#f2f2f2' 
                : 'var(--primary)',
            color: (isSaving || showSuccess) 
              ? 'var(--on-success)' 
              : (!selectedProduct || !isEditing) 
                ? '#999999' 
                : 'var(--on-primary)',
            transition: 'all 0.3s ease',
            cursor: (!selectedProduct || !isEditing) ? 'not-allowed' : 'pointer',
            opacity: 1,
            boxShadow: (!selectedProduct || !isEditing) ? 'none' : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          }}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {isEnglish ? 'Adding...' : 'Ajout...'}
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-6 h-6" />
              {isEnglish ? 'Added!' : 'Ajouté !'}
            </>
          ) : (
            <>
              <Check className="w-6 h-6" />
              {hasExistingEntry 
                ? (isEnglish ? 'Update entry' : 'Modifier la saisie')
                : (isEnglish ? 'Add entry' : 'Ajouter une saisie')
              }
            </>
          )}
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
