"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat, AlertTriangle } from 'lucide-react';
import { translateUnit } from '@/data/products/octogone_products_translations';
import { getProductImage } from '@/utils/productImageMapping';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { translateProduct } from '@/data/products/octogone_products_translations';
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
  autoAddToCart?: boolean;
  onAutoAddToCartChange?: (value: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder, autoAddToCart = false, onAutoAddToCartChange }) => {
  const isEnglish = locale === 'en';
  const minInventory = product.minInventory || 0;
  const theoreticalStock = product.theoreticalQuantity || product.initialQuantity || 0;
  
  // Stock actuel = toujours la quantité saisie (currentQuantity vient de la calculatrice)
  const actualStock = currentQuantity;
  
  // Écart dynamique : si saisie faite, utiliser saisie, sinon théorique
  const currentStock = actualStock > 0 ? actualStock : theoreticalStock;
  const gap = currentStock - minInventory;
  const needsOrder = gap < 0;
  
  // Valeurs par défaut basées sur l'écart
  const [orderQuantity, setOrderQuantity] = useState(Math.abs(gap));
  const [orderUnit, setOrderUnit] = useState(product.unit);
  
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
        <div className="flex-1 p-3 flex flex-col justify-between">
          <div className="flex-1 flex flex-col space-y-0.5 text-xs">
            {/* Informations d'inventaire sobre */}
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Value' : 'Valeur'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {theoreticalStock} {translateUnit(product.unit, locale)}
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
                {isEnglish ? 'Gap' : 'Écart'}
              </span>
              <span 
                className="font-bold" 
                style={{ color: gap >= 0 ? 'var(--success)' : 'var(--error)' }}
              >
                {gap >= 0 ? '+' : ''}{gap} {translateUnit(product.unit, locale)}
              </span>
            </div>
            {needsOrder && (
              <div className="flex-1 flex flex-col pt-1 pb-1">
                <div 
                  className="p-2 rounded text-[10px] flex-1 flex flex-col"
                  style={{ border: '1px solid var(--outline)' }}
                >
                  <div className="text-[9px] font-semibold mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Recommendation' : 'Recommandation'}
                  </div>
                  <span style={{ color: 'var(--on-surface)' }}>
                    {isEnglish 
                      ? `Your ${actualStock > 0 ? 'current' : 'theoretical'} inventory indicates it is below the minimum threshold of ${minInventory} ${translateUnit(product.unit, locale)}. Add ${translateProduct(product.name, locale)} to your ${product.isRecipe ? 'production' : 'order'} basket to avoid stockouts or simply ignore.`
                      : `Votre inventaire ${actualStock > 0 ? 'en cours' : 'théorique'} indique qu'il est sous le seuil minimum de ${minInventory} ${translateUnit(product.unit, locale)}. Ajoutez ${translateProduct(product.name, locale)} à votre panier de ${product.isRecipe ? 'production' : 'commande'} pour éviter une rupture de stock ou tout simplement ignorer.`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bouton et toggle */}
          {needsOrder && (
            <div>
              <div className="flex gap-2 mb-0.5">
                <div className="flex items-center gap-2">
                  <OctogoneQuantitySelector
                    value={orderQuantity}
                    onChange={setOrderQuantity}
                    min={0}
                    step={orderUnit === 'kg' || orderUnit === 'L' ? 0.1 : 1}
                    size="sm"
                  />
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
                  onClick={onAddToOrder}
                  icon={product.isRecipe ? <ChefHat className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  className="flex-1"
                >
                  {product.isRecipe 
                    ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                    : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                  }
                </OctogoneButton>
              </div>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAddToCart}
                  onChange={(e) => onAutoAddToCartChange?.(e.target.checked)}
                  className="w-3 h-3 rounded cursor-pointer"
                  style={{
                    accentColor: 'var(--secondary-container)'
                  }}
                />
                <span className="text-[9px]" style={{ color: 'var(--on-surface-variant)' }}>
                  {isEnglish ? 'Auto-add' : 'Auto-ajout'}
                </span>
              </label>
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
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex-1 flex flex-col space-y-1 text-sm">
            {/* Informations d'inventaire sobre */}
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Value' : 'Valeur'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {theoreticalStock} {translateUnit(product.unit, locale)}
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
                {isEnglish ? 'Gap' : 'Écart'}
              </span>
              <span 
                className="font-bold" 
                style={{ color: gap >= 0 ? 'var(--success)' : 'var(--error)' }}
              >
                {gap >= 0 ? '+' : ''}{gap} {translateUnit(product.unit, locale)}
              </span>
            </div>
            {needsOrder && (
              <div className="flex-1 flex flex-col pt-2 pb-2">
                <div 
                  className="p-2 rounded text-xs flex-1 flex flex-col"
                  style={{ border: '1px solid var(--outline)' }}
                >
                  <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Recommendation' : 'Recommandation'}
                  </div>
                  <span style={{ color: 'var(--on-surface)' }}>
                    {isEnglish 
                      ? `Your ${actualStock > 0 ? 'current' : 'theoretical'} inventory indicates it is below the minimum threshold of ${minInventory} ${translateUnit(product.unit, locale)}. Add ${translateProduct(product.name, locale)} to your ${product.isRecipe ? 'production' : 'order'} basket to avoid stockouts or simply ignore.`
                      : `Votre inventaire ${actualStock > 0 ? 'en cours' : 'théorique'} indique qu'il est sous le seuil minimum de ${minInventory} ${translateUnit(product.unit, locale)}. Ajoutez ${translateProduct(product.name, locale)} à votre panier de ${product.isRecipe ? 'production' : 'commande'} pour éviter une rupture de stock ou tout simplement ignorer.`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bouton et toggle */}
          {needsOrder && (
            <div>
              <div className="flex gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <OctogoneQuantitySelector
                    value={orderQuantity}
                    onChange={setOrderQuantity}
                    min={0}
                    step={orderUnit === 'kg' || orderUnit === 'L' ? 0.1 : 1}
                    size="md"
                  />
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
                  onClick={onAddToOrder}
                  icon={product.isRecipe ? <ChefHat className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  className="flex-1"
                >
                  {product.isRecipe 
                    ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                    : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                  }
                </OctogoneButton>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAddToCart}
                  onChange={(e) => onAutoAddToCartChange?.(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{
                    accentColor: 'var(--secondary-container)'
                  }}
                />
                <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  {isEnglish ? 'Add to cart automatically' : 'Ajouter au panier automatiquement'}
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
