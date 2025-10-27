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
  
  // Couleurs pour le hero food-cost
  const heroTextColor = toolId === 'food-cost' ? '#1a1a1a' : 'white';
  
  // Configuration des 4 cartes bénéfices pour food-cost avec statistiques
  const benefitCards = [
    {
      concept: 'operate',
      color: 'rgba(184, 224, 210, 0.85)',
      border: '#A5CABE',
      titleFr: 'Standardiser les recettes',
      titleEn: 'Standardize Recipes',
      descFr: 'Créez des fiches techniques détaillées avec ingrédients, quantités et étapes de préparation',
      descEn: 'Create detailed recipe sheets with ingredients, quantities and preparation steps',
      statFr: '10-15h économisées par semaine',
      statEn: '10-15h saved per week'
    },
    {
      concept: 'automate',
      color: 'rgba(180, 212, 255, 0.85)',
      border: '#A1C7FF',
      titleFr: 'Calcul automatique des coûts',
      titleEn: 'Auto-Calculate Costs',
      descFr: 'Changez un prix, toutes vos recettes se mettent à jour instantanément. Zéro recalcul manuel',
      descEn: 'Change one price, all your recipes update instantly. Zero manual recalculation',
      statFr: '100% des recettes mises à jour instantanément',
      statEn: '100% of recipes updated instantly'
    },
    {
      concept: 'analyze',
      color: 'rgba(255, 229, 180, 0.85)',
      border: '#F5D89E',
      titleFr: 'Food Cost en temps réel',
      titleEn: 'Real-Time Food Cost',
      descFr: 'Connaissez votre food cost % et profit brut exacts sur chaque plat instantanément',
      descEn: 'Know your exact food cost % and gross profit on every dish instantly',
      statFr: '2-5% de réduction des coûts',
      statEn: '2-5% cost reduction'
    },
    {
      concept: 'predict',
      color: 'rgba(200, 182, 255, 0.85)',
      border: '#B8A5F0',
      titleFr: 'Recommandations intelligentes',
      titleEn: 'Smart Recommendations',
      descFr: 'Recevez des suggestions IA pour optimiser vos marges et améliorer votre rentabilité',
      descEn: 'Get AI-powered suggestions to optimize your margins and improve profitability',
      statFr: '8-10% d’amélioration des marges',
      statEn: '8-10% margin improvement'
    }
  ];
  
  // State pour la carte sélectionnée
  const [selectedCard, setSelectedCard] = React.useState<string>('operate');
  
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
      
      <main className="flex min-h-screen flex-col">
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
            style={{ color: heroTextColor }}
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
            style={{ color: heroTextColor }}
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
        <ResponsiveSection spacing="xxl" bgColor="">
          <RecipeFlowContainer locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Section Bénéfices avec Parallaxe - Uniquement pour Food Cost */}
      {toolId === 'food-cost' && (
        <ResponsiveSection 
          spacing="xxl" 
          className="relative"
          style={{
            backgroundColor: '#1a1a1a'
          }}
        >
          {/* Images en split screen 50/50 */}
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            {/* Moitié gauche - restaurant1.avif */}
            <div 
              className="absolute top-0 left-0 bottom-0 w-1/2"
              style={{
                backgroundImage: 'url(/restaurant1.avif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Moitié droite - cocktail.avif */}
            <div 
              className="absolute top-0 right-0 bottom-0 w-1/2"
              style={{
                backgroundImage: 'url(/cocktail.avif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          
          {/* Overlay subtil */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1 }}
          />

          {/* Contenu */}
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Titre */}
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
                style={{ color: 'white' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {isEnglish ? 'Immediate Benefits' : 'Des bénéfices immédiats'}
              </motion.h2>
              
              {/* 4 cartes simples avec sélection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {benefitCards.map((card, index) => {
                  const isSelected = selectedCard === card.concept;
                  
                  return (
                    <motion.div
                      key={card.concept}
                      className="p-6 rounded-xl cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: card.color,
                        border: isSelected ? `3px solid ${card.border}` : `2px solid ${card.border}`,
                        opacity: isSelected ? 1 : 0.3
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: isSelected ? 1 : 0.3, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                      onClick={() => setSelectedCard(card.concept)}
                    >
                      <h3 className="text-lg font-bold mb-3" style={{ color: '#1a1a1a' }}>
                        {isEnglish ? card.titleEn : card.titleFr}
                      </h3>
                      <p className="text-sm" style={{ color: '#1a1a1a', opacity: 0.85 }}>
                        {isEnglish ? card.descEn : card.descFr}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Layout 3 colonnes : Nombre | Graphique | Texte */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 items-center">
                {/* Colonne 1 : Nombre géant */}
                <motion.div
                  key={`number-${selectedCard}`}
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div 
                    className="text-8xl font-black mb-4"
                    style={{ 
                      color: benefitCards.find(c => c.concept === selectedCard)?.border,
                      textShadow: `0 0 60px ${benefitCards.find(c => c.concept === selectedCard)?.color}`
                    }}
                  >
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.statEn.split(' ')[0]
                      : benefitCards.find(c => c.concept === selectedCard)?.statFr.split(' ')[0]}
                  </div>
                  <div className="text-lg font-semibold text-center" style={{ color: 'white', opacity: 0.9 }}>
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.statEn.split(' ').slice(1).join(' ')
                      : benefitCards.find(c => c.concept === selectedCard)?.statFr.split(' ').slice(1).join(' ')}
                  </div>
                </motion.div>
                
                {/* Colonne 2 : Graphique avec cercles concentriques */}
                <motion.div
                  key={`graphic-${selectedCard}`}
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative h-64 w-64 flex items-center justify-center">
                    {/* Cercles d'arrière-plan */}
                    {[1, 2, 3].map((ring, i) => (
                      <motion.div
                        key={ring}
                        className="absolute rounded-full"
                        style={{
                          width: `${80 + (i * 60)}px`,
                          height: `${80 + (i * 60)}px`,
                          border: `2px solid ${benefitCards.find(c => c.concept === selectedCard)?.border}`,
                          opacity: 0.2 - (i * 0.05)
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 - (i * 0.05) }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    ))}
                    
                    {/* Cercle central avec couleur de la carte */}
                    <motion.div
                      className="absolute w-32 h-32 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: benefitCards.find(c => c.concept === selectedCard)?.color,
                        border: `4px solid ${benefitCards.find(c => c.concept === selectedCard)?.border}`,
                        boxShadow: `0 0 60px ${benefitCards.find(c => c.concept === selectedCard)?.color}`
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
                          {selectedCard === 'operate' ? '50%' : 
                           selectedCard === 'automate' ? '100%' :
                           selectedCard === 'analyze' ? '2-5%' : '8-10%'}
                        </div>
                        <div className="text-xs font-semibold" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                          {isEnglish ? 'Impact' : 'Impact'}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Colonne 3 : Texte explicatif */}
                <motion.div
                  key={`text-${selectedCard}`}
                  className="flex flex-col justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: 'white' }}>
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.titleEn
                      : benefitCards.find(c => c.concept === selectedCard)?.titleFr}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'white', opacity: 0.9 }}>
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.descEn
                      : benefitCards.find(c => c.concept === selectedCard)?.descFr}
                  </p>
                </motion.div>
              </div>
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
