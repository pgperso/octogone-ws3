"use client";

import React from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ResponsiveSection } from "@/components/ui/responsive-section";
import { Brain, Sparkles, MessageSquare, TrendingUp, Clock, Zap } from "lucide-react";
import { OctogoneButton } from "@/components/ui/octogone-button";
import { getConceptById } from "@/data/features/features-content";
import AnimatedChat from '@/features/cortex/components/animated-chat';
import Image from "next/image";
import Head from "next/head";

export default function CortexPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isEnglish = locale === "en";
  const [activeTab, setActiveTab] = React.useState<'now' | 'soon'>('now');

  // Constantes pour éviter la duplication
  const CORTEX_GRADIENT = 'linear-gradient(135deg, #BADFF6 0%, #E2CDED 100%)';
  const CORTEX_ICON_FILTER = 'brightness(0) saturate(100%) invert(8%) sepia(15%) saturate(3207%) hue-rotate(167deg) brightness(96%) contrast(101%)';
  
  const concept = getConceptById('cortex');
  if (!concept) return null;

  // SEO data
  const title = isEnglish ? concept.heroTitleEn : concept.heroTitleFr;
  const description = isEnglish ? concept.heroDescriptionEn : concept.heroDescriptionFr;
  const keywords = isEnglish 
    ? 'restaurant AI assistant, artificial intelligence, Cortex AI, natural questions, instant answers, data optimization, restaurant chatbot'
    : 'assistant IA restaurant, intelligence artificielle, Cortex AI, questions naturelles, réponses instantanées, optimisation données, chatbot restaurant';
  const url = `https://octogone.app/${locale}/cortex`;
  const imageUrl = concept.heroImage.startsWith('http') ? concept.heroImage : `https://octogone.app${concept.heroImage}`;

  const capabilitiesNow = [
    {
      icon: MessageSquare,
      titleFr: "Conversation naturelle",
      titleEn: "Natural Conversation",
      descFr: "Posez vos questions comme à un collègue. Cortex comprend le langage humain, interprète vos intentions et vous répond instantanément, sans détour.",
      descEn: "Ask questions as you would to a colleague. Cortex understands human language, interprets your intentions and responds instantly, without detours."
    },
    {
      icon: Zap,
      titleFr: "Réponses instantanées",
      titleEn: "Instant Responses",
      descFr: "Plus besoin de fouiller dans des rapports. Cortex vous donne la bonne réponse, au bon moment, en quelques secondes.",
      descEn: "No more digging through reports. Cortex gives you the right answer, at the right time, in seconds."
    },
    {
      icon: Clock,
      titleFr: "Disponible 24/7",
      titleEn: "Available 24/7",
      descFr: "Toujours prêt, toujours attentif. Cortex travaille en continu, de jour comme de nuit, pour que vous ne perdiez jamais une occasion d'agir.",
      descEn: "Always ready, always attentive. Cortex works continuously, day and night, so you never miss an opportunity to act."
    }
  ];

  const capabilitiesSoon = [
    {
      icon: Brain,
      titleFr: "Analyse intelligente",
      titleEn: "Intelligent Analysis",
      descFr: "Cortex transforme vos données en insights clairs et actionnables : comprenez ce qui se passe, pourquoi et ce qu'il faut faire ensuite.",
      descEn: "Cortex transforms your data into clear and actionable insights: understand what's happening, why, and what to do next."
    },
    {
      icon: TrendingUp,
      titleFr: "Prédictions précises",
      titleEn: "Accurate Predictions",
      descFr: "Anticipez les ventes, les besoins en stock et les fluctuations de coûts. Cortex vous aide à toujours avoir une longueur d'avance.",
      descEn: "Anticipate sales, inventory needs and cost fluctuations. Cortex helps you stay one step ahead."
    },
    {
      icon: Sparkles,
      titleFr: "Apprentissage continu",
      titleEn: "Continuous Learning",
      descFr: "Chaque utilisation rend Cortex plus intelligent. Plus vous l'utilisez, plus il comprend votre établissement et ses particularités.",
      descEn: "Every use makes Cortex smarter. The more you use it, the better it understands your establishment and its particularities."
    }
  ];

  const currentCapabilities = activeTab === 'now' ? capabilitiesNow : capabilitiesSoon;

  // Type pour les capacités
  type Capability = {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    titleFr: string;
    titleEn: string;
    descFr: string;
    descEn: string;
  };

  return (
    <>
      {/* SEO Head Metadata */}
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{`${title} | Octogone`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Octogone" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${title} | Octogone`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={isEnglish ? concept.nameEn : concept.nameFr} />
        <meta property="og:site_name" content="Octogone" />
        <meta property="og:locale" content={locale === 'fr' ? 'fr_CA' : 'en_CA'} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Octogone`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:creator" content="@OctogoneApp" />
        
        {/* Alternate languages */}
        <link rel="alternate" hrefLang="fr-CA" href={`https://octogone.app/fr/cortex`} />
        <link rel="alternate" hrefLang="en-CA" href={`https://octogone.app/en/cortex`} />
        <link rel="alternate" hrefLang="x-default" href={`https://octogone.app/fr/cortex`} />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Cortex AI Assistant",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": description,
              "url": url,
              "publisher": {
                "@type": "Organization",
                "name": "Octogone",
                "url": "https://octogone.app"
              },
              "offers": {
                "@type": "Offer",
                "category": "AI Assistant for Restaurants"
              }
            })
          }}
        />
      </Head>
      <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <ResponsiveSection
        as="section"
        spacing="xl"
        className="relative overflow-hidden"
        style={{ 
          background: CORTEX_GRADIENT
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
              <Image 
                src="/cortex.svg" 
                alt="Cortex" 
                width={20} 
                height={20}
                className="w-5 h-5"
                style={{ filter: 'brightness(0) saturate(100%)', color: 'var(--on-secondary-container)' }}
              />
              <span className="text-sm font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
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

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <OctogoneButton
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                icon={
                  <Image 
                    src="/cortex.svg" 
                    alt="Cortex" 
                    width={20} 
                    height={20}
                    className="inline-block"
                    style={{ 
                      filter: 'brightness(0) saturate(100%)',
                      color: 'var(--on-primary-container)'
                    }}
                  />
                }
              >
                {isEnglish ? "Reserve Your Access to Cortex" : "Réserver votre accès à Cortex"}
              </OctogoneButton>
            </motion.div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <div 
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                backgroundColor: 'var(--surface-variant)'
              }}
            >
              <iframe
                src={concept.heroImage}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                title={locale === 'fr' ? concept.nameFr : concept.nameEn}
              />
            </div>
          </div>
        </div>
      </ResponsiveSection>

      {/* Capabilities Section */}
      <ResponsiveSection
        as="section"
        bgColor=""
        spacing="xxl"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--on-background)' }}>
            {isEnglish ? 'What Cortex Can Do' : 'Ce que Cortex peut faire'}
          </h2>
          
          {/* Toggle Maintenant/Bientôt */}
          <div className="flex items-center justify-center mb-8">
            <div 
              className="relative flex rounded-lg p-1"
              style={{ 
                backgroundColor: 'var(--surface-variant)',
                border: '1px solid var(--outline-variant)'
              }}
            >
              <button
                onClick={() => setActiveTab('now')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'now' 
                    ? 'text-white shadow-lg' 
                    : 'hover:bg-opacity-50'
                }`}
                style={{
                  background: activeTab === 'now' ? CORTEX_GRADIENT : 'transparent',
                  color: activeTab === 'now' 
                    ? 'var(--on-secondary-container)' 
                    : 'var(--on-surface-variant)'
                }}
              >
                {isEnglish ? 'Now' : 'Maintenant'}
              </button>
              <button
                onClick={() => setActiveTab('soon')}
                className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'soon' 
                    ? 'text-white shadow-lg' 
                    : 'hover:bg-opacity-50'
                }`}
                style={{
                  background: activeTab === 'soon' ? CORTEX_GRADIENT : 'transparent',
                  color: activeTab === 'soon' 
                    ? 'var(--on-secondary-container)' 
                    : 'var(--on-surface-variant)'
                }}
              >
                {isEnglish ? 'Soon' : 'Bientôt'}
              </button>
            </div>
          </div>

          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish
              ? 'Cortex is your intelligent assistant that helps you better understand what\'s happening in your establishments, but above all a manager who has answers to many of your questions'
              : 'Cortex est votre assistant intelligent qui vous aide à mieux comprendre ce qui se passe dans vos établissements mais surtout un gestionnaire qui a réponse à beaucoup de vos questions'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCapabilities.map((capability: Capability, index: number) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                className="relative rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Bordure en dégradé Cortex avec halo */}
                <div 
                  className="absolute inset-0 rounded-2xl p-[2px]"
                  style={{
                    background: CORTEX_GRADIENT,
                    boxShadow: '0 0 10px rgba(186, 223, 246, 0.2), 0 0 20px rgba(226, 205, 237, 0.15)'
                  }}
                >
                  <div 
                    className="w-full h-full rounded-2xl"
                    style={{ backgroundColor: 'var(--background)' }}
                  />
                </div>

                {/* Contenu */}
                <div className="relative">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: CORTEX_GRADIENT }}
                  >
                    <Icon className="w-7 h-7" style={{ color: 'var(--on-secondary-container)' }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--on-surface)' }}>
                    {isEnglish ? capability.titleEn : capability.titleFr}
                  </h3>
                  
                  <p style={{ color: 'var(--on-surface-variant)' }}>
                    {isEnglish ? capability.descEn : capability.descFr}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ResponsiveSection>

      {/* Use Cases Section */}
      <ResponsiveSection
        as="section"
        bgColor=""
        spacing="xxl"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#BADFF6] to-[#E2CDED] px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold" style={{ color: 'var(--on-secondary-container)' }}>
              {isEnglish ? 'Coming Soon in Beta' : 'Bientôt disponible en version Beta'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--on-background)' }}>
            {isEnglish ? 'Cortex in Action' : 'Cortex en Action'}
          </h2>
          <div className="text-lg max-w-3xl mx-auto space-y-4">
            <p style={{ color: 'var(--on-surface)' }}>
              {isEnglish
                ? 'Discover* Octogone\'s new AI assistant in exclusive preview. Cortex is your perfect manager who works tirelessly, analyzes, recommends, and predicts. Nothing escapes him. Soon accessible on the current platform version, Cortex will mark the beginning of a new era of intelligent management. Add Cortex to your plan now and benefit from a price freeze when the new version of Octogone launches.'
                : 'Découvrez* en primeur le nouvel assistant IA d\'Octogone. Cortex, c\'est votre gestionnaire parfait qui travaille sans relâche, analyse, recommande et prédit. Rien ne lui échappe. Bientôt accessible sur la version actuelle de la plateforme, Cortex marquera le début d\'une nouvelle ère de gestion intelligente. Ajoutez Cortex à votre forfait maintenant et profitez d\'un gel de tarif lors du lancement de la nouvelle version d\'Octogone.'}
            </p>
          </div>
        </motion.div>

        <div 
          className="rounded-xl p-4 pt-8"
          style={{ 
            border: '1px solid var(--outline)',
            backgroundColor: 'transparent'
          }}
        >
          <AnimatedChat locale={locale} />
        </div>
        
        <motion.div 
          className="text-center mt-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs max-w-4xl mx-auto" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish
              ? '* The interactions and data shown above are simulated demonstrations designed to illustrate Cortex\'s potential capabilities. Actual results and interface may vary in the final version.'
              : '* Les interactions et données présentées ci-dessus sont des démonstrations simulées conçues pour illustrer les capacités potentielles de Cortex. Les résultats et l\'interface réels peuvent différer dans la version finale.'}
          </p>
        </motion.div>
      </ResponsiveSection>

      {/* Section CTA finale */}
      <ResponsiveSection
        as="section"
        bgColor=""
        spacing="xl"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Séparateur */}
        <motion.div 
          className="my-12 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--outline)' }}></div>
          <div className="text-sm font-semibold" style={{ color: 'var(--on-surface-variant)' }}>
            {isEnglish ? 'Discover Octogone\'s new AI' : 'Découvrez le nouvel IA d\'Octogone'}
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
            ? 'Cortex is our AI agent, available in beta. Explore how artificial intelligence can help you make better decisions.'
            : 'Cortex est notre agent IA, disponible en version bêta. Explorez comment l\'intelligence artificielle peut vous aider à prendre de meilleures décisions.'
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
            variant="cortex"
            size="lg"
            icon={
              <Image 
                src="/cortex.svg" 
                alt="Cortex" 
                width={20} 
                height={20}
                className="inline-block"
                style={{ 
                  filter: CORTEX_ICON_FILTER
                }}
              />
            }
          >
            {isEnglish
              ? 'Reserve Your Access to Cortex'
              : 'Réserver votre accès à Cortex'}
          </OctogoneButton>
        </motion.div>
      </ResponsiveSection>

      </main>
    </>
  );
}
