// Configuration des tags de prix/quantités pour l'animation d'inventaire
export interface InventoryTag {
  id: number;
  quantity: string;
  labelFr: string;
  labelEn: string;
  top: string;
  left?: string;
  right?: string;
}

// Tags de quantités sur les produits
export const INVENTORY_TAGS: InventoryTag[] = [
  {
    id: 1,
    quantity: '12',
    labelFr: 'Raisin rouge',
    labelEn: 'Red grapes',
    top: '15%',
    left: '12%'
  },
  {
    id: 2,
    quantity: '15',
    labelFr: 'Raisin vert',
    labelEn: 'Green grapes',
    top: '25%',
    right: '15%'
  },
  {
    id: 3,
    quantity: '8',
    labelFr: 'Champignons',
    labelEn: 'Mushrooms',
    top: '45%',
    left: '18%'
  },
  {
    id: 4,
    quantity: '24',
    labelFr: 'Tomates',
    labelEn: 'Tomatoes',
    top: '55%',
    right: '20%'
  }
];

// Progression initiale de l'inventaire (35%)
export const INITIAL_INVENTORY_PROGRESS = 35;

// Délais d'apparition des tags dans le Hero (en ms)
export const HERO_TAG_DELAYS = [800, 1200, 1600, 2000];

// Délais d'apparition des tags dans l'animation (en ms)
export const ANIMATION_TAG_DELAYS = [200, 400, 600, 800];
