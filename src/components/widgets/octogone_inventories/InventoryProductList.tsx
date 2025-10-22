"use client";

import React, { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';

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

interface InventoryItem {
  productId: string;
  quantity: number;
}

interface InventoryProductListProps {
  products: Product[];
  inventory: InventoryItem[];
  onProductSelect: (product: Product) => void;
  selectedProductId: string | null;
}

export const InventoryProductList: React.FC<InventoryProductListProps> = ({
  products,
  inventory,
  onProductSelect,
  selectedProductId
}) => {
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="flex flex-col h-full">
      {/* Barre de recherche */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--outline)' }}>
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            style={{ color: 'var(--on-surface-variant)' }}
          />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* En-têtes de colonnes */}
      <div 
        className="grid grid-cols-12 gap-2 px-6 py-3 text-sm font-semibold border-b"
        style={{ 
          backgroundColor: 'var(--surface-variant)',
          color: 'var(--on-surface-variant)',
          borderColor: 'var(--outline)'
        }}
      >
        <div className="col-span-4">Produit</div>
        <div className="col-span-3 text-center">Quantité</div>
        <div className="col-span-4 text-right pr-2">Total</div>
        <div className="col-span-1 text-center"></div>
      </div>

      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto">
        {filteredProducts.length === 0 ? (
          <div 
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            Aucun produit trouvé
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
                className="grid grid-cols-12 gap-2 px-6 py-3 cursor-pointer border-b transition-colors"
                style={{
                  backgroundColor: isSelected ? 'var(--primary-container)' : 'transparent',
                  borderColor: 'var(--outline)',
                  color: isSelected ? 'var(--on-primary-container)' : 'var(--on-surface)'
                }}
              >
                <div className="col-span-4">
                  <div className="font-medium">{product.name}</div>
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    {product.category}
                  </div>
                </div>
                <div className="col-span-3 text-center font-semibold">
                  {quantity > 0 ? `${quantity} ${product.unit}` : '-'}
                </div>
                <div className="col-span-4 text-right pr-2">
                  <div className="font-semibold">
                    {quantity > 0 ? `${totalCost.toFixed(2)} $` : '-'}
                  </div>
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    {quantity > 0 ? `${quantity} × ${product.unitCost.toFixed(2)} $` : `${product.unitCost.toFixed(2)} $ / ${product.unit}`}
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
