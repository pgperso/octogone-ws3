"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Key, CheckCircle, FileEdit, Edit3 } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { RECIPE_ACCESS_CONFIG } from '@/config/recipe-access';
import { trackRecipeAccessRequest, trackRecipeAccessUnlocked, trackRecipeCalculationStart } from '@/lib/tracking/hubspot-events';

interface RecipeHeroSectionProps {
  recipeName: string;
  recipeImage: string;
  description: string;
  onCalculateClick: () => void;
  locale?: 'fr' | 'en';
}

type AccessState = 'email' | 'code' | 'unlocked';

export const RecipeHeroSection: React.FC<RecipeHeroSectionProps> = ({
  recipeName,
  recipeImage,
  description,
  onCalculateClick,
  locale = 'fr'
}) => {
  const isEnglish = locale === 'en';
  const [accessState, setAccessState] = useState<AccessState>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recipeProgress, setRecipeProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Animation de la progress bar au chargement (0% → 35%)
  useEffect(() => {
    // Démarrer l'animation après un court délai
    const timer = setTimeout(() => {
      setRecipeProgress(35);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animation du pourcentage affiché
  useEffect(() => {
    if (displayProgress < recipeProgress) {
      const duration = 2000; // 2 secondes
      const steps = 60; // 60 FPS
      const increment = recipeProgress / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setDisplayProgress(prev => {
          const next = prev + increment;
          if (next >= recipeProgress) {
            clearInterval(timer);
            return recipeProgress;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [recipeProgress, displayProgress]);

  // Si l'email gate est désactivé, le bouton est toujours actif
  const isButtonEnabled = !RECIPE_ACCESS_CONFIG.ENABLE_EMAIL_GATE || accessState === 'unlocked';

  const handleRequestCode = async () => {
    if (!email || !email.includes('@')) {
      setError(isEnglish ? 'Please enter a valid email' : 'Veuillez entrer un email valide');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/recipe/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale })
      });

      if (response.ok) {
        setAccessState('code');
        // Track HubSpot: Demande d'accès
        trackRecipeAccessRequest(email, locale);
      } else {
        setError(isEnglish ? 'Error sending code' : 'Erreur lors de l\'envoi du code');
      }
    } catch {
      setError(isEnglish ? 'Error sending code' : 'Erreur lors de l\'envoi du code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateCode = () => {
    if (code.toUpperCase() === RECIPE_ACCESS_CONFIG.ACCESS_CODE) {
      setAccessState('unlocked');
      setError('');
      // Track HubSpot: Accès débloqué
      trackRecipeAccessUnlocked(email, locale);
    } else {
      setError(isEnglish ? 'Invalid code' : 'Code invalide');
    }
  };

  const handleCalculateClick = () => {
    if (isButtonEnabled) {
      // Track HubSpot: Début du calcul
      trackRecipeCalculationStart(RECIPE_ACCESS_CONFIG.ENABLE_EMAIL_GATE, locale);
      onCalculateClick();
    }
  };

  return (
    <div 
      className="w-full px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface-container-low)',
        borderBottom: '1px solid var(--outline)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image du burger avec progress bar circulaire */}
          <div className="order-2 lg:order-1 relative">
            <div 
              className="w-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                border: '2px solid var(--outline)',
                aspectRatio: '1 / 1.3'
              }}
            >
              <Image
                src={recipeImage}
                alt={recipeName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Progress bar circulaire par-dessus l'image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width={200}
                height={200}
                className="transform -rotate-90"
              >
                {/* Cercle de fond */}
                <circle
                  cx={100}
                  cy={100}
                  r={92}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth={8}
                />
                
                {/* Cercle de progression */}
                <circle
                  cx={100}
                  cy={100}
                  r={92}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={8}
                  strokeDasharray={2 * Math.PI * 92}
                  strokeDashoffset={2 * Math.PI * 92 - (recipeProgress / 100) * (2 * Math.PI * 92)}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </svg>
              
              {/* Pourcentage au centre */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-4xl font-bold"
                  style={{ 
                    color: '#FFFFFF',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  {Math.round(displayProgress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Description et bouton - Hauteur égale à l'image */}
          <div className="order-1 lg:order-2 flex flex-col justify-between h-full space-y-4">
            <div>
            {/* Badge Brouillon */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ 
                  backgroundColor: 'var(--secondary-container)',
                  border: '1px solid var(--secondary)'
                }}
              >
                <FileEdit 
                  size={16} 
                  style={{ color: 'var(--on-secondary-container)' }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--on-secondary-container)' }}
                >
                  {isEnglish ? 'Draft' : 'Brouillon'}
                </span>
              </div>
            </div>

            <h1 
              className="text-4xl lg:text-5xl font-bold mb-3"
              style={{ color: 'var(--on-surface)' }}
            >
              {recipeName}
            </h1>
            
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {description}
            </p>
            </div>

            {/* Système d'email gate (seulement si activé) */}
            <div>
            {RECIPE_ACCESS_CONFIG.ENABLE_EMAIL_GATE && (
              <div className="space-y-2">
                {/* État 1: Demande d'email */}
                {accessState === 'email' && (
                  <div className="space-y-2">
                    <label 
                      className="text-sm font-medium"
                      style={{ color: 'var(--on-surface-variant)' }}
                    >
                      {isEnglish ? 'Email address' : 'Adresse email'}
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isEnglish ? 'your.email@example.com' : 'votre.email@exemple.com'}
                        className="flex-1 px-4 py-3 rounded-lg border-2 text-base"
                        style={{ 
                          borderColor: 'var(--outline)',
                          backgroundColor: 'var(--surface)',
                          color: 'var(--on-surface)'
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleRequestCode()}
                      />
                      <OctogoneButton
                        variant="secondary"
                        size="lg"
                        onClick={handleRequestCode}
                        disabled={isLoading}
                        className="gap-2 whitespace-nowrap"
                      >
                        <Mail size={20} />
                        {isEnglish ? 'Get code' : 'Recevoir'}
                      </OctogoneButton>
                    </div>
                    {error && (
                      <p className="text-sm" style={{ color: 'var(--error)' }}>{error}</p>
                    )}
                  </div>
                )}

                {/* État 2: Validation du code */}
                {accessState === 'code' && (
                  <div className="space-y-2">
                    <label 
                      className="text-sm font-medium"
                      style={{ color: 'var(--on-surface-variant)' }}
                    >
                      {isEnglish ? 'Access code' : 'Code d\'accès'}
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder={isEnglish ? 'Enter code' : 'Entrez le code'}
                        className="flex-1 px-4 py-3 rounded-lg border-2 text-base font-mono"
                        style={{ 
                          borderColor: 'var(--outline)',
                          backgroundColor: 'var(--surface)',
                          color: 'var(--on-surface)'
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleValidateCode()}
                      />
                      <OctogoneButton
                        variant="secondary"
                        size="lg"
                        onClick={handleValidateCode}
                        className="gap-2 whitespace-nowrap"
                      >
                        <Key size={20} />
                        {isEnglish ? 'Validate' : 'Valider'}
                      </OctogoneButton>
                    </div>
                    {error && (
                      <p className="text-sm" style={{ color: 'var(--error)' }}>{error}</p>
                    )}
                  </div>
                )}

                {/* État 3: Accès débloqué */}
                {accessState === 'unlocked' && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                    <p 
                      className="text-sm font-medium"
                      style={{ color: 'var(--success)' }}
                    >
                      {isEnglish ? 'Access granted' : 'Accès autorisé'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bouton Compléter */}
            <div>
              <OctogoneButton
                variant="primary"
                size="lg"
                onClick={handleCalculateClick}
                disabled={!isButtonEnabled}
                className="gap-2"
              >
                <Edit3 size={20} />
                {isEnglish ? 'Complete my recipe' : 'Compléter ma recette'}
              </OctogoneButton>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
