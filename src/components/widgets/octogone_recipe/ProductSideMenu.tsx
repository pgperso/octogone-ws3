"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, Check } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';
import { OctogoneUnitSelector } from '@/components/ui/octogone-unit-selector';
import { translateProduct, translateCategory, translateUnit } from '@/data/products/octogone_products_translations';

interface Product {
  id: string;
  name: string;
  category: string;
  brand?: string;
  unit: string;
  availableUnits?: string[];
  unitCost: number;
  storage?: string;
}

interface SelectedProduct {
  productId: string;
  quantity: number;
  unit: string;
}

interface ProductSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (productId: string, quantity: number, unit: string) => void;
  onAddMultipleProducts?: (products: SelectedProduct[]) => void;
  addedProductIds?: string[];
  locale?: 'fr' | 'en';
}

export const ProductSideMenu: React.FC<ProductSideMenuProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onAddMultipleProducts,
  addedProductIds = [],
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  // Filtrer les produits par recherche
  const filteredProducts = products.filter(product => {
    const productName = translateProduct(product.name, locale).toLowerCase();
    const categoryName = translateCategory(product.category, locale).toLowerCase();
    const search = searchTerm.toLowerCase();
    return productName.includes(search) || categoryName.includes(search);
  });

  // Toggle sélection d'un produit
  const toggleProductSelection = (productId: string) => {
    const isSelected = selectedProducts.some(p => p.productId === productId);
    
    if (isSelected) {
      // Désélectionner
      setSelectedProducts(selectedProducts.filter(p => p.productId !== productId));
    } else {
      // Sélectionner avec valeurs par défaut
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProducts([...selectedProducts, {
          productId,
          quantity: 1,
          unit: product.unit
        }]);
      }
    }
  };

  // Mettre à jour la quantité d'un produit sélectionné
  const updateProductQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.productId === productId ? { ...p, quantity } : p
    ));
  };

  // Mettre à jour l'unité d'un produit sélectionné
  const updateProductUnit = (productId: string, unit: string) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.productId === productId ? { ...p, unit } : p
    ));
  };

  // Ajouter tous les produits sélectionnés
  const handleAddProducts = () => {
    if (onAddMultipleProducts) {
      // Utiliser la fonction d'ajout multiple si disponible
      onAddMultipleProducts(selectedProducts);
    } else {
      // Fallback: ajouter un par un
      selectedProducts.forEach(selected => {
        onAddProduct(selected.productId, selected.quantity, selected.unit);
      });
    }
    setSelectedProducts([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 p-4">
          {/* Overlay avec animation de fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black"
            onClick={onClose}
          />

          {/* Side Menu avec animation de glissement et effet flottant */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="absolute top-4 right-4 bottom-4 w-[calc(100%-2rem)] md:w-[500px] flex flex-col rounded-2xl overflow-hidden"
            style={{ 
              backgroundColor: 'var(--surface-container)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
        {/* En-tête */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--outline)'
          }}
        >
          <h3 
            className="text-xl font-semibold"
            style={{ color: 'var(--on-primary-container)' }}
          >
            {isEnglish ? 'Add Ingredient' : 'Ajouter un ingrédient'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)'
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
            filteredProducts.map((product) => {
              const isAdded = addedProductIds.includes(product.id);
              const selectedProduct = selectedProducts.find(p => p.productId === product.id);
              const isSelected = !!selectedProduct;
              
              const unitOptions = (product.availableUnits || [product.unit]).map(unit => ({
                value: unit,
                label: translateUnit(unit, locale)
              }));
              
              return (
                <div
                  key={product.id}
                  className="p-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: isSelected ? 'var(--secondary-container)' : 'var(--surface)',
                    border: `1px solid ${isSelected ? 'var(--secondary)' : 'var(--outline)'}`,
                  }}
                >
                  {/* En-tête du produit - Cliquable */}
                  <button
                    onClick={() => toggleProductSelection(product.id)}
                    className="w-full text-left flex items-center justify-between"
                    style={{
                      color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface)'
                    }}
                  >
                    <div className="flex-1 flex items-center gap-2">
                      {/* Indicateur "Ajouté" */}
                      {isAdded && (
                        <div 
                          className="flex items-center justify-center w-6 h-6 rounded flex-shrink-0"
                          style={{ 
                            backgroundColor: 'var(--success)',
                            color: 'var(--on-success-container)'
                          }}
                        >
                          <Check size={14} strokeWidth={3} />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">
                          {translateProduct(product.name, locale)}
                        </p>
                        <p 
                          className="text-xs mt-1"
                          style={{ 
                            color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                            opacity: 0.8
                          }}
                        >
                          {translateCategory(product.category, locale)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Prix ou Sélectionné */}
                    {!isSelected && (
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {product.unitCost.toFixed(2)} $
                        </p>
                        <p 
                          className="text-xs"
                          style={{ 
                            color: 'var(--on-surface-variant)',
                            opacity: 0.8
                          }}
                        >
                          / {translateUnit(product.unit, locale)}
                        </p>
                      </div>
                    )}
                  </button>
                  
                  {/* Champs de quantité/unité si sélectionné */}
                  {isSelected && selectedProduct && (
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <OctogoneQuantitySelector
                          value={selectedProduct.quantity}
                          onChange={(qty) => updateProductQuantity(product.id, qty)}
                          min={0}
                          step={0.1}
                          size="sm"
                          forceBorderWhite={true}
                        />
                        <OctogoneUnitSelector
                          options={unitOptions}
                          value={selectedProduct.unit}
                          onChange={(unit) => updateProductUnit(product.id, unit)}
                          size="sm"
                          forceBorderWhite={true}
                        />
                      </div>
                      {/* Prix dynamique */}
                      <div className="text-right">
                        <p className="text-sm font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
                          {(selectedProduct.quantity * product.unitCost).toFixed(2)} $
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer avec bouton d'ajout */}
        {selectedProducts.length > 0 && (
          <div 
            className="p-4 border-t"
            style={{ 
              backgroundColor: 'var(--surface-variant)',
              borderColor: 'var(--outline)'
            }}
          >
            <OctogoneButton
              variant="primary"
              size="lg"
              onClick={handleAddProducts}
              className="w-full"
              icon={<Plus size={20} />}
            >
              {isEnglish 
                ? `Add ${selectedProducts.length} product${selectedProducts.length > 1 ? 's' : ''} to recipe`
                : `Ajouter ${selectedProducts.length} produit${selectedProducts.length > 1 ? 's' : ''} à la recette`
              }
            </OctogoneButton>
          </div>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
