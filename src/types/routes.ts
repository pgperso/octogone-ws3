export interface Route {
  path: string;
  label: string;
  description?: string;
  children?: Route[];
}
