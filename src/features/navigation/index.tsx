"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./components/desktop-nav";
import { ModernMobileNav } from "./components/modern-mobile-nav";
import LanguageToggle from "./components/language-toggle";
import AnnouncementBanner from "./components/announcement-banner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavigationProvider, useNavigation } from "./hooks/use-navigation";
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

  // État pour la bannière d'annonce
  const [isAnnouncementVisible, setIsAnnouncementVisible] =
    React.useState(true);

  // Vérifier si la bannière a été fermée manuellement
  const [manuallyDismissed, setManuallyDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Effacer le localStorage au chargement de la page
      const dismissKey = "announcement-dismissed";

      // Vérifier si nous sommes dans une nouvelle session de navigation
      const lastSession = localStorage.getItem("last-session-time");
      const currentTime = Date.now();

      // Mettre à jour le timestamp de la session
      localStorage.setItem("last-session-time", currentTime.toString());

      // Si la dernière session était il y a plus de 2 secondes, c'est un refresh ou une nouvelle visite
      if (!lastSession || currentTime - parseInt(lastSession) > 2000) {
        // C'est un refresh ou une nouvelle session, réinitialiser l'état
        localStorage.removeItem(dismissKey);
        setIsAnnouncementVisible(true);
        setManuallyDismissed(false);
      } else {
        // Même session, vérifier si la bannière a été fermée
        const isDismissed = localStorage.getItem(dismissKey) === "true";
        setIsAnnouncementVisible(!isDismissed);
        setManuallyDismissed(isDismissed);
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

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll);

    // Nettoyer
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [manuallyDismissed]);

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll();
  // Variable commentée car non utilisée actuellement
  // const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Pour les traductions côté client, nous utilisons des textes codés en dur
  // Les traductions seront gérées côté serveur dans le layout

  return (
    <>
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
            localStorage.setItem("announcement-dismissed", "true");
          }}
        />
      )}

      <motion.header
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-300 motion-element",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent"
        )}
        style={{
          top: isAnnouncementVisible ? '60px' : '0px', // Ajuster selon la hauteur de la bannière
          ...(isScrolled ? {
            backgroundColor: 'var(--surface)',
            opacity: 0.95,
            borderColor: 'var(--outline)'
          } : {
            backgroundColor: 'var(--background)'
          })
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          // Nettoyage GPU - Technique Netflix
          const element = document.querySelector('header.motion-element');
          if (element) element.classList.add('animation-complete');
        }}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-300 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="w-full relative">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20 px-4 sm:px-6 lg:px-8 w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
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
            <div className="flex-1 hidden xl:flex justify-center">
              <DesktopNav
                routes={routes}
                activeRoute={activeRoute}
                locale={locale}
              />
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
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
              <Link
                href={`/${locale}/login`}
                className="hidden xl:inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary_color"
                style={{ color: 'var(--on-background)' }}
              >
                {locale === "fr" ? "Connexion" : "Login"}
              </Link>

              {/* Theme Toggle & Language Toggle */}
              <div className="hidden xl:flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle currentLocale={locale} />
              </div>

              {/* CTA Button */}
              <Link
                href={`/${locale}/contact`}
                className="hidden xl:inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium bg-gold-500 text-marine-900 hover:bg-gold-400 dark:bg-primary_color dark:text-marine-900 dark:hover:bg-gold-400 transition-colors btn-gold"
              >
                {locale === "fr" ? "Réserver une démo" : "Book a demo"}
              </Link>
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
