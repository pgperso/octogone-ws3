import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { OctogoneGradientButton } from '@/components/ui/octogone-gradient-button';

interface AddonCardProps {
  addon: {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> | string;
    price: number;
    priceDetail: string;
    description: string;
    features: string[];
    badge: string | null;
    badgeColor: string | null;
  };
  locale: 'fr' | 'en';
}

export const OctogoneAddonCard: React.FC<AddonCardProps> = ({ addon, locale }) => {
  const Icon = addon.icon;
  const isEnglish = locale === 'en';

  return (
    <div
      className="rounded-2xl p-8 relative flex flex-col ring-4 ring-[var(--outline)]"
      style={{
        border: 'none',
        background: 'var(--surface)'
      }}
    >
      {addon.badge && (
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap"
          style={{ 
            top: '-22px',
            backgroundColor: addon.badgeColor === 'cortex' ? '#E2CDED' : 
                           addon.badgeColor === 'success' ? '#B8E0D2' :
                           addon.badgeColor === 'warning' ? '#FFE5B4' : '#BADFF6',
            color: '#1F1F1F',
            border: '4px solid var(--background)'
          }}
        >
          {addon.badge}
        </div>
      )}

      {/* Header: Icon + Name + Price */}
      <div className="flex items-center gap-4">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--secondary-container)' }}
        >
          {typeof Icon === 'string' ? (
            <img 
              src={Icon} 
              alt="Icon" 
              width="32" 
              height="32"
              style={{ display: 'block', width: '32px', height: '32px' }}
            />
          ) : (
            <Icon className="w-8 h-8" style={{ color: 'var(--on-secondary-container)', width: '32px', height: '32px' }} />
          )}
        </div>

        <div className="flex-1">
          <h3 
            className="text-2xl font-bold"
            style={{ color: 'var(--on-surface)' }}
          >
            {addon.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span 
              className="text-4xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {addon.price}$
            </span>
            <span 
              className="text-sm"
              style={{ color: 'var(--on-surface-variant)' }}
            >
              {addon.priceDetail}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div 
        className="w-full h-px mt-6"
        style={{ backgroundColor: 'var(--outline)' }}
      />

      {/* Description */}
      <p 
        className="mb-6 mt-6"
        style={{ color: 'var(--on-surface-variant)' }}
      >
        {addon.description}
      </p>

      {/* Features */}
      <ul className="mb-8 flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {addon.features.map((feature, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Check 
              className="w-5 h-5 flex-shrink-0" 
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

      {/* CTA Button */}
      <div className="mt-auto">
        <OctogoneGradientButton
          href="https://app.octogonecollectif.com/#/register"
          icon={ArrowRight}
          text={isEnglish ? "Start now" : "Commencer maintenant"}
          showBorder={true}
          className="w-full"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
};
