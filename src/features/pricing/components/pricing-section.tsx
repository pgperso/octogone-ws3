'use client';

import React, { useState } from 'react';
import { ResponsiveSection } from '@/components/ui/responsive-section';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';
import { OctogoneToggle } from '@/components/ui/octogone-toggle';
import { Check, Warehouse, ChefHat, DollarSign, Package, ArrowRight, Star, Thermometer, ChevronLeft, ChevronRight, MessageCircleMore } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
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
        highlighted: planConfig.highlighted,
        savings: moduleData.monthlySavingsPerLocation,
        timeSaved: moduleData.timesSavedPerWeekPerLocation,
        popular: planConfig.popular,
        badge: planConfig.badge ? (isEnglish ? planConfig.badge.textEn : planConfig.badge.textFr) : null,
        badgeColor: planConfig.badge?.color || null,
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
        
        /* Swiper pagination dots */
        .swiper-pagination-bullet {
          background: var(--outline) !important;
          opacity: 0.5 !important;
        }
        
        .swiper-pagination-bullet-active {
          background: var(--secondary-container) !important;
          opacity: 1 !important;
        }

        /* Prevent CLS during Swiper initialization */
        .swiper-no-cls {
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        .swiper-no-cls .swiper-wrapper {
          transform: translate3d(0, 0, 0) !important;
        }
      `}</style>
      
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
          <div style={{ minHeight: '750px', position: 'relative' }}>
            <Swiper
              modules={[Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              slidesPerGroup={1}
              pagination={{ 
                clickable: true,
                el: '.swiper-pagination-custom'
              }}
              breakpoints={{
                640: { 
                  slidesPerView: 2,
                  slidesPerGroup: 2
                },
                1024: { 
                  slidesPerView: 3,
                  slidesPerGroup: 3
                },
                1400: { 
                  slidesPerView: 4,
                  slidesPerGroup: 4
                }
              }}
              onSwiper={setSwiperInstance}
              style={{ 
                paddingTop: '3rem', 
                paddingBottom: '1rem', 
                paddingLeft: '12px', 
                paddingRight: '12px'
              }}
              className="swiper-no-cls"
            >
            {plans.map((plan) => {
              const Icon = plan.icon;
              const hasCustomColors = !!plan.customColors;
              
              return (
                <SwiperSlide key={plan.id}>
                  <div
                    className={`rounded-2xl p-8 relative flex flex-col ${hasCustomColors ? 'shadow-lg' : ''} ${plan.specialEffects?.ring || ''}`}
                    style={{
                      border: plan.customColors?.background ? 'none' : '1px solid var(--outline)',
                      background: plan.customColors?.background || 'var(--surface)',
                      height: '650px'
                    }}
                  >
                {plan.badge && (
                  <>
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap"
                      style={{ 
                        top: '-22px',
                        backgroundColor: plan.badgeColor === 'cortex' ? '#E2CDED' : 
                                       plan.badgeColor === 'success' ? '#B8E0D2' :
                                       plan.badgeColor === 'primary' ? '#FFE5B4' : 'var(--primary)',
                        color: 'var(--on-primary-container)',
                        border: '4px solid var(--surface)'
                      }}
                    >
                      {plan.badge}
                    </div>
                  </>
                )}

                {/* Icon */}
                <div className="flex justify-center gap-4 mb-8">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: hasCustomColors ? (plan.customColors?.iconBg || 'rgba(0,0,0,0.05)') : 'var(--secondary-container)' }}
                  >
                    {typeof Icon === 'string' ? (
                      <img 
                        src={Icon} 
                        alt="Icon" 
                        width={32}
                        height={32}
                        className="w-8 h-8" 
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(3207%) hue-rotate(167deg) brightness(96%) contrast(101%)'
                        }} 
                      />
                    ) : (
                      <Icon className="w-8 h-8" style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-secondary-container)' }} />
                    )}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 
                  className="text-2xl font-bold text-center mb-2"
                  style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {plan.originalPrice && (
                      <span 
                        className="text-lg line-through"
                        style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)', opacity: 0.5 }}
                      >
                        {plan.originalPrice}$
                      </span>
                    )}
                    <div 
                      className="text-4xl font-bold"
                      style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--primary)' }}
                    >
                      {plan.price}$
                    </div>
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
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
                  style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                >
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check 
                        className="w-5 h-5 flex-shrink-0 mt-0.5" 
                        style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--success)' }}
                      />
                      <span 
                        className="text-sm"
                        style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <OctogoneGradientButton
                  href="https://octogone-ws3.vercel.app/fr/contact"
                  icon={ArrowRight}
                  text={isEnglish ? pricingConfig.cta.button.en : pricingConfig.cta.button.fr}
                  gradient={
                    plan.id === 'pro' || plan.id === 'pro_ai'
                      ? 'linear-gradient(135deg, #E2CDED 0%, #BADFF6 100%)'
                      : undefined
                  }
                  showBorder={true}
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Custom Navigation Buttons */}
          <div className="flex items-center justify-center gap-6 mt-4 mx-auto max-w-md">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                e.currentTarget.style.color = 'var(--on-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--on-primary)';
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="swiper-pagination-custom flex-1 flex justify-center" style={{ cursor: 'pointer' }} />
            
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                e.currentTarget.style.color = 'var(--on-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = 'var(--on-primary)';
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
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
