"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Key, ClipboardCheck, FileText, Package, CheckCircle2 } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { RECIPE_ACCESS_CONFIG } from '@/config/recipe-access';
import { trackRecipeAccessRequest, trackRecipeAccessUnlocked } from '@/lib/tracking/hubspot-events';
import inventoryData from '@/data/products/octogone_products_data.json';
import { translateProduct } from '@/data/products/octogone_products_translations';
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
  inventoryImage,
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
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);

  // Récupérer les produits avec initialQuantity > 0
  interface InventoryProduct {
    id: string;
    name: string;
    initialQuantity?: number;
    unit: string;
  }

  const allProducts = inventoryData.products as InventoryProduct[];
  const totalProductCount = allProducts.length;
  
  const inventoryProducts = allProducts
    .filter(p => p.initialQuantity && p.initialQuantity > 0)
    .slice(0, 5) // Prendre les 5 premiers
    .map((p, index) => ({
      id: index + 1,
      productId: p.id,
      name: p.name,
      quantity: p.initialQuantity!,
      unit: p.unit
    }));

  const HERO_TAG_DELAYS = [800, 1200, 1600, 2000, 2400];

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

  // Calculer le progrès basé sur le nombre de tags visibles par rapport au total de produits
  const currentProgress = (visibleTags.length / totalProductCount) * 100;

  // Animation des tags de quantités
  useEffect(() => {
    const timers = inventoryProducts.map((tag, index) => 
      setTimeout(() => {
        setVisibleTags(prev => [...prev, tag.id]);
      }, HERO_TAG_DELAYS[index])
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animation du pourcentage affiché qui suit le nombre de tags visibles
  useEffect(() => {
    if (displayProgress < currentProgress) {
      const duration = 400;
      const steps = 20;
      const increment = (currentProgress - displayProgress) / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setDisplayProgress(prev => {
          const next = prev + increment;
          if (next >= currentProgress) {
            clearInterval(timer);
            return currentProgress;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [currentProgress, displayProgress]);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image de l'inventaire avec badges et progress bar par-dessus */}
          <div className="order-1 lg:order-1 relative" style={{ height: '600px' }}>
            <div 
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                border: '2px solid var(--outline)'
              }}
            >
              <Image
                src={inventoryImage}
                alt={inventoryName}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Layout en 2 colonnes sur l'image */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 p-6">
              {/* Colonne gauche : Badges en liste verticale */}
              <div className="flex flex-col justify-center space-y-3">
              {inventoryProducts.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={visibleTags.includes(tag.id) ? {
                      opacity: 1,
                      x: 0
                    } : {
                      opacity: 0,
                      x: -30
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                  >
                    <div 
                      className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Icône */}
                      <div 
                        className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: visibleTags.includes(tag.id)
                            ? 'var(--success)'
                            : 'rgba(0, 0, 0, 0.1)',
                          borderRadius: '6px'
                        }}
                      >
                        {visibleTags.includes(tag.id) ? (
                          <CheckCircle2 
                            size={16} 
                            style={{ color: 'white' }}
                          />
                        ) : (
                          <span 
                            className="text-xs font-bold"
                            style={{ color: '#1a1a1a' }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Nom */}
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-sm font-semibold truncate"
                          style={{ color: '#1a1a1a' }}
                        >
                          {translateProduct(tag.name, locale)}
                        </p>
                      </div>

                      {/* Quantité avec unité */}
                      <div 
                        className="flex-shrink-0 px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <span 
                          className="text-sm font-bold"
                          style={{ color: '#1a1a1a' }}
                        >
                          {tag.quantity} {tag.unit}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Colonne droite : Progress Bar */}
              <div className="flex items-center justify-center">
                <CircularProgress
                  progress={displayProgress}
                  size={200}
                  strokeWidth={8}
                  showPercentage={true}
                  percentageLabel={isEnglish ? 'completed' : 'complété'}
                />
              </div>
            </div>
          </div>

          {/* Description et bouton */}
          <div className="order-2 lg:order-2 space-y-6">
            <div className="space-y-3">
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
  );
};
