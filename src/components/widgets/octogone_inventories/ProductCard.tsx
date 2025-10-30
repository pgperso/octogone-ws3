"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat, AlertTriangle } from 'lucide-react';
import { translateUnit } from '@/data/products/octogone_products_translations';
import { getProductImage } from '@/utils/productImageMapping';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';
import { OctogoneUnitSelector } from '@/components/ui/octogone-unit-selector';

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

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'en';
  currentQuantity?: number; // Nouvelle saisie de l'utilisateur
  onAddToOrder?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder }) => {
  const isEnglish = locale === 'en';
  const minInventory = product.minInventory || 0;
  const theoreticalStock = product.theoreticalQuantity || product.initialQuantity || 0;
  
  // Stock actuel = toujours la quantité saisie (currentQuantity vient de la calculatrice)
  const actualStock = currentQuantity;
  
  // Quantité ajoutée au panier
  const [addedToBasket, setAddedToBasket] = useState(0);
  
  // Écart dynamique : si saisie faite, utiliser saisie, sinon théorique
  const currentStock = actualStock > 0 ? actualStock : theoreticalStock;
  const baseGap = currentStock - minInventory;
  
  // Écart théorique = écart de base + quantité ajoutée au panier
  const gap = baseGap + addedToBasket;
  const needsOrder = gap < 0;
  
  // Valeurs par défaut basées sur l'écart
  const [orderQuantity, setOrderQuantity] = useState(Math.abs(baseGap));
  const [orderUnit, setOrderUnit] = useState(product.unit);
  
  // Mettre à jour la quantité quand le baseGap change
  useEffect(() => {
    setOrderQuantity(Math.abs(baseGap));
    setAddedToBasket(0); // Réinitialiser quand le produit ou la quantité change
  }, [baseGap]);
  
  const productImage = getProductImage(product.name);
  
  // Options d'unités disponibles
  const unitOptions = (product.availableUnits || [product.unit]).map(unit => ({
    value: unit,
    label: translateUnit(unit, locale)
  }));

  return (
    <div 
      className="rounded-lg mb-4 overflow-hidden"
      style={{ 
        backgroundColor: 'transparent',
        border: '1px solid var(--outline)'
      }}
    >
      {/* MOBILE LAYOUT - 2 colonnes */}
      <div className="md:hidden flex">
        {/* Photo carrée à gauche */}
        <div className="relative w-32 h-32 flex-shrink-0" style={{ backgroundColor: 'var(--surface-variant)' }}>
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={32} style={{ color: 'var(--on-surface-variant)', opacity: 0.3 }} />
            </div>
          )}
          {/* Icône de warning si sous le seuil */}
          {needsOrder && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              <div 
                className="rounded-lg p-2"
                style={{ backgroundColor: 'var(--warning)', opacity: 0.9 }}
              >
                <AlertTriangle size={24} style={{ color: 'var(--on-primary-container)' }} />
              </div>
            </div>
          )}
        </div>

        {/* Contenu à droite */}
        <div className="flex-1 p-3 flex flex-col">
          <div className="flex flex-col space-y-0.5 text-xs mb-2">
            {/* Informations d'inventaire sobre */}
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Value' : 'Valeur'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between" style={{ opacity: actualStock > 0 ? 0.5 : 1 }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {theoreticalStock} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between" style={{ opacity: actualStock > 0 ? 1 : 0.5 }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Current inventory' : 'Inventaire en cours'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {actualStock > 0 ? `${actualStock} ${translateUnit(product.unit, locale)}` : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Minimum inventory' : 'Inventaire minimum'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {minInventory} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical gap' : 'Écart théorique'}
              </span>
              <span 
                className="font-bold" 
                style={{ color: gap >= 0 ? 'var(--success)' : 'var(--error)' }}
              >
                {gap >= 0 ? '+' : ''}{gap} {translateUnit(product.unit, locale)}
              </span>
            </div>
          </div>

          {/* Bouton et toggle */}
          {needsOrder && actualStock > 0 && gap < 0 && (
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="flex-1">
                  <OctogoneQuantitySelector
                    value={orderQuantity}
                    onChange={setOrderQuantity}
                    min={0}
                    step={orderUnit === 'kg' || orderUnit === 'L' ? 0.1 : 1}
                    size="sm"
                  />
                </div>
                <OctogoneUnitSelector
                  options={unitOptions}
                  value={orderUnit}
                  onChange={setOrderUnit}
                  size="sm"
                />
              </div>
              <OctogoneButton
                variant="primary"
                size="sm"
                onClick={() => {
                  onAddToOrder?.();
                  setAddedToBasket(prev => prev + orderQuantity);
                  setOrderQuantity(0);
                }}
                icon={product.isRecipe ? <ChefHat className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                className="w-full"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                  : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                }
              </OctogoneButton>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP LAYOUT - 2 colonnes */}
      <div className="hidden md:flex">
        {/* Photo carrée à gauche - 40% */}
        <div className="relative w-2/5" style={{ backgroundColor: 'var(--surface-variant)', minHeight: '280px' }}>
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon size={48} style={{ color: 'var(--on-surface-variant)', opacity: 0.3 }} />
            </div>
          )}
          {/* Icône de warning si sous le seuil */}
          {needsOrder && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'var(--warning)', opacity: 0.9 }}
              >
                <AlertTriangle size={40} style={{ color: 'var(--on-primary-container)' }} />
              </div>
            </div>
          )}
        </div>

        {/* Contenu à droite - 60% */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex flex-col space-y-1 text-sm mb-3">
            {/* Informations d'inventaire sobre */}
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Value' : 'Valeur'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between" style={{ opacity: actualStock > 0 ? 0.5 : 1 }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {theoreticalStock} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between" style={{ opacity: actualStock > 0 ? 1 : 0.5 }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Current inventory' : 'Inventaire en cours'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {actualStock > 0 ? `${actualStock} ${translateUnit(product.unit, locale)}` : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Minimum inventory' : 'Inventaire minimum'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {minInventory} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical gap' : 'Écart théorique'}
              </span>
              <span 
                className="font-bold" 
                style={{ color: gap >= 0 ? 'var(--success)' : 'var(--error)' }}
              >
                {gap >= 0 ? '+' : ''}{gap} {translateUnit(product.unit, locale)}
              </span>
            </div>
          </div>

          {/* Bouton et toggle */}
          {needsOrder && actualStock > 0 && gap < 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1">
                  <OctogoneQuantitySelector
                    value={orderQuantity}
                    onChange={setOrderQuantity}
                    min={0}
                    step={orderUnit === 'kg' || orderUnit === 'L' ? 0.1 : 1}
                    size="md"
                  />
                </div>
                <OctogoneUnitSelector
                  options={unitOptions}
                  value={orderUnit}
                  onChange={setOrderUnit}
                  size="md"
                />
              </div>
              <OctogoneButton
                variant="primary"
                size="md"
                onClick={() => {
                  onAddToOrder?.();
                  setAddedToBasket(prev => prev + orderQuantity);
                  setOrderQuantity(0);
                }}
                icon={product.isRecipe ? <ChefHat className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                className="w-full"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                  : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                }
              </OctogoneButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
