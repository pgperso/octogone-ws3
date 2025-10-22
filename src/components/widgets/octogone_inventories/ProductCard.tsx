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
      <div className="relative w-[200px] h-full flex-shrink-0">
        <Image
          src="/images/products/bread.avif"
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Infos à droite */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Nom du produit */}
        <div>
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {translateProduct(product.name, locale)}
          </h3>
          
          {/* Catégorie + Marque */}
          <div className="flex gap-4 mb-3 text-sm">
            <div style={{ color: 'var(--on-surface-variant)' }}>
              <span className="font-semibold">{isEnglish ? 'Category:' : 'Catégorie:'}</span> {translateCategory(product.category, locale)}
            </div>
            <div style={{ color: 'var(--on-surface-variant)' }}>
              <span className="font-semibold">{isEnglish ? 'Brand:' : 'Marque:'}</span> {displayBrand}
            </div>
          </div>
        </div>

        {/* Prix coûtant */}
        <div 
          className="p-3 rounded"
          style={{ backgroundColor: 'var(--primary-container)' }}
        >
          <div 
            className="text-sm font-semibold"
            style={{ color: 'var(--on-primary-container)' }}
          >
            {isEnglish ? 'Unit cost:' : 'Prix coûtant:'} <span className="text-lg">{product.unitCost.toFixed(2)} $</span> / {translateUnit(product.unit, locale)}
          </div>
        </div>
      </div>
    </div>
  );
};
