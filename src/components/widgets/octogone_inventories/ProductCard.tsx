"use client";

import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';
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

interface InventoryHistory {
  date: string;
  quantity: number;
  unit: string;
}

interface ProductCardProps {
  product: Product;
  history?: InventoryHistory[];
  locale?: 'fr' | 'en';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, history = [], locale = 'fr' }) => {
  const isEnglish = locale === 'en';
  // Générer des initiales pour l'avatar
  const getInitials = (name: string): string => {
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Couleur de fond basée sur la catégorie
  const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      'Légumes': '#4CAF50',
      'Fruits': '#FF9800',
      'Viandes': '#F44336',
      'Produits laitiers': '#2196F3',
      'Fruits de mer': '#00BCD4',
      'Boulangerie': '#FFC107',
      'Herbes': '#8BC34A',
      'Boissons': '#9C27B0',
      'Surgelés': '#03A9F4',
      'Épicerie': '#795548'
    };
    return colorMap[category] || '#607D8B';
  };

  const displayBrand = product.brand || (isEnglish ? 'No brand' : 'Sans marque');
  const initials = getInitials(product.name);
  const avatarColor = getCategoryColor(product.category);

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
