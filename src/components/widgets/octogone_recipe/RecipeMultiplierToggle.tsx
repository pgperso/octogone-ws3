"use client";

import React from 'react';
import { Calculator } from 'lucide-react';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';

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
            backgroundColor: !isMultiplierView ? 'var(--secondary-container)' : 'transparent',
            color: !isMultiplierView ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
          }}
        >
          {isEnglish ? 'Original' : 'Originale'}
        </button>

        {/* Vue Multiplication */}
        <button
          onClick={() => onToggle(true)}
          className="px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2"
          style={{
            backgroundColor: isMultiplierView ? 'var(--secondary-container)' : 'transparent',
            color: isMultiplierView ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
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
          <OctogoneQuantitySelector
            value={multiplier}
            onChange={onMultiplierChange}
            min={1}
            step={1}
            size="sm"
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
