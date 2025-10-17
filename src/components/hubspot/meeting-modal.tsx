"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackDemoModalOpen } from "@/lib/tracking/hubspot-events";

interface HubSpotMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingUrl?: string;
  source?: string;
}

/**
 * Modale pour afficher le calendrier de réservation HubSpot Meetings
 * URL par défaut : https://meetings.hubspot.com/caroline-bourbeau/ventes-octogone
 */
export function HubSpotMeetingModal({
  isOpen,
  onClose,
  meetingUrl = "https://meetings.hubspot.com/caroline-bourbeau/ventes-octogone",
  source = "unknown"
}: HubSpotMeetingModalProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Réinitialiser l'état quand la modale s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      // Tracker l'ouverture de la modale
      trackDemoModalOpen(source);
    }
  }, [isOpen]);

  // Gérer la touche Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Bloquer le scroll du body quand la modale est ouverte
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-20 z-50 flex items-center justify-center"
          >
            <div className="relative w-full h-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Réserver une démo
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Contenu */}
              <div className="flex-1 relative overflow-hidden">
                {/* Loading spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-600 dark:text-gray-400">Chargement du calendrier...</p>
                    </div>
                  </div>
                )}

                {/* Message d'erreur */}
                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 p-8">
                    <div className="text-center max-w-md">
                      <p className="text-lg text-gray-900 dark:text-white mb-4">
                        Impossible de charger le calendrier
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Vous pouvez réserver directement via le lien ci-dessous :
                      </p>
                      <a
                        href={meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors font-semibold"
                      >
                        Ouvrir le calendrier
                      </a>
                    </div>
                  </div>
                )}

                {/* Iframe HubSpot Meetings */}
                <iframe
                  src={meetingUrl}
                  className="w-full h-full border-0"
                  title="Réserver une démo"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  allow="geolocation"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
