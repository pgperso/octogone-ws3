"use client";

import React from "react";
import { OptimizedImage } from "./optimized-image";
import { generateSizes, getOptimalQuality } from "@/utils/image-utils";

interface PictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  lazy?: boolean;
  imageType?: 'photo' | 'illustration' | 'icon' | 'logo';
  sizes?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * Composant Picture optimisé qui utilise les meilleures pratiques
 * pour les images responsives et performantes
 */
export const Picture = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  lazy = true,
  imageType = 'photo',
  sizes,
  fill = false,
  objectFit = "cover",
}: PictureProps) => {
  // Générer les tailles responsives optimales
  const responsiveSizes = sizes || generateSizes();
  
  // Obtenir la qualité optimale selon le type d'image
  const quality = getOptimalQuality(imageType);

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      lazy={lazy}
      sizes={responsiveSizes}
      fill={fill}
      objectFit={objectFit}
    />
  );
};
