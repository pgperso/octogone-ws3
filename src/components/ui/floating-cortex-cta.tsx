"use client";

import React, { useState } from 'react';
import { Brain, X, Minimize2, Sparkles } from 'lucide-react';

interface FloatingCortexCTAProps {
  locale?: string;
}

export default function FloatingCortexCTA({ locale = 'fr' }: FloatingCortexCTAProps) {
  const isEnglish = locale === 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  
  const CORTEX_GRADIENT = 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)';
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };
  
  return (
    <>
      {/* Widget flottant */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        {isMinimized ? (
          // Version minimisée - Juste un cercle avec icône Brain
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse"
            style={{
              background: CORTEX_GRADIENT,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
            }}
            onClick={handleExpand}
          >
            <Brain className="w-7 h-7 md:w-8 md:h-8" style={{ color: 'var(--on-secondary-container)' }} />
          </div>
        ) : (
          // Version normale
          <div className="relative group">
            {/* Bouton minimiser */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
              style={{
                backgroundColor: 'var(--primary-container)',
                color: 'var(--on-primary-container)'
              }}
            >
              <Minimize2 className="w-3 h-3" />
            </button>

            <div
              className="rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: CORTEX_GRADIENT,
                minWidth: '220px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
              }}
              onClick={handleOpenModal}
            >
              {/* Icône */}
              <div className="flex items-center justify-center mb-2 md:mb-3">
                <div
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary-container)' }}
                >
                  <Brain className="w-4 h-4 md:w-6 md:h-6" style={{ color: 'var(--on-primary-container)' }} />
                </div>
              </div>
              
              {/* Titre */}
              <div className="text-center mb-2">
                <p className="text-sm md:text-base font-bold mb-1" style={{ color: 'var(--on-secondary-container)' }}>
                  Cortex AI
                </p>
                <p className="text-xs md:text-sm" style={{ color: 'var(--on-secondary-container)', opacity: 0.9 }}>
                  {isEnglish ? 'Your AI Assistant' : 'Votre assistant IA'}
                </p>
              </div>
              
              {/* CTA */}
              <div className="text-center mt-2 md:mt-4">
                <div
                  className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: 'var(--primary-container)',
                    color: 'var(--on-primary-container)'
                  }}
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{isEnglish ? 'Reserve Early Access' : 'Réserver l\'accès anticipé'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl shadow-2xl p-8 md:p-12"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)'
              }}
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Contenu du popup */}
            <div className="text-center">
              {/* Icône Cortex */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: CORTEX_GRADIENT }}
                >
                  <Brain className="w-10 h-10" style={{ color: 'var(--on-secondary-container)' }} />
                </div>
              </div>

              {/* Titre */}
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--primary)' }}
              >
                {isEnglish ? 'Cortex AI is Coming' : 'Cortex IA arrive bientôt'}
              </h2>

              {/* Description */}
              <p 
                className="text-lg md:text-xl mb-6 leading-relaxed"
                style={{ color: 'var(--on-surface)' }}
              >
                {isEnglish 
                  ? 'Cortex is our revolutionary AI assistant that will transform how you interact with your restaurant data. Ask questions in natural language and get instant, actionable insights.' 
                  : 'Cortex est notre assistant IA révolutionnaire qui transformera votre façon d\'interagir avec les données de votre restaurant. Posez des questions en langage naturel et obtenez des insights instantanés et actionnables.'}
              </p>

              {/* Encadré CTA */}
              <div 
                className="p-6 mb-6 rounded-lg"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid var(--primary)'
                }}
              >
                <p 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: 'var(--primary)' }}
                >
                  {isEnglish ? 'Reserve Your Early Access' : 'Réservez votre accès anticipé'}
                </p>
                <p 
                  className="text-base md:text-lg"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish 
                    ? 'Subscribe to Octogone now and get Cortex AI included in your current plan when it launches. No additional cost for early subscribers.' 
                    : 'Abonnez-vous à Octogone maintenant et bénéficiez de Cortex IA inclus dans votre forfait actuel lors de son lancement. Aucun coût supplémentaire pour les premiers abonnés.'}
                </p>
              </div>

              {/* Note finale */}
              <p 
                className="text-sm"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                {isEnglish 
                  ? 'Early subscribers get lifetime access to Cortex AI at no extra charge.' 
                  : 'Les premiers abonnés bénéficient d\'un accès à vie à Cortex IA sans frais supplémentaires.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
