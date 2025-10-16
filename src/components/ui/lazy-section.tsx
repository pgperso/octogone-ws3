"use client";

import React from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  animationDelay?: number;
}

const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
  </div>
);

export const LazySection = ({
  children,
  className = "",
  fallback = <SectionSkeleton />,
  threshold = 0.1,
  rootMargin = "100px",
  animationDelay = 0,
}: LazySectionProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: animationDelay,
            ease: "easeOut" 
          }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
};
