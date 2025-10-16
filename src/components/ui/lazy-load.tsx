"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-marine-500 border-t-transparent rounded-full"
    />
  </div>
);

export const LazyLoad = ({ 
  children, 
  fallback = <DefaultFallback />, 
  className = "" 
}: LazyLoadProps) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};
