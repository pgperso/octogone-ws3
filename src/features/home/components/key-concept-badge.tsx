"use client";

import { motion } from "framer-motion";

interface KeyConceptBadgeProps {
  concept: string;
}

export default function KeyConceptBadge({ concept }: KeyConceptBadgeProps) {
  return (
    <motion.div 
      key={concept}
      className="relative px-8 py-4 rounded-2xl"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ 
        background: 'linear-gradient(135deg, rgba(186, 223, 246, 0.3) 0%, rgba(226, 205, 237, 0.3) 100%)',
        border: '2px solid rgba(186, 223, 246, 0.5)',
        boxShadow: '0 8px 24px rgba(186, 223, 246, 0.2), 0 0 40px rgba(226, 205, 237, 0.15)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <p 
        className="text-base md:text-lg font-bold text-center whitespace-nowrap"
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
