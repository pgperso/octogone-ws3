"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { InventoryProductList, type SortOption } from './InventoryProductList';
import { InventoryCalculator } from './InventoryCalculator';
import { OctogoneButton } from '@/components/ui/octogone-button';
import inventoryData from '@/data/products/octogone_products_data.json';
import { translateCategory, translateProduct } from '@/data/products/octogone_products_translations';

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
  minInventory?: number;
  initialQuantity?: number;
  theoreticalQuantity?: number;
  isRecipe?: boolean;
}

type StorageType = 'sec' | 'congelateur' | 'frigidaire';

interface InventoryItem {
  productId: string;
  quantity: number;
}

interface OctogoneInventoryWidgetProps {
  locale?: 'fr' | 'en';
}

export const OctogoneInventoryWidget: React.FC<OctogoneInventoryWidgetProps> = ({ locale = 'fr' }) => {
  const isEnglish = locale === 'en';
  // Inventaire initial avec quelques produits déjà saisis
  const initialInventory: InventoryItem[] = [
    // Garde-manger (sec)
    { productId: 'prod-022', quantity: 25 }, // Farine
    { productId: 'prod-032', quantity: 15 }, // Pâtes
    { productId: 'prod-037', quantity: 20 }, // Riz
    { productId: 'prod-025', quantity: 5 }, // Huile d'olive
    { productId: 'prod-039', quantity: 2 }, // Sel
    { productId: 'prod-041', quantity: 10 }, // Sucre
    { productId: 'prod-009', quantity: 3 }, // Bière
    { productId: 'prod-017', quantity: 2 }, // Coca-Cola
    
    // Congélateur
    { productId: 'prod-023', quantity: 30 }, // Frites surgelées
    { productId: 'prod-049', quantity: 8 }, // Pizza surgelée
    { productId: 'prod-050', quantity: 12 }, // Légumes mélangés
    { productId: 'prod-057', quantity: 5 }, // Crème glacée
    
    // Frigidaire
    { productId: 'prod-008', quantity: 8 }, // Beurre
    { productId: 'prod-028', quantity: 20 }, // Lait
    { productId: 'prod-031', quantity: 15 }, // Œufs
    { productId: 'prod-013', quantity: 10 }, // Carottes
    { productId: 'prod-043', quantity: 8 }, // Tomates
    { productId: 'prod-029', quantity: 5 }, // Laitue
    { productId: 'prod-004', quantity: 12 }, // Avocat
  ];

  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageType>('sec');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSecondUser, setShowSecondUser] = useState(false);
  const [showThirdUser, setShowThirdUser] = useState(false);
  const [secondUserActive, setSecondUserActive] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');

  // Afficher le deuxième utilisateur après 10 secondes
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSecondUser(true);
    }, 10000);
    
    // Afficher le troisième utilisateur après 20 secondes
    const timer2 = setTimeout(() => {
      setShowThirdUser(true);
    }, 20000);
    
    // Désactiver le deuxième utilisateur après 30 secondes
    const timer3 = setTimeout(() => {
      setSecondUserActive(false);
    }, 30000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const products = inventoryData.products as Product[];
  
  // Filtrer les produits par emplacement
  const filteredProducts = products.filter(p => (p.storage || 'sec') === selectedStorage);

  // Calculer la liste triée (même logique que dans InventoryProductList)
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortBy, locale, inventory]);

  // Réinitialiser la recherche et sélectionner le premier produit quand on change d'emplacement
  useEffect(() => {
    setSearchTerm('');
    const firstProduct = filteredProducts[0];
    if (firstProduct) {
      setSelectedProduct(firstProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStorage]); // SEULEMENT selectedStorage, pas filteredProducts

  // Gérer la sélection d'un produit
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  // Enregistrer une quantité
  const handleSaveQuantity = (productId: string, quantity: number) => {
    setInventory(prev => {
      const existingIndex = prev.findIndex(i => i.productId === productId);
      
      if (quantity === 0) {
        return prev.filter(i => i.productId !== productId);
      }
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { productId, quantity };
        return updated;
      }
      
      return [...prev, { productId, quantity }];
    });
  };

  // Navigation entre produits (utilise la liste triée)
  const handleNavigateNext = () => {
    if (!selectedProduct) return;
    const currentIndex = sortedProducts.findIndex((p: Product) => p.id === selectedProduct.id);
    if (currentIndex < sortedProducts.length - 1) {
      setSelectedProduct(sortedProducts[currentIndex + 1]);
    }
  };

  const handleNavigatePrevious = () => {
    if (!selectedProduct) return;
    const currentIndex = sortedProducts.findIndex((p: Product) => p.id === selectedProduct.id);
    if (currentIndex > 0) {
      setSelectedProduct(sortedProducts[currentIndex - 1]);
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

  // Obtenir le mois actuel
  const currentMonth = new Date().toLocaleDateString(isEnglish ? 'en-US' : 'fr-CA', { month: 'long' });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  // Formater les valeurs monétaires avec espaces pour les milliers et point pour les décimales
  const formatCurrency = (value: number): string => {
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${integerPart}.${parts[1]}`;
  };

  // Fonction d'export CSV (évite la duplication de code)
  const handleExportCSV = () => {
    const exportData = products.map(product => {
      const item = inventory.find(i => i.productId === product.id);
      const quantity = item?.quantity || 0;
      const totalCost = quantity * product.unitCost;
      const storageLabel = product.storage === 'sec' 
        ? (isEnglish ? 'Pantry' : 'Garde-manger')
        : product.storage === 'congelateur' 
          ? (isEnglish ? 'Freezer' : 'Congélateur')
          : (isEnglish ? 'Fridge' : 'Frigidaire');
      
      return isEnglish ? {
        Location: storageLabel,
        Product: product.name,
        Category: product.category,
        Brand: product.brand || 'No brand',
        Quantity: quantity,
        Unit: product.unit,
        'Unit price': product.unitCost.toFixed(2),
        'Total value': totalCost.toFixed(2)
      } : {
        Emplacement: storageLabel,
        Produit: product.name,
        Catégorie: product.category,
        Marque: product.brand || 'Sans marque',
        Quantité: quantity,
        Unité: product.unit,
        'Prix unitaire': product.unitCost.toFixed(2),
        'Valeur totale': totalCost.toFixed(2)
      };
    });

    const headers = Object.keys(exportData[0]).join(',');
    const rows = exportData.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventaire_${capitalizedMonth}_${new Date().getFullYear()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="w-full rounded-xl shadow-2xl overflow-hidden"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête avec avatar utilisateur connecté */}
      <div 
        className="px-6 py-6"
        style={{ 
          backgroundColor: 'var(--surface-container)',
          borderBottom: '1px solid var(--outline)'
        }}
      >
        {/* Desktop: Avatar + Boutons en ligne */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
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
                {isEnglish ? 'Hello Marc' : 'Bonjour Marc'}
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                {isEnglish ? 'Restaurant Director' : 'Directeur de la restauration'}
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Groupe Resto & Co
              </p>
            </div>
          </div>

            {/* Bouton export et Total global */}
            <div className="flex items-center gap-4">
              {/* Bouton Export */}
              <OctogoneButton
                variant="primary"
                size="md"
                onClick={handleExportCSV}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                }
              >
                {isEnglish ? 'Export CSV' : 'Exporter CSV'}
              </OctogoneButton>

            {/* Total global */}
            <div 
              className="flex items-center gap-4 px-6 py-3 rounded-lg"
              style={{ 
                border: '1px solid var(--outline)'
              }}
            >
              <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Total inventory:' : 'Total inventaire :'}
              </div>
              <div className="font-bold text-2xl" style={{ color: 'var(--on-surface)' }}>
                {formatCurrency(totalValue)} $
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Avatar en haut, boutons en dessous */}
        <div className="lg:hidden">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
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
                {isEnglish ? 'Hello Marc' : 'Bonjour Marc'}
              </h2>
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                {isEnglish ? 'Restaurant Director' : 'Directeur de la restauration'}
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                Groupe Resto & Co
              </p>
            </div>
          </div>

          {/* Boutons en row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Bouton Export */}
            <OctogoneButton
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                // Préparer les données pour l'export
                const exportData = products.map(product => {
                  const item = inventory.find(i => i.productId === product.id);
                  const quantity = item?.quantity || 0;
                  const totalCost = quantity * product.unitCost;
                  const storageLabel = product.storage === 'sec' 
                    ? (isEnglish ? 'Pantry' : 'Garde-manger')
                    : product.storage === 'congelateur' 
                      ? (isEnglish ? 'Freezer' : 'Congélateur')
                      : (isEnglish ? 'Fridge' : 'Frigidaire');
                  
                  return isEnglish ? {
                    Location: storageLabel,
                    Product: product.name,
                    Category: product.category,
                    Brand: product.brand || 'No brand',
                    Quantity: quantity,
                    Unit: product.unit,
                    'Unit price': product.unitCost.toFixed(2),
                    'Total value': totalCost.toFixed(2)
                  } : {
                    Emplacement: storageLabel,
                    Produit: product.name,
                    Catégorie: product.category,
                    Marque: product.brand || 'Sans marque',
                    Quantité: quantity,
                    Unité: product.unit,
                    'Prix unitaire': product.unitCost.toFixed(2),
                    'Valeur totale': totalCost.toFixed(2)
                  };
                });

                // Créer le CSV
                const headers = Object.keys(exportData[0]).join(',');
                const rows = exportData.map(row => Object.values(row).join(',')).join('\n');
                const csv = `${headers}\n${rows}`;

                // Télécharger le fichier
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `inventaire_${capitalizedMonth}_${new Date().getFullYear()}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              }
            >
              {isEnglish ? 'Export CSV' : 'Exporter CSV'}
            </OctogoneButton>

            {/* Total global */}
            <div 
              className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg flex-1"
              style={{ 
                border: '1px solid var(--outline)'
              }}
            >
              <div className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Total:' : 'Total :'}
              </div>
              <div className="font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
                {formatCurrency(totalValue)} $
              </div>
            </div>
          </div>
        </div>

        {/* Titre de l'inventaire avec avatars actifs */}
        <div className="mt-6 mb-4 px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ color: 'var(--on-surface)' }}>
              {isEnglish ? `${capitalizedMonth} Inventory` : `Inventaire ${capitalizedMonth}`}
            </h3>
            
            {/* Avatars des utilisateurs actifs */}
            <div className="flex items-center gap-2">
              {/* Avatar Vincent - Toujours actif */}
              <div className="relative group">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                  <Image
                    src="/images/avatars/vincent.avif"
                    alt="Vincent"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Indicateur actif */}
                <div 
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                  style={{ 
                    backgroundColor: 'var(--success)',
                    borderColor: 'var(--surface)'
                  }}
                />
                {/* Tooltip */}
                <div 
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ 
                    backgroundColor: 'var(--inverse-surface)',
                    color: 'var(--inverse-on-surface)'
                  }}
                >
                  {isEnglish ? 'Vincent - Active' : 'Vincent - Actif'}
                </div>
              </div>

              {/* Avatar Julie - Apparaît après 10 secondes, devient inactif après 30s */}
              {showSecondUser && (
                <div className="relative group animate-fadeIn">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                    <Image
                      src="/images/avatars/julie.avif"
                      alt="Julie"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Indicateur actif/inactif */}
                  <div 
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 transition-colors"
                    style={{ 
                      backgroundColor: secondUserActive ? 'var(--success)' : 'var(--error)',
                      borderColor: 'var(--surface)'
                    }}
                  />
                  {/* Tooltip */}
                  <div 
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ 
                      backgroundColor: 'var(--inverse-surface)',
                      color: 'var(--inverse-on-surface)'
                    }}
                  >
                    {isEnglish 
                      ? `Julie - ${secondUserActive ? 'Active' : 'Disconnected'}` 
                      : `Julie - ${secondUserActive ? 'Active' : 'Déconnectée'}`}
                  </div>
                </div>
              )}

              {/* Avatar Marie - Apparaît après 20 secondes */}
              {showThirdUser && (
                <div className="relative group animate-fadeIn">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                    <Image
                      src="/images/avatars/marie.avif"
                      alt="Marie"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Indicateur actif */}
                  <div 
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{ 
                      backgroundColor: 'var(--success)',
                      borderColor: 'var(--surface)'
                    }}
                  />
                  {/* Tooltip */}
                  <div 
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ 
                      backgroundColor: 'var(--inverse-surface)',
                      color: 'var(--inverse-on-surface)'
                    }}
                  >
                    {isEnglish ? 'Marie - Active' : 'Marie - Active'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barres de progression par emplacement */}
        <div className="space-y-3">
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
                  {isEnglish ? `Pantry (${secProgress.entered}/${secProgress.total})` : `Garde-manger (${secProgress.entered}/${secProgress.total})`}
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--on-surface)' }}>
                  {formatCurrency(secValue)} $
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
                  {isEnglish ? `Freezer (${congelateurProgress.entered}/${congelateurProgress.total})` : `Congélateur (${congelateurProgress.entered}/${congelateurProgress.total})`}
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--on-surface)' }}>
                  {formatCurrency(congelateurValue)} $
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
                  {isEnglish ? `Fridge (${frigidaireProgress.entered}/${frigidaireProgress.total})` : `Frigidaire (${frigidaireProgress.entered}/${frigidaireProgress.total})`}
                </label>
                <span className="text-sm font-bold" style={{ color: 'var(--on-surface)' }}>
                  {formatCurrency(frigidaireValue)} $
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
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* Liste de produits (gauche) - scrollable */}
        <div className="border-r w-full h-full flex" style={{ borderColor: 'var(--outline)' }}>
          <InventoryProductList
            products={filteredProducts}
            inventory={inventory}
            onProductSelect={handleProductSelect}
            selectedProductId={selectedProduct?.id || null}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            locale={locale}
          />
        </div>

        {/* Calculatrice (droite) - définit la hauteur */}
        <div>
          <InventoryCalculator
            selectedProduct={selectedProduct}
            hasExistingEntry={selectedProduct ? inventory.some(i => i.productId === selectedProduct.id && i.quantity > 0) : false}
            currentInventoryQuantity={selectedProduct ? inventory.find(i => i.productId === selectedProduct.id)?.quantity || 0 : 0}
            onSave={handleSaveQuantity}
            onNavigateNext={selectedProduct && sortedProducts.findIndex((p: Product) => p.id === selectedProduct.id) < sortedProducts.length - 1 ? handleNavigateNext : undefined}
            onNavigatePrevious={selectedProduct && sortedProducts.findIndex((p: Product) => p.id === selectedProduct.id) > 0 ? handleNavigatePrevious : undefined}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
};
