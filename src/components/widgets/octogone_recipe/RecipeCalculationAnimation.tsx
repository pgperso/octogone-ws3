"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent } from 'lucide-react';

interface RecipeCalculationAnimationProps {
  recipeName: string;
  onComplete: () => void;
  locale?: 'fr' | 'en';
}

export const RecipeCalculationAnimation: React.FC<RecipeCalculationAnimationProps> = ({
  recipeName,
  onComplete,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Étape 1: Analyse des ingrédients (0-2s)
    const timer1 = setTimeout(() => setStep(1), 500);

    // Étape 2: Calcul des coûts (2-4s)
    const timer2 = setTimeout(() => setStep(2), 2500);

    // Étape 3: Optimisation (4-5.5s)
    const timer3 = setTimeout(() => setStep(3), 4500);

    // Fin: Afficher le widget (5.5s)
    const timer4 = setTimeout(() => {
      setTimeout(onComplete, 500);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface)',
      }}
    >
      <div className="max-w-3xl w-full text-center space-y-12">
        {/* Titre */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div 
              className="p-6 rounded-full"
              style={{ backgroundColor: 'var(--primary-container)' }}
            >
              <Calculator size={48} style={{ color: 'var(--primary)' }} />
            </div>
          </div>
          <h2 
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? 'Calculating your recipe...' : 'Calcul de votre recette...'}
          </h2>
          <p 
            className="text-lg"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {recipeName}
          </p>
        </div>

        {/* Étapes de calcul */}
        <div className="space-y-6">
          {/* Étape 1: Analyse des ingrédients */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              backgroundColor: 'var(--secondary-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <DollarSign 
                  size={40} 
                  style={{ color: 'var(--secondary)' }} 
                />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--on-secondary-container)' }}
                >
                  {isEnglish ? 'Analyzing ingredients...' : 'Analyse des ingrédients...'}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--on-secondary-container)', opacity: 0.7 }}
                >
                  {isEnglish ? 'Calculating costs and quantities' : 'Calcul des coûts et quantités'}
                </p>
              </div>
              {step >= 2 && (
                <div className="flex-shrink-0 text-2xl">✓</div>
              )}
            </div>
          </div>

          {/* Étape 2: Calcul des coûts */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              backgroundColor: 'var(--tertiary-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <TrendingUp 
                  size={40} 
                  style={{ color: 'var(--tertiary)' }} 
                />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--on-tertiary-container)' }}
                >
                  {isEnglish ? 'Calculating costs...' : 'Calcul des coûts...'}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--on-tertiary-container)', opacity: 0.7 }}
                >
                  {isEnglish ? 'Food cost and profitability analysis' : 'Analyse du food cost et rentabilité'}
                </p>
              </div>
              {step >= 3 && (
                <div className="flex-shrink-0 text-2xl">✓</div>
              )}
            </div>
          </div>

          {/* Étape 3: Optimisation */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              backgroundColor: 'var(--success-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Percent 
                  size={40} 
                  style={{ color: 'var(--success)' }} 
                />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--on-success-container)' }}
                >
                  {isEnglish ? 'Optimizing recipe...' : 'Optimisation de la recette...'}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--on-success-container)', opacity: 0.7 }}
                >
                  {isEnglish ? 'Generating recommendations' : 'Génération des recommandations'}
                </p>
              </div>
              {step >= 3 && (
                <div className="flex-shrink-0 text-2xl">✓</div>
              )}
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="w-full max-w-md mx-auto">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'var(--surface-variant)' }}
          >
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--primary)',
                width: `${(step / 3) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
