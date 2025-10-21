"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { OctogoneButton } from "@/components/ui/octogone-button";
import { DesktopNav } from "./components/desktop-nav";
import { ModernMobileNav } from "./components/modern-mobile-nav";
import LanguageToggle from "./components/language-toggle";
import AnnouncementBanner from "./components/announcement-banner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavigationProvider, useNavigation } from "./hooks/use-navigation";
import { HubSpotMeetingModal } from "@/components/hubspot/meeting-modal";
import type { DesktopNavProps } from "./types";

// Constante pour activer/désactiver la bannière d'annonce
const SHOW_ANNOUNCEMENT_BANNER = true;

const NavigationContent: React.FC<DesktopNavProps> = ({
  routes,
  activeRoute,
  locale = "fr",
}) => {
  const { isOpen, setIsOpen } = useNavigation();
  const { isScrolled } = useScrollPosition();
  
  // État pour la modale de démo
  const [isDemoModalOpen, setIsDemoModalOpen] = React.useState(false);

  // État pour la bannière d'annonce - toujours visible par défaut
  const [isAnnouncementVisible, setIsAnnouncementVisible] = React.useState(true);

  // Vérifier si la bannière a été fermée manuellement
  const [manuallyDismissed, setManuallyDismissed] = React.useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("announcement-dismissed") === "true";
    }
    return false;
  });

  // État pour la hauteur dynamique de la bannière
  const [bannerHeight, setBannerHeight] = React.useState(60);

  // Vérifier au montage si la bannière a été fermée
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("announcement-dismissed") === "true";
      if (isDismissed) {
        setIsAnnouncementVisible(false);
        setManuallyDismissed(true);
      }
    }
  }, []);

  // Gérer la visibilité de la bannière en fonction du défilement
  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // Ne pas gérer le défilement si la bannière a été fermée manuellement
      if (manuallyDismissed) {
        return;
      }

      const currentScrollY = window.scrollY;

      // Masquer la bannière lors du défilement vers le bas
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setIsAnnouncementVisible(false);
      }
      // Afficher la bannière lors du défilement vers le haut près du haut de la page
      else if (currentScrollY < lastScrollY && currentScrollY < 100) {
        setIsAnnouncementVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    // Ajouter l'écouteur d'événement avec passive pour améliorer les performances
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Nettoyer
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [manuallyDismissed]);

  // Mesurer la hauteur de la bannière dynamiquement
  React.useEffect(() => {
    const measureBannerHeight = () => {
      const bannerElement = document.querySelector('.announcement-banner');
      if (bannerElement) {
        const height = bannerElement.getBoundingClientRect().height;
        setBannerHeight(height);
      }
    };

    // Mesurer au montage
    measureBannerHeight();
    
    // Mesurer lors du redimensionnement
    window.addEventListener('resize', measureBannerHeight);
    
    // Observer les changements de la bannière
    const observer = new MutationObserver(measureBannerHeight);
    const bannerElement = document.querySelector('.announcement-banner');
    if (bannerElement) {
      observer.observe(bannerElement, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });
    }

    return () => {
      window.removeEventListener('resize', measureBannerHeight);
      observer.disconnect();
    };
  }, [isAnnouncementVisible]);

  // Effet pour ajuster la hauteur de la bannière et la variable CSS
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Calculer la hauteur totale réelle
      const navHeight = 80; // Hauteur fixe de la navigation
      const totalHeight = (isAnnouncementVisible ? bannerHeight : 0) + navHeight;
      
      // Définir la variable CSS immédiatement
      document.documentElement.style.setProperty('--nav-total-height', `${totalHeight}px`);
    }
  }, [isAnnouncementVisible, bannerHeight]);

  // Initialiser la variable CSS dès le montage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Définir une valeur initiale immédiatement
      const initialHeight = SHOW_ANNOUNCEMENT_BANNER ? 128 : 80;
      document.documentElement.style.setProperty('--nav-total-height', `${initialHeight}px`);
    }
  }, []);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Fond fixe pour éviter le noir pendant l'animation de navigation */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          backgroundColor: 'var(--background)',
          zIndex: 39
        }}
      />
      
      {/* Bannière d'annonce */}
      {SHOW_ANNOUNCEMENT_BANNER && (
        <AnnouncementBanner
          message={locale === 'fr' 
            ? "Bienvenue sur notre nouveau site web, un avant-goût de la nouvelle version d'Octogone. Choisissez votre forfait maintenant et profitez du gel de votre tarif lors du lancement." 
            : "Welcome to our new website, a preview of the new Octogone version. Choose your plan now and enjoy a rate freeze at launch."
          }
          link={undefined}
          isVisible={isAnnouncementVisible}
          onDismiss={() => {
            setIsAnnouncementVisible(false);
            setManuallyDismissed(true);
            // Marquer comme fermée dans cette session
            sessionStorage.setItem("announcement-dismissed", "true");
          }}
        />
      )}

      <motion.header
        className={cn(
          "fixed left-0 right-0 z-40",
          isScrolled
            ? "backdrop-blur-md border-b border-border/50 shadow-sm"
            : ""
        )}
        style={{
          top: isAnnouncementVisible ? `${bannerHeight}px` : '0px',
          transition: 'top 0.3s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backgroundColor: isScrolled ? 'var(--surface)' : 'var(--background)',
          ...(isScrolled ? {
            borderColor: 'var(--outline)'
          } : {})
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut"
        }}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-300 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="w-full relative">
          <div className="flex xl:grid xl:grid-cols-3 h-16 items-center justify-between gap-4 md:h-20 px-4 sm:px-6 lg:px-8 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 xl:flex-shrink xl:justify-start">
              <Link href="/">
                <Image
                  src="/images/partners/logo_octogne_full.png"
                  alt="Logo Octogone"
                  width={120}
                  height={35}
                  className="h-6 w-auto xs:h-6 sm:h-7 md:h-8"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - uniquement visible sur les écrans plus grands que 1024px */}
            <div className="hidden xl:flex justify-center">
              <DesktopNav
                routes={routes}
                activeRoute={activeRoute}
                locale={locale}
              />
            </div>

            <div className="flex-shrink-0 flex items-center justify-end gap-3">
              {/* Mobile Menu Button - visible sur toutes les résolutions jusqu'à 1024px inclus */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden text-flutter_on_background dark:text-flutter_on_background_dark hover:bg-flutter_surface_variant dark:hover:bg-flutter_surface_variant_dark"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              {/* Connexion Link */}
              <a
                href="https://app.octogonecollectif.com/#/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary_color"
                style={{ color: 'var(--on-background)' }}
              >
                {locale === "fr" ? "Connexion" : "Login"}
              </a>

              {/* Theme Toggle & Language Toggle */}
              <div className="hidden xl:flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle currentLocale={locale} />
              </div>

              {/* CTA Button */}
              <div className="hidden xl:block">
                <OctogoneButton
                  onClick={() => setIsDemoModalOpen(true)}
                  variant="primary"
                  size="md"
                >
                  {locale === "fr" ? "Réserver une démo" : "Book a demo"}
                </OctogoneButton>
              </div>
            </div>

            {/* Mobile Navigation - Version moderne */}
            <ModernMobileNav
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              routes={routes}
              activeRoute={activeRoute}
            />
          </div>
        </div>
      </motion.header>
      
      {/* Modale de réservation de démo */}
      <HubSpotMeetingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
};

// Main Navigation component with Provider
export const Navigation: React.FC<DesktopNavProps> = (props) => {
  return (
    <NavigationProvider initialTheme={props.theme}>
      <NavigationContent {...props} />
    </NavigationProvider>
  );
};

export default Navigation;
export { NavigationProvider, useNavigation } from "./hooks/use-navigation";
