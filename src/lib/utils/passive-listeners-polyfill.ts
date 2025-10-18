/**
 * Polyfill pour forcer les event listeners passifs
 * Améliore les performances de scroll en rendant tous les listeners touch/wheel passifs
 */

export function enablePassiveListeners() {
  if (typeof window === 'undefined') return;

  // Sauvegarder les méthodes originales
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  const originalRemoveEventListener = EventTarget.prototype.removeEventListener;

  // Override addEventListener pour forcer passive sur touch/wheel
  EventTarget.prototype.addEventListener = function(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    // Événements qui doivent être passifs
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
    
    if (passiveEvents.includes(type)) {
      // Convertir options en objet si c'est un boolean
      const opts = typeof options === 'boolean' 
        ? { capture: options, passive: true }
        : { ...options, passive: true };
      
      return originalAddEventListener.call(this, type, listener, opts);
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };

  // Garder removeEventListener intact
  EventTarget.prototype.removeEventListener = originalRemoveEventListener;

  console.log('[Passive Listeners] Enabled for touch and wheel events');
}
