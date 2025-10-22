"use client";

import React, { useMemo } from 'react';
import { Search, Check } from 'lucide-react';
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

interface InventoryItem {
  productId: string;
  quantity: number;
}

interface InventoryProductListProps {
  products: Product[];
  inventory: InventoryItem[];
  onProductSelect: (product: Product) => void;
  selectedProductId: string | null;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  locale?: 'fr' | 'en';
}

export const InventoryProductList: React.FC<InventoryProductListProps> = ({
  products,
  inventory,
  onProductSelect,
  selectedProductId,
  searchTerm,
  onSearchChange,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  // Filtrer les produits selon la recherche
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Obtenir la quantité d'un produit
  const getQuantity = (productId: string): number => {
    const item = inventory.find(i => i.productId === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="flex flex-col w-full" style={{ maxHeight: '750px' }}>
      {/* Barre de recherche */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--outline)' }}>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            style={{ color: 'var(--on-surface-variant)' }}
          />
          <input
            type="text"
            placeholder={isEnglish ? 'Search for a product...' : 'Rechercher un produit...'}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--outline)',
              color: 'var(--on-surface)',
              '--tw-ring-color': 'var(--primary)'
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* En-tête des colonnes */}
      <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b font-semibold text-sm" style={{ backgroundColor: 'var(--surface-container)', borderColor: 'var(--outline)', color: 'var(--on-surface-variant)' }}>
        <div className="col-span-4">{isEnglish ? 'Product' : 'Produit'}</div>
        <div className="col-span-3 text-left">{isEnglish ? 'Entry' : 'Saisie'}</div>
        <div className="col-span-4 text-right pr-2">{isEnglish ? 'Total value' : 'Valeur totale'}</div>
        <div className="col-span-1"></div>
      </div>

      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div 
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'No product found' : 'Aucun produit trouvé'}
          </div>
        ) : (
          filteredProducts.map((product) => {
            const quantity = getQuantity(product.id);
            const totalCost = quantity * product.unitCost;
            const isSelected = selectedProductId === product.id;
            
            return (
              <div
                key={product.id}
                onClick={() => onProductSelect(product)}
                className="grid grid-cols-12 gap-2 px-6 py-3 cursor-pointer border-b transition-all hover:bg-opacity-50"
                style={{
                  backgroundColor: isSelected ? 'var(--secondary-container)' : 'transparent',
                  borderColor: 'var(--outline)',
                  color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="col-span-4">
                  <div className="font-medium">{translateProduct(product.name, locale)}</div>
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {translateCategory(product.category, locale)}
                  </div>
                </div>
                {/* Colonne Saisie - 2 cases côte à côte */}
                <div className="col-span-3 flex items-center gap-2">
                  {/* Case Précédent */}
                  <div 
                    className="flex-1 px-2 py-2 rounded text-center text-xs"
                    style={{
                      backgroundColor: 'var(--surface)',
                      color: quantity === 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      border: '1px solid var(--outline)',
                      fontWeight: quantity === 0 ? 'bold' : 'normal'
                    }}
                  >
                    <div className="font-bold text-sm">
                      {product.initialQuantity || 0} {translateUnit(product.unit, locale)}
                    </div>
                    <div className="text-[9px] mt-1 opacity-60">{isEnglish ? 'Previous' : 'Précédent'}</div>
                  </div>
                  
                  {/* Case Nouveau */}
                  <div 
                    className="flex-1 px-2 py-2 rounded text-center text-xs"
                    style={{
                      backgroundColor: 'var(--surface)',
                      color: quantity > 0 ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      border: '1px solid var(--outline)',
                      fontWeight: quantity > 0 ? 'bold' : 'normal'
                    }}
                  >
                    <div className="font-bold text-sm">
                      {quantity > 0 ? `${quantity} ${translateUnit(product.unit, locale)}` : '-'}
                    </div>
                    <div className="text-[9px] mt-1 opacity-60">{isEnglish ? 'New' : 'Nouveau'}</div>
                  </div>
                </div>
                <div className="col-span-4 text-right pr-2">
                  <div className="font-semibold">
                    {quantity > 0 ? `${totalCost.toFixed(2)} $` : '-'}
                  </div>
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {quantity > 0 ? `${quantity} × ${product.unitCost.toFixed(2)} $` : `${product.unitCost.toFixed(2)} $ / ${translateUnit(product.unit, locale)}`}
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {quantity > 0 && (
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--success)' }}
                    >
                      <Check 
                        className="w-5 h-5" 
                        style={{ color: 'var(--on-primary-container)' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
