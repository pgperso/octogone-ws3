"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Search, Check, History, X, ArrowUpDown, EqualNot, AlertTriangle } from 'lucide-react';
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
  enteredBy?: 'Vincent' | 'Julie' | 'Marie';
  enteredAt?: string;
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

export type SortOption = 'alphabetical' | 'category' | 'inventoried' | 'not-inventoried' | 'recipes' | 'non-inventoriable' | 'below-minimum';

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
    let filtered = products;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = products.filter(product => {
        const translatedName = translateProduct(product.name, locale).toLowerCase();
        const originalName = product.name.toLowerCase();
        return translatedName.includes(term) || originalName.includes(term);
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        case 'category':
          const categoryA = translateCategory(a.category, locale);
          const categoryB = translateCategory(b.category, locale);
          if (categoryA !== categoryB) return categoryA.localeCompare(categoryB);
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
        case 'below-minimum':
          const isBelowA = (a.theoreticalQuantity || 0) < (a.minInventory || 0);
          const isBelowB = (b.theoreticalQuantity || 0) < (b.minInventory || 0);
          if (isBelowA && !isBelowB) return -1;
          if (!isBelowA && isBelowB) return 1;
          return translateProduct(a.name, locale).localeCompare(translateProduct(b.name, locale));
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, locale, sortBy, inventory]);

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
          
          <OctogoneDropdownButton
            options={[
              { value: 'alphabetical', label: isEnglish ? 'A-Z' : 'A-Z' },
              { value: 'category', label: isEnglish ? 'Category' : 'Catégorie' },
              { value: 'inventoried', label: isEnglish ? 'Inventoried' : 'Inventoriés' },
              { value: 'not-inventoried', label: isEnglish ? 'Not inventoried' : 'Non inventoriés' },
              { value: 'recipes', label: isEnglish ? 'Recipes' : 'Recettes' },
              { value: 'non-inventoriable', label: isEnglish ? "Don't count" : 'Ne pas compter' },
              { value: 'below-minimum', label: isEnglish ? 'Below minimum threshold' : 'Sous le seuil minimum' }
            ]}
            value={sortBy}
            onChange={(value) => onSortChange(value as SortOption)}
            icon={<ArrowUpDown className="w-5 h-5" />}
            variant="secondary"
            size="sm"
          />
          
          <OctogoneButton
            variant="primary"
            size="sm"
            icon={<History className="w-5 h-5" />}
            onClick={() => {
              console.log('Afficher l\'historique');
            }}
          >
            {isEnglish ? 'History' : 'Historique'}
          </OctogoneButton>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table 
          className="w-full"
          style={{ 
            borderCollapse: 'separate',
            borderSpacing: 0
          }}
        >
          <thead 
            style={{ 
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: 'var(--surface-container)',
              borderBottom: '1px solid var(--outline)'
            }}
          >
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-xs" style={{ color: 'var(--on-surface)', width: '30%' }}>
                {isEnglish ? 'Product' : 'Produit'}
              </th>
              <th className="px-6 py-3 text-left font-semibold text-xs hidden md:table-cell" style={{ color: 'var(--on-surface)', width: '15%' }}>
                {isEnglish ? 'Category' : 'Catégorie'}
              </th>
              <th className="px-6 py-3 text-left font-semibold text-xs" style={{ color: 'var(--on-surface)', width: '18%' }}>
                <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Theoretical inventory' : 'Inventaire théorique'}</span>
                <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Theoretical' : 'Théorique'}</span>
              </th>
              <th className="px-6 py-3 text-left font-semibold text-xs" style={{ color: 'var(--on-surface)', width: '18%' }}>
                <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Current inventory' : 'Inventaire en cours'}</span>
                <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Current' : 'En cours'}</span>
              </th>
              <th className="px-6 py-3 text-left font-semibold text-xs" style={{ color: 'var(--on-surface)', width: '15%' }}>
                <span className="hidden md:inline" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Total value' : 'Valeur totale'}</span>
                <span className="md:hidden" style={{ color: 'var(--on-surface)' }}>{isEnglish ? 'Total' : 'Total'}</span>
              </th>
              <th className="px-6 py-3 text-right font-semibold text-xs hidden md:table-cell" style={{ color: 'var(--on-surface)', width: '4%' }}>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                  {isEnglish ? 'No product found' : 'Aucun produit trouvé'}
                </td>
              </tr>
            ) : (
              filteredAndSortedProducts.map((product: Product) => {
                const quantity = getQuantity(product.id);
                const totalCost = quantity * product.unitCost;
                const isSelected = selectedProductId === product.id;
                
                return (
                  <tr
                    key={product.id}
                    onClick={() => onProductSelect(product)}
                    className="cursor-pointer border-b transition-all"
                    style={{
                      backgroundColor: isSelected ? 'var(--secondary-container)' : 'transparent',
                      borderColor: 'var(--outline)',
                      color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface)'
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
                    <td className="px-6 py-3">
                      <div className="font-medium text-sm">{translateProduct(product.name, locale)}</div>
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
                    </td>
                    
                    {/* Colonne Catégorie */}
                    <td className="px-6 py-3 hidden md:table-cell">
                      <div 
                        className="text-sm"
                        style={{ color: isSelected ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
                      >
                        {!product.nonInventoriable && translateCategory(product.category, locale)}
                      </div>
                    </td>
                    
                    {/* Colonne Inventaire théorique */}
                    <td className="px-6 py-3">
                      {!product.nonInventoriable && (() => {
                        const theoreticalQty = product.theoreticalQuantity || 0;
                        const minInventory = product.minInventory || 0;
                        const isBelowMinimum = theoreticalQty < minInventory;
                        
                        return (
                          <div 
                            className="w-full px-2 py-2 rounded text-xs flex items-center justify-between gap-2"
                            style={{
                              backgroundColor: 'var(--surface)',
                              color: 'var(--on-surface)',
                              border: isSelected ? '3px solid white' : '2px solid var(--outline)',
                              fontWeight: 'normal'
                            }}
                          >
                            <div className="font-semibold text-xs">
                              {theoreticalQty} {translateUnit(product.unit, locale)}
                            </div>
                            {isBelowMinimum && (
                              <div className="relative group flex-shrink-0">
                                <div 
                                  className="w-5 h-5 rounded flex items-center justify-center"
                                  style={{ backgroundColor: 'var(--warning)' }}
                                >
                                  <AlertTriangle 
                                    size={12} 
                                    style={{ color: 'var(--on-primary-container)' }}
                                  />
                                </div>
                                <div 
                                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                  style={{ 
                                    backgroundColor: 'var(--warning)',
                                    color: 'var(--on-primary-container)'
                                  }}
                                >
                                  {isEnglish ? 'Below minimum threshold' : 'Sous le seuil minimum'}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </td>
                    
                    {/* Colonne Inventaire en cours */}
                    <td className="px-6 py-3">
                      {!product.nonInventoriable && (
                        <div 
                          className="w-full px-2 py-2 rounded text-xs flex items-center justify-between gap-2"
                          style={{
                            backgroundColor: quantity > 0 ? 'var(--success)' : 'var(--surface)',
                            color: quantity > 0 ? 'var(--on-success)' : 'var(--on-surface-variant)',
                            border: isSelected ? '3px solid white' : (quantity > 0 ? '3px solid white' : '2px solid var(--outline)'),
                            fontWeight: quantity > 0 ? 'bold' : 'normal'
                          }}
                        >
                          <div className="font-bold text-xs">
                            {quantity > 0 ? `${quantity} ${translateUnit(product.unit, locale)}` : '-'}
                          </div>
                          {quantity > 0 && (
                            <div className="relative group flex-shrink-0">
                              <div 
                                className="w-5 h-5 rounded flex items-center justify-center"
                                style={{ backgroundColor: 'var(--surface)' }}
                              >
                                <Check 
                                  size={12} 
                                  style={{ color: 'var(--on-surface)' }}
                                />
                              </div>
                              {/* Tooltip */}
                              <div 
                                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                style={{ 
                                  backgroundColor: 'var(--success)',
                                  color: 'var(--on-success)'
                                }}
                              >
                                {isEnglish ? 'Product inventoried' : 'Produit inventorié'}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    
                    {/* Colonne Valeur totale */}
                    <td className="px-6 py-3 text-left">
                      {product.nonInventoriable ? (
                        <span 
                          className="text-xs font-semibold"
                          style={{ color: 'var(--on-surface)' }}
                        >
                          {isEnglish ? "Don't count" : 'Ne pas compter'}
                        </span>
                      ) : (
                        <div className="font-semibold text-sm">
                          {quantity > 0 ? `${totalCost.toFixed(2)} $` : '-'}
                        </div>
                      )}
                    </td>
                    
                    {/* Colonne Avatar */}
                    <td className="px-6 py-3 text-right hidden md:table-cell">
                      {product.nonInventoriable ? (
                        <div className="flex justify-end">
                          <div 
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: 'var(--error)' }}
                          >
                            <EqualNot 
                              className="w-5 h-5" 
                              style={{ color: 'white' }}
                            />
                          </div>
                        </div>
                      ) : (
                        quantity > 0 && product.enteredBy && (
                          <div className="flex justify-end">
                            <div className="relative group">
                              <div className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                                <Image
                                  src={`/images/avatars/${product.enteredBy.toLowerCase()}.avif`}
                                  alt={product.enteredBy}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div 
                                className="absolute bottom-full right-0 mb-2 px-3 py-2 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                style={{ 
                                  backgroundColor: 'var(--secondary-container)',
                                  color: 'var(--on-secondary-container)'
                                }}
                              >
                                <div className="font-semibold">{product.enteredBy}</div>
                                {product.enteredAt && (
                                  <div className="text-[10px] mt-0.5 opacity-80">
                                    {(() => {
                                      const today = new Date();
                                      const dateStr = today.toLocaleDateString(isEnglish ? 'en-US' : 'fr-CA', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                      });
                                      const timeStr = new Date(product.enteredAt).toLocaleTimeString(isEnglish ? 'en-US' : 'fr-CA', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      });
                                      return `${dateStr}, ${timeStr}`;
                                    })()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
