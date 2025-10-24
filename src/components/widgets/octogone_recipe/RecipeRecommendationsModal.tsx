"use client";

import React from 'react';
import { X, TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface RecipeRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  actualFoodCost: number;
  locale?: 'fr' | 'en';
}

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  bgColor: string;
}

export const RecipeRecommendationsModal: React.FC<RecipeRecommendationsModalProps> = ({
  isOpen,
  onClose,
  actualFoodCost,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  if (!isOpen) return null;

  // Déterminer l'état et les recommandations
  const getRecommendations = (): Recommendation => {
    // Food Cost idéal : 28-32%
    if (actualFoodCost >= 28 && actualFoodCost <= 32) {
      return {
        icon: <CheckCircle size={32} />,
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
        icon: <TrendingDown size={32} />,
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
      icon: <TrendingUp size={32} />,
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
    <>
      {/* Overlay de fond */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
          style={{ backgroundColor: 'var(--surface-container)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{
              backgroundColor: recommendation.bgColor,
              borderColor: recommendation.color
            }}
          >
            <div className="flex items-center gap-3">
              <div style={{ color: recommendation.color }}>
                {recommendation.icon}
              </div>
              <div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: recommendation.color }}
                >
                  {isEnglish ? 'Recommendations' : 'Recommandations'}
                </h2>
                <p
                  className="text-sm font-semibold"
                  style={{ color: recommendation.color }}
                >
                  {recommendation.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:opacity-70 transition-opacity"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenu */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {recommendation.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: recommendation.bgColor,
                    border: `1px solid ${recommendation.color}`
                  }}
                >
                  <span
                    className="text-2xl font-bold flex-shrink-0"
                    style={{ color: recommendation.color }}
                  >
                    {index + 1}
                  </span>
                  <p
                    className="text-base leading-relaxed flex-1"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer avec plage optimale */}
            <div
              className="mt-6 p-4 rounded-lg text-center"
              style={{
                backgroundColor: 'var(--surface-variant)',
                color: 'var(--on-surface-variant)'
              }}
            >
              <p className="text-sm font-medium">
                {isEnglish ? 'Optimal range: 28-32%' : 'Plage optimale : 28-32%'}
              </p>
            </div>
          </div>

          {/* Footer avec bouton */}
          <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--outline)' }}>
            <OctogoneButton
              variant="primary"
              size="md"
              onClick={onClose}
              className="w-full"
            >
              {isEnglish ? 'Close' : 'Fermer'}
            </OctogoneButton>
          </div>
        </div>
      </div>
    </>
  );
};
