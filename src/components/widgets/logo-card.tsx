"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoCardProps {
  name: string;
  logo: string;
  index: number;
  delay?: number;
}

/**
 * Composant réutilisable pour afficher une carte de logo
 * Utilisé pour POS, gestionnaires d'horaire et fournisseurs
 */
export const LogoCard: React.FC<LogoCardProps> = ({ name, logo, index, delay = 0.05 }) => {
  return (
    <motion.div
      className="flex items-center justify-center p-6 rounded-xl border-2 bg-white shadow-md hover:shadow-lg transition-all duration-300"
      style={{ borderColor: 'var(--outline)', minHeight: '100px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-2 relative">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--on-primary-container)' }}>
          {name}
        </span>
      </div>
    </motion.div>
  );
};
