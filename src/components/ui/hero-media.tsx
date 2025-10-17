"use client";

import React from "react";
import Image from "next/image";

interface HeroMediaProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Composant qui affiche soit une vidéo soit une image selon l'extension du fichier
 */
export function HeroMedia({ src, alt, className = "" }: HeroMediaProps) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  if (isVideo) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`object-cover rounded-2xl shadow-2xl w-full h-full ${className}`}
      >
        <source src={src} type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos.
      </video>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover rounded-2xl shadow-2xl ${className}`}
    />
  );
}
