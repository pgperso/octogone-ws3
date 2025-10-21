/**
 * Composant KPI Tile avec effets hover et interaction
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { KPITileProps } from '../types';
import { formatVariationPercent, getVariationColor, isVariationPositive } from '../utils/formatters';

export const KPITile: React.FC<KPITileProps> = ({
  title,
  value,
  previousValue,
  change,
  icon: Icon,
  onClick,
  className = '',
}) => {
  const isPositive = change !== null ? isVariationPositive(title.toLowerCase(), change) : false;
  const variationColor = getVariationColor(title.toLowerCase(), change);
  
  const getTrendIcon = () => {
    if (change === null || change === 0) {
      return <Minus className="w-4 h-4" style={{ color: variationColor }} />;
    }
    
    return isPositive ? (
      <TrendingUp className="w-4 h-4" style={{ color: variationColor }} />
    ) : (
      <TrendingDown className="w-4 h-4" style={{ color: variationColor }} />
    );
  };

  return (
    <motion.div
      className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer group ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--outline)',
      }}
      onClick={onClick}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.cursor = 'pointer';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--outline)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Indicateur de hover subtil */}
      <div 
        className="absolute top-0 left-0 w-full h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: 'var(--primary)' }}
      />

      {/* En-tête avec icône et titre */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div 
              className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: 'var(--primary-container)' }}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
          <h3 
            className="text-sm font-semibold group-hover:text-opacity-80 transition-all duration-300"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {title}
          </h3>
        </div>
        
        {/* Icône de tendance */}
        <div className="group-hover:scale-110 transition-transform duration-300">
          {getTrendIcon()}
        </div>
      </div>

      {/* Valeur principale */}
      <div className="mb-2">
        <span 
          className="text-2xl font-bold group-hover:scale-105 transition-transform duration-300 inline-block"
          style={{ color: 'var(--on-surface)' }}
        >
          {value}
        </span>
      </div>

      {/* Comparaison et variation */}
      <div className="flex items-center justify-between">
        <span 
          className="text-xs"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          vs {previousValue}
        </span>
        
        {change !== null && (
          <span 
            className="text-xs font-medium group-hover:font-semibold transition-all duration-300"
            style={{ color: variationColor }}
          >
            {formatVariationPercent(change)}
          </span>
        )}
      </div>

      {/* Overlay subtil pour l'effet hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: 'var(--primary)' }}
      />
    </motion.div>
  );
};
