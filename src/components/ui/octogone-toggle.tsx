"use client";

import React from 'react';

interface OctogoneToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: {
    text: string;
    backgroundColor?: string;
    color?: string;
  };
}

interface OctogoneToggleProps {
  options: OctogoneToggleOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const OctogoneToggle: React.FC<OctogoneToggleProps> = ({
  options,
  value,
  onChange,
  size = 'md'
}) => {
  // Tailles
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-5 py-2.5 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div 
      className="inline-flex rounded-lg p-1"
      style={{
        border: '1px solid var(--outline)'
      }}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`${sizeClasses} rounded-md font-medium transition-all flex items-center gap-2 cursor-pointer relative`}
            style={{
              backgroundColor: isActive ? 'var(--secondary-container)' : 'transparent',
              color: isActive ? 'var(--on-secondary-container)' : 'var(--on-surface-variant)'
            }}
          >
            {option.icon && option.icon}
            {option.label}
            {option.badge && (
              <span
                className="absolute -top-2 -right-4 px-2 py-0.5 text-xs font-bold rounded-full"
                style={{
                  backgroundColor: option.badge.backgroundColor || 'var(--success)',
                  color: option.badge.color || 'var(--on-primary-container)'
                }}
              >
                {option.badge.text}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
