"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementBannerProps {
  message: string;
  link?: {
    text: string;
    href: string;
  };
  isVisible: boolean;
  onDismiss: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  message,
  link,
  isVisible,
  onDismiss,
}) => {
  // Variable commentée car non utilisée actuellement
  // Prévue pour diviser le message en parties plus courtes pour les petits écrans si nécessaire
  // const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Fonction commentée car non utilisée actuellement
    // Vérifier la taille de l'écran au chargement et lors du redimensionnement
    // const checkScreenSize = () => {
    //   setIsMobile(window.innerWidth < 640);
    // };

    // Code commenté car non utilisé actuellement
    // // Vérification initiale
    // checkScreenSize();
    //
    // // Ajouter un écouteur pour le redimensionnement
    // window.addEventListener("resize", checkScreenSize);
    //
    // // Nettoyage
    // return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="announcement-banner fixed top-0 left-0 right-0 z-[70] overflow-hidden"
          style={{ backgroundColor: '#C8B6FF' }}
        >
          <div className="container mx-auto px-3 py-3 sm:py-4 flex items-center justify-center relative">
            {/* Contenu principal centré */}
            <div className="flex items-center justify-center max-w-[85%] sm:max-w-[90%] text-center">
              <div className="text-xs sm:text-sm md:text-base font-semibold leading-relaxed" style={{ color: '#1F1F1F' }}>
                {message}
                {link && (
                  <a
                    href={link.href}
                    className="ml-1 sm:ml-2 font-bold transition-colors border-b-2 border-white/50 hover:border-white inline-block"
                    style={{ color: '#1F1F1F' }}
                  >
                    {link.text}
                  </a>
                )}
              </div>
            </div>

            {/* Bouton de fermeture */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 sm:right-3 top-1/2 transform -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8 btn-gold-light flex-shrink-0 ml-2"
              onClick={onDismiss}
              style={{ color: '#1F1F1F' }}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
