/**
 * Utilitaires de calcul ROI
 * 
 * Toutes les formules de calcul sont centralisées ici.
 */

import { 
  AVAILABLE_MODULES, 
  PRICING_TIERS, 
  LOCATION_RANGES,
  CALCULATION_CONFIG
} from '../config';

export interface ROIResult {
  // Coûts
  monthlySubscriptionCost: number;
  yearlySubscriptionCost: number;
  implementationCost: number;
  totalFirstYearCost: number;
  
  // Gains
  monthlyMoneySavings: number;
  yearlyMoneySavings: number;
  monthlyTimeSavings: number; // En heures
  yearlyTimeSavings: number; // En heures
  timeSavingsValue: number; // Valeur monétaire du temps économisé
  
  // Gains personnalisés (tâches manuelles)
  manualTasksTimeSaved: number; // Heures économisées sur tâches manuelles
  manualTasksValueSaved: number; // Valeur monétaire des tâches manuelles économisées
  
  // ROI
  totalYearlySavings: number;
  netYearlySavings: number; // Gains - Coûts
  roiPercentage: number;
  paybackPeriodMonths: number; // Nombre de mois pour rentabiliser
  
  // Détails
  numberOfLocations: number;
  selectedModules: string[];
  efficiencyMultiplier: number;
}

/**
 * Calcule le coût mensuel par établissement selon la tranche
 */
export function getPricePerLocation(numberOfLocations: number): number {
  const tier = PRICING_TIERS.find(
    t => numberOfLocations >= t.minLocations && 
         (t.maxLocations === null || numberOfLocations <= t.maxLocations)
  );
  
  return tier?.pricePerLocationPerMonth || PRICING_TIERS[0].pricePerLocationPerMonth;
}

/**
 * Obtient le multiplicateur d'efficacité selon le nombre d'établissements
 */
export function getEfficiencyMultiplier(numberOfLocations: number): number {
  const range = LOCATION_RANGES.find(
    r => numberOfLocations >= r.min && 
         (r.max === null || numberOfLocations <= r.max)
  );
  
  return range?.efficiencyMultiplier || 1.0;
}

/**
 * Calcule le ROI complet
 */
export function calculateROI(
  numberOfLocations: number,
  selectedModuleIds: string[],
  hourlyCost: number = CALCULATION_CONFIG.defaultHourlyCost,
  manualTasksHoursPerWeek: number = CALCULATION_CONFIG.defaultManualTasksHoursPerWeek
): ROIResult {
  // Validation
  if (numberOfLocations < 1) numberOfLocations = 1;
  if (selectedModuleIds.length === 0) {
    // Retour avec valeurs nulles si aucun module sélectionné
    return {
      monthlySubscriptionCost: 0,
      yearlySubscriptionCost: 0,
      implementationCost: 0,
      totalFirstYearCost: 0,
      monthlyMoneySavings: 0,
      yearlyMoneySavings: 0,
      monthlyTimeSavings: 0,
      yearlyTimeSavings: 0,
      timeSavingsValue: 0,
      manualTasksTimeSaved: 0,
      manualTasksValueSaved: 0,
      totalYearlySavings: 0,
      netYearlySavings: 0,
      roiPercentage: 0,
      paybackPeriodMonths: 0,
      numberOfLocations,
      selectedModules: [],
      efficiencyMultiplier: 1
    };
  }
  
  // Récupération des modules sélectionnés
  const selectedModules = AVAILABLE_MODULES.filter(m => 
    selectedModuleIds.includes(m.id)
  );
  
  // Multiplicateur d'efficacité
  const efficiencyMultiplier = getEfficiencyMultiplier(numberOfLocations);
  
  // === CALCUL DES COÛTS ===
  const pricePerLocation = getPricePerLocation(numberOfLocations);
  const monthlySubscriptionCost = pricePerLocation * numberOfLocations;
  const yearlySubscriptionCost = monthlySubscriptionCost * 12;
  const implementationCost = CALCULATION_CONFIG.integrationFeePerLocation * numberOfLocations;
  const totalFirstYearCost = yearlySubscriptionCost + implementationCost;
  
  // === CALCUL DES GAINS MONÉTAIRES ===
  let monthlyMoneySavingsPerLocation = 0;
  selectedModules.forEach(module => {
    monthlyMoneySavingsPerLocation += module.monthlySavingsPerLocation;
  });
  
  // Application du multiplicateur d'efficacité et du facteur conservateur
  const monthlyMoneySavings = 
    monthlyMoneySavingsPerLocation * 
    numberOfLocations * 
    efficiencyMultiplier * 
    CALCULATION_CONFIG.conservativeFactor;
  
  const yearlyMoneySavings = monthlyMoneySavings * 12;
  
  // === CALCUL DES GAINS DE TEMPS ===
  let timesSavedPerWeekPerLocation = 0;
  selectedModules.forEach(module => {
    timesSavedPerWeekPerLocation += module.timesSavedPerWeekPerLocation;
  });
  
  const monthlyTimeSavings = 
    timesSavedPerWeekPerLocation * 
    CALCULATION_CONFIG.weeksPerMonth * 
    numberOfLocations * 
    efficiencyMultiplier * 
    CALCULATION_CONFIG.conservativeFactor;
  
  const yearlyTimeSavings = monthlyTimeSavings * 12;
  
  // Valeur monétaire du temps économisé
  const timeSavingsValue = yearlyTimeSavings * hourlyCost;
  
  // === CALCUL DES GAINS TÂCHES MANUELLES ===
  let manualTasksReductionTotal = 0;
  let invoiceTasksReductionTotal = 0;
  
  selectedModules.forEach(module => {
    manualTasksReductionTotal += module.manualTasksReduction || 0;
    invoiceTasksReductionTotal += module.invoiceTasksReduction || 0;
  });
  
  // Limiter à 100% maximum
  manualTasksReductionTotal = Math.min(manualTasksReductionTotal, 1);
  invoiceTasksReductionTotal = Math.min(invoiceTasksReductionTotal, 1);
  
  // Calcul des heures économisées sur tâches manuelles
  const totalReduction = Math.min(manualTasksReductionTotal + invoiceTasksReductionTotal, 1);
  const manualTasksTimeSaved = 
    manualTasksHoursPerWeek * 
    totalReduction * 
    CALCULATION_CONFIG.weeksPerYear * 
    numberOfLocations * 
    efficiencyMultiplier * 
    CALCULATION_CONFIG.conservativeFactor;
  
  const manualTasksValueSaved = manualTasksTimeSaved * hourlyCost;
  
  // === CALCUL DU ROI ===
  const totalYearlySavings = yearlyMoneySavings + timeSavingsValue + manualTasksValueSaved;
  const netYearlySavings = totalYearlySavings - totalFirstYearCost;
  const roiPercentage = totalFirstYearCost > 0 
    ? (netYearlySavings / totalFirstYearCost) * 100 
    : 0;
  
  // Période de retour sur investissement - CORRIGÉ
  const monthlyTotalSavings = monthlyMoneySavings + (monthlyTimeSavings * hourlyCost) + (manualTasksValueSaved / 12);
  const paybackPeriodMonths = monthlyTotalSavings > 0
    ? totalFirstYearCost / monthlyTotalSavings
    : 0;
  
  return {
    monthlySubscriptionCost,
    yearlySubscriptionCost,
    implementationCost,
    totalFirstYearCost,
    monthlyMoneySavings,
    yearlyMoneySavings,
    monthlyTimeSavings,
    yearlyTimeSavings,
    timeSavingsValue,
    manualTasksTimeSaved,
    manualTasksValueSaved,
    totalYearlySavings,
    netYearlySavings,
    roiPercentage,
    paybackPeriodMonths,
    numberOfLocations,
    selectedModules: selectedModuleIds,
    efficiencyMultiplier
  };
}

/**
 * Formate un nombre en devise
 */
export function formatCurrency(amount: number): string {
  // Utiliser le format anglais (virgule pour milliers, point pour décimales)
  const formatted = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount);
  
  // Format obtenu : $3,469.18 → On veut : 3,469.18$
  return formatted.replace('$', '').trim() + '$';
}

/**
 * Formate un nombre d'heures
 */
export function formatHours(hours: number, locale: string = 'fr'): string {
  const rounded = Math.round(hours);
  return locale === 'fr' 
    ? `${rounded} h` 
    : `${rounded} hrs`;
}
