'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';
import { OctogoneToggle } from '@/components/ui/octogone-toggle';
import { DollarSign, Package, Star, Thermometer, MessageCircleMore, Check, ArrowRight } from 'lucide-react';
import { PricingCard } from './pricing-card';
import modulesData from '@/data/calculator/modules.json';
import pricingConfig from '@/data/pricing/config.json';

interface PricingSectionProps {
  locale: 'fr' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale }) => {
  const isEnglish = locale === 'en';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const annualDiscount = pricingConfig.annualDiscount;

  // Fonction helper pour calculer le prix
  const calculatePrice = (basePrice: number) => {
    const price = billingCycle === 'annual' 
      ? Math.round(basePrice * (1 - annualDiscount))
      : basePrice;
    const priceDetail = billingCycle === 'annual'
      ? (isEnglish ? 'per month, billed annually' : 'par mois, facturé annuellement')
      : (isEnglish ? 'per month' : 'par mois');
    const originalPrice = billingCycle === 'annual' ? basePrice : null;
    return { price, priceDetail, originalPrice };
  };

  // 3 FORFAITS PRINCIPAUX
  const mainPlans = [
    // Essentiel (Inventory + Foodcost combinés)
    {
      id: 'essentiel',
      name: isEnglish ? 'Essential' : 'Essentiel',
      icon: Package,
      ...calculatePrice(69 + 79), // 148$
      description: isEnglish ? 'Foundation to get started — Inventory + Food Cost' : 'Base pour démarrer — Inventaire + Food Cost',
      features: [
        ...(isEnglish ? modulesData.find(m => m.id === 'inventory')?.featuresEn.slice(0, 5) || [] : modulesData.find(m => m.id === 'inventory')?.featuresFr.slice(0, 5) || []),
        ...(isEnglish ? modulesData.find(m => m.id === 'foodcost')?.featuresEn.slice(0, 3) || [] : modulesData.find(m => m.id === 'foodcost')?.featuresFr.slice(0, 3) || [])
      ],
      badge: null,
      badgeColor: null,
      customColors: null,
      specialEffects: { ring: 'ring-4 ring-[var(--outline)]' }
    },
    // Pro
    {
      id: 'pro',
      name: 'Pro',
      icon: Star,
      ...calculatePrice(159),
      description: (isEnglish ? modulesData.find(m => m.id === 'pro')?.descriptionEn : modulesData.find(m => m.id === 'pro')?.descriptionFr) || '',
      features: isEnglish ? modulesData.find(m => m.id === 'pro')?.featuresEn || [] : modulesData.find(m => m.id === 'pro')?.featuresFr || [],
      badge: isEnglish ? "The professionals' choice" : "L'option des professionnels",
      badgeColor: 'primary',
      customColors: {
        background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
        iconBg: 'rgba(0,0,0,0.05)'
      },
      specialEffects: { ring: 'ring-4 ring-blue-600/30' }
    },
    // Pro + IA
    {
      id: 'pro_ai',
      name: 'Pro + IA',
      icon: MessageCircleMore,
      ...calculatePrice(199),
      description: (isEnglish ? modulesData.find(m => m.id === 'pro_ai')?.descriptionEn : modulesData.find(m => m.id === 'pro_ai')?.descriptionFr) || '',
      features: isEnglish ? modulesData.find(m => m.id === 'pro_ai')?.featuresEn || [] : modulesData.find(m => m.id === 'pro_ai')?.featuresFr || [],
      badge: isEnglish ? 'Reserve your price and access' : 'Réservez votre prix et votre accès',
      badgeColor: 'cortex',
      customColors: {
        background: 'linear-gradient(180deg, #BADFF6 0%, #E2CDED 100%)',
        iconBg: 'rgba(0,0,0,0.05)'
      },
      specialEffects: { ring: 'ring-4 ring-[#E2CDED]' }
    }
  ];

  // MODULES ADDITIONNELS
  const addonModules = [
    {
      id: 'thermometer',
      name: isEnglish ? modulesData.find(m => m.id === 'thermometer')?.nameEn : modulesData.find(m => m.id === 'thermometer')?.nameFr,
      icon: Thermometer,
      ...calculatePrice(59),
      priceUnit: isEnglish ? 'per unit' : 'par unité',
      description: isEnglish ? modulesData.find(m => m.id === 'thermometer')?.descriptionEn : modulesData.find(m => m.id === 'thermometer')?.descriptionFr,
      features: isEnglish ? modulesData.find(m => m.id === 'thermometer')?.featuresEn || [] : modulesData.find(m => m.id === 'thermometer')?.featuresFr || [],
      badge: isEnglish ? 'Security without compromise' : 'La sécurité sans compromis',
      badgeColor: 'success'
    },
    {
      id: 'tips',
      name: isEnglish ? modulesData.find(m => m.id === 'tips')?.nameEn : modulesData.find(m => m.id === 'tips')?.nameFr,
      icon: DollarSign,
      ...calculatePrice(89),
      priceUnit: isEnglish ? 'per location' : 'par établissement',
      description: isEnglish ? modulesData.find(m => m.id === 'tips')?.descriptionEn : modulesData.find(m => m.id === 'tips')?.descriptionFr,
      features: isEnglish ? modulesData.find(m => m.id === 'tips')?.featuresEn || [] : modulesData.find(m => m.id === 'tips')?.featuresFr || [],
      badge: null,
      badgeColor: null
    }
  ];

  // MATRICE DE COMPARAISON
  const comparisonMatrix = [
    { feature: isEnglish ? 'Centralized product catalog' : 'Catalogue centralisé de produits', essentiel: true, pro: true, ia: true },
    { feature: isEnglish ? 'Real-time Food Cost' : 'Food cost en temps réel', essentiel: true, pro: true, ia: true },
    { feature: isEnglish ? 'POS & supplier integrations' : 'Intégrations POS & fournisseurs', essentiel: false, pro: true, ia: true },
    { feature: isEnglish ? 'Automations & advanced reports' : 'Automatisations & rapports avancés', essentiel: false, pro: true, ia: true },
    { feature: isEnglish ? 'Tips management' : 'Gestion des pourboires', essentiel: false, pro: true, ia: true },
    { feature: isEnglish ? 'AI predictions & recommendations (Cortex)' : 'Prévisions & recommandations IA (Cortex)', essentiel: false, pro: false, ia: true },
    { feature: isEnglish ? 'Priority support / SLA' : 'Support prioritaire / SLA', essentiel: false, pro: true, ia: true }
  ];

  return (
    <>
      {/* Hero Section */}
      <ResponsiveSection spacing="none" bgColor="" className="py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--on-surface)' }}
          >
            {isEnglish ? pricingConfig.hero.title.en : pricingConfig.hero.title.fr}
          </h1>
          
          <p 
            className="text-xl mb-8"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish ? pricingConfig.hero.description.en : pricingConfig.hero.description.fr}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <OctogoneToggle
              options={[
                { value: 'monthly', label: isEnglish ? pricingConfig.billing.monthly.en : pricingConfig.billing.monthly.fr },
                { 
                  value: 'annual', 
                  label: isEnglish ? pricingConfig.billing.annual.en : pricingConfig.billing.annual.fr,
                  badge: {
                    text: '-10%',
                    backgroundColor: 'var(--success)',
                    color: 'var(--on-primary-container)'
                  }
                }
              ]}
              value={billingCycle}
              onChange={(value) => setBillingCycle(value as 'monthly' | 'annual')}
              size="lg"
            />
          </div>
        </div>

        {/* 3 FORFAITS PRINCIPAUX */}
        <div className="py-8 px-4" style={{ paddingTop: '3rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mainPlans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} locale={locale} />
            ))}
          </div>
        </div>

        {/* MODULES ADDITIONNELS */}
        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Additional Modules (Optional)' : 'Modules additionnels (optionnels)'}
            </h2>
            <p 
              className="text-sm mb-6"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish 
                ? 'Activate the modules you need. They automatically integrate with your Octogone base.'
                : 'Activez les modules dont vous avez besoin. Ils se branchent automatiquement à votre base Octogone.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addonModules.map((addon) => (
                <div
                  key={addon.id}
                  className="rounded-2xl p-6 relative flex flex-col gap-4"
                  style={{
                    border: '1px solid var(--outline)',
                    background: 'var(--surface)'
                  }}
                >
                  {addon.badge && (
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap"
                      style={{ 
                        top: '-22px',
                        backgroundColor: addon.badgeColor === 'success' ? '#B8E0D2' : '#BADFF6',
                        color: '#1F1F1F',
                        border: '4px solid var(--background)'
                      }}
                    >
                      {addon.badge}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--secondary-container)' }}
                      >
                        {typeof addon.icon === 'string' ? (
                          <img src={addon.icon} alt="Icon" width="24" height="24" />
                        ) : (
                          <addon.icon className="w-6 h-6" style={{ color: 'var(--on-secondary-container)' }} />
                        )}
                      </div>
                      <h3 
                        className="text-xl font-bold"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {addon.name}
                      </h3>
                    </div>
                  </div>

                  <p 
                    className="text-sm"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    {addon.description}
                  </p>

                  <div>
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {addon.price}$
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: 'var(--on-surface-variant)' }}
                    >
                      {addon.priceDetail} · {addon.priceUnit}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {addon.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check 
                          className="w-5 h-5 flex-shrink-0 mt-0.5" 
                          style={{ color: 'var(--success)' }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: 'var(--on-surface)' }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLEAU DE COMPARAISON */}
        <div className="py-12 px-4" id="compare">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Feature Comparison' : 'Comparaison des fonctionnalités'}
            </h2>
            <div 
              className="overflow-auto rounded-2xl"
              style={{
                border: '1px solid var(--outline)',
                background: 'var(--surface)'
              }}
            >
              <table className="min-w-full text-sm">
                <thead style={{ backgroundColor: 'var(--surface-variant)' }}>
                  <tr>
                    <th 
                      className="text-left p-4 font-semibold"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? 'Feature' : 'Fonctionnalité'}
                    </th>
                    <th 
                      className="text-center p-4 font-semibold"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? 'Essential' : 'Essentiel'}
                    </th>
                    <th 
                      className="text-center p-4 font-semibold"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      Pro
                    </th>
                    <th 
                      className="text-center p-4 font-semibold"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      Pro + IA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.map((row, i) => (
                    <tr 
                      key={i}
                      style={{
                        backgroundColor: i % 2 ? 'var(--surface-variant)' : 'transparent'
                      }}
                    >
                      <td 
                        className="p-4"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {row.feature}
                      </td>
                      <td 
                        className="p-4 text-center"
                        style={{ color: row.essentiel ? 'var(--success)' : 'var(--on-surface-variant)' }}
                      >
                        {row.essentiel ? '✓' : '—'}
                      </td>
                      <td 
                        className="p-4 text-center"
                        style={{ color: row.pro ? 'var(--success)' : 'var(--on-surface-variant)' }}
                      >
                        {row.pro ? '✓' : '—'}
                      </td>
                      <td 
                        className="p-4 text-center"
                        style={{ color: row.ia ? 'var(--success)' : 'var(--on-surface-variant)' }}
                      >
                        {row.ia ? '✓' : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <OctogoneGradientButton
                href="#contact"
                icon={ArrowRight}
                text={isEnglish ? 'Request a demo' : 'Demander une démo'}
                showBorder={true}
              />
              <OctogoneGradientButton
                href="#contact"
                icon={ArrowRight}
                text={isEnglish ? 'Talk to an expert' : 'Parler à un expert'}
                showBorder={true}
                gradient="linear-gradient(135deg, var(--surface) 0%, var(--surface) 100%)"
              />
            </div>
          </div>
        </div>
      </ResponsiveSection>

      {/* FAQ or Additional Info Section */}
      <ResponsiveSection spacing="lg" bgColor="var(--surface-variant)">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--on-surface)' }}>
            {isEnglish ? pricingConfig.cta.customSolution.title.en : pricingConfig.cta.customSolution.title.fr}
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish ? pricingConfig.cta.customSolution.description.en : pricingConfig.cta.customSolution.description.fr}
          </p>
          <OctogoneGradientButton
            href={`/${locale}/contact`}
            icon={MessageCircleMore}
            text={isEnglish ? pricingConfig.cta.customSolution.button.en : pricingConfig.cta.customSolution.button.fr}
          />
        </div>
      </ResponsiveSection>
    </>
  );
};
