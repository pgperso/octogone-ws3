"use client";

import React, { useState } from 'react';
import { RecipeLandingView } from './RecipeLandingView';
import { RecipeCalculatorModal } from './RecipeCalculatorModal';

interface OctogoneRecipeContainerProps {
  locale?: 'fr' | 'en';
}

export const OctogoneRecipeContainer: React.FC<OctogoneRecipeContainerProps> = ({
  locale = 'fr'
}) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const isEnglish = locale === 'en';

  // Données de la recette pour la landing view
  const recipeName = 'Cheeseburger Supreme';
  const recipeImage = '/products/supreme-cheesburger.avif';
  const description = isEnglish 
    ? 'A delicious gourmet burger with premium ingredients. Calculate the exact cost of your recipe and optimize your food cost for maximum profitability.'
    : 'Un délicieux burger gourmet avec des ingrédients premium. Calculez le coût exact de votre recette et optimisez votre food cost pour une rentabilité maximale.';

  return (
    <>
      {/* Landing View */}
      <RecipeLandingView
        recipeName={recipeName}
        recipeImage={recipeImage}
        description={description}
        onCalculateClick={() => setIsCalculatorOpen(true)}
        locale={locale}
      />

      {/* Modal du calculateur */}
      <RecipeCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        locale={locale}
      />
    </>
  );
};
