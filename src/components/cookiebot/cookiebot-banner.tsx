"use client";

import { useEffect } from "react";

// Déclaration TypeScript pour Cookiebot
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cookiebot?: any;
  }
}

interface CookiebotBannerProps {
  cbid: string; // Votre Cookiebot ID
}

/**
 * Composant Cookiebot pour la gestion des cookies
 * Conforme : RGPD, PIPEDA, Loi 25 (Québec), CCPA/CPRA (USA)
 */
export function CookiebotBanner({ cbid }: CookiebotBannerProps) {
  useEffect(() => {
    // Créer et injecter le script Cookiebot
    const script = document.createElement('script');
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.com/uc.js';
    script.setAttribute('data-cbid', cbid);
    script.setAttribute('data-blockingmode', 'auto');
    script.type = 'text/javascript';
    script.async = true;
    
    // Laisser Cookiebot gérer l'affichage automatiquement
    
    // Injecter dans le head
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      const existingScript = document.getElementById('Cookiebot');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [cbid]);

  return null;
}
