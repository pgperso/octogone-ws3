const fs = require('fs');
const path = require('path');

// Lire le fichier JSON
const filePath = path.join(__dirname, 'src', 'data', 'inventory', 'inventory-products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Normaliser les unités : caisse et paquet deviennent "un"
let changedCount = 0;
data.products = data.products.map(product => {
  if (product.unit === 'caisse' || product.unit === 'paquet') {
    console.log(`✓ ${product.name}: ${product.unit} → un`);
    changedCount++;
    return {
      ...product,
      unit: 'un'
    };
  }
  return product;
});

// Écrire le fichier mis à jour
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`\n✅ ${changedCount} produits normalisés !`);
console.log('📦 "caisse" et "paquet" ont été remplacés par "un" (unité)');
