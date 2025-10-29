"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Key, ClipboardCheck, Package, CheckCircle2, Calendar } from 'lucide-react';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { RECIPE_ACCESS_CONFIG } from '@/config/recipe-access';
import { trackRecipeAccessRequest, trackRecipeAccessUnlocked } from '@/lib/tracking/hubspot-events';
import inventoryData from '@/data/products/octogone_products_data.json';
import { translateProduct } from '@/data/products/octogone_products_translations';
import { CircularProgress } from '../octogone_recipe/CircularProgress';

interface InventoryHeroSectionProps {
  inventoryName: string;
  inventoryImage: string;
  onCalculateClick: () => void;
  locale?: 'fr' | 'en';
}

type AccessState = 'email' | 'code' | 'unlocked';

export const InventoryHeroSection: React.FC<InventoryHeroSectionProps> = ({
  inventoryName,
  inventoryImage,
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
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showSecondUser, setShowSecondUser] = useState(false);
  const [showThirdUser, setShowThirdUser] = useState(false);
  const [secondUserActive, setSecondUserActive] = useState(true);
  const [selectedStorage, setSelectedStorage] = useState<'sec' | 'congelateur' | 'frigidaire'>('sec');
  const [animateProgress, setAnimateProgress] = useState(false);

  // Liste des produits inventoriés (même liste que dans OctogoneInventoryWidget)
  interface InventoryProduct {
    id: string;
    name: string;
    initialQuantity?: number;
    unit: string;
    storage?: string;
    nonInventoriable?: boolean;
  }

  const initialInventory = [
    { productId: 'prod-022', quantity: 25 },
    { productId: 'prod-032', quantity: 15 },
    { productId: 'prod-037', quantity: 20 },
    { productId: 'prod-025', quantity: 5 },
    { productId: 'prod-039', quantity: 2 },
    { productId: 'prod-041', quantity: 10 },
    { productId: 'prod-009', quantity: 3 },
    { productId: 'prod-017', quantity: 2 },
    { productId: 'prod-023', quantity: 30 },
    { productId: 'prod-049', quantity: 8 },
    { productId: 'prod-050', quantity: 12 },
    { productId: 'prod-057', quantity: 5 },
    { productId: 'prod-008', quantity: 8 },
    { productId: 'prod-028', quantity: 20 },
    { productId: 'prod-031', quantity: 15 },
    { productId: 'prod-013', quantity: 10 },
    { productId: 'prod-043', quantity: 8 },
    { productId: 'prod-029', quantity: 5 },
    { productId: 'prod-004', quantity: 12 },
  ];

  const allProducts = inventoryData.products as InventoryProduct[];
  const totalProductCount = allProducts.length;
  
  // Mapper les produits inventoriés avec leurs infos complètes
  const inventoryProducts = initialInventory.map((item, index) => {
    const product = allProducts.find(p => p.id === item.productId);
    return {
      id: index + 1,
      productId: item.productId,
      name: product?.name || '',
      quantity: item.quantity,
      unit: product?.unit || '',
      storage: product?.storage || 'sec'
    };
  }).filter(p => p.name);

  // Calculer la progression par emplacement
  const getStorageProgress = (storage: string) => {
    const storageProducts = allProducts.filter((p: InventoryProduct) => p.storage === storage && !p.nonInventoriable);
    const entered = inventoryProducts.filter(p => p.storage === storage).length;
    const total = storageProducts.length;
    const percentage = total > 0 ? (entered / total) * 100 : 0;
    return { entered, total, percentage };
  };

  const secProgress = getStorageProgress('sec');
  const congelateurProgress = getStorageProgress('congelateur');
  const frigidaireProgress = getStorageProgress('frigidaire');

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

  // Animation des avatars
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSecondUser(true);
    }, 3000); // Julie après 3 secondes
    
    const timer2 = setTimeout(() => {
      setShowThirdUser(true);
    }, 6000); // Marie après 6 secondes
    
    const timer3 = setTimeout(() => {
      setSecondUserActive(false);
    }, 9000); // Julie devient inactive après 9 secondes
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Animation des barres de progression au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 300); // Petit délai pour l'animation
    return () => clearTimeout(timer);
  }, []);

  // Calculer le progrès basé sur le nombre de tags visibles par rapport au total de produits
  const currentProgress = (visibleTags.length / totalProductCount) * 100;

  // Animation séquentielle des produits (un par un)
  useEffect(() => {
    const delay = 600; // 600ms entre chaque produit pour une animation plus lente
    const timers = inventoryProducts.map((product, index) => 
      setTimeout(() => {
        setVisibleTags(prev => [...prev, product.id]);
      }, index * delay)
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll automatique élégant pour suivre les nouveaux produits
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleTags]);

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
          <div className="order-1 lg:order-1 relative">
            <div 
              className="w-full rounded-3xl overflow-hidden shadow-2xl"
              style={{ 
                border: '2px solid var(--outline)',
                aspectRatio: '1 / 1',
                minHeight: '600px'
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
            <div className="absolute inset-0 grid grid-cols-2 p-6">
              {/* Colonne gauche : Badges en liste verticale avec scroll */}
              <div 
                ref={scrollContainerRef} 
                className="flex-1 flex flex-col space-y-3 overflow-y-auto" 
                style={{ 
                  maxHeight: '550px',
                  scrollbarWidth: 'none', /* Firefox */
                  msOverflowStyle: 'none' /* IE/Edge */
                }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                  }
                `}</style>
              {inventoryProducts.filter(tag => visibleTags.includes(tag.id)).map((tag, index) => (
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
                            style={{ color: 'var(--on-secondary-container)' }}
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

            {/* Période de l'inventaire */}
            <div className="flex items-center gap-4 mb-6">
              {(() => {
                const now = new Date();
                const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                
                const formatFullDate = (date: Date) => {
                  return date.toLocaleDateString(isEnglish ? 'en-US' : 'fr-FR', { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                };
                
                return (
                  <>
                    {/* Date de début */}
                    <div className="flex items-center gap-2">
                      <Calendar size={18} style={{ color: 'var(--primary)' }} />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: 'var(--on-surface-variant)' }}
                      >
                        {formatFullDate(startDate)}
                      </span>
                    </div>
                    
                    {/* Séparateur */}
                    <span style={{ color: 'var(--on-surface-variant)' }}>→</span>
                    
                    {/* Date de fin */}
                    <div className="flex items-center gap-2">
                      <Calendar size={18} style={{ color: 'var(--primary)' }} />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: 'var(--on-surface-variant)' }}
                      >
                        {formatFullDate(endDate)}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Barres de progression par emplacement */}
            <div className="space-y-3 mb-6">
              {/* Garde-manger */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                  onClick={() => setSelectedStorage('sec')}
                  style={{ 
                    borderColor: selectedStorage === 'sec' ? 'var(--secondary)' : 'var(--outline)',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  {selectedStorage === 'sec' && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--secondary)' }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-sm font-semibold cursor-pointer"
                      onClick={() => setSelectedStorage('sec')}
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? `Pantry (${secProgress.entered}/${secProgress.total})` : `Garde-manger (${secProgress.entered}/${secProgress.total})`}
                    </span>
                  </div>
                  <div 
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--surface-variant)' }}
                  >
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: animateProgress ? `${secProgress.percentage}%` : '0%',
                        backgroundColor: 'var(--success)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Congélateur */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                  onClick={() => setSelectedStorage('congelateur')}
                  style={{ 
                    borderColor: selectedStorage === 'congelateur' ? 'var(--secondary)' : 'var(--outline)',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  {selectedStorage === 'congelateur' && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--secondary)' }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-sm font-semibold cursor-pointer"
                      onClick={() => setSelectedStorage('congelateur')}
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? `Freezer (${congelateurProgress.entered}/${congelateurProgress.total})` : `Congélateur (${congelateurProgress.entered}/${congelateurProgress.total})`}
                    </span>
                  </div>
                  <div 
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--surface-variant)' }}
                  >
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: animateProgress ? `${congelateurProgress.percentage}%` : '0%',
                        backgroundColor: 'var(--success)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Frigidaire */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-all"
                  onClick={() => setSelectedStorage('frigidaire')}
                  style={{ 
                    borderColor: selectedStorage === 'frigidaire' ? 'var(--secondary)' : 'var(--outline)',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  {selectedStorage === 'frigidaire' && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: 'var(--secondary)' }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-sm font-semibold cursor-pointer"
                      onClick={() => setSelectedStorage('frigidaire')}
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? `Fridge (${frigidaireProgress.entered}/${frigidaireProgress.total})` : `Frigidaire (${frigidaireProgress.entered}/${frigidaireProgress.total})`}
                    </span>
                  </div>
                  <div 
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--surface-variant)' }}
                  >
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{ 
                        width: animateProgress ? `${frigidaireProgress.percentage}%` : '0%',
                        backgroundColor: 'var(--success)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Avatars des utilisateurs actifs */}
            <div 
              className="p-4 rounded-lg border mb-6"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--outline)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 
                  className="text-sm font-semibold"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish ? 'Users' : 'Utilisateurs'}
                </h3>
                <span 
                  className="text-xs font-medium"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  {(() => {
                    let activeCount = 1; // Vincent toujours actif
                    if (showSecondUser && secondUserActive) activeCount++;
                    if (showThirdUser) activeCount++;
                    if (isEnglish) {
                      return `${activeCount} active`;
                    } else {
                      return activeCount === 1 ? `${activeCount} actif` : `${activeCount} actifs`;
                    }
                  })()}
                </span>
              </div>
              <div className="flex items-center gap-3">
              {/* Avatar Vincent - Toujours actif */}
              <div className="relative group">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                  <Image
                    src="/images/avatars/vincent.avif"
                    alt="Vincent"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
                  style={{ 
                    backgroundColor: 'var(--success)',
                    borderColor: 'var(--surface)'
                  }}
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ backgroundColor: 'var(--inverse-surface)' }}>
                  <span className="text-xs" style={{ color: 'var(--inverse-on-surface)' }}>Vincent</span>
                </div>
              </div>

              {/* Avatar Julie - Apparaît après 3 secondes */}
              {showSecondUser && (
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                    <Image
                      src="/images/avatars/julie.avif"
                      alt="Julie"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div 
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
                    style={{ 
                      backgroundColor: secondUserActive ? 'var(--success)' : 'var(--error)',
                      borderColor: 'var(--surface)'
                    }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ backgroundColor: 'var(--inverse-surface)' }}>
                    <span className="text-xs" style={{ color: 'var(--inverse-on-surface)' }}>Julie</span>
                  </div>
                </motion.div>
              )}

              {/* Avatar Marie - Apparaît après 6 secondes */}
              {showThirdUser && (
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: 'var(--primary)' }}>
                    <Image
                      src="/images/avatars/marie.avif"
                      alt="Marie"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div 
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
                    style={{ 
                      backgroundColor: 'var(--success)',
                      borderColor: 'var(--surface)'
                    }}
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" style={{ backgroundColor: 'var(--inverse-surface)' }}>
                    <span className="text-xs" style={{ color: 'var(--inverse-on-surface)' }}>Marie</span>
                  </div>
                </motion.div>
              )}
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
            </div>

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
