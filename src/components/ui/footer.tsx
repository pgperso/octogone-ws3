"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./button";
import { ArrowRight, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
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

          {/* 3. Navigation - Entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              {locale === "fr" ? "Entreprise" : "Company"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/forfaits`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Tarifs" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Contact" : "Contact"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/login`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  {locale === "fr" ? "Connexion" : "Login"}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/admin`} className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  Admin
                </Link>
              </li>
            </ul>
          </div>



          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              {locale === "fr" ? "Nous contacter" : "Contact Us"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" style={{ color: 'var(--primary)' }} />
                <span style={{ color: 'var(--on-surface-variant)' }}>
                  Québec (Vieux-Port)
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                <a href="tel:+15818745990" className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  581-874-5990
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                <a href="mailto:info@octogone.ai" className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  info@octogone.ai
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" style={{ color: 'var(--primary)' }} />
                <a href="mailto:support@octogone.ai" className="transition-colors" style={{ color: 'var(--on-surface-variant)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--on-surface)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--on-surface-variant)'}>
                  support@octogone.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Call to Action secondaire */}
        <div className="mt-12 py-6 rounded-lg" style={{ backgroundColor: 'var(--surface-variant)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-[1800px] mx-auto px-4">
            <p className="mb-4 md:mb-0" style={{ color: 'var(--on-surface)' }}>
              {locale === "fr" ? "Prêt à voir comment Octogone peut s'intégrer à vos opérations ?" : "Ready to see how Octogone can integrate with your operations?"}
            </p>
            <Button variant="primary" size="lg" className="font-medium flex items-center" style={{ backgroundColor: "#dcb26b", color: "#002236" }}>
              {locale === "fr" ? "Réserver une démo" : "Book a demo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
    </footer>
  );
}
