"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingCortexCTAProps {
  locale?: string;
}

export default function FloatingCortexCTA({ locale = 'fr' }: FloatingCortexCTAProps) {
  const isEnglish = locale === 'en';
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      {/* Bouton flottant Cortex - copié exactement du chat animé */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOpenModal}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: 'var(--secondary-container)',
              border: '2px solid white',
              zIndex: 50
            }}
          >
            <Image
              src="/cortex.svg"
              alt="Cortex"
              width={32}
              height={32}
              className="w-8 h-8"
              style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modale popup */}
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
                  style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
                >
                  <Image
                    src="/cortex.svg"
                    alt="Cortex"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                  />
                </div>
              </div>

              {/* Titre */}
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--on-surface)' }}
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
                  backgroundColor: 'var(--secondary-container)',
                  border: 'none'
                }}
              >
                <p 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: 'var(--on-secondary-container)' }}
                >
                  {isEnglish ? 'Reserve Your Early Access' : 'Réservez votre accès anticipé'}
                </p>
                <p 
                  className="text-base md:text-lg"
                  style={{ color: 'var(--on-secondary-container)' }}
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
