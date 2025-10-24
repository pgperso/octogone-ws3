"use client";

import React from 'react';
import { Calculator } from 'lucide-react';
import { OctogoneQuantitySelector } from '@/components/ui/octogone-quantity-selector';
import { OctogoneToggle } from '@/components/ui/octogone-toggle';

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

  const toggleOptions = [
    {
      value: 'original',
      label: isEnglish ? 'Original' : 'Originale'
    },
    {
      value: 'multiplier',
      label: isEnglish ? 'Multiply' : 'Multiplier',
      icon: <Calculator size={14} />
    }
  ];

  return (
    <div className="flex items-center gap-3">
      {/* Toggle Switch à deux états */}
      <OctogoneToggle
        options={toggleOptions}
        value={isMultiplierView ? 'multiplier' : 'original'}
        onChange={(value) => onToggle(value === 'multiplier')}
        size="sm"
      />

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
