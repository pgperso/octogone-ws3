'use client';

import React, { useState, useCallback } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneButton } from '@/components/ui/octogone-button';
import { Check, Warehouse, ChefHat, DollarSign, Package, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import modulesData from '@/data/calculator/modules.json';
import pricingData from '@/data/calculator/pricing.json';
import plansConfig from '@/data/pricing/plans.json';
import pricingConfig from '@/data/pricing/config.json';
import './pricing-carousel.css';

interface PricingSectionProps {
  locale: 'fr' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale }) => {
  const isEnglish = locale === 'en';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // Prix de base pour 1 établissement
  const basePrice = pricingData[0].pricePerLocationPerMonth;
  const annualDiscount = pricingConfig.annualDiscount;
  
  // Mapping des icônes
  const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    Warehouse,
    ChefHat,
    DollarSign,
    Package
  };

  // Créer les plans à partir de la configuration et des modules
  const plans = plansConfig
    .sort((a, b) => a.order - b.order)
    .map((planConfig) => {
      const moduleData = modulesData.find(m => m.id === planConfig.moduleId);
      if (!moduleData) return null;
      
      // Utiliser le prix fixe du plan
      const monthlyPrice = planConfig.fixedPrice || basePrice;
      const annualPrice = Math.round(monthlyPrice * (1 - annualDiscount));
      const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
      
      return {
        id: moduleData.id,
        name: isEnglish ? moduleData.nameEn : moduleData.nameFr,
        icon: iconMap[moduleData.icon] || Package,
        price: displayPrice,
        originalPrice: planConfig.originalPrice || (billingCycle === 'annual' ? monthlyPrice : null),
        priceDetail: isEnglish ? pricingConfig.labels.priceDetail.en : pricingConfig.labels.priceDetail.fr,
        description: isEnglish ? moduleData.descriptionEn : moduleData.descriptionFr,
        features: isEnglish ? moduleData.featuresEn : moduleData.featuresFr,
        highlighted: planConfig.highlighted,
        savings: moduleData.monthlySavingsPerLocation,
        timeSaved: moduleData.timesSavedPerWeekPerLocation,
        popular: planConfig.popular,
        badge: planConfig.badge ? (isEnglish ? planConfig.badge.textEn : planConfig.badge.textFr) : null,
        customColors: planConfig.customColors,
        specialEffects: planConfig.specialEffects
      };
    })
    .filter((plan): plan is NonNullable<typeof plan> => plan !== null);

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
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
              {isEnglish ? pricingConfig.hero.badge.textEn : pricingConfig.hero.badge.textFr}
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--on-surface)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isEnglish ? pricingConfig.hero.title.en : pricingConfig.hero.title.fr}
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8"
            style={{ color: 'var(--on-surface-variant)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isEnglish ? pricingConfig.hero.description.en : pricingConfig.hero.description.fr}
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
              {isEnglish ? pricingConfig.billing.monthly.en : pricingConfig.billing.monthly.fr}
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
              {isEnglish ? pricingConfig.billing.annual.en : pricingConfig.billing.annual.fr}
              <span 
                className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full"
                style={{ backgroundColor: 'var(--success)', color: 'white' }}
              >
                {pricingConfig.billing.annualBadge}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden py-8" ref={emblaRef}>
            <div className="flex embla__container">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const isProPlan = plan.id === 'pro';
                
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`embla__slide rounded-2xl p-6 relative flex flex-col ${isProPlan ? 'shadow-2xl ring-4 ring-blue-600/30' : 'shadow-lg'}`}
                    style={{
                      border: isProPlan ? 'none' : '1px solid var(--outline)',
                      background: plan.customColors?.background || 'var(--surface)',
                      minHeight: '600px'
                    }}
                  >
                {plan.badge && (
                  <>
                    <div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2"
                      style={{ 
                        backgroundColor: isProPlan ? 'var(--secondary)' : 'var(--primary)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      {isProPlan && <Sparkles className="w-4 h-4" />}
                      {plan.badge}
                    </div>
                  </>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: isProPlan ? (plan.customColors?.iconBg || 'rgba(0,0,0,0.05)') : 'var(--secondary-container)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--on-secondary-container)' }} />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
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
                      style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--primary)' }}
                    >
                      {plan.price}$
                    </div>
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {plan.priceDetail}
                  </div>
                  
                  {/* Ligne séparatrice */}
                  <div 
                    className="w-full h-px mt-4"
                    style={{ backgroundColor: 'var(--outline)' }}
                  />
                </div>

                {/* Description */}
                <p 
                  className="text-center mb-6 min-h-[60px]"
                  style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                >
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check 
                        className="w-5 h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--success)' }}
                      />
                      <span 
                        className="text-sm"
                        style={{ color: isProPlan ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href="https://octogone-ws3.vercel.app/fr/contact" target="_blank" rel="noopener noreferrer">
                  <OctogoneButton
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isEnglish ? pricingConfig.cta.button.en : pricingConfig.cta.button.fr}
                    <ArrowRight className="w-5 h-5" />
                  </OctogoneButton>
                </Link>
              </motion.div>
            );
          })}
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
          <Link href={`/${locale}/contact`}>
            <OctogoneButton variant="primary" size="lg">
              {isEnglish ? pricingConfig.cta.customSolution.button.en : pricingConfig.cta.customSolution.button.fr}
            </OctogoneButton>
          </Link>
        </div>
      </ResponsiveSection>
    </>
  );
};
