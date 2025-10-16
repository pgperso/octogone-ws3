/**
 * Données des outils/fonctionnalités Octogone
 * Structure similaire à sectors-data.ts pour cohérence
 */

export interface ToolFeature {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
  benefits: Array<{
    fr: string;
    en: string;
  }>;
  // Concepts associés à cette feature (peut être 1, 2, 3 ou 4 concepts)
  concepts?: Array<'operate' | 'automate' | 'analyze' | 'predict'>;
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
    descriptionFr: 'Numérisez vos inventaires et suivez vos stocks en temps réel',
    descriptionEn: 'Digitize your inventory and track your stock in real-time',
    heroImage: '/images/tools/inventaire-hero.jpg',
    
    // Header personnalisé
    headerCategoryFr: 'Inventaire & Inventaire en temps réel',
    headerCategoryEn: 'Inventory & Real-Time Inventory',
    headerTitleFr: 'Des inventaires faciles, rapides et précis',
    headerTitleEn: 'Inventory made simple, fast, and accurate',
    headerDescriptionFr: 'Collaborez en temps réel, suivez automatiquement et obtenez une visibilité complète',
    headerDescriptionEn: 'Collaborate in real-time, track automatically, and gain complete visibility',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'operate',
        features: [0, 1, 2, 3, 4] // Features principales avec images + secondaires
      },
      {
        concept: 'analyze',
        features: [5, 6] // Features restantes
      }
    ],
    
    features: [
      {
        titleFr: 'Saisie d\'inventaire collaborative et simultanée',
        titleEn: 'Collaborative and Simultaneous Inventory Entry',
        descriptionFr: 'Transformez votre prise d\'inventaire en permettant à plusieurs membres de votre équipe de saisir les quantités simultanément. Fini les heures interminables avec une seule personne qui fait le tour du restaurant. Divisez les zones, saisissez en parallèle et synchronisez automatiquement toutes les données en temps réel. Cette approche collaborative réduit drastiquement le temps nécessaire pour compléter un inventaire complet.',
        descriptionEn: 'Transform your inventory taking by allowing multiple team members to enter quantities simultaneously. No more endless hours with one person going around the restaurant. Divide zones, enter data in parallel and automatically sync all data in real-time. This collaborative approach drastically reduces the time needed to complete a full inventory.',
        image: '/images/tools/inventaire-mobile.jpg',
        benefits: [
          { fr: 'Saisie simultanée par plusieurs utilisateurs', en: 'Simultaneous entry by multiple users' },
          { fr: 'Synchronisation automatique en temps réel', en: 'Automatic real-time synchronization' },
          { fr: 'Réduction significative du temps d\'inventaire', en: 'Significant inventory time reduction' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Inventaire théorique en temps réel',
        titleEn: 'Real-time Theoretical Inventory',
        descriptionFr: 'Connaissez à tout moment votre inventaire théorique grâce à l\'intégration avec votre système POS. Chaque vente déduit automatiquement les ingrédients utilisés de votre stock théorique. Plus besoin d\'attendre la fin du mois pour savoir où vous en êtes. Cette visibilité en temps réel vous permet de prendre des décisions éclairées sur vos commandes et d\'anticiper les ruptures de stock.',
        descriptionEn: 'Know your theoretical inventory at any time through integration with your POS system. Each sale automatically deducts the ingredients used from your theoretical stock. No need to wait until the end of the month to know where you stand. This real-time visibility allows you to make informed decisions about your orders and anticipate stock-outs.',
        image: '/images/tools/inventaire-temps-reel.jpg',
        benefits: [
          { fr: 'Inventaire théorique calculé automatiquement', en: 'Theoretical inventory calculated automatically' },
          { fr: 'Déduction automatique à chaque vente', en: 'Automatic deduction with each sale' },
          { fr: 'Visibilité continue de vos stocks', en: 'Continuous stock visibility' }
        ],
        concepts: ['automate', 'analyze']
      },
      {
        titleFr: 'Analyse des écarts et optimisation',
        titleEn: 'Variance Analysis and Optimization',
        descriptionFr: 'Comparez votre inventaire physique avec votre inventaire théorique pour identifier précisément vos écarts. Détectez rapidement le gaspillage, les erreurs de portions, le vol ou les problèmes de recettes. Les rapports détaillés vous montrent où se situent vos pertes et vous aident à mettre en place des actions correctives. Cette analyse vous permet de réduire vos coûts alimentaires de 2 à 5% en moyenne.',
        descriptionEn: 'Compare your physical inventory with your theoretical inventory to precisely identify your variances. Quickly detect waste, portion errors, theft or recipe issues. Detailed reports show you where your losses are and help you implement corrective actions. This analysis allows you to reduce your food costs by 2 to 5% on average.',
        image: '/images/tools/inventaire-ecarts.jpg',
        benefits: [
          { fr: 'Comparaison physique vs théorique', en: 'Physical vs theoretical comparison' },
          { fr: 'Identification des sources de pertes', en: 'Loss source identification' },
          { fr: 'Réduction des coûts alimentaires de 2-5%', en: '2-5% food cost reduction' }
        ],
        concepts: ['analyze', 'predict']
      },
      {
        titleFr: 'Flexibilité des unités de mesure',
        titleEn: 'Unit of Measure Flexibility',
        descriptionFr: 'Prenez vos inventaires avec n\'importe quelle unité de mesure. Toutes les équivalences possibles sont gérées directement dans la fiche produit : comptez en caisses, en unités, en kilogrammes ou en litres selon ce qui est le plus pratique sur le terrain. Chaque fiche produit contient toutes les conversions nécessaires, permettant au système de convertir automatiquement vers l\'unité de base pour des calculs précis. Cette flexibilité accélère considérablement la prise d\'inventaire et élimine les erreurs de conversion.',
        descriptionEn: 'Take your inventories with any unit of measure. All possible equivalences are managed directly in the product sheet: count in cases, units, kilograms or liters depending on what\'s most practical in the field. Each product sheet contains all necessary conversions, allowing the system to automatically convert to the base unit for accurate calculations. This flexibility significantly speeds up inventory taking and eliminates conversion errors.',
        image: '/images/tools/inventaire-unites.jpg',
        benefits: [
          { fr: 'Saisie avec n\'importe quelle unité de mesure', en: 'Entry with any unit of measure' },
          { fr: 'Toutes les équivalences dans la fiche produit', en: 'All equivalences in the product sheet' },
          { fr: 'Conversions automatiques pour calculs précis', en: 'Automatic conversions for accurate calculations' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Catalogue de produits centralisé et personnalisé',
        titleEn: 'Centralized and Customized Product Catalog',
        descriptionFr: 'Nous importons tous les produits de vos fournisseurs directement dans votre propre catalogue de produits. Chaque produit est enregistré dans une fiche complète avec toutes ses informations : formats, codes produits, prix, et surtout toutes les unités de mesure possibles avec leurs conversions. Ce catalogue centralisé est partagé entre l\'inventaire et les recettes, garantissant une cohérence parfaite dans toute votre gestion.',
        descriptionEn: 'We import all products from your suppliers directly into your own product catalog. Each product is recorded in a complete sheet with all its information: formats, product codes, prices, and especially all possible units of measure with their conversions. This centralized catalog is shared between inventory and recipes, ensuring perfect consistency throughout your management.',
        image: '/images/tools/inventaire-catalogue.jpg',
        benefits: [
          { fr: 'Import automatique depuis vos fournisseurs', en: 'Automatic import from your suppliers' },
          { fr: 'Catalogue personnalisé à votre entreprise', en: 'Catalog customized to your business' },
          { fr: 'Partagé entre inventaire et recettes', en: 'Shared between inventory and recipes' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Gestion des emplacements personnalisés',
        titleEn: 'Custom Location Management',
        descriptionFr: 'Créez des listes personnalisées d\'emplacements avec des positions spécifiques pour organiser votre prise d\'inventaire. Définissez vos zones (cuisine, bar, réserve) et les positions exactes de chaque produit. Cette organisation facilite grandement la prise d\'inventaire en guidant vos équipes dans un ordre logique et en réduisant les oublis.',
        descriptionEn: 'Create custom location lists with specific positions to organize your inventory taking. Define your zones (kitchen, bar, storage) and the exact positions of each product. This organization greatly facilitates inventory taking by guiding your teams in a logical order and reducing oversights.',
        image: '/images/tools/inventaire-emplacements.jpg',
        benefits: [
          { fr: 'Listes d\'emplacements personnalisées', en: 'Custom location lists' },
          { fr: 'Positions définies pour chaque produit', en: 'Defined positions for each product' },
          { fr: 'Organisation logique de la prise d\'inventaire', en: 'Logical inventory taking organization' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Rapports détaillés et comparaisons',
        titleEn: 'Detailed Reports and Comparisons',
        descriptionFr: 'Générez des rapports détaillés sur vos inventaires avec toutes les informations dont vous avez besoin : valeur totale, écarts, mouvements de stock, historique complet. Comparez vos inventaires entre différentes périodes pour identifier les tendances et les variations.',
        descriptionEn: 'Generate detailed reports on your inventories with all the information you need: total value, variances, stock movements, complete history. Compare your inventories across different periods to identify trends and variations.',
        image: '/images/tools/inventaire-rapports.jpg',
        benefits: [
          { fr: 'Rapports détaillés complets', en: 'Complete detailed reports' },
          { fr: 'Comparaison entre périodes', en: 'Period-to-period comparison' },
          { fr: 'Historique et analyses', en: 'History and analytics' }
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
    headerTitleFr: 'Maîtrisez votre rentabilité avec précision',
    headerTitleEn: 'Master your profitability with precision',
    headerDescriptionFr: 'Standardisez vos recettes, calculez automatiquement et optimisez vos marges',
    headerDescriptionEn: 'Standardize your recipes, calculate automatically and optimize your margins',
    
    // Configuration des sections avec concepts
    sections: [
      {
        concept: 'operate',
        features: [0, 1, 2, 3, 4] // Features principales avec images + secondaires
      },
      {
        concept: 'analyze',
        features: [5, 6, 7] // Features restantes
      }
    ],
    
    features: [
      {
        titleFr: 'Standardisation des recettes',
        titleEn: 'Recipe Standardization',
        descriptionFr: 'Créez des fiches techniques détaillées pour chacun de vos plats. Définissez précisément les ingrédients, les quantités, les étapes de préparation et les portions. Cette standardisation garantit la constance de vos plats, facilite la formation de votre équipe et vous permet de calculer avec précision le coût de chaque recette. Vos recettes deviennent un actif documenté de votre entreprise.',
        descriptionEn: 'Create detailed technical sheets for each of your dishes. Precisely define ingredients, quantities, preparation steps and portions. This standardization ensures consistency of your dishes, facilitates team training and allows you to accurately calculate the cost of each recipe. Your recipes become a documented asset of your business.',
        image: '/images/tools/foodcost-recettes.jpg',
        benefits: [
          { fr: 'Fiches techniques détaillées et complètes', en: 'Detailed and complete technical sheets' },
          { fr: 'Constance garantie de vos plats', en: 'Guaranteed consistency of your dishes' },
          { fr: 'Formation simplifiée de l\'équipe', en: 'Simplified team training' }
        ],
        concepts: ['operate']
      },
      {
        titleFr: 'Catalogue centralisé de produits',
        titleEn: 'Centralized Product Catalog',
        descriptionFr: 'Utilisez le même catalogue de produits pour vos inventaires et vos recettes. Chaque produit contient toutes ses informations : prix, formats, unités de mesure et conversions. Cette centralisation élimine les incohérences et garantit que vos calculs de food cost utilisent toujours les prix les plus récents de vos fournisseurs.',
        descriptionEn: 'Use the same product catalog for your inventories and recipes. Each product contains all its information: prices, formats, units of measure and conversions. This centralization eliminates inconsistencies and ensures your food cost calculations always use the most recent prices from your suppliers.',
        image: '/images/tools/foodcost-catalogue.jpg',
        benefits: [
          { fr: 'Un seul catalogue pour inventaire et recettes', en: 'Single catalog for inventory and recipes' },
          { fr: 'Cohérence parfaite des données', en: 'Perfect data consistency' },
          { fr: 'Prix toujours à jour', en: 'Always up-to-date prices' }
        ],
        concepts: ['operate', 'automate']
      },
      {
        titleFr: 'Mises à jour automatiques des coûts',
        titleEn: 'Automatic Cost Updates',
        descriptionFr: 'Changez le prix d\'un ingrédient et toutes vos recettes se mettent à jour instantanément. Plus besoin de recalculer manuellement le coût de chaque plat. Le système propage automatiquement les changements de prix à travers toutes vos recettes, vous donnant une vision en temps réel de l\'impact sur votre rentabilité.',
        descriptionEn: 'Change an ingredient price and all your recipes update instantly. No need to manually recalculate the cost of each dish. The system automatically propagates price changes across all your recipes, giving you real-time visibility of the impact on your profitability.',
        image: '/images/tools/foodcost-auto.jpg',
        benefits: [
          { fr: 'Mise à jour instantanée de toutes les recettes', en: 'Instant update of all recipes' },
          { fr: 'Zéro calcul manuel', en: 'Zero manual calculation' },
          { fr: 'Impact visible immédiatement', en: 'Impact visible immediately' }
        ],
        concepts: ['automate']
      },
      {
        titleFr: 'Food Cost en temps réel',
        titleEn: 'Real-time Food Cost',
        descriptionFr: 'Connaissez votre food cost en temps réel grâce à l\'intégration avec votre POS. Chaque vente met à jour automatiquement vos statistiques. Suivez votre food cost par plat, par catégorie ou global. Identifiez immédiatement les variations et agissez rapidement pour maintenir votre rentabilité.',
        descriptionEn: 'Know your food cost in real-time through integration with your POS. Each sale automatically updates your statistics. Track your food cost by dish, by category or overall. Immediately identify variations and act quickly to maintain your profitability.',
        image: '/images/tools/foodcost-temps-reel.jpg',
        benefits: [
          { fr: 'Food cost calculé en temps réel', en: 'Food cost calculated in real-time' },
          { fr: 'Suivi par plat et par catégorie', en: 'Tracking by dish and category' },
          { fr: 'Détection immédiate des variations', en: 'Immediate detection of variations' }
        ],
        concepts: ['automate', 'analyze']
      },
      {
        titleFr: 'Automatisation des calculs',
        titleEn: 'Calculation Automation',
        descriptionFr: 'Le système calcule automatiquement le coût de chaque recette en fonction des ingrédients et de leurs prix actuels. Les coûts de portions, les marges et les prix de vente suggérés sont calculés instantanément. Cette automatisation élimine les erreurs de calcul et vous fait gagner des heures chaque semaine.',
        descriptionEn: 'The system automatically calculates the cost of each recipe based on ingredients and their current prices. Portion costs, margins and suggested selling prices are calculated instantly. This automation eliminates calculation errors and saves you hours each week.',
        image: '/images/tools/foodcost-calculs.jpg',
        benefits: [
          { fr: 'Calculs automatiques et précis', en: 'Automatic and accurate calculations' },
          { fr: 'Marges et prix suggérés', en: 'Suggested margins and prices' },
          { fr: 'Économie de temps considérable', en: 'Considerable time savings' }
        ],
        concepts: ['automate']
      },
      {
        titleFr: 'Simulateur de Food Cost',
        titleEn: 'Food Cost Simulator',
        descriptionFr: 'Testez différents scénarios avant de prendre vos décisions. Simulez l\'impact d\'un changement de fournisseur, d\'une augmentation de prix ou d\'une modification de recette. Comparez les options et choisissez la meilleure stratégie pour votre rentabilité.',
        descriptionEn: 'Test different scenarios before making your decisions. Simulate the impact of a supplier change, price increase or recipe modification. Compare options and choose the best strategy for your profitability.',
        image: '/images/tools/foodcost-simulateur.jpg',
        benefits: [
          { fr: 'Simulation de scénarios multiples', en: 'Multiple scenario simulation' },
          { fr: 'Comparaison d\'options', en: 'Option comparison' },
          { fr: 'Décisions éclairées', en: 'Informed decisions' }
        ],
        concepts: ['analyze', 'predict']
      },
      {
        titleFr: 'Ingénierie de menu',
        titleEn: 'Menu Engineering',
        descriptionFr: 'Analysez la rentabilité et la popularité de chaque plat avec la matrice d\'ingénierie de menu. Identifiez vos stars (populaires et rentables), vos chevaux de labour (populaires mais peu rentables), vos énigmes (rentables mais impopulaires) et vos poids morts. Optimisez votre menu pour maximiser vos profits.',
        descriptionEn: 'Analyze the profitability and popularity of each dish with the menu engineering matrix. Identify your stars (popular and profitable), your workhorses (popular but not very profitable), your puzzles (profitable but unpopular) and your dead weight. Optimize your menu to maximize your profits.',
        image: '/images/tools/foodcost-ingenierie.jpg',
        benefits: [
          { fr: 'Matrice d\'ingénierie de menu', en: 'Menu engineering matrix' },
          { fr: 'Classification des plats', en: 'Dish classification' },
          { fr: 'Optimisation de la rentabilité', en: 'Profitability optimization' }
        ],
        concepts: ['analyze']
      },
      {
        titleFr: 'Suivi des tendances',
        titleEn: 'Trend Tracking',
        descriptionFr: 'Suivez l\'évolution de votre food cost dans le temps. Identifiez les tendances saisonnières, les variations de prix des fournisseurs et l\'impact de vos décisions. Les graphiques et rapports vous donnent une vision claire de votre performance et vous aident à anticiper les changements.',
        descriptionEn: 'Track the evolution of your food cost over time. Identify seasonal trends, supplier price variations and the impact of your decisions. Graphs and reports give you a clear view of your performance and help you anticipate changes.',
        image: '/images/tools/foodcost-tendances.jpg',
        benefits: [
          { fr: 'Évolution dans le temps', en: 'Evolution over time' },
          { fr: 'Identification des tendances', en: 'Trend identification' },
          { fr: 'Anticipation des changements', en: 'Change anticipation' }
        ],
        concepts: ['analyze', 'predict']
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
