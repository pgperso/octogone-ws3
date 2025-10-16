"use client";

import { createContext, useContext, useState } from "react";
import type { NavContextType, NavTheme } from "./types";

const NavigationContext = createContext<NavContextType | undefined>(undefined);

export function NavigationProvider({
  children,
  initialTheme = "light",
}: {
  children: React.ReactNode;
  initialTheme?: NavTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme] = useState<NavTheme>(initialTheme);

  const value = {
    isOpen,
    setIsOpen,
    theme,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
