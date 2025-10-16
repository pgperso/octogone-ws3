"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Zap, LineChart, Brain } from "lucide-react";
import { OctogoneButton } from "@/components/ui/octogone-button";
import { useScaleIn } from "@/hooks/use-scroll-scale";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// ⚙️ CONFIGURATION - Ligne animée autour de l'octogone
const ENABLE_ANIMATED_LINE = true; // Mettre à false pour désactiver l'animation de la ligne

// Définition du type pour les logos des clients
interface ClientLogo {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

// Exemples de logos clients
const clientLogos: ClientLogo[] = [
  {
    id: 1,
    name: "Restaurant A",
    logo: "/images/clients/client1.svg",
    alt: "Logo Restaurant A",
  },
  {
    id: 2,
    name: "Restaurant B",
    logo: "/images/clients/client2.svg",
    alt: "Logo Restaurant B",
  },
  {
    id: 3,
    name: "Restaurant C",
    logo: "/images/clients/client3.svg",
    alt: "Logo Restaurant C",
  },
  {
    id: 4,
    name: "Restaurant D",
    logo: "/images/clients/client4.svg",
    alt: "Logo Restaurant D",
  },
  {
    id: 5,
    name: "Restaurant E",
    logo: "/images/clients/client5.svg",
    alt: "Logo Restaurant E",
  },
  {
    id: 6,
    name: "Restaurant F",
    logo: "/images/clients/client6.svg",
    alt: "Logo Restaurant F",
  },
  {
    id: 7,
    name: "Restaurant G",
    logo: "/images/clients/client7.svg",
    alt: "Logo Restaurant G",
  },
  {
    id: 8,
    name: "Restaurant H",
    logo: "/images/clients/client8.svg",
    alt: "Logo Restaurant H",
  },
];

/**
 * Composant Hero - Section principale de la page d'accueil (VERSION SANS ANIMATIONS)
 */
const Hero = () => {
  // Récupérer la locale actuelle des paramètres d'URL
  const params = useParams();
  const locale = params ? (typeof params === 'object' && 'locale' in params ? params.locale as string : "fr") : "fr";
  
  // Fonction de traduction simple (les traductions seront ajoutées plus tard dans les fichiers i18n)
  const t = (key: string, options?: { defaultValue?: string }) => {
    return options?.defaultValue || key;
  };
  
  // Références pour les effets de défilement
  const octogoneRef = useRef<HTMLDivElement>(null);

  // Calculer la hauteur du header dynamiquement
  const [, setHeaderHeight] = useState(0);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('header') as HTMLElement;
      
      if (header) {
        // Utiliser simplement offsetHeight du header
        setHeaderHeight(header.offsetHeight);
      }
    };

    calculateHeaderHeight();
    window.addEventListener('resize', calculateHeaderHeight);
    
    // Observer pour détecter les changements
    const observer = new MutationObserver(calculateHeaderHeight);
    const header = document.querySelector('header');
    if (header) {
      observer.observe(header, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  // État pour l'animation séquentielle et le hover
  const [activeOctogone, setActiveOctogone] = useState<number | null>(0); // Démarre avec Opérer (id: 0)
  const [hoveredOctogone, setHoveredOctogone] = useState<number | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);
  
  // État pour l'alternance du texte des restaurants
  const [currentRestaurantText, setCurrentRestaurantText] = useState<number>(0);
  const [isTextTransitioning, setIsTextTransitioning] = useState<boolean>(false);

  // Détecter si on est sur mobile pour ajuster la taille initiale
  const [isMobile, setIsMobile] = useState(false);
  
  // Vérifier la taille de l'écran au chargement et lors du redimensionnement
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Animation séquentielle des octogones au chargement
  useEffect(() => {
    // Séquence horaire : 10h (0) → 13h (1) → 16h (2) → 20h (3)
    // Opérer → Automatiser → Analyser → Prédire
    const sequence = [0, 1, 2, 3];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setActiveOctogone(sequence[currentIndex]);
      setRotationDegrees(prev => prev + 45); // Ajoute 45° à chaque fois
    }, 5000); // Change tous les 5 secondes

    return () => clearInterval(interval);
  }, []);
  
  // Ajuster la taille initiale en fonction de la taille de l'écran
  const octogoneScale = useScaleIn({
    initialScale: isMobile ? 0.85 : 0.95,
    finalScale: 0.85,
    scrollRange: 250
  });

  // Fonction pour convertir les couleurs du thème en valeurs hex pour SVG
  const getColorValue = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'green_pastel': '#B8E0D2',
      'blue_pastel': '#B4D4FF',
      'yellow_pastel': '#FFE5B4',
      'purple_pastel': '#C8B6FF'
    };
    return colorMap[colorName] || '#000000';
  };

  // Données des octogones (4 au total - Opérer, Automatiser, Analyser, Prédire)
  const octogones = [
    {
      id: 0,
      titleFr: "Opérer",
      titleEn: "Operate",
      descFr: "Gérez vos inventaires en temps réel",
      descEn: "Manage your inventory in real-time",
      LucideIcon: Play,
      color: "text-marine-500",
      pastelColor: "green_pastel", // Vert menthe pastel
      position: "top-left",
      media: "https://video-previews.elements.envatousercontent.com/files/4d84a701-5c1b-47d2-bcee-fe25efab5926/video_preview_h264.mp4",
      mediaType: "video",
      link: "/features/operate"
    },
    {
      id: 1,
      titleFr: "Automatiser",
      titleEn: "Automate",
      descFr: "Recettes et processus automatisés",
      descEn: "Automated recipes and processes",
      LucideIcon: Zap,
      color: "text-gold-500",
      pastelColor: "blue_pastel", // Bleu ciel pastel
      position: "top-right",
      media: "https://video-previews.elements.envatousercontent.com/files/a7d69e9a-192d-41bb-ae64-ebf5b295cfeb/video_preview_h264.mp4",
      mediaType: "video",
      link: "/features/automate"
    },
    {
      id: 2,
      titleFr: "Analyser",
      titleEn: "Analyze",
      descFr: "Food cost et optimisation",
      descEn: "Food cost and optimization",
      LucideIcon: LineChart,
      color: "text-marine-500",
      pastelColor: "yellow_pastel", // Jaune pastel
      position: "bottom-right",
      media: "https://video-previews.elements.envatousercontent.com/7e71a914-f289-4e20-9519-bc1721bece49/watermarked_preview/watermarked_preview.mp4",
      mediaType: "video",
      link: "/features/analyze"
    },
    {
      id: 3,
      titleFr: "Prédire",
      titleEn: "Predict",
      descFr: "IA qui anticipe vos besoins",
      descEn: "AI that anticipates your needs",
      LucideIcon: Brain,
      color: "text-gold-500",
      pastelColor: "purple_pastel", // Mauve du dégradé Cortex
      position: "bottom-left",
      media: "https://video-previews.elements.envatousercontent.com/e341f344-626e-40a6-ab21-24c2140998d1/watermarked_preview/watermarked_preview.mp4",
      mediaType: "video",
      link: "/features/predict"
    }
  ];

  // Textes alternatifs pour les restaurants
  const restaurantTexts = {
    fr: [
      "votre restaurant",
      "vos restaurants", 
      "votre groupe de restaurants",
      "votre franchise de restaurants"
    ],
    en: [
      "your restaurant",
      "your restaurants",
      "your restaurant group", 
      "your restaurant franchise"
    ]
  };

  // Synchroniser le texte avec l'octogone actif
  useEffect(() => {
    if (activeOctogone !== null) {
      setIsTextTransitioning(true);
      
      setTimeout(() => {
        setCurrentRestaurantText(activeOctogone);
        setIsTextTransitioning(false);
      }, 300); // Durée du fade out
    }
  }, [activeOctogone]);

  return (
    <section 
      className="relative overflow-hidden flex items-center min-h-0"
      aria-labelledby="hero-title"
      style={{ 
        backgroundColor: 'var(--background)',
        minHeight: 'calc(100vh - 128px)' // 80px nav + 48px banner en desktop
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full motion-container">
        {/* Fond décoratif */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-marine-50 rounded-bl-[100px] opacity-70" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold-100 rounded-tr-[70px] opacity-60" />
        </div>

        <div className="relative z-10 w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Version mobile compacte - Octogones superposés */}
            <div className="flex lg:hidden justify-center items-start h-[450px] mb-12 order-first pt-4">
              <div className="relative w-[450px] h-[450px] flex justify-center items-center">
                {/* Octogone central avec image dynamique */}
                <div 
                  className="absolute w-[300px] h-[300px]"
                  style={{ zIndex: 1 }}
                >
                  {/* SVG pour l'animation du contour - Octogone extérieur plus grand */}
                  {ENABLE_ANIMATED_LINE && (
                  <svg 
                    className="absolute pointer-events-none" 
                    width="420"
                    height="420"
                    viewBox="0 0 200 200"
                    style={{ 
                      zIndex: 10,
                      left: '-60px',
                      top: '-60px'
                    }}
                  >
                    <path
                      d="M 60,20 L 140,20 L 180,60 L 180,140 L 140,180 L 60,180 L 20,140 L 20,60 Z"
                      fill="none"
                      stroke={activeOctogone !== null ? getColorValue(octogones[activeOctogone].pastelColor) : "#DCB26B"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeDasharray="70 1000"
                      strokeDashoffset="0"
                      style={{
                        animation: 'dashAnimation 4s ease-out infinite',
                        transition: 'stroke 0.5s ease-out'
                      }}
                    />
                  </svg>
                  )}
                  
                  {/* Octogone avec image */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      backgroundColor: 'var(--surface)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                  {/* Images correspondant aux 4 octogones */}
                  {octogones.map((oct) => {
                    const isCurrentActive = activeOctogone === oct.id;
                    const imageMap = {
                      0: '/operate.jpg',  // Opérer
                      1: '/resto.jpg',    // Automatiser
                      2: '/resto.jpg',    // Analyser
                      3: '/predict.jpg'   // Prédire
                    };
                    
                    return (
                      <div 
                        key={oct.id}
                        className="absolute inset-0 w-full h-full transition-opacity duration-500"
                        style={{
                          opacity: isCurrentActive ? 1 : 0,
                          backgroundImage: `url(${imageMap[oct.id as keyof typeof imageMap]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    );
                  })}
                  </div>
                </div>
                
                {/* 4 petits octogones superposés */}
                {octogones.map((oct) => {
                  const isActive = activeOctogone === oct.id || hoveredOctogone === oct.id;
                  const positions = {
                    'top-left': { top: '5px', left: '5px' },
                    'top-right': { top: '5px', right: '5px' },
                    'bottom-left': { bottom: '5px', left: '5px' },
                    'bottom-right': { bottom: '5px', right: '5px' }
                  };
                  const pos = positions[oct.position as keyof typeof positions];
                  
                  return (
                    <Link 
                      key={oct.id}
                      href={`/${locale}${oct.link}`}
                      className="absolute w-[150px] h-[150px] shadow-md flex flex-col items-center justify-center cursor-pointer gap-1"
                      style={{
                        ...pos,
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                        zIndex: isActive ? 10 : 3,
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        backgroundColor: isActive ? getColorValue(oct.pastelColor) : 'var(--surface)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={() => setHoveredOctogone(oct.id)}
                      onMouseLeave={() => setHoveredOctogone(null)}
                    >
                      <oct.LucideIcon 
                        className={`w-10 h-10 ${isActive ? oct.color : ''}`}
                        style={{ color: isActive ? undefined : 'var(--on-surface)' }}
                      />
                      <span 
                        className={`text-[9px] font-semibold text-center px-1 ${isActive ? oct.color : ''}`}
                        style={{ color: isActive ? undefined : 'var(--on-surface)' }}
                      >
                        {locale === 'fr' ? oct.titleFr : oct.titleEn}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Version desktop - Octogones interconnectés */}
            <div className="hidden lg:flex justify-center items-center h-full mt-0 pt-0 mb-2 xs:mb-4 lg:mb-8 order-first lg:order-last">
              <div className="relative w-full max-w-[220px] xs:max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[580px] h-[220px] xs:h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px] xl:h-[580px] flex justify-center items-center overflow-visible">
                
                {/* Lignes de connexion - Derrière tout (4 lignes pour 4 octogones) */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  {/* Coins */}
                  <line 
                    x1="50%" y1="50%" x2="10%" y2="10%" 
                    stroke={activeOctogone === 0 ? getColorValue(octogones[0].pastelColor) : "#000000"} 
                    strokeWidth="4" 
                    strokeDasharray="1,8"
                    strokeLinecap="round"
                    style={{ transition: 'stroke 0.5s linear' }}
                  />
                  <line 
                    x1="50%" y1="50%" x2="90%" y2="10%" 
                    stroke={activeOctogone === 1 ? getColorValue(octogones[1].pastelColor) : "#000000"} 
                    strokeWidth="4" 
                    strokeDasharray="1,8"
                    strokeLinecap="round"
                    style={{ transition: 'stroke 0.5s linear' }}
                  />
                  <line 
                    x1="50%" y1="50%" x2="10%" y2="90%" 
                    stroke={activeOctogone === 3 ? getColorValue(octogones[3].pastelColor) : "#000000"} 
                    strokeWidth="4" 
                    strokeDasharray="1,8"
                    strokeLinecap="round"
                    style={{ transition: 'stroke 0.5s linear' }}
                  />
                  <line 
                    x1="50%" y1="50%" x2="90%" y2="90%" 
                    stroke={activeOctogone === 2 ? getColorValue(octogones[2].pastelColor) : "#000000"} 
                    strokeWidth="4" 
                    strokeDasharray="1,8"
                    strokeLinecap="round"
                    style={{ transition: 'stroke 0.5s linear' }}
                  />
                </svg>

                {/* Octogone central principal */}
                <div 
                  ref={octogoneRef}
                  className="absolute w-[140px] xs:w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] xl:w-[380px] h-[140px] xs:h-[180px] sm:h-[220px] md:h-[260px] lg:h-[320px] xl:h-[380px]"
                  style={{
                    zIndex: 5,
                    transformOrigin: "center center",
                    transform: `scale(${octogoneScale}) rotate(${rotationDegrees}deg)`,
                    transition: 'transform 0.5s ease-out',
                    position: 'relative'
                  }}
                >
                  {/* SVG pour l'animation du contour - Desktop */}
                  {ENABLE_ANIMATED_LINE && (
                  <svg 
                    className="absolute pointer-events-none" 
                    viewBox="0 0 140 140"
                    style={{ 
                      zIndex: 10,
                      width: '140%',
                      height: '140%',
                      left: '-20%',
                      top: '-20%'
                    }}
                  >
                    <path
                      d="M 44,6 L 96,6 L 134,44 L 134,96 L 96,134 L 44,134 L 6,96 L 6,44 Z"
                      fill="none"
                      stroke={activeOctogone !== null ? getColorValue(octogones[activeOctogone].pastelColor) : "#DCB26B"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeDasharray="70 1000"
                      strokeDashoffset="0"
                      style={{
                        animation: 'dashAnimation 4s ease-out infinite',
                        transition: 'stroke 0.5s ease-out'
                      }}
                    />
                  </svg>
                  )}
                  
                  {/* Contenu de l'octogone avec clip-path */}
                  <div
                    style={{
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      backgroundColor: 'var(--surface)',
                      width: '100%',
                      height: '100%',
                      position: 'relative'
                    }}
                  >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transform: `rotate(-${rotationDegrees}deg)`,
                    transition: 'transform 0.5s ease-out'
                  }}>
                    {activeOctogone !== null && octogones[activeOctogone].mediaType === 'video' ? (
                      <>
                        <video
                          key={activeOctogone}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            animation: 'fadeIn 0.5s ease-out'
                          }}
                          poster={activeOctogone === 0 ? '/operate.jpg' : activeOctogone === 3 ? '/predict.jpg' : '/resto.jpg'}
                        >
                          <source src={octogones[activeOctogone].media} type="video/mp4" />
                          {/* Fallback image si la vidéo ne charge pas */}
                          <Image
                            src={activeOctogone === 0 ? '/operate.jpg' : activeOctogone === 3 ? '/predict.jpg' : '/resto.jpg'}
                            alt="Restaurant"
                            fill
                            className="object-cover"
                          />
                        </video>
                      </>
                    ) : (
                      <Image
                        key={activeOctogone !== null ? activeOctogone : 0}
                        src={activeOctogone !== null ? octogones[activeOctogone].media : octogones[0].media}
                        alt="Restaurant"
                        fill
                        className="object-cover"
                        style={{
                          animation: 'fadeIn 0.5s ease-out'
                        }}
                        priority
                        sizes="(max-width: 768px) 220px, (max-width: 1024px) 320px, 380px"
                      />
                    )}
                  </div>
                  <style jsx>{`
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                      }
                      to {
                        opacity: 1;
                      }
                    }
                  `}</style>
                  </div>
                </div>

                {/* Octogones satellites avec interaction */}
                {octogones.map((oct) => {
                  const isActive = activeOctogone === oct.id || hoveredOctogone === oct.id;
                  const positionClasses = {
                    'top-left': '-top-4 -left-4 xs:-top-6 xs:-left-6 sm:-top-8 sm:-left-8',
                    'top-right': '-top-4 -right-4 xs:-top-6 xs:-right-6 sm:-top-8 sm:-right-8',
                    'bottom-left': '-bottom-4 -left-4 xs:-bottom-6 xs:-left-6 sm:-bottom-8 sm:-left-8',
                    'bottom-right': '-bottom-4 -right-4 xs:-bottom-6 xs:-right-6 sm:-bottom-8 sm:-right-8'
                  };

                  return (
                    <Link 
                      key={oct.id}
                      href={`/${locale}${oct.link}`}
                      className={`absolute ${positionClasses[oct.position as keyof typeof positionClasses]} w-[60px] xs:w-[80px] sm:w-[100px] md:w-[130px] lg:w-[160px] h-[60px] xs:h-[80px] sm:h-[100px] md:h-[130px] lg:h-[160px] shadow-lg flex flex-col items-center justify-center cursor-pointer`}
                      style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                        zIndex: 3,
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
                        backgroundColor: isActive ? getColorValue(oct.pastelColor) : 'var(--surface)',
                        transition: 'all 0.5s linear'
                      }}
                      onMouseEnter={() => setHoveredOctogone(oct.id)}
                      onMouseLeave={() => setHoveredOctogone(null)}
                    >
                      <oct.LucideIcon 
                        className={`w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 ${isActive ? oct.color : ''}`}
                        style={{ 
                          transition: 'all 0.5s linear',
                          color: isActive ? undefined : 'var(--on-surface)'
                        }}
                      />
                      <span className={`text-[7px] xs:text-[8px] sm:text-[9px] lg:text-xs font-semibold mt-0.5 xs:mt-1 text-center px-0.5 xs:px-1 ${isActive ? oct.color : ''}`} style={{
                        color: isActive ? undefined : 'var(--on-surface)'
                      }}>
                        {locale === 'fr' ? oct.titleFr : oct.titleEn}
                      </span>
                      {oct.id === 3 && isActive && (
                        <div className="px-4 py-1 rounded-sm text-[8px] xs:text-[9px] sm:text-[10px] lg:text-xs font-medium mt-1 antialiased" style={{
                          backgroundColor: 'var(--surface)',
                          color: 'var(--on-surface)'
                        }}>
                          {locale === 'fr' ? 'Bientôt' : 'Coming Soon'}
                        </div>
                      )}
                    </Link>
                  );
                })}

              </div>
            </div>

            {/* Contenu textuel - En bas sur mobile */}
            <div className="flex flex-col space-y-4 sm:space-y-5 lg:space-y-6 text-center lg:text-left order-last lg:order-first">
              {/* Titre principal - maintenant le slogan */}
              <motion.h1 
                id="hero-title"
                className="font-bold tracking-wide motion-element"
                style={{ 
                  fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                  lineHeight: '1.1',
                  color: 'var(--on-background)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Nettoyage GPU - Technique Netflix
                  const element = document.getElementById('hero-title');
                  if (element) element.classList.add('animation-complete');
                }}
              >
                {t('hero.title', { defaultValue: locale === 'fr' ? 'Opérer, automatiser, analyser, prédire' : 'Operate, automate, analyze, predict' })}
              </motion.h1>

              {/* Sous-titre - maintenant l'explication */}
              <motion.div 
                className="text-center lg:text-left motion-element"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Nettoyage final pour les boutons CTA
                  const element = document.querySelector('[role="group"].motion-element');
                  if (element) element.classList.add('animation-complete');
                }}
              >
                <p 
                  className="font-semibold tracking-wide"
                  style={{ 
                    fontSize: 'clamp(1.125rem, 3vw, 1.875rem)', 
                    lineHeight: '1.3',
                    color: 'var(--on-surface)'
                  }}
                >
                  {locale === "fr" ? (
                    <>
                      La plateforme qui optimise <span className="text-gold-500">vraiment</span> la gestion de{" "}
                      <span 
                        className="inline-block transition-all duration-300 font-bold"
                        style={{ 
                          opacity: isTextTransitioning ? 0 : 1,
                          color: activeOctogone !== null ? getColorValue(octogones[activeOctogone].pastelColor) : 'var(--on-surface)'
                        }}
                      >
                        {restaurantTexts.fr[currentRestaurantText]}
                      </span>
                    </>
                  ) : (
                    <>
                      The platform that <span className="text-gold-500">truly</span> optimizes{" "}
                      <span 
                        className="inline-block transition-all duration-300 font-bold"
                        style={{ 
                          opacity: isTextTransitioning ? 0 : 1,
                          color: activeOctogone !== null ? getColorValue(octogones[activeOctogone].pastelColor) : 'var(--on-surface)'
                        }}
                      >
                        {restaurantTexts.en[currentRestaurantText]}
                      </span>
                      {" "}management
                    </>
                  )}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="mt-0.5 xs:mt-1 lg:mt-2 max-w-2xl mx-auto lg:mx-0 motion-element"
                style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  lineHeight: '1.6',
                  color: 'var(--on-surface)',
                  opacity: 0.9
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Nettoyage GPU pour description
                  const elements = document.querySelectorAll('p.motion-element');
                  elements.forEach(el => el.classList.add('animation-complete'));
                }}
              >
                {t('hero.description', { 
                  defaultValue: locale === 'fr' 
                    ? "Maximisez vos profits et marges en gérant tous vos établissements depuis une seule plateforme. Comparez les performances de vos succursales, optimisez vos inventaires et augmentez votre rentabilité opérationnelle." 
                    : "Maximize your profits and margins by managing all your locations from one platform. Compare branch performance, optimize inventory, and increase your operational profitability."
                })}
              </motion.p>

              {/* Boutons d'action */}
              <motion.div 
                className="mt-2 xs:mt-4 lg:mt-6 flex justify-center lg:justify-start motion-element" 
                role="group" 
                aria-label={locale === 'fr' ? 'Actions principales' : 'Main actions'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // Nettoyage final pour les boutons CTA
                  const element = document.querySelector('[role="group"].motion-element');
                  if (element) element.classList.add('animation-complete');
                }}
              >
                <OctogoneButton
                  href={`/${locale}/demo`}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('hero.cta.primary', { defaultValue: locale === "fr" ? "Voir la plateforme en action" : "See the platform in action" })}
                </OctogoneButton>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
