"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Play, Zap, LineChart, Brain } from "lucide-react";
import { Tool } from "@/data/tools/tools-content";

interface ToolDetailWidgetProps {
  tool: Tool;
  locale: string;
}

// Configuration des concepts avec leurs couleurs et icônes
const conceptConfig = {
  operate: {
    icon: Play,
    color: '#B8E0D2', // Vert menthe pastel
    textColor: '#002236',
    labelFr: 'OPÉRER',
    labelEn: 'OPERATE'
  },
  automate: {
    icon: Zap,
    color: '#B4D4FF', // Bleu ciel pastel
    textColor: '#002236',
    labelFr: 'AUTOMATISER',
    labelEn: 'AUTOMATE'
  },
  analyze: {
    icon: LineChart,
    color: '#FFE5B4', // Jaune pastel
    textColor: '#002236',
    labelFr: 'ANALYSER',
    labelEn: 'ANALYZE'
  },
  predict: {
    icon: Brain,
    color: '#C8B6FF', // Mauve pastel
    textColor: '#002236',
    labelFr: 'PRÉDIRE',
    labelEn: 'PREDICT'
  }
};

// Fonction utilitaire pour créer les groupes de features
const createFeatureGroups = (features: number[]): { type: 'single' | 'triple', features: number[] }[] => {
  const groups: { type: 'single' | 'triple', features: number[] }[] = [];
  let i = 0;
  
  while (i < features.length) {
    // Feature 1 : single
    if (i < features.length) {
      groups.push({ type: 'single', features: [features[i]] });
      i++;
    }
    
    // Feature 2 : single
    if (i < features.length) {
      groups.push({ type: 'single', features: [features[i]] });
      i++;
    }
    
    // Features 3-4-5 : triple (si on a au moins 3 features)
    if (i + 2 < features.length) {
      groups.push({ type: 'triple', features: [features[i], features[i + 1], features[i + 2]] });
      i += 3;
    } else {
      // Moins de 3 features restantes, faire des singles
      while (i < features.length) {
        groups.push({ type: 'single', features: [features[i]] });
        i++;
      }
    }
  }
  
  return groups;
};

export default function ToolDetailWidget({ tool, locale }: ToolDetailWidgetProps) {
  const isEnglish = locale === 'en';

  // Vérifier que les sections existent
  if (!tool.sections || tool.sections.length === 0) {
    return null;
  }

  // Layout avec sections et concepts
  return (
    <div className="max-w-6xl mx-auto space-y-8 motion-container">
      {tool.sections.map((section, sectionIndex) => {
        
        return (
          <React.Fragment key={sectionIndex}>
            {/* Section de features */}
            <div>
              {/* Appliquer le pattern à TOUTES les features */}
              {section.features.length > 0 && (
                <>
                  {(() => {
                    const groups = createFeatureGroups(section.features);
                    let imageCounter = 0;
                    
                    return (
                      <div className="space-y-16">
                        {groups.map((group, groupIdx) => {
                          
                          if (group.type === 'triple') {
                            // Groupe de 3 features SANS IMAGE en colonnes (juste texte)
                            return (
                              <motion.div
                                key={`triple-${groupIdx}`} 
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 py-32 motion-element"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                              >
                                {group.features.map((featureIndex) => {
                                  const feature = tool.features[featureIndex];
                                  if (!feature) return null;
                                  
                                  return (
                                    <motion.div key={featureIndex} className="flex flex-col motion-element"
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.6 }}
                                    >
                                      {/* Badges de concepts */}
                                      {feature.concepts && feature.concepts.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                          {feature.concepts.map((conceptId) => {
                                            const conceptInfo = conceptConfig[conceptId];
                                            if (!conceptInfo) return null;
                                            
                                            const ConceptIconBadge = conceptInfo.icon;
                                            return (
                                              <div 
                                                key={conceptId}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                                                style={{ backgroundColor: conceptInfo.color }}
                                              >
                                                <ConceptIconBadge className="w-4 h-4" style={{ color: conceptInfo.textColor }} />
                                                <span className="text-xs font-bold" style={{ color: conceptInfo.textColor }}>
                                                  {isEnglish ? conceptInfo.labelEn : conceptInfo.labelFr}
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                      <h4 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'var(--on-surface)' }}>
                                        {isEnglish ? feature.titleEn : feature.titleFr}
                                      </h4>
                                      <p className="text-base mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                                        {isEnglish ? feature.descriptionEn : feature.descriptionFr}
                                      </p>
                                      <div className="space-y-3">
                                        {feature.benefits.map((benefit, idx) => (
                                          <div key={idx} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--secondary)' }} />
                                            <span className="text-base" style={{ color: 'var(--on-surface)' }}>
                                              {isEnglish ? benefit.en : benefit.fr}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            );
                          }
                          
                          // Feature seule avec image (alternance gauche/droite)
                          const singleFeature = tool.features[group.features[0]];
                          if (!singleFeature) return null;
                          
                          const imageOnLeft = imageCounter % 2 === 0;
                          imageCounter++;
                          
                          return (
                            <motion.div 
                              key={`single-${groupIdx}`} 
                              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center motion-element"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Image */}
                              <div className={imageOnLeft ? 'lg:order-1' : 'lg:order-2'}>
                                <motion.div
                                  className="bg-gradient-to-r from-marine-50 to-gold-50 rounded-2xl p-8 motion-element shadow-lg border border-gray-200"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                  <motion.div 
                                    className="text-center motion-element"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                  >
                                    <div className="text-5xl mb-2" role="img" aria-label="Mobile device">📱</div>
                                    <p className="text-sm font-medium text-marine-600">
                                      {isEnglish ? singleFeature.titleEn : singleFeature.titleFr}
                                    </p>
                                    <p className="text-xs mt-1 opacity-70 text-marine-500">(placeholder)</p>
                                  </motion.div>
                                </motion.div>
                              </div>
                              
                              {/* Contenu */}
                              <div className={imageOnLeft ? 'lg:order-2' : 'lg:order-1'}>
                                {/* Badges de concepts */}
                                {singleFeature.concepts && singleFeature.concepts.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {singleFeature.concepts?.map((conceptId) => {
                                      const conceptInfo = conceptConfig[conceptId];
                                      if (!conceptInfo) return null;
                                      
                                      const ConceptIconBadge = conceptInfo.icon;
                                      return (
                                        <div 
                                          key={conceptId}
                                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                                          style={{ backgroundColor: conceptInfo.color }}
                                        >
                                          <ConceptIconBadge className="w-4 h-4" style={{ color: conceptInfo.textColor }} />
                                          <span className="text-xs font-bold" style={{ color: conceptInfo.textColor }}>
                                            {isEnglish ? conceptInfo.labelEn : conceptInfo.labelFr}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                                <h4 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'var(--on-surface)' }}>
                                  {isEnglish ? singleFeature.titleEn : singleFeature.titleFr}
                                </h4>
                                <p className="text-base mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                                  {isEnglish ? singleFeature.descriptionEn : singleFeature.descriptionFr}
                                </p>
                                <div className="space-y-3">
                                  {singleFeature.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--secondary)' }} />
                                      <span className="text-base" style={{ color: 'var(--on-surface)' }}>
                                        {isEnglish ? benefit.en : benefit.fr}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
