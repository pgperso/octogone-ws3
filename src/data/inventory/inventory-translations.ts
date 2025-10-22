export const categoryTranslations: Record<string, { fr: string; en: string }> = {
  'Légumes': { fr: 'Légumes', en: 'Vegetables' },
  'Fruits': { fr: 'Fruits', en: 'Fruits' },
  'Viandes': { fr: 'Viandes', en: 'Meats' },
  'Produits laitiers': { fr: 'Produits laitiers', en: 'Dairy products' },
  'Fruits de mer': { fr: 'Fruits de mer', en: 'Seafood' },
  'Boulangerie': { fr: 'Boulangerie', en: 'Bakery' },
  'Herbes': { fr: 'Herbes', en: 'Herbs' },
  'Boissons': { fr: 'Boissons', en: 'Beverages' },
  'Surgelés': { fr: 'Surgelés', en: 'Frozen' },
  'Épicerie': { fr: 'Épicerie', en: 'Grocery' }
};

export const productTranslations: Record<string, { fr: string; en: string }> = {
  // Légumes
  'Ail frais': { fr: 'Ail frais', en: 'Fresh garlic' },
  'Asperges': { fr: 'Asperges', en: 'Asparagus' },
  'Carottes': { fr: 'Carottes', en: 'Carrots' },
  'Champignons': { fr: 'Champignons', en: 'Mushrooms' },
  'Concombre': { fr: 'Concombre', en: 'Cucumber' },
  'Laitue': { fr: 'Laitue', en: 'Lettuce' },
  'Oignons': { fr: 'Oignons', en: 'Onions' },
  'Poivrons': { fr: 'Poivrons', en: 'Bell peppers' },
  'Pommes de terre': { fr: 'Pommes de terre', en: 'Potatoes' },
  'Tomates': { fr: 'Tomates', en: 'Tomatoes' },
  
  // Fruits
  'Ananas': { fr: 'Ananas', en: 'Pineapple' },
  'Avocat': { fr: 'Avocat', en: 'Avocado' },
  'Bananes': { fr: 'Bananes', en: 'Bananas' },
  'Citrons': { fr: 'Citrons', en: 'Lemons' },
  'Fraises': { fr: 'Fraises', en: 'Strawberries' },
  'Pommes': { fr: 'Pommes', en: 'Apples' },
  
  // Viandes
  'Bacon': { fr: 'Bacon', en: 'Bacon' },
  'Bœuf haché': { fr: 'Bœuf haché', en: 'Ground beef' },
  'Côtelettes de porc': { fr: 'Côtelettes de porc', en: 'Pork chops' },
  'Poulet entier': { fr: 'Poulet entier', en: 'Whole chicken' },
  'Saucisses': { fr: 'Saucisses', en: 'Sausages' },
  
  // Produits laitiers
  'Beurre': { fr: 'Beurre', en: 'Butter' },
  'Crème 35%': { fr: 'Crème 35%', en: '35% cream' },
  'Fromage cheddar': { fr: 'Fromage cheddar', en: 'Cheddar cheese' },
  'Lait': { fr: 'Lait', en: 'Milk' },
  'Œufs': { fr: 'Œufs', en: 'Eggs' },
  'Yogourt': { fr: 'Yogourt', en: 'Yogurt' },
  
  // Boissons
  'Bière': { fr: 'Bière', en: 'Beer' },
  'Café': { fr: 'Café', en: 'Coffee' },
  'Coca-Cola': { fr: 'Coca-Cola', en: 'Coca-Cola' },
  'Jus d\'orange': { fr: 'Jus d\'orange', en: 'Orange juice' },
  'Vin rouge': { fr: 'Vin rouge', en: 'Red wine' },
  
  // Épicerie
  'Farine': { fr: 'Farine', en: 'Flour' },
  'Huile d\'olive': { fr: 'Huile d\'olive', en: 'Olive oil' },
  'Pâtes': { fr: 'Pâtes', en: 'Pasta' },
  'Riz': { fr: 'Riz', en: 'Rice' },
  'Sel': { fr: 'Sel', en: 'Salt' },
  'Sucre': { fr: 'Sucre', en: 'Sugar' },
  
  // Surgelés
  'Crème glacée': { fr: 'Crème glacée', en: 'Ice cream' },
  'Frites surgelées': { fr: 'Frites surgelées', en: 'Frozen fries' },
  'Légumes mélangés': { fr: 'Légumes mélangés', en: 'Mixed vegetables' },
  'Pizza surgelée': { fr: 'Pizza surgelée', en: 'Frozen pizza' },
  
  // Fruits de mer
  'Crevettes': { fr: 'Crevettes', en: 'Shrimp' },
  'Saumon': { fr: 'Saumon', en: 'Salmon' },
  
  // Herbes
  'Basilic': { fr: 'Basilic', en: 'Basil' },
  'Persil': { fr: 'Persil', en: 'Parsley' },
  
  // Boulangerie
  'Pain': { fr: 'Pain', en: 'Bread' }
};

export const unitTranslations: Record<string, { fr: string; en: string }> = {
  'kg': { fr: 'kg', en: 'kg' },
  'g': { fr: 'g', en: 'g' },
  'L': { fr: 'L', en: 'L' },
  'mL': { fr: 'mL', en: 'mL' },
  'un': { fr: 'un', en: 'unit' },
  'lb': { fr: 'lb', en: 'lb' },
  'oz': { fr: 'oz', en: 'oz' }
};

export function translateCategory(category: string, locale: 'fr' | 'en'): string {
  return categoryTranslations[category]?.[locale] || category;
}

export function translateProduct(productName: string, locale: 'fr' | 'en'): string {
  return productTranslations[productName]?.[locale] || productName;
}

export function translateUnit(unit: string, locale: 'fr' | 'en'): string {
  return unitTranslations[unit]?.[locale] || unit;
}
