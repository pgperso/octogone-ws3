"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Calculator, Mail, Key, CheckCircle } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image du burger */}
          <div className="order-2 lg:order-1">
            <div 
              className="w-full aspect-square rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '2px solid var(--outline)' }}
            >
              <Image
                src={recipeImage}
                alt={recipeName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description et bouton */}
          <div className="order-1 lg:order-2 space-y-6">
            <h1 
              className="text-4xl lg:text-5xl font-bold"
              style={{ color: 'var(--on-surface)' }}
            >
              {recipeName}
            </h1>
            
            <p 
              className="text-lg lg:text-xl leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {description}
            </p>

            {/* Système d'email gate (seulement si activé) */}
            {RECIPE_ACCESS_CONFIG.ENABLE_EMAIL_GATE && (
              <div className="space-y-4">
                {/* État 1: Demande d'email */}
                {accessState === 'email' && (
                  <div className="space-y-3">
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
                  <div className="space-y-3">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--secondary-container)' }}
                    >
                      <p 
                        className="text-sm font-medium"
                        style={{ color: 'var(--on-secondary-container)' }}
                      >
                        {isEnglish 
                          ? `Code sent to ${email}. Check your inbox!` 
                          : `Code envoyé à ${email}. Vérifiez votre boîte de réception !`}
                      </p>
                    </div>
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
                  <div 
                    className="p-4 rounded-lg flex items-center gap-3"
                    style={{ backgroundColor: 'var(--success-container)' }}
                  >
                    <CheckCircle size={24} style={{ color: 'var(--success)' }} />
                    <p 
                      className="font-medium"
                      style={{ color: 'var(--on-success-container)' }}
                    >
                      {isEnglish ? 'Access unlocked! Click the button below.' : 'Accès débloqué ! Cliquez sur le bouton ci-dessous.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bouton Calculer */}
            <div className="pt-2">
              <OctogoneButton
                variant="primary"
                size="lg"
                onClick={handleCalculateClick}
                disabled={!isButtonEnabled}
                className="gap-3"
              >
                <Calculator size={24} />
                {isEnglish ? 'Calculate my recipe price' : 'Calculer le prix de ma recette'}
              </OctogoneButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
