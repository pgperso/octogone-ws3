"use client";

import { useState, useEffect } from "react";

// Types de breakpoints disponibles
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Interface pour les valeurs retournées par le hook
interface BreakpointReturn {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

/**
 * Hook personnalisé pour gérer les breakpoints responsifs
 * 
 * Ce hook permet de détecter facilement la taille d'écran actuelle et
 * fournit des indicateurs pour les types d'appareils (mobile, tablette, desktop)
 * 
 * @returns Un objet contenant le breakpoint actuel et des booléens pour le type d'appareil
 */
export function useBreakpoint(): BreakpointReturn {
  // Valeurs par défaut côté serveur
  const defaultBreakpoint: Breakpoint = "lg";
  const defaultWidth = 1024;
  
  // États pour stocker les valeurs actuelles
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(defaultBreakpoint);
  const [width, setWidth] = useState<number>(defaultWidth);
  
  // Détection du breakpoint en fonction de la largeur
  const getBreakpoint = (width: number): Breakpoint => {
    if (width < 376) return "xs";
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  };
  
  // Mise à jour des valeurs lors du chargement et du redimensionnement
  useEffect(() => {
    // Fonction pour mettre à jour les états
    const updateDimensions = () => {
      const currentWidth = window.innerWidth;
      setWidth(currentWidth);
      setBreakpoint(getBreakpoint(currentWidth));
    };
    
    // Initialisation
    updateDimensions();
    
    // Écouter les événements de redimensionnement
    window.addEventListener("resize", updateDimensions);
    
    // Nettoyage
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  
  // Calcul des indicateurs de type d'appareil
  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const isTablet = breakpoint === "md" || breakpoint === "lg";
  const isDesktop = breakpoint === "xl" || breakpoint === "2xl";
  
  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    width
  };
}

export default useBreakpoint;
