/**
 * Modal pour afficher les détails d'un KPI
 */

import React from 'react';
import { X, BarChart3, TrendingUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KPIModalProps } from '../types';

export const KPIModal: React.FC<KPIModalProps> = ({
  isOpen,
  onClose,
  title,
  metric,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
          style={{ backgroundColor: 'var(--surface)' }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: 'var(--outline)' }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: 'var(--primary-container)' }}
              >
                <BarChart3 
                  className="w-6 h-6" 
                  style={{ color: 'var(--on-primary-container)' }} 
                />
              </div>
              <div>
                <h2 
                  className="text-xl font-bold"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {title}
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  Analyse détaillée - {metric}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors hover:bg-opacity-80"
              style={{ backgroundColor: 'var(--surface-variant)' }}
            >
              <X 
                className="w-5 h-5" 
                style={{ color: 'var(--on-surface-variant)' }} 
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children ? (
              children
            ) : (
              <div className="text-center py-12">
                {/* Placeholder content */}
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--surface-variant)' }}
                >
                  <TrendingUp 
                    className="w-8 h-8" 
                    style={{ color: 'var(--on-surface-variant)' }} 
                  />
                </div>
                
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Widget en développement
                </h3>
                
                <p 
                  className="text-sm mb-6 max-w-md mx-auto"
                  style={{ color: 'var(--on-surface-variant)' }}
                >
                  Ce widget détaillé sera bientôt disponible avec des graphiques, 
                  des analyses et des recommandations personnalisées.
                </p>

                {/* Preview features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  {[
                    { icon: BarChart3, title: 'Graphiques', desc: 'Visualisations interactives' },
                    { icon: TrendingUp, title: 'Tendances', desc: 'Analyse des évolutions' },
                    { icon: Info, title: 'Insights', desc: 'Recommandations IA' },
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border"
                      style={{ 
                        backgroundColor: 'var(--surface-variant)',
                        borderColor: 'var(--outline-variant)'
                      }}
                    >
                      <feature.icon 
                        className="w-6 h-6 mx-auto mb-2" 
                        style={{ color: 'var(--primary)' }} 
                      />
                      <h4 
                        className="text-sm font-medium mb-1"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {feature.title}
                      </h4>
                      <p 
                        className="text-xs"
                        style={{ color: 'var(--on-surface-variant)' }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
