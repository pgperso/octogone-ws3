'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';
import { OctogoneToggle } from '@/components/ui/octogone-toggle';
import { DollarSign, Package, Star, Thermometer, MessageCircleMore, Check } from 'lucide-react';
import { OctogonePricingCard } from '@/components/ui/octogone-pricing-card';
import { OctogoneAddonCard } from '@/components/ui/octogone-addon-card';
import modulesData from '@/data/calculator/modules.json';
import pricingConfig from '@/data/pricing/config.json';
import comparisonData from '@/data/pricing/comparison-matrix.json';

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
      ? Math.round(basePrice * 12 * (1 - annualDiscount))
      : basePrice;
    const priceDetail = billingCycle === 'annual'
      ? (isEnglish ? 'per location / annual payment' : 'par établissement / paiement annuel')
      : (isEnglish ? 'per location / month' : 'par établissement / mois');
    const originalPrice = billingCycle === 'annual' ? basePrice * 12 : null;
    return { price, priceDetail, originalPrice };
  };

  // 3 FORFAITS PRINCIPAUX
  const mainPlans = [
    // Essentiel (Inventory + Foodcost combinés)
    {
      id: 'essentiel',
      name: isEnglish ? 'Essential' : 'Essentiel',
      icon: Package,
      price: 148,
      originalPrice: null,
      priceDetail: '',
      description: isEnglish ? 'The essentials for restaurateurs' : 'L\'essentiel des restaurateurs',
      features: [],
      sections: [
        {
          name: isEnglish ? 'Inventory' : 'Inventaire',
          price: 69,
          priceDetail: isEnglish ? 'per location / month' : 'par établissement / mois',
          features: isEnglish ? [
            'Everything you need to manage your product catalog, supplier list and inventory.'
          ] : [
            'Tout ce dont vous avez besoin pour gérer votre catalogue de produits, votre liste de fournisseurs et votre prise d\'inventaire.'
          ]
        },
        {
          name: isEnglish ? 'Add Recipe & Foodcost' : 'Ajoute Recette & Foodcost',
          price: 79,
          priceDetail: isEnglish ? 'per location / month' : 'par établissement / mois',
          features: isEnglish ? [
            'Everything you need to digitize your recipes, standardize your procedures and control your costs.'
          ] : [
            'Tout ce dont vous avez besoin pour numériser vos recettes, standardiser vos procédures et contrôler vos coûts.'
          ]
        }
      ],
      commonFeatures: isEnglish ? [
        'Access to the essential dashboard.',
        'Everything you need to simplify invoice management.',
        'Everything you need to manage your employees\' profiles and roles.'
      ] : [
        'Accès au tableau de bord essentiel.',
        'Tout ce dont vous avez besoin pour simplifier la gestion des factures.',
        'Tout ce dont vous avez besoin pour gérer le profil et le rôle de vos employés.'
      ],
      badge: isEnglish ? 'To get started' : 'Pour bien débuter',
      badgeColor: 'gold',
      customColors: null,
      specialEffects: { ring: 'ring-4 ring-[var(--outline)]' }
    },
    // Pro
    {
      id: 'pro',
      name: 'Pro',
      icon: Star,
      ...calculatePrice(159),
      description: isEnglish ? 'The complete solution for restaurant professionals' : 'La solution complète des professionnels de la restauration',
      features: isEnglish ? [
        'Connect your POS to Octogone and enjoy all the power and flexibility of the platform.',
        'Access to the pro dashboard, the essential tool to analyze your KPIs, results and compare the performance of all your locations.',
        'Combine inventory counting with the Real-time Inventory tool; the ultimate solution to understand what\'s happening now.',
        'Transfer recipes and products between your different locations.',
        'Take advantage of the order basket and production basket and boost your productivity.',
        'Say goodbye to broken Excel formulas and manage your tip agreements with the Tips tool.',
        'Everything included in the Essential plan'
      ] : [
        'Connectez votre POS à Octogone et profitez de toute la puissance et la souplesse de la plateforme.',
        'Accès au tableau de bord pro, l\'outil indispensable pour analyser vos KPI, vos résultats et comparer les performances de tous vos établissements.',
        'Combinez la prise d\'inventaire à l\'outil Inventaire en temps réel; l\'ultime solution pour comprendre ce qui se passe maintenant.',
        'Transférez recettes et produits entre vos différents établissements.',
        'Profitez du panier de commande et du panier de production et boostez votre productivité.',
        'Dites adieu aux formules Excel brisées et gérez vos conventions de pourboire grâce à l\'outil Pourboire.',
        'Tout ce qu\'inclut le forfait Essentiel'
      ],
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
      priceDetail: billingCycle === 'annual'
        ? (isEnglish ? 'per location (1 user) / annual payment' : 'par établissement (1 utilisateur) / paiement annuel')
        : (isEnglish ? 'per location (1 user) / month' : 'par établissement (1 utilisateur) / mois'),
      description: isEnglish ? 'Boost your performance with Cortex, Octogone\'s AI agent' : 'Propulsez vos performances avec Cortex, l\'agent IA d\'Octogone',
      features: isEnglish ? [
        'Add Cortex, Octogone\'s new AI agent that will soon transform your data into decisions.',
        'Chat naturally, ask questions, Cortex is directly connected to your account and knows you.',
        'Generate charts, execute actions, generate reports and get recommendations powered by artificial intelligence.',
        'Everything included in the Pro plan.'
      ] : [
        'Ajoutez Cortex, le nouvel agent IA d\'Octogone qui transformera bientôt vos données en décisions.',
        'Discutez naturellement, posez des questions, Cortex est branché directement dans votre compte et il vous connait.',
        'Générez des graphiques, exécutez des actions, générez des rapports et obtenez des recommandations propulsées par l\'intelligence artificielle.',
        'Tout ce qu\'inclut le forfait Pro.'
      ],
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
      name: (isEnglish ? modulesData.find(m => m.id === 'thermometer')?.nameEn : modulesData.find(m => m.id === 'thermometer')?.nameFr) || 'Thermometer',
      icon: Thermometer,
      ...calculatePrice(59),
      description: (isEnglish ? modulesData.find(m => m.id === 'thermometer')?.descriptionEn : modulesData.find(m => m.id === 'thermometer')?.descriptionFr) || '',
      features: isEnglish ? modulesData.find(m => m.id === 'thermometer')?.featuresEn || [] : modulesData.find(m => m.id === 'thermometer')?.featuresFr || [],
      badge: isEnglish ? 'Security without compromise' : 'La sécurité sans compromis',
      badgeColor: 'success',
      customColors: null,
      specialEffects: { ring: 'ring-4 ring-[var(--outline)]' }
    },
    {
      id: 'tips',
      name: (isEnglish ? modulesData.find(m => m.id === 'tips')?.nameEn : modulesData.find(m => m.id === 'tips')?.nameFr) || 'Tips',
      icon: DollarSign,
      ...calculatePrice(89),
      description: (isEnglish ? modulesData.find(m => m.id === 'tips')?.descriptionEn : modulesData.find(m => m.id === 'tips')?.descriptionFr) || '',
      features: isEnglish ? modulesData.find(m => m.id === 'tips')?.featuresEn || [] : modulesData.find(m => m.id === 'tips')?.featuresFr || [],
      badge: null,
      badgeColor: null,
      customColors: null,
      specialEffects: { ring: 'ring-4 ring-[var(--outline)]' }
    },
    {
      id: 'cortex_ai_extra',
      name: isEnglish ? 'Cortex AI' : 'Cortex IA',
      icon: MessageCircleMore,
      price: 20,
      priceDetail: isEnglish ? 'per additional user / month' : 'par utilisateur supplémentaire / mois',
      originalPrice: null,
      description: isEnglish ? 'Add more users to your Cortex AI subscription' : 'Ajoutez plus d\'utilisateurs à votre abonnement Cortex IA',
      features: isEnglish ? modulesData.find(m => m.id === 'pro_ai')?.featuresEn?.slice(0, 3) || [] : modulesData.find(m => m.id === 'pro_ai')?.featuresFr?.slice(0, 3) || [],
      badge: null,
      badgeColor: null,
      customColors: null,
      specialEffects: { ring: 'ring-4 ring-[var(--outline)]' }
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mainPlans.map((plan) => (
              <OctogonePricingCard key={plan.id} plan={plan} locale={locale} />
            ))}
          </div>
        </div>

        {/* MODULES ADDITIONNELS */}
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Essential Add-ons' : 'Les ajouts indispensables'}
            </h2>
            <p 
              className="text-center text-xl mb-10"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish 
                ? 'Essential tools! Add Thermometer to your Pro or Pro+AI plan. Want to add Thermometer and Tips to your Essential plan? Upgrade to Pro or Pro AI and save.'
                : 'Des outils indispensables! Ajoutez Thermomètre à votre forfait Pro ou Pro+IA. Vous aimeriez ajouter Thermomètre et Pourboire à votre forfait Essentiel? Passez à Pro ou Pro IA et économisez.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {addonModules.map((addon) => (
                <OctogoneAddonCard key={addon.id} addon={addon} locale={locale} />
              ))}
            </div>
          </div>
        </div>

        {/* TABLEAU DE COMPARAISON */}
        <div className="py-12 px-4" id="compare">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-4 text-center"
              style={{ color: 'var(--on-surface)' }}
            >
              {isEnglish ? 'Detailed Feature Comparison' : 'Comparaison détaillée des fonctionnalités'}
            </h2>
            <p 
              className="text-center text-xl mb-8"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {isEnglish ? 'Condensed overview of key features by plan.' : 'Aperçu condensé des fonctions clés par plan.'}
            </p>
            <div 
              className="rounded-2xl p-8 ring-4 ring-[var(--outline)]"
              style={{
                border: 'none',
                background: 'var(--surface)',
                overflowX: 'auto'
              }}
            >
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th 
                      className="text-left pb-6 font-bold text-2xl"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {isEnglish ? 'Feature' : 'Fonctionnalité'}
                    </th>
                    <th className="text-center pb-6">
                      <div 
                        className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          color: 'var(--on-primary)',
                          border: '1px solid var(--outline)'
                        }}
                      >
                        {isEnglish ? 'Essential' : 'Essentiel'}
                      </div>
                    </th>
                    <th className="text-center pb-6">
                      <div 
                        className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                        style={{ 
                          background: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
                          color: '#1F1F1F',
                          border: '1px solid var(--outline)'
                        }}
                      >
                        Pro
                      </div>
                    </th>
                    <th className="text-center pb-6">
                      <div 
                        className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
                        style={{ 
                          background: 'linear-gradient(180deg, #BADFF6 0%, #E2CDED 100%)',
                          color: '#1F1F1F',
                          border: '1px solid var(--outline)'
                        }}
                      >
                        Pro + IA
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <div 
                        className="w-full h-px mb-6"
                        style={{ backgroundColor: 'var(--outline)' }}
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((category, catIndex) => (
                    <React.Fragment key={catIndex}>
                      {/* Category Header */}
                      <tr>
                        <td colSpan={4} className="pt-6 pb-3">
                          <div 
                            className="font-bold text-base"
                            style={{ color: 'var(--on-surface)' }}
                          >
                            {isEnglish ? category.categoryEn : category.categoryFr}
                          </div>
                        </td>
                      </tr>
                      {/* Features in this category */}
                      {category.features.map((feature, featureIndex) => (
                        <tr 
                          key={`${catIndex}-${featureIndex}`}
                          className="border-t"
                          style={{ borderColor: 'var(--outline-variant)' }}
                        >
                          <td 
                            className="py-4 pr-4"
                            style={{ color: 'var(--on-surface)' }}
                          >
                            {isEnglish ? feature.nameEn : feature.nameFr}
                          </td>
                          <td className="py-4 text-center">
                            {feature.essentiel ? (
                              <div 
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                                style={{ backgroundColor: 'var(--success)' }}
                              >
                                <Check 
                                  className="w-5 h-5"
                                  style={{ color: 'var(--on-primary-container)', strokeWidth: 3 }}
                                />
                              </div>
                            ) : (
                              <span style={{ color: 'var(--on-surface-variant)' }}>—</span>
                            )}
                          </td>
                          <td className="py-4 text-center">
                            {feature.pro ? (
                              <div 
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                                style={{ backgroundColor: 'var(--success)' }}
                              >
                                <Check 
                                  className="w-5 h-5"
                                  style={{ color: 'var(--on-primary-container)', strokeWidth: 3 }}
                                />
                              </div>
                            ) : (
                              <span style={{ color: 'var(--on-surface-variant)' }}>—</span>
                            )}
                          </td>
                          <td className="py-4 text-center">
                            {feature.proAi ? (
                              <div 
                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                                style={{ backgroundColor: 'var(--success)' }}
                              >
                                <Check 
                                  className="w-5 h-5"
                                  style={{ color: 'var(--on-primary-container)', strokeWidth: 3 }}
                                />
                              </div>
                            ) : (
                              <span style={{ color: 'var(--on-surface-variant)' }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
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
