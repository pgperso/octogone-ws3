"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import ToolDetailWidget from "@/components/widgets/tool-detail-widget";
import { getToolById, getNextTool, getPreviousTool } from "@/data/tools/tools-content";
import { ToolSEO } from "@/components/seo/tool-seo";
import { LogoCard } from "@/components/widgets/logo-card";

export default function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; toolId: string }>;
}) {
  const { locale, toolId } = React.use(params);
  
  // Récupérer l'outil depuis les données
  const tool = getToolById(toolId);
  if (!tool) {
    notFound();
  }

  const isEnglish = locale === "en";
  
  // Déterminer le titre et la description du header
  const headerCategory = tool.headerCategoryFr && tool.headerCategoryEn
    ? (isEnglish ? tool.headerCategoryEn : tool.headerCategoryFr)
    : (isEnglish ? "Tool" : "Outil");
  
  const headerTitle = tool.headerTitleFr && tool.headerTitleEn
    ? (isEnglish ? tool.headerTitleEn : tool.headerTitleFr)
    : (isEnglish ? tool.nameEn : tool.nameFr);
  
  const headerDescription = tool.headerDescriptionFr && tool.headerDescriptionEn
    ? (isEnglish ? tool.headerDescriptionEn : tool.headerDescriptionFr)
    : (isEnglish ? tool.descriptionEn : tool.descriptionFr);

  // Navigation
  const previousTool = getPreviousTool(toolId);
  const nextTool = getNextTool(toolId);

  return (
    <>
      {/* SEO Schemas JSON-LD */}
      <ToolSEO tool={tool} locale={locale} />
      
      <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <ResponsiveSection 
        spacing="xl" 
        className="relative overflow-hidden"
      >
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002236] via-[#003d5c] to-[#005a82]" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 178, 107, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(186, 223, 246, 0.3) 0%, transparent 50%)'
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center">
          {/* Catégorie en texte simple */}
          <motion.p 
            className="text-white text-lg font-semibold mb-4 opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {headerCategory}
          </motion.p>

          {/* Titre */}
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {headerTitle}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg text-white opacity-90 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {headerDescription}
          </motion.p>

          {/* Navigation inter-outils */}
          <motion.div 
            className="flex justify-center items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Bouton Précédent */}
            {previousTool && (
              <Link 
                href={`/${locale}/fonctionnalites/${previousTool.id}`}
                className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
              >
                <ChevronLeft className="w-6 h-6 text-marine-700" />
                <div className="text-center min-w-0 flex-1">
                  <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                    {isEnglish ? previousTool.nameEn : previousTool.nameFr}
                  </div>
                </div>
              </Link>
            )}

            {/* Bouton Suivant */}
            {nextTool && (
              <Link 
                href={`/${locale}/fonctionnalites/${nextTool.id}`}
                className="flex items-center gap-3 px-6 py-3 w-64 rounded-lg transition-all duration-200"
                style={{ backgroundColor: '#dcb26b' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#BADFF6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dcb26b'}
              >
                <div className="text-center min-w-0 flex-1">
                  <div className="text-sm font-medium text-marine-900 overflow-hidden text-ellipsis whitespace-nowrap">
                    {isEnglish ? nextTool.nameEn : nextTool.nameFr}
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-marine-700" />
              </Link>
            )}
          </motion.div>
        </div>
      </ResponsiveSection>

      {/* Features Section - Widget réutilisable */}
      <ResponsiveSection spacing="xxl" bgColor="">
        <ToolDetailWidget tool={tool} locale={locale} />
      </ResponsiveSection>

      {/* Section Partenaires - RH : Gestionnaires d'horaires */}
      {toolId === 'ressources-humaines' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <div className="max-w-4xl mx-auto">
            {/* Séparateur */}
            <div className="mb-12 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
              <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Our Schedule Management Partners' : 'Nos partenaires gestionnaires d\'horaires'}
              </div>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
            </div>

            {/* Logos des partenaires gestionnaires d'horaires */}
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { name: 'Evolia', logo: '/images/punch/evolia.png' },
                { name: 'Agendrix', logo: '/images/punch/agendrix.png' },
                { name: 'Emprez', logo: '/images/punch/emprez.png' }
              ].map((scheduler, index) => (
                <LogoCard
                  key={scheduler.name}
                  name={scheduler.name}
                  logo={scheduler.logo}
                  index={index}
                  delay={0.1}
                />
              ))}
            </div>
          </div>
        </ResponsiveSection>
      )}

      {/* Section Partenaires - Inventaire : Fournisseurs */}
      {toolId === 'inventaire' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <div className="max-w-5xl mx-auto">
            {/* Séparateur */}
            <div className="mb-12 flex items-center gap-4">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
              <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Our Supplier Partners' : 'Nos fournisseurs partenaires'}
              </div>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
            </div>
            
            {/* Description */}
            <p className="text-center text-base mb-8 max-w-3xl mx-auto" style={{ color: 'var(--on-surface-variant)' }}>
              {isEnglish 
                ? 'Work with these partner suppliers? We handle importing all the products you use into Octogone. Your supplier isn\'t listed? No problem—we\'ll connect to them.'
                : 'Vous travaillez avec ces fournisseurs partenaires ? Nous nous chargeons d\'importer tous les produits que vous utilisez dans Octogone. Votre fournisseur n\'est pas dans la liste ? Aucun problème, nous nous connecterons à lui.'
              }
            </p>

            {/* Logos des fournisseurs partenaires */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: 'Borderon et fils', logo: '/images/suppliers/borderon.png' },
                { name: 'Norref', logo: '/images/suppliers/norref.png' },
                { name: 'Gordon', logo: '/images/suppliers/gordon.png' },
                { name: 'Hector Larivée', logo: '/images/suppliers/hector.png' },
                { name: 'Sysco', logo: '/images/suppliers/sysco.png' },
                { name: 'SAQ', logo: '/images/suppliers/saq.png' },
                { name: 'Viandex', logo: '/images/suppliers/viandex.png' },
                { name: 'FLB', logo: '/images/suppliers/flb.png' },
                { name: 'Canabec', logo: '/images/suppliers/canabec.png' },
                { name: 'JG Fruits et Légumes', logo: '/images/suppliers/jg.png' },
                { name: 'Les emballages L.Boucher', logo: '/images/suppliers/lboucher.png' },
                { name: 'Tout Prêt', logo: '/images/suppliers/toutpret.png' }
              ].map((supplier, index) => (
                <LogoCard
                  key={supplier.name}
                  name={supplier.name}
                  logo={supplier.logo}
                  index={index}
                  delay={0.05}
                />
              ))}
            </div>
          </div>
        </ResponsiveSection>
      )}
      </main>
    </>
  );
}
