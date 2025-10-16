export type Route = {
  path: string;
  label: string;
  description?: string;
  children?: Route[];
};

export const routes: Route[] = [
  {
    path: "/",
    label: "Accueil",
    description: "Plateforme de gestion intelligente pour restaurants",
  },
  {
    path: "/fonctionnalites",
    label: "Outils",
    description: "Tous les outils pour optimiser votre restaurant",
    children: [
      {
        path: "/fonctionnalites/inventaire",
        label: "Inventaire",
        description: "Gérez vos stocks en temps réel avec précision et simplicité",
      },
      {
        path: "/fonctionnalites/food-cost",
        label: "Food Cost",
        description: "Maîtrisez vos coûts et optimisez vos marges automatiquement",
      },
      {
        path: "/fonctionnalites/iot",
        label: "IoT",
        description: "Surveillez vos équipements et températures à distance",
      },
      {
        path: "/fonctionnalites/ressources-humaines",
        label: "Ressources Humaines",
        description: "Simplifiez la gestion de vos équipes et des pourboires",
      },
    ],
  },
  {
    path: "/cortex",
    label: "Cortex IA",
    description: "Votre assistant IA qui transforme vos données en décisions",
  },
  {
    path: "/blog",
    label: "Blog",
    description: "Conseils et actualités pour optimiser votre restaurant",
  },
  {
    path: "/forfaits",
    label: "Tarifs",
    description: "Des forfaits adaptés à vos besoins",
  },
  {
    path: "/contact",
    label: "Contact",
    description: "Discutons de votre projet",
  },
];
