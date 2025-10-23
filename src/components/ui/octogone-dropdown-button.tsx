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

  // Tailles identiques à OctogoneButton
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base'
  };

  // Couleurs identiques à OctogoneButton
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          normal: '#dcb26b',
          hover: '#BADFF6'
        };
      case 'secondary':
        return {
          normal: '#BADFF6',
          hover: '#dcb26b'
        };
      default:
        return {
          normal: '#dcb26b',
          hover: '#BADFF6'
        };
    }
  };

  const colors = getColors();

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeClasses[size]} text-black font-semibold rounded-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap`}
        style={{
          backgroundColor: colors.normal
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.normal;
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
