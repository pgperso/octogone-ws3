import React from 'react';
import { Check } from 'lucide-react';
import { CortexSpinner } from '@/components/ui/cortex-spinner';

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
    customColors?: {
      background?: string;
      iconBg?: string;
    } | null;
    specialEffects?: {
      ring?: string;
      blurred?: boolean;
    };
  };
  locale: 'fr' | 'en';
}

export const OctogoneAddonCard: React.FC<AddonCardProps> = ({ addon, locale }) => {
  const Icon = addon.icon;
  const isBlurred = addon.specialEffects?.blurred || false;
  const isEnglish = locale === 'en';
  const hasCustomColors = addon.customColors !== null && addon.customColors !== undefined;

  return (
    <div
      className="rounded-2xl p-8 relative flex flex-col ring-4 ring-[var(--outline)]"
      style={{
        border: 'none',
        background: hasCustomColors ? addon.customColors?.background : 'var(--surface)'
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

      {/* Content wrapper with blur */}
      <div style={{ filter: isBlurred ? 'blur(4px)' : 'none', pointerEvents: isBlurred ? 'none' : 'auto', position: 'relative' }}>
      {/* Header: Icon + Name + Price */}
      <div className="flex items-start gap-4">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: hasCustomColors ? (addon.customColors?.iconBg || 'rgba(0,0,0,0.05)') : 'var(--secondary-container)' }}
        >
          {typeof Icon === 'string' ? (
            <img 
              src={Icon} 
              alt="Icon" 
              width="32" 
              height="32"
              style={{ 
                display: 'block', 
                width: '32px', 
                height: '32px',
                filter: 'brightness(0) saturate(100%)',
                opacity: 0.7
              }}
            />
          ) : (
            <Icon className="w-8 h-8" style={{ color: 'var(--on-secondary-container)', width: '32px', height: '32px' }} />
          )}
        </div>

        <div className="flex-1">
          <h3 
            className="text-2xl font-bold"
            style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface)' }}
          >
            {addon.name}
          </h3>
          <div className="mt-1">
            <div 
              className="text-4xl font-bold"
              style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--primary)' }}
            >
              {addon.price}$
            </div>
            <div 
              className="text-sm mt-1"
              style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
            >
              {addon.priceDetail}
            </div>
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
        style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)' }}
      >
        {addon.description}
      </p>

      {/* Features */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {addon.features.map((feature, idx) => (
          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Check 
              className="w-5 h-5 flex-shrink-0" 
              style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--success)' }}
            />
            <span 
              className="text-sm"
              style={{ color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface)' }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
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
          {/* Cortex Spinner */}
          <CortexSpinner 
            size={80}
            iconSize={44}
            strokeWidth={3}
            colorful={false}
            className="mx-auto mb-4"
          />
          
          {/* Text */}
          <div style={{
            color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface)',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            letterSpacing: '0.5px'
          }}>
            {isEnglish ? 'Pending...' : 'En attente...'}
          </div>
          
          {/* Subtitle */}
          <div style={{
            color: hasCustomColors ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)',
            fontSize: '13px',
            fontWeight: '400'
          }}>
            {isEnglish ? 'Powered by Cortex AI' : 'Propulsé par Cortex IA'}
          </div>
        </div>
      )}
    </div>
  );
};
