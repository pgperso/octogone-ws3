/**
 * Configuration du calculateur ROI - Version 2 (JSON-based)
 * 
 * Cette version utilise les données JSON pour faciliter les modifications.
 * Migration progressive : garde la compatibilité avec l'ancienne version.
 */

import { 
  calculatorModules, 
  pricingTiers, 
  locationRanges, 
  calculationConfig,
  type Module,
  type PricingTier,
  type LocationRange,
  type CalculationConfig
} from '@/data/calculator';

// ============================================
// EXPORTS COMPATIBLES (même interface qu'avant)
// ============================================

export const AVAILABLE_MODULES: Module[] = calculatorModules as Module[];
export const PRICING_TIERS: PricingTier[] = pricingTiers as PricingTier[];
export const LOCATION_RANGES: LocationRange[] = locationRanges as LocationRange[];

// Configuration de calcul (structure aplatie pour compatibilité)
const config = calculationConfig as CalculationConfig;

export const CALCULATION_CONFIG = {
  defaultHourlyCost: config.defaultHourlyCost,
  defaultManualTasksHoursPerWeek: config.defaultManualTasksHoursPerWeek,
  weeksPerMonth: config.weeksPerMonth,
  weeksPerYear: config.weeksPerYear,
  roiPeriodMonths: config.roiPeriodMonths,
  integrationFeePerLocation: config.integrationFeePerLocation,
  conservativeFactor: config.conservativeFactor
};

export const INVENTORY_SAVINGS = {
  timeSavedPerInventoryPerPersonHours: config.inventorySavings.timeSavedPerInventoryPerPersonHours,
  moneySavedPerInventory: config.inventorySavings.moneySavedPerInventory,
  defaultInventoriesPerMonth: config.inventorySavings.defaultInventoriesPerMonth,
  defaultEmployeesPerInventory: config.inventorySavings.defaultEmployeesPerInventory
};

// ============================================
// TYPES (réexportés pour compatibilité)
// ============================================

export type { Module, PricingTier, LocationRange, CalculationConfig };
