import { useState, useEffect } from "react";
import { breakpoints } from "@/config/responsive";

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs");

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= parseInt(breakpoints["2xl"])) {
        setCurrentBreakpoint("2xl");
      } else if (width >= parseInt(breakpoints.xl)) {
        setCurrentBreakpoint("xl");
      } else if (width >= parseInt(breakpoints.lg)) {
        setCurrentBreakpoint("lg");
      } else if (width >= parseInt(breakpoints.md)) {
        setCurrentBreakpoint("md");
      } else if (width >= parseInt(breakpoints.sm)) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }
    };

    // Vérification initiale
    checkBreakpoint();

    // Écouter les changements de taille
    window.addEventListener("resize", checkBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return {
    breakpoint: currentBreakpoint,
    isMobile: currentBreakpoint === "xs" || currentBreakpoint === "sm",
    isTablet: currentBreakpoint === "md",
    isDesktop:
      currentBreakpoint === "lg" ||
      currentBreakpoint === "xl" ||
      currentBreakpoint === "2xl",
    isLargeDesktop: currentBreakpoint === "2xl",
  };
}
