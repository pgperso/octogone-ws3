/**
 * Types pour le Dashboard Octogone
 */

export interface Metric {
  name: string;
  unit: string;
  current: number;
  previous: number;
  delta_pct: number | null;
}

export interface EstablishmentData {
  current: {
    date?: string;
    start?: string;
    end?: string;
    sales: number;
    clients: number;
    spendings: number;
    labour_cost: number;
    food_cost_pct: number;
    fixed_costs: number;
    price_changes: number;
    menu_items: number;
    gains_losses: number;
    profit: number;
    food_cost_abs: number;
    avg_invoice: number;
  };
  previous: {
    date?: string;
    start?: string;
    end?: string;
    sales: number;
    clients: number;
    spendings: number;
    labour_cost: number;
    food_cost_pct: number;
    fixed_costs: number;
    price_changes: number;
    menu_items: number;
    gains_losses: number;
    profit: number;
    food_cost_abs: number;
    avg_invoice: number;
  };
  metrics: Record<string, Metric>;
}

export interface DashboardData {
  currency: string;
  multi_establishment: boolean;
  combinable_selection: boolean;
  establishments: Array<{
    id: string;
    name: string;
    style: string;
  }>;
  filters: {
    day: {
      all: EstablishmentData;
      by_establishment: Record<string, EstablishmentData>;
    };
    week: {
      all: EstablishmentData;
      by_establishment: Record<string, EstablishmentData>;
    };
    month: {
      all: EstablishmentData;
      by_establishment: Record<string, EstablishmentData>;
    };
    custom: {
      all: EstablishmentData;
      by_establishment: Record<string, EstablishmentData>;
    };
  };
}

export interface KPITileProps {
  title: string;
  value: string;
  previousValue: string;
  change: number | null;
  unit: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
}

export interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  metric: string;
  children?: React.ReactNode;
}

export type PeriodType = 'day' | 'week' | 'month' | 'custom';

export interface DashboardKPIsProps {
  locale?: 'fr' | 'en';
}
