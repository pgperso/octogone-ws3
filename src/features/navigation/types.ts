export type Route = {
  href: string;
  label: string;
  path: string;
  description?: string;
  children?: Route[];
};

export type NavigationTheme = "light" | "dark" | "transparent";

export interface DesktopNavProps {
  routes: Route[];
  activeRoute: string;
  theme?: NavigationTheme;
  locale?: string;
}
