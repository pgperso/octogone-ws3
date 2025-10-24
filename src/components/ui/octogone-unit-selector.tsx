"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface UnitOption {
  value: string;
  label: string;
}

interface OctogoneUnitSelectorProps {
  options: UnitOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  forceBorderWhite?: boolean;
}

export const OctogoneUnitSelector: React.FC<OctogoneUnitSelectorProps> = ({
  options,
  value,
  onChange,
  size = 'sm',
  forceBorderWhite = false
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

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  // Tailles
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-5 py-2.5 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };
  
  const sizeClasses = getSizeClasses();

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeClasses} font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap cursor-pointer`}
        style={{
          backgroundColor: 'transparent',
          border: `2px solid ${forceBorderWhite ? '#FFFFFF' : (isOpen ? '#FFFFFF' : 'var(--outline)')}`,
          color: 'var(--on-surface)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {selectedOption?.label || options[0]?.label || 'Select...'}
        <ChevronDown 
          className={`w-4 h-4 ml-1.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
