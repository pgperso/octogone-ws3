"use client";

import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { translateProduct, translateCategory, translateUnit } from '@/data/products/octogone_products_translations';

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  unit: string;
  unitCost: number;
  storage?: string;
}

interface ProductSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (productId: string, quantity: number, unit: string) => void;
  locale?: 'fr' | 'en';
}

export const ProductSideMenu: React.FC<ProductSideMenuProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Filtrer les produits par recherche
  const filteredProducts = products.filter(product => {
    const productName = translateProduct(product.name, locale).toLowerCase();
    const categoryName = translateCategory(product.category, locale).toLowerCase();
    const search = searchTerm.toLowerCase();
    return productName.includes(search) || categoryName.includes(search);
  });

  const handleAddProduct = () => {
    if (selectedProductId && quantity > 0) {
      const product = products.find(p => p.id === selectedProductId);
      if (product) {
        onAddProduct(selectedProductId, quantity, product.unit);
        setSelectedProductId(null);
        setQuantity(1);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Side Menu */}
      <div
        className="absolute top-0 right-0 h-full w-full md:w-[500px] flex flex-col"
        style={{ 
          backgroundColor: 'var(--surface-container)',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* En-tête */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: 'var(--outline)' }}
        >
          <h3 
            className="text-xl font-semibold"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Add Ingredient' : 'Ajouter un ingrédient'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--outline)' }}>
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={20}
              style={{ color: 'var(--on-surface-variant)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isEnglish ? 'Search products...' : 'Rechercher des produits...'}
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
                border: '1px solid var(--outline)'
              }}
            />
          </div>
        </div>

        {/* Liste des produits */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div 
              className="flex items-center justify-center h-32 text-sm"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish ? 'No products found' : 'Aucun produit trouvé'}
            </div>
          ) : (
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className="w-full text-left p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: selectedProductId === product.id ? 'var(--secondary-container)' : 'var(--surface)',
                  border: `1px solid ${selectedProductId === product.id ? 'var(--secondary)' : 'var(--outline)'}`,
                  color: selectedProductId === product.id ? 'var(--on-secondary-container)' : 'var(--on-surface)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">
                      {translateProduct(product.name, locale)}
                    </p>
                    <p 
                      className="text-xs mt-1"
                      style={{ 
                        color: selectedProductId === product.id ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                        opacity: 0.8
                      }}
                    >
                      {translateCategory(product.category, locale)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {product.unitCost.toFixed(2)} $
                    </p>
                    <p 
                      className="text-xs"
                      style={{ 
                        color: selectedProductId === product.id ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                        opacity: 0.8
                      }}
                    >
                      / {translateUnit(product.unit, locale)}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer avec quantité et bouton d'ajout */}
        {selectedProductId && (
          <div 
            className="p-4 border-t"
            style={{ 
              backgroundColor: 'var(--surface-variant)',
              borderColor: 'var(--outline)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <label 
                className="text-sm font-medium"
                style={{ color: 'var(--on-surface)' }}
              >
                {isEnglish ? 'Quantity:' : 'Quantité :'}
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                className="flex-1 px-3 py-2 rounded-lg text-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                  border: '1px solid var(--outline)'
                }}
                step="0.1"
                min="0"
              />
              <span 
                className="text-sm"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                {translateUnit(products.find(p => p.id === selectedProductId)?.unit || '', locale)}
              </span>
            </div>
            <OctogoneButton
              variant="primary"
              size="lg"
              onClick={handleAddProduct}
              className="w-full"
              icon={<Plus size={20} />}
            >
              {isEnglish ? 'Add to Recipe' : 'Ajouter à la recette'}
            </OctogoneButton>
          </div>
        )}
      </div>
    </div>
  );
};
