'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface KeyConceptsDisplayProps {
  locale: string;
}

const KEY_CONCEPTS_FR = [
  'Discutez naturellement',
  'Visualisez vos résultats',
  'Comparez vos performances',
  'Générez des documents',
  'Commandez des tutoriels',
  'Posez des actions'
];

const KEY_CONCEPTS_EN = [
  'Chat naturally',
  'Visualize your results',
  'Compare your performance',
  'Generate documents',
  'Request tutorials',
  'Take actions'
];

export default function KeyConceptsDisplay({ locale }: KeyConceptsDisplayProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const concepts = locale === 'en' ? KEY_CONCEPTS_EN : KEY_CONCEPTS_FR;

  useEffect(() => {
    // Afficher les concepts un par un avec un délai de 800ms entre chaque
    const timers: NodeJS.Timeout[] = [];
    
    concepts.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleCount(index + 1);
      }, index * 800); // 800ms entre chaque concept
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [concepts]);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={
              index < visibleCount
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.8, y: -10 }
            }
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)',
              color: 'var(--on-background)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            {concept}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
