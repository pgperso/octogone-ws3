"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
  // La recette commence à 35% (ingrédients de base déjà présents)
  const INITIAL_PROGRESS = 35;
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);

  // Tags de prix pour les ingrédients (position en % sur l'image)
  const priceTags = [
    { id: 1, price: '$0.45', label: isEnglish ? 'Bun' : 'Pain', top: '15%', left: '20%', delay: 0 },
    { id: 2, price: '$2.80', label: isEnglish ? 'Beef' : 'Bœuf', top: '55%', left: '50%', delay: 300 },
    { id: 3, price: '$0.65', label: isEnglish ? 'Cheddar' : 'Cheddar', top: '45%', left: '70%', delay: 600 },
    { id: 4, price: '$0.85', label: isEnglish ? 'Bacon' : 'Bacon', top: '60%', left: '25%', delay: 900 },
    { id: 5, price: '$0.25', label: isEnglish ? 'Lettuce' : 'Laitue', top: '35%', left: '35%', delay: 1200 },
  ];

  // Animation des tags de prix
  useEffect(() => {
    priceTags.forEach((tag) => {
      setTimeout(() => {
        setVisibleTags(prev => [...prev, tag.id]);
      }, tag.delay);
    });
  }, []);

  useEffect(() => {
    // Animation du progress de 35% à 100% en 3 secondes
    const duration = 3000;
    const interval = 30;
    const remainingProgress = 100 - INITIAL_PROGRESS;
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

  // Calcul du cercle de progression
  const size = 200;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
          <div className="order-2 lg:order-1 relative" style={{ height: '600px' }}>
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
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width={size}
                height={size}
                className="transform -rotate-90"
              >
                {/* Cercle de fond */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth={strokeWidth}
                />
                
                {/* Cercle de progression */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              
              {/* Pourcentage au centre */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-4xl font-bold"
                  style={{ 
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Tags de prix sur les ingrédients */}
            {priceTags.map((tag) => (
              <div
                key={tag.id}
                className="absolute"
                style={{
                  top: tag.top,
                  left: tag.left,
                  opacity: visibleTags.includes(tag.id) ? 1 : 0,
                  transform: visibleTags.includes(tag.id) ? 'scale(1)' : 'scale(0.8)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div
                  className="px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: 'rgba(var(--primary-rgb, 212, 175, 55), 0.95)',
                    border: '2px solid var(--primary)',
                  }}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'var(--on-primary)' }}
                    >
                      {tag.price}
                    </span>
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: 'var(--on-primary)', opacity: 0.9 }}
                    >
                      {tag.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Texte - Même position que hero */}
          <div className="order-1 lg:order-2 space-y-6">
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
