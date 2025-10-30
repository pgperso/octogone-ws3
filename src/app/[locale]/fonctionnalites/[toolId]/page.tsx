"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Zap, TrendingUp, Sparkles } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import FeatureSectionWidget from "@/components/widgets/feature-section-widget";
import { getToolById, getNextTool, getPreviousTool } from "@/data/tools/tools-content";
import { ToolSEO } from "@/components/seo/tool-seo";
import { LogoCard } from "@/components/widgets/logo-card";
import OctogoneDashboardKPIs from "@/components/widgets/OctogoneDashboardKPIs";
import { InventoryFlowContainer } from "@/components/widgets/octogone_inventories";
import { RecipeFlowContainer } from "@/components/widgets/octogone_recipe";
import { RotatingText } from "@/components/ui/rotating-text";
import { OctogoneButton } from "@/components/ui/octogone-button";
import { Lock } from "lucide-react";

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
  
  // Type guard pour toolId
  const isInventaire = tool.id === 'inventaire';
  const isFoodCost = tool.id === 'food-cost';
  
  // Couleurs pour le hero
  const heroTextColor = (isFoodCost || isInventaire) ? '#1a1a1a' : 'white';
  
  // Cartes de bénéfices - Food Cost
  const foodCostBenefitCards = [
    {
      concept: 'operate',
      icon: Play,
      color: 'rgba(184, 224, 210, 0.85)',
      border: '#A5CABE',
      titleFr: 'Standardisation complète',
      titleEn: 'Complete Standardization',
      descFr: 'Recettes unifiées pour tous',
      descEn: 'Unified recipes for everyone',
      statFr: '50% de temps économisé',
      statEn: '50% time saved',
      explanationFr: 'La création manuelle de fiches recettes prend en moyenne 15-20 minutes par recette. Avec un catalogue centralisé de produits et des outils de création rapide, vous créez une fiche complète en 5-7 minutes. Pour un restaurant avec 80 recettes, cela représente 16-20 heures économisées. De plus, toute modification se propage instantanément à toutes les équipes, éliminant les versions obsolètes et les erreurs de communication.',
      explanationEn: 'Manual recipe card creation takes an average of 15-20 minutes per recipe. With a centralized product catalog and quick creation tools, you create a complete card in 5-7 minutes. For a restaurant with 80 recipes, this represents 16-20 hours saved. Additionally, any modification instantly propagates to all teams, eliminating outdated versions and communication errors.'
    },
    {
      concept: 'automate',
      icon: Zap,
      color: 'rgba(180, 212, 255, 0.85)',
      border: '#A5C4E6',
      titleFr: 'Mise à jour automatique',
      titleEn: 'Automatic Updates',
      descFr: 'Prix fournisseurs → Recettes en temps réel',
      descEn: 'Supplier prices → Recipes in real-time',
      statFr: '100% des recettes',
      statEn: '100% of recipes',
      explanationFr: 'Lorsqu\'un prix fournisseur augmente, l\'impact se propage à toutes les recettes concernées en temps réel. Plus besoin de passer des heures à identifier quels plats sont affectés et à recalculer leurs coûts. Le système détecte automatiquement les changements de prix et met à jour toutes vos fiches recettes instantanément, vous permettant de réagir rapidement et d\'ajuster vos prix de vente si nécessaire.',
      explanationEn: 'When a supplier price increases, the impact propagates to all affected recipes in real-time. No more spending hours identifying which dishes are affected and recalculating their costs. The system automatically detects price changes and updates all your recipe cards instantly, allowing you to react quickly and adjust your selling prices if needed.'
    },
    {
      concept: 'analyze',
      icon: TrendingUp,
      color: 'rgba(255, 229, 180, 0.85)',
      border: '#F5D89E',
      titleFr: 'Visibilité totale des coûts',
      titleEn: 'Complete Cost Visibility',
      descFr: 'Food cost % exact sur chaque plat',
      descEn: 'Exact food cost % on every dish',
      statFr: '2-5% de réduction',
      statEn: '2-5% reduction',
      explanationFr: 'Les restaurants qui ne suivent pas leurs coûts précisément perdent en moyenne 3-4% de leur chiffre d\'affaires en gaspillage et portions excessives. En connaissant le food cost exact de chaque plat, vous identifiez immédiatement les recettes non rentables, détectez les écarts de portions, et repérez le gaspillage. Cette visibilité vous permet d\'optimiser votre menu et de protéger vos marges.',
      explanationEn: 'Restaurants that don\'t track their costs precisely lose an average of 3-4% of revenue to waste and over-portioning. By knowing the exact food cost of each dish, you immediately identify unprofitable recipes, detect portion variances, and spot waste. This visibility allows you to optimize your menu and protect your margins.'
    },
    {
      concept: 'predict',
      icon: Sparkles,
      color: 'rgba(200, 182, 255, 0.85)',
      border: '#B8A5F0',
      titleFr: 'Optimisation intelligente',
      titleEn: 'Smart Optimization',
      descFr: 'Suggestions pour améliorer vos marges',
      descEn: 'Suggestions to improve your margins',
      statFr: '8-10% de gain',
      statEn: '8-10% gain',
      explanationFr: 'L\'analyse de milliers de restaurants montre que des ajustements ciblés sur les recettes à fort volume peuvent améliorer les marges de 8-10%. Le système identifie vos opportunités : substitutions d\'ingrédients moins coûteux sans impact qualité, ajustements de portions sur les plats à faible marge, et optimisation du mix produit. Ces recommandations sont basées sur vos données réelles et votre positionnement.',
      explanationEn: 'Analysis of thousands of restaurants shows that targeted adjustments on high-volume recipes can improve margins by 8-10%. The system identifies your opportunities: less expensive ingredient substitutions without quality impact, portion adjustments on low-margin dishes, and product mix optimization. These recommendations are based on your actual data and positioning.'
    }
  ];

  // Cartes de bénéfices - Inventaire
  const inventaireBenefitCards = [
    {
      concept: 'operate',
      icon: Play,
      color: 'rgba(184, 224, 210, 0.85)',
      border: '#A5CABE',
      titleFr: 'Inventaire collaboratif',
      titleEn: 'Collaborative Inventory',
      descFr: 'Plusieurs équipes en simultané',
      descEn: 'Multiple teams simultaneously',
      statFr: '65% plus rapide',
      statEn: '65% faster',
      explanationFr: 'L\'inventaire manuel traditionnel prend 3-4 heures pour un restaurant moyen. Avec la saisie collaborative et le mode hors ligne, plusieurs membres de l\'équipe comptent simultanément dans différentes zones. Un inventaire complet se fait maintenant en 50-80 minutes. Cette rapidité permet des comptages plus fréquents, améliorant la précision et la réactivité face aux écarts.',
      explanationEn: 'Traditional manual inventory takes 3-4 hours for an average restaurant. With collaborative entry and offline mode, multiple team members count simultaneously in different zones. A complete inventory now takes 50-80 minutes. This speed enables more frequent counts, improving accuracy and responsiveness to variances.'
    },
    {
      concept: 'automate',
      icon: Zap,
      color: 'rgba(180, 212, 255, 0.85)',
      border: '#A5C4E6',
      titleFr: 'Alertes en temps réel',
      titleEn: 'Real-Time Alerts',
      descFr: 'Détection instantanée des seuils',
      descEn: 'Instant threshold detection',
      statFr: '95% des ruptures',
      statEn: '95% of shortages',
      explanationFr: 'Les ruptures de stock coûtent cher : ventes perdues, clients déçus, substitutions d\'urgence. Le système détecte automatiquement les produits sous leur seuil minimum pendant l\'inventaire et génère immédiatement des bons de commande ou de production. Vous agissez en temps réel au lieu d\'attendre la fin du comptage, éliminant les ruptures évitables.',
      explanationEn: 'Stock shortages are costly: lost sales, disappointed customers, emergency substitutions. The system automatically detects products below minimum threshold during inventory and immediately generates purchase or production orders. You act in real-time instead of waiting for count completion, eliminating avoidable shortages.'
    },
    {
      concept: 'analyze',
      icon: TrendingUp,
      color: 'rgba(255, 229, 180, 0.85)',
      border: '#F5D89E',
      titleFr: 'Réduction du gaspillage',
      titleEn: 'Waste Reduction',
      descFr: 'Écarts physique vs théorique',
      descEn: 'Physical vs theoretical variances',
      statFr: '3-6% de coûts',
      statEn: '3-6% of costs',
      explanationFr: 'Les restaurants qui ne comparent pas leur inventaire physique avec leur inventaire théorique perdent 3-6% de leur chiffre d\'affaires en gaspillage non détecté, sur-portions et pertes. En identifiant précisément les écarts, vous détectez rapidement les problèmes de portions, les erreurs de recettes, et les zones de gaspillage, protégeant directement vos marges.',
      explanationEn: 'Restaurants that don\'t compare physical inventory with theoretical inventory lose 3-6% of revenue to undetected waste, over-portioning and losses. By precisely identifying variances, you quickly detect portion problems, recipe errors, and waste areas, directly protecting your margins.'
    },
    {
      concept: 'predict',
      icon: Sparkles,
      color: 'rgba(200, 182, 255, 0.85)',
      border: '#B8A5F0',
      titleFr: 'Prévisions intelligentes',
      titleEn: 'Smart Forecasting',
      descFr: 'Commandes optimisées automatiquement',
      descEn: 'Automatically optimized orders',
      statFr: '18-25% de stock',
      statEn: '18-25% of stock',
      explanationFr: 'Le sur-stockage immobilise du capital et augmente le risque de péremption. Le sous-stockage cause des ruptures et des ventes perdues. En analysant vos historiques de ventes et vos tendances, le système suggère les quantités optimales à commander, réduisant votre stock moyen de 18-25% tout en maintenant la disponibilité. Moins de capital immobilisé, moins de gaspillage.',
      explanationEn: 'Over-stocking ties up capital and increases spoilage risk. Under-stocking causes shortages and lost sales. By analyzing your sales history and trends, the system suggests optimal order quantities, reducing your average stock by 18-25% while maintaining availability. Less tied-up capital, less waste.'
    }
  ];

  // Sélectionner les bonnes cartes selon le toolId
  const benefitCards = isInventaire ? inventaireBenefitCards : foodCostBenefitCards;
  
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
            ...(isFoodCost && {
              background: 'linear-gradient(135deg, #B8E0D2 0%, #A5CABE 100%)'
            }),
            ...(isInventaire && {
              background: 'linear-gradient(135deg, #B4D4FF 0%, #A5C4E6 100%)'
            })
          }} />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 178, 107, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(186, 223, 246, 0.3) 0%, transparent 50%)'
            }}
          />
          {!isFoodCost && !isInventaire && <div className="absolute inset-0 bg-black/50"></div>}
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
              color: (isFoodCost || isInventaire) ? '#1a1a1a' : 'white',
              textShadow: (isFoodCost || isInventaire) ? 'none' : '0 2px 8px rgba(0,0,0,0.5)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isFoodCost ? (
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
      {tool.id === 'octogone-360' && (
        <ResponsiveSection spacing="xl" bgColor="">
          <OctogoneDashboardKPIs locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Flow Inventaire - Uniquement pour Inventaire */}
      {isInventaire && (
        <ResponsiveSection spacing="xxl" bgColor="">
          <InventoryFlowContainer locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Section Bénéfices avec Parallaxe - Uniquement pour Inventaire */}
      {isInventaire && (
        <div className="py-16 md:py-24">
          <div className="relative px-3 md:px-4">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Images en split screen 50/50 */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                {/* Moitié gauche - inventory1 */}
                <div 
                  className="absolute top-0 left-0 bottom-0 w-1/2"
                  style={{
                    backgroundImage: 'url(/images/pages/inventory1.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Moitié droite - inventory4 */}
                <div 
                  className="absolute top-0 right-0 bottom-0 w-1/2"
                  style={{
                    backgroundImage: 'url(/images/pages/inventory4.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              
              {/* Overlay subtil */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1 }}
              />

              {/* Contenu */}
              <div className="relative z-10 py-16 md:py-24 px-4 md:px-8">
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
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
                    {benefitCards.map((card, index) => {
                      const isSelected = selectedCard === card.concept;
                      
                      return (
                        <motion.div
                          key={card.concept}
                          className="p-6 rounded-xl cursor-pointer relative"
                          style={{
                            backgroundColor: card.color,
                            border: isSelected ? `3px solid ${card.border}` : `2px solid ${card.border}`,
                            opacity: isSelected ? 1 : 0.3,
                            boxShadow: isSelected 
                              ? `0 0 40px ${card.color}, 0 0 0 8px rgba(255,255,255,0.1), 0 0 0 16px rgba(255,255,255,0.05)` 
                              : 'none',
                            transition: 'all 0.3s ease'
                          }}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: isSelected ? 1 : 0.3, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                          whileHover={{
                            opacity: 1,
                            boxShadow: `0 0 40px ${card.color}, 0 0 0 8px rgba(255,255,255,0.1), 0 0 0 16px rgba(255,255,255,0.05)`
                          }}
                          onClick={() => setSelectedCard(card.concept)}
                        >
                          <div className="flex items-start gap-3">
                            {React.createElement(card.icon, { className: "w-6 h-6 flex-shrink-0 mt-1", style: { color: '#1a1a1a' } })}
                            <div>
                              <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>
                                {isEnglish ? card.titleEn : card.titleFr}
                              </h3>
                              <p className="text-sm" style={{ color: '#1a1a1a', opacity: 0.85 }}>
                                {isEnglish ? card.descEn : card.descFr}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* Layout responsive */}
                  <div className="grid grid-cols-1 gap-8 mt-8">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 items-center">
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
                      
                      {/* Colonne 2 : Graphique */}
                      <motion.div
                        key={`graphic-${selectedCard}`}
                        className="flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="relative h-64 w-64 flex items-center justify-center">
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
                                {isInventaire
                                  ? (selectedCard === 'operate' ? '65%' : 
                                     selectedCard === 'automate' ? '95%' :
                                     selectedCard === 'analyze' ? '3-6%' : '18-25%')
                                  : (selectedCard === 'operate' ? '50%' : 
                                     selectedCard === 'automate' ? '100%' :
                                     selectedCard === 'analyze' ? '2-5%' : '8-10%')
                                }
                              </div>
                              <div className="text-xs font-semibold" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                                {isEnglish ? 'Impact' : 'Impact'}
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      {/* Colonne 3 : Texte - Desktop */}
                      <motion.div
                        key={`text-${selectedCard}`}
                        className="hidden lg:flex flex-col justify-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold" style={{ color: 'white' }}>
                            {isEnglish 
                              ? benefitCards.find(c => c.concept === selectedCard)?.titleEn
                              : benefitCards.find(c => c.concept === selectedCard)?.titleFr}
                          </h3>
                          {selectedCard === 'predict' && (
                            <span 
                              className="px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                              style={{ 
                                backgroundColor: benefitCards.find(c => c.concept === selectedCard)?.color,
                                color: '#1a1a1a'
                              }}
                            >
                              {isEnglish ? 'Coming Soon' : 'Bientôt'}
                            </span>
                          )}
                        </div>
                        <p className="text-base leading-relaxed" style={{ color: 'white', opacity: 0.9 }}>
                          {isEnglish 
                            ? benefitCards.find(c => c.concept === selectedCard)?.explanationEn
                            : benefitCards.find(c => c.concept === selectedCard)?.explanationFr}
                        </p>
                      </motion.div>
                    </div>
                    
                    {/* Texte - Mobile */}
                    <motion.div
                      key={`text-mobile-${selectedCard}`}
                      className="lg:hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold" style={{ color: 'white' }}>
                          {isEnglish 
                            ? benefitCards.find(c => c.concept === selectedCard)?.titleEn
                            : benefitCards.find(c => c.concept === selectedCard)?.titleFr}
                        </h3>
                        {selectedCard === 'predict' && (
                          <span 
                            className="px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                            style={{ 
                              backgroundColor: benefitCards.find(c => c.concept === selectedCard)?.color,
                              color: '#1a1a1a'
                            }}
                          >
                            {isEnglish ? 'Coming Soon' : 'Bientôt'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'white', opacity: 0.9 }}>
                        {isEnglish 
                          ? benefitCards.find(c => c.concept === selectedCard)?.explanationEn
                          : benefitCards.find(c => c.concept === selectedCard)?.explanationFr}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Widget Recettes - Uniquement pour Food Cost */}
      {isFoodCost && (
        <ResponsiveSection spacing="xxl" bgColor="">
          <RecipeFlowContainer locale={locale as 'fr' | 'en'} />
        </ResponsiveSection>
      )}

      {/* Section Bénéfices avec Parallaxe - Uniquement pour Food Cost */}
      {isFoodCost && (
        <div className="py-16 md:py-24">
          {/* Wrapper avec petit padding horizontal et radius pour effet flottant */}
          <div className="relative px-3 md:px-4">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Images en split screen 50/50 */}
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
            {/* Moitié gauche - recipe */}
            <div 
              className="absolute top-0 left-0 bottom-0 w-1/2"
              style={{
                backgroundImage: 'url(/images/pages/pizza.avif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Moitié droite - cocktail */}
            <div 
              className="absolute top-0 right-0 bottom-0 w-1/2"
              style={{
                backgroundImage: 'url(/images/pages/cocktail.avif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
          
          {/* Overlay subtil */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 1 }}
          />

          {/* Contenu */}
          <div className="relative z-10 py-16 md:py-24 px-4 md:px-8">
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
              
              {/* 4 cartes simples avec sélection - 2x2 sur mobile, 4 colonnes sur desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
                {benefitCards.map((card, index) => {
                  const isSelected = selectedCard === card.concept;
                  
                  return (
                    <motion.div
                      key={card.concept}
                      className="p-6 rounded-xl cursor-pointer relative"
                      style={{
                        backgroundColor: card.color,
                        border: isSelected ? `3px solid ${card.border}` : `2px solid ${card.border}`,
                        opacity: isSelected ? 1 : 0.3,
                        boxShadow: isSelected 
                          ? `0 0 40px ${card.color}, 0 0 0 8px rgba(255,255,255,0.1), 0 0 0 16px rgba(255,255,255,0.05)` 
                          : 'none',
                        transition: 'all 0.3s ease'
                      }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: isSelected ? 1 : 0.3, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                      whileHover={{
                        opacity: 1,
                        boxShadow: `0 0 40px ${card.color}, 0 0 0 8px rgba(255,255,255,0.1), 0 0 0 16px rgba(255,255,255,0.05)`
                      }}
                      onClick={() => setSelectedCard(card.concept)}
                    >
                      
                      <div className="flex items-start gap-3">
                        {React.createElement(card.icon, { className: "w-6 h-6 flex-shrink-0 mt-1", style: { color: '#1a1a1a' } })}
                        <div>
                          <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1a1a' }}>
                            {isEnglish ? card.titleEn : card.titleFr}
                          </h3>
                          <p className="text-sm" style={{ color: '#1a1a1a', opacity: 0.85 }}>
                            {isEnglish ? card.descEn : card.descFr}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Layout responsive : Mobile (2 cols + texte) | Desktop (3 cols) */}
              <div className="grid grid-cols-1 gap-8 mt-8">
                {/* Rangée 1 sur mobile : Nombre + Graphique en 2 colonnes */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 items-center">
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
                          {isInventaire
                            ? (selectedCard === 'operate' ? '65%' : 
                               selectedCard === 'automate' ? '95%' :
                               selectedCard === 'analyze' ? '3-6%' : '18-25%')
                            : (selectedCard === 'operate' ? '50%' : 
                               selectedCard === 'automate' ? '100%' :
                               selectedCard === 'analyze' ? '2-5%' : '8-10%')
                          }
                        </div>
                        <div className="text-xs font-semibold" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                          {isEnglish ? 'Impact' : 'Impact'}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Colonne 3 : Texte explicatif - Caché sur mobile, visible sur desktop */}
                <motion.div
                  key={`text-${selectedCard}`}
                  className="hidden lg:flex flex-col justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'white' }}>
                      {isEnglish 
                        ? benefitCards.find(c => c.concept === selectedCard)?.titleEn
                        : benefitCards.find(c => c.concept === selectedCard)?.titleFr}
                    </h3>
                    {selectedCard === 'predict' && (
                      <span 
                        className="px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                        style={{ 
                          backgroundColor: benefitCards.find(c => c.concept === selectedCard)?.color,
                          color: '#1a1a1a'
                        }}
                      >
                        {isEnglish ? 'Coming Soon' : 'Bientôt'}
                      </span>
                    )}
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: 'white', opacity: 0.9 }}>
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.explanationEn
                      : benefitCards.find(c => c.concept === selectedCard)?.explanationFr}
                  </p>
                </motion.div>
                </div>
                
                {/* Rangée 2 sur mobile : Texte en pleine largeur */}
                <motion.div
                  key={`text-mobile-${selectedCard}`}
                  className="lg:hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold" style={{ color: 'white' }}>
                      {isEnglish 
                        ? benefitCards.find(c => c.concept === selectedCard)?.titleEn
                        : benefitCards.find(c => c.concept === selectedCard)?.titleFr}
                    </h3>
                    {selectedCard === 'predict' && (
                      <span 
                        className="px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                        style={{ 
                          backgroundColor: benefitCards.find(c => c.concept === selectedCard)?.color,
                          color: '#1a1a1a'
                        }}
                      >
                        {isEnglish ? 'Coming Soon' : 'Bientôt'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'white', opacity: 0.9 }}>
                    {isEnglish 
                      ? benefitCards.find(c => c.concept === selectedCard)?.explanationEn
                      : benefitCards.find(c => c.concept === selectedCard)?.explanationFr}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section - Widget réutilisable */}
      <ResponsiveSection spacing="xxl" bgColor="">
        <FeatureSectionWidget tool={tool} locale={locale} />
      </ResponsiveSection>

      {/* CTA Gel de tarifs - Pour Food Cost et Inventaire */}
      {(isFoodCost || isInventaire) && (
        <ResponsiveSection spacing="xl" bgColor="">
          <div className="max-w-4xl mx-auto">
            {/* Séparateur */}
            <motion.div 
              className="mb-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
              <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
                {isEnglish ? 'Lock in Your Price Today' : 'Verrouillez votre tarif dès aujourd\'hui'}
              </div>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="text-center text-base mb-6 max-w-2xl mx-auto" 
              style={{ color: 'var(--on-surface-variant)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {isEnglish 
                ? 'A new version of Octogone is in preparation. Subscribe now and benefit from a price freeze: you\'ll pay today\'s price, even when the new version launches. Secure your rate before it\'s too late.'
                : 'Une nouvelle version d\'Octogone est en préparation. Abonnez-vous dès maintenant et profitez d\'un gel de tarifs : vous paierez le prix actuel, même lors du lancement de la nouvelle version. Sécurisez votre tarif avant qu\'il ne soit trop tard.'
              }
            </motion.p>
            
            {/* Bouton */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OctogoneButton
                href={`/${locale}/contact`}
                variant="priceFreeze"
                size="lg"
                icon={<Lock className="w-5 h-5" />}
              >
                {isEnglish
                  ? 'Reserve Your Time Slot'
                  : 'Réserver votre plage horaire'}
              </OctogoneButton>
            </motion.div>
          </div>
        </ResponsiveSection>
      )}

      {/* Section Partenaires - RH : Gestionnaires d'horaires */}
      {tool.id === 'ressources-humaines' && (
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
      </main>
    </>
  );
}
