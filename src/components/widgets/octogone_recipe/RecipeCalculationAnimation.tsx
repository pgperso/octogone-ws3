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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation du progress de 0 à 100% en 3 secondes
    const duration = 3000;
    const interval = 30;
    const increment = (100 / duration) * interval;

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
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Image avec progress bar circulaire */}
          <div className="relative">
            <div 
              className="w-[400px] h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid var(--outline)' }}
            >
              <Image
                src={recipeImage}
                alt={recipeName}
                width={400}
                height={400}
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
          </div>

          {/* Texte */}
          <div className="text-center">
            <h2 
              className="text-2xl lg:text-3xl font-bold"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Calculating your recipe...' : 'Calcul de votre recette...'}
            </h2>
            <p 
              className="text-lg mt-2"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {recipeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
