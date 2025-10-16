"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { staticPartnerLogos, type PartnerLogo } from "@/utils/partner-logos";

interface LogoMarqueeProps {
  logos?: PartnerLogo[];
  title?: string;
  titleClassName?: string;
}

export function LogoMarquee({
  logos = staticPartnerLogos,
  title = "Partenaire de leur succès",
  titleClassName = "text-lg",
}: LogoMarqueeProps) {
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>(logos);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Charger dynamiquement les logos depuis l'API (optionnel)
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch("/api/partner-logos");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setPartnerLogos(data);
          }
        }
        // Si l'API n'existe pas, on utilise les logos statiques (pas d'erreur)
      } catch {
        // Erreur silencieuse - on garde les logos statiques par défaut
      }
    };

    // Seulement si on n'a pas déjà des logos statiques
    if (logos === staticPartnerLogos) {
      fetchLogos();
    }
  }, [logos]); // Dépendance sur logos pour éviter les appels inutiles

  return (
    <div className="w-full py-6">
      {title && (
        <div className="text-center mb-4">
          <h3 className={`${titleClassName} font-medium text-black`}>
            {title}
          </h3>
        </div>
      )}

      <div
        className="relative overflow-hidden mx-auto"
        style={{ maxWidth: "1000px" }}
        onMouseEnter={() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = "paused";
          }
        }}
        onMouseLeave={() => {
          if (marqueeRef.current) {
            marqueeRef.current.style.animationPlayState = "running";
          }
        }}
      >
        {/* Gradient de fondu sur les côtés */}
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent"></div>

        {/* Conteneur du marquee avec animation CSS inline */}
        <div className="flex overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex items-center"
            style={{
              animation: "scroll 80s linear infinite",
              display: "flex",
              width: "fit-content",
              willChange: "transform",
            }}
          >
            {partnerLogos.map((logo) => (
              <div
                key={logo.id}
                className="flex-shrink-0 mx-8 h-32 w-52 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.logo}
                  alt={logo.alt}
                  width={180}
                  height={120}
                  className="object-contain max-h-full"
                />
              </div>
            ))}

            {/* Copie des logos pour créer un effet continu */}
            {partnerLogos.map((logo) => (
              <div
                key={`duplicate-${logo.id}`}
                className="flex-shrink-0 mx-8 h-32 w-52 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.logo}
                  alt={logo.alt}
                  width={180}
                  height={120}
                  className="object-contain max-h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style pour l'animation */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Optimisations pour une animation plus fluide */
        .flex {
          backface-visibility: hidden;
          perspective: 1000;
          transform: translate3d(0, 0, 0);
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
