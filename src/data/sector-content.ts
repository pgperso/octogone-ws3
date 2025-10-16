/**
 * Contenu personnalisé par secteur pour SectorDetailWidget
 * Généré selon le prompt stratégique Octogone
 * 
 * 📊 15 secteurs : 6 types d'entreprises + 9 styles de restaurants
 * 📐 Structure : 4 blocs (résultats, outils, action, CTA)
 * 📈 Métriques standardisées : -25% gaspillage, +10% marge, +15h/sem, >98% précision
 * 🌐 Bilingue FR/EN complet
 * 🎯 Ton : professionnel, orienté résultats, gains mesurables
 */

export interface SectorContent {
  // Bloc 1: Résultats mesurables
  introResultats: {
    fr: string;
    en: string;
  };
  metriques: Array<{
    fr: string;
    en: string;
  }>;
  
  sousTexteSolutions: {
    fr: string;
    en: string;
  };
  
  // Bloc 3: Octogone en action
  texteDemo: {
    fr: string;
    en: string;
  };
  
  // Bloc 4: Appel à l'action
  ctaTexte: {
    fr: string;
    en: string;
  };
  
  // Nouveau bloc visuel avec featureShowcase
  caption?: {
    fr: string;
    en: string;
  };
  
  // Témoignage associé (optionnel)
  testimonial?: {
    id: string; // ID du témoignage à afficher
    showTitle?: boolean; // Afficher le titre ou non
    title?: {
      fr: string;
      en: string;
    };
  };
}

// Interface étendue pour le nouveau format avec featureShowcase
export interface SectorContentV2 {
  // Bloc 1: Résultats mesurables
  introResultats: {
    fr: string;
    en: string;
  };
  metriques: {
    fr: string[];
    en: string[];
  };
  
  // Bloc 2: Outils différenciants
  sousTexteSolutions: {
    fr: string;
    en: string;
  };
  
  // Bloc 3: Octogone en action (nouveau format)
  texteDemo: {
    fr: string;
    en: string;
  };
  visuel?: {
    type: "featureShowcase";
    imagePlaceholder: string;
    title: {
      fr: string;
      en: string;
    };
    subtitle: {
      fr: string;
      en: string;
    };
    points: {
      fr: string[];
      en: string[];
    };
    cta: {
      fr: string;
      en: string;
    };
  };
  caption?: {
    fr: string;
    en: string;
  };
  
  // Bloc 4: Appel à l'action
  ctaTexte: {
    fr: string;
    en: string;
  };
  
  // Témoignage associé (optionnel)
  testimonial?: {
    id: string; // ID du témoignage à afficher
    showTitle?: boolean; // Afficher le titre ou non
    title?: {
      fr: string;
      en: string;
    };
  };
}

// Contenu pour les TYPES D'ENTREPRISES
export const businessTypesContent: Record<string, SectorContent> = {
  'chains-groups': {
    introResultats: {
      fr: "Standardisez vos opérations multi-sites, éliminez les pertes invisibles et augmentez vos marges dès les premières semaines.",
      en: "Standardize multi-site operations, eliminate hidden losses, and lift margins within weeks."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Conçus pour la centralisation, la comparabilité entre emplacements et la constance d'exécution.",
      en: "Built for centralization, cross-location comparability, and execution consistency."
    },
    texteDemo: {
      fr: "Comparez la performance de chaque établissement, repérez les écarts de coûts et reproduisez vos meilleures recettes à l'échelle du réseau.",
      en: "Compare each location's performance, spot cost variances, and replicate your best recipes across the network."
    },
    ctaTexte: {
      fr: "Unifiez vos opérations et gagnez en rentabilité dès le premier mois.",
      en: "Unify operations and lift profitability from month one."
    }
  },

  'independent-restaurants': {
    introResultats: {
      fr: "Reprenez le contrôle de vos coûts réels, réduisez le gaspillage et sécurisez vos marges — sans alourdir votre charge opérationnelle.",
      en: "Regain control over true costs, cut waste, and protect margins—without adding operational burden."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Sélectionnés pour la simplicité d'exécution, la précision des recettes et la visibilité immédiate sur vos chiffres.",
      en: "Chosen for execution simplicity, recipe precision, and instant visibility on your numbers."
    },
    texteDemo: {
      fr: "Visualisez vos coûts matière en direct, ajustez vos portions et sécurisez vos stocks — le tout depuis un tableau de bord clair et unifié.",
      en: "Track food cost live, fine-tune portions, and secure stock levels—all from one clear, unified dashboard."
    },
    ctaTexte: {
      fr: "Maîtrisez vos coûts et gagnez du temps — des résultats dès les premières semaines.",
      en: "Control costs and save time—see results within the first weeks."
    }
  },

  'caterers': {
    introResultats: {
      fr: "Réduisez vos pertes, automatisez la planification et maîtrisez vos coûts de production dès les premières semaines.",
      en: "Reduce waste, automate planning, and control production costs within weeks."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour la production planifiée, la précision des portions et le suivi rigoureux des coûts.",
      en: "Designed for planned production, portion precision, and cost control at scale."
    },
    texteDemo: {
      fr: "Planifiez vos événements, gérez vos recettes et vos inventaires, et suivez la rentabilité de chaque commande depuis un seul tableau de bord.",
      en: "Plan events, manage recipes and inventories, and monitor profitability for every order from a single dashboard."
    },
    ctaTexte: {
      fr: "Maîtrisez vos coûts et livrez avec précision — chaque événement devient plus rentable.",
      en: "Control your costs and deliver with precision — every event becomes more profitable."
    }
  },

  'brewers-distillers': {
    introResultats: {
      fr: "Optimisez la production, maîtrisez vos coûts de brassage et suivez vos marges avec précision — du fût à la bouteille.",
      en: "Optimize production, control brewing costs, and track margins accurately — from keg to bottle."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour la traçabilité, la standardisation des recettes et la surveillance de la qualité en continu.",
      en: "Designed for traceability, recipe standardization, and continuous quality monitoring."
    },
    texteDemo: {
      fr: "De la production à la distribution, visualisez vos coûts réels, anticipez vos besoins et optimisez chaque brassin grâce à une plateforme unifiée.",
      en: "From production to distribution, visualize true costs, anticipate needs, and optimize each brew through one unified platform."
    },
    ctaTexte: {
      fr: "Unifiez votre production, vos stocks et vos ventes pour une rentabilité constante et prévisible.",
      en: "Unify production, inventory, and sales for consistent, predictable profitability."
    }
  },

  'purchasing-groups': {
    introResultats: {
      fr: "Mutualisez vos achats, standardisez vos prix et gagnez en pouvoir de négociation tout en réduisant les pertes et la complexité administrative.",
      en: "Pool your purchasing power, standardize pricing, and reduce waste and admin complexity while boosting margins."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute moyenne", en: "+10% average gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour la mutualisation, la transparence des prix et la simplification des flux d'achat entre partenaires.",
      en: "Built for purchasing mutualization, price transparency, and simplified partner workflows."
    },
    texteDemo: {
      fr: "Visualisez les volumes d'achat, détectez les écarts de prix et obtenez une vue consolidée des performances de votre réseau.",
      en: "View purchase volumes, spot pricing gaps, and access a consolidated overview of your network's performance."
    },
    ctaTexte: {
      fr: "Optimisez vos volumes, négociez plus fort et simplifiez la gestion collective dès aujourd'hui.",
      en: "Optimize volumes, negotiate stronger, and simplify collective management today."
    }
  },

  'retail-commerce': {
    introResultats: {
      fr: "Unifiez votre comptoir de vente et votre cuisine : optimisez vos marges, réduisez les pertes et simplifiez votre gestion au quotidien.",
      en: "Unify your counter and kitchen: optimize margins, cut waste, and simplify daily management."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les commerces hybrides qui combinent vente directe et production alimentaire.",
      en: "Designed for hybrid businesses combining direct retail and in-house food production."
    },
    texteDemo: {
      fr: "Reliez vos ventes, vos inventaires et vos recettes dans un même environnement pour maximiser vos marges et vos décisions.",
      en: "Link your sales, inventory, and recipes in one environment to maximize margins and decision accuracy."
    },
    ctaTexte: {
      fr: "Simplifiez la gestion de votre commerce et augmentez votre rentabilité dès le premier mois.",
      en: "Simplify retail management and boost profitability from the very first month."
    }
  }
};

// Contenu pour les STYLES DE RESTAURANTS
export const restaurantStylesContent: Record<string, SectorContent> = {
  'gastronomic': {
    introResultats: {
      fr: "Affinez votre excellence culinaire avec une précision financière et opérationnelle totale. Maîtrisez vos coûts, vos recettes et vos marges sans compromis sur la qualité.",
      en: "Refine culinary excellence with full operational and financial precision. Control costs, recipes, and margins without compromising quality."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les établissements d'exception qui exigent la rigueur, la constance et la rentabilité derrière chaque assiette.",
      en: "Built for exceptional establishments demanding rigor, consistency, and profitability behind every plate."
    },
    texteDemo: {
      fr: "Surveillez vos coûts matière, ajustez vos portions et mesurez la rentabilité de chaque plat en temps réel, tout en garantissant l'excellence du service.",
      en: "Track food costs, fine-tune portions, and measure profitability dish by dish, while maintaining impeccable service quality."
    },
    ctaTexte: {
      fr: "Gardez le contrôle sur vos coûts sans sacrifier votre art culinaire — Octogone, le partenaire des grandes tables.",
      en: "Control costs without sacrificing artistry — Octogone, the ally of top restaurants."
    }
  },

  'bistro-brasserie': {
    introResultats: {
      fr: "Simplifiez votre gestion quotidienne et gardez vos marges sous contrôle, tout en préservant la convivialité et la qualité de votre service.",
      en: "Simplify daily management and keep margins under control while maintaining your hospitality and quality of service."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les établissements à fort volume qui recherchent régularité, rapidité et rentabilité sans complexité.",
      en: "Built for high-volume venues seeking consistency, speed, and profitability without complexity."
    },
    texteDemo: {
      fr: "Suivez vos ventes et coûts en temps réel, ajustez vos menus selon la rentabilité et améliorez la productivité de vos équipes.",
      en: "Monitor sales and costs in real time, adjust menus by profitability, and boost team efficiency."
    },
    ctaTexte: {
      fr: "Optimisez vos menus et vos marges, sans perdre la chaleur de votre service.",
      en: "Optimize menus and margins without losing your service's warmth."
    }
  },

  'fast-food': {
    introResultats: {
      fr: "Gagnez en vitesse, en précision et en rentabilité : réduisez le gaspillage, optimisez vos coûts et automatisez la gestion de vos points de vente.",
      en: "Gain speed, precision, and profitability: cut waste, optimize costs, and automate your multi-location operations."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour la rapidité d'exécution, la précision des données et la gestion simplifiée de plusieurs emplacements.",
      en: "Designed for fast execution, data accuracy, and simplified multi-location management."
    },
    texteDemo: {
      fr: "Suivez les ventes, les inventaires et les coûts en temps réel. Automatisez la planification du personnel et prenez des décisions instantanées.",
      en: "Monitor sales, inventory, and costs in real time. Automate workforce planning and make instant data-driven decisions."
    },
    ctaTexte: {
      fr: "Gérez vos opérations à la seconde près, réduisez vos pertes et augmentez votre marge sans effort.",
      en: "Manage operations by the second, reduce losses, and grow margins effortlessly."
    }
  },

  'casse-croute': {
    introResultats: {
      fr: "Gérez votre casse-croûte avec simplicité et efficacité : maîtrisez vos coûts, réduisez les pertes et augmentez vos profits, même avec de petits volumes.",
      en: "Manage your snack bar with simplicity and efficiency: control costs, cut waste, and boost profits—even with small volumes."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Simplicité, rapidité et rentabilité — tout ce dont un casse-croûte a besoin pour mieux performer sans complexité.",
      en: "Simplicity, speed, and profitability—everything a snack bar needs to perform better without added complexity."
    },
    texteDemo: {
      fr: "Suivez vos ventes et vos stocks automatiquement, contrôlez vos coûts et vos marges, et gérez votre établissement en toute simplicité.",
      en: "Track sales and stock automatically, control costs and margins, and run your business effortlessly."
    },
    ctaTexte: {
      fr: "Gérez mieux, servez plus vite et maximisez vos profits dès aujourd'hui.",
      en: "Manage smarter, serve faster, and maximize profits today."
    }
  },

  'family-restaurant': {
    introResultats: {
      fr: "Offrez une expérience conviviale tout en gardant le contrôle sur vos coûts, vos stocks et vos marges. Simplifiez la gestion sans compromettre la qualité du service.",
      en: "Deliver a welcoming family experience while keeping full control over costs, stocks, and margins. Simplify management without compromising service quality."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Conçus pour les restaurants familiaux qui recherchent stabilité, simplicité et visibilité sur leurs résultats.",
      en: "Built for family restaurants seeking stability, simplicity, and visibility over their results."
    },
    texteDemo: {
      fr: "Suivez les performances de votre restaurant en temps réel, visualisez vos coûts et optimisez vos menus selon la rentabilité.",
      en: "Track your restaurant's performance in real time, visualize costs, and optimize menus by profitability."
    },
    ctaTexte: {
      fr: "Améliorez vos marges sans changer votre ADN : Octogone vous aide à servir mieux et à gérer plus efficacement.",
      en: "Boost margins without changing your DNA — Octogone helps you serve better and manage smarter."
    }
  },

  'cafe': {
    introResultats: {
      fr: "Optimisez vos coûts et votre productivité tout en offrant une expérience client irréprochable. Octogone simplifie la gestion de votre café, du comptoir à la caisse.",
      en: "Optimize costs and productivity while delivering a flawless customer experience. Octogone simplifies café management—from bar to till."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les cafés qui veulent conjuguer rapidité, constance et rentabilité sans sacrifier l'ambiance.",
      en: "Designed for cafés seeking speed, consistency, and profitability without losing atmosphere."
    },
    texteDemo: {
      fr: "Suivez vos ventes et vos coûts en temps réel, simplifiez vos commandes fournisseurs et réduisez vos pertes alimentaires sans effort.",
      en: "Track sales and costs in real time, simplify supplier orders, and reduce food waste effortlessly."
    },
    ctaTexte: {
      fr: "Simplifiez votre quotidien et augmentez vos marges tout en gardant l'esprit café.",
      en: "Simplify your day-to-day and grow margins while keeping your café's soul intact."
    }
  },

  'pub-microbrewery': {
    introResultats: {
      fr: "Augmentez vos marges et votre efficacité tout en conservant l'ambiance et la qualité qui font la réputation de votre pub ou microbrasserie.",
      en: "Boost margins and efficiency while maintaining the atmosphere and quality your pub or microbrewery is known for."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les établissements qui conjuguent production et service, où la rentabilité se joue sur chaque litre et chaque assiette.",
      en: "Designed for venues combining production and service, where profitability depends on every pint and plate."
    },
    texteDemo: {
      fr: "Suivez vos coûts de brassage, vos ventes et vos marges sur une seule interface. Automatisez la gestion et concentrez-vous sur l'expérience client.",
      en: "Track brewing costs, sales, and margins in one interface. Automate management and focus on customer experience."
    },
    ctaTexte: {
      fr: "Optimisez la production, le service et les marges — sans perdre votre esprit artisanal.",
      en: "Optimize production, service, and margins—without losing your craft spirit."
    }
  },

  'catering-corporate': {
    introResultats: {
      fr: "Optimisez vos opérations de service alimentaire d'entreprise : anticipez les besoins, réduisez les pertes et améliorez la rentabilité de chaque contrat.",
      en: "Optimize your corporate food service operations: anticipate needs, cut waste, and improve profitability for every contract."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les traiteurs et services alimentaires à haut volume où la planification, la régularité et le contrôle des coûts sont essentiels.",
      en: "Designed for high-volume catering services where planning, consistency, and cost control are key."
    },
    texteDemo: {
      fr: "Planifiez vos repas, vos livraisons et vos coûts en un seul endroit. Suivez la rentabilité de chaque contrat en temps réel et ajustez vos marges automatiquement.",
      en: "Plan meals, deliveries, and costs in one place. Track profitability per contract in real time and adjust margins automatically."
    },
    ctaTexte: {
      fr: "Digitalisez la gestion de vos contrats et augmentez la rentabilité de chaque service dès aujourd'hui.",
      en: "Digitize contract management and increase the profitability of every service today."
    }
  },

  'tourism-industrial': {
    introResultats: {
      fr: "Simplifiez la gestion de vos services alimentaires en milieux isolés ou à grand volume — réduisez les pertes, améliorez la planification et assurez la constance de vos opérations.",
      en: "Simplify food service management in remote or high-volume environments—reduce waste, improve planning, and ensure consistency across operations."
    },
    metriques: [
      { fr: "–25% de gaspillage", en: "–25% waste" },
      { fr: "+10% de marge brute", en: "+10% gross margin" },
      { fr: "+15h/sem économisées", en: "+15h/week saved" },
      { fr: ">98% de précision des coûts", en: ">98% cost accuracy" }
    ],
    sousTexteSolutions: {
      fr: "Pensés pour les sites touristiques, industriels et éloignés, où chaque décision logistique et chaque repas compte.",
      en: "Built for tourism, industrial, and remote sites where every logistic and meal decision matters."
    },
    texteDemo: {
      fr: "De la planification des menus à la gestion du personnel, Octogone vous donne une vue complète de vos opérations pour maximiser la productivité et la rentabilité sur chaque site.",
      en: "From menu planning to workforce management, Octogone gives you full operational visibility to maximize productivity and profitability across all sites."
    },
    ctaTexte: {
      fr: "Centralisez vos opérations multi-sites et optimisez chaque ressource, du personnel aux ingrédients.",
      en: "Centralize multi-site operations and optimize every resource—from staff to supplies."
    }
  }
};

// NOUVEAU CONTENU V2 avec featureShowcase
export const businessTypesContentV2: Record<string, SectorContentV2> = {
  'chains-groups': {
    introResultats: {
      fr: "Standardisez vos opérations multi-sites et éliminez les écarts de performance entre établissements. Octogone centralise la gestion pour une rentabilité uniforme.",
      en: "Standardize multi-site operations and eliminate performance gaps between locations. Octogone centralizes management for uniform profitability."
    },
    metriques: {
      fr: [
        "Décisions multi-sites 3× plus rapides",
        "Marge réseau +1 à +2 pts (standardisation)",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Multi-site decisions 3× faster",
        "Network margin +1 to +2 pts (standardization)",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Conçus pour la centralisation et la comparabilité entre emplacements, ces modules garantissent une exécution constante sur tout votre réseau.",
      en: "Built for centralization and cross-location comparability, these modules ensure consistent execution across your entire network."
    },
    texteDemo: {
      fr: "Visualisez en temps réel les performances de chaque établissement et prenez des décisions éclairées pour optimiser votre réseau.",
      en: "Visualize real-time performance of each location and make informed decisions to optimize your network."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/chains-groups/feature.png",
      title: {
        fr: "Tableau de bord réseau multi-établissements",
        en: "Multi-location network dashboard"
      },
      subtitle: {
        fr: "Conçu pour les chaînes et groupes de restaurants",
        en: "Designed for restaurant chains and groups"
      },
      points: {
        fr: [
          "Suivi des performances en temps réel sur tous vos sites",
          "Comparaison automatique des marges entre établissements",
          "Alertes intelligentes sur les écarts de coûts",
          "Standardisation des processus et des recettes"
        ],
        en: [
          "Real-time performance tracking across all your sites",
          "Automatic margin comparison between locations",
          "Smart alerts on cost variances",
          "Process and recipe standardization"
        ]
      },
      cta: {
        fr: "Voir le tableau de bord en action",
        en: "See the dashboard in action"
      }
    },
    caption: {
      fr: "Une vision globale pour une gestion centralisée et performante.",
      en: "A global view for centralized and efficient management."
    },
    ctaTexte: {
      fr: "Unifiez vos opérations et maximisez la rentabilité de votre réseau dès le premier mois.",
      en: "Unify operations and maximize your network's profitability from month one."
    },
    testimonial: {
      id: "sophie-martin",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'independent-restaurants': {
    introResultats: {
      fr: "Reprenez le contrôle de vos coûts réels et sécurisez vos marges sans alourdir votre charge opérationnelle. Octogone simplifie la gestion pour les restaurateurs indépendants.",
      en: "Regain control over true costs and secure margins without adding operational burden. Octogone simplifies management for independent restaurateurs."
    },
    metriques: {
      fr: [
        "Variance coût-plat -10 à -15 %",
        "0 rupture critique (alertes seuils)",
        "> 98 % de précision des coûts",
        "+10 % de marge brute"
      ],
      en: [
        "Dish cost variance -10 to -15%",
        "0 critical stockouts (threshold alerts)",
        "> 98% cost accuracy",
        "+10% gross margin"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les restaurateurs qui veulent garder leur indépendance tout en professionnalisant leur gestion quotidienne.",
      en: "Designed for restaurateurs who want to maintain independence while professionalizing their daily management."
    },
    texteDemo: {
      fr: "Suivez vos coûts matière en temps réel et ajustez vos menus selon la rentabilité. Octogone vous aide à prendre les bonnes décisions au quotidien.",
      en: "Track food costs in real-time and adjust menus based on profitability. Octogone helps you make the right decisions daily."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/independent-restaurants/feature.png",
      title: {
        fr: "Analyse de rentabilité par plat",
        en: "Dish profitability analysis"
      },
      subtitle: {
        fr: "Conçu pour les restaurants indépendants",
        en: "Designed for independent restaurants"
      },
      points: {
        fr: [
          "Calcul automatique du coût matière de chaque recette",
          "Suivi en temps réel des variations de prix fournisseurs",
          "Alertes sur les plats peu rentables",
          "Recommandations d'ajustement des prix de vente"
        ],
        en: [
          "Automatic food cost calculation for each recipe",
          "Real-time tracking of supplier price variations",
          "Alerts on low-margin dishes",
          "Selling price adjustment recommendations"
        ]
      },
      cta: {
        fr: "Voir l'analyse en action",
        en: "See the analysis in action"
      }
    },
    caption: {
      fr: "Une gestion simple et efficace pour préserver votre indépendance.",
      en: "Simple and efficient management to preserve your independence."
    },
    ctaTexte: {
      fr: "Gardez votre liberté d'entrepreneur tout en sécurisant vos marges et votre rentabilité.",
      en: "Keep your entrepreneurial freedom while securing margins and profitability."
    },
    testimonial: {
      id: "yuki-tanaka",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'caterers': {
    introResultats: {
      fr: "Optimisez vos événements et services de traiteur avec une gestion précise des coûts et des portions. Octogone maximise la rentabilité de chaque prestation.",
      en: "Optimize your catering events and services with precise cost and portion management. Octogone maximizes profitability for every service."
    },
    metriques: {
      fr: [
        "Écart coût/portion -8 à -12 %",
        "Marge par événement +3 à +5 pts",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Cost/portion variance -8 to -12%",
        "Margin per event +3 to +5 pts",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Conçus pour les traiteurs qui gèrent des volumes variables et doivent garantir une rentabilité constante sur chaque événement.",
      en: "Built for caterers managing variable volumes who must ensure consistent profitability on every event."
    },
    texteDemo: {
      fr: "Planifiez vos menus selon le budget client, calculez les quantités exactes et suivez la rentabilité de chaque prestation en temps réel.",
      en: "Plan menus according to client budget, calculate exact quantities, and track profitability of each service in real-time."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/caterers/feature.png",
      title: {
        fr: "Planification d'événements et calcul de coûts",
        en: "Event planning and cost calculation"
      },
      subtitle: {
        fr: "Conçu pour les services de traiteur",
        en: "Designed for catering services"
      },
      points: {
        fr: [
          "Calcul automatique des portions selon le nombre d'invités",
          "Devis instantanés avec marges garanties",
          "Suivi des coûts par événement en temps réel",
          "Optimisation des achats selon les menus planifiés"
        ],
        en: [
          "Automatic portion calculation based on guest count",
          "Instant quotes with guaranteed margins",
          "Real-time cost tracking per event",
          "Purchase optimization based on planned menus"
        ]
      },
      cta: {
        fr: "Voir la planification en action",
        en: "See planning in action"
      }
    },
    caption: {
      fr: "Une gestion événementielle précise pour des prestations toujours rentables.",
      en: "Precise event management for consistently profitable services."
    },
    ctaTexte: {
      fr: "Transformez chaque événement en succès financier avec une gestion maîtrisée des coûts.",
      en: "Turn every event into financial success with controlled cost management."
    },
    testimonial: {
      id: "pierre-traiteur-secteur",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'brewers-distillers': {
    introResultats: {
      fr: "Maîtrisez votre production artisanale avec un suivi précis des coûts et de la qualité. Octogone optimise chaque lot tout en préservant votre savoir-faire.",
      en: "Master your craft production with precise cost and quality tracking. Octogone optimizes every batch while preserving your expertise."
    },
    metriques: {
      fr: [
        "Marge par lot +2 à +4 pts",
        "Pertes fermentation/stock ↓ (températures sous contrôle)",
        "-25 % de gaspillage",
        "> 98 % de précision des coûts"
      ],
      en: [
        "Margin per batch +2 to +4 pts",
        "Fermentation/stock losses ↓ (temperature controlled)",
        "-25% waste",
        "> 98% cost accuracy"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les brasseurs et distillateurs qui allient tradition artisanale et excellence opérationnelle.",
      en: "Built for brewers and distillers who combine artisanal tradition with operational excellence."
    },
    texteDemo: {
      fr: "Surveillez vos températures de fermentation, calculez le coût de chaque lot et optimisez vos recettes sans perdre votre identité.",
      en: "Monitor fermentation temperatures, calculate cost per batch, and optimize recipes without losing your identity."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/brewers-distillers/feature.png",
      title: {
        fr: "Suivi de production et contrôle qualité",
        en: "Production tracking and quality control"
      },
      subtitle: {
        fr: "Conçu pour les brasseurs et distillateurs",
        en: "Designed for brewers and distillers"
      },
      points: {
        fr: [
          "Surveillance continue des températures de fermentation",
          "Calcul précis du coût par lot produit",
          "Traçabilité complète de la matière première au produit fini",
          "Optimisation des recettes selon la rentabilité"
        ],
        en: [
          "Continuous fermentation temperature monitoring",
          "Precise cost calculation per batch produced",
          "Complete traceability from raw materials to finished product",
          "Recipe optimization based on profitability"
        ]
      },
      cta: {
        fr: "Voir le suivi de production",
        en: "See production tracking"
      }
    },
    caption: {
      fr: "L'art du brassage rencontre la précision de la gestion moderne.",
      en: "The art of brewing meets the precision of modern management."
    },
    ctaTexte: {
      fr: "Préservez votre savoir-faire tout en maximisant la rentabilité de chaque production.",
      en: "Preserve your expertise while maximizing profitability of every production."
    },
    testimonial: {
      id: "marc-brasseur-secteur",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'purchasing-groups': {
    introResultats: {
      fr: "Optimisez vos achats groupés et réduisez les coûts pour tous vos membres. Octogone centralise la gestion et maximise le pouvoir d'achat collectif.",
      en: "Optimize group purchasing and reduce costs for all members. Octogone centralizes management and maximizes collective buying power."
    },
    metriques: {
      fr: [
        "Coût matière -3 à -6 % (mutualisation)",
        "Temps AP/AR -30 à -50 %",
        "+10 % de marge brute",
        "+15 h/sem économisées"
      ],
      en: [
        "Material cost -3 to -6% (pooling)",
        "AP/AR time -30 to -50%",
        "+10% gross margin",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Conçus pour les regroupements d'achats qui veulent maximiser leur pouvoir de négociation et simplifier la gestion administrative.",
      en: "Built for purchasing groups seeking to maximize negotiating power and simplify administrative management."
    },
    texteDemo: {
      fr: "Centralisez les commandes de vos membres, négociez de meilleurs prix et automatisez la facturation et les paiements.",
      en: "Centralize member orders, negotiate better prices, and automate billing and payments."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/purchasing-groups/feature.png",
      title: {
        fr: "Gestion centralisée des achats groupés",
        en: "Centralized group purchasing management"
      },
      subtitle: {
        fr: "Conçu pour les regroupements d'achats",
        en: "Designed for purchasing groups"
      },
      points: {
        fr: [
          "Consolidation automatique des commandes membres",
          "Négociation optimisée grâce aux volumes groupés",
          "Facturation et répartition automatisées",
          "Suivi des économies réalisées par membre"
        ],
        en: [
          "Automatic consolidation of member orders",
          "Optimized negotiation through grouped volumes",
          "Automated billing and distribution",
          "Tracking of savings achieved per member"
        ]
      },
      cta: {
        fr: "Voir la gestion groupée",
        en: "See group management"
      }
    },
    caption: {
      fr: "L'union fait la force, surtout dans les achats.",
      en: "Unity is strength, especially in purchasing."
    },
    ctaTexte: {
      fr: "Démultipliez votre pouvoir d'achat et créez de la valeur pour tous vos membres.",
      en: "Multiply your purchasing power and create value for all your members."
    },
    testimonial: {
      id: "jean-regroupement-secteur",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'retail-commerce': {
    introResultats: {
      fr: "Optimisez votre commerce de détail alimentaire avec une gestion automatisée des stocks et des marges. Octogone élimine les ruptures et maximise la rentabilité.",
      en: "Optimize your food retail business with automated inventory and margin management. Octogone eliminates stock-outs and maximizes profitability."
    },
    metriques: {
      fr: [
        "0 rupture critique (réassort auto)",
        "Marge par référence +2 à +3 pts",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "0 critical stockouts (auto reorder)",
        "Margin per item +2 to +3 pts",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les commerces de détail qui veulent automatiser la gestion des stocks et optimiser la rotation des produits frais.",
      en: "Built for retail businesses seeking to automate inventory management and optimize fresh product rotation."
    },
    texteDemo: {
      fr: "Automatisez vos réassorts, suivez la rotation des produits frais et ajustez vos prix selon la demande et les marges cibles.",
      en: "Automate restocking, track fresh product rotation, and adjust prices based on demand and target margins."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/retail-commerce/feature.png",
      title: {
        fr: "Gestion automatisée des stocks et prix",
        en: "Automated inventory and pricing management"
      },
      subtitle: {
        fr: "Conçu pour le commerce de détail alimentaire",
        en: "Designed for food retail business"
      },
      points: {
        fr: [
          "Réassort automatique selon les seuils définis",
          "Suivi de la rotation des produits frais",
          "Ajustement dynamique des prix selon la demande",
          "Alertes sur les produits à écouler rapidement"
        ],
        en: [
          "Automatic restocking based on defined thresholds",
          "Fresh product rotation tracking",
          "Dynamic price adjustment based on demand",
          "Alerts on products requiring quick clearance"
        ]
      },
      cta: {
        fr: "Voir la gestion automatisée",
        en: "See automated management"
      }
    },
    caption: {
      fr: "Une gestion intelligente pour des rayons toujours optimisés.",
      en: "Smart management for always optimized shelves."
    },
    ctaTexte: {
      fr: "Automatisez votre gestion et concentrez-vous sur l'expérience client.",
      en: "Automate your management and focus on customer experience."
    },
    testimonial: {
      id: "anne-commerce-secteur",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  }
};

// NOUVEAU CONTENU V2 pour les STYLES DE RESTAURANTS
export const restaurantStylesContentV2: Record<string, SectorContentV2> = {
  'gastronomic': {
    introResultats: {
      fr: "Atteignez l'excellence culinaire avec une maîtrise parfaite des coûts et de la qualité. Octogone préserve votre créativité tout en optimisant vos marges.",
      en: "Achieve culinary excellence with perfect cost and quality control. Octogone preserves your creativity while optimizing margins."
    },
    metriques: {
      fr: [
        "Variance portion -15 à -20 %",
        "Pertes à froid ↓ (traçabilité températures)",
        "-25 % de gaspillage",
        "+10 % de marge brute"
      ],
      en: [
        "Portion variance -15 to -20%",
        "Cold losses ↓ (temperature traceability)",
        "-25% waste",
        "+10% gross margin"
      ]
    },
    sousTexteSolutions: {
      fr: "Conçus pour la haute gastronomie où chaque détail compte : précision des portions, traçabilité des produits et excellence du service.",
      en: "Built for fine dining where every detail matters: portion precision, product traceability, and service excellence."
    },
    texteDemo: {
      fr: "Contrôlez la qualité de vos produits nobles, standardisez vos créations culinaires et surveillez vos températures de conservation en continu.",
      en: "Control the quality of your premium products, standardize culinary creations, and continuously monitor storage temperatures."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/gastronomic/feature.png",
      title: {
        fr: "Contrôle qualité et traçabilité premium",
        en: "Premium quality control and traceability"
      },
      subtitle: {
        fr: "Conçu pour la restauration gastronomique",
        en: "Designed for fine dining"
      },
      points: {
        fr: [
          "Traçabilité complète des produits nobles",
          "Surveillance continue des températures de conservation",
          "Standardisation des créations sans perdre l'unicité",
          "Gestion optimisée des pourboires et du service"
        ],
        en: [
          "Complete traceability of premium products",
          "Continuous storage temperature monitoring",
          "Standardization of creations without losing uniqueness",
          "Optimized tip and service management"
        ]
      },
      cta: {
        fr: "Voir le contrôle qualité",
        en: "See quality control"
      }
    },
    caption: {
      fr: "L'art culinaire rencontre la précision de la gestion moderne.",
      en: "Culinary art meets the precision of modern management."
    },
    ctaTexte: {
      fr: "Élevez votre art culinaire avec une gestion digne de vos ambitions gastronomiques.",
      en: "Elevate your culinary art with management worthy of your gastronomic ambitions."
    },
    testimonial: {
      id: "mario-rossi",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'bistro-brasserie': {
    introResultats: {
      fr: "Optimisez votre bistro-brasserie avec une gestion fluide qui préserve la convivialité. Octogone accélère vos décisions sans compromettre l'ambiance.",
      en: "Optimize your bistro-brasserie with smooth management that preserves conviviality. Octogone accelerates decisions without compromising atmosphere."
    },
    metriques: {
      fr: [
        "Rotation stocks +10 à +15 %",
        "Décisions pricing 2–3× plus rapides",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Stock rotation +10 to +15%",
        "Pricing decisions 2–3× faster",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les établissements à fort volume qui recherchent régularité, rapidité et convivialité dans un cadre décontracté.",
      en: "Built for high-volume establishments seeking consistency, speed, and conviviality in a relaxed setting."
    },
    texteDemo: {
      fr: "Suivez vos ventes et coûts en temps réel, ajustez vos menus selon la rentabilité et boostez l'efficacité de vos équipes.",
      en: "Track sales and costs in real-time, adjust menus by profitability, and boost team efficiency."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/bistro-brasserie/feature.png",
      title: {
        fr: "Gestion rapide et décisions éclairées",
        en: "Fast management and informed decisions"
      },
      subtitle: {
        fr: "Conçu pour les bistros et brasseries",
        en: "Designed for bistros and brasseries"
      },
      points: {
        fr: [
          "Rotation optimisée des stocks selon la demande",
          "Ajustement rapide des prix selon la rentabilité",
          "Suivi en temps réel des performances par service",
          "Gestion simplifiée des équipes et des horaires"
        ],
        en: [
          "Optimized stock rotation based on demand",
          "Quick price adjustment based on profitability",
          "Real-time performance tracking per service",
          "Simplified team and schedule management"
        ]
      },
      cta: {
        fr: "Voir la gestion rapide",
        en: "See fast management"
      }
    },
    caption: {
      fr: "Une gestion efficace qui préserve l'esprit bistro.",
      en: "Efficient management that preserves the bistro spirit."
    },
    ctaTexte: {
      fr: "Optimisez vos menus et vos marges, sans perdre la chaleur de votre service.",
      en: "Optimize menus and margins without losing your service's warmth."
    },
    testimonial: {
      id: "laurent-dubois",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'fast-food': {
    introResultats: {
      fr: "Gagnez en vitesse, en précision et en rentabilité : réduisez le gaspillage, optimisez vos coûts et automatisez la gestion de vos points de vente.",
      en: "Gain speed, precision, and profitability: cut waste, optimize costs, and automate your multi-location operations."
    },
    metriques: {
      fr: [
        "Temps service -20 à -40 s",
        "Exactitude commande ≥ 90 %",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Service time -20 to -40 s",
        "Order accuracy ≥ 90%",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour la rapidité d'exécution, la précision des données et la gestion simplifiée de plusieurs emplacements.",
      en: "Designed for fast execution, data accuracy, and simplified multi-location management."
    },
    texteDemo: {
      fr: "Suivez les ventes, les inventaires et les coûts en temps réel. Automatisez la planification du personnel et prenez des décisions instantanées.",
      en: "Monitor sales, inventory, and costs in real time. Automate workforce planning and make instant data-driven decisions."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/fast-food/feature.png",
      title: {
        fr: "Gestion haute vitesse et précision",
        en: "High-speed management and precision"
      },
      subtitle: {
        fr: "Conçu pour la restauration rapide",
        en: "Designed for fast food"
      },
      points: {
        fr: [
          "Réduction du temps de service par optimisation des processus",
          "Amélioration de l'exactitude des commandes",
          "Planification automatisée du personnel selon l'affluence",
          "Suivi multi-sites en temps réel"
        ],
        en: [
          "Service time reduction through process optimization",
          "Improved order accuracy",
          "Automated staff planning based on traffic",
          "Real-time multi-site tracking"
        ]
      },
      cta: {
        fr: "Voir l'optimisation rapide",
        en: "See fast optimization"
      }
    },
    caption: {
      fr: "Une gestion rapide, précise et centralisée, à la vitesse de votre service.",
      en: "Fast, precise, centralized management—at the speed of your service."
    },
    ctaTexte: {
      fr: "Gérez vos opérations à la seconde près, réduisez vos pertes et augmentez votre marge sans effort.",
      en: "Manage operations by the second, reduce losses, and grow margins effortlessly."
    },
    testimonial: {
      id: "julie-fastfood-secteur",
      title: {
        fr: "Témoignage client",
        en: "Client testimonial"
      }
    }
  },

  'casse-croute': {
    introResultats: {
      fr: "Gérez votre casse-croûte avec simplicité et efficacité : maîtrisez vos coûts, réduisez les pertes et augmentez vos profits, même avec de petits volumes.",
      en: "Manage your snack bar with simplicity and efficiency: control costs, cut waste, and boost profits—even with small volumes."
    },
    metriques: {
      fr: [
        "Marge combo +2 à +3 pts",
        "Gaspillage préparation -20 %",
        "-25 % de gaspillage",
        "> 98 % de précision des coûts"
      ],
      en: [
        "Combo margin +2 to +3 pts",
        "Preparation waste -20%",
        "-25% waste",
        "> 98% cost accuracy"
      ]
    },
    sousTexteSolutions: {
      fr: "Simplicité, rapidité et rentabilité — tout ce dont un casse-croûte a besoin pour mieux performer sans complexité.",
      en: "Simplicity, speed, and profitability—everything a snack bar needs to perform better without added complexity."
    },
    texteDemo: {
      fr: "Suivez vos ventes et vos stocks automatiquement, contrôlez vos coûts et vos marges, et gérez votre établissement en toute simplicité.",
      en: "Track sales and stock automatically, control costs and margins, and run your business effortlessly."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/casse-croute/feature.png",
      title: {
        fr: "Gestion simple et rentabilité optimisée",
        en: "Simple management and optimized profitability"
      },
      subtitle: {
        fr: "Conçu pour les casse-croûtes",
        en: "Designed for snack bars"
      },
      points: {
        fr: [
          "Optimisation des marges sur les combos et menus",
          "Réduction du gaspillage en préparation",
          "Suivi automatique des stocks de base",
          "Calculs de coûts simplifiés mais précis"
        ],
        en: [
          "Combo and menu margin optimization",
          "Preparation waste reduction",
          "Automatic basic stock tracking",
          "Simplified but precise cost calculations"
        ]
      },
      cta: {
        fr: "Voir la gestion simple",
        en: "See simple management"
      }
    },
    caption: {
      fr: "Un seul outil pour tout gérer — de la commande à la rentabilité.",
      en: "One simple tool to manage everything—from orders to profits."
    },
    ctaTexte: {
      fr: "Gérez mieux, servez plus vite et maximisez vos profits dès aujourd'hui.",
      en: "Manage smarter, serve faster, and maximize profits today."
    }
  },

  'family-restaurant': {
    introResultats: {
      fr: "Offrez une expérience conviviale tout en gardant le contrôle sur vos coûts, vos stocks et vos marges. Simplifiez la gestion sans compromettre la qualité du service.",
      en: "Deliver a welcoming family experience while keeping full control over costs, stocks, and margins. Simplify management without compromising service quality."
    },
    metriques: {
      fr: [
        "Variance portion -30 %",
        "Ruptures < 1 %",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Portion variance -30%",
        "Stockouts < 1%",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Conçus pour les restaurants familiaux qui recherchent stabilité, simplicité et visibilité sur leurs résultats.",
      en: "Built for family restaurants seeking stability, simplicity, and visibility over their results."
    },
    texteDemo: {
      fr: "Suivez les performances de votre restaurant en temps réel, visualisez vos coûts et optimisez vos menus selon la rentabilité.",
      en: "Track your restaurant's performance in real time, visualize costs, and optimize menus by profitability."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/family-restaurant/feature.png",
      title: {
        fr: "Gestion familiale et contrôle précis",
        en: "Family management and precise control"
      },
      subtitle: {
        fr: "Conçu pour les restaurants familiaux",
        en: "Designed for family restaurants"
      },
      points: {
        fr: [
          "Contrôle précis des portions pour une constance parfaite",
          "Prévention des ruptures de stock",
          "Gestion simplifiée adaptée aux équipes familiales",
          "Suivi des performances sans complexité"
        ],
        en: [
          "Precise portion control for perfect consistency",
          "Stock-out prevention",
          "Simplified management adapted to family teams",
          "Performance tracking without complexity"
        ]
      },
      cta: {
        fr: "Voir la gestion familiale",
        en: "See family management"
      }
    },
    caption: {
      fr: "Une gestion simple, claire et performante pour les restaurants de quartier.",
      en: "Simple, clear, and efficient management for neighborhood restaurants."
    },
    ctaTexte: {
      fr: "Améliorez vos marges sans changer votre ADN : Octogone vous aide à servir mieux et à gérer plus efficacement.",
      en: "Boost margins without changing your DNA — Octogone helps you serve better and manage smarter."
    }
  },

  'cafe': {
    introResultats: {
      fr: "Optimisez vos coûts et votre productivité tout en offrant une expérience client irréprochable. Octogone simplifie la gestion de votre café, du comptoir à la caisse.",
      en: "Optimize costs and productivity while delivering a flawless customer experience. Octogone simplifies café management—from bar to till."
    },
    metriques: {
      fr: [
        "Gaspillage lait -10 à -25 %",
        "Ticket moyen +5 à +7 %",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Milk waste -10 to -25%",
        "Average ticket +5 to +7%",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les cafés qui veulent conjuguer rapidité, constance et rentabilité sans sacrifier l'ambiance.",
      en: "Designed for cafés seeking speed, consistency, and profitability without losing atmosphere."
    },
    texteDemo: {
      fr: "Suivez vos ventes et vos coûts en temps réel, simplifiez vos commandes fournisseurs et réduisez vos pertes alimentaires sans effort.",
      en: "Track sales and costs in real time, simplify supplier orders, and reduce food waste effortlessly."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/cafe/feature.png",
      title: {
        fr: "Optimisation café et expérience client",
        en: "Coffee optimization and customer experience"
      },
      subtitle: {
        fr: "Conçu pour les cafés",
        en: "Designed for coffee shops"
      },
      points: {
        fr: [
          "Réduction du gaspillage de lait et produits frais",
          "Augmentation du ticket moyen par optimisation de l'offre",
          "Gestion fluide des commandes et du service",
          "Suivi précis des coûts par boisson"
        ],
        en: [
          "Reduction of milk and fresh product waste",
          "Average ticket increase through offer optimization",
          "Smooth order and service management",
          "Precise cost tracking per beverage"
        ]
      },
      cta: {
        fr: "Voir l'optimisation café",
        en: "See coffee optimization"
      }
    },
    caption: {
      fr: "Une gestion fluide et centralisée, pour un service rapide et impeccable.",
      en: "Smooth, centralized management for fast, flawless service."
    },
    ctaTexte: {
      fr: "Simplifiez votre quotidien et augmentez vos marges tout en gardant l'esprit café.",
      en: "Simplify your day-to-day and grow margins while keeping your café's soul intact."
    }
  },

  'pub-microbrewery': {
    introResultats: {
      fr: "Augmentez vos marges et votre efficacité tout en conservant l'ambiance et la qualité qui font la réputation de votre pub ou microbrasserie.",
      en: "Boost margins and efficiency while maintaining the atmosphere and quality your pub or microbrewery is known for."
    },
    metriques: {
      fr: [
        "Pertes bière (spillage/ligne) ↓",
        "Marge boisson +2 à +3 pts",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Beer losses (spillage/line) ↓",
        "Beverage margin +2 to +3 pts",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les établissements qui conjuguent production et service, où la rentabilité se joue sur chaque litre et chaque assiette.",
      en: "Designed for venues combining production and service, where profitability depends on every pint and plate."
    },
    texteDemo: {
      fr: "Suivez vos coûts de brassage, vos ventes et vos marges sur une seule interface. Automatisez la gestion et concentrez-vous sur l'expérience client.",
      en: "Track brewing costs, sales, and margins in one interface. Automate management and focus on customer experience."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/pub-microbrewery/feature.png",
      title: {
        fr: "Production artisanale et service optimisé",
        en: "Craft production and optimized service"
      },
      subtitle: {
        fr: "Conçu pour les pubs et microbrasseries",
        en: "Designed for pubs and microbreweries"
      },
      points: {
        fr: [
          "Réduction des pertes de bière et spillage",
          "Optimisation des marges sur les boissons",
          "Suivi des coûts de production par lot",
          "Contrôle des températures de fermentation"
        ],
        en: [
          "Beer loss and spillage reduction",
          "Beverage margin optimization",
          "Production cost tracking per batch",
          "Fermentation temperature control"
        ]
      },
      cta: {
        fr: "Voir la production artisanale",
        en: "See craft production"
      }
    },
    caption: {
      fr: "Une gestion fluide, de la production au service.",
      en: "Seamless management—from production to service."
    },
    ctaTexte: {
      fr: "Optimisez la production, le service et les marges — sans perdre votre esprit artisanal.",
      en: "Optimize production, service, and margins—without losing your craft spirit."
    }
  },

  'catering-corporate': {
    introResultats: {
      fr: "Optimisez vos opérations de service alimentaire d'entreprise : anticipez les besoins, réduisez les pertes et améliorez la rentabilité de chaque contrat.",
      en: "Optimize your corporate food service operations: anticipate needs, cut waste, and improve profitability for every contract."
    },
    metriques: {
      fr: [
        "Dérapage food cost -6 à -10 %/contrat",
        "Adhérence planning > 95 %",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "Food cost overrun -6 to -10%/contract",
        "Planning adherence > 95%",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les traiteurs et services alimentaires à haut volume où la planification, la régularité et le contrôle des coûts sont essentiels.",
      en: "Designed for high-volume catering services where planning, consistency, and cost control are key."
    },
    texteDemo: {
      fr: "Planifiez vos repas, vos livraisons et vos coûts en un seul endroit. Suivez la rentabilité de chaque contrat en temps réel et ajustez vos marges automatiquement.",
      en: "Plan meals, deliveries, and costs in one place. Track profitability per contract in real-time and adjust margins automatically."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/catering-corporate/feature.png",
      title: {
        fr: "Gestion de contrats et planification",
        en: "Contract management and planning"
      },
      subtitle: {
        fr: "Conçu pour le service alimentaire corporatif",
        en: "Designed for corporate food service"
      },
      points: {
        fr: [
          "Contrôle strict des dérives de coûts alimentaires",
          "Planification précise et respect des délais",
          "Gestion multi-contrats et multi-sites",
          "Facturation automatisée par contrat"
        ],
        en: [
          "Strict control of food cost drift",
          "Precise planning and deadline compliance",
          "Multi-contract and multi-site management",
          "Automated billing per contract"
        ]
      },
      cta: {
        fr: "Voir la gestion de contrats",
        en: "See contract management"
      }
    },
    caption: {
      fr: "Une solution complète pour gérer la production, le service et la rentabilité.",
      en: "A complete solution to manage production, service, and profitability."
    },
    ctaTexte: {
      fr: "Digitalisez la gestion de vos contrats et augmentez la rentabilité de chaque service dès aujourd'hui.",
      en: "Digitize contract management and increase the profitability of every service today."
    }
  },

  'tourism-industrial': {
    introResultats: {
      fr: "Simplifiez la gestion de vos services alimentaires en milieux isolés ou à grand volume — réduisez les pertes, améliorez la planification et assurez la constance de vos opérations.",
      en: "Simplify food service management in remote or high-volume environments—reduce waste, improve planning, and ensure consistency across operations."
    },
    metriques: {
      fr: [
        "0 rupture critique multi-sites (stocks à distance)",
        "Coût logistique repas -5 à -8 %",
        "-25 % de gaspillage",
        "+15 h/sem économisées"
      ],
      en: [
        "0 critical multi-site stockouts (remote inventory)",
        "Meal logistics cost -5 to -8%",
        "-25% waste",
        "+15 h/week saved"
      ]
    },
    sousTexteSolutions: {
      fr: "Pensés pour les sites touristiques, industriels et éloignés, où chaque décision logistique et chaque repas compte.",
      en: "Built for tourism, industrial, and remote sites where every logistic and meal decision matters."
    },
    texteDemo: {
      fr: "De la planification des menus à la gestion du personnel, Octogone vous donne une vue complète de vos opérations pour maximiser la productivité et la rentabilité sur chaque site.",
      en: "From menu planning to workforce management, Octogone gives you full operational visibility to maximize productivity and profitability across all sites."
    },
    visuel: {
      type: "featureShowcase",
      imagePlaceholder: "/assets/secteurs/tourism-industrial/feature.png",
      title: {
        fr: "Gestion multi-sites et logistique",
        en: "Multi-site management and logistics"
      },
      subtitle: {
        fr: "Conçu pour les sites isolés et industriels",
        en: "Designed for remote and industrial sites"
      },
      points: {
        fr: [
          "Prévention des ruptures sur sites éloignés",
          "Optimisation des coûts logistiques alimentaires",
          "Gestion centralisée multi-sites",
          "Planification adaptée aux contraintes d'isolement"
        ],
        en: [
          "Stock-out prevention on remote sites",
          "Food logistics cost optimization",
          "Centralized multi-site management",
          "Planning adapted to isolation constraints"
        ]
      },
      cta: {
        fr: "Voir la gestion multi-sites",
        en: "See multi-site management"
      }
    },
    caption: {
      fr: "Une plateforme unique pour des opérations continues, fiables et rentables.",
      en: "A single platform for continuous, reliable, and profitable operations."
    },
    ctaTexte: {
      fr: "Centralisez vos opérations multi-sites et optimisez chaque ressource, du personnel aux ingrédients.",
      en: "Centralize multi-site operations and optimize every resource—from staff to supplies."
    }
  }
};

// Fonction V1 supprimée - utiliser getSectorContentV2() uniquement

// Fonction utilitaire pour récupérer le contenu V2 (nouveau format)
export function getSectorContentV2(sectorId: string, isRestaurantStyle: boolean): SectorContentV2 | null {
  if (isRestaurantStyle) {
    return restaurantStylesContentV2[sectorId] || null;
  } else {
    return businessTypesContentV2[sectorId] || null;
  }
}
