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
      {/* Toggle Switch à deux états */}
      <div 
        className="inline-flex rounded-lg p-1"
        style={{
          backgroundColor: 'var(--surface-variant)',
          border: '1px solid var(--outline)'
        }}
      >
        {/* Vue Originale */}
        <button
          onClick={() => onToggle(false)}
          className="px-4 py-2 rounded-md text-sm font-medium transition-all"
          style={{
            backgroundColor: !isMultiplierView ? 'var(--primary)' : 'transparent',
            color: !isMultiplierView ? 'var(--on-primary)' : 'var(--on-surface-variant)'
          }}
        >
          {isEnglish ? 'Original' : 'Originale'}
        </button>

        {/* Vue Multiplication */}
        <button
          onClick={() => onToggle(true)}
          className="px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2"
          style={{
            backgroundColor: isMultiplierView ? 'var(--primary)' : 'transparent',
            color: isMultiplierView ? 'var(--on-primary)' : 'var(--on-surface-variant)'
          }}
        >
          <Calculator size={14} />
          {isEnglish ? 'Multiply' : 'Multiplier'}
        </button>
      </div>

      {/* Multiplicateur (visible seulement si vue multiplication activée) */}
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
