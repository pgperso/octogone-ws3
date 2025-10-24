"use client";

import React from 'react';
import Image from 'next/image';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { Calculator } from 'lucide-react';

interface RecipeLandingViewProps {
  recipeName: string;
  recipeImage: string;
  description: string;
  onCalculateClick: () => void;
  locale?: 'fr' | 'en';
}

export const RecipeLandingView: React.FC<RecipeLandingViewProps> = ({
  recipeName,
  recipeImage,
  description,
  onCalculateClick,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-12"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="max-w-4xl w-full">
        {/* Image de la recette */}
        <div 
          className="w-full aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl"
          style={{ border: '2px solid var(--outline)' }}
        >
          <Image
            src={recipeImage}
            alt={recipeName}
            width={1200}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenu */}
        <div className="text-center space-y-6">
          {/* Titre */}
          <h1 
            className="text-5xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {recipeName}
          </h1>

          {/* Description */}
          <p 
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {description}
          </p>

          {/* Bouton */}
          <div className="pt-4">
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
  );
};
