"use client";

import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

interface RecipeFoodCostRecommendationsProps {
  actualFoodCost: number;
  targetFoodCost: number;
  locale?: 'fr' | 'en';
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
  targetFoodCost,
  locale = 'fr'
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
    <div 
      className="rounded-2xl p-6 h-full flex flex-col"
      style={{ 
        backgroundColor: 'var(--surface-container-low)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* Header avec icône et titre */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="p-2 rounded-lg"
          style={{ 
            backgroundColor: recommendation.bgColor,
            color: recommendation.color
          }}
        >
          {recommendation.icon}
        </div>
        <div className="flex-1">
          <h3 
            className="text-lg font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Recommendations' : 'Recommandations'}
          </h3>
          <p 
            className="text-sm font-semibold"
            style={{ color: recommendation.color }}
          >
            {recommendation.title}
          </p>
        </div>
      </div>

      {/* Liste des recommandations */}
      <div className="flex-1 space-y-2">
        {recommendation.items.map((item, index) => (
          <div 
            key={index}
            className="flex items-start gap-2 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            <span 
              className="mt-1 flex-shrink-0"
              style={{ color: recommendation.color }}
            >
              •
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Footer avec plage optimale */}
      <div 
        className="mt-4 pt-4 border-t text-xs"
        style={{ 
          borderColor: 'var(--outline)',
          color: 'var(--on-surface-variant)'
        }}
      >
        {isEnglish ? 'Optimal range: 28-32%' : 'Plage optimale : 28-32%'}
      </div>
    </div>
  );
};
