"use client";

import React from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
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
  theoreticalQuantity?: number;
}

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'en';
  currentQuantity?: number; // Nouvelle saisie de l'utilisateur
  onAddToOrder?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder }) => {
  const isEnglish = locale === 'en';
  const displayBrand = product.brand || (isEnglish ? 'No brand' : 'Sans marque');
  const minInventory = product.minInventory || 0;
  
  // Stock actuel = nouvelle saisie si elle existe, sinon inventaire théorique du POS
  const actualStock = currentQuantity > 0 ? currentQuantity : (product.theoreticalQuantity || 0);
  const isBelowMinimum = actualStock < minInventory;
  const percentage = minInventory > 0 ? Math.min((actualStock / minInventory) * 100, 100) : 100;
  const difference = actualStock - minInventory;
  
  // Mapper le nom du produit à son image
  const getProductImage = (productName: string): string | null => {
    const imageMap: Record<string, string> = {
      'Baguette': '/products/bread.avif',
      'Bière blonde': '/products/blond_beer.avif',
      'Café en grains': '/products/coffee_beans.avif',
      'Coca-Cola': '/products/coca-cola.avif',
      'Farine tout usage': '/products/all-purpose-flour.avif',
      "Huile d'olive": '/products/olive-oil.avif',
      'Huile végétale': '/products/vegetable-oil.avif',
      'Oignons jaunes': '/products/yellow-onions.avif',
      'Pâtes sèches': '/products/dry-pasta.avif',
      'Pommes de terre': '/products/potatoes.avif',
      'Riz blanc': '/products/white-rice.avif',
      'Sel': '/products/salt.avif',
      "Sirop d'érable": '/products/maple-syrup.avif',
      'Sucre blanc': '/products/white-sugar.avif',
      'Thon en conserve': '/products/canned-tuna.png',
      'Tortillas': '/products/tortillas.avif',
      'Vinaigre balsamique': '/products/balsamic-vinegar.avif',
      'Vin blanc': '/products/white-wine.avif',
      'Vin rouge': '/products/red-wine.avif',
    };
    return imageMap[productName] || null;
  };
  
  const productImage = getProductImage(product.name);

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
      <div className="relative w-[200px] h-full flex-shrink-0" style={{ backgroundColor: 'var(--surface-variant)' }}>
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

      {/* Troisième colonne - Graphique et bouton */}
      <div className="w-[220px] p-6 border-l flex flex-col justify-between" style={{ borderColor: 'var(--outline)' }}>
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

        {/* Bouton Ajouter à ma commande - Toujours visible */}
        {onAddToOrder && (
          <button
            onClick={onAddToOrder}
            className="w-full py-2 px-4 rounded-lg font-medium text-sm transition-all"
            style={{
              backgroundColor: isBelowMinimum ? 'var(--primary)' : 'var(--secondary)',
              color: isBelowMinimum ? 'var(--on-primary)' : 'var(--on-secondary)'
            }}
          >
            {isEnglish ? 'Add to my order' : 'Ajouter à ma commande'}
          </button>
        )}
      </div>
    </div>
  );
};
