"use client";

import React from 'react';
import { OctogoneButton } from '@/components/ui/octogone-button';

interface ContactButtonProps {
  locale?: 'fr' | 'en';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'cortex';
  className?: string;
}

/**
 * Widget de bouton contact réutilisable
 * Utilise le même design et texte que dans la section Target Sectors
 */
export const ContactButton: React.FC<ContactButtonProps> = ({
  locale = 'fr',
  size = 'lg',
  variant = 'primary',
  className = ''
}) => {
  return (
    <OctogoneButton
      href={`/${locale}/contact`}
      variant={variant}
      size={size}
      className={className}
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      }
    >
      {locale === "fr" ? "Nous contacter" : "Contact us"}
    </OctogoneButton>
  );
};

export default ContactButton;
