'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InlineProgressProps {
  title: string;
  duration?: number; // durée en ms (par défaut 3000ms)
}

export default function InlineProgress({ title, duration = 3000 }: InlineProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8 p-5 rounded-xl w-full"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid var(--outline)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%'
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V8L12 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h4 className="text-sm font-semibold" style={{ color: 'var(--on-surface)' }}>
          {title}
        </h4>
      </div>
      
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-variant)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ 
            background: 'linear-gradient(90deg, #BADFF6 0%, #E2CDED 100%)',
            width: `${progress}%`
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="mt-2 text-xs" style={{ color: 'var(--on-surface-variant)' }}>
        {Math.round(progress)}%
      </div>
    </motion.div>
  );
}
