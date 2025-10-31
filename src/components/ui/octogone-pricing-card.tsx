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
      blurred?: boolean;
    };
    sections?: {
      name: string;
      price: number;
      priceDetail: string;
      features: string[];
    }[];
    commonFeatures?: string[];
  };
  locale: 'fr' | 'en';
}

export const OctogonePricingCard: React.FC<PricingCardProps> = ({ plan, locale }) => {
  const Icon = plan.icon;
  const hasCustomColors = !!plan.customColors;
  const isEnglish = locale === 'en';
  const isBlurred = plan.specialEffects?.blurred || false;

  return (
    <div
      className={`rounded-2xl p-8 relative flex flex-col h-full ${hasCustomColors ? 'shadow-lg' : ''} ${plan.specialEffects?.ring || ''}`}
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
                backgroundColor: plan.badgeColor === 'cortex' ? 'var(--purple_cortex)' : 
                               plan.badgeColor === 'success' ? 'var(--green-pastel)' :
                               plan.badgeColor === 'warning' ? 'var(--yellow-pastel)' :
                               plan.badgeColor === 'gold' ? 'var(--primary)' :
                               plan.badgeColor === 'primary' ? 'var(--blue-pastel)' : 'var(--blue-pastel)',
                color: '#1F1F1F',
                border: '4px solid var(--background)'
              }}
            >
              {plan.badge}
            </div>
          </>
        )}

        {/* Content wrapper with blur */}
        <div style={{ filter: isBlurred ? 'blur(4px)' : 'none', pointerEvents: isBlurred ? 'none' : 'auto', position: 'relative' }}>
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
                style={{ 
                  display: 'block', 
                  width: '32px', 
                  height: '32px',
                  filter: 'brightness(0) saturate(100%)',
                  opacity: hasCustomColors ? 0.8 : 0.7
                }}
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

        {/* Price - Support for sections or single price */}
        {plan.sections ? (
          <div className="mb-6">
            {plan.sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className={sectionIdx > 0 ? 'mt-6' : ''}>
                <h4 
                  className="text-lg font-bold text-center mb-2"
                  style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                >
                  {section.name}
                </h4>
                <div className="text-center mb-4">
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--primary)' }}
                  >
                    {section.price}$
                  </div>
                  <div 
                    className="text-sm mt-1 mb-4"
                    style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface-variant)' }}
                  >
                    {section.priceDetail}
                  </div>
                  <div 
                    className="w-full h-px"
                    style={{ backgroundColor: 'var(--outline)' }}
                  />
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  {section.features.map((feature, idx) => (
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
                {plan.sections && sectionIdx < plan.sections.length - 1 && (
                  <div className="text-center my-6">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: hasCustomColors ? 'var(--on-primary-container)' : 'var(--on-surface)' }}
                    >
                      {isEnglish ? 'OR' : 'OU'}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {plan.commonFeatures && plan.commonFeatures.length > 0 && (
              <>
                <div 
                  className="w-full h-px my-4"
                  style={{ backgroundColor: 'var(--outline)' }}
                />
                <ul className="mb-8 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.commonFeatures.map((feature, idx) => (
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
              </>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
        </div>
        {/* End blur wrapper */}

        {/* AI Loading animation overlay */}
        {isBlurred && (
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              textAlign: 'center',
              pointerEvents: 'none'
            }}
          >
            {/* Animated octagon line around Cortex icon */}
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 24px' }}>
              {/* Animated octagon line with dash effect */}
              <svg 
                width="100" 
                height="100" 
                viewBox="0 0 200 200"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              >
                <path
                  d="M 60,20 L 140,20 L 180,60 L 180,140 L 140,180 L 60,180 L 20,140 L 20,60 Z"
                  fill="none"
                  stroke="var(--on-secondary-container)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="bevel"
                  strokeDasharray="70 1000"
                  strokeDashoffset="0"
                  style={{
                    animation: 'cortexDashAnimation 4s ease-out infinite, cortexColorAnimation 8s ease-in-out infinite'
                  }}
                />
              </svg>
              
              {/* Cortex icon in center */}
              <div style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/cortex.svg" 
                  alt="Cortex" 
                  style={{
                    width: '56px',
                    height: '56px',
                    filter: 'brightness(0) saturate(100%)',
                    opacity: 0.7
                  }}
                />
              </div>
            </div>
            
            {/* Text */}
            <div style={{
              color: 'var(--on-surface)',
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px',
              letterSpacing: '0.5px'
            }}>
              {isEnglish ? 'Coming Soon' : 'Bientôt disponible'}
            </div>
            
            {/* Subtitle */}
            <div style={{
              color: 'var(--on-surface-variant)',
              fontSize: '14px',
              fontWeight: '400'
            }}>
              {isEnglish ? 'Powered by Cortex AI' : 'Propulsé par Cortex IA'}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes cortexDashAnimation {
            0% {
              stroke-dashoffset: 0;
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: -1070;
              opacity: 0.3;
            }
          }
          @keyframes cortexColorAnimation {
            0%, 100% {
              stroke: #B8E0D2;
            }
            25% {
              stroke: #B4D4FF;
            }
            50% {
              stroke: #FFE5B4;
            }
            75% {
              stroke: #C8B6FF;
            }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
        `}</style>

        {/* CTA Button - Outside blur */}
        <div className="mt-auto" style={{ position: 'relative', zIndex: 10 }}>
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
  );
};
