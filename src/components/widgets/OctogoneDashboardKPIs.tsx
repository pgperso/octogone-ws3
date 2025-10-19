"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import Image from 'next/image';
import dashboardData from '@/data/dashboard/dashboard-data.json';

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

interface PeriodData {
  label: string;
  date?: string;
  start?: string;
  end?: string;
  compare_start?: string;
  compare_end?: string;
  metrics: Metric[];
}

export default function OctogoneDashboardKPIs({ locale = 'fr' }: DashboardKPIsProps) {
  const isEnglish = locale === 'en';
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [selectedEstablishments, setSelectedEstablishments] = useState<string[]>(['resto-centre', 'bistro-nord', 'cafe-sud', 'pizzeria-ouest']);
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
    { id: 'resto-centre', nameFr: 'Restaurant Centre-Ville', nameEn: 'Downtown Restaurant' },
    { id: 'bistro-nord', nameFr: 'Bistro du Nord', nameEn: 'North Bistro' },
    { id: 'cafe-sud', nameFr: 'Café du Sud', nameEn: 'South Café' },
    { id: 'pizzeria-ouest', nameFr: 'Pizzeria de l\'Ouest', nameEn: 'West Pizzeria' }
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
    const data = currentPeriodData;
    
    if (selectedPeriod === 'day') {
      const currentDate = formatDate(data.date!);
      // Pour le jour, la période comparative est la veille (calculée)
      const yesterday = new Date(data.date!);
      yesterday.setDate(yesterday.getDate() - 1);
      const previousDate = formatDate(yesterday.toISOString().split('T')[0]);
      return {
        current: currentDate,
        previous: previousDate
      };
    } else if (selectedPeriod === 'week') {
      const startDate = formatDate(data.start!);
      const endDate = formatDate(data.end!);
      // Pour la semaine, calculer la semaine précédente
      const prevWeekStart = new Date(data.start!);
      prevWeekStart.setDate(prevWeekStart.getDate() - 7);
      const prevWeekEnd = new Date(data.end!);
      prevWeekEnd.setDate(prevWeekEnd.getDate() - 7);
      return {
        current: `${startDate} - ${endDate}`,
        previous: `${formatDate(prevWeekStart.toISOString().split('T')[0])} - ${formatDate(prevWeekEnd.toISOString().split('T')[0])}`
      };
    } else if (selectedPeriod === 'month') {
      const startDate = formatDate(data.start!);
      const endDate = formatDate(data.end!);
      // Pour le mois, calculer le mois précédent
      const prevMonthStart = new Date(data.start!);
      prevMonthStart.setMonth(prevMonthStart.getMonth() - 1);
      const prevMonthEnd = new Date(data.end!);
      prevMonthEnd.setMonth(prevMonthEnd.getMonth() - 1);
      return {
        current: `${startDate} - ${endDate}`,
        previous: `${formatDate(prevMonthStart.toISOString().split('T')[0])} - ${formatDate(prevMonthEnd.toISOString().split('T')[0])}`
      };
    } else if (selectedPeriod === 'custom') {
      const startDate = formatDate(data.start!);
      const endDate = formatDate(data.end!);
      const compareStart = formatDate(data.compare_start!);
      const compareEnd = formatDate(data.compare_end!);
      return {
        current: `${startDate} - ${endDate}`,
        previous: `${compareStart} - ${compareEnd}`
      };
    }
    
    return { current: '', previous: '' };
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
              className="w-12 h-12 rounded-full overflow-hidden"
              style={{ 
                border: '2px solid var(--primary)',
                padding: '2px'
              }}
            >
              <Image
                src="/images/avatars/marc.avif"
                alt="Marc"
                width={44}
                height={44}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Hello Marc' : 'Bonjour Marc'}
              </h2>
              <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Restaurant Director' : 'Directeur de la restauration'}
              </p>
            </div>
          </div>

          {/* Sélecteur d'établissements */}
          <div className="relative flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish ? 'Establishments:' : 'Établissements :'}
            </span>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsEstablishmentDropdownOpen(!isEstablishmentDropdownOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium border-0 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer flex items-center gap-2 min-w-48"
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
        <div className="flex items-center gap-6">
          {/* Segmented Button pour les périodes */}
          <div 
            className="inline-flex rounded-lg"
            style={{ 
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--outline)'
            }}
          >
            {periods.map((period, index) => (
              <div key={period.id} className="flex">
                <button
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
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
                {/* Ligne séparatrice verticale */}
                {index < periods.length - 1 && (
                  <div 
                    className="w-px h-8 self-center"
                    style={{ backgroundColor: 'var(--outline)' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Affichage des périodes courante et comparative */}
          <div className="flex items-start gap-8 text-sm">
            <div className="flex flex-col">
              <span className="text-xs font-medium mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Period' : 'Période'}
              </span>
              <span className="font-medium" style={{ color: 'var(--on-surface)' }}>
                {periodText.current}
              </span>
            </div>
            <div className="flex flex-col">
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
        {currentPeriodData.metrics.map((metric: Metric, index: number) => {
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
