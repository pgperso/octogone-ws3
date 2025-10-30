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
}

export const OctogoneGradientButton: React.FC<OctogoneGradientButtonProps> = ({
  href,
  icon: Icon,
  text,
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  className = '',
  target,
  rel
}) => {
  return (
    <Link 
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
      style={{ background: gradient }}
    >
      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
      <span>{text}</span>
    </Link>
  );
};
