"use client";

import { useState, useEffect } from 'react';

/**
 * Hook pour détecter si l'utilisateur préfère des animations réduites
 * Respecte les préférences d'accessibilité du système
 * 
 * @returns boolean - true si l'utilisateur préfère des animations réduites
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Vérifier si matchMedia est disponible (SSR safe)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Définir l'état initial
    setPrefersReducedMotion(mediaQuery.matches);

    // Écouter les changements
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
