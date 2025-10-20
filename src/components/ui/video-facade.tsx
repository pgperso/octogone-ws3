"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface VideoFacadeProps {
  videoId: string;
  provider?: "vimeo" | "youtube";
  title: string;
  thumbnail?: string;
  className?: string;
  autoload?: boolean; // Charger automatiquement quand visible
}

/**
 * VideoFacade - Composant optimisé pour charger les vidéos avec Intersection Observer
 * Affiche un thumbnail léger, puis charge l'iframe automatiquement quand visible
 */
export const VideoFacade = ({
  videoId,
  provider = "vimeo",
  title,
  thumbnail,
  className = "",
  autoload = true,
}: VideoFacadeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoload || !containerRef.current) return;

    // Intersection Observer pour détecter quand le composant est visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Charger l'iframe dès que visible
            setIsLoaded(true);
          }
        });
      },
      {
        threshold: 0.1, // Charger quand 10% visible
        rootMargin: "50px", // Précharger 50px avant d'être visible
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [autoload, isLoaded]);

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
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {!isLoaded ? (
        /* Thumbnail pendant le chargement */
        <Image
          src={getDefaultThumbnail()}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
          quality={75}
        />
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
