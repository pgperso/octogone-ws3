"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { INVENTORY_TAGS, INITIAL_INVENTORY_PROGRESS, ANIMATION_TAG_DELAYS } from './inventoryPriceTags';
import { QuantityTag } from './QuantityTag';
import { CircularProgress } from '../octogone_recipe/CircularProgress';

interface InventoryCalculationAnimationProps {
  inventoryName: string;
  inventoryImage: string;
  onComplete: () => void;
  locale?: 'fr' | 'en';
}

export const InventoryCalculationAnimation: React.FC<InventoryCalculationAnimationProps> = ({
  inventoryName,
  inventoryImage,
  onComplete,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [progress, setProgress] = useState(INITIAL_INVENTORY_PROGRESS);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);

  // Animation des tags de quantités
  useEffect(() => {
    const timers = INVENTORY_TAGS.map((tag, index) => 
      setTimeout(() => {
        setVisibleTags(prev => [...prev, tag.id]);
      }, ANIMATION_TAG_DELAYS[index])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Animation du progress
  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const remainingProgress = 100 - INITIAL_INVENTORY_PROGRESS;
    const increment = (remainingProgress / duration) * interval;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className="w-full px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface-container-low)',
        borderBottom: '1px solid var(--outline)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image de l'inventaire avec progress bar - Même position que hero */}
          <div className="order-1 lg:order-1 relative" style={{ height: '600px' }}>
            <div 
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid var(--outline)' }}
            >
              <Image
                src={inventoryImage}
                alt={inventoryName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Progress bar circulaire par-dessus l'image */}
            <CircularProgress
              progress={progress}
              size={200}
              strokeWidth={8}
              showPercentage={true}
            />

            {/* Tags de quantités sur les produits */}
            {INVENTORY_TAGS.map((tag) => (
              <QuantityTag
                key={tag.id}
                quantity={tag.quantity}
                label={isEnglish ? tag.labelEn : tag.labelFr}
                top={tag.top}
                left={'left' in tag ? tag.left : undefined}
                right={'right' in tag ? tag.right : undefined}
                isVisible={visibleTags.includes(tag.id)}
              />
            ))}
          </div>

          {/* Message de calcul */}
          <div className="order-2 lg:order-2 flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: 'var(--primary-container)' }}
              >
                <div 
                  className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: 'var(--primary)' }}
                />
              </div>
              <h2 
                className="text-2xl font-bold"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
