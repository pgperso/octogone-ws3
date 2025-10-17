"use client";

import React from "react";

interface LaptopFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant TabletFrame - Cadre de tablette moderne en CSS pur
 * Desktop: Paysage (Landscape) | Mobile: Portrait
 */
export function LaptopFrame({ children, className = "" }: LaptopFrameProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Tablette - Paysage en desktop, Portrait en mobile */}
      <div 
        className="relative rounded-2xl overflow-hidden mx-auto"
        style={{
          backgroundColor: 'var(--surface)',
          border: '14px solid #2c3e50',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          maxWidth: '100%'
        }}
      >
        {/* Bouton home (petit cercle en bas) */}
        <div 
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full hidden md:block"
          style={{
            width: '40px',
            height: '6px',
            backgroundColor: '#34495e',
            opacity: 0.6,
            zIndex: 10
          }}
        />
        
        {/* Bouton home mobile (en bas en mode portrait) */}
        <div 
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full md:hidden"
          style={{
            width: '40px',
            height: '6px',
            backgroundColor: '#34495e',
            opacity: 0.6,
            zIndex: 10
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

      {/* Ombre sous la tablette */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          width: '70%',
          height: '30px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: -1
        }}
      />
    </div>
  );
}
