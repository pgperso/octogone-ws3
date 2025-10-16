"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ConceptFeature } from "@/data/features/features-content";
import { OctogoneButton } from "@/components/ui/octogone-button";

interface FeatureDetailWidgetProps {
  concept: ConceptFeature;
  locale: string;
}

// Variants d'animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function FeatureDetailWidget({ concept, locale }: FeatureDetailWidgetProps) {
  const isEnglish = locale === 'en';
  const content = isEnglish ? concept.contentEn : concept.contentFr;

  // Diviser le contenu en paragraphes
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className="max-w-4xl mx-auto motion-container">
      <motion.div 
        className="prose prose-lg motion-element" 
        style={{ color: 'var(--on-surface)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        onAnimationComplete={() => {
          // Nettoyage GPU - Technique Netflix
          const element = document.querySelector('.prose.motion-element');
          if (element) element.classList.add('animation-complete');
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <motion.p 
            key={index} 
            className="text-lg leading-relaxed mb-6"
            style={{ color: 'var(--on-surface-variant)' }}
            variants={fadeInUp}
          >
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
      
      {/* CTA optionnel */}
      {concept.ctaLink && concept.ctaLabelFr && concept.ctaLabelEn && (
        <>
          {/* Séparateur */}
          <motion.div 
            className="my-12 flex items-center gap-4 motion-element"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => {
              // Nettoyage GPU pour séparateur
              const separators = document.querySelectorAll('.flex.motion-element');
              separators.forEach(el => el.classList.add('animation-complete'));
            }}
          >
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
            <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish ? 'Discover Octogone\'s new AI' : 'Découvrez le nouvel IA d\'Octogone'}
            </div>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
          </motion.div>
          
          {/* Description */}
          <motion.p 
            className="text-center text-base mb-6 max-w-2xl mx-auto motion-element" 
            style={{ color: 'var(--on-surface-variant)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onAnimationComplete={() => {
              // Nettoyage GPU pour description
              const descriptions = document.querySelectorAll('p.motion-element');
              descriptions.forEach(el => el.classList.add('animation-complete'));
            }}
          >
            {isEnglish 
              ? 'Cortex is our AI agent, available in beta. Explore how artificial intelligence can help you make better decisions.'
              : 'Cortex est notre agent IA, disponible en version bêta. Explorez comment l\'intelligence artificielle peut vous aider à prendre de meilleures décisions.'
            }
          </motion.p>
          
          {/* Bouton */}
          <motion.div 
            className="text-center motion-element"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onAnimationComplete={() => {
              // Nettoyage final pour bouton CTA
              const ctaElements = document.querySelectorAll('.text-center.motion-element');
              ctaElements.forEach(el => el.classList.add('animation-complete'));
            }}
          >
            <OctogoneButton
              href={`/${locale}${concept.ctaLink}`}
              variant="cortex"
              size="lg"
              icon={
                <Image 
                  src="/cortex.svg" 
                  alt="Cortex" 
                  width={20} 
                  height={20}
                  className="inline-block"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(3207%) hue-rotate(167deg) brightness(96%) contrast(101%)'
                  }}
                />
              }
            >
              {isEnglish ? concept.ctaLabelEn : concept.ctaLabelFr}
            </OctogoneButton>
          </motion.div>
        </>
      )}
    </div>
  );
}
