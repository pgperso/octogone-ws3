"use client";

import React from "react";

interface LaptopFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant LaptopFrame - Cadre de laptop moderne en CSS pur
 * Design épuré sans boutons macOS, style professionnel
 */
export function LaptopFrame({ children, className = "" }: LaptopFrameProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Écran du laptop */}
      <div 
        className="relative rounded-t-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--surface)',
          border: '12px solid #e2e8f0',
          borderBottom: 'none',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Barre supérieure minimaliste */}
        <div 
          className="w-full h-8"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f7fafc 100%)',
            borderBottom: '1px solid #e2e8f0'
          }}
        />
        
        {/* Contenu de l'écran */}
        <div 
          className="relative bg-white"
          style={{
            minHeight: '400px',
            maxHeight: '600px',
            overflow: 'hidden'
          }}
        >
          {children}
        </div>
      </div>

      {/* Base du laptop (clavier) - Plus large que l'écran */}
      <div className="relative w-full flex justify-center">
        <div 
          className="relative rounded-b-xl"
          style={{
            width: '130%',
            height: '32px',
            background: 'linear-gradient(180deg, #f7fafc 0%, #e2e8f0 100%)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e0',
            borderTop: 'none'
          }}
        >
          {/* Trackpad suggestion */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded"
            style={{
              width: '100px',
              height: '16px',
              backgroundColor: '#cbd5e0',
              opacity: 0.4
            }}
          />
        </div>
      </div>

      {/* Ombre sous le laptop */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          width: '80%',
          height: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          zIndex: -1
        }}
      />
    </div>
  );
}
