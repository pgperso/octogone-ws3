"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Key, ClipboardCheck, FileText, Package } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { RECIPE_ACCESS_CONFIG } from '@/config/recipe-access';
import { trackRecipeAccessRequest, trackRecipeAccessUnlocked } from '@/lib/tracking/hubspot-events';
import { INVENTORY_TAGS, INITIAL_INVENTORY_PROGRESS, HERO_TAG_DELAYS } from './inventoryPriceTags';
import { CircularProgress } from '../octogone_recipe/CircularProgress';

interface InventoryHeroSectionProps {
  inventoryName: string;
  inventoryImage: string;
  description: string;
  onCalculateClick: () => void;
  locale?: 'fr' | 'en';
}

type AccessState = 'email' | 'code' | 'unlocked';

export const InventoryHeroSection: React.FC<InventoryHeroSectionProps> = ({
  inventoryName,
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
  const [inventoryProgress, setInventoryProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);

  // Charger l'email sauvegardé et vérifier si déjà débloqué dans la session
  useEffect(() => {
    // Vérifier si déjà débloqué dans cette session (partagé avec Food Cost)
    const isUnlocked = sessionStorage.getItem('octogone_recipe_unlocked');
    if (isUnlocked === 'true') {
      setAccessState('unlocked');
    }
    
    // Pré-remplir l'email s'il existe
    const savedEmail = localStorage.getItem('octogone_recipe_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // Animation de la progress bar au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setInventoryProgress(INITIAL_INVENTORY_PROGRESS);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation des tags de quantités
  useEffect(() => {
    const timers = INVENTORY_TAGS.map((tag, index) => 
      setTimeout(() => {
        setVisibleTags(prev => [...prev, tag.id]);
      }, HERO_TAG_DELAYS[index])
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Animation du pourcentage affiché
  useEffect(() => {
    if (displayProgress < inventoryProgress) {
      const duration = 2000;
      const steps = 60;
      const increment = inventoryProgress / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setDisplayProgress(prev => {
          const next = prev + increment;
          if (next >= inventoryProgress) {
            clearInterval(timer);
            return inventoryProgress;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inventoryProgress, displayProgress]);

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
      
      // Sauvegarder l'email et marquer comme débloqué (partagé avec Food Cost)
      localStorage.setItem('octogone_recipe_email', email);
      sessionStorage.setItem('octogone_recipe_unlocked', 'true');
      
      // Track HubSpot: Accès débloqué
      trackRecipeAccessUnlocked(email, locale);
    } else {
      setError(isEnglish ? 'Invalid code' : 'Code invalide');
    }
  };

  const handleCalculateClick = () => {
    if (isButtonEnabled) {
      onCalculateClick();
    }
  };

  return (
    <div 
      className="w-full px-6 py-12"
      style={{ 
        backgroundColor: 'var(--surface-container-low)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre et description en haut */}
        <div className="mb-8 space-y-3">
          {/* Badge En cours */}
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ 
                backgroundColor: 'var(--secondary-container)',
                border: '1px solid var(--secondary)'
              }}
            >
              <Package 
                size={16} 
                style={{ color: 'var(--on-secondary-container)' }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish ? 'In Progress' : 'En cours'}
              </span>
            </div>
          </div>

          <h1 
            className="text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: 'var(--on-surface)' }}
          >
            {inventoryName}
          </h1>
          
          {/* Container de description avec bordure */}
          <div 
            className="p-4 rounded-lg border"
            style={{ borderColor: 'var(--outline)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} style={{ color: 'var(--on-surface-variant)' }} />
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                Description
              </span>
            </div>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : Badges de produits */}
          <div className="order-1 lg:order-1">
            <div className="space-y-4">
              {/* Titre de la colonne */}
              <div className="flex items-center gap-3 mb-6">
                <Package 
                  size={24} 
                  style={{ color: 'var(--primary)' }}
                />
                <h3 
                  className="text-xl font-bold"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish ? 'Products to Count' : 'Produits à compter'}
                </h3>
              </div>

              {/* Liste des produits avec animation séquentielle */}
              <div className="space-y-3">
                {INVENTORY_TAGS.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={visibleTags.includes(tag.id) ? {
                      opacity: 1,
                      x: 0
                    } : {
                      opacity: 0,
                      x: -50
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <div 
                      className="flex items-center gap-4 p-4 rounded-xl border-2"
                      style={{
                        backgroundColor: visibleTags.includes(tag.id) 
                          ? 'rgba(180, 212, 255, 0.15)' 
                          : 'var(--surface)',
                        borderColor: visibleTags.includes(tag.id)
                          ? 'var(--primary)'
                          : 'var(--outline)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Numéro */}
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: visibleTags.includes(tag.id)
                            ? 'var(--primary)'
                            : 'var(--surface-variant)'
                        }}
                      >
                        <span 
                          className="text-sm font-bold"
                          style={{ 
                            color: visibleTags.includes(tag.id)
                              ? 'white'
                              : 'var(--on-surface-variant)'
                          }}
                        >
                          {index + 1}
                        </span>
                      </div>

                      {/* Nom du produit */}
                      <div className="flex-1">
                        <p 
                          className="text-lg font-semibold"
                          style={{ 
                            color: visibleTags.includes(tag.id)
                              ? 'var(--on-surface)'
                              : 'var(--on-surface-variant)'
                          }}
                        >
                          {isEnglish ? tag.labelEn : tag.labelFr}
                        </p>
                      </div>

                      {/* Quantité */}
                      <div 
                        className="flex-shrink-0 px-4 py-2 rounded-lg"
                        style={{
                          backgroundColor: visibleTags.includes(tag.id)
                            ? 'var(--primary-container)'
                            : 'var(--surface-variant)'
                        }}
                      >
                        <span 
                          className="text-xl font-bold"
                          style={{ 
                            color: visibleTags.includes(tag.id)
                              ? 'var(--on-primary-container)'
                              : 'var(--on-surface-variant)'
                          }}
                        >
                          {tag.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Progress Bar + Actions */}
          <div className="order-2 lg:order-2">
            {/* Progress Bar centrée */}
            <div className="flex items-center justify-center mb-8">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative flex items-center justify-center" style={{ width: '280px', height: '280px' }}>
                  <CircularProgress
                    progress={displayProgress}
                    size={280}
                    strokeWidth={12}
                    showPercentage={true}
                    percentageLabel={isEnglish ? 'completed' : 'complété'}
                  />
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="space-y-6">

            {/* Système d'email gate (seulement si activé) */}
            {RECIPE_ACCESS_CONFIG.ENABLE_EMAIL_GATE && (
              <div className="space-y-3">
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
                        variant="primary"
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
                    {/* Message explicatif sous le champ email */}
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--on-surface-variant)', opacity: 0.8 }}
                    >
                      {isEnglish 
                        ? 'To complete the inventory and test Octogone\'s new features before everyone else, enter your email address to receive your activation code.'
                        : 'Pour compléter l\'inventaire et tester avant tout le monde les nouveautés sur Octogone, inscrivez votre adresse courriel pour recevoir votre code d\'activation.'}
                    </p>
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

                {/* État 3: Accès débloqué - Pas de message, juste activer le bouton */}
              </div>
            )}

            {/* Bouton Compléter */}
            <OctogoneButton
              variant="primary"
              size="lg"
              onClick={handleCalculateClick}
              disabled={!isButtonEnabled}
              className="gap-2"
            >
              <ClipboardCheck size={20} />
              {isEnglish ? 'Complete my inventory' : 'Compléter mon inventaire'}
            </OctogoneButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
