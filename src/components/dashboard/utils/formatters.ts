/**
 * Utilitaires de formatage pour le dashboard
 */

// Métriques où une diminution est positive
const DECREASE_POSITIVE_METRICS = [
  'spendings', 'labour_cost', 'food_cost_pct', 'food_cost_abs', 'fixed_costs'
];

/**
 * Formate une valeur métrique selon son type et unité
 */
export const formatMetricValue = (
  value: number,
  unit: string,
  currency: string = 'CAD'
): string => {
  if (unit === '$') {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  
  if (unit === '%') {
    return `${value.toFixed(1)}%`;
  }
  
  if (unit === 'clients' || unit === 'items' || unit === '') {
    return new Intl.NumberFormat('fr-CA').format(Math.round(value));
  }
  
  return `${value} ${unit}`;
};

/**
 * Détermine si une variation est positive selon la métrique
 */
export const isVariationPositive = (metricName: string, deltaPercent: number): boolean => {
  if (deltaPercent === 0) return false;
  
  const isDecreasePositive = DECREASE_POSITIVE_METRICS.some(metric => 
    metricName.toLowerCase().includes(metric)
  );
  
  return isDecreasePositive ? deltaPercent < 0 : deltaPercent > 0;
};

/**
 * Formate le pourcentage de variation
 */
export const formatVariationPercent = (deltaPercent: number | null): string => {
  if (deltaPercent === null) return '0.0%';
  const sign = deltaPercent >= 0 ? '+' : '';
  return `${sign}${deltaPercent.toFixed(1)}%`;
};

/**
 * Obtient la couleur de la variation selon si elle est positive ou négative
 */
export const getVariationColor = (metricName: string, deltaPercent: number | null): string => {
  if (deltaPercent === null || deltaPercent === 0) {
    return 'var(--on-surface-variant)';
  }
  
  const isPositive = isVariationPositive(metricName, deltaPercent);
  return isPositive ? '#059669' : '#DC2626'; // green-600 : red-600
};
