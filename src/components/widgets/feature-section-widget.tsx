"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Play, Zap, LineChart, Brain } from "lucide-react";
import { Tool, ToolFeature } from "@/data/tools/tools-content";
import { ResponsiveSection } from "@/components/ui/responsive-section";

interface ToolDetailWidgetProps {
  tool: Tool;
  locale: string;
}

// Configuration des concepts avec leurs couleurs et icônes
const conceptConfig = {
  operate: {
    icon: Play,
    color: '#B8E0D2',
    textColor: '#002236',
    labelFr: 'OPÉRER',
    labelEn: 'OPERATE'
  },
  automate: {
    icon: Zap,
    color: '#B4D4FF',
    textColor: '#002236',
    labelFr: 'AUTOMATISER',
    labelEn: 'AUTOMATE'
  },
  analyze: {
    icon: LineChart,
    color: '#FFE5B4',
    textColor: '#002236',
    labelFr: 'ANALYSER',
    labelEn: 'ANALYZE'
  },
  predict: {
    icon: Brain,
    color: '#C8B6FF',
    textColor: '#002236',
    labelFr: 'PRÉDIRE',
    labelEn: 'PREDICT'
  }
};

// Fonction utilitaire pour obtenir l'URL de l'image selon la langue
const getImageSrc = (image: ToolFeature['image'], isEnglish: boolean): string | null => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  return isEnglish ? image.src : (image.srcFr || image.src);
};

export default function FeatureSectionWidget({ tool, locale }: ToolDetailWidgetProps) {
  const isEnglish = locale === 'en';

  // Vérifier que les sections existent
  if (!tool.sections || tool.sections.length === 0) {
    return null;
  }

  return (
    <div className="motion-container">
      {tool.sections.map((section, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          {section.features.map((featureIndex) => {
            const feature = tool.features[featureIndex];
            if (!feature) return null;

            const layout = feature.layout || 'image-left';
            const imageSrc = getImageSrc(feature.image, isEnglish);

            // Render selon le layout
            return (
              <ResponsiveSection key={featureIndex} spacing="xl" bgColor="">
                {layout === 'full-width' && (
                  <FullWidthFeature feature={feature} isEnglish={isEnglish} />
                )}
                {(layout === 'image-left' || layout === 'image-right') && (
                  <ImageTextFeature 
                    feature={feature} 
                    isEnglish={isEnglish} 
                    imageSrc={imageSrc}
                    imageOnLeft={layout === 'image-left'}
                  />
                )}
                {layout === 'three-columns' && (
                  <ThreeColumnsFeature feature={feature} isEnglish={isEnglish} />
                )}
                {layout === 'two-columns' && (
                  <TwoColumnsFeature feature={feature} isEnglish={isEnglish} />
                )}
                {layout === 'text-only' && (
                  <TextOnlyFeature feature={feature} isEnglish={isEnglish} />
                )}
              </ResponsiveSection>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

// Composant pour full-width
function FullWidthFeature({ feature, isEnglish }: { feature: ToolFeature; isEnglish: boolean }) {
  return (
    <motion.div
      className="py-16 motion-element"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Badges de concepts */}
      {feature.concepts && feature.concepts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {feature.concepts.map((conceptId) => {
            const conceptInfo = conceptConfig[conceptId];
            if (!conceptInfo) return null;
            const ConceptIcon = conceptInfo.icon;
            return (
              <div 
                key={conceptId}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: conceptInfo.color }}
              >
                <ConceptIcon className="w-4 h-4" style={{ color: conceptInfo.textColor }} />
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

// Composant pour image + texte
function ImageTextFeature({ feature, isEnglish, imageSrc, imageOnLeft }: { 
  feature: ToolFeature; 
  isEnglish: boolean; 
  imageSrc: string | null;
  imageOnLeft: boolean;
}) {
  return (
    <motion.div 
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
          {imageSrc ? (
            <img 
              src={imageSrc}
              alt={isEnglish ? feature.titleEn : feature.titleFr}
              className="w-full h-auto"
            />
          ) : (
            <div className="bg-gradient-to-r from-marine-50 to-gold-50 p-8">
              <div className="text-center">
                <div className="text-5xl mb-2">📱</div>
                <p className="text-sm font-medium text-marine-600">
                  {isEnglish ? feature.titleEn : feature.titleFr}
                </p>
                <p className="text-xs mt-1 opacity-70 text-marine-500">(placeholder)</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Contenu */}
      <div className={`${imageOnLeft ? 'lg:order-2' : 'lg:order-1'} text-center lg:text-left`}>
        {/* Badges de concepts */}
        {feature.concepts && feature.concepts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
            {feature.concepts.map((conceptId) => {
              const conceptInfo = conceptConfig[conceptId];
              if (!conceptInfo) return null;
              const ConceptIcon = conceptInfo.icon;
              return (
                <div 
                  key={conceptId}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: conceptInfo.color }}
                >
                  <ConceptIcon className="w-4 h-4" style={{ color: conceptInfo.textColor }} />
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
        <div className="space-y-3 flex flex-col items-center lg:items-start">
          {feature.benefits.map((benefit, idx) => (
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
}

// Composant pour 3 colonnes
function ThreeColumnsFeature({ feature, isEnglish }: { feature: ToolFeature; isEnglish: boolean }) {
  return (
    <motion.div
      className="text-center md:text-left motion-element"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Badges de concepts */}
      {feature.concepts && feature.concepts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
          {feature.concepts.map((conceptId) => {
            const conceptInfo = conceptConfig[conceptId];
            if (!conceptInfo) return null;
            const ConceptIcon = conceptInfo.icon;
            return (
              <div 
                key={conceptId}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: conceptInfo.color }}
              >
                <ConceptIcon className="w-4 h-4" style={{ color: conceptInfo.textColor }} />
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
}

// Composant pour 2 colonnes (à implémenter)
function TwoColumnsFeature({ feature, isEnglish }: { feature: ToolFeature; isEnglish: boolean }) {
  // TODO: Implémenter le layout 2 colonnes
  return (
    <div className="text-center p-8">
      <p className="text-sm text-gray-500">Layout 2 colonnes - À implémenter</p>
      <p className="text-xs text-gray-400 mt-2">{isEnglish ? feature.titleEn : feature.titleFr}</p>
    </div>
  );
}

// Composant pour texte seul (à implémenter)
function TextOnlyFeature({ feature, isEnglish }: { feature: ToolFeature; isEnglish: boolean }) {
  // TODO: Implémenter le layout texte seul
  return (
    <div className="text-center p-8">
      <p className="text-sm text-gray-500">Layout texte seul - À implémenter</p>
      <p className="text-xs text-gray-400 mt-2">{isEnglish ? feature.titleEn : feature.titleFr}</p>
    </div>
  );
}
