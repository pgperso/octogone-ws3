"use client";

import React from 'react';
import Image from 'next/image';
import { Calculator } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface RecipeHeroSectionProps {
  recipeName: string;
  recipeImage: string;
  description: string;
  onCalculateClick: () => void;
  locale?: 'fr' | 'en';
}

export const RecipeHeroSection: React.FC<RecipeHeroSectionProps> = ({
  recipeName,
  recipeImage,
  description,
  onCalculateClick,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  return (
    <div 
      className="w-full px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface-container-low)',
        borderBottom: '1px solid var(--outline)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image du burger */}
          <div className="order-2 lg:order-1">
            <div 
              className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl"
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
          </div>

          {/* Description et bouton */}
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
              {description}
            </p>

            <div className="pt-2">
              <OctogoneButton
                variant="primary"
                size="lg"
                onClick={onCalculateClick}
                className="gap-3"
              >
                <Calculator size={24} />
                {isEnglish ? 'Calculate my recipe price' : 'Calculer le prix de ma recette'}
              </OctogoneButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
