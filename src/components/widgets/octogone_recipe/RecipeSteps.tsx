"use client";

import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Edit2, Check, X } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface RecipeStep {
  id: string;
  order: number;
  description: string;
}

interface RecipeStepsProps {
  steps: RecipeStep[];
  onAddStep: (description: string) => void;
  onRemoveStep: (stepId: string) => void;
  onUpdateStep: (stepId: string, description: string) => void;
  onReorderStep: (stepId: string, direction: 'up' | 'down') => void;
  locale?: 'fr' | 'en';
}

export const RecipeSteps: React.FC<RecipeStepsProps> = ({
  steps,
  onAddStep,
  onRemoveStep,
  onUpdateStep,
  onReorderStep,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [newStepDescription, setNewStepDescription] = useState('');
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');

  const handleAddStep = () => {
    if (newStepDescription.trim()) {
      onAddStep(newStepDescription);
      setNewStepDescription('');
    }
  };

  const handleStartEdit = (step: RecipeStep) => {
    setEditingStepId(step.id);
    setEditingDescription(step.description);
  };

  const handleSaveEdit = () => {
    if (editingStepId && editingDescription.trim()) {
      onUpdateStep(editingStepId, editingDescription);
      setEditingStepId(null);
      setEditingDescription('');
    }
  };

  const handleCancelEdit = () => {
    setEditingStepId(null);
    setEditingDescription('');
  };

  return (
    <div 
      className="flex flex-col h-full rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: 'var(--surface-container)',
        border: '1px solid var(--outline)'
      }}
    >
      {/* En-tête */}
      <div 
        className="p-4 border-b"
        style={{ borderColor: 'var(--outline)' }}
      >
        <h4 
          className="text-lg font-semibold mb-3"
          style={{ color: 'var(--on-surface)' }}
        >
          {isEnglish ? 'Preparation Steps' : 'Étapes de préparation'}
        </h4>

        {/* Formulaire d'ajout */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newStepDescription}
            onChange={(e) => setNewStepDescription(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStep()}
            placeholder={isEnglish ? 'Add a new step...' : 'Ajouter une nouvelle étape...'}
            className="flex-1 px-3 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)',
              border: '1px solid var(--outline)'
            }}
          />
          <OctogoneButton
            variant="primary"
            size="sm"
            onClick={handleAddStep}
            icon={<Plus size={16} />}
          >
            {isEnglish ? 'Add' : 'Ajouter'}
          </OctogoneButton>
        </div>
      </div>

      {/* Liste des étapes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {steps.length === 0 ? (
          <div 
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? 'No steps yet. Add your first step above.' : 'Aucune étape. Ajoutez votre première étape ci-dessus.'}
          </div>
        ) : (
          steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ 
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--outline)'
              }}
            >
              {/* Numéro de l'étape */}
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)'
                }}
              >
                {step.order}
              </div>

              {/* Description */}
              <div className="flex-1">
                {editingStepId === step.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      className="flex-1 px-2 py-1 rounded text-sm"
                      style={{
                        backgroundColor: 'var(--surface-variant)',
                        color: 'var(--on-surface)',
                        border: '1px solid var(--outline)'
                      }}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="p-1 rounded hover:opacity-80"
                      style={{ color: 'var(--success)' }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-1 rounded hover:opacity-80"
                      style={{ color: 'var(--error)' }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1">
                {/* Réorganiser */}
                <div className="flex gap-1">
                  <button
                    onClick={() => onReorderStep(step.id, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => onReorderStep(step.id, 'down')}
                    disabled={index === steps.length - 1}
                    className="p-1 rounded hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {/* Éditer et Supprimer */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleStartEdit(step)}
                    className="p-1 rounded hover:opacity-80"
                    style={{ color: 'var(--primary)' }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onRemoveStep(step.id)}
                    className="p-1 rounded hover:opacity-80"
                    style={{ color: 'var(--error)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
