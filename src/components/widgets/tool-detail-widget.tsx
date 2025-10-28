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

// Fonction utilitaire pour grouper les features selon leur layout
const groupFeaturesByLayout = (features: number[], tool: Tool): { type: 'full-width' | 'image-text' | 'three-columns', features: number[] }[] => {
  const groups: { type: 'full-width' | 'image-text' | 'three-columns', features: number[] }[] = [];
  let i = 0;
  
  while (i < features.length) {
    const feature = tool.features[features[i]];
    const layout = feature?.layout || 'image-text'; // Par défaut: image-text
    
    if (layout === 'three-columns') {
      // Grouper jusqu'à 3 features consécutives avec layout three-columns
      const threeColFeatures = [features[i]];
      i++;
      
      while (i < features.length && threeColFeatures.length < 3) {
        const nextFeature = tool.features[features[i]];
        if (nextFeature?.layout === 'three-columns') {
          threeColFeatures.push(features[i]);
          i++;
        } else {
          break;
        }
      }
      
      groups.push({ type: 'three-columns', features: threeColFeatures });
    } else {
      // full-width ou image-text : une feature par groupe
      groups.push({ type: layout, features: [features[i]] });
      i++;
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

  // Compteur global pour l'alternance des images entre toutes les sections
  let globalImageCounter = 0;

  // Layout avec sections et concepts
  return (
    <div className="max-w-7xl mx-auto space-y-8 motion-container">
      {tool.sections.map((section, sectionIndex) => {
        
        return (
          <React.Fragment key={sectionIndex}>
            {/* Section de features */}
            <div>
              {/* Appliquer le pattern à TOUTES les features */}
              {section.features.length > 0 && (
                <>
                  {(() => {
                    const groups = groupFeaturesByLayout(section.features, tool);
                    
                    return (
                      <div className="space-y-16">
                        {groups.map((group, groupIdx) => {
                          
                          // Vérifier si c'est une feature full-width
                          if (group.type === 'full-width') {
                            const feature = tool.features[group.features[0]];
                            if (feature) {
                              return (
                                <motion.div
                                  key={`full-width-${groupIdx}`}
                                  className="py-16 motion-element"
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                  {/* Badges de concepts - centrés */}
                                  {feature.concepts && feature.concepts.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
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
                                  
                                  <h4 className="text-3xl lg:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--on-surface)' }}>
                                    {isEnglish ? feature.titleEn : feature.titleFr}
                                  </h4>
                                  
                                  <div className="max-w-4xl mx-auto">
                                    <p className="text-base mb-6 text-center" style={{ color: 'var(--on-surface-variant)' }}>
                                      {isEnglish ? feature.descriptionEn : feature.descriptionFr}
                                    </p>
                                    
                                    {feature.benefits && feature.benefits.length > 0 && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                                        {feature.benefits.map((benefit, idx) => (
                                          <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-surface-container mx-auto md:mx-0 max-w-md md:max-w-none">
                                            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--secondary)' }} />
                                            <span className="text-base" style={{ color: 'var(--on-surface)' }}>
                                              {isEnglish ? benefit.en : benefit.fr}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              );
                            }
                          }
                          
                          if (group.type === 'three-columns') {
                            // Groupe de features en 3 colonnes (juste texte, pas d'images)
                            return (
                              <motion.div
                                key={`three-columns-${groupIdx}`} 
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
                                    <motion.div key={featureIndex} className="flex flex-col motion-element text-center md:text-left"
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.6 }}
                                    >
                                      {/* Badges de concepts */}
                                      {feature.concepts && feature.concepts.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
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
                                      <div className="space-y-3 flex flex-col items-center md:items-start">
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
                          
                          // Feature avec image et texte (alternance gauche/droite)
                          const imageTextFeature = tool.features[group.features[0]];
                          if (!imageTextFeature) return null;
                          
                          const imageOnLeft = globalImageCounter % 2 === 0;
                          globalImageCounter++;
                          
                          return (
                            <motion.div 
                              key={`image-text-${groupIdx}`} 
                              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center motion-element"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                            >
                              {/* Image */}
                              <div className={imageOnLeft ? 'lg:order-1' : 'lg:order-2'}>
                                <motion.div
                                  className="rounded-2xl motion-element shadow-lg overflow-hidden"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                  {/* Images bilingues pour catalogues et simulateur */}
                                  {(imageTextFeature.titleEn === 'Centralized Product Catalog' || imageTextFeature.titleFr === 'Catalogue centralisé de produits') ? (
                                    <img 
                                      src={isEnglish ? '/images/pages/product_list_en.avif' : '/images/pages/product_list_fr.avif'}
                                      alt={isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                      className="w-full h-auto"
                                    />
                                  ) : (imageTextFeature.titleEn === 'Centralized Recipe Catalog' || imageTextFeature.titleFr === 'Catalogue centralisé de recettes') ? (
                                    <img 
                                      src={isEnglish ? '/images/pages/recipe_list_en.avif' : '/images/pages/recipe_list_fr.avif'}
                                      alt={isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                      className="w-full h-auto"
                                    />
                                  ) : (imageTextFeature.titleEn === 'Food Cost Simulator' || imageTextFeature.titleFr === 'Simulateur de Food Cost') ? (
                                    <img 
                                      src={isEnglish ? '/images/pages/food_cost_simulator_en.avif' : '/images/pages/food_cost_simulator_fr.avif'}
                                      alt={isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                      className="w-full h-auto"
                                    />
                                  ) : (imageTextFeature.titleEn === 'Complete Recipe Sheets' || imageTextFeature.titleFr === 'Fiches recettes complètes') ? (
                                    <img 
                                      src={isEnglish ? '/images/pages/recipe_sheet_en.avif' : '/images/pages/recipe_sheet_fr.avif'}
                                      alt={isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                      className="w-full h-auto"
                                    />
                                  ) : (
                                    /* Placeholder pour les autres features */
                                    <div className="bg-gradient-to-r from-marine-50 to-gold-50 p-8">
                                      <motion.div 
                                        className="text-center motion-element"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                      >
                                        <div className="text-5xl mb-2" role="img" aria-label="Mobile device">📱</div>
                                        <p className="text-sm font-medium text-marine-600">
                                          {isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                        </p>
                                        <p className="text-xs mt-1 opacity-70 text-marine-500">(placeholder)</p>
                                      </motion.div>
                                    </div>
                                  )}
                                </motion.div>
                              </div>
                              
                              {/* Contenu */}
                              <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'} text-center lg:text-left`}>
                                {/* Badges de concepts */}
                                {imageTextFeature.concepts && imageTextFeature.concepts.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                                    {imageTextFeature.concepts?.map((conceptId) => {
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
                                  {isEnglish ? imageTextFeature.titleEn : imageTextFeature.titleFr}
                                </h4>
                                <p className="text-base mb-6" style={{ color: 'var(--on-surface-variant)' }}>
                                  {isEnglish ? imageTextFeature.descriptionEn : imageTextFeature.descriptionFr}
                                </p>
                                <div className="space-y-3 flex flex-col items-center lg:items-start">
                                  {imageTextFeature.benefits.map((benefit, idx) => (
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
