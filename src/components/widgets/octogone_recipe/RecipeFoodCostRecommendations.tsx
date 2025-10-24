"use client";

import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';

interface RecipeFoodCostRecommendationsProps {
  actualFoodCost: number;
  targetFoodCost?: number; // Optionnel, utilisé pour référence future
  locale?: 'fr' | 'en';
  onClick: () => void;
}

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  bgColor: string;
}

export const RecipeFoodCostRecommendations: React.FC<RecipeFoodCostRecommendationsProps> = ({
  actualFoodCost,
  locale = 'fr',
  onClick
}) => {
  const isEnglish = locale === 'en';

  // Déterminer l'état et les recommandations
  const getRecommendations = (): Recommendation => {
    // Food Cost idéal : 28-32%
    if (actualFoodCost >= 28 && actualFoodCost <= 32) {
      return {
        icon: <CheckCircle size={24} />,
        title: isEnglish ? 'Excellent Balance' : 'Excellent Équilibre',
        items: isEnglish ? [
          'Food cost in optimal range',
          'Good quality-profitability balance',
          'Maintain this level',
          'Monitor ingredient costs regularly'
        ] : [
          'Food cost dans la plage optimale',
          'Bon équilibre qualité-rentabilité',
          'Maintenir ce niveau',
          'Surveiller régulièrement les coûts'
        ],
        color: 'var(--success)',
        bgColor: 'var(--success-container)'
      };
    }
    
    // Food Cost trop bas : <28%
    if (actualFoodCost < 28) {
      return {
        icon: <TrendingDown size={24} />,
        title: isEnglish ? 'Low Food Cost - Opportunity' : 'Food Cost Bas - Opportunité',
        items: isEnglish ? [
          'Food cost below optimal range',
          'Consider improving ingredient quality',
          'Increase portion sizes',
          'Add premium garnishes or sides',
          'Risk: Perceived quality may suffer'
        ] : [
          'Food cost sous la plage optimale',
          'Considérer améliorer la qualité des ingrédients',
          'Augmenter les portions',
          'Ajouter des garnitures premium',
          'Risque : La qualité perçue peut en souffrir'
        ],
        color: 'var(--warning)',
        bgColor: 'var(--warning-container)'
      };
    }
    
    // Food Cost trop élevé : >32%
    return {
      icon: <TrendingUp size={24} />,
      title: isEnglish ? 'High Food Cost - Action Required' : 'Food Cost Élevé - Action Requise',
      items: isEnglish ? [
        'Food cost above optimal range',
        'Consider increasing selling price',
        'Optimize portion sizes',
        'Negotiate with suppliers',
        'Replace expensive ingredients',
        'Review recipe for waste reduction'
      ] : [
        'Food cost au-dessus de la plage optimale',
        'Considérer augmenter le prix de vente',
        'Optimiser les portions',
        'Négocier avec les fournisseurs',
        'Remplacer certains ingrédients coûteux',
        'Réviser la recette pour réduire le gaspillage'
      ],
      color: 'var(--error)',
      bgColor: 'var(--error-container)'
    };
  };

  const recommendation = getRecommendations();

  return (
    <div className="flex flex-col self-stretch">
      {/* Titre comme les autres widgets */}
      <p 
        className="text-xs font-medium mb-2"
        style={{ color: 'var(--on-surface-variant)' }}
      >
        {isEnglish ? 'Recommendations' : 'Recommandations'}
      </p>

      {/* Container cliquable - même style que les métriques */}
      <div 
        className="px-4 py-2 rounded-lg text-center flex flex-col items-center justify-center flex-1 cursor-pointer transition-all hover:opacity-80"
        style={{ 
          backgroundColor: recommendation.bgColor,
          border: `2px solid ${recommendation.color}`
        }}
        onClick={onClick}
      >
        <div style={{ color: recommendation.color }} className="mb-2">
          {recommendation.icon}
        </div>
        <p 
          className="text-sm font-bold leading-tight"
          style={{ color: recommendation.color }}
        >
          {recommendation.title}
        </p>
      </div>
    </div>
  );
};
