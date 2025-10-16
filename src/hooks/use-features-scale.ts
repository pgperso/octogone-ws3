import { useState, useEffect } from 'react';

interface ScaleOutOptions {
  initialScale?: number;
  finalScale?: number;
  scrollRange?: number;
}

/**
 * Hook personnalisé pour animer l'échelle avec un effet d'agrandissement (out → in)
 * Utilisé pour la section Features où l'octogone commence petit et devient plus grand
 * @param options Options de configuration pour l'animation
 * @param options.initialScale Échelle initiale (défaut: 0.9)
 * @param options.finalScale Échelle finale (défaut: 1.05)
 * @param options.scrollRange Plage de défilement en pixels (défaut: 300)
 * @returns La valeur d'échelle actuelle
 */
export function useScaleOut(options: ScaleOutOptions = {}) {
  const {
    initialScale = 0.9,
    finalScale = 1.05,
    scrollRange = 300
  } = options;

  const [scale, setScale] = useState(initialScale);
  
  useEffect(() => {
    const handleScroll = () => {
      // Obtenir la position de défilement actuelle
      const scrollPosition = window.scrollY;
      
      // Calculer le seuil de déclenchement basé sur la hauteur de la fenêtre
      const triggerPoint = window.innerHeight * 0.6;
      
      // Calculer la position relative par rapport au seuil
      const relativePosition = Math.max(0, scrollPosition - triggerPoint);
      
      // Calculer le facteur de progression (0 à 1)
      const scrollProgress = Math.min(1, relativePosition / scrollRange);
      
      // Calculer l'échelle pour la section Features (petit → grand)
      const newScale = initialScale + (scrollProgress * (finalScale - initialScale));
      
      // Mettre à jour l'état
      setScale(newScale);
    };
    
    // Ajouter l'écouteur d'événement
    window.addEventListener('scroll', handleScroll);
    
    // Appeler une fois pour initialiser
    handleScroll();
    
    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialScale, finalScale, scrollRange]);

  return scale;
}
