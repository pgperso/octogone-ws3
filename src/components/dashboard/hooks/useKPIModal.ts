/**
 * Hook pour gérer l'état des modales KPI
 */

import { useState, useCallback } from 'react';

export const useKPIModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const openModal = useCallback((metric: string) => {
    setActiveMetric(metric);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setActiveMetric(null);
  }, []);

  return {
    isOpen,
    activeMetric,
    openModal,
    closeModal,
  };
};
