"use client";

import React from 'react';
import { DollarSign, Users, TrendingUp, ShoppingCart, Utensils, Building, Receipt, Target } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { 
  useDashboardData, 
  useKPIModal, 
  KPITile, 
  KPIModal, 
  formatMetricValue,
  DashboardKPIsProps 
} from '@/components/dashboard';

// Constantes pour les traductions et icônes
const METRIC_TRANSLATIONS = {
  fr: {
    sales: 'Ventes',
    clients: 'Achalandage',
    profit: 'Bénéfices',
    spendings: 'Achats',
    labour_cost: 'Coûts main-d\'œuvre',
    food_cost_pct: 'Food cost (%)',
    food_cost_abs: 'Food cost ($)',
    avg_invoice: 'Facture moyenne',
    fixed_costs: 'Coûts fixes',
    gains_losses: 'Gains/Pertes',
    menu_items: 'Items menu',
    price_changes: 'Changements prix'
  },
  en: {
    sales: 'Sales',
    clients: 'Traffic',
    profit: 'Profit',
    spendings: 'Purchases',
    labour_cost: 'Labour cost',
    food_cost_pct: 'Food cost (%)',
    food_cost_abs: 'Food cost ($)',
    avg_invoice: 'Average invoice',
    fixed_costs: 'Fixed costs',
    gains_losses: 'Gains/Losses',
    menu_items: 'Menu items',
    price_changes: 'Price changes'
  }
};

const METRIC_ICONS = {
  sales: DollarSign,
  clients: Users,
  profit: TrendingUp,
  spendings: ShoppingCart,
  labour_cost: Building,
  food_cost_pct: Utensils,
  food_cost_abs: Utensils,
  avg_invoice: Receipt,
  fixed_costs: Target,
  gains_losses: TrendingUp,
  menu_items: Receipt,
  price_changes: Target
};

const PERIODS = [
  { id: 'day' as const, labelFr: 'Jour', labelEn: 'Day' },
  { id: 'week' as const, labelFr: 'Semaine', labelEn: 'Week' },
  { id: 'month' as const, labelFr: 'Mois', labelEn: 'Month' },
  { id: 'custom' as const, labelFr: 'Personnalisé', labelEn: 'Custom' }
];

export const OctogoneDashboardKPIs: React.FC<DashboardKPIsProps> = ({ 
  locale = 'fr' 
}) => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedEstablishments,
    setSelectedEstablishments,
    currentData,
    establishments,
    currency
  } = useDashboardData();

  const { isOpen, activeMetric, openModal, closeModal } = useKPIModal();

  // Métriques principales à afficher
  const mainMetrics = [
    'sales', 'clients', 'profit', 'spendings', 
    'labour_cost', 'food_cost_pct', 'avg_invoice', 'fixed_costs'
  ];

  const handleEstablishmentToggle = (id: string) => {
    setSelectedEstablishments(prev => 
      prev.includes(id) 
        ? prev.filter(estId => estId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = establishments.map(est => est.id);
    setSelectedEstablishments(
      selectedEstablishments.length === allIds.length ? [] : allIds
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* En-tête avec contrôles */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--on-surface)' }}
          >
            {locale === 'fr' ? 'Tableau de bord' : 'Dashboard'}
          </h2>
          <p 
            className="text-sm"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {locale === 'fr' 
              ? 'Aperçu des performances de vos établissements'
              : 'Overview of your establishments performance'
            }
          </p>
        </div>

        {/* Contrôles de période */}
        <div className="flex items-center gap-2">
          {PERIODS.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-variant text-on-surface-variant hover:bg-primary/10'
              }`}
            >
              {locale === 'fr' ? period.labelFr : period.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Sélecteur d'établissements */}
      <div 
        className="p-4 rounded-xl border"
        style={{ 
          backgroundColor: 'var(--surface-variant)',
          borderColor: 'var(--outline)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 
            className="font-semibold"
            style={{ color: 'var(--on-surface)' }}
          >
            {locale === 'fr' ? 'Établissements' : 'Establishments'}
          </h3>
          <button
            onClick={handleSelectAll}
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            {selectedEstablishments.length === establishments.length
              ? (locale === 'fr' ? 'Désélectionner tout' : 'Deselect all')
              : (locale === 'fr' ? 'Sélectionner tout' : 'Select all')
            }
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {establishments.map((est) => (
            <button
              key={est.id}
              onClick={() => handleEstablishmentToggle(est.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedEstablishments.includes(est.id)
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface text-on-surface hover:bg-primary/10'
              }`}
            >
              {est.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((metricKey) => {
          const current = currentData.current[metricKey as keyof typeof currentData.current];
          const previous = currentData.previous[metricKey as keyof typeof currentData.previous];
          const metric = currentData.metrics[metricKey];
          
          if (!metric) return null;

          const IconComponent = METRIC_ICONS[metricKey as keyof typeof METRIC_ICONS];
          const title = METRIC_TRANSLATIONS[locale][metricKey as keyof typeof METRIC_TRANSLATIONS.fr];
          
          return (
            <KPITile
              key={metricKey}
              title={title}
              value={formatMetricValue(current as number, metric.unit, currency)}
              previousValue={formatMetricValue(previous as number, metric.unit, currency)}
              change={metric.delta_pct}
              unit={metric.unit}
              icon={IconComponent}
              onClick={() => openModal(metricKey)}
            />
          );
        })}
      </div>

      {/* Bouton d'action */}
      <div className="flex justify-center pt-6">
        <OctogoneButton
          href={`/${locale}/demo`}
          variant="primary"
          size="lg"
        >
          {locale === 'fr' ? 'Voir la démo complète' : 'See full demo'}
        </OctogoneButton>
      </div>

      {/* Modal pour les détails KPI */}
      <KPIModal
        isOpen={isOpen}
        onClose={closeModal}
        title={activeMetric ? METRIC_TRANSLATIONS[locale][activeMetric as keyof typeof METRIC_TRANSLATIONS.fr] : ''}
        metric={activeMetric || ''}
      />
    </div>
  );
};

export default OctogoneDashboardKPIs;
