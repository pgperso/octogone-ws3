"use client";

import React, { useState, useEffect } from 'react';
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
  storage?: 'sec' | 'congelateur' | 'frigidaire';
}

type StorageType = 'sec' | 'congelateur' | 'frigidaire';

interface InventoryItem {
  productId: string;
  quantity: number;
}

export const OctogoneInventoryWidget: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageType>('sec');
  const [searchTerm, setSearchTerm] = useState('');

  const products = inventoryData.products as Product[];
  
  // Filtrer les produits par emplacement
  const filteredProducts = products.filter(p => (p.storage || 'sec') === selectedStorage);

  // Réinitialiser la recherche quand on change d'emplacement
  useEffect(() => {
    setSearchTerm('');
  }, [selectedStorage]);

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

  // Navigation entre produits (dans l'emplacement actuel)
  const handleNavigateNext = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex < filteredProducts.length - 1) {
      setSelectedProduct(filteredProducts[currentIndex + 1]);
    }
  };

  const handleNavigatePrevious = () => {
    if (!selectedProduct) return;
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
    if (currentIndex > 0) {
      setSelectedProduct(filteredProducts[currentIndex - 1]);
    }
  };

  // Calculer le total de la valeur
  const totalValue = inventory.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.unitCost * item.quantity : 0);
  }, 0);

  // Calculer les valeurs par emplacement
  const getStorageValue = (storage: StorageType) => {
    const storageProducts = products.filter(p => (p.storage || 'sec') === storage);
    return storageProducts.reduce((sum, product) => {
      const item = inventory.find(i => i.productId === product.id);
      return sum + (item ? product.unitCost * item.quantity : 0);
    }, 0);
  };

  const secValue = getStorageValue('sec');
  const congelateurValue = getStorageValue('congelateur');
  const frigidaireValue = getStorageValue('frigidaire');

  // Calculer la progression par emplacement
  const getStorageProgress = (storage: StorageType) => {
    const storageProducts = products.filter(p => (p.storage || 'sec') === storage);
    const totalProducts = storageProducts.length;
    const enteredProducts = storageProducts.filter(p => 
      inventory.find(i => i.productId === p.id && i.quantity > 0)
    ).length;
    return {
      total: totalProducts,
      entered: enteredProducts,
      percentage: totalProducts > 0 ? (enteredProducts / totalProducts) * 100 : 0
    };
  };

  const secProgress = getStorageProgress('sec');
  const congelateurProgress = getStorageProgress('congelateur');
  const frigidaireProgress = getStorageProgress('frigidaire');

  // Obtenir le mois actuel en français
  const currentMonth = new Date().toLocaleDateString('fr-CA', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

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
                Inventaire {capitalizedMonth}
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                Directeur de la restauration
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Groupe Resto & Co
              </p>
            </div>
          </div>

          {/* Totaux par emplacement */}
          <div className="flex gap-4 text-sm">
            {/* Garde-manger */}
            <div className="flex-1 text-center">
              <div className="font-semibold mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                Garde-manger
              </div>
              <div className="font-bold text-xl" style={{ color: 'var(--primary)' }}>
                {secValue.toFixed(0)} $
              </div>
            </div>

            {/* Congélateur */}
            <div className="flex-1 text-center">
              <div className="font-semibold mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                Congélateur
              </div>
              <div className="font-bold text-xl" style={{ color: 'var(--primary)' }}>
                {congelateurValue.toFixed(0)} $
              </div>
            </div>

            {/* Frigidaire */}
            <div className="flex-1 text-center">
              <div className="font-semibold mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                Frigidaire
              </div>
              <div className="font-bold text-xl" style={{ color: 'var(--primary)' }}>
                {frigidaireValue.toFixed(0)} $
              </div>
            </div>

            {/* Total */}
            <div 
              className="flex-1 text-center p-2 rounded-lg"
              style={{ 
                backgroundColor: 'var(--primary-container)',
                border: '2px solid var(--primary)'
              }}
            >
              <div className="font-semibold mb-1" style={{ color: 'var(--on-primary-container)' }}>
                TOTAL
              </div>
              <div className="font-bold text-2xl" style={{ color: 'var(--on-primary-container)' }}>
                {totalValue.toFixed(0)} $
              </div>
            </div>
          </div>
        </div>

        {/* Barres de progression par emplacement */}
        <div className="mt-4 space-y-3">
          {/* Garde-manger */}
          <div className="flex items-center gap-3">
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
              onClick={() => setSelectedStorage('sec')}
              style={{ 
                borderColor: selectedStorage === 'sec' ? 'var(--secondary)' : 'var(--outline)',
                backgroundColor: 'var(--surface)'
              }}
            >
              {selectedStorage === 'sec' && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--secondary)' }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="storage-sec" 
                  className="text-sm font-semibold cursor-pointer" 
                  onClick={() => setSelectedStorage('sec')}
                  style={{ color: 'var(--on-surface)' }}
                >
                  Garde-manger ({secProgress.entered}/{secProgress.total})
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                  {secValue.toFixed(2)} $
                </span>
              </div>
              <div 
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--surface-variant)' }}
              >
                <div 
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ 
                    width: `${secProgress.percentage}%`,
                    backgroundColor: 'var(--success)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Inventaire congélateur */}
          <div className="flex items-center gap-3">
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
              onClick={() => setSelectedStorage('congelateur')}
              style={{ 
                borderColor: selectedStorage === 'congelateur' ? 'var(--secondary)' : 'var(--outline)',
                backgroundColor: 'var(--surface)'
              }}
            >
              {selectedStorage === 'congelateur' && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--secondary)' }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="storage-congelateur" 
                  className="text-sm font-semibold cursor-pointer" 
                  onClick={() => setSelectedStorage('congelateur')}
                  style={{ color: 'var(--on-surface)' }}
                >
                  Congélateur ({congelateurProgress.entered}/{congelateurProgress.total})
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                  {congelateurValue.toFixed(2)} $
                </span>
              </div>
              <div 
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--surface-variant)' }}
              >
                <div 
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ 
                    width: `${congelateurProgress.percentage}%`,
                    backgroundColor: 'var(--success)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Inventaire frigidaire */}
          <div className="flex items-center gap-3">
            <div 
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
              onClick={() => setSelectedStorage('frigidaire')}
              style={{ 
                borderColor: selectedStorage === 'frigidaire' ? 'var(--secondary)' : 'var(--outline)',
                backgroundColor: 'var(--surface)'
              }}
            >
              {selectedStorage === 'frigidaire' && (
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--secondary)' }}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="storage-frigidaire" 
                  className="text-sm font-semibold cursor-pointer" 
                  onClick={() => setSelectedStorage('frigidaire')}
                  style={{ color: 'var(--on-surface)' }}
                >
                  Frigidaire ({frigidaireProgress.entered}/{frigidaireProgress.total})
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                  {frigidaireValue.toFixed(2)} $
                </span>
              </div>
              <div 
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--surface-variant)' }}
              >
                <div 
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{ 
                    width: `${frigidaireProgress.percentage}%`,
                    backgroundColor: 'var(--success)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Liste de produits (gauche) - scrollable */}
        <div className="border-r w-full" style={{ borderColor: 'var(--outline)' }}>
          <InventoryProductList
            products={filteredProducts}
            inventory={inventory}
            onProductSelect={handleProductSelect}
            selectedProductId={selectedProduct?.id || null}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Calculatrice (droite) - définit la hauteur */}
        <div>
          <InventoryCalculator
            selectedProduct={selectedProduct}
            currentQuantity={selectedProduct ? getCurrentQuantity(selectedProduct.id) : 0}
            onSave={handleSaveQuantity}
            onNavigateNext={selectedProduct && filteredProducts.findIndex(p => p.id === selectedProduct.id) < filteredProducts.length - 1 ? handleNavigateNext : undefined}
            onNavigatePrevious={selectedProduct && filteredProducts.findIndex(p => p.id === selectedProduct.id) > 0 ? handleNavigatePrevious : undefined}
          />
        </div>
      </div>
    </div>
  );
};
