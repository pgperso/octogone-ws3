"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props pour le composant ResponsiveSection
 */
interface ResponsiveSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  fullHeight?: boolean;
  noPadding?: boolean;
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  bgColor?: string;
  maxWidth?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "wider" | "full";
  className?: string;
}

/**
 * Composant ResponsiveSection
 *
 * Ce composant sert de base pour toutes les sections du site, avec des optimisations
 * responsives cohérentes pour tous les breakpoints. Il gère automatiquement les
 * espacements, les marges et les largeurs maximales en fonction de la taille d'écran.
 *
 * @example
 * // Section standard avec espacement moyen
 * <ResponsiveSection spacing="md" bgColor="bg-white">
 *   Contenu de la section
 * </ResponsiveSection>
 *
 * @example
 * // Section pleine hauteur sans padding avec une largeur maximale
 * <ResponsiveSection
 *   fullHeight
 *   noPadding
 *   maxWidth="lg"
 *   bgColor="bg-marine-50"
 * >
 *   Contenu de la section
 * </ResponsiveSection>
 */
export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  as: Component = "section",
  fullHeight = false,
  noPadding = false,
  spacing = "md",
  bgColor = "",
  maxWidth = "wider",
  className,
  style,
  ...props
}) => {
  // Utiliser var(--background) par défaut si aucune couleur n'est spécifiée
  const defaultStyle = !bgColor && !style?.backgroundColor 
    ? { backgroundColor: 'var(--background)', ...style }
    : style;
  // Mapping des espacements pour chaque breakpoint
  const spacingClasses = {
    none: "",
    xs: "py-2 xs:py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8",
    sm: "py-3 xs:py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10",
    md: "py-4 xs:py-5 sm:py-6 md:py-8 lg:py-10 xl:py-12",
    lg: "py-5 xs:py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16",
    xl: "py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20",
    xxl: "py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32",
    xxxl: "py-12 xs:py-16 sm:py-20 md:py-28 lg:py-36 xl:py-44",
  };

  // Mapping des largeurs maximales
  const maxWidthClasses = {
    none: "",
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    wider: "max-w-[1800px]", // Largeur personnalisée plus grande pour les écrans très larges
    full: "max-w-full",
  };

  return (
    <Component
      className={cn(
        // Classes de base
        "w-full relative overflow-hidden",
        // Couleur de fond
        bgColor,
        // Hauteur
        fullHeight ? "h-full min-h-screen" : "",
        // Espacement vertical
        !noPadding ? spacingClasses[spacing] : "",
        // Classes personnalisées
        className,
      )}
      style={defaultStyle}
      {...props}
    >
      {/* Conteneur pour limiter la largeur du contenu */}
      <div
        className={cn(
          "mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 w-full",
          maxWidth !== "none" ? maxWidthClasses[maxWidth] : "",
        )}
      >
        {children}
      </div>
    </Component>
  );
};
