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
  const [ingredientCost, setIngredientCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [foodCost, setFoodCost] = useState(0);

  useEffect(() => {
    // Étape 1: Calcul du coût des ingrédients (0-3s)
    const timer1 = setTimeout(() => setStep(1), 500);
    
    // Animation du coût des ingrédients
    const ingredientInterval = setInterval(() => {
      setIngredientCost(prev => {
        const next = prev + 0.15;
        return next >= 4.75 ? 4.75 : next;
      });
    }, 30);

    // Étape 2: Calcul du prix de vente (3-5s)
    const timer2 = setTimeout(() => {
      setStep(2);
      clearInterval(ingredientInterval);
      setIngredientCost(4.75);
    }, 3000);

    // Animation du prix de vente
    const priceInterval = setInterval(() => {
      setSellingPrice(prev => {
        const next = prev + 0.25;
        return next >= 15.99 ? 15.99 : next;
      });
    }, 30);

    // Étape 3: Calcul du food cost (5-7s)
    const timer3 = setTimeout(() => {
      setStep(3);
      clearInterval(priceInterval);
      setSellingPrice(15.99);
    }, 5000);

    // Animation du food cost
    const foodCostInterval = setInterval(() => {
      setFoodCost(prev => {
        const next = prev + 0.5;
        return next >= 29.7 ? 29.7 : next;
      });
    }, 30);

    // Fin: Afficher le widget (7s)
    const timer4 = setTimeout(() => {
      clearInterval(foodCostInterval);
      setFoodCost(29.7);
      setTimeout(onComplete, 1000);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(ingredientInterval);
      clearInterval(priceInterval);
      clearInterval(foodCostInterval);
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

        {/* Cartes de calcul */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coût des ingrédients */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              backgroundColor: 'var(--secondary-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <DollarSign 
              size={32} 
              className="mx-auto mb-4" 
              style={{ color: 'var(--secondary)' }} 
            />
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: 'var(--on-secondary-container)' }}
            >
              {isEnglish ? 'Ingredient Cost' : 'Coût Ingrédients'}
            </p>
            <p 
              className="text-4xl font-bold"
              style={{ color: 'var(--on-secondary-container)' }}
            >
              ${ingredientCost.toFixed(2)}
            </p>
          </div>

          {/* Prix de vente */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              backgroundColor: 'var(--tertiary-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <TrendingUp 
              size={32} 
              className="mx-auto mb-4" 
              style={{ color: 'var(--tertiary)' }} 
            />
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: 'var(--on-tertiary-container)' }}
            >
              {isEnglish ? 'Selling Price' : 'Prix de Vente'}
            </p>
            <p 
              className="text-4xl font-bold"
              style={{ color: 'var(--on-tertiary-container)' }}
            >
              ${sellingPrice.toFixed(2)}
            </p>
          </div>

          {/* Food Cost % */}
          <div 
            className={`p-6 rounded-2xl transition-all duration-500 ${
              step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ 
              backgroundColor: 'var(--success-container)',
              border: '2px solid var(--outline)'
            }}
          >
            <Percent 
              size={32} 
              className="mx-auto mb-4" 
              style={{ color: 'var(--success)' }} 
            />
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: 'var(--on-success-container)' }}
            >
              Food Cost
            </p>
            <p 
              className="text-4xl font-bold"
              style={{ color: 'var(--on-success-container)' }}
            >
              {foodCost.toFixed(1)}%
            </p>
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
