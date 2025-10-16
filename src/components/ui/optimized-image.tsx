"use client";

import React from "react";
import Image from "next/image";
import { LazyImage } from "./lazy-image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  lazy?: boolean;
  sizes?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

// Génère un placeholder blur data URL simple
const generateBlurDataURL = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
};

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  lazy = true,
  sizes,
  fill = false,
  objectFit = "cover",
}: OptimizedImageProps) => {
  // Générer des tailles responsives par défaut si non spécifiées
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  
  // Utiliser LazyImage si lazy loading est activé et pas prioritaire
  if (lazy && !priority) {
    return (
      <LazyImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        quality={quality}
        sizes={defaultSizes}
        placeholder="blur"
        blurDataURL={width && height ? generateBlurDataURL(10, 10) : undefined}
      />
    );
  }

  // Utiliser Image standard pour les images prioritaires
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        priority={priority}
        sizes={defaultSizes}
        placeholder="blur"
        blurDataURL={width && height ? generateBlurDataURL(10, 10) : undefined}
        style={fill ? { objectFit } : undefined}
        className={fill ? "object-cover" : ""}
      />
    </div>
  );
};
