"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simuler un petit délai de chargement pour l'UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <ResponsiveSection
        as="section"
        spacing="xl"
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(to bottom right, #BADFF6, var(--background))'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: '#BADFF6' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Phone className="w-5 h-5" style={{ color: '#002236' }} />
              <span className="text-sm font-semibold" style={{ color: '#002236' }}>
                {locale === 'fr' ? 'Contact' : 'Contact'}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" 
              style={{ color: 'var(--on-secondary-container)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {locale === 'fr' ? 'Contactez-nous' : 'Contact us'}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8" 
              style={{ color: 'var(--on-secondary-container)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {locale === 'fr' 
                ? "Réservez un appel avec notre équipe pour découvrir comment Octogone peut transformer votre gestion restaurant."
                : "Book a call with our team to discover how Octogone can transform your restaurant management."}
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a 
                href="tel:+15818745990"
                className="p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: '#B8E6D5' }}
              >
                <Phone className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--on-secondary-container)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
                  581-874-5990
                </p>
              </a>

              <a 
                href="mailto:info@octogonecollectif.com"
                className="p-4 rounded-xl text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: '#E2CDED' }}
              >
                <Mail className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--on-secondary-container)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
                  info@octogonecollectif.com
                </p>
              </a>

              <div className="p-4 rounded-xl text-center" style={{ backgroundColor: '#BADFF6' }}>
                <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--on-secondary-container)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
                  Québec, Canada
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="relative h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image
              src="/restaurant2.avif"
              alt={locale === 'fr' ? 'Restaurant' : 'Restaurant'}
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </ResponsiveSection>

      {/* Calendar Section */}
      <div style={{ backgroundColor: 'var(--background)' }}>
        <ResponsiveSection
          as="section"
          spacing="xxl"
          bgColor=""
        >
          <div className="max-w-5xl mx-auto">
            {/* Calendrier HubSpot */}
          <div 
            className="rounded-2xl p-8 shadow-xl border"
            style={{ 
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--outline)'
            }}
          >
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: 'var(--on-surface)' }}
              >
                {locale === "fr" ? "Réservez votre démo" : "Book your demo"}
              </h2>
              <p 
                className="text-lg"
                style={{ color: 'var(--on-surface-variant)' }}
              >
                {locale === "fr" 
                  ? "Choisissez un créneau qui vous convient et discutons de vos besoins."
                  : "Choose a time slot that suits you and let's discuss your needs."}
              </p>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p style={{ color: 'var(--on-surface-variant)' }}>
                  {locale === "fr" ? "Chargement du calendrier..." : "Loading calendar..."}
                </p>
              </div>
            )}

            {/* HubSpot Meetings Embed */}
            {!isLoading && (
              <iframe
                src="https://meetings.hubspot.com/caroline-bourbeau/ventes-octogone?embed=true"
                style={{ 
                  minHeight: '600px', 
                  width: '100%', 
                  border: 'none',
                  borderRadius: '8px'
                }}
                title="Réserver une démo Octogone"
                loading="lazy"
              />
            )}
          </div>
          </div>
        </ResponsiveSection>
      </div>
    </main>
  );
}
