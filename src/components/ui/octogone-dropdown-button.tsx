"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface OctogoneDropdownButtonProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const OctogoneDropdownButton: React.FC<OctogoneDropdownButtonProps> = ({
  options,
  value,
  onChange,
  icon,
  variant = 'secondary',
  size = 'sm'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--primary)',
      color: 'var(--on-primary)',
      hoverBackgroundColor: 'var(--secondary)',
      hoverColor: 'var(--on-secondary)'
    },
    secondary: {
      backgroundColor: 'var(--secondary)',
      color: 'var(--on-secondary)',
      hoverBackgroundColor: 'var(--primary)',
      hoverColor: 'var(--on-primary)'
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeClasses[size]} rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap`}
        style={{
          backgroundColor: currentVariant.backgroundColor,
          color: currentVariant.color
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = currentVariant.hoverBackgroundColor;
          e.currentTarget.style.color = currentVariant.hoverColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = currentVariant.backgroundColor;
          e.currentTarget.style.color = currentVariant.color;
        }}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{selectedOption?.label || 'Select...'}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 rounded-lg shadow-lg overflow-hidden z-50 min-w-full"
          style={{
            backgroundColor: 'var(--surface-container)',
            border: '1px solid var(--outline)'
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                option.value === value ? 'font-semibold' : ''
              }`}
              style={{
                backgroundColor: option.value === value ? 'var(--secondary-container)' : 'transparent',
                color: option.value === value ? 'var(--on-secondary-container)' : 'var(--on-surface)'
              }}
              onMouseEnter={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
