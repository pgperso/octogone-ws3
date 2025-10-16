"use client";

import React from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped?: boolean; // Prop directe pour contrôler l'état
  className?: string;
}

/**
 * Composant FlipCard - Carte qui peut être retournée au survol ou automatiquement
 */
const FlipCard: React.FC<FlipCardProps> = ({
  front,
  back,
  isFlipped = false,
  className = "",
}) => {

  return (
    <div
      className={`relative w-full h-full perspective-1000 ${className}`}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Face avant */}
        <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden">
          {front}
        </div>

        {/* Face arrière */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
