# Widget de Prise d'Inventaire Octogone

## 📁 Structure

```
octogone_inventories/
├── OctogoneInventoryWidget.tsx    # Widget principal (container)
├── InventoryProductList.tsx       # Liste de produits (gauche)
├── InventoryCalculator.tsx        # Calculatrice de saisie (droite)
├── index.ts                       # Exports
└── README.md                      # Documentation
```

## 🎯 Fonctionnalités

### Widget Principal (`OctogoneInventoryWidget`)
- Combine la liste et la calculatrice
- Gère l'état de l'inventaire
- Affiche les totaux (produits comptés, unités, valeur)

### Liste de Produits (`InventoryProductList`)
- **Barre de recherche** : Filtrage en temps réel par nom ou catégorie
- **Colonnes** :
  - Produit (nom + catégorie)
  - Quantité (avec unité)
  - Prix coûtant (par unité)
- **Scrollable** : Liste complète de 48 produits
- **Sélection** : Clic pour sélectionner un produit
- **Ordre alphabétique** : Produits triés de A à Z

### Calculatrice (`InventoryCalculator`)
- **Affichage** : Quantité + valeur totale
- **Pavé numérique** : 0-9 + décimale
- **Fonctions** :
  - Effacer : Réinitialiser à 0
  - Backspace : Supprimer dernier chiffre
  - Enregistrer : Sauvegarder la quantité
- **Désactivée** si aucun produit sélectionné

## 📊 Données

### Fichier JSON (`/data/products/octogone_products_data.json`)
- **49 produits** de restauration optimisés
- **Catégories** : Légumes, Fruits, Viandes, Produits laitiers, Épicerie, Condiments, etc.
- **Unités variées** : kg, g, L, mL, un, lb, oz
- **Prix réalistes** : Basés sur les coûts réels au Québec

### Structure d'un produit
```json
{
  "id": "prod-001",
  "name": "Ail frais",
  "category": "Légumes",
  "unit": "kg",
  "unitCost": 8.50
}
```

## 🔄 Interaction

1. **Recherche** : L'utilisateur tape dans la barre de recherche
2. **Sélection** : Clic sur un produit dans la liste
3. **Saisie** : Utilisation de la calculatrice pour entrer la quantité
4. **Enregistrement** : Clic sur "Enregistrer"
5. **Mise à jour** : La liste affiche la nouvelle quantité

## 🎨 Design

- **Responsive** : Grid 2 colonnes sur desktop, stack sur mobile
- **Thème** : Utilise les variables CSS du design system
- **Hauteur fixe** : 600px pour le contenu
- **Scrollable** : Liste de produits indépendante

## 💡 Utilisation

```tsx
import { OctogoneInventoryWidget } from '@/components/widgets/octogone_inventories';

export default function InventoryPage() {
  return <OctogoneInventoryWidget />;
}
```
