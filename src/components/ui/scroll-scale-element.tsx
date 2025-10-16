import React, { ReactNode } from 'react';
import { useScaleIn } from '@/hooks/use-scroll-scale';

interface ScrollScaleElementProps {
  children: ReactNode;
  className?: string;
  initialScale?: number;
  finalScale?: number;
  scrollRange?: number;
  style?: React.CSSProperties;
}

/**
 * Composant réutilisable qui applique une animation d'échelle au défilement
 * Parfait pour créer des effets visuels lors du défilement de la page
 */
export function ScrollScaleElement({
  children,
  className = '',
  initialScale = 1.15,
  finalScale = 0.95,
  scrollRange = 300,
  style = {},
}: ScrollScaleElementProps) {
  // Utiliser notre hook personnalisé pour l'animation d'échelle
  const scale = useScaleIn({
    initialScale,
    finalScale,
    scrollRange,
  });

  return (
    <div
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        ...style,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
}
