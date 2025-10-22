const fs = require('fs');
const path = require('path');

// Lire le fichier JSON
const filePath = path.join(__dirname, 'src', 'data', 'inventory', 'inventory-products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Ajouter theoreticalQuantity à chaque produit
// L'inventaire théorique évolue avec les ventes du POS
// Il sera généralement différent de initialQuantity (inventaire physique précédent)
data.products = data.products.map(product => {
  const initialQuantity = product.initialQuantity || 10;
  
  // Simuler l'inventaire théorique du POS
  // Il peut être plus bas (ventes) ou légèrement différent (ajustements)
  // Variation entre -30% et +10% de l'inventaire initial
  const variation = -0.3 + Math.random() * 0.4; // Entre -30% et +10%
  let theoreticalQuantity = Math.floor(initialQuantity * (1 + variation));
  
  // S'assurer que ce n'est jamais négatif
  if (theoreticalQuantity < 0) theoreticalQuantity = 0;
  
  return {
    ...product,
    theoreticalQuantity
  };
});

// Écrire le fichier mis à jour
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ theoreticalQuantity ajouté à tous les produits !');
console.log('📊 Inventaire théorique (POS) simulé avec variations réalistes');
console.log('📝 initialQuantity = inventaire physique précédent (figé)');
console.log('🔄 theoreticalQuantity = inventaire théorique POS (évolue avec les ventes)');
