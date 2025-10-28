/**
 * Données des outils/fonctionnalités Octogone
 * Structure similaire à sectors-data.ts pour cohérence
 */

export interface ToolFeature {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  // Image optionnelle (peut être bilingue)
  image?: {
    src: string;      // Image par défaut ou EN
    srcFr?: string;   // Image FR (optionnel si bilingue)
  } | string;         // Support ancien format pour compatibilité
  benefits: Array<{
    fr: string;
    en: string;
  }>;
  // Concepts associés à cette feature (peut être 1, 2, 3 ou 4 concepts)
  concepts?: Array<'operate' | 'automate' | 'analyze' | 'predict'>;
  // Layout de la feature
  layout?: 'image-left' | 'image-right' | 'text-only' | 'two-columns' | 'three-columns' | 'full-width';
}

export interface Tool {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  heroImage: string;
  
  // Configuration du header
  headerCategoryFr?: string;
  headerCategoryEn?: string;
  headerTitleFr?: string;
  headerTitleEn?: string;
  headerDescriptionFr?: string;
  headerDescriptionEn?: string;
  
  // Configuration des sections et concepts
  sections?: Array<{
    concept?: 'operate' | 'automate' | 'analyze' | 'predict';
    features: number[]; // Index des features à afficher dans cette section
  }>;
  
  features: ToolFeature[];
}

// Données des outils
export const tools: Tool[] = [
  {
    id: 'inventaire',
    nameFr: 'Inventaire',
    nameEn: 'Inventory',
    descriptionFr: 'Logiciel de gestion d\'inventaire restaurant pour optimiser vos stocks en temps réel',
    descriptionEn: 'Restaurant inventory management software to optimize your stock in real-time',
    heroImage: '/images/tools/inventaire-hero.jpg',
    
    // Header personnalisé
    headerCategoryFr: 'Inventaire & Inventaire en temps réel',
    headerCategoryEn: 'Inventory & Real-Time Inventory',
    headerTitleFr: 'Des inventaires faciles, rapides et précis',
    headerTitleEn: 'Inventory made simple, fast, and accurate',
    headerDescriptionFr: 'Gestion collaborative des stocks, mode hors ligne, réduction des coûts alimentaires de 2-5%',
    headerDescriptionEn: 'Collaborative stock management, offline mode, reduce food costs by 2-5%',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'operate',
        features: [0, 1] // 2 avec images alternées
      },
      {
        concept: 'automate',
        features: [2, 3, 4, 5] // 1 full-width + 3 triple colonne
      },
      {
        concept: 'analyze',
        features: [6, 7] // 2 avec images alternées
      }
    ],
    
    features: [
      {
        titleFr: 'Saisie collaborative et simultanée',
        titleEn: 'Collaborative and Simultaneous Entry',
        descriptionFr: 'Permettez à plusieurs membres de votre équipe de saisir les quantités simultanément, même hors ligne. Divisez les zones, saisissez en parallèle et synchronisez automatiquement lorsque la connexion est rétablie. Cette approche collaborative réduit drastiquement le temps nécessaire pour compléter un inventaire complet.',
        descriptionEn: 'Allow multiple team members to enter quantities simultaneously, even offline. Divide zones, enter in parallel, and automatically sync when connection is restored. This collaborative approach drastically reduces the time needed to complete a full inventory.',
        image: '/images/tools/inventaire-mobile.jpg',
        benefits: [
          { fr: 'Saisie simultanée par plusieurs utilisateurs', en: 'Simultaneous entry by multiple users' },
          { fr: 'Mode hors ligne pour travailler sans interruption', en: 'Offline mode to work without interruption' },
          { fr: 'Synchronisation automatique en temps réel', en: 'Automatic real-time synchronization' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Organisation par zones personnalisées',
        titleEn: 'Custom Zone Organization',
        descriptionFr: 'Créez des listes personnalisées par emplacement avec des positions spécifiques pour chaque produit. Cette organisation guide vos équipes dans un ordre logique et réduit les oublis.',
        descriptionEn: 'Create custom lists by location with specific positions for each product. This organization guides your teams in a logical order and reduces oversights.',
        image: '/images/tools/inventaire-emplacements.jpg',
        benefits: [
          { fr: 'Listes d\'emplacements personnalisables', en: 'Customizable location lists' },
          { fr: 'Positions définies pour chaque produit', en: 'Defined positions for each product' },
          { fr: 'Organisation logique de la prise d\'inventaire', en: 'Logical inventory taking organization' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Gestion intelligente des seuils minimums',
        titleEn: 'Smart Minimum Threshold Management',
        descriptionFr: 'Identifiez instantanément les produits sous leur seuil minimum pendant votre inventaire. Envoyez-les directement dans un bon de commande pour préparer votre liste chez vos fournisseurs, ou à la production pour générer des bons de production à la cuisine. Agissez immédiatement sans attendre la fin de l\'inventaire. Cette fonctionnalité vous permet de réagir en temps réel aux ruptures de stock et d\'optimiser votre gestion des approvisionnements.',
        descriptionEn: 'Instantly identify products below their minimum threshold during your inventory. Send them directly to a purchase order to prepare your supplier list, or to production to generate kitchen production orders. Act immediately without waiting for inventory completion. This feature allows you to react in real-time to stock shortages and optimize your supply management.',
        layout: 'full-width',
        benefits: [
          { fr: 'Détection automatique des produits sous le seuil', en: 'Automatic detection of products below threshold' },
          { fr: 'Envoi direct vers Commande ou Production', en: 'Direct send to Order or Production' },
          { fr: 'Action immédiate pendant l\'inventaire', en: 'Immediate action during inventory' },
          { fr: 'Réaction en temps réel aux ruptures', en: 'Real-time reaction to shortages' },
          { fr: 'Optimisation des approvisionnements', en: 'Supply optimization' },
          { fr: 'Gain de temps et d\'efficacité', en: 'Time and efficiency savings' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Recherche et tri efficaces',
        titleEn: 'Efficient Search and Sorting',
        descriptionFr: 'Trouvez rapidement n\'importe quel article et organisez votre liste selon différents critères pour optimiser votre flux de travail.',
        descriptionEn: 'Quickly find any item and organize your list according to different criteria to optimize your workflow.',
        benefits: [
          { fr: 'Recherche instantanée', en: 'Instant search' },
          { fr: 'Options de tri multiples', en: 'Multiple sorting options' },
          { fr: 'Gain de temps au comptage', en: 'Time savings during counting' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Saisie rapide et intuitive',
        titleEn: 'Fast and Intuitive Entry',
        descriptionFr: 'Enregistrez vos quantités avec notre calculatrice intégrée, même hors ligne, sur n\'importe quel appareil.',
        descriptionEn: 'Record your quantities with our integrated calculator, even offline, on any device.',
        benefits: [
          { fr: 'Calculatrice intégrée', en: 'Integrated calculator' },
          { fr: 'Multi-appareils', en: 'Multi-device' },
          { fr: 'Mode hors ligne', en: 'Offline mode' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Flexibilité des unités',
        titleEn: 'Unit Flexibility',
        descriptionFr: 'Comptez avec les unités configurées dans votre catalogue. Conversions automatiques et précises.',
        descriptionEn: 'Count with units configured in your catalog. Automatic and precise conversions.',
        benefits: [
          { fr: 'Unités de mesure configurables', en: 'Configurable units of measure' },
          { fr: 'Conversions automatiques', en: 'Automatic conversions' },
          { fr: 'Élimination des erreurs', en: 'Error elimination' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Visibilité continue de vos stocks',
        titleEn: 'Continuous Stock Visibility',
        descriptionFr: 'Allez au-delà de l\'inventaire périodique traditionnel. Découvrez comment notre outil Inventaire en Temps Réel vous permet de suivre automatiquement votre inventaire théorique en continu grâce à l\'intégration avec votre système de point de vente, vous offrant une visibilité 24/7 sur vos stocks.',
        descriptionEn: 'Go beyond traditional periodic inventory. Discover how our Real-Time Inventory tool allows you to automatically track your theoretical inventory continuously through integration with your point of sale system, giving you 24/7 visibility of your stocks.',
        image: '/images/tools/inventaire-temps-reel.jpg',
        benefits: [
          { fr: 'Suivi continu de votre inventaire théorique', en: 'Continuous tracking of your theoretical inventory' },
          { fr: 'Intégration transparente avec votre POS', en: 'Seamless integration with your POS' },
          { fr: 'Visibilité en temps réel de vos stocks', en: 'Real-time visibility of your stocks' }
        ],
        concepts: ['automate', 'analyze']
      },
      {
        titleFr: 'Analyse des écarts et optimisation',
        titleEn: 'Variance Analysis and Optimization',
        descriptionFr: 'Comparez votre inventaire physique avec votre inventaire théorique pour identifier précisément vos écarts. Découvrez notre outil Inventaire en Temps Réel qui vous aide à détecter rapidement le gaspillage, les erreurs de portions ou les problèmes de recettes, vous permettant de réduire vos coûts alimentaires de 2 à 5% en moyenne.',
        descriptionEn: 'Compare your physical inventory with your theoretical inventory to precisely identify your variances. Discover our Real-Time Inventory tool that helps you quickly detect waste, portion errors or recipe issues, allowing you to reduce your food costs by 2 to 5% on average.',
        image: '/images/tools/inventaire-ecarts.jpg',
        benefits: [
          { fr: 'Comparaison précise physique vs théorique', en: 'Precise physical vs theoretical comparison' },
          { fr: 'Identification rapide des sources de pertes', en: 'Quick identification of loss sources' },
          { fr: 'Réduction des coûts alimentaires de 2-5%', en: 'Food cost reduction of 2-5%' }
        ],
        concepts: ['analyze', 'predict']
      }
    ]
  },
  {
    id: 'food-cost',
    nameFr: 'Recettes & Food Cost',
    nameEn: 'Recipes & Food Cost',
    descriptionFr: 'Standardisez vos recettes et maîtrisez votre rentabilité en temps réel',
    descriptionEn: 'Standardize your recipes and master your profitability in real-time',
    heroImage: '/images/tools/foodcost-hero.jpg',
    
    // Header personnalisé
    headerCategoryFr: 'Recettes & Food Cost',
    headerCategoryEn: 'Recipes & Food Cost',
    headerTitleFr: 'Le profit se calcule un ingrédient à la fois',
    headerTitleEn: 'Profit is calculated one ingredient at a time',
    headerDescriptionFr: 'Standardisez vos recettes, calculez automatiquement et optimisez vos marges',
    headerDescriptionEn: 'Standardize your recipes, calculate automatically and optimize your margins',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'operate',
        features: [0, 1, 2, 3, 4, 5] // Features principales avec images + secondaires
      },
      {
        concept: 'analyze',
        features: [6] // Simulateur de Food Cost
      }
    ],
    
    features: [
      {
        titleFr: 'Catalogue centralisé de produits',
        titleEn: 'Centralized Product Catalog',
        descriptionFr: 'Tous les produits de vos fournisseurs réunis dans un seul catalogue. C\'est à partir de ce catalogue que vous créez vos recettes : chaque produit contient son prix, ses formats, ses unités de mesure et ses conversions. Un seul catalogue pour vos inventaires et vos recettes, garantissant que vos calculs de food cost utilisent toujours les prix réels de vos fournisseurs.',
        descriptionEn: 'All products from your suppliers in one catalog. This is where you create your recipes from: each product contains its price, formats, units of measure and conversions. One catalog for your inventories and recipes, ensuring your food cost calculations always use real prices from your suppliers.',
        image: {
          src: '/images/pages/product_list_en.avif',
          srcFr: '/images/pages/product_list_fr.avif'
        },
        benefits: [
          { fr: 'Tous vos produits fournisseurs en un lieu', en: 'All your supplier products in one place' },
          { fr: 'Source unique pour créer vos recettes', en: 'Single source to create your recipes' },
          { fr: 'Prix réels synchronisés', en: 'Real prices synchronized' }
        ],
        concepts: ['operate', 'automate'],
        layout: 'image-left'
      },
      {
        titleFr: 'Catalogue centralisé de recettes',
        titleEn: 'Centralized Recipe Catalog',
        descriptionFr: 'Toutes vos recettes réunies dans un catalogue unique et structuré. Chaque recette est créée à partir des produits de votre catalogue et contient ses ingrédients, quantités, étapes de préparation et coûts calculés automatiquement. Accédez instantanément à l\'ensemble de vos fiches techniques et assurez la constance de vos plats. Votre catalogue de recettes devient la référence centrale pour toute votre production.',
        descriptionEn: 'All your recipes in a single, structured catalog. Each recipe is created from products in your catalog and contains its ingredients, quantities, preparation steps and automatically calculated costs. Instantly access all your technical sheets and ensure consistency of your dishes. Your recipe catalog becomes the central reference for all your production.',
        image: {
          src: '/images/pages/recipe_list_en.avif',
          srcFr: '/images/pages/recipe_list_fr.avif'
        },
        benefits: [
          { fr: 'Toutes vos recettes en un lieu', en: 'All your recipes in one place' },
          { fr: 'Créées à partir du catalogue produits', en: 'Created from product catalog' },
          { fr: 'Coûts calculés automatiquement', en: 'Automatically calculated costs' }
        ],
        concepts: ['operate', 'automate'],
        layout: 'image-right'
      },
      {
        titleFr: 'Fiches recettes complètes',
        titleEn: 'Complete Recipe Sheets',
        descriptionFr: 'Chaque recette dispose d\'une fiche technique détaillée et professionnelle. Ingrédients avec quantités précises, étapes de préparation numérotées, temps de cuisson, portions, coûts détaillés et allergènes. Toutes les informations essentielles réunies dans un format clair et structuré, prêt à être utilisé en cuisine ou partagé avec votre équipe.',
        descriptionEn: 'Each recipe has a detailed and professional technical sheet. Ingredients with precise quantities, numbered preparation steps, cooking times, portions, detailed costs and allergens. All essential information gathered in a clear and structured format, ready to be used in the kitchen or shared with your team.',
        image: {
          src: '/images/pages/recipe_sheet_en.avif',
          srcFr: '/images/pages/recipe_sheet_fr.avif'
        },
        benefits: [
          { fr: 'Fiches techniques détaillées et pro', en: 'Detailed and professional sheets' },
          { fr: 'Toutes les infos en un coup d\'œil', en: 'All info at a glance' },
          { fr: 'Format clair et structuré', en: 'Clear and structured format' }
        ],
        concepts: ['operate'],
        layout: 'image-left'
      },
      {
        titleFr: 'Détection automatique des allergènes',
        titleEn: 'Automatic Allergen Detection',
        descriptionFr: 'Les allergènes de vos produits sont automatiquement ajoutés à vos recettes lors de leur création. Aucun risque d\'oubli ou d\'erreur manuelle : dès qu\'un ingrédient contient un allergène, il apparaît dans la fiche technique de la recette. Cette automatisation garantit la sécurité de vos clients et votre conformité réglementaire.',
        descriptionEn: 'Allergens from your products are automatically added to your recipes during creation. No risk of forgetting or manual error: as soon as an ingredient contains an allergen, it appears in the recipe\'s technical sheet. This automation guarantees your customers\' safety and your regulatory compliance.',
        image: '/images/tools/foodcost-auto.jpg',
        benefits: [
          { fr: 'Aucun risque d\'erreur manuelle', en: 'No risk of manual error' },
          { fr: 'Sécurité maximale pour vos clients', en: 'Maximum safety for your customers' },
          { fr: 'Conformité réglementaire garantie', en: 'Guaranteed regulatory compliance' }
        ],
        concepts: ['automate', 'operate'],
        layout: 'three-columns'
      },
      {
        titleFr: 'Multiplicateur de recettes',
        titleEn: 'Recipe Multiplier',
        descriptionFr: 'Ajustez instantanément les quantités de vos recettes selon vos besoins. Besoin de préparer 50 portions au lieu de 10 ? Un clic suffit. Le système recalcule automatiquement toutes les quantités d\'ingrédients et les coûts associés. Parfait pour les événements, les banquets ou les variations de production quotidiennes.',
        descriptionEn: 'Instantly adjust your recipe quantities according to your needs. Need to prepare 50 portions instead of 10? One click is enough. The system automatically recalculates all ingredient quantities and associated costs. Perfect for events, banquets or daily production variations.',
        image: '/images/tools/foodcost-temps-reel.jpg',
        benefits: [
          { fr: 'Ajustement instantané des quantités', en: 'Instant quantity adjustment' },
          { fr: 'Calculs automatiques précis', en: 'Accurate automatic calculations' },
          { fr: 'Idéal pour événements et banquets', en: 'Ideal for events and banquets' }
        ],
        concepts: ['automate', 'operate'],
        layout: 'three-columns'
      },
      {
        titleFr: 'Formats personnalisés de recettes',
        titleEn: 'Custom Recipe Formats',
        descriptionFr: 'Créez différents formats à partir d\'une recette de base : portions individuelles, format familial, vente au détail ou nouveaux plats dérivés. Chaque format conserve les proportions exactes et calcule automatiquement son coût. Développez facilement votre offre sans refaire tous les calculs à chaque fois.',
        descriptionEn: 'Create different formats from a base recipe: individual portions, family size, retail sale or new derived dishes. Each format maintains exact proportions and automatically calculates its cost. Easily expand your offering without redoing all calculations each time.',
        image: '/images/tools/foodcost-calculs.jpg',
        benefits: [
          { fr: 'Créez plusieurs formats facilement', en: 'Create multiple formats easily' },
          { fr: 'Proportions et coûts automatiques', en: 'Automatic proportions and costs' },
          { fr: 'Développez votre offre rapidement', en: 'Expand your offering quickly' }
        ],
        concepts: ['operate', 'automate'],
        layout: 'three-columns'
      },
      {
        titleFr: 'Simulateur de Food Cost',
        titleEn: 'Food Cost Simulator',
        descriptionFr: 'Anticipez l\'impact financier de vos décisions avant de les prendre. Le simulateur vous permet de tester différents scénarios en temps réel : changement de fournisseur, hausse de prix, modification de recette ou ajustement de portions. Comparez plusieurs options côte à côte, visualisez l\'effet sur vos marges et votre rentabilité globale. Prenez des décisions stratégiques basées sur des données précises plutôt que sur des estimations.',
        descriptionEn: 'Anticipate the financial impact of your decisions before making them. The simulator lets you test different scenarios in real-time: supplier changes, price increases, recipe modifications or portion adjustments. Compare multiple options side by side, visualize the effect on your margins and overall profitability. Make strategic decisions based on accurate data rather than estimates.',
        image: {
          src: '/images/pages/food_cost_simulator_en.avif',
          srcFr: '/images/pages/food_cost_simulator_fr.avif'
        },
        benefits: [
          { fr: 'Testez avant d\'agir, zéro risque', en: 'Test before acting, zero risk' },
          { fr: 'Visualisation instantanée des impacts', en: 'Instant impact visualization' },
          { fr: 'Décisions basées sur des données réelles', en: 'Decisions based on real data' }
        ],
        concepts: ['analyze', 'predict'],
        layout: 'image-right'
      }
    ]
  },
  {
    id: 'iot',
    nameFr: 'IoT - Thermomètres',
    nameEn: 'IoT - Thermometers',
    descriptionFr: 'Surveillance active en temps réel et alertes personnalisées',
    descriptionEn: 'Active real-time monitoring and personalized alerts',
    heroImage: '/images/tools/iot-hero.jpg',
    
    // Header personnalisé
    headerCategoryFr: 'IoT & Surveillance',
    headerCategoryEn: 'IoT & Monitoring',
    headerTitleFr: 'Surveillez vos températures automatiquement',
    headerTitleEn: 'Monitor your temperatures automatically',
    headerDescriptionFr: 'Thermomètres connectés, alertes en temps réel et conformité HACCP automatique',
    headerDescriptionEn: 'Connected thermometers, real-time alerts and automatic HACCP compliance',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'operate',
        features: [0, 1, 2, 3, 4] // Features principales + secondaires
      },
      {
        concept: 'automate',
        features: [5, 6] // Features restantes
      }
    ],
    
    features: [
      {
        titleFr: 'Surveillance en temps réel',
        titleEn: 'Real-Time Monitoring',
        descriptionFr: 'Surveillez toutes vos températures en temps réel depuis n\'importe où. Vos thermomètres connectés transmettent automatiquement les données à Octogone. Consultez instantanément les températures de vos réfrigérateurs, congélateurs et zones de préparation. Recevez des alertes immédiates si une température sort des limites configurées.',
        descriptionEn: 'Monitor all your temperatures in real-time from anywhere. Your connected thermometers automatically transmit data to Octogone. Instantly view temperatures of your refrigerators, freezers and preparation areas. Receive immediate alerts if a temperature goes outside configured limits.',
        image: '/images/tools/iot-monitoring.jpg',
        benefits: [
          { fr: 'Surveillance 24/7 automatique', en: '24/7 automatic monitoring' },
          { fr: 'Alertes instantanées par SMS/email', en: 'Instant SMS/email alerts' },
          { fr: 'Historique complet des températures', en: 'Complete temperature history' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Conformité HACCP automatique',
        titleEn: 'Automatic HACCP Compliance',
        descriptionFr: 'Générez automatiquement vos rapports HACCP sans aucune saisie manuelle. Le système enregistre toutes les températures et crée les documents de conformité requis. En cas d\'inspection, accédez instantanément à l\'historique complet. Prouvez votre conformité avec des données objectives et traçables.',
        descriptionEn: 'Automatically generate your HACCP reports without any manual entry. The system records all temperatures and creates required compliance documents. In case of inspection, instantly access complete history. Prove your compliance with objective and traceable data.',
        image: '/images/tools/iot-haccp.jpg',
        benefits: [
          { fr: 'Rapports HACCP automatiques', en: 'Automatic HACCP reports' },
          { fr: 'Zéro saisie manuelle', en: 'Zero manual entry' },
          { fr: 'Conformité garantie', en: 'Guaranteed compliance' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Alertes personnalisées',
        titleEn: 'Personalized Alerts',
        descriptionFr: 'Configurez des seuils d\'alerte spécifiques pour chaque équipement. Définissez qui reçoit les alertes et par quel moyen (SMS, email, notification app). Créez des escalades automatiques si une alerte n\'est pas traitée. Personnalisez les horaires d\'alerte selon vos besoins opérationnels.',
        descriptionEn: 'Configure specific alert thresholds for each equipment. Define who receives alerts and by what means (SMS, email, app notification). Create automatic escalations if an alert is not handled. Customize alert schedules according to your operational needs.',
        image: '/images/tools/iot-alerts.jpg',
        benefits: [
          { fr: 'Seuils personnalisables par équipement', en: 'Customizable thresholds per equipment' },
          { fr: 'Notifications multi-canaux', en: 'Multi-channel notifications' },
          { fr: 'Escalades automatiques', en: 'Automatic escalations' }
        ],
        concepts: ['automate', 'predict']
      },
      {
        titleFr: 'Installation simple',
        titleEn: 'Simple Installation',
        descriptionFr: 'Installation plug-and-play sans câblage complexe. Les thermomètres se connectent automatiquement au réseau. Configuration en quelques minutes via l\'application. Support technique inclus pour vous accompagner.',
        descriptionEn: 'Plug-and-play installation without complex wiring. Thermometers automatically connect to the network. Configuration in minutes via the app. Technical support included to assist you.',
        image: '/images/tools/iot-install.jpg',
        benefits: [
          { fr: 'Installation en quelques minutes', en: 'Installation in minutes' },
          { fr: 'Connexion automatique', en: 'Automatic connection' },
          { fr: 'Support technique inclus', en: 'Technical support included' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Gestion multi-équipements',
        titleEn: 'Multi-Equipment Management',
        descriptionFr: 'Gérez tous vos équipements depuis une seule interface. Organisez par zones, par types ou par établissements. Vue d\'ensemble instantanée de tous les statuts. Historique détaillé par équipement.',
        descriptionEn: 'Manage all your equipment from a single interface. Organize by zones, types or locations. Instant overview of all statuses. Detailed history per equipment.',
        image: '/images/tools/iot-multi.jpg',
        benefits: [
          { fr: 'Interface centralisée', en: 'Centralized interface' },
          { fr: 'Organisation flexible', en: 'Flexible organization' },
          { fr: 'Vue d\'ensemble complète', en: 'Complete overview' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Détection d\'anomalies',
        titleEn: 'Anomaly Detection',
        descriptionFr: 'L\'intelligence artificielle détecte les comportements anormaux avant qu\'ils ne deviennent critiques. Identifiez les équipements qui montrent des signes de défaillance. Planifiez la maintenance préventive. Évitez les pertes de produits.',
        descriptionEn: 'Artificial intelligence detects abnormal behaviors before they become critical. Identify equipment showing signs of failure. Plan preventive maintenance. Avoid product losses.',
        image: '/images/tools/iot-ai.jpg',
        benefits: [
          { fr: 'Détection précoce des problèmes', en: 'Early problem detection' },
          { fr: 'Maintenance préventive', en: 'Preventive maintenance' },
          { fr: 'Réduction des pertes', en: 'Loss reduction' }
        ],
        concepts: ['predict']
      },
      {
        titleFr: 'Rapports et analyses',
        titleEn: 'Reports and Analytics',
        descriptionFr: 'Générez des rapports détaillés sur vos températures. Analysez les tendances et identifiez les problèmes récurrents. Exportez les données pour vos audits. Visualisez les performances de vos équipements.',
        descriptionEn: 'Generate detailed reports on your temperatures. Analyze trends and identify recurring issues. Export data for your audits. Visualize equipment performance.',
        image: '/images/tools/iot-reports.jpg',
        benefits: [
          { fr: 'Rapports personnalisables', en: 'Customizable reports' },
          { fr: 'Analyse des tendances', en: 'Trend analysis' },
          { fr: 'Export pour audits', en: 'Export for audits' }
        ],
        concepts: ['analyze']
      }
    ]
  },
  {
    id: 'ressources-humaines',
    nameFr: 'Ressources Humaines',
    nameEn: 'Human Resources',
    descriptionFr: 'Automatisez la gestion des pourboires et centralisez vos fiches employés',
    descriptionEn: 'Automate tip management and centralize employee records',
    heroImage: '/images/tools/rh-hero.jpg',
    
    // Header personnalisé
    headerCategoryFr: 'Ressources Humaines',
    headerCategoryEn: 'Human Resources',
    headerTitleFr: 'Simplifiez la gestion de votre équipe',
    headerTitleEn: 'Simplify your team management',
    headerDescriptionFr: 'Gestion automatique des pourboires et centralisation des profils employés',
    headerDescriptionEn: 'Automatic tip management and centralized employee profiles',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'automate',
        features: [0, 1, 2, 3, 4] // Pourboires + Labor cost
      },
      {
        concept: 'analyze',
        features: [5] // Rapports
      }
    ],
    
    features: [
      {
        titleFr: 'Répartition automatique des pourboires',
        titleEn: 'Automatic Tip Distribution',
        descriptionFr: 'Calculez et répartissez les pourboires automatiquement selon vos conventions collectives. Le système intègre les ventes du POS, applique vos règles de répartition et génère les montants pour chaque employé. Gérez les exceptions, les absences et les différents taux de partage. Éliminez les erreurs de calcul et les conflits.',
        descriptionEn: 'Calculate and distribute tips automatically according to your collective agreements. The system integrates POS sales, applies your distribution rules and generates amounts for each employee. Manage exceptions, absences and different sharing rates. Eliminate calculation errors and conflicts.',
        image: '/images/tools/rh-tips.jpg',
        benefits: [
          { fr: 'Calculs automatiques et précis', en: 'Automatic and accurate calculations' },
          { fr: 'Respect des conventions collectives', en: 'Compliance with collective agreements' },
          { fr: 'Zéro erreur, zéro conflit', en: 'Zero errors, zero conflicts' }
        ],
        concepts: ['automate']
      },
      {
        titleFr: 'Gestion des conventions de pourboires',
        titleEn: 'Tip Convention Management',
        descriptionFr: 'Configurez vos règles de répartition selon vos besoins. Définissez les pourcentages par poste, les pools de partage et les exclusions. Gérez plusieurs conventions pour différents services ou établissements. Modifiez facilement les règles quand nécessaire. Le système s\'adapte à toutes les situations.',
        descriptionEn: 'Configure your distribution rules according to your needs. Define percentages by position, sharing pools and exclusions. Manage multiple conventions for different services or locations. Easily modify rules when needed. The system adapts to all situations.',
        image: '/images/tools/rh-conventions.jpg',
        benefits: [
          { fr: 'Règles personnalisables', en: 'Customizable rules' },
          { fr: 'Gestion multi-conventions', en: 'Multi-convention management' },
          { fr: 'Flexibilité totale', en: 'Total flexibility' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Calcul du labor cost',
        titleEn: 'Labor Cost Calculation',
        descriptionFr: 'Calculez automatiquement votre labor cost en temps réel. Intégration avec vos systèmes de gestion d\'horaires pour extraire les données de main-d\'œuvre. Comparez vos coûts de personnel avec vos ventes pour optimiser votre rentabilité. Visualisez vos ratios et prenez des décisions éclairées.',
        descriptionEn: 'Automatically calculate your labor cost in real-time. Integration with your schedule management systems to extract workforce data. Compare your labor costs with sales to optimize profitability. Visualize your ratios and make informed decisions.',
        image: '/images/tools/rh-labor.jpg',
        benefits: [
          { fr: 'Calcul automatique en temps réel', en: 'Automatic real-time calculation' },
          { fr: 'Intégration systèmes horaires', en: 'Schedule system integration' },
          { fr: 'Optimisation rentabilité', en: 'Profitability optimization' }
        ],
        concepts: ['automate', 'analyze']
      },
      {
        titleFr: 'Ratios de performance',
        titleEn: 'Performance Ratios',
        descriptionFr: 'Suivez vos ratios clés de main-d\'œuvre en temps réel. Labor cost en pourcentage des ventes, productivité par employé, coûts par heure de service. Comparez vos performances avec vos objectifs. Identifiez rapidement les écarts et ajustez vos opérations.',
        descriptionEn: 'Track your key workforce ratios in real-time. Labor cost as percentage of sales, productivity per employee, costs per service hour. Compare your performance with targets. Quickly identify gaps and adjust operations.',
        image: '/images/tools/rh-ratios.jpg',
        benefits: [
          { fr: 'Ratios en temps réel', en: 'Real-time ratios' },
          { fr: 'Comparaison avec objectifs', en: 'Target comparison' },
          { fr: 'Ajustements rapides', en: 'Quick adjustments' }
        ],
        concepts: ['analyze']
      },
      {
        titleFr: 'Intégration systèmes RH',
        titleEn: 'HR System Integration',
        descriptionFr: 'Connectez-vous à vos systèmes de gestion RH partenaires pour synchroniser automatiquement les données. Extraction des informations de main-d\'œuvre sans saisie manuelle. Données toujours à jour pour des analyses précises. Simplifiez votre gestion avec une intégration transparente.',
        descriptionEn: 'Connect to your partner HR management systems to automatically sync data. Extract workforce information without manual entry. Always up-to-date data for accurate analytics. Simplify your management with seamless integration.',
        image: '/images/tools/rh-integration.jpg',
        benefits: [
          { fr: 'Synchronisation automatique', en: 'Automatic synchronization' },
          { fr: 'Zéro saisie manuelle', en: 'Zero manual entry' },
          { fr: 'Données toujours à jour', en: 'Always up-to-date data' }
        ],
        concepts: ['automate']
      },
      {
        titleFr: 'Rapports et conformité',
        titleEn: 'Reports and Compliance',
        descriptionFr: 'Générez des rapports détaillés sur les pourboires et le labor cost. Historique par employé, par période, par service. Exportez pour la comptabilité et les déclarations fiscales. Transparence totale pour votre équipe. Conformité garantie avec les réglementations.',
        descriptionEn: 'Generate detailed reports on tips and labor cost. History by employee, period, service. Export for accounting and tax declarations. Total transparency for your team. Guaranteed compliance with regulations.',
        image: '/images/tools/rh-reports.jpg',
        benefits: [
          { fr: 'Rapports complets', en: 'Complete reports' },
          { fr: 'Export comptabilité', en: 'Accounting export' },
          { fr: 'Conformité garantie', en: 'Guaranteed compliance' }
        ],
        concepts: ['analyze']
      }
    ]
  },
  {
    id: 'octogone-360',
    nameFr: 'Octogone 360',
    nameEn: 'Octogone 360',
    descriptionFr: 'Tableau de bord intelligent multi-établissements avec analyses comptables automatisées et IA',
    descriptionEn: 'Intelligent multi-location dashboard with automated accounting analyses and AI',
    heroImage: '/dashboard_fr.avif',
    
    headerCategoryFr: 'Tableau de bord',
    headerCategoryEn: 'Dashboard',
    headerTitleFr: 'Octogone 360',
    headerTitleEn: 'Octogone 360',
    headerDescriptionFr: 'Centralisez, analysez et comparez. Données structurées, rapports automatisés, insights IA.',
    headerDescriptionEn: 'Centralize, analyze and compare. Structured data, automated reports, AI insights.',
    
    sections: [
      { concept: 'operate', features: [0, 1] },
      { concept: 'automate', features: [2, 3, 4, 5] },
      { concept: 'analyze', features: [6] },
      { concept: 'predict', features: [7] }
    ],
    
    features: [
      {
        titleFr: 'Centralisation intelligente des données',
        titleEn: 'Intelligent Data Centralization',
        descriptionFr: 'Octogone 360 agrège automatiquement les données de tous vos outils de gestion. Chaque information est structurée et organisée pour vous offrir une vue d\'ensemble cohérente et exploitable. Fini les rapports éparpillés dans différents systèmes.',
        descriptionEn: 'Octogone 360 automatically aggregates data from all your management tools. Every piece of information is structured and organized to give you a coherent and actionable overview. No more scattered reports across different systems.',
        image: '/images/tools/360-centralisation.jpg',
        benefits: [
          { fr: 'Agrégation automatique de toutes vos données', en: 'Automatic aggregation of all your data' },
          { fr: 'Vue d\'ensemble cohérente et centralisée', en: 'Coherent and centralized overview' },
          { fr: 'Élimination des rapports manuels', en: 'Elimination of manual reports' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Tableau de bord personnalisable',
        titleEn: 'Customizable Dashboard',
        descriptionFr: 'Créez votre espace de travail idéal en sélectionnant les KPIs qui comptent vraiment pour vous. Réorganisez-les selon vos priorités pour accéder instantanément aux informations essentielles à votre prise de décision.',
        descriptionEn: 'Create your ideal workspace by selecting the KPIs that truly matter to you. Reorganize them according to your priorities to instantly access the information essential to your decision-making.',
        image: '/images/tools/360-personnalisation.jpg',
        benefits: [
          { fr: 'Sélection libre des KPIs à afficher', en: 'Free selection of KPIs to display' },
          { fr: 'Réorganisation intuitive des KPIs', en: 'Intuitive KPI reorganization' },
          { fr: 'Accès rapide aux informations prioritaires', en: 'Quick access to priority information' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Données structurées et automatisées',
        titleEn: 'Structured and Automated Data',
        descriptionFr: 'Octogone 360 transforme automatiquement vos données brutes en informations structurées et exploitables. Chaque métrique est calculée en temps réel et mise à jour en continu, sans aucune intervention manuelle. Vos KPIs sont toujours à jour, vos rapports toujours prêts, et vous gagnez des heures précieuses chaque semaine. Concentrez-vous sur la prise de décision, pas sur la collecte de données.',
        descriptionEn: 'Octogone 360 automatically transforms your raw data into structured and actionable information. Every metric is calculated in real-time and continuously updated, without any manual intervention. Your KPIs are always up to date, your reports always ready, and you save precious hours every week. Focus on decision-making, not data collection.',
        layout: 'full-width',
        benefits: [
          { fr: 'Calculs automatiques en temps réel', en: 'Automatic real-time calculations' },
          { fr: 'Métriques toujours à jour', en: 'Metrics always up to date' },
          { fr: 'Gain de temps administratif significatif', en: 'Significant administrative time savings' },
          { fr: 'Données structurées et exploitables', en: 'Structured and actionable data' },
          { fr: 'Aucune intervention manuelle requise', en: 'No manual intervention required' },
          { fr: 'Rapports instantanément disponibles', en: 'Reports instantly available' }
        ],
        concepts: ['automate', 'analyze']
      },
      {
        titleFr: 'Rapports exportables',
        titleEn: 'Exportable Reports',
        descriptionFr: 'Générez et exportez vos rapports au format PDF, Excel ou CSV. Partagez facilement vos analyses avec votre équipe et vos partenaires.',
        descriptionEn: 'Generate and export your reports in PDF, Excel or CSV format. Easily share your analyses with your team and partners.',
        benefits: [
          { fr: 'Export PDF, Excel et CSV', en: 'PDF, Excel and CSV export' },
          { fr: 'Rapports professionnels complets', en: 'Complete professional reports' },
          { fr: 'Partage facile avec équipes et partenaires', en: 'Easy sharing with teams and partners' }
        ],
        concepts: ['operate', 'analyze']
      },
      {
        titleFr: 'Visualisations et graphiques',
        titleEn: 'Visualizations and Charts',
        descriptionFr: 'Visualisez vos données avec des graphiques clairs et intuitifs. Explorez vos tendances et identifiez rapidement les opportunités d\'amélioration.',
        descriptionEn: 'Visualize your data with clear and intuitive charts. Explore your trends and quickly identify improvement opportunities.',
        benefits: [
          { fr: 'Graphiques détaillés et intuitifs', en: 'Detailed and intuitive charts' },
          { fr: 'Visualisations claires de vos données', en: 'Clear data visualizations' },
          { fr: 'Analyse approfondie des tendances', en: 'In-depth trend analysis' }
        ],
        concepts: ['analyze']
      },
      {
        titleFr: 'Comparaisons multi-établissements',
        titleEn: 'Multi-Location Comparisons',
        descriptionFr: 'Comparez les performances entre vos établissements en temps réel. Identifiez les écarts et harmonisez vos opérations. Idéal pour les groupes et franchises.',
        descriptionEn: 'Compare performance across your locations in real-time. Identify gaps and harmonize your operations. Ideal for groups and franchises.',
        benefits: [
          { fr: 'Comparaison en temps réel entre établissements', en: 'Real-time comparison between locations' },
          { fr: 'Détection des écarts de performance', en: 'Performance gap detection' },
          { fr: 'Optimisation de la performance globale du groupe', en: 'Overall group performance optimization' }
        ],
        concepts: ['analyze', 'predict']
      },
      {
        titleFr: 'Analyses comparatives historiques',
        titleEn: 'Historical Comparative Analyses',
        descriptionFr: 'Comparez vos performances avec n\'importe quelle période passée. Identifiez les tendances saisonnières, mesurez l\'impact de vos actions et ajustez votre stratégie en fonction de données concrètes.',
        descriptionEn: 'Compare your performance with any past period. Identify seasonal trends, measure the impact of your actions and adjust your strategy based on concrete data.',
        benefits: [
          { fr: 'Comparaisons flexibles sur toutes périodes', en: 'Flexible comparisons across all periods' },
          { fr: 'Détection des tendances saisonnières', en: 'Seasonal trend detection' },
          { fr: 'Mesure d\'impact des actions mises en place', en: 'Impact measurement of implemented actions' }
        ],
        concepts: ['analyze']
      },
      {
        titleFr: 'Cortex : Intelligence artificielle intégrée',
        titleEn: 'Cortex: Integrated Artificial Intelligence',
        descriptionFr: 'Bientôt disponible : Cortex, votre agent intelligent personnel. Il analysera vos données en profondeur pour vous proposer des insights actionnables et des prévisions précises basées sur votre historique. Posez vos questions en langage naturel et obtenez des réponses instantanées. Cortex identifie les tendances, anticipe vos besoins, et vous aide à prendre des décisions éclairées. L\'intelligence artificielle au service de votre performance, sans effort.',
        descriptionEn: 'Coming soon: Cortex, your personal intelligent agent. It will analyze your data in depth to provide you with actionable insights and accurate forecasts based on your history. Ask your questions in natural language and get instant answers. Cortex identifies trends, anticipates your needs, and helps you make informed decisions. Artificial intelligence at the service of your performance, effortlessly.',
        layout: 'full-width',
        benefits: [
          { fr: 'Insights générés par intelligence artificielle', en: 'AI-generated insights' },
          { fr: 'Prévisions basées sur données historiques', en: 'Forecasts based on historical data' },
          { fr: 'Questions en langage naturel', en: 'Natural language questions' },
          { fr: 'Réponses instantanées et personnalisées', en: 'Instant and personalized answers' },
          { fr: 'Identification automatique des tendances', en: 'Automatic trend identification' },
          { fr: 'Aide à la décision en temps réel', en: 'Real-time decision support' }
        ],
        concepts: ['predict', 'automate']
      }
    ]
  }
];

// Fonction helper pour récupérer un outil par ID
export function getToolById(toolId: string): Tool | undefined {
  return tools.find(tool => tool.id === toolId);
}

// Fonction helper pour récupérer tous les outils
export function getAllTools(): Tool[] {
  return tools;
}

// Fonction helper pour la navigation
export function getNextTool(currentId: string): Tool | undefined {
  const currentIndex = tools.findIndex(t => t.id === currentId);
  if (currentIndex === -1) return undefined;
  return tools[(currentIndex + 1) % tools.length];
}

export function getPreviousTool(currentId: string): Tool | undefined {
  const currentIndex = tools.findIndex(t => t.id === currentId);
  if (currentIndex === -1) return undefined;
  return tools[(currentIndex - 1 + tools.length) % tools.length];
}
