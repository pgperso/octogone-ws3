"use client";

import React, { useState } from 'react';
import { RecipeHeroSection } from './RecipeHeroSection';
import { RecipeCalculationAnimation } from './RecipeCalculationAnimation';
import { OctogoneRecipeWidget } from './OctogoneRecipeWidget';

type FlowState = 'hero' | 'animation' | 'widget';

interface RecipeFlowContainerProps {
  locale?: 'fr' | 'en';
}

export const RecipeFlowContainer: React.FC<RecipeFlowContainerProps> = ({
  locale = 'fr'
}) => {
  const [flowState, setFlowState] = useState<FlowState>('hero');
  const isEnglish = locale === 'en';

  // Données de la recette
  const recipeName = isEnglish ? 'Cheeseburger Supreme' : 'Cheeseburger Suprême';
  const recipeImage = '/products/cheesburger_recipe.avif';
  const description = isEnglish 
    ? 'Double grilled beef patty, sharp cheddar, smoked bacon, tomatoes, onions and our famous secret spicy sauce.'
    : 'Double galette de bœuf grillée, cheddar fort, bacon fumé, tomates, oignons et notre fameuse sauce épicée secrète.';

  const handleCalculateClick = () => {
    setFlowState('animation');
  };

  const handleAnimationComplete = () => {
    setFlowState('widget');
  };

  return (
    <div className="w-full">
      {/* État 1: Hero Section */}
      {flowState === 'hero' && (
        <RecipeHeroSection
          recipeName={recipeName}
          recipeImage={recipeImage}
          description={description}
          onCalculateClick={handleCalculateClick}
          locale={locale}
        />
      )}

      {/* État 2: Animation de calcul */}
      {flowState === 'animation' && (
        <RecipeCalculationAnimation
          recipeName={recipeName}
          recipeImage={recipeImage}
          onComplete={handleAnimationComplete}
          locale={locale}
        />
      )}

      {/* État 3: Widget complet */}
      {flowState === 'widget' && (
        <div className="px-6 py-8">
          <div className="h-[800px]">
            <OctogoneRecipeWidget locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
};
