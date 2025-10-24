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
        icon: <CheckCircle size={20} />,
        title: isEnglish ? 'Your food cost is in the optimal range' : 'Votre food cost est dans la plage optimale',
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
        color: 'var(--on-secondary-container)',
        bgColor: 'var(--success)'
      };
    }
    
    // Food Cost trop bas : <28%
    if (actualFoodCost < 28) {
      return {
        icon: <TrendingDown size={20} />,
        title: isEnglish ? 'Your food cost is too low' : 'Votre food cost est trop bas',
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
        color: 'var(--on-secondary-container)',
        bgColor: 'var(--warning)'
      };
    }
    
    // Food Cost modérément élevé : 33-38% (Orange)
    if (actualFoodCost >= 33 && actualFoodCost <= 38) {
      return {
        icon: <TrendingUp size={20} />,
        title: isEnglish ? 'Your food cost is elevated' : 'Votre food cost est élevé',
        items: isEnglish ? [
          'Food cost above optimal range',
          'Consider increasing selling price',
          'Optimize portion sizes',
          'Review ingredient costs',
          'Monitor closely'
        ] : [
          'Food cost au-dessus de la plage optimale',
          'Considérer augmenter le prix de vente',
          'Optimiser les portions',
          'Réviser les coûts des ingrédients',
          'Surveiller de près'
        ],
        color: 'var(--on-secondary-container)',
        bgColor: '#FF8C00' // Orange
      };
    }
    
    // Food Cost très élevé : >38% (Rouge)
    return {
      icon: <TrendingUp size={20} />,
      title: isEnglish ? 'Your food cost is very high' : 'Votre food cost est très élevé',
      items: isEnglish ? [
        'Food cost critically high',
        'Urgent action required',
        'Increase selling price immediately',
        'Reduce portion sizes',
        'Negotiate with suppliers',
        'Replace expensive ingredients'
      ] : [
        'Food cost critique',
        'Action urgente requise',
        'Augmenter le prix de vente immédiatement',
        'Réduire les portions',
        'Négocier avec les fournisseurs',
        'Remplacer certains ingrédients coûteux'
      ],
        color: '#FFFFFF', // Blanc
        bgColor: 'var(--error)'
      };
  };

  const recommendation = getRecommendations();

  return (
    <div className="flex flex-col h-full">
      {/* Titre comme les autres widgets */}
      <p 
        className="text-xs font-medium mb-2"
        style={{ color: 'var(--on-surface-variant)' }}
      >
        {isEnglish ? 'Recommendations' : 'Recommandations'}
      </p>

      {/* Container - Fond plein coloré */}
      <div 
        className="px-4 py-2 rounded-lg flex items-center justify-center gap-2 flex-1"
        style={{ 
          backgroundColor: recommendation.bgColor
        }}
        onClick={onClick}
      >
        <div style={{ color: recommendation.color }} className="flex-shrink-0">
          {recommendation.icon}
        </div>
        <p 
          className="text-sm font-medium leading-tight"
          style={{ color: recommendation.color }}
        >
          {recommendation.title}
        </p>
      </div>
    </div>
  );
};
