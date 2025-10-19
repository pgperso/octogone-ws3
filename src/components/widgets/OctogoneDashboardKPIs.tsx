"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import Image from 'next/image';
import dashboardData from '@/data/dashboard/octogone_dashboard_data.json';

interface DashboardKPIsProps {
  locale?: 'fr' | 'en';
}

interface Metric {
  name: string;
  unit: string;
  current: number;
  previous: number;
  delta_pct: number | null;
}

interface EstablishmentData {
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
  metrics: Metric[];
}

interface PeriodData {
  label: string;
  by_establishment: {
    [key: string]: EstablishmentData;
  };
}

export default function OctogoneDashboardKPIs({ locale = 'fr' }: DashboardKPIsProps) {
  const isEnglish = locale === 'en';
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [selectedEstablishments, setSelectedEstablishments] = useState<string[]>(['est-bistro8', 'est-taqueria', 'est-roquette', 'est-rioux']);
  const [isEstablishmentDropdownOpen, setIsEstablishmentDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEstablishmentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Liste des établissements (4 restaurants)
  const establishments = [
    { id: 'est-bistro8', nameFr: 'Bistro 8', nameEn: 'Bistro 8' },
    { id: 'est-taqueria', nameFr: 'Taqueria Norte', nameEn: 'Taqueria Norte' },
    { id: 'est-roquette', nameFr: 'Roquette', nameEn: 'Roquette' },
    { id: 'est-rioux', nameFr: 'Chez Rioux', nameEn: 'Chez Rioux' }
  ];

  // Gestion de la sélection des établissements
  const handleEstablishmentToggle = (establishmentId: string) => {
    setSelectedEstablishments(prev => {
      if (prev.includes(establishmentId)) {
        return prev.filter(id => id !== establishmentId);
      } else {
        return [...prev, establishmentId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEstablishments.length === establishments.length) {
      setSelectedEstablishments([]);
    } else {
      setSelectedEstablishments(establishments.map(e => e.id));
    }
  };

  const getEstablishmentDisplayText = () => {
    if (selectedEstablishments.length === 0) {
      return isEnglish ? 'No establishments' : 'Aucun établissement';
    } else if (selectedEstablishments.length === establishments.length) {
      return isEnglish ? 'All establishments' : 'Tous les établissements';
    } else if (selectedEstablishments.length === 1) {
      const establishment = establishments.find(e => e.id === selectedEstablishments[0]);
      return establishment ? (isEnglish ? establishment.nameEn : establishment.nameFr) : '';
    } else {
      return `${selectedEstablishments.length} ${isEnglish ? 'establishments' : 'établissements'}`;
    }
  };

  const periods = [
    { id: 'day', labelFr: 'Jour', labelEn: 'Day' },
    { id: 'week', labelFr: 'Semaine', labelEn: 'Week' },
    { id: 'month', labelFr: 'Mois', labelEn: 'Month' },
    { id: 'custom', labelFr: 'Personnalisé', labelEn: 'Custom' }
  ];

  // Traductions des noms de métriques
  const metricTranslations: { [key: string]: { fr: string; en: string } } = {
    'Sales': { fr: 'Ventes', en: 'Sales' },
    'Client traffic': { fr: 'Achalandage', en: 'Client Traffic' },
    'Profits': { fr: 'Bénéfices', en: 'Profits' },
    'Spendings': { fr: 'Achats', en: 'Spendings' },
    'Gains and losses': { fr: 'Gains et pertes', en: 'Gains and Losses' },
    'Price monitoring': { fr: 'Surveillance des prix', en: 'Price Monitoring' },
    'Labour cost': { fr: 'Coûts main d\'oeuvre', en: 'Labour Cost' },
    'Food cost': { fr: 'Food cost', en: 'Food Cost' },
    'Menu engineering': { fr: 'Ingénierie de menu', en: 'Menu Engineering' },
    'Fixed costs': { fr: 'Coûts fixes', en: 'Fixed Costs' },
    'Average invoice per client': { fr: 'Facture moyenne client', en: 'Average Invoice per Client' }
  };

  // Obtenir les données pour la période sélectionnée
  const currentPeriodData = dashboardData.filters[selectedPeriod as keyof typeof dashboardData.filters] as PeriodData;

  // Fonction pour agréger les données des établissements sélectionnés
  const getAggregatedData = () => {
    const establishments = selectedEstablishments.length > 0 ? selectedEstablishments : Object.keys(currentPeriodData.by_establishment);
    
    let aggregatedCurrent = {
      sales: 0,
      clients: 0,
      spendings: 0,
      labour_cost: 0,
      food_cost_pct: 0,
      fixed_costs: 0,
      price_changes: 0,
      menu_items: 0,
      gains_losses: 0,
      profit: 0,
      food_cost_abs: 0,
      avg_invoice: 0
    };

    let aggregatedPrevious = {
      sales: 0,
      clients: 0,
      spendings: 0,
      labour_cost: 0,
      food_cost_pct: 0,
      fixed_costs: 0,
      price_changes: 0,
      menu_items: 0,
      gains_losses: 0,
      profit: 0,
      food_cost_abs: 0,
      avg_invoice: 0
    };

    // Agréger les données de tous les établissements sélectionnés
    establishments.forEach(estId => {
      const estData = currentPeriodData.by_establishment[estId];
      if (estData) {
        // Current
        aggregatedCurrent.sales += estData.current.sales;
        aggregatedCurrent.clients += estData.current.clients;
        aggregatedCurrent.spendings += estData.current.spendings;
        aggregatedCurrent.labour_cost += estData.current.labour_cost;
        aggregatedCurrent.fixed_costs += estData.current.fixed_costs;
        aggregatedCurrent.price_changes += estData.current.price_changes;
        aggregatedCurrent.menu_items += estData.current.menu_items;
        aggregatedCurrent.gains_losses += estData.current.gains_losses;
        aggregatedCurrent.profit += estData.current.profit;
        aggregatedCurrent.food_cost_abs += estData.current.food_cost_abs;

        // Previous
        aggregatedPrevious.sales += estData.previous.sales;
        aggregatedPrevious.clients += estData.previous.clients;
        aggregatedPrevious.spendings += estData.previous.spendings;
        aggregatedPrevious.labour_cost += estData.previous.labour_cost;
        aggregatedPrevious.fixed_costs += estData.previous.fixed_costs;
        aggregatedPrevious.price_changes += estData.previous.price_changes;
        aggregatedPrevious.menu_items += estData.previous.menu_items;
        aggregatedPrevious.gains_losses += estData.previous.gains_losses;
        aggregatedPrevious.profit += estData.previous.profit;
        aggregatedPrevious.food_cost_abs += estData.previous.food_cost_abs;
      }
    });

    // Calculer les moyennes pondérées pour food_cost_pct et avg_invoice
    aggregatedCurrent.food_cost_pct = aggregatedCurrent.sales > 0 ? (aggregatedCurrent.food_cost_abs / aggregatedCurrent.sales) * 100 : 0;
    aggregatedPrevious.food_cost_pct = aggregatedPrevious.sales > 0 ? (aggregatedPrevious.food_cost_abs / aggregatedPrevious.sales) * 100 : 0;
    
    aggregatedCurrent.avg_invoice = aggregatedCurrent.clients > 0 ? aggregatedCurrent.sales / aggregatedCurrent.clients : 0;
    aggregatedPrevious.avg_invoice = aggregatedPrevious.clients > 0 ? aggregatedPrevious.sales / aggregatedPrevious.clients : 0;

    return { current: aggregatedCurrent, previous: aggregatedPrevious };
  };

  const aggregatedData = getAggregatedData();

  // Convertir les données agrégées en métriques
  const getMetricsFromAggregatedData = (): Metric[] => {
    const { current, previous } = aggregatedData;

    const calculateDelta = (curr: number, prev: number): number | null => {
      if (prev === 0) return curr === 0 ? null : 100;
      return ((curr - prev) / prev) * 100;
    };

    return [
      {
        name: 'Sales',
        unit: 'CAD',
        current: current.sales,
        previous: previous.sales,
        delta_pct: calculateDelta(current.sales, previous.sales)
      },
      {
        name: 'Client traffic',
        unit: 'clients',
        current: current.clients,
        previous: previous.clients,
        delta_pct: calculateDelta(current.clients, previous.clients)
      },
      {
        name: 'Profits',
        unit: 'CAD',
        current: current.profit,
        previous: previous.profit,
        delta_pct: calculateDelta(current.profit, previous.profit)
      },
      {
        name: 'Spendings',
        unit: 'CAD',
        current: current.spendings,
        previous: previous.spendings,
        delta_pct: calculateDelta(current.spendings, previous.spendings)
      },
      {
        name: 'Gains and losses',
        unit: 'CAD',
        current: current.gains_losses,
        previous: previous.gains_losses,
        delta_pct: calculateDelta(current.gains_losses, previous.gains_losses)
      },
      {
        name: 'Price monitoring',
        unit: 'changes',
        current: current.price_changes,
        previous: previous.price_changes,
        delta_pct: calculateDelta(current.price_changes, previous.price_changes)
      },
      {
        name: 'Labour cost',
        unit: 'CAD',
        current: current.labour_cost,
        previous: previous.labour_cost,
        delta_pct: calculateDelta(current.labour_cost, previous.labour_cost)
      },
      {
        name: 'Food cost',
        unit: '%',
        current: current.food_cost_pct,
        previous: previous.food_cost_pct,
        delta_pct: calculateDelta(current.food_cost_pct, previous.food_cost_pct)
      },
      {
        name: 'Menu engineering',
        unit: 'items',
        current: current.menu_items,
        previous: previous.menu_items,
        delta_pct: calculateDelta(current.menu_items, previous.menu_items)
      },
      {
        name: 'Fixed costs',
        unit: 'CAD',
        current: current.fixed_costs,
        previous: previous.fixed_costs,
        delta_pct: calculateDelta(current.fixed_costs, previous.fixed_costs)
      },
      {
        name: 'Average invoice per client',
        unit: 'CAD',
        current: current.avg_invoice,
        previous: previous.avg_invoice,
        delta_pct: calculateDelta(current.avg_invoice, previous.avg_invoice)
      }
    ];
  };

  const currentMetrics = getMetricsFromAggregatedData();

  // Fonction pour formater les valeurs
  const formatValue = (metric: Metric): string => {
    const { current, unit } = metric;
    
    if (unit === 'CAD') {
      return `${current.toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`;
    } else if (unit === '%') {
      return `${current.toFixed(2)} %`;
    } else if (unit === 'clients') {
      return `${current.toLocaleString()} clients`;
    } else if (unit === 'items') {
      return `${current} items`;
    } else if (unit === 'changes') {
      return `${current} ${isEnglish ? 'changes' : 'changements'}`;
    }
    return current.toString();
  };

  const formatPreviousValue = (metric: Metric): string => {
    const { previous, unit } = metric;
    
    if (unit === 'CAD') {
      return `${previous.toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $`;
    } else if (unit === '%') {
      return `${previous.toFixed(2)} %`;
    } else if (unit === 'clients') {
      return `${previous.toLocaleString()} clients`;
    } else if (unit === 'items') {
      return `${previous} items`;
    } else if (unit === 'changes') {
      return `${previous} ${isEnglish ? 'changes' : 'changements'}`;
    }
    return previous.toString();
  };

  const getTrendIcon = (deltaPct: number | null) => {
    if (deltaPct === null || deltaPct === 0) return Minus;
    return deltaPct > 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (metric: Metric) => {
    const { delta_pct, name } = metric;
    if (delta_pct === null || delta_pct === 0) return 'var(--on-surface-variant)';
    
    // Pour certaines métriques, une diminution est positive
    const isDecreasePositive = ['Food cost', 'Labour cost', 'Fixed costs', 'Spendings'].includes(name);
    const isPositive = isDecreasePositive ? delta_pct < 0 : delta_pct > 0;
    
    return isPositive ? '#4CAF50' : '#F44336';
  };

  const formatDeltaPct = (deltaPct: number | null): string => {
    if (deltaPct === null) return '';
    const sign = deltaPct > 0 ? '+' : '';
    return `${sign}${deltaPct.toFixed(2)}%`;
  };

  // Fonction pour formater les dates
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isEnglish ? 'en-CA' : 'fr-CA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour obtenir les textes de période
  const getPeriodText = (): { current: string; previous: string } => {
    // Prendre les dates du premier établissement sélectionné pour l'affichage
    const firstEstablishment = selectedEstablishments[0] || Object.keys(currentPeriodData.by_establishment)[0];
    const estData = currentPeriodData.by_establishment[firstEstablishment];
    
    if (!estData) return { current: '', previous: '' };
    
    if (selectedPeriod === 'day') {
      const currentDate = estData.current.date ? formatDate(estData.current.date) : '';
      const previousDate = estData.previous.date ? formatDate(estData.previous.date) : '';
      return {
        current: currentDate,
        previous: previousDate
      };
    } else {
      const currentStart = estData.current.start ? formatDate(estData.current.start) : '';
      const currentEnd = estData.current.end ? formatDate(estData.current.end) : '';
      const previousStart = estData.previous.start ? formatDate(estData.previous.start) : '';
      const previousEnd = estData.previous.end ? formatDate(estData.previous.end) : '';
      
      return {
        current: `${currentStart} - ${currentEnd}`,
        previous: `${previousStart} - ${previousEnd}`
      };
    }
  };

  const periodText = getPeriodText();

  return (
    <div className="w-full">
      {/* Header avec avatar et sélecteurs */}
      <div className="mb-6">
        {/* Ligne du haut : Avatar + Nom et Sélecteur d'établissements */}
        <div className="flex items-center justify-between mb-4">
          {/* Avatar et salutation */}
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{ 
                border: '2px solid var(--primary)',
                padding: '2px'
              }}
            >
              <Image
                src="/images/avatars/marc.avif"
                alt="Marc"
                width={60}
                height={60}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center h-16">
              <h2 className="text-2xl font-bold leading-tight" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Hello Marc' : 'Bonjour Marc'}
              </h2>
              <p className="text-lg font-semibold leading-tight" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Restaurant Director' : 'Directeur de restauration'}
              </p>
              <p className="text-sm leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Saveur & Co' : 'Saveur & Co'}
              </p>
            </div>
          </div>

          {/* Sélecteur d'établissements */}
          <div className="flex flex-col">
            <span className="text-xs font-medium mb-1" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish ? 'Establishments' : 'Établissements'}
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsEstablishmentDropdownOpen(!isEstablishmentDropdownOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium border-0 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer flex items-center gap-2 min-w-48 h-10"
                style={{ 
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span className="flex-1 text-left">{getEstablishmentDisplayText()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown avec checkboxes */}
              {isEstablishmentDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-full rounded-lg shadow-lg z-50 py-2"
                  style={{ 
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--outline)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  {/* Option "Tous les établissements" */}
                  <div
                    onClick={handleSelectAll}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-opacity-50 cursor-pointer"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-variant)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEstablishments.length === establishments.length}
                      onChange={() => {}}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span className="text-sm font-medium" style={{ color: 'var(--on-surface)' }}>
                      {isEnglish ? 'All establishments' : 'Tous les établissements'}
                    </span>
                  </div>

                  {/* Séparateur */}
                  <div className="h-px mx-2 my-1" style={{ backgroundColor: 'var(--outline-variant)' }} />

                  {/* Options individuelles */}
                  {establishments.map((establishment) => (
                    <div
                      key={establishment.id}
                      onClick={() => handleEstablishmentToggle(establishment.id)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-opacity-50 cursor-pointer"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-variant)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEstablishments.includes(establishment.id)}
                        onChange={() => {}}
                        className="w-4 h-4 rounded cursor-pointer"
                        style={{ accentColor: 'var(--secondary)' }}
                      />
                      <span className="text-sm" style={{ color: 'var(--on-surface)' }}>
                        {isEnglish ? establishment.nameEn : establishment.nameFr}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Ligne des périodes : Segmented Button + Dates */}
        <div className="flex items-end gap-6">
          {/* Segmented Button pour les périodes */}
          <div className="flex flex-col">
            <div 
              className="inline-flex rounded-lg h-10"
              style={{ 
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--outline)'
              }}
            >
              {periods.map((period, index) => (
                <div key={period.id} className="flex h-full">
                  <button
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center h-full ${
                      index === 0 ? 'rounded-l-lg' : ''
                    } ${
                      index === periods.length - 1 ? 'rounded-r-lg' : ''
                    }`}
                    style={{
                      backgroundColor: selectedPeriod === period.id 
                        ? 'var(--secondary-container)' 
                        : 'var(--surface)',
                      color: selectedPeriod === period.id 
                        ? 'var(--on-secondary-container)' 
                        : 'var(--on-surface)'
                    }}
                  >
                    {isEnglish ? period.labelEn : period.labelFr}
                  </button>
                  {/* Ligne séparatrice verticale pleine hauteur */}
                  {index < periods.length - 1 && (
                    <div 
                      className="w-px h-full"
                      style={{ backgroundColor: 'var(--outline)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Affichage des périodes courante et comparative avec bordure */}
          <div 
            className="flex items-start gap-0 text-sm h-10 rounded-lg"
            style={{ border: '1px solid var(--outline)' }}
          >
            <div className="flex flex-col h-full justify-end px-4 py-2">
              <span className="text-xs font-medium mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Period' : 'Période'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {periodText.current}
              </span>
            </div>
            {/* Séparateur vertical pleine hauteur */}
            <div 
              className="w-px h-full"
              style={{ backgroundColor: 'var(--outline)' }}
            />
            <div className="flex flex-col h-full justify-end px-4 py-2">
              <span className="text-xs font-medium mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Comparative period' : 'Période comparative'}
              </span>
              <span style={{ color: 'var(--on-surface-variant)' }}>
                {periodText.previous}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMetrics.map((metric: Metric, index: number) => {
          const TrendIcon = getTrendIcon(metric.delta_pct);
          const trendColor = getTrendColor(metric);
          const translation = metricTranslations[metric.name];
          const title = translation ? (isEnglish ? translation.en : translation.fr) : metric.name;

          return (
            <div
              key={index}
              className="rounded-xl p-5 transition-all duration-300 hover:shadow-xl"
              style={{ 
                backgroundColor: 'var(--surface)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Header avec titre et icône info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                    {title}
                  </h4>
                </div>
                {metric.delta_pct !== null && (
                  <TrendIcon 
                    className="w-5 h-5" 
                    style={{ color: trendColor }}
                  />
                )}
              </div>

              {/* Valeur principale */}
              <div className="mb-2">
                <p 
                  className="text-2xl font-bold"
                  style={{ 
                    color: metric.current < 0 ? '#F44336' : 'var(--on-surface)'
                  }}
                >
                  {formatValue(metric)}
                </p>
              </div>

              {/* Comparaison et changement */}
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                  {formatPreviousValue(metric)}
                </p>
                {metric.delta_pct !== null && (
                  <p 
                    className="text-xs font-semibold"
                    style={{ color: trendColor }}
                  >
                    {formatDeltaPct(metric.delta_pct)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
