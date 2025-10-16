"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props pour le composant ResponsiveGrid
 */
interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  className?: string;
}

/**
 * Composant ResponsiveGrid
 *
 * Ce composant crée une grille responsive qui s'adapte automatiquement
 * à différentes tailles d'écran. Il permet de spécifier le nombre de colonnes
 * et l'espacement pour chaque breakpoint.
 *
 * @example
 * // Grille simple avec 1 colonne sur mobile, 2 sur tablette et 3 sur desktop
 * <ResponsiveGrid columns={{ xs: 1, md: 2, lg: 3 }}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </ResponsiveGrid>
 *
 * @example
 * // Grille avec espacement personnalisé
 * <ResponsiveGrid
 *   columns={{ xs: 1, md: 2, lg: 4 }}
 *   gap={{ xs: 2, md: 4, lg: 6 }}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 *   <div>Item 4</div>
 * </ResponsiveGrid>
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4, "2xl": 4 },
  gap = { xs: 4, sm: 6, md: 6, lg: 8, xl: 8, "2xl": 8 },
  className,
  ...props
}) => {
  // Génération des classes pour les colonnes
  const getColumnsClasses = () => {
    const classes = [];

    if (columns.xs) classes.push(`grid-cols-${columns.xs}`);
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    if (columns["2xl"]) classes.push(`2xl:grid-cols-${columns["2xl"]}`);

    return classes.join(" ");
  };

  // Génération des classes pour les espacements
  const getGapClasses = () => {
    const classes = [];

    if (gap.xs) classes.push(`gap-${gap.xs}`);
    if (gap.sm) classes.push(`sm:gap-${gap.sm}`);
    if (gap.md) classes.push(`md:gap-${gap.md}`);
    if (gap.lg) classes.push(`lg:gap-${gap.lg}`);
    if (gap.xl) classes.push(`xl:gap-${gap.xl}`);
    if (gap["2xl"]) classes.push(`2xl:gap-${gap["2xl"]}`);

    return classes.join(" ");
  };

  return (
    <div
      className={cn(
        "grid w-full",
        getColumnsClasses(),
        getGapClasses(),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
