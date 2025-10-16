"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { LogoMarquee } from "@/components/ui/logo-marquee";

// Définition du type pour les logos des clients
interface ClientLogo {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Logos clients
const clientLogos: ClientLogo[] = [
  {
    id: 1,
    name: "Chez Boulay",
    logo: "/images/partners/Chez_Boulay (1).png",
    alt: "Logo Chez Boulay",
  },
  {
    id: 2,
    name: "Germain Hotels",
    logo: "/images/partners/Logo_GermainHotels_FR (1).png",
    alt: "Logo Germain Hotels",
  },
  {
    id: 3,
    name: "Restos Plaisir",
    logo: "/images/partners/restos_plaisir (2).png",
    alt: "Logo Restos Plaisir",
  },
  {
    id: 4,
    name: "Archibald",
    logo: "/images/partners/archibald-logo.png",
    alt: "Logo Archibald",
  },
  {
    id: 5,
    name: "Ashton",
    logo: "/images/partners/ashton_logo_plein_rvb_ketchup.png",
    alt: "Logo Ashton",
  },
  {
    id: 6,
    name: "Belle et Boeuf",
    logo: "/images/partners/belle-et-boeuf-logo (1).png",
    alt: "Logo Belle et Boeuf",
  },
  {
    id: 7,
    name: "Biceps BBQ",
    logo: "/images/partners/biceps_bbq (1).png",
    alt: "Logo Biceps BBQ",
  },
  {
    id: 8,
    name: "Les Botanistes",
    logo: "/images/partners/logo_les-botanistes-768x768-1 (1).jpg",
    alt: "Logo Les Botanistes",
  },
];

export default function PartnersSection() {
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  const t = (key: string, options?: { defaultValue?: string }) => {
    return options?.defaultValue || key;
  };

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-8" style={{ backgroundColor: 'var(--background)' }}>
      <ResponsiveSection
        as="section"
        bgColor="bg-white"
        spacing="lg"
        className="relative rounded-2xl"
      >
        <div className="w-full" role="region" aria-label={locale === 'fr' ? 'Nos clients partenaires' : 'Our partner clients'}>
          <LogoMarquee
            logos={clientLogos}
            title={t('hero.clients.title', { defaultValue: locale === "fr" ? "Partenaire de leur succès" : "Partner in their success" })}
            titleClassName="text-sm lg:text-lg"
          />
        </div>
      </ResponsiveSection>
    </div>
  );
}
