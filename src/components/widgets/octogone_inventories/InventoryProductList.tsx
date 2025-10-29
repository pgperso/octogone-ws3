"use client";

import React, { useMemo } from 'react';
import { Search, Check, History, X, ArrowUpDown, EqualNot } from 'lucide-react';
import { translateCategory, translateProduct, translateUnit } from '@/data/products/octogone_products_translations';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { OctogoneDropdownButton } from '@/components/ui/octogone-dropdown-button';

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
  nonInventoriable?: boolean;
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
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  locale?: 'fr' | 'en';
}

export type SortOption = 'alphabetical' | 'category' | 'inventoried' | 'not-inventoried' | 'recipes' | 'non-inventoriable';

export const InventoryProductList: React.FC<InventoryProductListProps> = ({
  products,
  inventory,
  onProductSelect,
  selectedProductId,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

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
        
        case 'non-inventoriable':
          if (a.nonInventoriable && !b.nonInventoriable) return -1;
          if (!a.nonInventoriable && b.nonInventoriable) return 1;
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, locale, sortBy, inventory]);

  // NOTE: onFilteredProductsChange n'est plus utilisé pour éviter les boucles infinies
  // La navigation avec les flèches utilise maintenant la liste locale

  // Obtenir la quantité d'un produit
  const getQuantity = (productId: string): number => {
    const item = inventory.find(i => i.productId === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="flex flex-col w-full" style={{ maxHeight: '750px' }}>
      {/* Barre de recherche */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--outline)' }}>
        <div className="flex items-center gap-3">
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
          <OctogoneDropdownButton
            options={[
              { value: 'alphabetical', label: isEnglish ? 'A-Z' : 'A-Z' },
              { value: 'category', label: isEnglish ? 'Category' : 'Catégorie' },
              { value: 'inventoried', label: isEnglish ? 'Inventoried' : 'Inventoriés' },
              { value: 'not-inventoried', label: isEnglish ? 'Not inventoried' : 'Non inventoriés' },
              { value: 'recipes', label: isEnglish ? 'Recipes' : 'Recettes' },
              { value: 'non-inventoriable', label: isEnglish ? "Don't count" : 'Ne pas compter' }
            ]}
            value={sortBy}
            onChange={(value) => onSortChange(value as SortOption)}
            icon={<ArrowUpDown className="w-5 h-5" />}
            variant="secondary"
            size="sm"
          />
          
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
      <div className="flex gap-2 px-6 py-3 border-b font-semibold text-sm" style={{ backgroundColor: 'var(--surface-container)', borderColor: 'var(--outline)' }}>
        <div className="flex-[2]" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Product' : 'Produit'}</div>
        <div className="flex-1 hidden md:block" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Category' : 'Catégorie'}</div>
        <div className="flex-1">
          <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}</span>
          <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Theoretical' : 'Théorique'}</span>
        </div>
        <div className="flex-1">
          <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Current inventory' : 'Inventaire en cours'}</span>
          <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Current' : 'En cours'}</span>
        </div>
        <div className="flex-1 text-right pr-2">
          <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Total value' : 'Valeur totale'}</span>
          <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Total' : 'Total'}</span>
        </div>
        <div className="w-12 flex-shrink-0 hidden md:block"></div>
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
                {/* Colonne Produit */}
                <div className={`flex-[2] ${product.isRecipe ? '' : 'flex items-center'}`}>
                  <div>
                    <div className="font-medium">{translateProduct(product.name, locale)}</div>
                    {product.isRecipe && (
                      <span 
                        className="px-2 py-0.5 text-xs font-semibold rounded-full inline-block mt-1"
                        style={{ 
                          backgroundColor: '#E2CDED',
                          color: '#1F1F1F'
                        }}
                      >
                        {isEnglish ? 'Recipe' : 'Recette'}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Colonne Catégorie */}
                <div className="flex-1 flex items-center hidden md:flex">
                  {!product.nonInventoriable && (
                    <div 
                      className="text-sm"
                      style={{ color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
                    >
                      {translateCategory(product.category, locale)}
                    </div>
                  )}
                </div>
                
                {/* Colonne Inventaire théorique */}
                <div className="flex-1 flex items-center justify-center">
                  {!product.nonInventoriable && (
                    <div 
                      className="px-3 py-1.5 rounded-md"
                      style={{ 
                        backgroundColor: isSelected ? 'var(--secondary-container)' : 'var(--surface-variant)',
                        color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
                        border: '1px solid var(--outline)'
                      }}
                    >
                      <div className="font-semibold text-sm">
                        {product.theoreticalQuantity || 0} {translateUnit(product.unit, locale)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Colonne Inventaire en cours */}
                <div className="flex-1 flex items-center justify-center">
                  {!product.nonInventoriable && (
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
                  )}
                </div>
                
                {/* Colonne Valeur totale */}
                <div className="flex-1 text-right pr-2 flex items-center justify-end">
                  {product.nonInventoriable ? (
                    <span 
                      className="text-xs font-semibold"
                      style={{ 
                        color: 'var(--on-surface)'
                      }}
                    >
                      {isEnglish ? "Don't count" : 'Ne pas compter'}
                    </span>
                  ) : (
                    <div className="font-semibold">
                      {quantity > 0 ? `${totalCost.toFixed(2)} $` : '-'}
                    </div>
                  )}
                </div>
                <div className="w-12 flex-shrink-0 flex items-center justify-end hidden md:flex">
                  {product.nonInventoriable ? (
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--error)' }}
                    >
                      <EqualNot 
                        className="w-5 h-5" 
                        style={{ color: 'white' }}
                      />
                    </div>
                  ) : (
                    quantity > 0 && (
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--success)' }}
                      >
                        <Check 
                          className="w-5 h-5" 
                          style={{ color: 'var(--on-primary-container)' }}
                        />
                      </div>
                    )
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
