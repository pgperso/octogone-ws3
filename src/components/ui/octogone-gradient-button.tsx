'use client';

import React from 'react';
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
  return (
    <Link 
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      style={{ 
        background: gradient,
        border: showBorder ? '3px solid var(--surface)' : 'none'
      }}
    >
      <Icon className="w-5 h-5 transition-transform group-hover:scale-110 text-white" />
      <span className="text-white">{text}</span>
    </Link>
  );
};
