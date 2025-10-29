"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat } from 'lucide-react';
import { translateCategory, translateProduct, translateUnit, translateBrand } from '@/data/products/octogone_products_translations';
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
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder }) => {
  const isEnglish = locale === 'en';
  const displayBrand = product.brand ? translateBrand(product.brand, locale) : (isEnglish ? 'No brand' : 'Sans marque');
  const minInventory = product.minInventory || 0;
  
  // Stock actuel = toujours la quantité saisie (currentQuantity vient de la calculatrice)
  const actualStock = currentQuantity;
  const isBelowMinimum = actualStock < minInventory;
  const percentage = minInventory > 0 ? Math.min((actualStock / minInventory) * 100, 100) : 100;
  const difference = actualStock - minInventory;
  
  const productImage = getProductImage(product.name);

  return (
    <div 
      className="rounded-lg mb-4 overflow-hidden"
      style={{ 
        backgroundColor: 'transparent',
        border: '1px solid var(--outline)',
        minHeight: '200px'
      }}
    >
      {/* MOBILE LAYOUT */}
      <div className="md:hidden">
        {/* Row 1 : Photo miniature + Nom du produit */}
        <div className="flex items-center gap-4 p-4 border-b" style={{ borderColor: 'var(--outline)' }}>
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--surface-variant)' }}>
            {productImage ? (
              <Image
                src={productImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={24} style={{ color: 'var(--on-surface-variant)', opacity: 0.3 }} />
              </div>
            )}
          </div>
          <h3 
            className="text-xl font-bold tracking-tight flex-1"
            style={{ color: 'var(--on-surface)' }}
          >
            {translateProduct(product.name, locale)}
          </h3>
        </div>

        {/* Row 2 : 2 colonnes (Infos | Graphique+Bouton) */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Colonne 1 : Infos produit */}
          <div className="space-y-2 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Category' : 'Catégorie'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {translateCategory(product.category, locale)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Brand' : 'Marque'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {displayBrand}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Unit price' : 'Prix unitaire'}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $
              </span>
            </div>
          </div>

          {/* Colonne 2 : Graphique + Bouton */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Stock' : 'Stock'}
                  </span>
                  <span className="text-sm font-bold" style={{ color: isBelowMinimum ? 'var(--error)' : 'var(--on-surface)' }}>
                    {actualStock}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Min' : 'Min'}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                    {minInventory}
                  </span>
                </div>
              </div>
              <div className="mb-3">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: isBelowMinimum ? 'var(--error)' : 'var(--success)'
                    }}
                  />
                </div>
                <div className="text-xs text-center mt-1" style={{ color: 'var(--on-surface-variant)' }}>
                  {percentage.toFixed(0)}%
                </div>
              </div>
            </div>
            {onAddToOrder && (
              <>
                <OctogoneButton
                  variant="primary"
                  size="sm"
                  onClick={onAddToOrder}
                  className="w-full"
                  icon={product.isRecipe ? <ChefHat size={16} /> : <ShoppingCart size={16} />}
                >
                  {product.isRecipe 
                    ? (isEnglish ? 'Produce' : 'Produire')
                    : (isEnglish ? 'Order' : 'Commander')
                  }
                </OctogoneButton>
                <label className="flex items-center gap-2 mt-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{
                      accentColor: 'var(--primary)'
                    }}
                  />
                  <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? 'Add to cart automatically' : 'Ajouter au panier automatiquement'}
                  </span>
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - 3 colonnes */}
      <div className="hidden md:flex">
        {/* Photo à gauche - 1/3 */}
        <div className="relative flex-1" style={{ backgroundColor: 'var(--surface-variant)' }}>
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
        </div>

        {/* Infos au centre - 1/3 */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 
              className="text-2xl font-bold mb-4 tracking-tight"
              style={{ color: 'var(--on-surface)' }}
            >
              {translateProduct(product.name, locale)}
            </h3>
          
          {/* Catégorie + Marque - Layout vertical sobre */}
          <div className="space-y-1 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Category' : 'Catégorie'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {translateCategory(product.category, locale)}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Brand' : 'Marque'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {displayBrand}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Prix unitaire' : 'Prix unitaire'}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Minimum inventory' : 'Inventaire minimum'}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                {minInventory} {translateUnit(product.unit, locale)}
              </span>
            </div>
          </div>
        </div>
        </div>

        {/* Troisième colonne - Graphique et bouton - Desktop */}
        <div className="flex-1 p-6 border-l flex flex-col justify-between" style={{ borderColor: 'var(--outline)' }}>
        {/* Graphique de stock */}
        <div>
          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Current stock' : 'Stock actuel'}
              </span>
              <span className="text-sm font-bold" style={{ color: isBelowMinimum ? 'var(--error)' : 'var(--on-surface)' }}>
                {actualStock} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Required minimum' : 'Minimum requis'}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {minInventory} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Difference' : 'Différence'}
              </span>
              <span 
                className="text-sm font-bold"
                style={{ 
                  color: difference >= 0 ? 'var(--success)' : 'var(--error)'
                }}
              >
                {difference >= 0 ? '+' : ''}{difference} {translateUnit(product.unit, locale)}
              </span>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="mb-4">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
              <div 
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: isBelowMinimum ? 'var(--error)' : 'var(--success)'
                }}
              />
            </div>
            <div className="text-xs text-center mt-1" style={{ color: 'var(--on-surface-variant)' }}>
              {percentage.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Bouton Commander/Produire - Desktop */}
        {onAddToOrder && (
          <>
            <OctogoneButton
              variant="primary"
              size="lg"
              onClick={onAddToOrder}
              className="w-full"
              icon={product.isRecipe ? <ChefHat size={20} /> : <ShoppingCart size={20} />}
            >
              {product.isRecipe 
                ? (isEnglish ? 'Produce' : 'Produire')
                : (isEnglish ? 'Order' : 'Commander')
              }
            </OctogoneButton>
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded cursor-pointer"
                style={{
                  accentColor: 'var(--primary)'
                }}
              />
              <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Add to cart automatically' : 'Ajouter au panier automatiquement'}
              </span>
            </label>
          </>
        )}
      </div>
      </div>
    </div>
  );
};
