"use client";

import React, { useRef } from 'react';
import { RecipeHeroSection } from './RecipeHeroSection';
import { OctogoneRecipeWidget } from './OctogoneRecipeWidget';

interface OctogoneRecipeWithHeroProps {
  locale?: 'fr' | 'en';
}

export const OctogoneRecipeWithHero: React.FC<OctogoneRecipeWithHeroProps> = ({
  locale = 'fr'
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const isEnglish = locale === 'en';

  // Données de la recette pour la hero section
  const recipeName = 'Cheeseburger Supreme';
  const recipeImage = '/products/supreme-cheesburger.avif';
  const description = isEnglish 
    ? 'A delicious gourmet burger with premium ingredients, perfectly grilled beef patty, aged cheddar, crispy bacon, fresh lettuce, tomatoes, and our secret sauce. A true culinary masterpiece that will delight your customers.'
    : 'Un délicieux burger gourmet avec des ingrédients premium, galette de bœuf parfaitement grillée, cheddar affiné, bacon croustillant, laitue fraîche, tomates et notre sauce secrète. Un véritable chef-dœuvre culinaire qui ravira vos clients.';

  const handleCalculateClick = () => {
    widgetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Hero Section */}
      <RecipeHeroSection
        recipeName={recipeName}
        recipeImage={recipeImage}
        description={description}
        onCalculateClick={handleCalculateClick}
        locale={locale}
      />

      {/* Widget de calcul */}
      <div ref={widgetRef} className="flex-1">
        <OctogoneRecipeWidget locale={locale} />
      </div>
    </div>
  );
};
