"use client";

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Package } from 'lucide-react';

interface DashboardProps {
  locale?: 'fr' | 'en';
}

export default function OctogoneDashboard({ locale = 'fr' }: DashboardProps) {
  const isEnglish = locale === 'en';

  // KPIs data
  const kpis = [
    {
      titleFr: 'Ventes du jour',
      titleEn: 'Daily Sales',
      value: '12 847 $',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: '#4CAF50'
    },
    {
      titleFr: 'Coût alimentaire',
      titleEn: 'Food Cost',
      value: '28.3%',
      change: '-2.1%',
      isPositive: true,
      icon: Package,
      color: '#2196F3'
    },
    {
      titleFr: 'Clients servis',
      titleEn: 'Customers Served',
      value: '342',
      change: '+8.2%',
      isPositive: true,
      icon: Users,
      color: '#FF9800'
    },
    {
      titleFr: 'Ticket moyen',
      titleEn: 'Average Ticket',
      value: '37.56 $',
      change: '+3.8%',
      isPositive: true,
      icon: ShoppingCart,
      color: '#9C27B0'
    }
  ];

  // Sales data for mini chart
  const salesData = [65, 72, 68, 85, 78, 92, 88];

  return (
    <div 
      className="w-full rounded-2xl p-6 md:p-8 shadow-xl"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline-variant)'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--on-surface)' }}>
          {isEnglish ? 'Performance Dashboard' : 'Tableau de bord de performance'}
        </h3>
        <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
          {isEnglish ? 'Real-time overview of your key metrics' : 'Vue d\'ensemble en temps réel de vos métriques clés'}
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="rounded-xl p-4 transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: 'var(--surface-variant)',
                border: '1px solid var(--outline-variant)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: kpi.color + '20' }}
                >
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <div className="flex items-center gap-1">
                  {kpi.isPositive ? (
                    <TrendingUp className="w-4 h-4" style={{ color: '#4CAF50' }} />
                  ) : (
                    <TrendingDown className="w-4 h-4" style={{ color: '#F44336' }} />
                  )}
                  <span 
                    className="text-xs font-semibold"
                    style={{ color: kpi.isPositive ? '#4CAF50' : '#F44336' }}
                  >
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--on-surface-variant)' }}>
                  {isEnglish ? kpi.titleEn : kpi.titleFr}
                </p>
                <p className="text-2xl font-bold" style={{ color: 'var(--on-surface)' }}>
                  {kpi.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Chart */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--surface-variant)',
            border: '1px solid var(--outline-variant)'
          }}
        >
          <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
            {isEnglish ? 'Sales Trend (7 days)' : 'Tendance des ventes (7 jours)'}
          </h4>
          <div className="flex items-end justify-between h-32 gap-2">
            {salesData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ 
                    height: `${value}%`,
                    backgroundColor: index === salesData.length - 1 ? '#DCB26B' : 'var(--primary)',
                    opacity: index === salesData.length - 1 ? 1 : 0.7
                  }}
                />
                <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                  {isEnglish ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] : ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: 'var(--surface-variant)',
            border: '1px solid var(--outline-variant)'
          }}
        >
          <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
            {isEnglish ? 'Top Products' : 'Produits populaires'}
          </h4>
          <div className="space-y-3">
            {[
              { name: isEnglish ? 'Burger Deluxe' : 'Burger Deluxe', sales: 87, color: '#4CAF50' },
              { name: isEnglish ? 'Caesar Salad' : 'Salade César', sales: 72, color: '#2196F3' },
              { name: isEnglish ? 'Pasta Carbonara' : 'Pâtes Carbonara', sales: 65, color: '#FF9800' },
              { name: isEnglish ? 'Fish & Chips' : 'Fish & Chips', sales: 58, color: '#9C27B0' }
            ].map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: 'var(--on-surface)' }}>
                      {product.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--on-surface-variant)' }}>
                      {product.sales}
                    </span>
                  </div>
                  <div 
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--outline-variant)' }}
                  >
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${product.sales}%`,
                        backgroundColor: product.color
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--outline-variant)' }}>
        <p className="text-xs text-center" style={{ color: 'var(--on-surface-variant)' }}>
          {isEnglish 
            ? '* Data updated in real-time from your Octogone platform' 
            : '* Données mises à jour en temps réel depuis votre plateforme Octogone'}
        </p>
      </div>
    </div>
  );
}
