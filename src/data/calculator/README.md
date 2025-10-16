# 📊 Données du Calculateur ROI

Ce dossier contient toutes les données de calcul du ROI en format JSON pour faciliter les modifications.

---

## 📁 Fichiers

### **modules.json**
Modules disponibles avec leurs gains estimés et impact sur les tâches manuelles.

**Nouveaux champs :**
- `manualTasksReduction` : Pourcentage de réduction des tâches manuelles (0-1)
- `invoiceTasksReduction` : Pourcentage de réduction des tâches factures (0-1)

**Modifier pour :**
- Ajouter un nouveau module
- Changer les gains d'un module
- Ajuster l'impact sur les tâches manuelles
- Modifier les descriptions

### **pricing.json**
Tranches de prix selon le nombre d'établissements.

**Modifier pour :**
- Ajuster les prix
- Ajouter de nouvelles tranches
- Changer les seuils

### **location-ranges.json**
Multiplicateurs d'efficacité selon le nombre d'établissements.

**Modifier pour :**
- Ajuster les multiplicateurs
- Modifier les tranches
- Changer les labels

### **calculation-config.json**
Paramètres de calcul généraux.

**Nouveaux champs :**
- `defaultManualTasksHoursPerWeek` : Heures par défaut consacrées aux tâches manuelles
- `weeksPerYear` : Nombre de semaines par an pour les calculs

**Modifier pour :**
- Changer le coût horaire par défaut
- Ajuster les heures de tâches manuelles par défaut
- Ajuster le facteur conservateur
- Modifier les frais d'intégration

---

## 🔄 Migration Progressive

### **Étape 1 : Test (Actuel)**
```typescript
// Dans /features/roi-calculator/config/index.ts
export * from './calculator-config';  // ← Version TypeScript
```

### **Étape 2 : Migration**
```typescript
// Dans /features/roi-calculator/config/index.ts
export * from './calculator-config-v2';  // ← Version JSON
```

### **Étape 3 : Nettoyage**
- Supprimer `calculator-config.ts`
- Renommer `calculator-config-v2.ts`

---

## ✅ Avantages

- **Facilité** : Modifier les prix sans toucher au code
- **Personnalisation** : Calculs basés sur les heures de tâches manuelles réelles
- **Précision** : Impact différencié par module sur les tâches manuelles
- **Traçabilité** : Historique des changements via Git
- **Cohérence** : Même approche que testimonials/sectors
- **Sécurité** : Migration progressive sans casser le code

## 🆕 Nouvelles Fonctionnalités

### **Calcul Personnalisé des Tâches Manuelles**

Le calculateur prend maintenant en compte :
- **Heures de tâches manuelles par semaine** (input utilisateur)
- **Impact spécifique de chaque module** sur ces tâches
- **Séparation tâches manuelles vs factures** pour plus de précision

### **Exemple de Calcul**

```
Heures manuelles/semaine : 10h
Module Inventaire : 70% tâches manuelles + 20% factures
Module Pourboire : 40% tâches manuelles + 80% factures

Gains = 10h × (70% + 20% + 40% + 80%) × 52 semaines × coût horaire
```

---

## 🎯 Utilisation

```typescript
// Import via l'index (recommandé)
import { calculatorModules, pricingTiers } from '@/data/calculator';

// Ou import direct
import modules from '@/data/calculator/modules.json';
```

---

**Dernière mise à jour** : 2025-10-14
