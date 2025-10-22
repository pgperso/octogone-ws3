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
}

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr' }) => {
  const isEnglish = locale === 'en';
  const displayBrand = product.brand || (isEnglish ? 'No brand' : 'Sans marque');
  
  // Mapper le nom du produit à son image
  const getProductImage = (productName: string): string => {
    const imageMap: Record<string, string> = {
      'Baguette': '/images/products/bread.avif',
      // Ajouter d'autres mappings ici au fur et à mesure
    };
    return imageMap[productName] || '/images/products/default.avif';
  };

  return (
    <div 
      className="rounded-lg mb-4 overflow-hidden flex"
      style={{ 
        backgroundColor: 'var(--surface-variant)',
        border: '1px solid var(--outline)',
        height: '200px'
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
          <div className="space-y-2 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Category' : 'Catégorie'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {translateCategory(product.category, locale)}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
                {isEnglish ? 'Brand' : 'Marque'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {displayBrand}
              </span>
            </div>
          </div>
        </div>

        {/* Prix coûtant - Design minimaliste */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--on-surface-variant)', opacity: 0.7 }}>
              {isEnglish ? 'Unit cost' : 'Prix unitaire'}
            </span>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
              {product.unitCost.toFixed(2)} $
            </span>
            <span className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              / {translateUnit(product.unit, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
