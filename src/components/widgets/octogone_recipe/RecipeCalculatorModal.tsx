"use client";

import React from 'react';
import { X } from 'lucide-react';
import { OctogoneRecipeWidget } from './OctogoneRecipeWidget';

interface RecipeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale?: 'fr' | 'en';
}

export const RecipeCalculatorModal: React.FC<RecipeCalculatorModalProps> = ({
  isOpen,
  onClose,
  locale = 'fr'
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black z-50"
        style={{ opacity: 0.5 }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          style={{ 
            backgroundColor: 'var(--surface)',
            maxWidth: 'calc(100vw - 48px)',
            maxHeight: 'calc(100vh - 48px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full transition-all hover:opacity-70"
            style={{
              backgroundColor: 'var(--surface-container-high)',
              color: 'var(--on-surface)'
            }}
          >
            <X size={24} />
          </button>

          {/* Widget de recette */}
          <div className="flex-1 overflow-hidden">
            <OctogoneRecipeWidget locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
};
