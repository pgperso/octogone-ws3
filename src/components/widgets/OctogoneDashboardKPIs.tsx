"use client";

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface DashboardKPIsProps {
  locale?: 'fr' | 'en';
}

interface KPIData {
  titleFr: string;
  titleEn: string;
  value: string;
  previousValue: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  isPositive: boolean;
}

export default function OctogoneDashboardKPIs({ locale = 'fr' }: DashboardKPIsProps) {
  const isEnglish = locale === 'en';
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', labelFr: 'Aujourd\'hui', labelEn: 'Today' },
    { id: 'yesterday', labelFr: 'Hier', labelEn: 'Yesterday' },
    { id: 'week', labelFr: 'Semaine', labelEn: 'Week' },
    { id: 'month', labelFr: 'Mois', labelEn: 'Month' },
    { id: 'quarter', labelFr: 'Trimestre', labelEn: 'Quarter' },
    { id: 'year', labelFr: 'Année', labelEn: 'Year' }
  ];

  const kpis: KPIData[] = [
    {
      titleFr: 'Ventes',
      titleEn: 'Sales',
      value: '94,570.00 $',
      previousValue: '104,285.00 $',
      change: '-10.27%',
      trend: 'down',
      isPositive: false
    },
    {
      titleFr: 'Achalandage',
      titleEn: 'Customer Traffic',
      value: '1980 clients',
      previousValue: '2180 clients',
      change: '-10.10%',
      trend: 'down',
      isPositive: false
    },
    {
      titleFr: 'Bénéfices',
      titleEn: 'Profits',
      value: '80,525.74 $',
      previousValue: '94,652.25 $',
      change: '-17.54%',
      trend: 'down',
      isPositive: false
    },
    {
      titleFr: 'Achats',
      titleEn: 'Purchases',
      value: '6,575.42 $',
      previousValue: '2,032.83 $',
      change: '69.08%',
      trend: 'up',
      isPositive: false
    },
    {
      titleFr: 'Gains et pertes',
      titleEn: 'Profit & Loss',
      value: '-42.26 $',
      previousValue: '-178.67 $',
      change: '-322.78%',
      trend: 'up',
      isPositive: true
    },
    {
      titleFr: 'Surveillance des prix',
      titleEn: 'Price Monitoring',
      value: '2 changements',
      previousValue: '1 changement',
      change: '',
      trend: 'neutral',
      isPositive: true
    },
    {
      titleFr: 'Coûts main d\'oeuvre',
      titleEn: 'Labor Costs',
      value: '5,963.42 $',
      previousValue: '5,958.08 $',
      change: '0.09%',
      trend: 'up',
      isPositive: false
    },
    {
      titleFr: 'Food cost',
      titleEn: 'Food Cost',
      value: '25.93 %',
      previousValue: '25.94 %',
      change: '-0.05%',
      trend: 'down',
      isPositive: true
    },
    {
      titleFr: 'Ingénierie de menu',
      titleEn: 'Menu Engineering',
      value: '8 items',
      previousValue: '8 items',
      change: '',
      trend: 'neutral',
      isPositive: true
    },
    {
      titleFr: 'Coûts fixes',
      titleEn: 'Fixed Costs',
      value: '1,463.16 $',
      previousValue: '1,463.16 $',
      change: '',
      trend: 'neutral',
      isPositive: true
    },
    {
      titleFr: 'Facture moyenne client',
      titleEn: 'Average Customer Bill',
      value: '47.95 $',
      previousValue: '48.05 $',
      change: '-0.22%',
      trend: 'down',
      isPositive: false
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      case 'neutral':
        return Minus;
    }
  };

  const getTrendColor = (isPositive: boolean, trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'neutral') return 'var(--on-surface-variant)';
    return isPositive ? '#4CAF50' : '#F44336';
  };

  return (
    <div className="w-full">
      {/* Sélecteur de périodes */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>
          {isEnglish ? 'Performance Dashboard' : 'Tableau de bord de performance'}
        </h2>
        
        <div className="flex items-center gap-2">
          {/* Segmented Button */}
          <div 
            className="flex rounded-lg p-1 shadow-sm"
            style={{ 
              backgroundColor: 'var(--surface-variant)',
              border: '1px solid var(--outline-variant)'
            }}
          >
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === period.id 
                    ? 'shadow-sm' 
                    : 'hover:bg-opacity-50'
                }`}
                style={{
                  backgroundColor: selectedPeriod === period.id 
                    ? 'var(--surface)' 
                    : 'transparent',
                  color: selectedPeriod === period.id 
                    ? 'var(--on-surface)' 
                    : 'var(--on-surface-variant)',
                  boxShadow: selectedPeriod === period.id 
                    ? '0 1px 3px rgba(0, 0, 0, 0.1)' 
                    : 'none'
                }}
              >
                {isEnglish ? period.labelEn : period.labelFr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, index) => {
          const TrendIcon = getTrendIcon(kpi.trend);
          const trendColor = getTrendColor(kpi.isPositive, kpi.trend);

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
                    {isEnglish ? kpi.titleEn : kpi.titleFr}
                  </h4>
                </div>
                {kpi.change && (
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
                    color: kpi.value.startsWith('-') ? '#F44336' : 'var(--on-surface)'
                  }}
                >
                  {kpi.value}
                </p>
              </div>

              {/* Comparaison et changement */}
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                  {kpi.previousValue}
                </p>
                {kpi.change && (
                  <p 
                    className="text-xs font-semibold"
                    style={{ color: trendColor }}
                  >
                    {kpi.change}
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
