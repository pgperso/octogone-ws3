"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initHubSpot, trackPageView, trackScrollDepth, trackTimeOnPage } from '@/lib/analytics/hubspot';
import { initGA4, trackGA4PageView, trackGA4ScrollDepth, trackGA4TimeOnPage } from '@/lib/analytics/google-analytics';

/**
 * Provider Analytics
 * 
 * Gère automatiquement :
 * - Initialisation de HubSpot + Google Analytics 4
 * - Tracking des pages vues (HubSpot + GA4)
 * - Tracking du scroll depth (HubSpot + GA4)
 * - Tracking du temps passé sur la page (HubSpot + GA4)
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Initialiser HubSpot et GA4 au montage
  useEffect(() => {
    // HubSpot
    const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
    if (portalId) {
      initHubSpot(portalId);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] HubSpot Portal ID not configured');
    }

    // Google Analytics 4
    const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
    if (ga4Id) {
      initGA4(ga4Id);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] GA4 Measurement ID not configured');
    }
  }, []);
  
  // Tracker les changements de page (HubSpot + GA4)
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname); // HubSpot
      trackGA4PageView(pathname); // GA4
    }
  }, [pathname]);
  
  // Tracker le scroll depth
  useEffect(() => {
    const scrollDepths = [25, 50, 75, 100];
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
      
      scrollDepths.forEach(depth => {
        if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          trackScrollDepth(depth); // HubSpot
          trackGA4ScrollDepth(depth, pathname); // GA4
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
  
  // Tracker le temps passé sur la page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5 && pathname) { // Seulement si plus de 5 secondes
        trackTimeOnPage(timeSpent, pathname); // HubSpot
        trackGA4TimeOnPage(timeSpent, pathname); // GA4
      }
    };
  }, [pathname]);
  
  return <>{children}</>;
}
