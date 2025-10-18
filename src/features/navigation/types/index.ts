export type NavTheme = "light" | "dark" | "transparent";

export interface Route {
  path: string;
  label: string;
  labelEn?: string;
  href: string;
  description?: string;
  descriptionEn?: string;
  children?: Route[];
}

export interface NavContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: NavTheme;
}

export interface DesktopNavProps {
  routes: Route[];
  activeRoute?: string;
  theme?: NavTheme;
}

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  routes: Route[];
}
