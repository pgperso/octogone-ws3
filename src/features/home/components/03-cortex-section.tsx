"use client";

import React from "react";
import Image from "next/image";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import OctogoneButton from "@/components/ui/octogone-button";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ToolsAnimatedChat from "./tools-animated-chat";
import { LaptopFrame } from "@/components/ui/laptop-frame";

interface CortexIntroProps {
  locale?: string;
}

export default function CortexIntro({ locale = "fr" }: CortexIntroProps) {
  const isEnglish = locale === "en";
  const [currentKeyConcept, setCurrentKeyConcept] = React.useState<string>('');

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      <ResponsiveSection spacing="xxl" bgColor="">
        <div className="max-w-6xl mx-auto motion-container">
        {/* Logo et titre */}
        <motion.div 
          className="text-center mb-12 motion-element"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onAnimationComplete={() => {
            // Nettoyage GPU - Technique Netflix
            const element = document.querySelector('.text-center.motion-element');
            if (element) element.classList.add('animation-complete');
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image
              src="/cortex.svg"
              alt="Cortex"
              width={48}
              height={48}
              className="w-12 h-12"
            />
            <h2 
              className="text-4xl lg:text-5xl font-bold"
              style={{ color: 'var(--on-background)' }}
            >
              {isEnglish ? "Meet Cortex" : "Voici Cortex"}
            </h2>
          </div>
          
          <p 
            className="text-xl lg:text-2xl max-w-3xl mx-auto mb-8"
            style={{ color: 'var(--on-surface-variant)' }}
          >
            {isEnglish 
              ? "Your AI assistant that transforms data into decisions." 
              : "Votre assistant IA qui transforme vos données en décisions."}
          </p>

          {/* Concept clé dynamique */}
          <div className="flex justify-center items-center max-w-4xl mx-auto mb-16 min-h-[80px]">
            {currentKeyConcept && (
              <motion.div 
                key={currentKeyConcept}
                className="relative p-6 rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  backgroundColor: 'var(--secondary-container)',
                  border: '2px solid var(--outline-variant)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <p 
                  className="text-lg font-semibold text-center"
                  style={{ color: 'var(--on-secondary-container)' }}
                >
                  {currentKeyConcept}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Chat animé des outils dans un laptop */}
        <motion.div
          className="motion-element max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            const element = document.querySelector('.motion-element');
            if (element) element.classList.add('animation-complete');
          }}
        >
          <div className="mt-32 mb-32">
            <LaptopFrame>
              <div style={{ height: '600px', position: 'relative' }}>
                <ToolsAnimatedChat locale={locale} onKeyConceptChange={setCurrentKeyConcept} />
              </div>
            </LaptopFrame>
          </div>
        </motion.div>

        {/* Texte percutant sous la vidéo */}
        <motion.div 
          className="text-center mb-8 motion-element"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p 
            className="text-lg font-medium"
            style={{ color: 'var(--on-background)' }}
          >
            {isEnglish 
              ? "Instant insights. Real-time recommendations. Zero effort." 
              : "Insights instantanés. Recommandations en temps réel. Zéro effort."}
          </p>
        </motion.div>
        
        {/* CTA pour ajouter Cortex */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 motion-element"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onAnimationComplete={() => {
            // Nettoyage GPU pour boutons CTA
            const elements = document.querySelectorAll('.flex.motion-element');
            elements.forEach(el => el.classList.add('animation-complete'));
          }}
        >
          <OctogoneButton
            href={`/${locale}/cortex`}
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            {isEnglish ? "Learn more" : "En savoir plus"}
          </OctogoneButton>
          <OctogoneButton
            href={`/${locale}/contact`}
            variant="primary"
            size="lg"
            icon={<Sparkles className="w-5 h-5" />}
          >
            {isEnglish ? "Contact us" : "Nous contacter"}
          </OctogoneButton>
        </motion.div>
        </div>
      </ResponsiveSection>
    </div>
  );
}
