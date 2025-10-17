"use client";

import { useEffect } from "react";

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
    script.setAttribute('data-framework', 'custom');
    script.setAttribute('data-georegions', '{"region":"US","cbid":"' + cbid + '"}');
    script.type = 'text/javascript';
    script.async = true;
    
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
