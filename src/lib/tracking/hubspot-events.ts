/**
 * HubSpot Event Tracking Utility
 * Centralise tous les événements de tracking pour HubSpot
 */

// Déclaration TypeScript pour _hsq
declare global {
  interface Window {
    _hsq?: unknown[];
  }
}

/**
 * Fonction utilitaire pour tracker un événement personnalisé
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  try {
    window._hsq = window._hsq || [];
    window._hsq.push(['trackCustomBehavioralEvent', {
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        page_path: window.location.pathname,
      }
    }]);
    
    console.log(`[HubSpot] Event tracked: ${eventName}`, properties);
  } catch (error) {
    console.error('[HubSpot] Error tracking event:', error);
  }
};

/**
 * Tracker l'ouverture de la modale de démo
 */
export const trackDemoModalOpen = (source: string) => {
  trackEvent('demo_modal_opened', {
    source, // 'navigation', 'footer', 'mobile_menu', etc.
  });
};

/**
 * Tracker les clics sur les boutons CTA
 */
export const trackCTAClick = (buttonName: string, location: string) => {
  trackEvent('cta_button_clicked', {
    button_name: buttonName,
    location, // 'hero', 'footer', 'navigation', etc.
  });
};

/**
 * Tracker les clics sur les liens de contact
 */
export const trackContactClick = (contactType: 'phone' | 'email', value: string) => {
  trackEvent('contact_clicked', {
    contact_type: contactType,
    contact_value: value,
  });
};

/**
 * Tracker les soumissions de formulaire
 */
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submitted', {
    form_name: formName,
    success,
  });
};

/**
 * Tracker la navigation entre les pages
 */
export const trackPageView = (pageName: string, pageCategory?: string) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    page_category: pageCategory,
  });
};

/**
 * Tracker les clics sur les liens externes
 */
export const trackExternalLinkClick = (url: string, linkText: string) => {
  trackEvent('external_link_clicked', {
    url,
    link_text: linkText,
  });
};

/**
 * Tracker le scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
  });
};

/**
 * Tracker les interactions avec les vidéos
 */
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoTitle: string) => {
  trackEvent('video_interaction', {
    action,
    video_title: videoTitle,
  });
};
