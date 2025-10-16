export const breakpoints = {
  xs: "320px", // Mobile S
  sm: "480px", // Mobile L
  md: "768px", // Tablet
  lg: "1024px", // Laptop
  xl: "1280px", // Desktop
  "2xl": "1536px", // Large Desktop
} as const;

export const containers = {
  xs: "100%",
  sm: "450px",
  md: "728px",
  lg: "984px",
  xl: "1240px",
  "2xl": "1496px",
} as const;

// Dimensions standards pour les composants
export const dimensions = {
  header: {
    height: {
      mobile: "60px",
      desktop: "72px",
    },
  },
  sidebar: {
    width: {
      collapsed: "72px",
      expanded: "256px",
    },
  },
  footer: {
    height: {
      mobile: "120px",
      desktop: "80px",
    },
  },
} as const;

// Espacement responsive
export const spacing = {
  page: {
    mobile: "16px",
    tablet: "24px",
    desktop: "32px",
  },
  section: {
    mobile: "32px",
    tablet: "48px",
    desktop: "64px",
  },
  component: {
    mobile: "16px",
    tablet: "24px",
    desktop: "32px",
  },
} as const;
