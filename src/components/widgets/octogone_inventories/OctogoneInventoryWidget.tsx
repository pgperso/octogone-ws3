"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { InventoryProductList } from './InventoryProductList';
import { InventoryCalculator } from './InventoryCalculator';
import inventoryData from '@/data/inventory/inventory-products.json';

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

export const OctogoneInventoryWidget: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = inventoryData.products as Product[];

  // Obtenir la quantité actuelle d'un produit
  const getCurrentQuantity = (productId: string): number => {
    const item = inventory.find(i => i.productId === productId);
    return item?.quantity || 0;
  };

  // Gérer la sélection d'un produit
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  // Enregistrer une quantité
  const handleSaveQuantity = (productId: string, quantity: number) => {
    setInventory(prev => {
      const existingIndex = prev.findIndex(i => i.productId === productId);
      
      if (quantity === 0) {
        // Supprimer si quantité = 0
        return prev.filter(i => i.productId !== productId);
      }
      
      if (existingIndex >= 0) {
        // Mettre à jour
        const updated = [...prev];
        updated[existingIndex] = { productId, quantity };
        return updated;
      } else {
        // Ajouter
        return [...prev, { productId, quantity }];
      }
    });
  };

  // Fonction pour annuler la sélection (non utilisée pour l'instant)
  // const handleCancel = () => {
  //   setSelectedProduct(null);
  // };

  // Navigation entre produits
  const handleNavigateNext = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex < products.length - 1) {
      setSelectedProduct(products[currentIndex + 1]);
    }
  };

  const handleNavigatePrevious = () => {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex > 0) {
      setSelectedProduct(products[currentIndex - 1]);
    }
  };

  // Calculer les totaux
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.unitCost * item.quantity : 0);
  }, 0);

  // Calculer la progression
  const totalProducts = products.length;
  const enteredProducts = inventory.filter(item => item.quantity > 0).length;
  const progressPercentage = totalProducts > 0 ? (enteredProducts / totalProducts) * 100 : 0;

  return (
    <div 
      className="w-full rounded-xl shadow-2xl overflow-hidden"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête avec avatar */}
      <div 
        className="p-6 border-b"
        style={{ 
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--outline)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          {/* Avatar et informations */}
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{ 
                border: '2px solid var(--primary)',
                padding: '2px'
              }}
            >
              <Image
                src="/images/avatars/marc.avif"
                alt="Marc"
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center h-16">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                Bonjour Marc
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                Directeur de restauration
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Groupe Resto & Co
              </p>
            </div>
          </div>

          {/* Statistiques à droite */}
          <div 
            className="flex gap-6 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {enteredProducts}
              </div>
              <div className="text-xs">produits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {totalItems.toFixed(0)}
              </div>
              <div className="text-xs">unités</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {totalValue.toFixed(0)} $
              </div>
              <div className="text-xs">valeur</div>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
              Progression de l&apos;inventaire
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--on-surface)' }}>
              {enteredProducts} / {totalProducts} ({progressPercentage.toFixed(0)}%)
            </span>
          </div>
          <div 
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--surface-variant)' }}
          >
            <div 
              className="h-full transition-all duration-500 ease-out rounded-full"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: 'var(--success)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ height: '750px' }}>
        {/* Liste de produits (gauche) - scrollable */}
        <div className="border-r overflow-hidden" style={{ borderColor: 'var(--outline)' }}>
          <InventoryProductList
            products={products}
            inventory={inventory}
            onProductSelect={handleProductSelect}
            selectedProductId={selectedProduct?.id || null}
          />
        </div>

        {/* Calculatrice (droite) - définit la hauteur */}
        <div className="overflow-auto">
          <InventoryCalculator
            selectedProduct={selectedProduct}
            currentQuantity={selectedProduct ? getCurrentQuantity(selectedProduct.id) : 0}
            onSave={handleSaveQuantity}
            onNavigateNext={selectedProduct && products.findIndex(p => p.id === selectedProduct.id) < products.length - 1 ? handleNavigateNext : undefined}
            onNavigatePrevious={selectedProduct && products.findIndex(p => p.id === selectedProduct.id) > 0 ? handleNavigatePrevious : undefined}
          />
        </div>
      </div>
    </div>
  );
};
