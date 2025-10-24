"use client";

import React, { useState, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';

interface OctogoneQuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const OctogoneQuantitySelector: React.FC<OctogoneQuantitySelectorProps> = ({
  value,
  onChange,
  min = 0,
  max = 9999,
  step = 0.1,
  size = 'sm'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tailles
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'h-8',
          button: 'w-8 h-8',
          input: 'text-sm',
          icon: 14
        };
      case 'md':
        return {
          container: 'h-10',
          button: 'w-10 h-10',
          input: 'text-base',
          icon: 16
        };
      case 'lg':
        return {
          container: 'h-12',
          button: 'w-12 h-12',
          input: 'text-base',
          icon: 18
        };
      default:
        return {
          container: 'h-8',
          button: 'w-8 h-8',
          input: 'text-sm',
          icon: 14
        };
    }
  };
  
  const sizeClasses = getSizeClasses();

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(parseFloat(newValue.toFixed(2)));
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(parseFloat(newValue.toFixed(2)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)));
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div 
      className={`inline-flex items-center rounded-lg transition-all duration-200 ${sizeClasses.container}`}
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${isFocused ? 'var(--primary)' : 'var(--outline)'}`,
      }}
    >
      {/* Bouton Moins */}
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className={`${sizeClasses.button} flex items-center justify-center transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-l-lg`}
        style={{
          color: 'var(--on-surface)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          if (value > min) {
            e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Minus size={sizeClasses.icon} />
      </button>

      {/* Input */}
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-20 text-center font-medium ${sizeClasses.input} bg-transparent outline-none`}
        style={{
          color: 'var(--on-surface)',
          borderLeft: '1px solid var(--outline)',
          borderRight: '1px solid var(--outline)'
        }}
        step={step}
        min={min}
        max={max}
      />

      {/* Bouton Plus */}
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className={`${sizeClasses.button} flex items-center justify-center transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-r-lg`}
        style={{
          color: 'var(--on-surface)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
          if (value < max) {
            e.currentTarget.style.backgroundColor = 'var(--surface-variant)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Plus size={sizeClasses.icon} />
      </button>
    </div>
  );
};
