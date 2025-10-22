"use client";

import React from 'react';
import Image from 'next/image';
import { translateCategory, translateProduct, translateUnit } from '@/data/inventory/inventory-translations';

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
}

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'en';
  currentQuantity?: number;
  onAddToOrder?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder }) => {
  const isEnglish = locale === 'en';
  const displayBrand = product.brand || (isEnglish ? 'No brand' : 'Sans marque');
  const minInventory = product.minInventory || 0;
  const isBelowMinimum = currentQuantity < minInventory;
  const percentage = minInventory > 0 ? Math.min((currentQuantity / minInventory) * 100, 100) : 100;
  
  // Mapper le nom du produit à son image
  const getProductImage = (productName: string): string => {
    const imageMap: Record<string, string> = {
      'Baguette': '/products/bread.avif',
      'Bière blonde': '/products/blond_beer.avif',
      // Ajouter d'autres mappings ici au fur et à mesure
    };
    return imageMap[productName] || '/products/default.avif';
  };

  return (
    <div 
      className="rounded-lg mb-4 overflow-hidden flex"
      style={{ 
        backgroundColor: 'transparent',
        border: '1px solid var(--outline)',
        minHeight: '200px'
      }}
    >
      {/* Photo à gauche - 1:1 pleine hauteur */}
      <div className="relative w-[200px] h-full flex-shrink-0" style={{ backgroundColor: 'var(--surface)' }}>
        <Image
          src={getProductImage(product.name)}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Infos à droite - Design sobre et professionnel */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Nom du produit */}
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
          </div>
        </div>
      </div>

      {/* Troisième colonne - Graphique et bouton */}
      <div className="w-[220px] p-6 border-l flex flex-col justify-between" style={{ borderColor: 'var(--outline)' }}>
        {/* Graphique de stock */}
        <div>
          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Stock actuel' : 'Stock actuel'}
              </span>
              <span className="text-sm font-bold" style={{ color: isBelowMinimum ? 'var(--error)' : 'var(--on-surface)' }}>
                {currentQuantity} {translateUnit(product.unit, locale)}
              </span>
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Minimum requis' : 'Minimum requis'}
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
                {minInventory} {translateUnit(product.unit, locale)}
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

        {/* Bouton Ajouter à ma commande */}
        {isBelowMinimum && onAddToOrder && (
          <button
            onClick={onAddToOrder}
            className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--on-primary)'
            }}
          >
            {isEnglish ? 'Ajouter à ma commande' : 'Ajouter à ma commande'}
          </button>
        )}
      </div>
    </div>
  );
};
