"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Types d'animations disponibles pour le composant ScrollAnimation
 */
export type ScrollAnimationType =
  | "scale-up" // Agrandissement progressif
  | "scale-down" // Réduction progressive
  | "fade-in" // Apparition progressive
  | "slide-up" // Glissement vers le haut
  | "slide-in" // Glissement depuis le côté
  | "rotate" // Rotation progressive
  | "custom"; // Animation personnalisée

/**
 * Props pour le composant ScrollAnimation
 */
interface ScrollAnimationProps {
  children: React.ReactNode;
  type?: ScrollAnimationType;
  startOffset?: string | number | [string, string];
  amount?: number;
  threshold?: number;
  duration?: number;
  minWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  customTransform?: (progress: MotionValue<number>) => Record<string, unknown>;
}

/**
 * Composant ScrollAnimation
 *
 * Ce composant permet d'ajouter facilement des animations basées sur le défilement
 * à n'importe quel élément du site. Il s'adapte automatiquement aux différentes
 * tailles d'écran et peut être personnalisé selon les besoins.
 *
 * @example
 * // Animation d'agrandissement simple
 * <ScrollAnimation type="scale-up">
 *   <div className="my-element">Contenu</div>
 * </ScrollAnimation>
 *
 * @example
 * // Animation personnalisée avec des paramètres spécifiques
 * <ScrollAnimation
 *   type="custom"
 *   threshold={0.2}
 *   minWidth={768}
 *   customTransform={(progress) => useTransform(progress, [0, 0.5], [0.8, 1.2])}
 * >
 *   <div className="my-element">Contenu</div>
 * </ScrollAnimation>
 */
export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  type = "scale-up",
  amount = 0.2,
  duration = 0.3,
  minWidth = 0,
  className = "",
  style = {},
  customTransform,
}) => {
  // Référence pour l'élément à animer
  const elementRef = useRef<HTMLDivElement>(null);

  // État pour la détection côté client et la taille de l'écran
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Effet pour la détection côté client et le redimensionnement
  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation basée sur le défilement
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: ["start end", "end start"],
  });

  // Définir toutes les transformations en dehors des conditions
  // pour respecter les règles des hooks React
  const scaleUp = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 1],
  );
  const scaleDown = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.2, 0.8, 1],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 360 * amount, 0],
  );

  // Configuration des animations selon le type
  const getAnimationProps = () => {
    // Si l'écran est trop petit, ne pas animer
    if (!isClient || windowWidth < minWidth) {
      return { style };
    }
    
    // Configuration de base commune à toutes les animations
    const baseConfig = {
      style,
      transition: { duration, ease: "easeOut" }
    };
    
    // Animation personnalisée
    if (type === "custom" && customTransform) {
      return {
        ...baseConfig,
        ...customTransform(scrollYProgress)
      };
    }
    
    // Animations prédéfinies
    switch (type) {
      case "scale-up":
        return {
          ...baseConfig,
          scale: scaleUp
        };
        
      case "scale-down":
        return {
          ...baseConfig,
          scale: scaleDown
        };
        
      case "fade-in":
        return {
          ...baseConfig,
          opacity
        };
        
      case "slide-up":
        return {
          ...baseConfig,
          y,
          opacity
        };
        
      case "slide-in":
        return {
          ...baseConfig,
          x,
          opacity
        };
        
      case "rotate":
        return {
          ...baseConfig,
          rotate
        };
        
      default:
        return { style };
    }
  };

  return (
    <motion.div
      ref={elementRef}
      className={className}
      {...getAnimationProps()}
    >
      {children}
    </motion.div>
  );
};
