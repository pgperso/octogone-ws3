"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { OctogoneButton } from "./octogone-button";
import { Globe, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { HubSpotMeetingModal } from "@/components/hubspot/meeting-modal";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  const [isDemoModalOpen, setIsDemoModalOpen] = React.useState(false);
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full", className)} style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}>
      <div className="w-full px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-[1800px] mx-auto">
          {/* 1. Logo et baseline */}
          <div className="flex flex-col space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                src="/images/partners/logo_octogne_full.png"
                alt="Octogone"
                width={120}
                height={35}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <p className="mt-2 max-w-xs" style={{ color: 'var(--on-surface-variant)' }}>
              {locale === "fr" ? 
                "Opérer, Automatiser, Analyser, Prédire" : 
                "Operate, Automate, Analyze, Predict"}
            </p>
          </div>

          {/* 2. Navigation - Outils */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              {locale === "fr" ? "Outils" : "Tools"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/fonctionnalites/inventaire`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Inventaire" : "Inventory"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fonctionnalites/food-cost`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Food Cost" : "Food Cost"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fonctionnalites/iot`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "IoT" : "IoT"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fonctionnalites/ressources-humaines`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Ressources Humaines" : "Human Resources"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Navigation - Concepts */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              {locale === "fr" ? "Concepts" : "Concepts"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/features/operate`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Opérer" : "Operate"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/features/automate`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Automatiser" : "Automate"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/features/analyze`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Analyser" : "Analyze"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/features/predict`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Prédire" : "Predict"}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Navigation - Entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              {locale === "fr" ? "Entreprise" : "Company"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/cortex`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Cortex IA" : "Cortex AI"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/forfaits`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Tarifs" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>



        </div>

        {/* Newsletter Section */}
        <div className="mt-12 py-8 px-6 rounded-2xl max-w-[1800px] mx-auto" style={{ background: 'linear-gradient(135deg, #BADFF6 0%, #B8E6D5 100%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--on-secondary-container)' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--on-secondary-container)' }}>
              {locale === "fr" ? "Restez informé" : "Stay informed"}
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--on-secondary-container)' }}>
              {locale === "fr" 
                ? "Recevez nos dernières actualités, conseils et meilleures pratiques pour optimiser votre gestion restaurant."
                : "Receive our latest news, tips and best practices to optimize your restaurant management."}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={locale === "fr" ? "Votre email" : "Your email"}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                style={{ color: '#002236' }}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-marine-900 text-white rounded-lg font-semibold hover:bg-marine-800 transition-colors whitespace-nowrap"
              >
                {locale === "fr" ? "S'abonner" : "Subscribe"}
              </button>
            </form>
            
            <p className="text-xs mt-3 opacity-80" style={{ color: 'var(--on-secondary-container)' }}>
              {locale === "fr" 
                ? "Nous respectons votre vie privée. Désabonnez-vous à tout moment."
                : "We respect your privacy. Unsubscribe at any time."}
            </p>
          </div>
        </div>

        {/* Call to Action secondaire */}
        <div className="mt-12 py-6 rounded-lg" style={{ backgroundColor: 'var(--surface-variant)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[1800px] mx-auto px-4">
            <p className="mb-4 md:mb-0" style={{ color: 'var(--on-surface)' }}>
              {locale === "fr" ? "Prêt à voir comment Octogone peut s'intégrer à vos opérations ?" : "Ready to see how Octogone can integrate with your operations?"}
            </p>
            <OctogoneButton
              variant="primary"
              size="lg"
              onClick={() => setIsDemoModalOpen(true)}
            >
              {locale === "fr" ? "Réserver une démo" : "Book a demo"}
            </OctogoneButton>
          </div>
        </div>

        {/* 4. Bas de footer */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--outline)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[1800px] mx-auto px-4">
            <p className="text-sm" style={{ color: 'var(--on-surface-variant)' }}>
              © Octogone Collectif Inc. {currentYear}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href={`/${locale}/politique-confidentialite`} className="text-sm transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                {locale === "fr" ? "Politique de confidentialité" : "Privacy Policy"}
              </Link>
              <Link href={`/${locale}/conditions-utilisation`} className="text-sm transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                {locale === "fr" ? "Conditions d'utilisation" : "Terms of Use"}
              </Link>
              <div className="flex items-center space-x-2 ml-6">
                <Globe className="h-4 w-4" style={{ color: 'var(--on-surface-variant)' }} />
                <Link href="/fr" className="text-sm font-medium transition-colors" style={{ color: locale === "fr" ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>
                  FR
                </Link>
                <span style={{ color: 'var(--outline)' }}>/</span>
                <Link href="/en" className="text-sm font-medium transition-colors" style={{ color: locale === "en" ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>
                  EN
                </Link>
              </div>
              <a
                href="https://linkedin.com/company/octogone"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: 'var(--on-surface-variant)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modale de réservation de démo */}
      <HubSpotMeetingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </footer>
  );
}
