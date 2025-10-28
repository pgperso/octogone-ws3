"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle2 } from 'lucide-react';
import { INVENTORY_TAGS, INITIAL_INVENTORY_PROGRESS, ANIMATION_TAG_DELAYS } from './inventoryPriceTags';
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
        {/* Titre centré */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className="text-3xl font-bold mb-2"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : Badges de produits comptés */}
          <div className="order-1 lg:order-1">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Titre de la colonne */}
              <div className="flex items-center gap-3 mb-6">
                <Package 
                  size={24} 
                  style={{ color: 'var(--primary)' }}
                />
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish ? 'Products Counted' : 'Produits comptés'}
                </h3>
              </div>

              {/* Liste des produits avec animation séquentielle */}
              <div className="space-y-3">
                {INVENTORY_TAGS.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={visibleTags.includes(tag.id) ? {
                      opacity: 1,
                      x: 0
                    } : {
                      opacity: 0,
                      x: -50
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <div 
                      className="flex items-center gap-4 p-4 rounded-xl border-2"
                      style={{
                        backgroundColor: visibleTags.includes(tag.id) 
                          ? 'rgba(180, 212, 255, 0.15)' 
                          : 'var(--surface)',
                        borderColor: visibleTags.includes(tag.id)
                          ? 'var(--primary)'
                          : 'var(--outline)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Icône de validation */}
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: visibleTags.includes(tag.id)
                            ? 'var(--primary)'
                            : 'var(--surface-variant)'
                        }}
                      >
                        {visibleTags.includes(tag.id) ? (
                          <CheckCircle2 
                            size={20} 
                            style={{ color: 'white' }}
                          />
                        ) : (
                          <span 
                            className="text-sm font-bold"
                            style={{ color: 'var(--on-surface-variant)' }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Nom du produit */}
                      <div className="flex-1">
                        <p 
                          className="text-lg font-semibold"
                          style={{ 
                            color: visibleTags.includes(tag.id)
                              ? 'var(--on-surface)'
                              : 'var(--on-surface-variant)'
                          }}
                        >
                          {isEnglish ? tag.labelEn : tag.labelFr}
                        </p>
                      </div>

                      {/* Quantité */}
                      <div 
                        className="flex-shrink-0 px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: visibleTags.includes(tag.id)
                            ? 'var(--primary-container)'
                            : 'var(--surface-variant)'
                        }}
                      >
                        <span 
                          className="text-xl font-bold"
                          style={{ 
                            color: visibleTags.includes(tag.id)
                              ? 'var(--on-primary-container)'
                              : 'var(--on-surface-variant)'
                          }}
                        >
                          {tag.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Colonne droite : Progress Bar */}
          <div className="order-2 lg:order-2 flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Container pour centrer le CircularProgress */}
              <div className="relative flex items-center justify-center" style={{ width: '300px', height: '300px' }}>
                <CircularProgress
                  progress={progress}
                  size={280}
                  strokeWidth={12}
                  showPercentage={true}
                  percentageLabel={isEnglish ? 'completed' : 'complété'}
                />
              </div>

              {/* Message sous le progress */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p 
                  className="text-base font-medium"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  {isEnglish 
                    ? 'Calculating costs and variances...'
                    : 'Calcul des coûts et écarts...'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
