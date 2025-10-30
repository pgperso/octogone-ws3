import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> | string;
    price: number;
    originalPrice: number | null;
    priceDetail: string;
    description: string;
    features: string[];
    savings?: number;
    timeSaved?: number;
    badge: string | null;
    badgeColor: string | null;
    customColors?: {
      background?: string;
      iconBg?: string;
    } | null;
    specialEffects?: {
      ring?: string;
    };
  };
  locale: 'fr' | 'en';
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, locale }) => {
  const Icon = plan.icon;
  const hasCustomColors = !!plan.customColors;
  const isEnglish = locale === 'en';

  return (
    <div>
      <div
        className={`rounded-2xl p-8 relative flex flex-col ${hasCustomColors ? 'shadow-lg' : ''} ${plan.specialEffects?.ring || ''}`}
        style={{
          border: plan.customColors?.background ? 'none' : '1px solid var(--outline)',
          background: plan.customColors?.background || 'var(--surface)',
          minHeight: '700px'
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
                               plan.badgeColor === 'warning' ? '#FFE5B4' : '#BADFF6',
                color: '#1F1F1F',
                border: '2px solid var(--surface)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
                width="32"
                height="32"
                className="mx-auto"
                style={{ display: 'block', width: '32px', height: '32px' }}
              />
            ) : (
              <Icon className="w-8 h-8 mx-auto" style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-secondary-container)', width: '32px', height: '32px' }} />
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
          <div className="flex items-baseline justify-center gap-2">
            {plan.originalPrice && (
              <span 
                className="text-lg line-through opacity-60"
                style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
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
            className="text-sm mt-1"
            style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
          >
            {plan.priceDetail}
          </div>
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
        <ul className="mb-8 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
          {plan.features.map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Check 
                className="w-5 h-5 flex-shrink-0" 
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
        <div className="mt-auto">
          <OctogoneGradientButton
            href="https://app.octogonecollectif.com/#/register"
            icon={ArrowRight}
            text={isEnglish ? "Start now" : "Commencer maintenant"}
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
      </div>
    </div>
  );
};
