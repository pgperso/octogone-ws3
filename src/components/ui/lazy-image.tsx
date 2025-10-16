"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
}

const ImageSkeleton = ({ width, height, className }: { width?: number; height?: number; className?: string }) => (
  <div 
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ 
      width: width ? `${width}px` : "100%", 
      height: height ? `${height}px` : "200px" 
    }}
  />
);

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  sizes,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
    triggerOnce: true,
  });

  if (hasError) {
    return (
      <div 
        ref={ref}
        className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
        style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "200px" }}
      >
        Image non disponible
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {(isIntersecting || priority) ? (
        <motion.div
          className="motion-element"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            // Nettoyage GPU - Technique Netflix
            const element = document.querySelector('.motion-element');
            if (element) element.classList.add('animation-complete');
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
      ) : (
        <ImageSkeleton width={width} height={height} className={className} />
      )}
      
      {!isLoaded && (isIntersecting || priority) && !hasError && (
        <div className="absolute inset-0">
          <ImageSkeleton width={width} height={height} className={className} />
        </div>
      )}
    </div>
  );
};
