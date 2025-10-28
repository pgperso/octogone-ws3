"use client";

import React, { useState } from 'react';
import { InventoryHeroSection } from './InventoryHeroSection';
import { InventoryCalculationAnimation } from './InventoryCalculationAnimation';
import { OctogoneInventoryWidget } from './OctogoneInventoryWidget';

type FlowState = 'hero' | 'animation' | 'widget';

interface InventoryFlowContainerProps {
  locale?: 'fr' | 'en';
}

export const InventoryFlowContainer: React.FC<InventoryFlowContainerProps> = ({
  locale = 'fr'
}) => {
  const [flowState, setFlowState] = useState<FlowState>('hero');
  const isEnglish = locale === 'en';

  // Données de l'inventaire
  const inventoryName = isEnglish ? 'Weekly Inventory' : 'Inventaire hebdomadaire';
  const inventoryImage = '/images/pages/inventory1.avif';
  const description = isEnglish 
    ? 'Complete your weekly inventory count across all storage zones: walk-in cooler, dry storage, freezer, and bar area.'
    : 'Complétez votre inventaire hebdomadaire dans toutes les zones de stockage : chambre froide, entreposage sec, congélateur et zone bar.';

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
        <InventoryHeroSection
          inventoryName={inventoryName}
          inventoryImage={inventoryImage}
          description={description}
          onCalculateClick={handleCalculateClick}
          locale={locale}
        />
      )}

      {/* État 2: Animation de calcul */}
      {flowState === 'animation' && (
        <InventoryCalculationAnimation
          inventoryName={inventoryName}
          inventoryImage={inventoryImage}
          onComplete={handleAnimationComplete}
          locale={locale}
        />
      )}

      {/* État 3: Widget complet */}
      {flowState === 'widget' && (
        <div className="px-6 py-8">
          <div className="h-[800px]">
            <OctogoneInventoryWidget locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
};
