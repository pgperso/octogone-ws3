# 📊 ROI Calculator - Documentation

## 📁 Structure du dossier

```
roi-calculator/
├── config/
│   └── calculator-config.ts    # ⚙️ CONFIGURATION PRINCIPALE - Modifiez ici !
├── utils/
│   └── roi-calculations.ts     # 🧮 Formules de calcul (ne pas modifier sauf besoin)
├── components/
│   └── roi-calculator-section.tsx  # 🎨 Interface utilisateur
├── index.ts                    # Export du module
└── README.md                   # Ce fichier
```

## 🎯 Comment modifier les données de calcul

### 1️⃣ Modifier les modules disponibles

**Fichier :** `config/calculator-config.ts`  
**Section :** `AVAILABLE_MODULES`

```typescript
{
  id: 'products',                           // ID unique
  nameFr: 'Gestion des produits',          // Nom en français
  nameEn: 'Product Management',            // Nom en anglais
  descriptionFr: 'Catalogue centralisé',   // Description FR
  descriptionEn: 'Centralized catalog',    // Description EN
  monthlySavingsPerLocation: 450,          // 💰 Économies par établissement/mois
  timesSavedPerWeekPerLocation: 3,         // ⏰ Heures économisées par établissement/semaine
  icon: 'Package'                          // Icône Lucide (Package, Warehouse, etc.)
}
```

**Pour ajouter un module :**
1. Copiez un module existant
2. Changez l'ID, les noms et descriptions
3. Ajustez les économies estimées
4. Choisissez une icône Lucide
5. Ajoutez l'icône dans `ICON_MAP` du composant si nécessaire

### 2️⃣ Modifier les tranches d'établissements

**Fichier :** `config/calculator-config.ts`  
**Section :** `LOCATION_RANGES`

```typescript
{
  min: 2,                          // Nombre minimum
  max: 5,                          // Nombre maximum (null = illimité)
  labelFr: '2-5 établissements',   // Label français
  labelEn: '2-5 locations',        // Label anglais
  efficiencyMultiplier: 1.15       // 🚀 Multiplicateur d'efficacité (1.15 = +15% de gains)
}
```

**Logique du multiplicateur :**
- Plus il y a d'établissements, plus les économies d'échelle sont importantes
- 1.0 = pas de bonus
- 1.15 = +15% de gains grâce à la centralisation
- 1.5 = +50% de gains (pour grandes chaînes)

### 3️⃣ Modifier les prix d'abonnement

**Fichier :** `config/calculator-config.ts`  
**Section :** `PRICING_TIERS`

```typescript
{
  minLocations: 2,                    // Minimum d'établissements
  maxLocations: 5,                    // Maximum (null = illimité)
  pricePerLocationPerMonth: 249       // 💵 Prix par établissement/mois
}
```

**Logique de tarification :**
- Plus il y a d'établissements, moins le prix unitaire est élevé
- Encourage les clients à prendre plusieurs établissements

### 4️⃣ Ajuster les paramètres de calcul

**Fichier :** `config/calculator-config.ts`  
**Section :** `CALCULATION_CONFIG`

```typescript
{
  averageHourlyCost: 25,           // 💼 Coût horaire moyen d'un employé (avec charges)
  weeksPerMonth: 4.33,             // 📅 Semaines par mois (pour calculs)
  roiPeriodMonths: 12,             // 📊 Période de calcul du ROI
  implementationFee: 0,            // 💰 Frais d'implémentation (one-time)
  conservativeFactor: 0.85         // 🎯 Facteur de prudence (85% des gains estimés)
}
```

**Facteur de prudence :**
- Permet d'afficher des estimations conservatrices
- 0.85 = on affiche 85% des gains calculés
- Évite de sur-promettre

## 🧮 Formules de calcul

### Gains monétaires mensuels
```
Gains = Σ(économies par module) × nombre d'établissements × multiplicateur × facteur prudence
```

### Gains de temps mensuels
```
Temps = Σ(heures par module) × 4.33 semaines × nombre d'établissements × multiplicateur × facteur prudence
```

### Valeur du temps économisé
```
Valeur = Temps annuel × coût horaire moyen
```

### ROI
```
ROI % = (Gains totaux annuels - Coûts annuels) / Coûts annuels × 100
```

### Période de retour sur investissement
```
Mois = Coûts totaux / (Gains mensuels monétaires + Valeur temps mensuel)
```

## 🎨 Personnalisation de l'interface

**Fichier :** `components/roi-calculator-section.tsx`

### Couleurs
- Utilise les couleurs du thème Flutter (`var(--primary-container)`, etc.)
- Cohérent avec le reste du site

### Textes
- Tous les textes sont bilingues FR/EN
- Modifiez directement dans le composant

### Layout
- Responsive : 1 colonne mobile, 2 colonnes desktop
- Colonne gauche : Configuration
- Colonne droite : Résultats

## 📚 Sources des données

### Tarification
Les prix sont basés sur les forfaits réels Octogone :

**Forfaits individuels (par module) :**
- **Inventaire** : 69$/mois
- **Foodcost** : 79$/mois
- **Thermomètre** : 59$/mois (à partir de)
- **Pourboire** : 89$/mois

**Forfait PRO (tout inclus) :**
- **1 établissement** : 159$/mois
- **Prix dégressifs** pour plusieurs établissements

**Frais d'intégration :**
- **1500$ par établissement** (frais one-time)
- Inclus automatiquement dans le calcul du ROI
- Non affiché explicitement dans l'interface utilisateur

Le calculateur utilise le forfait PRO comme base, car il inclut tous les modules sélectionnés.

### Module Inventaire
Les données du module "Gestion des inventaires" sont basées sur l'étude **"Prise d'inventaire en restauration : avec ou sans Octogone?"**

**Problèmes identifiés avec méthode traditionnelle :**
- Double saisie (papier → Excel)
- Risques d'erreur (ratures, chiffres illisibles)
- Produits partiels difficiles à quantifier
- Manque de coordination multi-zones
- Perte de temps et interruptions

**Gains estimés avec Octogone :**
- Élimination double saisie : ~3h/semaine
- Réduction erreurs : ~500$/mois
- Coordination améliorée : ~2h/semaine
- Gestion produits partiels : ~3h/semaine + 200$/mois
- Réduction gaspillage : ~500$/mois
- **Total : 1200$/mois + 8h/semaine**

## 📝 Exemples de modifications courantes

### Augmenter les économies d'un module
```typescript
// Dans AVAILABLE_MODULES
{
  id: 'inventory',
  monthlySavingsPerLocation: 1000,  // Était 800, maintenant 1000
  // ...
}
```

### Ajouter une nouvelle tranche de prix
```typescript
// Dans PRICING_TIERS
{
  minLocations: 51,
  maxLocations: 100,
  pricePerLocationPerMonth: 129  // Nouveau palier pour très grandes chaînes
}
```

### Changer le coût horaire
```typescript
// Dans CALCULATION_CONFIG
{
  averageHourlyCost: 30,  // Était 25, maintenant 30
  // ...
}
```

## ✅ Checklist avant modification

- [ ] Sauvegarder le fichier original
- [ ] Modifier les valeurs dans `calculator-config.ts`
- [ ] Tester avec différents scénarios (1, 5, 20 établissements)
- [ ] Vérifier que les calculs sont cohérents
- [ ] Tester en FR et EN

## 🚀 Intégration dans une page

```typescript
import { ROICalculatorSection } from '@/features/roi-calculator';

// Dans votre page
<ROICalculatorSection />
```

## 📞 Support

Pour toute question sur les modifications, consultez :
- `calculator-config.ts` pour les données
- `roi-calculations.ts` pour les formules
- Ce README pour la documentation
