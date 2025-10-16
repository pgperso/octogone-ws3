export interface Route {
  path: string;
  label: string;
  href?: string;
  description?: string;
  children?: Route[];
}
