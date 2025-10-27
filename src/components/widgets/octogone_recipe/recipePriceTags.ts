// Configuration des tags de prix pour les ingrédients de base
// Position: top/left pour le badge, lineX/lineY pour le point de connexion sur l'ingrédient
export const RECIPE_PRICE_TAGS = [
  { 
    id: 1, 
    price: '$0.45', 
    labelEn: 'Burger bun', 
    labelFr: 'Pain burger', 
    top: '8%', 
    left: '5%',
    lineEndX: '30%',
    lineEndY: '18%'
  },
  { 
    id: 2, 
    price: '$2.80', 
    labelEn: 'Beef', 
    labelFr: 'Bœuf', 
    top: '70%', 
    left: '75%',
    lineEndX: '55%',
    lineEndY: '58%'
  },
  { 
    id: 3, 
    price: '$0.65', 
    labelEn: 'Cheddar', 
    labelFr: 'Cheddar', 
    top: '35%', 
    left: '78%',
    lineEndX: '60%',
    lineEndY: '45%'
  },
];

// Pourcentage de complétion initial (3 ingrédients sur 7)
export const INITIAL_RECIPE_PROGRESS = 43;

// Délais d'apparition des tags dans le hero (en ms)
export const HERO_TAG_DELAYS = [200, 600, 1000];

// Délais d'apparition des tags dans l'animation (en ms)
export const ANIMATION_TAG_DELAYS = [0, 400, 800];
