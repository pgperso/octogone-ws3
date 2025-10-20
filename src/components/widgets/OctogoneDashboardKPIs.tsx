"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Info, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dashboardData from '@/data/dashboard/octogone_dashboard_data.json';
import { OctogoneButton } from '@/components/ui/octogone-button';

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
}

interface PeriodData {
  label: string;
  display_range: string;
  display_compare_range: string;
  by_establishment: {
    [key: string]: EstablishmentData;
  };
}

export default function OctogoneDashboardKPIs({ locale = 'fr' }: DashboardKPIsProps) {
  const isEnglish = locale === 'en';
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [selectedEstablishments, setSelectedEstablishments] = useState<string[]>(['est-bistro8', 'est-taqueria', 'est-roquette', 'est-rioux']);
  const [isEstablishmentDropdownOpen, setIsEstablishmentDropdownOpen] = useState(false);
  const [activeVersion, setActiveVersion] = useState<'current' | 'next'>('current');
  const [isCortexModalOpen, setIsCortexModalOpen] = useState(false);
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
    
    const aggregatedCurrent = {
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

    const aggregatedPrevious = {
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

  // Fonction pour obtenir les textes de période
  const getPeriodText = (): { current: string; previous: string } => {
    return {
      current: currentPeriodData.display_range,
      previous: currentPeriodData.display_compare_range
    };
  };

  const periodText = getPeriodText();

  return (
    <>
    <div className="w-full relative">
      {/* Toggle Version en haut */}
      <div className="flex justify-center mb-6">
        <div 
          className="inline-flex rounded-lg p-1"
          style={{ 
            backgroundColor: 'var(--surface-variant)',
            border: '1px solid var(--outline-variant)'
          }}
        >
          <button
            onClick={() => setActiveVersion('current')}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeVersion === 'current' 
                ? 'shadow-lg' 
                : 'hover:bg-opacity-50'
            }`}
            style={{
              background: activeVersion === 'current' ? 'var(--primary)' : 'transparent',
              color: activeVersion === 'current' 
                ? 'var(--on-primary)' 
                : 'var(--on-surface-variant)'
            }}
          >
            {isEnglish ? 'Current Version' : 'Version actuelle'}
          </button>
          <button
            onClick={() => setActiveVersion('next')}
            className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeVersion === 'next' 
                ? 'shadow-lg' 
                : 'hover:bg-opacity-50'
            }`}
            style={{
              background: activeVersion === 'next' ? 'var(--primary)' : 'transparent',
              color: activeVersion === 'next' 
                ? 'var(--on-primary)' 
                : 'var(--on-surface-variant)'
            }}
          >
            {isEnglish ? 'Coming Soon' : 'Prochainement'}
          </button>
        </div>
      </div>

      {/* Affichage conditionnel selon la version */}
      {activeVersion === 'next' ? (
        /* Message professionnel pour Octogone 360 */
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center max-w-3xl">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Octogone 360: New Dashboard in Development' : 'Octogone 360 : Nouveau tableau de bord en développement'}
            </h2>
            <p 
              className="text-lg mb-6 leading-relaxed"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish 
                ? 'We are developing Octogone 360, an evolution of the Octogone dashboard that will fully integrate Cortex, our artificial intelligence.' 
                : 'Nous développons Octogone 360, une évolution du tableau de bord Octogone qui intégrera pleinement Cortex, notre intelligence artificielle.'}
            </p>
            <p 
              className="text-lg mb-6 leading-relaxed"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish 
                ? 'This new version will expand current analytical capabilities and offer intelligent recommendations generated from your real-time data.' 
                : 'Cette nouvelle version élargira les capacités d\'analyse actuelles et offrira des recommandations intelligentes, générées à partir de vos données en temps réel.'}
            </p>
            <p 
              className="text-lg mb-10 leading-relaxed"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish 
                ? 'Cortex will become a true strategic ally, capable of anticipating trends, detecting gaps, and suggesting concrete actions to optimize your operations.' 
                : 'Cortex deviendra un véritable allié stratégique, capable d\'anticiper les tendances, de détecter les écarts et de suggérer des actions concrètes pour optimiser vos opérations.'}
            </p>
            <div 
              className="p-8 mb-8 rounded-lg"
              style={{ 
                backgroundColor: 'var(--secondary-container)',
                border: 'none'
              }}
            >
              <p 
                className="text-2xl font-bold mb-4"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish ? 'Secure Your Current Rate' : 'Sécurisez votre tarif actuel'}
              </p>
              <p 
                className="text-base leading-relaxed mb-3"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish 
                  ? 'Subscribe today and keep your current rate.' 
                  : 'Abonnez-vous dès aujourd\'hui et conservez votre tarif actuel.'}
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish 
                  ? 'When Octogone 360 launches, you will automatically benefit from all new features and advanced Cortex recommendations at no additional cost.' 
                  : 'Lors du lancement d\'Octogone 360, vous profiterez automatiquement de toutes les nouvelles fonctionnalités et des recommandations avancées de Cortex, sans frais supplémentaires.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Dashboard actuel */
        <>
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
              <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--primary)' }}>
                {isEnglish ? 'Restaurant Director' : 'Directeur de restauration'}
              </p>
              <p className="text-xs leading-tight" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Groupe Resto & Co' : 'Groupe Resto & Co'}
              </p>
            </div>
          </div>

        </div>
        
        {/* Ligne des périodes : Groupé à gauche + Sélecteur à droite */}
        <div className="flex items-end justify-between gap-3">
          {/* Groupe de gauche : Segmented Button + Périodes */}
          <div className="flex flex-col md:flex-row md:items-end gap-3">
            {/* Segmented Button pour les périodes - Compact sur mobile */}
            <div 
              className="inline-flex rounded-lg h-10"
              style={{ 
                backgroundColor: 'transparent',
                border: '1px solid var(--outline)'
              }}
            >
              {periods.map((period, index) => (
                <div key={period.id} className="flex h-full">
                  <button
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 md:px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center h-full ${
                      index === 0 ? 'rounded-l-lg' : ''
                    } ${
                      index === periods.length - 1 ? 'rounded-r-lg' : ''
                    }`}
                    style={{
                      backgroundColor: selectedPeriod === period.id 
                        ? 'var(--secondary-container)' 
                        : 'transparent',
                      color: selectedPeriod === period.id 
                        ? 'var(--on-secondary-container)' 
                        : 'var(--on-surface)'
                    }}
                  >
                    {/* Texte complet sur desktop, première lettre sur mobile */}
                    <span className="hidden md:inline">{isEnglish ? period.labelEn : period.labelFr}</span>
                    <span className="md:hidden">{(isEnglish ? period.labelEn : period.labelFr).charAt(0)}</span>
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

            {/* Affichage des périodes courante et comparative avec bordure */}
            <div 
              className="hidden md:flex items-start gap-0 text-sm h-10 rounded-lg"
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

          {/* Sélecteur d'établissements - Icône seule sur mobile, avec label sur desktop */}
          <div className="relative" ref={dropdownRef}>
            <span className="hidden md:block text-xs font-medium mb-1" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish ? 'Establishments' : 'Établissements'}
            </span>
            <button
              onClick={() => setIsEstablishmentDropdownOpen(!isEstablishmentDropdownOpen)}
              className="flex items-center gap-2 px-2 md:px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md h-10"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--outline)',
                color: 'var(--on-surface)'
              }}
            >
              {/* Icône seule sur mobile */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {/* Texte sur desktop */}
              <span className="hidden md:inline text-sm font-medium">
                {selectedEstablishments.length === establishments.length
                  ? (isEnglish ? 'All Establishments' : 'Tous les établissements')
                  : `${selectedEstablishments.length} ${isEnglish ? 'selected' : 'sélectionné(s)'}` 
                }
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 hidden md:block ${
                  isEstablishmentDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

              {/* Dropdown avec checkboxes */}
              {isEstablishmentDropdownOpen && (
                <div 
                  className="absolute top-full right-0 mt-1 w-64 rounded-lg shadow-lg z-50 py-2"
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

        {/* Périodes courante et comparative - Affichées sous le segmented button sur mobile uniquement */}
        <div 
          className="flex md:hidden items-start gap-0 text-sm h-10 rounded-lg mt-4"
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
              <div className="flex items-start justify-between h-full">
                {/* Contenu principal à gauche */}
                <div className="flex-1">
                  {/* Header avec titre et icône info */}
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4" style={{ color: 'var(--on-surface-variant)' }} />
                    <h4 className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
                      {title}
                    </h4>
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

                  {/* Valeur précédente */}
                  <div>
                    <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                      {formatPreviousValue(metric)}
                    </p>
                  </div>
                </div>

                {/* Variation groupée à droite, centrée verticalement */}
                {metric.delta_pct !== null && (
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <TrendIcon 
                      className="w-5 h-5" 
                      style={{ color: trendColor }}
                    />
                    <p 
                      className="text-xs font-semibold"
                      style={{ color: trendColor }}
                    >
                      {formatDeltaPct(metric.delta_pct)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bouton Cortex flottant DANS le widget */}
      <AnimatePresence>
        {!isCortexModalOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCortexModalOpen(true)}
            className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer z-10"
            style={{
              backgroundColor: 'var(--secondary-container)',
              border: '2px solid white'
            }}
          >
            <Image
              src="/cortex.svg"
              alt="Cortex"
              width={32}
              height={32}
              className="w-8 h-8"
              style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>
      </>
      )}
    </div>

    {/* Note de démonstration sous le widget */}
    <div className="mt-8 text-center px-4 max-w-4xl mx-auto">
      <p className="text-xs" style={{ color: 'var(--on-surface-variant)', opacity: 0.8, lineHeight: '1.7' }}>
        {isEnglish 
          ? 'The data presented in this dashboard is fictional and used for demonstration purposes only. The full Octogone platform offers advanced analytics, real-time insights, and complete integration with your operations.' 
          : 'Les données présentées dans ce tableau de bord sont fictives et utilisées uniquement à des fins de démonstration. La version complète de la plateforme Octogone offre des analyses avancées, des insights en temps réel et une intégration complète avec vos opérations.'}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--on-surface-variant)', opacity: 0.8, lineHeight: '1.7' }}>
        {isEnglish 
          ? 'To learn more, contact our team.' 
          : 'Pour en savoir plus, contactez notre équipe.'}
      </p>
    </div>

    {/* Modal Cortex */}
    {isCortexModalOpen && (
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onClick={() => setIsCortexModalOpen(false)}
      >
        <div
          className="relative w-full max-w-2xl rounded-2xl shadow-2xl p-8 md:p-12"
          style={{ backgroundColor: 'var(--background)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsCortexModalOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--on-surface)'
            }}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}
              >
                <Image
                  src="/cortex.svg"
                  alt="Cortex"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
                />
              </div>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Add Cortex to Your Dashboard' : 'Ajoutez Cortex à votre tableau de bord'}
            </h2>

            <p
              className="text-lg md:text-xl mb-6 leading-relaxed"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish
                ? 'Cortex is our AI assistant designed to integrate directly with your Octogone dashboard. Reserve early access to activate it as soon as it becomes available.'
                : 'Cortex est notre assistant IA conçu pour s\'intégrer directement à votre tableau de bord Octogone. Réservez l\'accès anticipé pour l\'activer dès qu\'il sera disponible.'}
            </p>

            <div
              className="p-6 mb-6 rounded-lg"
              style={{
                backgroundColor: 'var(--secondary-container)',
                border: 'none'
              }}
            >
              <p
                className="text-xl md:text-2xl font-bold mb-3"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish ? 'Secure Your Early Access' : 'Sécurisez votre accès anticipé'}
              </p>
              <p
                className="text-base md:text-lg"
                style={{ color: 'var(--on-secondary-container)' }}
              >
                {isEnglish
                  ? 'Subscribe now and get Cortex included at your current rate when it launches.'
                  : 'Abonnez-vous maintenant et bénéficiez de Cortex inclus à votre tarif actuel lors du lancement.'}
              </p>
            </div>

            <p
              className="text-sm mb-6"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish
                ? 'Early access is limited. Contact our team to reserve your spot.'
                : 'Les accès anticipés sont limités. Contactez notre équipe pour réserver votre place.'}
            </p>

            {/* Bouton CTA */}
            <OctogoneButton
              href={`/${locale}/contact`}
              variant="cortex"
              size="lg"
              icon={
                <Image 
                  src="/cortex.svg" 
                  alt="Cortex" 
                  width={20} 
                  height={20}
                  className="inline-block"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(3207%) hue-rotate(167deg) brightness(96%) contrast(101%)'
                  }}
                />
              }
            >
              {isEnglish
                ? 'Reserve Your Access to Cortex'
                : 'Réserver votre accès à Cortex'}
            </OctogoneButton>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
