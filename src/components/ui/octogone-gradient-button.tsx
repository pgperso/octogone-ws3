'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface OctogoneGradientButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  gradient?: string;
  className?: string;
  target?: string;
  rel?: string;
  showBorder?: boolean;
}

// Fonction pour inverser un gradient
const reverseGradient = (gradient: string): string => {
  // Extraire les couleurs du gradient
  const match = gradient.match(/linear-gradient\((\d+deg),\s*(.+?)\s+(\d+%),\s*(.+?)\s+(\d+%)\)/);
  if (match) {
    const [, angle, color1, percent1, color2, percent2] = match;
    return `linear-gradient(${angle}, ${color2} ${percent1}, ${color1} ${percent2})`;
  }
  return gradient;
};

export const OctogoneGradientButton: React.FC<OctogoneGradientButtonProps> = ({
  href,
  icon: Icon,
  text,
  gradient = 'linear-gradient(135deg, #FFE5B4 0%, #B8E0D2 100%)',
  className = '',
  target,
  rel,
  showBorder = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentGradient = isHovered ? reverseGradient(gradient) : gradient;

  return (
    <Link 
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold overflow-hidden transition-all duration-300 ${className}`}
      style={{ 
        background: currentGradient,
        border: showBorder ? '3px solid var(--surface)' : 'none',
        color: 'var(--on-primary-container)',
        transition: 'background 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="w-5 h-5" style={{ color: 'var(--on-primary-container)' }} />
      <span style={{ color: 'var(--on-primary-container)' }}>{text}</span>
    </Link>
  );
};
