"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalculatorContextType {
  isCalculatorMinimized: boolean;
  expandCalculator: () => void;
  minimizeCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [isCalculatorMinimized, setIsCalculatorMinimized] = useState(true);

  const expandCalculator = () => setIsCalculatorMinimized(false);
  const minimizeCalculator = () => setIsCalculatorMinimized(true);

  return (
    <CalculatorContext.Provider value={{ isCalculatorMinimized, expandCalculator, minimizeCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
