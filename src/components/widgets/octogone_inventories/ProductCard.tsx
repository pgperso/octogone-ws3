"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, ImageIcon, ChefHat } from 'lucide-react';
import { translateCategory, translateProduct, translateUnit, translateBrand } from '@/data/products/octogone_products_translations';
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

interface ProductCardProps {
  product: Product;
  locale?: 'fr' | 'en';
  currentQuantity?: number; // Nouvelle saisie de l'utilisateur
  onAddToOrder?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, locale = 'fr', currentQuantity = 0, onAddToOrder }) => {
  const isEnglish = locale === 'en';
  const displayBrand = product.brand ? translateBrand(product.brand, locale) : (isEnglish ? 'No brand' : 'Sans marque');
  const minInventory = product.minInventory || 0;
  
  // Stock actuel = toujours la quantité saisie (currentQuantity vient de la calculatrice)
  const actualStock = currentQuantity;
  const isBelowMinimum = actualStock < minInventory;
  const percentage = minInventory > 0 ? Math.min((actualStock / minInventory) * 100, 100) : 100;
  const difference = actualStock - minInventory;
  
  // Mapper le nom du produit à son image
  const getProductImage = (productName: string): string | null => {
    const imageMap: Record<string, string> = {
      'Ail frais': '/products/fresh_garlic.avif',
      'Ananas': '/products/pineapple.avif',
      'Asperges': '/products/asparagus.avif',
      'Avocat': '/products/avocado.avif',
      'Bacon': '/products/bacon.png',
      'Baguette': '/products/bread.avif',
      'Bœuf haché': '/products/ground-beef.avif',
      'Basilic frais': '/products/fresh-basil.avif',
      'Beurre': '/products/butter.avif',
      'Bière blonde': '/products/blond_beer.avif',
      'Brocoli': '/products/broccoli.avif',
      'Bâtonnets de poisson surgelés': '/products/frozen-fish-sticks.avif',
      'Café en grains': '/products/coffee_beans.avif',
      'Chapelure assaisonnée': '/products/seasoned_breadcrumbs.avif',
      'Citrons': '/products/lemons.avif',
      'Coriandre fraîche': '/products/fresh-cilantro.avif',
      'Carottes': '/products/carotts.avif',
      'Cheddar': '/products/cheddar.avif',
      'Coca-Cola': '/products/coca-cola.avif',
      'Concombre': '/products/cucumber.avif',
      'Cornichons': '/products/pickles.avif',
      'Crème 35%': '/products/cream35.avif',
      'Crème glacée vanille': '/products/vanilla-ice-cream.avif',
      'Croquettes de poulet surgelées': '/products/frozen-chicken-nuggets.avif',
      'Farine tout usage': '/products/all-purpose-flour.avif',
      'Frites surgelées': '/products/frozen-fries.avif',
      'Fruits rouges surgelés': '/products/frozen-berries.avif',
      'Haricots verts surgelés': '/products/frozen-green-beans.avif',
      "Huile d'olive": '/products/olive-oil.avif',
      'Huile végétale': '/products/vegetable-oil.avif',
      "Jus d'orange": '/products/orange-juice.avif',
      'Ketchup': '/products/ketchup.avif',
      'Lait 3.25%': '/products/milk325.avif',
      'Laitue romaine': '/products/romaine-lettuce.avif',
      'Limes': '/products/limes.avif',
      'Légumes mélangés surgelés': '/products/frozen-mixed-vegetables.avif',
      'Maïs en grains surgelé': '/products/frozen-corn-kernels.avif',
      'Marinade pour poulet': '/products/chicken-marinade.avif',
      'Mayonnaise': '/products/mayonnaise.avif',
      'Mélange d\'épices maison': '/products/house-spice-blend.avif',
      'Moutarde': '/products/mustard.avif',
      'Oignons jaunes': '/products/yellow-onions.avif',
      'Pain à burger': '/products/burger-bun.avif',
      'Parmesan': '/products/parmesan.avif',
      'Poivre noir': '/products/black-pepper.avif',
      'Pâte feuilletée surgelée': '/products/frozen-puff-pastry.avif',
      'Pâtes sèches': '/products/dry-pasta.avif',
      'Pizza surgelée': '/products/frozen-pizza.avif',
      'Poitrine de poulet': '/products/chicken-breast.avif',
      'Poivrons rouges': '/products/red-bell-pepper.avif',
      'Pois verts surgelés': '/products/frozen-green-peas.avif',
      'Pommes de terre': '/products/potatoes.avif',
      'Rhum blanc': '/products/white-rum.avif',
      'Riz blanc': '/products/white-rice.avif',
      'Sel': '/products/salt.avif',
      "Sirop d'érable": '/products/maple-syrup.avif',
      'Sorbet aux fruits': '/products/fruit-sorbet.avif',
      'Sucre blanc': '/products/white-sugar.avif',
      'Thon en conserve': '/products/canned-tuna.png',
      'Tortillas': '/products/tortillas.avif',
      'Vinaigre balsamique': '/products/balsamic-vinegar.avif',
      'Vin blanc': '/products/white-wine.avif',
      'Vin rouge': '/products/red-wine.avif',
      'Œufs': '/products/eggs.avif',
      'Épinards surgelés': '/products/frozen-spinach.avif',
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
      {/* Photo à gauche - 1/3 */}
      <div className="relative flex-1 h-full" style={{ backgroundColor: 'var(--surface-variant)' }}>
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

      {/* Infos au centre - 1/3 */}
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

      {/* Troisième colonne - Graphique et bouton - 1/3 */}
      <div className="flex-1 p-6 border-l flex flex-col justify-between" style={{ borderColor: 'var(--outline)' }}>
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

        {/* Bouton Commander/Produire - Toujours visible */}
        {onAddToOrder && (
          <OctogoneButton
            variant="primary"
            size="lg"
            onClick={onAddToOrder}
            className="w-full"
            icon={product.isRecipe ? <ChefHat size={20} /> : <ShoppingCart size={20} />}
          >
            {product.isRecipe 
              ? (isEnglish ? 'Produce' : 'Produire')
              : (isEnglish ? 'Order' : 'Commander')
            }
          </OctogoneButton>
        )}
      </div>
    </div>
  );
};
