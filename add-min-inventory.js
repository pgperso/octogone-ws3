const fs = require('fs');
const path = require('path');

// Lire le fichier JSON
const filePath = path.join(__dirname, 'src', 'data', 'inventory', 'inventory-products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Ajouter minInventory à chaque produit (valeurs réalistes selon le type de produit)
data.products = data.products.map(product => {
  let minInventory;
  
  // Définir des seuils minimums réalistes selon la catégorie et l'unité
  if (product.unit === 'kg') {
    minInventory = Math.floor(Math.random() * 10) + 5; // 5-15 kg
  } else if (product.unit === 'L') {
    minInventory = Math.floor(Math.random() * 8) + 3; // 3-11 L
  } else if (product.unit === 'un') {
    minInventory = Math.floor(Math.random() * 20) + 10; // 10-30 unités
  } else if (product.unit === 'caisse') {
    minInventory = Math.floor(Math.random() * 3) + 2; // 2-5 caisses
  } else if (product.unit === 'paquet') {
    minInventory = Math.floor(Math.random() * 5) + 3; // 3-8 paquets
  } else {
    minInventory = 10; // Valeur par défaut
  }
  
  return {
    ...product,
    minInventory
  };
});

// Écrire le fichier mis à jour
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ minInventory ajouté à tous les produits !');
