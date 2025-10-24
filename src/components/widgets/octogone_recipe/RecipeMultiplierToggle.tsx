"use client";

import React from 'react';
import { Calculator } from 'lucide-react';

interface RecipeMultiplierToggleProps {
  isMultiplierView: boolean;
  multiplier: number;
  onToggle: (enabled: boolean) => void;
  onMultiplierChange: (value: number) => void;
  locale?: 'fr' | 'en';
}

export const RecipeMultiplierToggle: React.FC<RecipeMultiplierToggleProps> = ({
  isMultiplierView,
  multiplier,
  onToggle,
  onMultiplierChange,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Toggle */}
      <button
        onClick={() => onToggle(!isMultiplierView)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
        style={{
          backgroundColor: isMultiplierView ? 'var(--primary-container)' : 'var(--surface-variant)',
          color: isMultiplierView ? 'var(--on-primary-container)' : 'var(--on-surface-variant)',
          border: `1px solid ${isMultiplierView ? 'var(--primary)' : 'var(--outline)'}`
        }}
      >
        <Calculator size={16} />
        <span className="text-sm font-medium">
          {isEnglish ? 'Multiply Recipe' : 'Multiplier la Recette'}
        </span>
      </button>

      {/* Multiplicateur (visible seulement si activé) */}
      {isMultiplierView && (
        <div className="flex items-center gap-2">
          <span 
            className="text-sm font-medium"
            style={{ color: 'var(--on-surface)' }}
          >
            ×
          </span>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => onMultiplierChange(parseFloat(e.target.value) || 1)}
            min="1"
            step="1"
            className="w-16 px-2 py-1 text-center rounded-lg text-sm font-bold transition-all"
            style={{
              backgroundColor: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              border: '2px solid var(--primary)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
          />
          <span 
            className="text-xs"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'portions' : 'portions'}
          </span>
        </div>
      )}
    </div>
  );
};
