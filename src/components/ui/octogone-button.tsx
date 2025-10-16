"use client";

import React from 'react';
import Link from 'next/link';

interface OctogoneButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'cortex';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const OctogoneButton: React.FC<OctogoneButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  // Couleurs selon le variant
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          normal: '#dcb26b', // primary_color
          hover: '#BADFF6'   // secondary_color
        };
      case 'secondary':
        return {
          normal: '#BADFF6', // secondary_color
          hover: '#dcb26b'   // primary_color
        };
      case 'cortex':
        return {
          normal: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)', // Cortex Light gradient
          hover: 'linear-gradient(135deg, #E2CDED 0%, #BADFF6 100%)'   // Reversed gradient on hover
        };
      default:
        return {
          normal: '#dcb26b',
          hover: '#BADFF6'
        };
    }
  };

  // Tailles
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-base';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const colors = getColors();
  const sizeClasses = getSizeClasses();

  // Classes communes
  const baseClasses = `
    inline-flex items-center justify-center
    ${sizeClasses}
    text-black font-semibold rounded-lg
    transition-all duration-300 ease-out
    transform hover:scale-105
    shadow-lg hover:shadow-xl
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Handlers pour les couleurs
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      if (variant === 'cortex') {
        e.currentTarget.style.background = colors.hover;
      } else {
        e.currentTarget.style.backgroundColor = colors.hover;
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      if (variant === 'cortex') {
        e.currentTarget.style.background = colors.normal;
      } else {
        e.currentTarget.style.backgroundColor = colors.normal;
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  // Props communes
  const commonProps = {
    className: baseClasses,
    style: variant === 'cortex' 
      ? { background: disabled ? '#9CA3AF' : colors.normal }
      : { backgroundColor: disabled ? '#9CA3AF' : colors.normal },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  };

  // Contenu du bouton
  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  // Si c'est un lien
  if (href && !disabled) {
    return (
      <Link href={href} {...commonProps}>
        {buttonContent}
      </Link>
    );
  }

  // Si c'est un bouton
  return (
    <button 
      type={type}
      disabled={disabled}
      {...commonProps}
    >
      {buttonContent}
    </button>
  );
};

export default OctogoneButton;
