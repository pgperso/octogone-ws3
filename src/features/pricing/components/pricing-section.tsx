'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { Check, Warehouse, ChefHat, DollarSign, Package, ArrowRight, Sparkles, TrendingDown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import modulesData from '@/data/calculator/modules.json';
import pricingData from '@/data/calculator/pricing.json';

interface PricingSectionProps {
  locale: 'fr' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale }) => {
  const isEnglish = locale === 'en';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Prix de base pour 1 établissement
  const basePrice = pricingData[0].pricePerLocationPerMonth;
  const annualDiscount = 0.15; // 15% de rabais annuel
  
  // Mapping des icônes
  const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Warehouse,
    ChefHat,
    DollarSign,
    Package
  };

  // Créer les plans à partir des modules (exclure thermometer)
  const plans = modulesData
    .filter(module => module.id !== 'thermometer')
    .map((module) => {
      const monthlyPrice = module.id === 'pro' ? basePrice * 4 : basePrice;
      const annualPrice = Math.round(monthlyPrice * (1 - annualDiscount));
      const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
      
      return {
        id: module.id,
        name: isEnglish ? module.nameEn : module.nameFr,
        icon: iconMap[module.icon] || Package,
        price: displayPrice,
        originalPrice: billingCycle === 'annual' ? monthlyPrice : null,
        priceDetail: isEnglish ? '/location/month' : '/établissement/mois',
        description: isEnglish ? module.descriptionEn : module.descriptionFr,
        features: isEnglish ? module.featuresEn : module.featuresFr,
        highlighted: module.id === 'pro',
        savings: module.monthlySavingsPerLocation,
        timeSaved: module.timesSavedPerWeekPerLocation,
        popular: module.id === 'foodcost'
      };
    });

  return (
    <>
      {/* Hero Section */}
      <ResponsiveSection spacing="xl" bgColor="">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {isEnglish ? 'Save up to 15% with annual billing' : 'Économisez jusqu\'à 15% avec la facturation annuelle'}
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--on-surface)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isEnglish ? 'Pricing that grows with you' : 'Une tarification qui évolue avec vous'}
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8"
            style={{ color: 'var(--on-surface-variant)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isEnglish 
              ? 'Choose the perfect plan for your restaurant. Start small, scale as you grow. No hidden fees, cancel anytime.'
              : 'Choisissez le forfait parfait pour votre restaurant. Commencez petit, évoluez selon vos besoins. Aucun frais caché, annulez à tout moment.'
            }
          </motion.p>

          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly' ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: billingCycle === 'monthly' ? 'var(--primary)' : 'var(--surface-variant)',
                color: billingCycle === 'monthly' ? 'var(--on-primary)' : 'var(--on-surface-variant)'
              }}
            >
              {isEnglish ? 'Monthly' : 'Mensuel'}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                billingCycle === 'annual' ? 'shadow-lg' : ''
              }`}
              style={{
                backgroundColor: billingCycle === 'annual' ? 'var(--primary)' : 'var(--surface-variant)',
                color: billingCycle === 'annual' ? 'var(--on-primary)' : 'var(--on-surface-variant)'
              }}
            >
              {isEnglish ? 'Annual' : 'Annuel'}
              <span 
                className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full"
                style={{ backgroundColor: 'var(--success)', color: 'white' }}
              >
                -15%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-8 relative ${plan.highlighted ? 'shadow-2xl' : 'shadow-lg'}`}
                style={{
                  backgroundColor: plan.highlighted ? 'var(--primary-container)' : 'var(--surface)',
                  border: plan.highlighted ? '3px solid var(--primary)' : '1px solid var(--outline)',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {plan.highlighted && (
                  <div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      color: 'var(--on-primary)'
                    }}
                  >
                    {isEnglish ? 'Most Popular' : 'Plus populaire'}
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--secondary-container)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {plan.originalPrice && (
                      <span 
                        className="text-lg line-through"
                        style={{ color: 'var(--on-surface-variant)', opacity: 0.5 }}
                      >
                        {plan.originalPrice}$
                      </span>
                    )}
                    <div 
                      className="text-4xl font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {plan.price}$
                    </div>
                  </div>
                  <div 
                    className="text-sm mb-4"
                    style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {plan.priceDetail}
                  </div>
                  
                  {/* Value Badges */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'var(--success-container)', color: 'var(--on-success-container)' }}
                    >
                      <TrendingDown className="w-3 h-3" />
                      {isEnglish ? 'Save' : 'Économise'} {plan.savings}$/mois
                    </div>
                    <div 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'var(--tertiary-container)', color: 'var(--on-tertiary-container)' }}
                    >
                      <Clock className="w-3 h-3" />
                      {plan.timeSaved}h/semaine
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p 
                  className="text-center mb-6 min-h-[60px]"
                  style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                >
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check 
                        className="w-5 h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: 'var(--success)' }}
                      />
                      <span 
                        className="text-sm"
                        style={{ color: plan.highlighted ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={`/${locale}/contact`}>
                  <OctogoneButton
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isEnglish ? 'Get started' : 'Commencer'}
                    <ArrowRight className="w-5 h-5" />
                  </OctogoneButton>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </ResponsiveSection>

      {/* FAQ or Additional Info Section */}
      <ResponsiveSection spacing="lg" bgColor="var(--surface-variant)">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--on-surface)' }}>
            {isEnglish ? 'Need a custom solution?' : 'Besoin d\'une solution personnalisée ?'}
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish
              ? 'Every restaurant is unique. Contact us to discuss a tailored plan that perfectly fits your specific needs and budget.'
              : 'Chaque restaurant est unique. Contactez-nous pour discuter d\'un forfait sur mesure qui correspond parfaitement à vos besoins spécifiques et à votre budget.'
            }
          </p>
          <Link href={`/${locale}/contact`}>
            <OctogoneButton variant="primary" size="lg">
              {isEnglish ? 'Schedule a demo' : 'Planifier une démo'}
            </OctogoneButton>
          </Link>
        </div>
      </ResponsiveSection>
    </>
  );
};
