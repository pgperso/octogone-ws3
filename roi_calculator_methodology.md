# Méthodologie de Calcul ROI - Octogone 360

## Vue d'ensemble
Cette documentation détaille la méthode complète de calcul du retour sur investissement (ROI) pour la plateforme Octogone 360.

---

## 1. DONNÉES D'ENTRÉE (Inputs)

### 1.1 Informations de base
- **Nombre d'établissements** : Nombre de restaurants/établissements gérés
- **Nombre d'employés** : Total des employés dans tous les établissements
- **Revenus annuels** : Chiffre d'affaires annuel total ($)
- **Coût de la main-d'œuvre** : Pourcentage des revenus (%)
- **Coût des aliments** : Pourcentage des revenus (%)

### 1.2 Problèmes actuels (Sliders)
Chaque problème est évalué sur une échelle de 0 à 10 :
- **Gaspillage alimentaire** (0-10)
- **Inefficacité de la planification** (0-10)
- **Erreurs d'inventaire** (0-10)
- **Problèmes de conformité** (0-10)
- **Perte de temps administratif** (0-10)

---

## 2. CALCULS INTERMÉDIAIRES

### 2.1 Coûts annuels de base
```
coûtMainOeuvreAnnuel = revenusAnnuels × (coûtMainOeuvre / 100)
coûtAlimentsAnnuel = revenusAnnuels × (coûtAliments / 100)
```

### 2.2 Calcul des économies par catégorie

#### A. Réduction du gaspillage alimentaire
```
tauxGaspillageActuel = (gaspillageAlimentaire / 10) × 0.10
  // 10/10 = 10% de gaspillage maximum
  
perteGaspillage = coûtAlimentsAnnuel × tauxGaspillageActuel

réductionGaspillage = 0.30
  // Octogone réduit le gaspillage de 30%
  
économieGaspillage = perteGaspillage × réductionGaspillage
```

**Exemple :**
- Coût aliments annuel : 300 000 $
- Gaspillage : 8/10 → 8% de gaspillage
- Perte actuelle : 300 000 $ × 0.08 = 24 000 $
- Économie : 24 000 $ × 0.30 = **7 200 $**

#### B. Optimisation de la planification
```
heuresParEmployéParSemaine = 40
semainesParAn = 52
heuresAnnuellesParEmployé = 40 × 52 = 2 080 heures

heuresAnnuellesTotales = nombreEmployés × 2 080

inefficacitéActuelle = (inefficacitéPlanification / 10) × 0.15
  // 10/10 = 15% d'inefficacité maximum
  
heuresPerdues = heuresAnnuellesTotales × inefficacitéActuelle

tauxHoraireMoyen = coûtMainOeuvreAnnuel / heuresAnnuellesTotales

perteIneffcacité = heuresPerdues × tauxHoraireMoyen

améliorationPlanification = 0.25
  // Octogone améliore la planification de 25%
  
économiePlanification = perteIneffcacité × améliorationPlanification
```

**Exemple :**
- 50 employés × 2 080 h = 104 000 heures/an
- Inefficacité : 7/10 → 10.5% d'inefficacité
- Heures perdues : 104 000 × 0.105 = 10 920 heures
- Taux horaire : 1 500 000 $ / 104 000 = 14.42 $/h
- Perte : 10 920 × 14.42 = 157 502 $
- Économie : 157 502 $ × 0.25 = **39 376 $**

#### C. Amélioration de la précision d'inventaire
```
fréquenceInventaire = 12
  // 12 fois par an (mensuel)
  
heuresParInventaire = nombreÉtablissements × 4
  // 4 heures par établissement par inventaire
  
heuresInventaireAnnuelles = fréquenceInventaire × heuresParInventaire

erreurActuelle = (erreursInventaire / 10) × 0.08
  // 10/10 = 8% d'erreur maximum
  
perteErreurs = coûtAlimentsAnnuel × erreurActuelle

réductionErreurs = 0.60
  // Octogone réduit les erreurs de 60%
  
économieInventaire = perteErreurs × réductionErreurs

gainTemps = heuresInventaireAnnuelles × 0.50 × tauxHoraireMoyen
  // Gain de 50% de temps sur les inventaires
  
économieTotaleInventaire = économieInventaire + gainTemps
```

**Exemple :**
- 3 établissements
- Heures inventaire/an : 12 × (3 × 4) = 144 heures
- Erreurs : 6/10 → 4.8% d'erreur
- Perte erreurs : 300 000 $ × 0.048 = 14 400 $
- Économie erreurs : 14 400 $ × 0.60 = 8 640 $
- Gain temps : 144 × 0.50 × 14.42 = 1 038 $
- **Total : 9 678 $**

#### D. Conformité et documentation
```
risqueNonConformité = (problèmesConformité / 10)

coûtMoyenAudit = 5000
  // Coût moyen d'un audit/inspection
  
fréquenceAudits = 2
  // 2 audits par an
  
coûtAuditsAnnuels = coûtMoyenAudit × fréquenceAudits

risqueAmendes = risqueNonConformité × 15000
  // Amende potentielle de 15 000 $ maximum
  
coûtConformitéActuel = coûtAuditsAnnuels + risqueAmendes

réductionRisque = 0.70
  // Octogone réduit le risque de 70%
  
économieConformité = (risqueAmendes × réductionRisque) + (coûtAuditsAnnuels × 0.30)
```

**Exemple :**
- Problèmes conformité : 5/10 → 50% de risque
- Coût audits : 5 000 $ × 2 = 10 000 $
- Risque amendes : 0.50 × 15 000 = 7 500 $
- Réduction risque : 7 500 $ × 0.70 = 5 250 $
- Réduction audits : 10 000 $ × 0.30 = 3 000 $
- **Total : 8 250 $**

#### E. Réduction du temps administratif
```
heuresAdminParSemaine = nombreÉtablissements × 10
  // 10 heures admin par établissement par semaine
  
heuresAdminAnnuelles = heuresAdminParSemaine × 52

inefficacitéAdmin = (tempsAdministratif / 10) × 0.40
  // 10/10 = 40% d'inefficacité maximum
  
heuresAdminPerdues = heuresAdminAnnuelles × inefficacitéAdmin

coûtAdminActuel = heuresAdminPerdues × tauxHoraireMoyen

gainEffcacité = 0.40
  // Octogone améliore l'efficacité de 40%
  
économieAdmin = coûtAdminActuel × gainEffcacité
```

**Exemple :**
- 3 établissements × 10 h/sem = 30 h/sem
- Heures admin/an : 30 × 52 = 1 560 heures
- Inefficacité : 8/10 → 32% d'inefficacité
- Heures perdues : 1 560 × 0.32 = 499 heures
- Coût actuel : 499 × 14.42 = 7 196 $
- **Économie : 7 196 $ × 0.40 = 2 878 $**

---

## 3. CALCULS FINAUX

### 3.1 Économies totales annuelles
```
économiesTotales = 
  économieGaspillage +
  économiePlanification +
  économieTotaleInventaire +
  économieConformité +
  économieAdmin
```

### 3.2 Coût d'Octogone 360
```
coûtParÉtablissement = 299
  // 299 $/mois par établissement
  
coûtMensuel = nombreÉtablissements × coûtParÉtablissement

coûtAnnuel = coûtMensuel × 12
```

### 3.3 ROI et bénéfices nets
```
bénéficeNet = économiesTotales - coûtAnnuel

ROI = ((bénéficeNet / coûtAnnuel) × 100)
  // ROI en pourcentage

retourSurInvestissement = économiesTotales / coûtAnnuel
  // Ratio de retour (ex: 5.2x)

périodeRetour = coûtAnnuel / (économiesTotales / 12)
  // Nombre de mois pour récupérer l'investissement
```

---

## 4. EXEMPLE COMPLET

### Données d'entrée :
- Établissements : 3
- Employés : 50
- Revenus annuels : 3 000 000 $
- Coût main-d'œuvre : 50% (1 500 000 $)
- Coût aliments : 30% (900 000 $)
- Gaspillage : 8/10
- Inefficacité planification : 7/10
- Erreurs inventaire : 6/10
- Problèmes conformité : 5/10
- Temps administratif : 8/10

### Calculs :
1. **Gaspillage** : 21 600 $
2. **Planification** : 39 376 $
3. **Inventaire** : 29 034 $
4. **Conformité** : 8 250 $
5. **Administratif** : 8 638 $

**Économies totales** : 106 898 $

**Coût Octogone** : 3 × 299 × 12 = 10 764 $

**Bénéfice net** : 106 898 - 10 764 = **96 134 $**

**ROI** : ((96 134 / 10 764) × 100) = **893%**

**Retour** : 106 898 / 10 764 = **9.9x**

**Période de retour** : 10 764 / (106 898 / 12) = **1.2 mois**

---

## 5. HYPOTHÈSES ET SOURCES

### Hypothèses de réduction (basées sur études de l'industrie) :
- **Gaspillage alimentaire** : Réduction de 30% (source : études sur systèmes de gestion d'inventaire)
- **Planification** : Amélioration de 25% (source : études sur optimisation des horaires)
- **Erreurs d'inventaire** : Réduction de 60% (source : systèmes automatisés vs manuels)
- **Conformité** : Réduction du risque de 70% (source : systèmes de traçabilité)
- **Temps administratif** : Gain de 40% (source : automatisation des processus)

### Constantes utilisées :
- Heures de travail annuelles : 2 080 heures (40h/sem × 52 sem)
- Fréquence d'inventaire : 12 fois/an (mensuel)
- Temps d'inventaire : 4 heures par établissement
- Coût moyen d'audit : 5 000 $
- Amende potentielle maximum : 15 000 $
- Heures admin par établissement : 10h/semaine

---

## 6. FORMULES POUR L'IMPLÉMENTATION

### TypeScript / JavaScript
```typescript
interface ROIInputs {
  establishments: number;
  employees: number;
  annualRevenue: number;
  laborCostPercent: number;
  foodCostPercent: number;
  foodWaste: number; // 0-10
  schedulingInefficiency: number; // 0-10
  inventoryErrors: number; // 0-10
  complianceIssues: number; // 0-10
  adminTime: number; // 0-10
}

interface ROIResults {
  totalSavings: number;
  octogoneCost: number;
  netBenefit: number;
  roi: number;
  paybackPeriod: number;
  returnMultiple: number;
  breakdown: {
    wasteReduction: number;
    schedulingOptimization: number;
    inventoryAccuracy: number;
    complianceImprovement: number;
    adminReduction: number;
  };
}

function calculateROI(inputs: ROIInputs): ROIResults {
  // Coûts de base
  const laborCost = inputs.annualRevenue * (inputs.laborCostPercent / 100);
  const foodCost = inputs.annualRevenue * (inputs.foodCostPercent / 100);
  
  // Taux horaire moyen
  const totalAnnualHours = inputs.employees * 2080;
  const avgHourlyRate = laborCost / totalAnnualHours;
  
  // 1. Gaspillage alimentaire
  const wasteRate = (inputs.foodWaste / 10) * 0.10;
  const wasteLoss = foodCost * wasteRate;
  const wasteReduction = wasteLoss * 0.30;
  
  // 2. Planification
  const inefficiency = (inputs.schedulingInefficiency / 10) * 0.15;
  const lostHours = totalAnnualHours * inefficiency;
  const inefficiencyLoss = lostHours * avgHourlyRate;
  const schedulingOptimization = inefficiencyLoss * 0.25;
  
  // 3. Inventaire
  const inventoryHours = 12 * inputs.establishments * 4;
  const errorRate = (inputs.inventoryErrors / 10) * 0.08;
  const errorLoss = foodCost * errorRate;
  const errorReduction = errorLoss * 0.60;
  const timeSavings = inventoryHours * 0.50 * avgHourlyRate;
  const inventoryAccuracy = errorReduction + timeSavings;
  
  // 4. Conformité
  const auditCosts = 5000 * 2;
  const fineRisk = (inputs.complianceIssues / 10) * 15000;
  const riskReduction = fineRisk * 0.70;
  const auditReduction = auditCosts * 0.30;
  const complianceImprovement = riskReduction + auditReduction;
  
  // 5. Administratif
  const adminHoursWeekly = inputs.establishments * 10;
  const adminHoursAnnual = adminHoursWeekly * 52;
  const adminInefficiency = (inputs.adminTime / 10) * 0.40;
  const adminLostHours = adminHoursAnnual * adminInefficiency;
  const adminCost = adminLostHours * avgHourlyRate;
  const adminReduction = adminCost * 0.40;
  
  // Totaux
  const totalSavings = 
    wasteReduction +
    schedulingOptimization +
    inventoryAccuracy +
    complianceImprovement +
    adminReduction;
  
  const octogoneCost = inputs.establishments * 299 * 12;
  const netBenefit = totalSavings - octogoneCost;
  const roi = (netBenefit / octogoneCost) * 100;
  const returnMultiple = totalSavings / octogoneCost;
  const paybackPeriod = octogoneCost / (totalSavings / 12);
  
  return {
    totalSavings,
    octogoneCost,
    netBenefit,
    roi,
    paybackPeriod,
    returnMultiple,
    breakdown: {
      wasteReduction,
      schedulingOptimization,
      inventoryAccuracy,
      complianceImprovement,
      adminReduction
    }
  };
}
```

---

## 7. VALIDATION ET AJUSTEMENTS

### Validation des résultats :
- ROI typique attendu : 500% - 1500%
- Période de retour typique : 1-3 mois
- Si ROI < 200% : Vérifier les inputs
- Si ROI > 2000% : Valeurs probablement trop optimistes

### Ajustements possibles :
- Adapter les pourcentages de réduction selon l'industrie
- Ajuster les coûts moyens selon la région
- Modifier les constantes selon le type d'établissement

---

**Document créé le : 22 octobre 2025**
**Version : 1.0**
