"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Charger le script HubSpot Meetings
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      // Initialiser le widget HubSpot
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).HubSpotConversations) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).HubSpotConversations.widget.load();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-marine-50 to-white">
      {/* Hero Section */}
      <ResponsiveSection spacing="xl" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-marine-900/5 to-gold-500/5"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-marine-900 mb-6">
            {locale === "fr" ? "Contactez-nous" : "Contact us"}
          </h1>
          <p className="text-xl lg:text-2xl text-marine-700 max-w-3xl mx-auto mb-8">
            {locale === "fr" 
              ? "Réservez un appel avec notre équipe pour découvrir comment Octogone peut transformer votre gestion."
              : "Book a call with our team to discover how Octogone can transform your management."}
          </p>
        </div>
      </ResponsiveSection>

      {/* Contact Info */}
      <ResponsiveSection spacing="lg">
        <div className="max-w-4xl mx-auto">
          {/* Section d'introduction colorée */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#B8E6D5' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <Phone className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Service humain et rapide" : "Human and fast service"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Notre équipe vous accompagne et facilite votre quotidien" : "Our team supports you and simplifies your daily operations"}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#BADFF6' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <Mail className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Démo sur mesure" : "Custom demo"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Voyez Octogone en action" : "See Octogone in action"}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#E2CDED' }}>
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <MapPin className="w-8 h-8" style={{ color: 'var(--on-secondary-container)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "À l'écoute de vos besoins" : "Listening to your needs"}
              </h3>
              <p className="text-sm" style={{ color: 'var(--on-secondary-container)' }}>
                {locale === "fr" ? "Nous comprenons votre réalité et nous adaptons à vos défis" : "We understand your reality and adapt to your challenges"}
              </p>
            </div>
          </div>

          {/* Numéro de téléphone en évidence */}
          <div className="mb-8">
            <div className="flex items-center justify-center bg-gradient-to-r from-primary_color to-gold-400 px-8 py-6 rounded-xl shadow-lg">
              <Phone className="w-8 h-8 text-marine-900 mr-4" />
              <div className="text-center">
                <p className="text-marine-900 text-sm font-medium mb-1">
                  {locale === "fr" ? "Appelez-nous directement" : "Call us directly"}
                </p>
                <a 
                  href="tel:+15818745990" 
                  className="text-marine-900 text-3xl font-bold hover:text-marine-700 transition-colors"
                >
                  581-874-5990
                </a>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveSection>

      {/* Calendrier HubSpot */}
      <ResponsiveSection spacing="xl">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 bg-white shadow-xl border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-marine-900 mb-4">
                {locale === "fr" ? "Réservez votre démo" : "Book your demo"}
              </h2>
              <p className="text-lg text-marine-700">
                {locale === "fr" 
                  ? "Choisissez un créneau qui vous convient et discutons de vos besoins."
                  : "Choose a time slot that suits you and let's discuss your needs."}
              </p>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">
                  {locale === "fr" ? "Chargement du calendrier..." : "Loading calendar..."}
                </p>
              </div>
            )}

            {/* HubSpot Meetings Embed */}
            <div 
              className="meetings-iframe-container" 
              data-src="https://meetings.hubspot.com/caroline-bourbeau/ventes-octogone?embed=true"
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>
      </ResponsiveSection>
    </main>
  );
}
