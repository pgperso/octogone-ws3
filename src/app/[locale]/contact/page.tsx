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
      if ((window as any).HubSpotConversations) {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Téléphone */}
            <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/50">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2 text-blue-900">
                {locale === "fr" ? "Téléphone" : "Phone"}
              </h3>
              <a 
                href="tel:+15818745990" 
                className="text-blue-700 hover:text-blue-900 transition-colors font-semibold"
              >
                581-874-5990
              </a>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-green-50 to-green-100">
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/50">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2 text-green-900">
                Email
              </h3>
              <a 
                href="mailto:info@octogonecollectif.com" 
                className="text-green-700 hover:text-green-900 transition-colors text-sm"
              >
                info@octogonecollectif.com
              </a>
            </div>

            {/* Adresse */}
            <div className="p-6 rounded-2xl text-center bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white/50">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2 text-purple-900">
                {locale === "fr" ? "Adresse" : "Address"}
              </h3>
              <p className="text-purple-700 text-sm">
                Québec, Canada
              </p>
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
