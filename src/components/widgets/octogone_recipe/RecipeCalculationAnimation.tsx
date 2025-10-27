"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RECIPE_PRICE_TAGS, INITIAL_RECIPE_PROGRESS, ANIMATION_TAG_DELAYS } from './recipePriceTags';
import { PriceTag } from './PriceTag';
import { CircularProgress } from './CircularProgress';

interface RecipeCalculationAnimationProps {
  recipeName: string;
  recipeImage: string;
  onComplete: () => void;
  locale?: 'fr' | 'en';
}

export const RecipeCalculationAnimation: React.FC<RecipeCalculationAnimationProps> = ({
  recipeName,
  recipeImage,
  onComplete,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [progress, setProgress] = useState(INITIAL_RECIPE_PROGRESS);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);

  // Animation des tags de prix
  useEffect(() => {
    const timers = RECIPE_PRICE_TAGS.map((tag, index) => 
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
    const remainingProgress = 100 - INITIAL_RECIPE_PROGRESS;
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
          {/* Image du burger avec progress bar - Même position que hero */}
          <div className="order-1 lg:order-1 relative" style={{ height: '600px' }}>
            <div 
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid var(--outline)' }}
            >
              <Image
                src={recipeImage}
                alt={recipeName}
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

            {/* Tags de prix sur les ingrédients */}
            {RECIPE_PRICE_TAGS.map((tag) => (
              <PriceTag
                key={tag.id}
                price={tag.price}
                label={isEnglish ? tag.labelEn : tag.labelFr}
                top={tag.top}
                left={'left' in tag ? tag.left : undefined}
                right={'right' in tag ? tag.right : undefined}
                isVisible={visibleTags.includes(tag.id)}
              />
            ))}
          </div>

          {/* Texte - Même position que hero */}
          <div className="order-2 lg:order-2 space-y-6">
            <h1 
              className="text-4xl lg:text-5xl font-bold"
              style={{ color: 'var(--on-surface)' }}
            >
              {recipeName}
            </h1>
            
            <p 
              className="text-lg lg:text-xl leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish ? 'Preparing your recipe...' : 'Préparation de votre recette...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
