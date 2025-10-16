/**
 * Breakpoints utilisés dans l'application
 * Ces valeurs correspondent aux breakpoints Tailwind avec l'ajout du breakpoint xs
 */
export const breakpoints = {
  xs: 376, // Très petits écrans (petits téléphones)
  sm: 640, // Petits écrans (grands téléphones)
  md: 768, // Écrans moyens (tablettes)
  lg: 1024, // Grands écrans (petits laptops)
  xl: 1280, // Très grands écrans (grands laptops)
  "2xl": 1536, // Écrans extra larges (desktops)
};

/**
 * Type pour les tailles d'écran
 */
export type ScreenSize = keyof typeof breakpoints;

/**
 * Hook personnalisé pour détecter la taille de l'écran actuelle
 * À utiliser dans les composants React
 */
export const useScreenSize = () => {
  if (typeof window === "undefined") {
    return { width: 0, screenSize: null as unknown as ScreenSize };
  }

  const width = window.innerWidth;

  // Déterminer la taille d'écran actuelle
  let screenSize: ScreenSize = "2xl";
  if (width < breakpoints.xs) screenSize = "xs";
  else if (width < breakpoints.sm) screenSize = "sm";
  else if (width < breakpoints.md) screenSize = "md";
  else if (width < breakpoints.lg) screenSize = "lg";
  else if (width < breakpoints.xl) screenSize = "xl";
  else if (width < breakpoints["2xl"]) screenSize = "2xl";

  return { width, screenSize };
};

/**
 * Fonction utilitaire pour générer des classes Tailwind responsives
 * @param baseClass Classe de base (ex: 'text')
 * @param values Valeurs pour chaque breakpoint
 * @returns Chaîne de classes CSS Tailwind
 *
 * @example
 * // Génère: 'text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl'
 * const textClasses = responsiveClasses('text', {
 *   _: 'sm',
 *   xs: 'base',
 *   sm: 'lg',
 *   md: 'xl',
 *   lg: '2xl'
 * })
 */
export const responsiveClasses = (
  baseClass: string,
  values: Partial<Record<ScreenSize | "_", string>>,
) => {
  const classes: string[] = [];

  // Classe par défaut (sans préfixe)
  if (values._ !== undefined) {
    classes.push(`${baseClass}-${values._}`);
  }

  // Classes avec préfixes de breakpoints
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint !== "_" && value !== undefined) {
      classes.push(`${breakpoint}:${baseClass}-${value}`);
    }
  });

  return classes.join(" ");
};

/**
 * Fonction utilitaire pour générer des valeurs CSS responsives
 * @param property Propriété CSS
 * @param values Valeurs pour chaque breakpoint
 * @returns Objet de style CSS avec media queries
 *
 * @example
 * // Génère un objet de style avec media queries pour différentes tailles de police
 * const textStyles = responsiveStyles('fontSize', {
 *   _: '14px',
 *   xs: '16px',
 *   md: '18px',
 *   lg: '20px'
 * })
 */
export const responsiveStyles = (
  property: string,
  values: Partial<Record<ScreenSize | "_", string | number>>,
) => {
  const styles: Record<string, string | number | Record<string, string | number>> = {};

  // Valeur par défaut
  if (values._ !== undefined) {
    styles[property] = values._;
  }

  // Valeurs avec media queries
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint !== "_" && value !== undefined) {
      const minWidth = breakpoints[breakpoint as ScreenSize];
      styles[`@media (min-width: ${minWidth}px)`] = {
        [property]: value,
      };
    }
  });

  return styles;
};
