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

  // Données de l'inventaire avec mois et année dynamiques
  const currentDate = new Date();
  const monthNames = {
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };
  const currentMonth = monthNames[isEnglish ? 'en' : 'fr'][currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  
  const inventoryName = isEnglish 
    ? `${currentMonth} ${currentYear} Inventory`
    : `Inventaire ${currentMonth} ${currentYear}`;
  const inventoryImage = '/images/pages/inventory5.avif';

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
          <OctogoneInventoryWidget locale={locale} />
        </div>
      )}
    </div>
  );
};
