"use client";

import React from 'react';

interface OctogoneFoodCostCircularBarProps {
  actualFoodCost: number; // Food cost réel en %
  targetFoodCost: number; // Cible food cost en %
  size?: number; // Taille du cercle en pixels
  strokeWidth?: number; // Épaisseur de la barre
}

export const OctogoneFoodCostCircularBar: React.FC<OctogoneFoodCostCircularBarProps> = ({
  actualFoodCost,
  targetFoodCost,
  size = 120,
  strokeWidth = 8
}) => {
  // Déterminer si la cible est respectée
  const isTargetMet = actualFoodCost <= targetFoodCost;
  
  // La barre représente la cible sur 100%
  const targetPercentage = targetFoodCost; // Ex: 30% de cible = 30% de la barre
  
  // Rayon du cercle
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (targetPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Cercle de fond (cible) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-variant)"
          strokeWidth={strokeWidth}
        />
        
        {/* Cercle de progression (food cost réel) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isTargetMet ? 'var(--success)' : 'var(--error)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Texte au centre - Seulement le food cost réel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-sm font-bold"
          style={{ color: isTargetMet ? 'var(--success)' : 'var(--error)' }}
        >
          {actualFoodCost.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};
