// Types pour les secteurs cibles
export interface TargetSector {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  image: string;
  gradient: string;
  hoverGradient: string;
}

// Données des secteurs cibles - SOURCE UNIQUE DE VÉRITÉ
export const targetSectors: TargetSector[] = [
  {
    id: "chains-groups",
    titleFr: "Chaînes et groupes de restaurants",
    titleEn: "Restaurant chains and groups",
    descriptionFr: "Multi-établissements & franchises",
    descriptionEn: "Multi-location & franchises",
    image: "/resto.jpg",
    gradient: "from-gold-400 to-gold-600",
    hoverGradient: "from-gold-500 to-gold-700"
  },
  {
    id: "independent-restaurants",
    titleFr: "Restaurants indépendants",
    titleEn: "Independent restaurants",
    descriptionFr: "Établissements uniques",
    descriptionEn: "Single establishments",
    image: "/resto.jpg",
    gradient: "from-marine-400 to-marine-600",
    hoverGradient: "from-marine-500 to-marine-700"
  },
  {
    id: "caterers",
    titleFr: "Traiteurs",
    titleEn: "Caterers",
    descriptionFr: "Événementiel & corporate",
    descriptionEn: "Events & corporate",
    image: "/resto.jpg",
    gradient: "from-blue-400 to-blue-600",
    hoverGradient: "from-blue-500 to-blue-700"
  },
  {
    id: "brewers-distillers",
    titleFr: "Brasseurs & distilleries",
    titleEn: "Brewers & distilleries",
    descriptionFr: "Production de boissons",
    descriptionEn: "Beverage production",
    image: "/resto.jpg",
    gradient: "from-amber-400 to-amber-600",
    hoverGradient: "from-amber-500 to-amber-700"
  },
  {
    id: "purchasing-groups",
    titleFr: "Regroupements d'achats",
    titleEn: "Purchasing groups",
    descriptionFr: "Achats groupés",
    descriptionEn: "Group purchasing",
    image: "/resto.jpg",
    gradient: "from-purple-400 to-purple-600",
    hoverGradient: "from-purple-500 to-purple-700"
  },
  {
    id: "retail-commerce",
    titleFr: "Commerces de détail",
    titleEn: "Retail commerce",
    descriptionFr: "Vente au détail",
    descriptionEn: "Retail sales",
    image: "/resto.jpg",
    gradient: "from-yellow-400 to-yellow-600",
    hoverGradient: "from-yellow-500 to-yellow-700"
  }
];

// Données des styles de restaurants
export const restaurantStyles: TargetSector[] = [
  {
    id: "gastronomic",
    titleFr: "Restauration gastronomique",
    titleEn: "Gastronomic dining",
    descriptionFr: "Haute cuisine raffinée",
    descriptionEn: "Refined haute cuisine",
    image: "/resto.jpg",
    gradient: "from-purple-400 to-purple-600",
    hoverGradient: "from-purple-500 to-purple-700"
  },
  {
    id: "bistro-brasserie",
    titleFr: "Bistro & brasserie",
    titleEn: "Bistro & brasserie",
    descriptionFr: "Ambiance conviviale",
    descriptionEn: "Friendly atmosphere",
    image: "/resto.jpg",
    gradient: "from-amber-400 to-amber-600",
    hoverGradient: "from-amber-500 to-amber-700"
  },
  {
    id: "fast-food",
    titleFr: "Restauration rapide",
    titleEn: "Fast food",
    descriptionFr: "Service rapide et efficace",
    descriptionEn: "Quick and efficient service",
    image: "/resto.jpg",
    gradient: "from-red-400 to-red-600",
    hoverGradient: "from-red-500 to-red-700"
  },
  {
    id: "casse-croute",
    titleFr: "Casse-croûte",
    titleEn: "Snack bar",
    descriptionFr: "Mets simples servis au comptoir",
    descriptionEn: "Simple meals served at counter",
    image: "/resto.jpg",
    gradient: "from-orange-400 to-orange-600",
    hoverGradient: "from-orange-500 to-orange-700"
  },
  {
    id: "family-restaurant",
    titleFr: "Restaurant familial",
    titleEn: "Family restaurant",
    descriptionFr: "Ambiance chaleureuse",
    descriptionEn: "Warm atmosphere",
    image: "/resto.jpg",
    gradient: "from-green-400 to-green-600",
    hoverGradient: "from-green-500 to-green-700"
  },
  {
    id: "cafe",
    titleFr: "Café",
    titleEn: "Café",
    descriptionFr: "Produits frais et artisanaux",
    descriptionEn: "Fresh and artisanal products",
    image: "/resto.jpg",
    gradient: "from-yellow-400 to-yellow-600",
    hoverGradient: "from-yellow-500 to-yellow-700"
  },
  {
    id: "pub-microbrewery",
    titleFr: "Pub & microbrasserie",
    titleEn: "Pub & microbrewery",
    descriptionFr: "Bières artisanales",
    descriptionEn: "Craft beers",
    image: "/resto.jpg",
    gradient: "from-blue-400 to-blue-600",
    hoverGradient: "from-blue-500 to-blue-700"
  },
  {
    id: "catering-corporate",
    titleFr: "Traiteur & service alimentaire",
    titleEn: "Catering & food service",
    descriptionFr: "Services événementiels",
    descriptionEn: "Event services",
    image: "/resto.jpg",
    gradient: "from-indigo-400 to-indigo-600",
    hoverGradient: "from-indigo-500 to-indigo-700"
  },
  {
    id: "tourism-industrial",
    titleFr: "Restauration touristique et industrielle",
    titleEn: "Tourism and industrial dining",
    descriptionFr: "Secteurs spécialisés",
    descriptionEn: "Specialized sectors",
    image: "/resto.jpg",
    gradient: "from-teal-400 to-teal-600",
    hoverGradient: "from-teal-500 to-teal-700"
  }
];

// Fonction pour récupérer tous les secteurs (types + styles)
export function getAllSectors(): TargetSector[] {
  return [...targetSectors, ...restaurantStyles];
}

// Fonctions de navigation entre secteurs
export function getNextSector(currentSectorId: string, isRestaurantStyle: boolean): TargetSector | null {
  const sectors = isRestaurantStyle ? restaurantStyles : targetSectors;
  const currentIndex = sectors.findIndex(sector => sector.id === currentSectorId);
  
  if (currentIndex === -1) return null;
  
  // Navigation en boucle : si on est au dernier, on va au premier
  const nextIndex = (currentIndex + 1) % sectors.length;
  return sectors[nextIndex];
}

export function getPreviousSector(currentSectorId: string, isRestaurantStyle: boolean): TargetSector | null {
  const sectors = isRestaurantStyle ? restaurantStyles : targetSectors;
  const currentIndex = sectors.findIndex(sector => sector.id === currentSectorId);
  
  if (currentIndex === -1) return null;
  
  // Navigation en boucle : si on est au premier, on va au dernier
  const previousIndex = currentIndex === 0 ? sectors.length - 1 : currentIndex - 1;
  return sectors[previousIndex];
}
