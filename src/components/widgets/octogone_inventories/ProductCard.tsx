"use client";

import React from 'react';
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
      className="rounded-lg p-4 mb-4"
      style={{ 
        backgroundColor: 'var(--surface-variant)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* Rangée 1: Nom + Image */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <h3 
            className="text-lg font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {translateProduct(product.name, locale)}
          </h3>
        </div>
        <div 
          className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl ml-4"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
      </div>

      {/* Rangée 2: Catégorie + Marque */}
      <div 
        className="grid grid-cols-2 gap-4 mb-3 text-sm"
      >
        <div style={{ color: 'var(--on-surface-variant)' }}>
          <span className="font-semibold" style={{ color: 'var(--on-surface-variant)' }}>{isEnglish ? 'Category:' : 'Catégorie:'}</span> {translateCategory(product.category, locale)}
        </div>
        <div style={{ color: 'var(--on-surface-variant)' }}>
          <span className="font-semibold" style={{ color: 'var(--on-surface-variant)' }}>{isEnglish ? 'Brand:' : 'Marque:'}</span> {displayBrand}
        </div>
      </div>

      {/* Rangée 3: Prix coûtant */}
      <div 
        className="mb-3 p-2 rounded"
        style={{ backgroundColor: 'var(--primary-container)' }}
      >
        <div 
          className="text-sm font-semibold"
          style={{ color: 'var(--on-primary-container)' }}
        >
          {isEnglish ? 'Unit cost:' : 'Prix coûtant:'} <span className="text-lg">{product.unitCost.toFixed(2)} $</span> / {translateUnit(product.unit, locale)}
        </div>
      </div>

      {/* Rangée 4: Historique */}
      {history.length > 0 && (
        <div>
          <div 
            className="flex items-center gap-2 mb-2 text-sm font-semibold"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <Clock className="w-4 h-4" />
            {isEnglish ? 'Entry history' : 'Historique de saisie'}
          </div>
          <div className="space-y-1">
            {history.slice(0, 3).map((entry, index) => (
              <div 
                key={index}
                className="text-xs flex justify-between p-1 rounded"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface-variant)'
                }}
              >
                <span>{entry.date}</span>
                <span className="font-semibold">
                  {entry.quantity} {entry.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
