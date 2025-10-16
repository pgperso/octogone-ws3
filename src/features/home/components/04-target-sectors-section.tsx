"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { OctogoneButton } from "@/components/ui/octogone-button";
import Image from "next/image";
import { targetSectors, restaurantStyles } from "@/data/sectors-data";
import { testimonials } from "@/data/testimonials-data";
import TestimonialWidget from "@/components/widgets/testimonial-widget";
import { motion } from "framer-motion";

/**
 * Section des secteurs cibles d'Octogone
 */
const TargetSectors = () => {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'business' | 'styles' | 'testimonials'>('business');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState<number>(650);

  // Auto-rotation du carrousel de témoignages (simple boucle)
  React.useEffect(() => {
    if (activeTab === 'testimonials') {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000); // Change toutes les 5 secondes

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Calculer la hauteur maximale des cartes de témoignages
  React.useEffect(() => {
    if (activeTab === 'testimonials') {
      // Attendre que le DOM soit rendu
      setTimeout(() => {
        const cards = document.querySelectorAll('[data-testimonial-card]');
        let maxHeight = 650;
        cards.forEach((card) => {
          const height = (card as HTMLElement).offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });
        setCarouselHeight(maxHeight);
      }, 100);
    }
  }, [activeTab, currentTestimonial]);

  // Données à afficher selon l'onglet actif (seulement pour les cartes)
  const currentData = activeTab === 'business' ? targetSectors : restaurantStyles;

  // Couleurs de fond selon le toggle actif
  const getBackgroundStyle = () => {
    switch (activeTab) {
      case 'business':
        return { background: 'radial-gradient(ellipse at top left, #B8E0D2 0%, #A5D6CC 25%, #B8E0D2 50%, #9BCCC4 75%, #B8E0D2 100%)' }; // Vert pastel
      case 'styles':
        return { background: 'radial-gradient(ellipse at top left, #B4D4FF 0%, #A1C7FF 25%, #B4D4FF 50%, #8EBAFF 75%, #B4D4FF 100%)' }; // Bleu pastel
      case 'testimonials':
        return { background: 'radial-gradient(ellipse at top left, #BADFF6 0%, #A7D6F3 25%, #BADFF6 50%, #94CDF0 75%, #BADFF6 100%)' }; // Secondary color (bleu Cortex)
      default:
        return { background: 'radial-gradient(ellipse at top left, #e5f1ff 0%, #ddeeff 25%, #e5f1ff 50%, #d5ebff 75%, #e5f1ff 100%)' };
    }
  };

  // Couleur du bouton selon le toggle actif
  const getButtonColor = () => {
    switch (activeTab) {
      case 'business':
        return '#B8E0D2'; // Vert pastel
      case 'styles':
        return '#B4D4FF'; // Bleu pastel
      case 'testimonials':
        return '#BADFF6'; // Secondary color (bleu Cortex)
      default:
        return '#e5f1ff';
    }
  };

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-8" style={{ backgroundColor: 'var(--background)' }}>
      <ResponsiveSection
        as="section"
        spacing="xxl"
        className="relative overflow-hidden transition-all duration-500 ease-out rounded-2xl"
        style={getBackgroundStyle()}
      >
      {/* Fond décoratif avec octogones en filigrane */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-marine-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gold-500 rounded-full blur-3xl"></div>
      </div>

      {/* Logo en arrière-plan */}
      <div className="absolute -bottom-[500px] -right-[500px] w-[1400px] h-[1400px] opacity-20">
        <Image
          src="/logo_octogone.svg"
          alt="Octogone Logo"
          width={1400}
          height={1400}
          className="object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      <div className="relative z-10">
        {/* En-tête de section */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8" style={{ color: 'var(--on-secondary-container)' }}>
            {locale === "fr" ? "Connecté à votre modèle d'affaires" : "Connected to your business model"}
          </h2>

          {/* Toggle Switch */}
          <div className="inline-flex gap-2">
            <button
              onClick={() => setActiveTab('business')}
              className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 cursor-pointer hover:bg-opacity-80"
              style={{
                backgroundColor: activeTab === 'business' ? '#f3f4f6' : 'transparent',
                color: activeTab === 'business' ? 'black' : 'black'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'business') {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'business') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {locale === "fr" ? "Types d'entreprises" : "Business Types"}
            </button>
            <button
              onClick={() => setActiveTab('styles')}
              className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 cursor-pointer hover:bg-opacity-80"
              style={{
                backgroundColor: activeTab === 'styles' ? '#f3f4f6' : 'transparent',
                color: activeTab === 'styles' ? 'black' : 'black'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'styles') {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'styles') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {locale === "fr" ? "Styles de restaurants" : "Restaurant Styles"}
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className="px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300 cursor-pointer hover:bg-opacity-80"
              style={{
                backgroundColor: activeTab === 'testimonials' ? '#f3f4f6' : 'transparent',
                color: activeTab === 'testimonials' ? 'black' : 'black'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'testimonials') {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'testimonials') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {locale === "fr" ? "Témoignages" : "Testimonials"}
            </button>
          </div>
        </motion.div>

        {/* Conteneur avec hauteur fixe basée sur la section témoignages */}
        <div className="relative min-h-[650px] lg:min-h-[770px]">
          {/* Affichage conditionnel : Grille ou Carrousel */}
          {activeTab === 'testimonials' ? (
            /* Carrousel de cartes de témoignages */
            <div className="relative flex flex-col">
            {/* Conteneur du carrousel avec hauteur dynamique */}
            <div className="overflow-hidden" style={{ minHeight: `${carouselHeight}px` }}>
              <div 
                className="flex transition-transform duration-800 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)`, minHeight: `${carouselHeight}px` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4" style={{ minHeight: `${carouselHeight}px` }}>
                    <div className="w-full h-full flex items-stretch" data-testimonial-card>
                      <TestimonialWidget
                        testimonial={testimonial}
                        locale={locale}
                        className="w-full"
                        showTitle={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contrôles et indicateurs en bas */}
            <div className="flex items-center justify-center gap-6 mt-8">
              {/* Contrôle gauche */}
              <button
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
              >
                <svg className="w-6 h-6 text-marine-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicateurs */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className="w-3 h-3 rounded-full transition-colors cursor-pointer"
                    style={{
                      backgroundColor: index === currentTestimonial ? '#000000' : '#ffffff'
                    }}
                  />
                ))}
              </div>

              {/* Contrôle droit */}
              <button
                onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-lg cursor-pointer"
              >
                <svg className="w-6 h-6 text-marine-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          ) : (
            /* Grille des secteurs */
            <div className="h-full flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentData.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <Link
                key={sector.id}
                href={`/${locale}/secteurs/${sector.id}`}
                className={`
                  relative group cursor-pointer transform transition-all duration-300 ease-out
                  hover:scale-105 hover:-translate-y-2 block
                  ${hoveredSector === sector.id ? 'z-10' : 'z-0'}
                `}
                onMouseEnter={() => setHoveredSector(sector.id)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                {/* Carte principale */}
                <div className="relative h-48 lg:h-56 rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-300 ease-out group-hover:shadow-xl flex flex-col justify-end p-6">
                  {/* Image de fond */}
                  {sector.image && (
                    <Image
                      src={sector.image}
                      alt={locale === "fr" ? sector.titleFr : sector.titleEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                  
                  {/* Contenu de la carte - État normal */}
                  <div className="relative z-10 text-center transition-all duration-300 ease-out group-hover:opacity-0 group-hover:translate-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-white">
                      {locale === "fr" ? sector.titleFr : sector.titleEn}
                    </h3>
                  </div>

                  {/* Contenu de la carte - État hover */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-center">
                      <div 
                        className="rounded-md px-6 py-3 shadow-lg transform-gpu" 
                        style={{ 
                          backgroundColor: getButtonColor(),
                          backfaceVisibility: 'hidden',
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale'
                        }}
                      >
                        <span className="text-black font-semibold text-sm antialiased">
                          {locale === "fr" ? "En savoir plus" : "Learn more"}
                        </span>
                        <svg className="inline-block ml-2 w-5 h-5 text-black transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Indicateur de sélection */}
                <div 
                  className={`
                    absolute -bottom-2 left-1/2 transform -translate-x-1/2
                    w-8 h-1 rounded-full shadow-lg transition-all duration-300
                    ${hoveredSector === sector.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}
                  style={{ backgroundColor: '#dcb26b' }}
                ></div>
              </Link>
              </motion.div>
            ))}
              </div>
              
              {/* Paragraphe d'encouragement pour Types et Styles */}
              <div className="mt-12 text-center max-w-3xl mx-auto">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: 'var(--on-secondary-container)' }}>
                  {locale === "fr" ? "Est-ce qu'Octogone s'adresse à mon entreprise ?" : "Is Octogone right for my business?"}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--on-secondary-container)' }}>
                  {locale === "fr" ? (
                    <>
                      Octogone s&rsquo;adapte à tous les types d&rsquo;établissements et de modèles d&rsquo;affaires. 
                      Si vous pensez que notre solution pourrait vous être utile, 
                      <span className="font-semibold"> n&rsquo;hésitez pas à contacter notre service à la clientèle</span> 
                      {" "}pour discuter de vos besoins spécifiques.
                    </>
                  ) : (
                    <>
                      Octogone adapts to all types of establishments and business models. 
                      If you think our solution could be useful to you, 
                      <span className="font-semibold"> don&rsquo;t hesitate to contact our customer service</span> 
                      {" "}to discuss your specific needs.
                    </>
                  )}
                </p>
                
                {/* Bouton Nous contacter */}
                <div className="mt-8">
                  <OctogoneButton
                    href={`/${locale}/contact`}
                    variant="primary"
                    size="lg"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    }
                  >
                    {locale === "fr" ? "Nous contacter" : "Contact us"}
                  </OctogoneButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ResponsiveSection>
    </div>
  );
};

export default TargetSectors;
