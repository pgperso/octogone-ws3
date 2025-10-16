"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import FeatureDetailWidget from "@/components/widgets/feature-detail-widget";
import { getConceptById, getNextConcept, getPreviousConcept } from "@/data/features/features-content";
import { ConceptSEO } from "@/components/seo/concept-seo";

export default function PredictPage() {
  const params = useParams();
  const locale = params.locale as string;
  
  const concept = getConceptById('predict');
  if (!concept) return null;

  const nextConcept = getNextConcept('predict');
  const previousConcept = getPreviousConcept('predict');

  return (
    <>
      {/* SEO Schemas JSON-LD */}
      <ConceptSEO concept={concept} locale={locale} />
      
      <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <ResponsiveSection
        as="section"
        spacing="xl"
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(to bottom right, ${concept.pastelColor}, var(--background))`
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: concept.pastelColor
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-5 h-5" style={{ color: '#002236' }} />
              <span className="text-sm font-semibold" style={{ color: '#002236' }}>
                {locale === 'fr' ? concept.nameFr : concept.nameEn}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" 
              style={{ color: 'var(--on-secondary-container)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {locale === 'fr' ? concept.heroTitleFr : concept.heroTitleEn}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8" 
              style={{ color: 'var(--on-secondary-container)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {locale === 'fr' ? concept.heroDescriptionFr : concept.heroDescriptionEn}
            </motion.p>

            {/* Navigation entre concepts */}
            <motion.div 
              className="flex justify-start items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {previousConcept && (
                <Link 
                  href={`/${locale}/features/${previousConcept.id}`}
                  className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                  style={{ backgroundColor: '#dcb26b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
                >
                  <ChevronLeft className="w-6 h-6 text-marine-700" />
                  <div className="text-center min-w-0 flex-1">
                    <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      {locale === 'fr' ? previousConcept.nameFr : previousConcept.nameEn}
                    </div>
                  </div>
                </Link>
              )}
              {nextConcept && (
                <Link 
                  href={`/${locale}/features/${nextConcept.id}`}
                  className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                  style={{ backgroundColor: '#dcb26b' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
                >
                  <div className="text-center min-w-0 flex-1">
                    <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      {locale === 'fr' ? nextConcept.nameFr : nextConcept.nameEn}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-marine-700" />
                </Link>
              )}
            </motion.div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src={concept.heroImage}
              alt={locale === 'fr' ? concept.nameFr : concept.nameEn}
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </ResponsiveSection>

      {/* Features Section - Widget */}
      <div style={{ backgroundColor: 'var(--background)' }}>
        <ResponsiveSection
          as="section"
          spacing="xxl"
          bgColor=""
        >
          <FeatureDetailWidget concept={concept} locale={locale} />
        </ResponsiveSection>
      </div>
      </main>
    </>
  );
}
