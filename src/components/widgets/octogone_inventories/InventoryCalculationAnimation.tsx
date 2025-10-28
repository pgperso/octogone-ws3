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

  // Récupérer les mêmes produits que le Hero
  const allProducts = inventoryData.products as InventoryProduct[];
  const totalProductCount = allProducts.length;
  
  const inventoryProducts = allProducts
    .filter(p => p.initialQuantity && p.initialQuantity > 0)
    .slice(0, 5)
    .map((p, index) => ({
      id: index + 1,
      productId: p.id,
      name: p.name,
      quantity: p.initialQuantity!,
      unit: p.unit
    }));

  const currentProgress = (visibleTags.length / totalProductCount) * 100;

  // Tous les tags sont déjà visibles au départ (on garde l'état du Hero)
  useEffect(() => {
    setVisibleTags(inventoryProducts.map(p => p.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            
            {/* Layout en 2 colonnes sur l'image */}
            <div className="absolute inset-0 flex items-center justify-between p-6">
              {/* Colonne gauche : Badges en liste verticale */}
              <div className="flex flex-col justify-center space-y-3" style={{ maxWidth: '320px' }}>
                {inventoryProducts.map((tag) => (
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
                          style={{ color: 'white' }}
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

              {/* Colonne droite : Progress Bar */}
              <div className="flex-shrink-0 flex items-center justify-end" style={{ width: '250px' }}>
                <CircularProgress
                  progress={displayProgress}
                  size={200}
                  strokeWidth={8}
                  showPercentage={true}
                  percentageLabel={isEnglish ? 'completed' : 'complété'}
                />
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
