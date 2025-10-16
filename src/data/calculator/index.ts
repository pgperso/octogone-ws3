/**
 * Index pour les données du calculateur ROI
 * Facilite les imports et centralise les exports
 */

export { default as calculatorModules } from './modules.json';
export { default as pricingTiers } from './pricing.json';
export { default as locationRanges } from './location-ranges.json';
export { default as calculationConfig } from './calculation-config.json';

// Types pour TypeScript (à migrer depuis calculator-config.ts si nécessaire)
export interface Module {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  featuresFr: string[];
  featuresEn: string[];
  monthlySavingsPerLocation: number;
  timesSavedPerWeekPerLocation: number;
  manualTasksReduction: number; // Pourcentage de réduction des tâches manuelles (0-1)
  invoiceTasksReduction: number; // Pourcentage de réduction des tâches factures (0-1)
  icon: string;
}

export interface PricingTier {
  minLocations: number;
  maxLocations: number | null;
  pricePerLocationPerMonth: number;
}

export interface LocationRange {
  min: number;
  max: number | null;
  labelFr: string;
  labelEn: string;
  efficiencyMultiplier: number;
}

export interface CalculationConfig {
  defaultHourlyCost: number;
  defaultManualTasksHoursPerWeek: number;
  weeksPerMonth: number;
  weeksPerYear: number;
  roiPeriodMonths: number;
  integrationFeePerLocation: number;
  conservativeFactor: number;
  inventorySavings: {
    timeSavedPerInventoryPerPersonHours: number;
    moneySavedPerInventory: number;
    defaultInventoriesPerMonth: number;
    defaultEmployeesPerInventory: number;
  };
}
