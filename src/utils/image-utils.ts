/**
 * Utilitaires pour l'optimisation des images
 */

export interface ImageBreakpoint {
  breakpoint: number;
  width: number;
}

export const defaultBreakpoints: ImageBreakpoint[] = [
  { breakpoint: 640, width: 640 },   // sm
  { breakpoint: 768, width: 768 },   // md
  { breakpoint: 1024, width: 1024 }, // lg
  { breakpoint: 1280, width: 1280 }, // xl
  { breakpoint: 1536, width: 1536 }, // 2xl
];

/**
 * Génère une chaîne sizes responsive pour Next.js Image
 */
export const generateSizes = (breakpoints: ImageBreakpoint[] = defaultBreakpoints): string => {
  const sizeQueries = breakpoints.map(({ breakpoint, width }) => 
    `(max-width: ${breakpoint}px) ${width}px`
  );
  
  // Ajouter une taille par défaut pour les écrans plus larges
  const maxWidth = Math.max(...breakpoints.map(bp => bp.width));
  sizeQueries.push(`${maxWidth}px`);
  
  return sizeQueries.join(', ');
};

/**
 * Génère un placeholder blur data URL
 */
export const generateBlurDataURL = (width: number = 10, height: number = 10, color: string = '#f3f4f6'): string => {
  // Créer un SVG simple comme placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  
  // Encoder en base64
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

/**
 * Optimise la qualité d'image selon le type de contenu
 */
export const getOptimalQuality = (imageType: 'photo' | 'illustration' | 'icon' | 'logo'): number => {
  switch (imageType) {
    case 'photo':
      return 75; // Qualité standard pour les photos
    case 'illustration':
      return 85; // Qualité plus élevée pour les illustrations
    case 'icon':
      return 90; // Qualité élevée pour les icônes
    case 'logo':
      return 95; // Qualité maximale pour les logos
    default:
      return 75;
  }
};

/**
 * Détermine les formats d'image optimaux selon le navigateur
 */
export const getSupportedFormats = (): string[] => {
  if (typeof window === 'undefined') {
    return ['image/webp', 'image/jpeg']; // Défaut côté serveur
  }
  
  const formats: string[] = [];
  
  // Vérifier le support AVIF
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
    formats.push('image/avif');
  }
  
  // Vérifier le support WebP
  if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
    formats.push('image/webp');
  }
  
  // Fallback JPEG
  formats.push('image/jpeg');
  
  return formats;
};

/**
 * Calcule les dimensions optimales pour différents breakpoints
 */
export const calculateResponsiveDimensions = (
  originalWidth: number,
  originalHeight: number,
  breakpoints: ImageBreakpoint[] = defaultBreakpoints
): Array<{ width: number; height: number; breakpoint: number }> => {
  const aspectRatio = originalHeight / originalWidth;
  
  return breakpoints.map(({ breakpoint, width }) => ({
    breakpoint,
    width,
    height: Math.round(width * aspectRatio),
  }));
};
