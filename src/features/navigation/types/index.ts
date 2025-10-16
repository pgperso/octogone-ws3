import { Route } from "@/types/routes";

export type NavTheme = "light" | "dark" | "transparent";

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
