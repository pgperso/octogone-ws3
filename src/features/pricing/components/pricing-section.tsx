'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';
import { OctogoneToggle } from '@/components/ui/octogone-toggle';
import { Warehouse, ChefHat, DollarSign, Package, Star, Thermometer, MessageCircleMore } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { PricingCard } from './pricing-card';
import modulesData from '@/data/calculator/modules.json';
import pricingData from '@/data/calculator/pricing.json';
import plansConfig from '@/data/pricing/plans.json';
import pricingConfig from '@/data/pricing/config.json';

interface PricingSectionProps {
  locale: 'fr' | 'en';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ locale }) => {
  const isEnglish = locale === 'en';
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Prix de base pour 1 établissement
  const basePrice = pricingData[0].pricePerLocationPerMonth;
  const annualDiscount = pricingConfig.annualDiscount;
  
  // Mapping des icônes
  const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }> | string> = {
    Warehouse,
    ChefHat,
    DollarSign,
    Package,
    Star,
    Thermometer,
    Cortex: '/cortex.svg'
  };

  // Créer les plans à partir de la configuration et des modules
  const plans = plansConfig
    .sort((a, b) => a.order - b.order)
    .map((planConfig) => {
      const moduleData = modulesData.find(m => m.id === planConfig.moduleId);
      if (!moduleData) return null;
      
      // Utiliser le prix fixe du plan
      const monthlyPrice = planConfig.fixedPrice || basePrice;
      // Prix annuel = (mensuel × 12) - 10%
      const annualPrice = Math.round(monthlyPrice * 12 * (1 - annualDiscount));
      const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
      
      // Label de prix selon le cycle de facturation
      const priceDetail = billingCycle === 'monthly' 
        ? (isEnglish ? pricingConfig.labels.priceDetail.en : pricingConfig.labels.priceDetail.fr)
        : (isEnglish ? 'per location / year' : 'par établissement / année');
      
      return {
        id: moduleData.id,
        name: isEnglish ? moduleData.nameEn : moduleData.nameFr,
        icon: iconMap[moduleData.icon] || Package,
        price: displayPrice,
        originalPrice: planConfig.originalPrice || (billingCycle === 'annual' ? monthlyPrice * 12 : null),
        priceDetail: priceDetail,
        description: isEnglish ? moduleData.descriptionEn : moduleData.descriptionFr,
        features: isEnglish ? moduleData.featuresEn : moduleData.featuresFr,
        savings: moduleData.monthlySavingsPerLocation,
        timeSaved: moduleData.timesSavedPerWeekPerLocation,
        badge: planConfig.badge ? (isEnglish ? planConfig.badge.textEn : planConfig.badge.textFr) : null,
        badgeColor: planConfig.badge?.color || null,
        customColors: planConfig.customColors,
        specialEffects: planConfig.specialEffects
      };
    })
    .filter((plan): plan is NonNullable<typeof plan> => plan !== null);

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

        {/* Pricing Carousel */}
        <div className="py-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                slidesPerGroup: 1
              },
              1024: { 
                slidesPerView: 3,
                slidesPerGroup: 1
              },
              1400: { 
                slidesPerView: 4,
                slidesPerGroup: 1
              }
            }}
            style={{ 
              paddingTop: '3rem',
              paddingBottom: '3rem',
              paddingLeft: '12px',
              paddingRight: '12px'
            }}
          >
            {plans.map((plan) => (
              <SwiperSlide key={plan.id} style={{ height: 'auto' }}>
                <PricingCard plan={plan} locale={locale} />
              </SwiperSlide>
            ))}
          </Swiper>
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
