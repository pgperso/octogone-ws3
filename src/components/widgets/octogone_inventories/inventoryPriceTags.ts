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
    quantity: '24',
    labelFr: 'Tomates',
    labelEn: 'Tomatoes',
    top: '15%',
    left: '12%'
  },
  {
    id: 2,
    quantity: '18',
    labelFr: 'Laitues',
    labelEn: 'Lettuces',
    top: '25%',
    right: '15%'
  },
  {
    id: 3,
    quantity: '45',
    labelFr: 'Oignons',
    labelEn: 'Onions',
    top: '45%',
    left: '18%'
  },
  {
    id: 4,
    quantity: '12',
    labelFr: 'Fromages',
    labelEn: 'Cheeses',
    top: '55%',
    right: '20%'
  },
  {
    id: 5,
    quantity: '8',
    labelFr: 'Viandes',
    labelEn: 'Meats',
    top: '70%',
    left: '15%'
  }
];

// Progression initiale de l'inventaire (35%)
export const INITIAL_INVENTORY_PROGRESS = 35;

// Délais d'apparition des tags dans le Hero (en ms)
export const HERO_TAG_DELAYS = [800, 1200, 1600, 2000, 2400];

// Délais d'apparition des tags dans l'animation (en ms)
export const ANIMATION_TAG_DELAYS = [200, 400, 600, 800, 1000];
