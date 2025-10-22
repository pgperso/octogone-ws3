const fs = require('fs');
const path = require('path');

// Lire le fichier JSON
const filePath = path.join(__dirname, 'src', 'data', 'inventory', 'inventory-products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Ajouter initialQuantity à chaque produit (valeurs réalistes, jamais 0)
data.products = data.products.map(product => {
  let initialQuantity;
  const minInventory = product.minInventory || 10;
  
  // Générer une quantité initiale réaliste (peut être au-dessus ou en-dessous du minimum)
  // 70% des produits seront au-dessus du minimum, 30% en-dessous (pour simuler des alertes)
  const isAboveMin = Math.random() > 0.3;
  
  if (isAboveMin) {
    // Au-dessus du minimum : entre minInventory et minInventory * 2
    initialQuantity = Math.floor(minInventory + Math.random() * minInventory);
  } else {
    // En-dessous du minimum : entre 50% et 90% du minimum
    initialQuantity = Math.floor(minInventory * (0.5 + Math.random() * 0.4));
  }
  
  // S'assurer que ce n'est jamais 0
  if (initialQuantity === 0) initialQuantity = 1;
  
  return {
    ...product,
    initialQuantity
  };
});

// Écrire le fichier mis à jour
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ initialQuantity ajouté à tous les produits !');
console.log('📊 Environ 70% des produits sont au-dessus du minimum');
console.log('⚠️  Environ 30% des produits sont en-dessous du minimum (alertes)');
