"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { TrendingUp, X, Minimize2, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/features/roi-calculator/utils/roi-calculations';
import ROICalculatorAdvanced from '@/features/roi-calculator/components/roi-calculator-advanced';

interface FloatingROIWidgetProps {
  onSavingsCalculated?: (savings: number) => void;
  isMinimized?: boolean;
  onMinimize?: () => void;
  onExpand?: () => void;
}

export default function FloatingROIWidget({ 
  onSavingsCalculated, 
  isMinimized: externalIsMinimized,
  onMinimize,
  onExpand
}: FloatingROIWidgetProps) {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internalIsMinimized, setInternalIsMinimized] = useState(true);
  const [calculatedSavings, setCalculatedSavings] = useState<number | null>(null);
  
  // Utiliser l'état externe si fourni, sinon l'état interne
  const isMinimized = externalIsMinimized !== undefined ? externalIsMinimized : internalIsMinimized;
  
  // Valeur par défaut si pas encore calculé
  const defaultSavings = 35000; // Valeur moyenne estimée
  const displaySavings = calculatedSavings !== null ? calculatedSavings : defaultSavings;
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    } else {
      setInternalIsMinimized(true);
    }
  };

  const handleExpand = () => {
    if (onExpand) {
      onExpand();
    } else {
      setInternalIsMinimized(false);
    }
  };

  // Écouter l'événement de fermeture depuis le calculateur
  React.useEffect(() => {
    const handleClose = () => {
      setIsModalOpen(false);
    };
    
    window.addEventListener('closeROIModal', handleClose);
    return () => window.removeEventListener('closeROIModal', handleClose);
  }, []);
  
  const handleSavingsUpdate = (savings: number) => {
    setCalculatedSavings(savings);
    if (onSavingsCalculated) {
      onSavingsCalculated(savings);
    }
  };
  
  return (
    <>
      {/* Widget flottant */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        {isMinimized ? (
          // Version minimisée - Juste un cercle avec icône $
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #BADFF6 0%, #A7D6F3 50%, #94CDF0 100%)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)'
            }}
            onClick={handleExpand}
          >
            <DollarSign className="w-7 h-7 md:w-8 md:h-8" style={{ color: 'var(--on-secondary-container)' }} />
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
                background: 'linear-gradient(135deg, #BADFF6 0%, #A7D6F3 50%, #94CDF0 100%)',
                minWidth: '200px',
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
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6" style={{ color: 'var(--on-primary-container)' }} />
                </div>
              </div>
              
              {/* Gains */}
              <div className="text-center mb-2">
                <p className="text-xs md:text-sm font-medium mb-1" style={{ color: 'var(--on-secondary-container)' }}>
                  {locale === "fr" ? "Vos gains potentiels" : "Your potential savings"}
                </p>
                <p className="text-2xl md:text-4xl font-bold" style={{ color: 'var(--on-secondary-container)' }}>
                  {formatCurrency(displaySavings, locale)}
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--on-secondary-container)', opacity: 0.8 }}>
                  {locale === "fr" ? "par année" : "per year"}
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
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{locale === "fr" ? "Calculer mes gains" : "Calculate my savings"}</span>
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
            className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
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
            
            {/* Calculateur ROI */}
            <div className="p-4">
              <ROICalculatorAdvanced onSavingsCalculated={handleSavingsUpdate} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
