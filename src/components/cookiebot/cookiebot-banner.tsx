"use client";

import Script from "next/script";

interface CookiebotBannerProps {
  cbid: string; // Votre Cookiebot ID
}

/**
 * Composant Cookiebot pour la gestion des cookies
 * Conforme : RGPD, PIPEDA, Loi 25 (Québec), CCPA/CPRA (USA)
 */
export function CookiebotBanner({ cbid }: CookiebotBannerProps) {
  return (
    <>
      {/* Script Cookiebot */}
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={cbid}
        data-blockingmode="auto"
        type="text/javascript"
        strategy="beforeInteractive"
      />
    </>
  );
}
