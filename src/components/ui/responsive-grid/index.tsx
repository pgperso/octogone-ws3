import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: {
    x?: number;
    y?: number;
  };
}

export function ResponsiveGrid({
  children,
  className,
  cols = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
    "2xl": 4,
  },
  gap = {
    x: 4,
    y: 4,
  },
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols.xs}`,
        `sm:grid-cols-${cols.sm}`,
        `md:grid-cols-${cols.md}`,
        `lg:grid-cols-${cols.lg}`,
        `xl:grid-cols-${cols.xl}`,
        `2xl:grid-cols-${cols["2xl"]}`,
        `gap-x-${gap.x}`,
        `gap-y-${gap.y}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
