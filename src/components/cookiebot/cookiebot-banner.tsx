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
    // Délai pour charger Cookiebot après le LCP (améliore les performances)
    const timer = setTimeout(() => {
      // Créer et injecter le script Cookiebot
      const script = document.createElement('script');
      script.id = 'Cookiebot';
      script.src = 'https://consent.cookiebot.com/uc.js';
      script.setAttribute('data-cbid', cbid);
      script.setAttribute('data-blockingmode', 'auto');
      script.setAttribute('data-framework', 'IAB'); // Mode simplifié
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true; // Defer pour ne pas bloquer le parsing
      
      // Laisser Cookiebot gérer l'affichage automatiquement
      
      // Injecter dans le head
      document.head.appendChild(script);
    }, 2000); // Charger après 2 secondes (au lieu de 1)
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      const existingScript = document.getElementById('Cookiebot');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [cbid]);

  return null;
}
