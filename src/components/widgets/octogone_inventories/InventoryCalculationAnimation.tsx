"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import inventoryData from '@/data/products/octogone_products_data.json';
import { translateProduct } from '@/data/products/octogone_products_translations';
import Image from 'next/image';
import { CircularProgress } from '../octogone_recipe/CircularProgress';

interface InventoryCalculationAnimationProps {
  inventoryName: string;
  inventoryImage: string;
  onComplete: () => void;
  locale?: 'fr' | 'en';
}

interface InventoryProduct {
  id: string;
  name: string;
  initialQuantity?: number;
  unit: string;
}

export const InventoryCalculationAnimation: React.FC<InventoryCalculationAnimationProps> = ({
  inventoryName,
  inventoryImage,
  onComplete,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Liste des produits inventoriés (même liste que dans OctogoneInventoryWidget)
  const initialInventory = [
    { productId: 'prod-022', quantity: 25 },
    { productId: 'prod-032', quantity: 15 },
    { productId: 'prod-037', quantity: 20 },
    { productId: 'prod-025', quantity: 5 },
    { productId: 'prod-039', quantity: 2 },
    { productId: 'prod-041', quantity: 10 },
    { productId: 'prod-009', quantity: 3 },
    { productId: 'prod-017', quantity: 2 },
    { productId: 'prod-023', quantity: 30 },
    { productId: 'prod-049', quantity: 8 },
    { productId: 'prod-050', quantity: 12 },
    { productId: 'prod-057', quantity: 5 },
    { productId: 'prod-008', quantity: 8 },
    { productId: 'prod-028', quantity: 20 },
    { productId: 'prod-031', quantity: 15 },
    { productId: 'prod-013', quantity: 10 },
    { productId: 'prod-043', quantity: 8 },
    { productId: 'prod-029', quantity: 5 },
    { productId: 'prod-004', quantity: 12 },
  ];

  const allProducts = inventoryData.products as InventoryProduct[];
  const totalProductCount = allProducts.length;
  
  // Mapper les produits inventoriés avec leurs infos complètes
  const inventoryProducts = initialInventory.map((item, index) => {
    const product = allProducts.find(p => p.id === item.productId);
    return {
      id: index + 1,
      productId: item.productId,
      name: product?.name || '',
      quantity: item.quantity,
      unit: product?.unit || ''
    };
  }).filter(p => p.name); // Filtrer les produits non trouvés

  const currentProgress = (visibleTags.length / totalProductCount) * 100;

  // Afficher tous les produits immédiatement (pas d'animation séquentielle)
  useEffect(() => {
    setVisibleTags(inventoryProducts.map(p => p.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pas de scroll automatique puisque tous les produits sont déjà visibles

  // Animation du pourcentage de currentProgress vers 100%
  useEffect(() => {
    // Démarrer depuis le progrès actuel
    setDisplayProgress(currentProgress);
    
    const duration = 2000;
    const steps = 60;
    const targetProgress = 100;
    const increment = (targetProgress - currentProgress) / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        const next = prev + increment;
        if (next >= targetProgress) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return targetProgress;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentProgress, onComplete]);

  return (
    <div 
      className="w-full px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface-container-low)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image de l'inventaire avec badges et progress bar par-dessus (même style que Hero) */}
          <div className="order-1 lg:order-1 relative" style={{ height: '600px' }}>
            <div 
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                border: '2px solid var(--outline)'
              }}
            >
              <Image
                src={inventoryImage}
                alt={inventoryName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Progress bar centrée sur l'image */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <CircularProgress
                progress={displayProgress}
                size={280}
                strokeWidth={12}
                showPercentage={true}
                percentageLabel={isEnglish ? 'completed' : 'complété'}
                absolute={true}
              />
            </div>

            {/* Liste cachée pour référence */}
            <div style={{ display: 'none' }}>
              <div ref={scrollContainerRef} className="flex flex-col space-y-3 overflow-y-auto pr-2" style={{ maxHeight: '550px' }}>
                {inventoryProducts.filter(tag => visibleTags.includes(tag.id)).map((tag) => (
                  <div key={tag.id}>
                    <div 
                      className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Icône */}
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--success)',
                          borderRadius: '6px'
                        }}
                      >
                        <CheckCircle2 
                          size={16} 
                          style={{ color: 'var(--on-secondary-container)' }}
                        />
                      </div>

                      {/* Nom */}
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-sm font-semibold truncate"
                          style={{ color: '#1a1a1a' }}
                        >
                          {translateProduct(tag.name, locale)}
                        </p>
                      </div>

                      {/* Quantité avec unité */}
                      <div 
                        className="flex-shrink-0 px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <span 
                          className="text-sm font-bold"
                          style={{ color: '#1a1a1a' }}
                        >
                          {tag.quantity} {tag.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Message de calcul */}
          <div className="order-2 lg:order-2 flex items-center justify-center">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: 'var(--on-surface)' }}
              >
                {isEnglish ? 'Calculating inventory...' : 'Calcul de l\'inventaire...'}
              </h2>
              <p 
                className="text-lg"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                {isEnglish 
                  ? 'Analyzing stock levels and variances'
                  : 'Analyse des niveaux de stock et des écarts'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
