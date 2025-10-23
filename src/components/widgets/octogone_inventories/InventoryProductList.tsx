"use client";

import React, { useMemo, useState } from 'react';
import { Search, Check, History, X } from 'lucide-react';
import { translateCategory, translateProduct, translateUnit } from '@/data/products/octogone_products_translations';
import { OctogoneButton } from '@/components/ui/octogone-button';

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
  isRecipe?: boolean;
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
  onFilteredProductsChange?: (products: Product[]) => void;
  locale?: 'fr' | 'en';
}

type SortOption = 'alphabetical' | 'category' | 'inventoried' | 'not-inventoried' | 'recipes';

export const InventoryProductList: React.FC<InventoryProductListProps> = ({
  products,
  inventory,
  onProductSelect,
  selectedProductId,
  searchTerm,
  onSearchChange,
  onFilteredProductsChange,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');

  // Filtrer et trier les produits
  const filteredAndSortedProducts = useMemo(() => {
    // D'abord filtrer selon la recherche
    let filtered = products;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = products.filter(product => {
        const translatedName = translateProduct(product.name, locale).toLowerCase();
        const originalName = product.name.toLowerCase();
        
        return translatedName.includes(term) ||
               originalName.includes(term);
      });
    }

    // Ensuite trier selon l'option choisie
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        case 'category':
          const categoryA = translateCategory(a.category, locale);
          const categoryB = translateCategory(b.category, locale);
          if (categoryA !== categoryB) {
            return categoryA.localeCompare(categoryB);
          }
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        case 'inventoried':
          const quantityA = inventory.find(i => i.productId === a.id)?.quantity || 0;
          const quantityB = inventory.find(i => i.productId === b.id)?.quantity || 0;
          if (quantityA > 0 && quantityB === 0) return -1;
          if (quantityA === 0 && quantityB > 0) return 1;
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        case 'not-inventoried':
          const qtyA = inventory.find(i => i.productId === a.id)?.quantity || 0;
          const qtyB = inventory.find(i => i.productId === b.id)?.quantity || 0;
          if (qtyA === 0 && qtyB > 0) return -1;
          if (qtyA > 0 && qtyB === 0) return 1;
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        case 'recipes':
          if (a.isRecipe && !b.isRecipe) return -1;
          if (!a.isRecipe && b.isRecipe) return 1;
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, locale, sortBy, inventory]);

  // Notifier le parent des produits filtrés et triés et sélectionner le premier
  React.useEffect(() => {
    if (onFilteredProductsChange) {
      onFilteredProductsChange(filteredAndSortedProducts);
    }
    // Sélectionner automatiquement le premier produit
    if (filteredAndSortedProducts.length > 0) {
      onProductSelect(filteredAndSortedProducts[0]);
    }
  }, [filteredAndSortedProducts, onFilteredProductsChange, onProductSelect]);

  // Obtenir la quantité d'un produit
  const getQuantity = (productId: string): number => {
    const item = inventory.find(i => i.productId === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="flex flex-col w-full" style={{ maxHeight: '750px' }}>
      {/* Barre de recherche */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--outline)' }}>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
              style={{ color: 'var(--on-surface-variant)' }}
            />
            <input
              type="text"
              placeholder={isEnglish ? 'Search for a product...' : 'Rechercher un produit...'}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--outline)',
                color: 'var(--on-surface)',
                '--tw-ring-color': 'var(--primary)'
              } as React.CSSProperties}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Dropdown Tri */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--outline)',
              color: 'var(--on-surface)',
              '--tw-ring-color': 'var(--primary)'
            } as React.CSSProperties}
          >
            <option value="alphabetical">{isEnglish ? 'A-Z' : 'A-Z'}</option>
            <option value="category">{isEnglish ? 'Category' : 'Catégorie'}</option>
            <option value="inventoried">{isEnglish ? 'Inventoried' : 'Inventoriés'}</option>
            <option value="not-inventoried">{isEnglish ? 'Not inventoried' : 'Non inventoriés'}</option>
            <option value="recipes">{isEnglish ? 'Recipes' : 'Recettes'}</option>
          </select>
          
          {/* Bouton Historique */}
          <OctogoneButton
            variant="primary"
            size="sm"
            icon={<History className="w-5 h-5" />}
            onClick={() => {
              // TODO: Implémenter l'affichage de l'historique
              console.log('Afficher l\'historique');
            }}
          >
            {isEnglish ? 'History' : 'Historique'}
          </OctogoneButton>
        </div>
      </div>

      {/* En-tête des colonnes */}
      <div className="flex gap-2 px-6 py-3 border-b font-semibold text-sm" style={{ backgroundColor: 'var(--surface-container)', borderColor: 'var(--outline)', color: 'var(--on-surface-variant)' }}>
        <div className="flex-[2]">{isEnglish ? 'Product' : 'Produit'}</div>
        <div className="flex-1">{isEnglish ? 'Previous inventory' : 'Inventaire précédent'}</div>
        <div className="flex-1">{isEnglish ? 'Current inventory' : 'Inventaire en cours'}</div>
        <div className="flex-1 text-right pr-2">{isEnglish ? 'Total value' : 'Valeur totale'}</div>
        <div className="w-12 flex-shrink-0"></div>
      </div>

      {/* Liste scrollable */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedProducts.length === 0 ? (
          <div 
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'No product found' : 'Aucun produit trouvé'}
          </div>
        ) : (
          filteredAndSortedProducts.map((product: Product) => {
            const quantity = getQuantity(product.id);
            const totalCost = quantity * product.unitCost;
            const isSelected = selectedProductId === product.id;
            
            return (
              <div
                key={product.id}
                onClick={() => onProductSelect(product)}
                className="flex gap-2 px-6 py-3 cursor-pointer border-b transition-all hover:bg-opacity-50"
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
                <div className="flex-[2]">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{translateProduct(product.name, locale)}</div>
                    {product.isRecipe && (
                      <span 
                        className="px-2 py-0.5 text-xs font-semibold rounded-full"
                        style={{ 
                          backgroundColor: 'var(--tertiary-container)',
                          color: 'var(--on-tertiary-container)'
                        }}
                      >
                        {isEnglish ? 'Recipe' : 'Recette'}
                      </span>
                    )}
                  </div>
                  <div 
                    className="text-xs mt-0.5"
                    style={{ color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {translateCategory(product.category, locale)}
                  </div>
                </div>
                
                {/* Colonne Inventaire précédent */}
                <div className="flex-1 flex items-center justify-center">
                  <div 
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{
                      backgroundColor: quantity === 0 ? 'var(--secondary-container)' : 'var(--surface)',
                      color: quantity === 0 ? 'var(--on-secondary-container)' : 'var(--outline)',
                      border: isSelected ? '3px solid white' : (quantity === 0 ? '3px solid white' : '2px solid var(--outline)'),
                      fontWeight: quantity === 0 ? 'bold' : 'normal'
                    }}
                  >
                    <div className="font-semibold text-sm">
                      {product.initialQuantity || 0} {translateUnit(product.unit, locale)}
                    </div>
                  </div>
                </div>
                
                {/* Colonne Inventaire en cours */}
                <div className="flex-1 flex items-center justify-center">
                  <div 
                    className="w-full px-3 py-2 rounded text-xs"
                    style={{
                      backgroundColor: quantity > 0 ? 'var(--secondary-container)' : 'var(--surface)',
                      color: quantity > 0 ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                      border: isSelected ? '3px solid white' : (quantity > 0 ? '3px solid white' : '2px solid var(--outline)'),
                      fontWeight: quantity > 0 ? 'bold' : 'normal'
                    }}
                  >
                    <div className="font-bold text-sm">
                      {quantity > 0 ? `${quantity} ${translateUnit(product.unit, locale)}` : '-'}
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-right pr-2 flex items-center justify-end">
                  <div className="font-semibold">
                    {quantity > 0 ? `${totalCost.toFixed(2)} $` : '-'}
                  </div>
                </div>
                <div className="w-12 flex-shrink-0 flex items-center justify-end">
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
