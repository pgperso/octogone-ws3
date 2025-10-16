"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="min-h-screen">
      {/* Hero section avec animation d'entrée */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-16 md:py-24 bg-gradient-to-b from-marine-50 to-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-marine-900 mb-6"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-marine-700 max-w-3xl mx-auto"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTemplate;
