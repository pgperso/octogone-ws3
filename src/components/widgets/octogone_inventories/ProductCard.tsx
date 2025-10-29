"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat, AlertTriangle } from 'lucide-react';
import { translateProduct, translateUnit } from '@/data/products/octogone_products_translations';
import { getProductImage } from '@/utils/productImageMapping';
import { OctogoneButton } from '@/components/ui/octogone-button';

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
  const quantityToOrder = gap < 0 ? Math.abs(gap) : 0;
  const needsOrder = gap < 0;
  
  const productImage = getProductImage(product.name);

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
          <div>
            <h3 
              className="text-base font-bold mb-1 tracking-tight"
              style={{ color: 'var(--on-surface)' }}
            >
              {translateProduct(product.name, locale)}
            </h3>
            
            {product.isRecipe && (
              <span 
                className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1"
                style={{ 
                  backgroundColor: '#E2CDED',
                  color: '#1F1F1F'
                }}
              >
                {isEnglish ? 'Recipe' : 'Recette'}
              </span>
            )}

            <div className="text-xs font-medium mb-2" style={{ color: 'var(--on-surface-variant)' }}>
              {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
            </div>

            {/* Informations d'inventaire sobre */}
            <div className="space-y-0.5 text-xs mb-2">
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
                <div className="pt-1 mt-1 border-t" style={{ borderColor: 'var(--outline)' }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Recommendation' : 'Recommandation'}:{' '}
                  </span>
                  <span className="font-medium" style={{ color: 'var(--error)' }}>
                    {isEnglish ? 'Add' : 'Ajouter'} {quantityToOrder} {translateUnit(product.unit, locale)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bouton et toggle */}
          {needsOrder && (
            <div>
              <OctogoneButton
                variant="primary"
                size="sm"
                onClick={onAddToOrder}
                icon={product.isRecipe ? <ChefHat className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                className="w-full mb-1"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                  : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                }
              </OctogoneButton>
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
          <div>
            <h3 
              className="text-xl font-bold mb-2 tracking-tight"
              style={{ color: 'var(--on-surface)' }}
            >
              {translateProduct(product.name, locale)}
            </h3>
            
            {product.isRecipe && (
              <span 
                className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2"
                style={{ 
                  backgroundColor: '#E2CDED',
                  color: '#1F1F1F'
                }}
              >
                {isEnglish ? 'Recipe' : 'Recette'}
              </span>
            )}

            <div className="text-sm font-medium mb-3" style={{ color: 'var(--on-surface-variant)' }}>
              {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
            </div>

            {/* Informations d'inventaire sobre */}
            <div className="space-y-1 text-sm mb-3">
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
                <div className="pt-1 mt-1 border-t" style={{ borderColor: 'var(--outline)' }}>
                  <span style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Recommendation' : 'Recommandation'}:{' '}
                  </span>
                  <span className="font-medium" style={{ color: 'var(--error)' }}>
                    {isEnglish ? 'Add' : 'Ajouter'} {quantityToOrder} {translateUnit(product.unit, locale)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Bouton et toggle */}
          {needsOrder && (
            <div>
              <OctogoneButton
                variant="primary"
                size="md"
                onClick={onAddToOrder}
                icon={product.isRecipe ? <ChefHat className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                className="w-full mb-3"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Add to production basket' : 'Ajouter au panier de production')
                  : (isEnglish ? 'Add to order basket' : 'Ajouter au panier de commande')
                }
              </OctogoneButton>
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
