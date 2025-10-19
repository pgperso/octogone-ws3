"use client";

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
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
  metrics: Metric[];
}

export default function OctogoneDashboardKPIs({ locale = 'fr' }: DashboardKPIsProps) {
  const isEnglish = locale === 'en';
  const [selectedPeriod, setSelectedPeriod] = useState('day');
  const [selectedEstablishment, setSelectedEstablishment] = useState('all');

  // Liste des établissements
  const establishments = [
    { id: 'all', nameFr: 'Tous les établissements', nameEn: 'All Establishments' },
    { id: 'resto-centre', nameFr: 'Restaurant Centre-Ville', nameEn: 'Downtown Restaurant' },
    { id: 'bistro-nord', nameFr: 'Bistro du Nord', nameEn: 'North Bistro' },
    { id: 'cafe-sud', nameFr: 'Café du Sud', nameEn: 'South Café' },
    { id: 'brasserie-est', nameFr: 'Brasserie de l\'Est', nameEn: 'East Brewery' },
    { id: 'pizzeria-ouest', nameFr: 'Pizzeria de l\'Ouest', nameEn: 'West Pizzeria' }
  ];

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

  return (
    <div className="w-full">
      {/* Header avec avatar et sélecteurs */}
      <div className="mb-6">
        {/* Ligne du haut : Avatar + Nom et Sélecteur d'établissements */}
        <div className="flex items-center justify-between mb-4">
          {/* Avatar et salutation */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: '#4CAF50' }}
            >
              M
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>
                {isEnglish ? 'Hello Marc' : 'Bonjour Marc'}
              </h2>
            </div>
          </div>

          {/* Sélecteur d'établissements */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish ? 'Establishment:' : 'Établissement :'}
            </span>
            <select 
              value={selectedEstablishment}
              onChange={(e) => setSelectedEstablishment(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm font-medium border-0 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              style={{ 
                backgroundColor: 'var(--surface)',
                color: 'var(--on-surface)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {establishments.map((establishment) => (
                <option key={establishment.id} value={establishment.id}>
                  {isEnglish ? establishment.nameEn : establishment.nameFr}
                </option>
              ))}
            </select>
          </div>
        </div>
        
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
