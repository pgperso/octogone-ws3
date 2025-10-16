/**
 * Google Analytics 4 - Utilitaires
 * 
 * Gère le tracking GA4 pour tout le site
 */

// Déclaration des types pour gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Initialise Google Analytics 4
 */
export const initGA4 = (measurementId: string) => {
  // Charger le script GA4
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialiser dataLayer et gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  // Configuration GA4
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  console.log('[GA4] Initialized with ID:', measurementId);
};

/**
 * Track une page vue
 */
export const trackGA4PageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
    
    console.log('[GA4] Page view tracked:', path);
  }
};

/**
 * Track un événement personnalisé
 */
export const trackGA4Event = (
  eventName: string, 
  parameters: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: unknown;
  } = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    
    console.log('[GA4] Event tracked:', eventName, parameters);
  }
};

/**
 * Track le scroll depth
 */
export const trackGA4ScrollDepth = (percentage: number, page: string) => {
  trackGA4Event('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage,
    page_path: page
  });
};

/**
 * Track le temps passé sur la page
 */
export const trackGA4TimeOnPage = (seconds: number, page: string) => {
  trackGA4Event('time_on_page', {
    event_category: 'engagement',
    event_label: `${Math.floor(seconds / 60)}min`,
    value: seconds,
    page_path: page
  });
};

/**
 * Track les interactions ROI Calculator
 */
export const trackGA4ROICalculator = (action: string, value?: number) => {
  trackGA4Event('roi_calculator', {
    event_category: 'calculator',
    event_label: action,
    value: value
  });
};

/**
 * Track les téléchargements/partages
 */
export const trackGA4Download = (fileName: string, fileType: string) => {
  trackGA4Event('file_download', {
    event_category: 'download',
    event_label: fileName,
    file_extension: fileType
  });
};

/**
 * Track les clics sur liens externes
 */
export const trackGA4ExternalLink = (url: string, linkText: string) => {
  trackGA4Event('click', {
    event_category: 'external_link',
    event_label: linkText,
    link_url: url
  });
};

/**
 * Track les soumissions de formulaires
 */
export const trackGA4FormSubmit = (formName: string, formLocation: string) => {
  trackGA4Event('form_submit', {
    event_category: 'form',
    event_label: formName,
    form_location: formLocation
  });
};
