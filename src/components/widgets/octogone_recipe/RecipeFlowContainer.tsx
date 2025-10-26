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
  const recipeName = 'Cheeseburger Supreme';
  const recipeImage = '/products/supreme-cheesburger.avif';
  const description = isEnglish 
    ? 'A delicious gourmet burger with premium ingredients, perfectly grilled beef patty, aged cheddar, crispy bacon, fresh lettuce, tomatoes, and our secret sauce. A true culinary masterpiece that will delight your customers.'
    : 'Un délicieux burger gourmet avec des ingrédients premium, galette de bœuf parfaitement grillée, cheddar affiné, bacon croustillant, laitue fraîche, tomates et notre sauce secrète. Un véritable chef-dœuvre culinaire qui ravira vos clients.';

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
