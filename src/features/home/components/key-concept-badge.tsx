"use client";

import { motion } from "framer-motion";

interface KeyConceptBadgeProps {
  concept: string;
}

export default function KeyConceptBadge({ concept }: KeyConceptBadgeProps) {
  return (
    <motion.div 
      key={concept}
      className="relative px-6 py-3 rounded-xl"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
        border: '2px solid white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        minWidth: '280px',
        width: '280px'
      }}
    >
      <p 
        className="text-sm font-semibold text-center"
        style={{ 
          color: 'var(--on-background)',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {concept}
      </p>
    </motion.div>
  );
}
