"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoFacadeProps {
  videoId: string;
  provider?: "vimeo" | "youtube";
  title: string;
  thumbnail?: string;
  className?: string;
}

/**
 * VideoFacade - Composant optimisé pour charger les vidéos seulement à la demande
 * Affiche un thumbnail léger, puis charge l'iframe au clic
 */
export const VideoFacade = ({
  videoId,
  provider = "vimeo",
  title,
  thumbnail,
  className = "",
}: VideoFacadeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Générer l'URL de l'iframe selon le provider
  const getIframeSrc = () => {
    if (provider === "vimeo") {
      return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&controls=0`;
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0`;
  };

  // Générer l'URL du thumbnail par défaut
  const getDefaultThumbnail = () => {
    if (thumbnail) return thumbnail;
    if (provider === "vimeo") {
      return `https://vumbnail.com/${videoId}.jpg`;
    }
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!isLoaded ? (
        <>
          {/* Thumbnail avec bouton play */}
          <Image
            src={getDefaultThumbnail()}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            quality={75}
          />
          
          {/* Overlay avec bouton play */}
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            aria-label={`Play ${title}`}
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-marine-500 ml-1" fill="currentColor" />
            </div>
          </button>
        </>
      ) : (
        /* Iframe chargée après le clic */
        <iframe
          src={getIframeSrc()}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  );
};
