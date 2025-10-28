"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface QuantityTagProps {
  quantity: string;
  label: string;
  top: string;
  left?: string;
  right?: string;
  isVisible: boolean;
}

export const QuantityTag: React.FC<QuantityTagProps> = ({
  quantity,
  label,
  top,
  left,
  right,
  isVisible
}) => {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        top,
        left,
        right
      }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={isVisible ? { 
        opacity: 1, 
        scale: 1, 
        y: 0 
      } : { 
        opacity: 0, 
        scale: 0, 
        y: 20 
      }}
      transition={{
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1]
      }}
    >
      <div 
        className="px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm border-2"
        style={{
          backgroundColor: 'rgba(180, 212, 255, 0.95)',
          borderColor: 'var(--primary)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="text-2xl font-bold"
            style={{ color: '#1a1a1a' }}
          >
            {quantity}
          </span>
          <span 
            className="text-sm font-medium"
            style={{ color: '#1a1a1a', opacity: 0.8 }}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
