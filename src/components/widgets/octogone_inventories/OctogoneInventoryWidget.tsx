"use client";

import React, { useState } from 'react';
import { InventoryProductList } from './InventoryProductList';
import { InventoryCalculator } from './InventoryCalculator';
import inventoryData from '@/data/inventory/inventory-products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitCost: number;
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

  // Annuler la sélection
  const handleCancel = () => {
    setSelectedProduct(null);
  };

  // Calculer les totaux
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.unitCost * item.quantity : 0);
  }, 0);

  return (
    <div 
      className="w-full rounded-xl shadow-2xl overflow-hidden"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête */}
      <div 
        className="p-6 border-b"
        style={{ 
          backgroundColor: 'var(--primary-container)',
          borderColor: 'var(--outline)'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--on-primary-container)' }}
        >
          Prise d'inventaire
        </h2>
        <div 
          className="flex gap-6 text-sm"
          style={{ color: 'var(--on-primary-container)' }}
        >
          <div>
            <span className="font-semibold">{inventory.length}</span> produits comptés
          </div>
          <div>
            <span className="font-semibold">{totalItems.toFixed(1)}</span> unités totales
          </div>
          <div>
            <span className="font-semibold">{totalValue.toFixed(2)} $</span> valeur totale
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ height: '600px' }}>
        {/* Liste de produits (gauche) */}
        <div className="border-r" style={{ borderColor: 'var(--outline)' }}>
          <InventoryProductList
            products={products}
            inventory={inventory}
            onProductSelect={handleProductSelect}
            selectedProductId={selectedProduct?.id || null}
          />
        </div>

        {/* Calculatrice (droite) */}
        <div>
          <InventoryCalculator
            selectedProduct={selectedProduct}
            currentQuantity={selectedProduct ? getCurrentQuantity(selectedProduct.id) : 0}
            onSave={handleSaveQuantity}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};
