export type NavTheme = "light" | "dark" | "transparent";

export interface NavContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: NavTheme;
}
