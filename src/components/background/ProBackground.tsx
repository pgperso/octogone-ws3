'use client';

import { useState, useEffect } from 'react';
import ProBackgroundSVG from './ProBackgroundSVG';

export default function ProBackground() {
  const [Enhanced3D, setEnhanced3D] = useState<React.ComponentType<{ density: number }> | null>(null);

  useEffect(() => {
    // Conditions pour charger la version 3D
    const shouldLoad3D = 
      !document.hidden && 
      window.innerWidth >= 1280 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!shouldLoad3D) return;

    // Charger en idle
    const loadEnhanced = async () => {
      try {
        // Vérifier que les libs existent
        await import('@react-three/fiber');
        await import('@react-three/drei');
        await import('three');

        // Charger dynamiquement Background3D
        const { default: Background3D } = await import('./Background3D');
        setEnhanced3D(() => Background3D);
      } catch {
        // Ignorer silencieusement si les libs ne sont pas disponibles
        // Le SVG reste actif
      }
    };

    // Utiliser requestIdleCallback si disponible, sinon setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadEnhanced());
    } else {
      setTimeout(loadEnhanced, 0);
    }
  }, []);

  return (
    <>
      {/* SVG toujours actif sur mobile et comme fallback */}
      <ProBackgroundSVG />
      
      {/* Version 3D si chargée avec succès (remplace le SVG sur desktop) */}
      {Enhanced3D && (
        <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
          <Enhanced3D density={1} />
        </div>
      )}
    </>
  );
}
