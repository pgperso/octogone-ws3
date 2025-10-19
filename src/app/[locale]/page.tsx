"use client";

import dynamic from "next/dynamic";
import Hero from "@/features/home/components/00-hero-section";
import PartnersSection from "@/features/home/components/02-clients-section";
import ProBackground from "@/components/background/ProBackground";
import { useRef, useState, useEffect } from "react";
import * as React from "react";
import { useCalculator } from "@/contexts/calculator-context";

// Lazy load des sections non-critiques (économise ~22 KB au chargement initial)
const CortexIntro = dynamic(() => import("@/features/home/components/03-cortex-section"), {
  loading: () => <div className="h-96" />,
});
const TargetSectors = dynamic(() => import("@/features/home/components/04-target-sectors-section"), {
  loading: () => <div className="h-96" />,
});
const HowItWorks = dynamic(() => import("@/features/home/components/05-how-it-works-section"), {
  loading: () => <div className="h-96" />,
});
const RecentBlogPosts = dynamic(() => import("@/features/home/components/06-blog-posts-section"), {
  loading: () => <div className="h-96" />,
});

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  // Utiliser React.use pour accéder aux paramètres de route
  const { locale } = React.use(params);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setHasBanner] = useState(true);
  const { expandCalculator } = useCalculator();

  // Détecter la présence de la bannière
  useEffect(() => {
    const checkBannerVisibility = () => {
      const bannerElement = document.querySelector(".announcement-banner");
      const isVisible =
        bannerElement &&
        window.getComputedStyle(bannerElement).display !== "none";
      setHasBanner(!!isVisible);
    };

    // Vérifier initialement
    checkBannerVisibility();

    // Observer les changements dans le DOM
    const observer = new MutationObserver(checkBannerVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    // Nettoyage
    return () => observer.disconnect();
  }, []);

  // Fonction commentée car non utilisée actuellement, mais conservée pour une utilisation future
  // const scrollToSection = () => {
  //   sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <>
      {/* Fond 3D avec formes Octogone */}
      <ProBackground />
      
      {/* Hero section avec centrage ajusté pour la barre de navigation */}
      <div className="w-full">
        <Hero />
      </div>

      {/* Section Partenaires */}
      <PartnersSection />

      {/* Section Cortex - IA d'Octogone */}
      <CortexIntro locale={locale} />

      {/* Conteneur pour les autres sections qui viendront après le hero */}
      <div ref={sectionRef}>
        {/* Section Target Sectors - Qui fait confiance à Octogone */}
        <TargetSectors />
        
        {/* Section Comment ça marche */}
        <HowItWorks onOpenCalculator={expandCalculator} />

      </div>

      {/* Articles récents du blog */}
      <RecentBlogPosts locale={locale as 'fr' | 'en'} />
    </>
  );
}


