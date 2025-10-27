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
import OctogoneDashboardKPIs from "@/components/widgets/OctogoneDashboardKPIs";
import { OctogoneInventoryWidget } from "@/components/widgets/octogone_inventories";
import { RecipeFlowContainer } from "@/components/widgets/octogone_recipe";
import { RotatingText } from "@/components/ui/rotating-text";

// Permettre les paramètres dynamiques
export const dynamicParams = true;

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
          <div className="absolute inset-0 bg-gradient-to-br from-[#002236] via-[#003d5c] to-[#005a82]" style={{
            ...(toolId === 'food-cost' && {
              background: 'linear-gradient(135deg, #B8E0D2 0%, #A5CABE 100%)'
            })
          }} />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 178, 107, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(186, 223, 246, 0.3) 0%, transparent 50%)'
            }}
          />
          {toolId !== 'food-cost' && <div className="absolute inset-0 bg-black/50"></div>}
        </div>

        <div className="relative z-10 text-center">
          {/* Catégorie en texte simple */}
          <motion.p 
            className="text-lg font-semibold mb-4 opacity-90"
            style={{ color: toolId === 'food-cost' ? '#1a1a1a' : 'white' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {headerCategory}
          </motion.p>

          {/* Titre */}
          <motion.h1 
            className="text-4xl lg:text-6xl font-bold mb-3"
            style={{ 
              color: toolId === 'food-cost' ? '#1a1a1a' : 'white',
              textShadow: toolId === 'food-cost' ? 'none' : '0 2px 8px rgba(0,0,0,0.5)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {toolId === 'food-cost' ? (
              <RotatingText 
                words={isEnglish 
                  ? [
                      'Profit is calculated one ingredient at a time',
                      'Profit is calculated one unit at a time',
                      'Profit is calculated one ounce at a time',
                      'Profit is calculated one gram at a time',
                      'Profit is calculated one milliliter at a time'
                    ]
                  : [
                      'Le profit se calcule un ingrédient à la fois',
                      'Le profit se calcule une unité à la fois',
                      'Le profit se calcule une once à la fois',
                      'Le profit se calcule un gramme à la fois',
                      'Le profit se calcule un millilitre à la fois'
                    ]
                }
                interval={9000}
              />
            ) : headerTitle}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg opacity-90 max-w-3xl mx-auto mb-8"
            style={{ color: toolId === 'food-cost' ? '#1a1a1a' : 'white' }}
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

      {/* Dashboard KPIs - Uniquement pour Octogone 360 */}
      {toolId === 'octogone-360' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <OctogoneDashboardKPIs locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Widget Inventaire - Uniquement pour Inventaire */}
      {toolId === 'inventaire' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <OctogoneInventoryWidget locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Widget Recettes - Uniquement pour Food Cost */}
      {toolId === 'food-cost' && (
        <RecipeFlowContainer locale={locale as 'fr' | 'en'} />
      )}

      {/* Section Témoignage Cuisinier - Uniquement pour Food Cost */}
      {toolId === 'food-cost' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p 
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish 
                    ? "You spend hours calculating costs, adjusting recipes, trying to figure out if you're making money. Sound familiar?"
                    : "Tu passes des heures à calculer les coûts, ajuster les recettes, essayer de comprendre si tu fais du profit. Ça te parle ?"}
                </p>
                <p 
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {isEnglish
                    ? "Imagine entering your ingredients once, and everything updates automatically. Change a supplier price? All your recipes recalculate instantly. Test scenarios, optimize margins, and get back to what you love: creating incredible dishes."
                    : "Imagine : tu rentres tes ingrédients une fois, et tout se met à jour automatiquement. Tu changes un prix de fournisseur ? Toutes tes recettes se recalculent instantanément. Tu testes des scénarios, optimises tes marges, et tu te concentres sur ce que tu aimes : créer des plats incroyables."}
                </p>
                <p 
                  className="text-lg lg:text-xl leading-relaxed font-semibold"
                  style={{ color: 'var(--primary)' }}
                >
                  {isEnglish
                    ? "Finally understand where your money goes, and more importantly, where it comes from."
                    : "Comprends enfin où va ton argent, et surtout, d'où il vient."}
                </p>
              </div>
            </motion.div>

            {/* Image à droite */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="aspect-square rounded-2xl overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--surface-container)',
                  border: '2px solid var(--outline)',
                  maxHeight: '400px',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}
              >
                {/* Placeholder - À remplacer par l'image du cuisinier */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-1 p-4">
                    <div 
                      className="text-3xl mb-2"
                      style={{ color: 'var(--on-surface-variant)' }}
                    >
                      👨‍🍳
                    </div>
                    <p 
                      className="text-xs font-medium"
                      style={{ color: 'var(--on-surface-variant)' }}
                    >
                      {isEnglish ? 'Chef Image' : 'Image Chef'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </ResponsiveSection>
      )}

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
