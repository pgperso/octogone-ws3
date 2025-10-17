"use client";

import Script from "next/script";

interface CookieDeclarationProps {
  cbid: string; // Votre Cookiebot ID
}

/**
 * Composant pour afficher la déclaration des cookies
 * À utiliser sur une page dédiée (ex: /politique-cookies)
 */
export function CookieDeclaration({ cbid }: CookieDeclarationProps) {
  return (
    <div>
      {/* Script de déclaration des cookies */}
      <Script
        id="CookieDeclaration"
        src={`https://consent.cookiebot.com/${cbid}/cd.js`}
        type="text/javascript"
        strategy="afterInteractive"
      />
      
      {/* Conteneur pour la déclaration */}
      <div id="CookieDeclaration" />
    </div>
  );
}
