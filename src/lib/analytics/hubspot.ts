/**
 * HubSpot Analytics & Tracking
 * 
 * Ce module gère tout le tracking HubSpot :
 * - Identification des visiteurs
 * - Tracking des événements personnalisés
 * - Intégration avec le formulaire de contact
 * - Tracking du calculateur ROI
 */

declare global {
  interface Window {
    _hsq?: unknown[];
    HubSpotConversations?: unknown;
  }
}

export interface HubSpotEvent {
  eventName: string;
  properties?: Record<string, unknown>;
}

export interface HubSpotIdentity {
  email?: string;
  firstname?: string;
  lastname?: string;
  company?: string;
  phone?: string;
  [key: string]: unknown;
}

/**
 * Initialise le tracking HubSpot
 */
export function initHubSpot(portalId: string): void {
  if (typeof window === 'undefined') return;
  
  // Initialiser la queue HubSpot
  window._hsq = window._hsq || [];
  
  // Charger le script HubSpot
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'hs-script-loader';
  script.async = true;
  script.defer = true;
  script.src = `//js.hs-scripts.com/${portalId}.js`;
  document.head.appendChild(script);
}

/**
 * Track une page vue
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !window._hsq) return;
  
  window._hsq.push(['setPath', path]);
  window._hsq.push(['trackPageView']);
}

/**
 * Track un événement personnalisé
 */
export function trackEvent(event: HubSpotEvent): void {
  if (typeof window === 'undefined' || !window._hsq) return;
  
  window._hsq.push(['trackEvent', {
    id: event.eventName,
    value: event.properties
  }]);
  
  // Log en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('[HubSpot Event]', event.eventName, event.properties);
  }
}

/**
 * Identifie un visiteur
 */
export function identifyVisitor(identity: HubSpotIdentity): void {
  if (typeof window === 'undefined' || !window._hsq) return;
  
  window._hsq.push(['identify', identity]);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[HubSpot Identify]', identity);
  }
}

/**
 * Track l'utilisation du calculateur ROI
 */
export function trackROICalculator(data: {
  locations: number;
  modules: string[];
  monthlyCost: number;
  yearlySavings: number;
  roi: number;
  paybackMonths: number;
}): void {
  trackEvent({
    eventName: 'roi_calculator_used',
    properties: {
      number_of_locations: data.locations,
      selected_modules: data.modules.join(', '),
      monthly_subscription_cost: data.monthlyCost,
      yearly_savings: data.yearlySavings,
      roi_percentage: data.roi,
      payback_period_months: data.paybackMonths,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track la sélection d'un module dans le calculateur
 */
export function trackModuleSelection(moduleName: string, isSelected: boolean): void {
  trackEvent({
    eventName: 'roi_module_toggled',
    properties: {
      module_name: moduleName,
      action: isSelected ? 'selected' : 'deselected',
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track un clic sur un CTA
 */
export function trackCTAClick(ctaName: string, ctaLocation: string, destination?: string): void {
  trackEvent({
    eventName: 'cta_clicked',
    properties: {
      cta_name: ctaName,
      cta_location: ctaLocation,
      destination_url: destination,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track la soumission du formulaire de contact
 */
export function trackContactFormSubmission(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  hasROIData?: boolean;
}): void {
  // Identifier le visiteur
  identifyVisitor({
    email: data.email,
    firstname: data.firstName,
    lastname: data.lastName,
    company: data.company
  });
  
  // Track l'événement
  trackEvent({
    eventName: 'contact_form_submitted',
    properties: {
      subject: data.subject,
      has_roi_data: data.hasROIData || false,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track la navigation vers une page de secteur
 */
export function trackSectorView(sectorId: string, sectorName: string): void {
  trackEvent({
    eventName: 'sector_page_viewed',
    properties: {
      sector_id: sectorId,
      sector_name: sectorName,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track le scroll depth (profondeur de défilement)
 */
export function trackScrollDepth(percentage: number): void {
  trackEvent({
    eventName: 'scroll_depth',
    properties: {
      depth_percentage: percentage,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track le temps passé sur une page
 */
export function trackTimeOnPage(seconds: number, pagePath: string): void {
  trackEvent({
    eventName: 'time_on_page',
    properties: {
      duration_seconds: seconds,
      page_path: pagePath,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track le changement de langue
 */
export function trackLanguageChange(from: string, to: string): void {
  trackEvent({
    eventName: 'language_changed',
    properties: {
      from_language: from,
      to_language: to,
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Track l'ouverture du modal ROI
 */
export function trackROIModalOpen(source: string): void {
  trackEvent({
    eventName: 'roi_modal_opened',
    properties: {
      source: source,
      timestamp: new Date().toISOString()
    }
  });
}
