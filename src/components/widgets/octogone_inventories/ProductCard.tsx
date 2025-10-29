"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat } from 'lucide-react';
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
  const isBelowMinimum = actualStock < minInventory;
  const difference = actualStock - minInventory;
  
  // Calculer la quantité à commander
  const quantityToOrder = isBelowMinimum ? Math.abs(difference) : 0;
  
  // Écart entre théorique et saisi
  const variance = actualStock > 0 ? actualStock - theoreticalStock : 0;
  const hasVariance = actualStock > 0 && Math.abs(variance) > 0;
  
  // Déterminer le message à afficher
  const getInventoryMessage = () => {
    // Cas 1: Rien saisi encore, mais théorique sous le seuil
    if (actualStock === 0 && theoreticalStock < minInventory && theoreticalStock > 0) {
      return {
        type: 'warning',
        icon: '⚠️',
        title: isEnglish ? 'Theoretical inventory below threshold' : 'Inventaire théorique sous le seuil',
        message: isEnglish 
          ? `Theoretical: ${theoreticalStock} ${translateUnit(product.unit, locale)} (Min: ${minInventory}). Verify and order if needed.`
          : `Théorique: ${theoreticalStock} ${translateUnit(product.unit, locale)} (Min: ${minInventory}). Vérifiez et commandez si nécessaire.`,
        showButton: true
      };
    }
    
    // Cas 2: Saisi et sous le seuil
    if (actualStock > 0 && isBelowMinimum) {
      return {
        type: 'error',
        icon: '❌',
        title: isEnglish ? 'Stock below minimum threshold' : 'Stock sous le seuil minimum',
        message: isEnglish
          ? `Current: ${actualStock} ${translateUnit(product.unit, locale)} | Min: ${minInventory} | Order: ${quantityToOrder}`
          : `Actuel: ${actualStock} ${translateUnit(product.unit, locale)} | Min: ${minInventory} | Commander: ${quantityToOrder}`,
        showButton: true
      };
    }
    
    // Cas 3: Saisi et au-dessus du seuil
    if (actualStock > 0 && !isBelowMinimum) {
      return {
        type: 'success',
        icon: '✅',
        title: isEnglish ? 'Sufficient stock' : 'Stock suffisant',
        message: isEnglish
          ? `Current: ${actualStock} ${translateUnit(product.unit, locale)} (Min: ${minInventory})`
          : `Actuel: ${actualStock} ${translateUnit(product.unit, locale)} (Min: ${minInventory})`,
        showButton: false
      };
    }
    
    return null;
  };
  
  const inventoryMessage = getInventoryMessage();
  
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
        </div>

        {/* Contenu à droite */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 
              className="text-lg font-bold mb-2 tracking-tight"
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

            <div className="text-sm font-medium mb-2" style={{ color: 'var(--on-surface-variant)' }}>
              {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
            </div>

            {/* Message d'inventaire dynamique */}
            {inventoryMessage && (
              <div 
                className="px-3 py-2 rounded-lg mb-2"
                style={{ 
                  backgroundColor: 'transparent',
                  border: `2px solid ${
                    inventoryMessage.type === 'error' ? 'var(--error)' : 
                    inventoryMessage.type === 'warning' ? 'var(--warning)' : 
                    'var(--success)'
                  }`
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{inventoryMessage.icon}</span>
                  <div className="text-xs font-semibold" style={{ 
                    color: inventoryMessage.type === 'error' ? 'var(--error)' : 
                           inventoryMessage.type === 'warning' ? 'var(--warning)' : 
                           'var(--success)'
                  }}>
                    {inventoryMessage.title}
                  </div>
                </div>
                <div className="text-xs" style={{ color: 'var(--on-surface)' }}>
                  {inventoryMessage.message}
                </div>
                {hasVariance && (
                  <div className="text-xs mt-1 pt-1 border-t" style={{ 
                    color: 'var(--on-surface-variant)',
                    borderColor: 'var(--outline)'
                  }}>
                    {isEnglish ? 'Variance' : 'Écart'}: {variance > 0 ? '+' : ''}{variance} {translateUnit(product.unit, locale)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bouton et toggle */}
          {inventoryMessage?.showButton && (
            <div>
              <OctogoneButton
                variant="primary"
                size="sm"
                onClick={onAddToOrder}
                icon={product.isRecipe ? <ChefHat className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                className="w-full mb-2"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Produce' : 'Produire')
                  : (isEnglish ? 'Order' : 'Commander')
                }
              </OctogoneButton>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAddToCart}
                  onChange={(e) => onAutoAddToCartChange?.(e.target.checked)}
                  className="w-3 h-3 rounded cursor-pointer"
                  style={{
                    accentColor: 'var(--secondary-container)'
                  }}
                />
                <span className="text-[10px]" style={{ color: 'var(--on-surface-variant)' }}>
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
        </div>

        {/* Contenu à droite - 60% */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 
              className="text-2xl font-bold mb-3 tracking-tight"
              style={{ color: 'var(--on-surface)' }}
            >
              {translateProduct(product.name, locale)}
            </h3>
            
            {product.isRecipe && (
              <span 
                className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-3"
                style={{ 
                  backgroundColor: '#E2CDED',
                  color: '#1F1F1F'
                }}
              >
                {isEnglish ? 'Recipe' : 'Recette'}
              </span>
            )}

            <div className="text-base font-medium mb-4" style={{ color: 'var(--on-surface-variant)' }}>
              {product.unitCost.toFixed(2)} $ / {translateUnit(product.unit, locale)}
            </div>

            {/* Message d'inventaire dynamique */}
            {inventoryMessage && (
              <div 
                className="px-4 py-3 rounded-lg mb-4"
                style={{ 
                  backgroundColor: 'transparent',
                  border: `2px solid ${
                    inventoryMessage.type === 'error' ? 'var(--error)' : 
                    inventoryMessage.type === 'warning' ? 'var(--warning)' : 
                    'var(--success)'
                  }`
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{inventoryMessage.icon}</span>
                  <div className="text-sm font-semibold" style={{ 
                    color: inventoryMessage.type === 'error' ? 'var(--error)' : 
                           inventoryMessage.type === 'warning' ? 'var(--warning)' : 
                           'var(--success)'
                  }}>
                    {inventoryMessage.title}
                  </div>
                </div>
                <div className="text-sm" style={{ color: 'var(--on-surface)' }}>
                  {inventoryMessage.message}
                </div>
                {hasVariance && (
                  <div className="text-sm mt-2 pt-2 border-t" style={{ 
                    color: 'var(--on-surface-variant)',
                    borderColor: 'var(--outline)'
                  }}>
                    {isEnglish ? 'Variance' : 'Écart'}: {variance > 0 ? '+' : ''}{variance} {translateUnit(product.unit, locale)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bouton et toggle */}
          {inventoryMessage?.showButton && (
            <div>
              <OctogoneButton
                variant="primary"
                size="md"
                onClick={onAddToOrder}
                icon={product.isRecipe ? <ChefHat className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                className="w-full mb-3"
              >
                {product.isRecipe 
                  ? (isEnglish ? 'Produce' : 'Produire')
                  : (isEnglish ? 'Order' : 'Commander')
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
