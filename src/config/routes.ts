export type Route = {
  path: string;
  label: string;
  labelEn?: string;
  description?: string;
  descriptionEn?: string;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/",
    label: "Accueil",
    labelEn: "Home",
    description: "Plateforme de gestion intelligente pour restaurants",
    descriptionEn: "Intelligent management platform for restaurants",
  },
  {
    path: "/fonctionnalites",
    label: "Fonctionnalités",
    labelEn: "Features",
    description: "Toutes les fonctionnalités pour optimiser votre restaurant",
    descriptionEn: "All features to optimize your restaurant",
    children: [
      {
        path: "/fonctionnalites/octogone-360",
        label: "Octogone 360",
        labelEn: "Octogone 360",
        description: "Tableau de bord intelligent avec tous vos KPIs en temps réel",
        descriptionEn: "Intelligent dashboard with all your KPIs in real-time",
      },
      {
        path: "/fonctionnalites/inventaire",
        label: "Gestion des stocks",
        labelEn: "Inventory Management",
        description: "Gérez vos stocks en temps réel avec précision et simplicité",
        descriptionEn: "Manage your inventory in real-time with precision and simplicity",
      },
      {
        path: "/fonctionnalites/food-cost",
        label: "Recettes et Food Cost",
        labelEn: "Recipes and Food Cost",
        description: "Maîtrisez vos coûts et optimisez vos marges automatiquement",
        descriptionEn: "Master your costs and optimize your margins automatically",
      },
      {
        path: "/fonctionnalites/iot",
        label: "Thermomètres",
        labelEn: "Thermometers",
        description: "Surveillez vos équipements et températures à distance",
        descriptionEn: "Monitor your equipment and temperatures remotely",
      },
      {
        path: "/fonctionnalites/ressources-humaines",
        label: "Ressources Humaines",
        labelEn: "Human Resources",
        description: "Simplifiez la gestion de vos équipes et des pourboires",
        descriptionEn: "Simplify team and tip management",
      },
    ],
  },
  {
    path: "/cortex",
    label: "Cortex IA",
    labelEn: "Cortex AI",
    description: "Votre assistant IA qui transforme vos données en décisions",
    descriptionEn: "Your AI assistant that transforms data into decisions",
  },
  {
    path: "/blog",
    label: "Blog",
    labelEn: "Blog",
    description: "Conseils et actualités pour optimiser votre restaurant",
    descriptionEn: "Tips and news to optimize your restaurant",
  },
  {
    path: "/forfaits",
    label: "Tarifs",
    labelEn: "Pricing",
    description: "Des forfaits adaptés à vos besoins",
    descriptionEn: "Plans tailored to your needs",
  },
  {
    path: "/contact",
    label: "Contact",
    labelEn: "Contact",
    description: "Discutons de votre projet",
    descriptionEn: "Let's discuss your project",
  },
];
