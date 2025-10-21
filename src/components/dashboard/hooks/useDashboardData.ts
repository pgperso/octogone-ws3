/**
 * Hook pour gérer les données du dashboard
 */

import { useState, useEffect, useMemo } from 'react';
import { EstablishmentData, PeriodType } from '../types';
import dashboardData from '@/data/dashboard/octogone_dashboard_data.json';

// Type pour les vraies données JSON
type RealDashboardData = {
  currency: string;
  establishments: Array<{
    id: string;
    name: string;
    style: string;
  }>;
  filters: Record<string, {
    by_establishment: Record<string, EstablishmentData>;
  }>;
};

export const useDashboardData = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('day');
  const [selectedEstablishments, setSelectedEstablishments] = useState<string[]>([]);

  const data = dashboardData as RealDashboardData;

  // Initialiser avec tous les établissements sélectionnés
  useEffect(() => {
    const allEstablishmentIds = data.establishments.map(est => est.id);
    setSelectedEstablishments(allEstablishmentIds);
  }, [data.establishments]);

  // Calculer les données actuelles basées sur la sélection
  const currentData = useMemo(() => {
    if (selectedEstablishments.length === 1) {
      // Un seul établissement sélectionné
      const estId = selectedEstablishments[0];
      return data.filters[selectedPeriod].by_establishment[estId];
    } else {
      // Plusieurs établissements - utiliser le premier comme fallback
      const firstEstId = data.establishments[0]?.id;
      return data.filters[selectedPeriod].by_establishment[firstEstId] || {
        current: {},
        previous: {},
        metrics: {}
      };
    }
  }, [selectedPeriod, selectedEstablishments, data]);

  const establishments = useMemo(() => {
    return data.establishments;
  }, [data.establishments]);

  return {
    selectedPeriod,
    setSelectedPeriod,
    selectedEstablishments,
    setSelectedEstablishments,
    currentData,
    establishments,
    currency: data.currency,
  };
};
