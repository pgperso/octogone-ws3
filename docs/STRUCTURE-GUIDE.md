# 📁 Guide de Structure du Projet Octogone

## 🎯 Vue d'ensemble

Ce guide explique l'organisation des fichiers et dossiers du projet pour faciliter la navigation, la maintenance et l'évolution du code.

---

## 📂 Structure des Données

```
/src/data/
├── testimonials/
│   ├── index.ts            ← Export centralisé
│   ├── clients-real.json   ← Témoignages réels (avec pages de détail)
│   └── clients-demo.json   ← Témoignages fictifs (pour démonstration)
│
├── sectors/
│   ├── index.ts            ← Export centralisé
│   ├── kpis.json           ← KPIs par secteur
│   └── modules.json        ← Modules par secteur
│
└── calculator/
    ├── index.ts            ← Export centralisé
    ├── modules.json        ← Modules ROI et gains
    ├── pricing.json        ← Tranches de prix
    ├── location-ranges.json ← Multiplicateurs efficacité
    └── calculation-config.json ← Paramètres calculs
```

#### **Utilisation**

```typescript
// Témoignages - Import direct
import clientsReal from '@/data/testimonials/clients-real.json';

// Ou via l'index (recommandé)
import { clientsReal, clientsDemo } from '@/data/testimonials';

// Via le fichier principal
import { testimonials } from '@/data/testimonials-data';

// Secteurs - Via l'index (recommandé)
import { sectorKpis, sectorModules } from '@/data/sectors';

// Calculateur ROI - Via l'index (recommandé)
import { calculatorModules, pricingTiers } from '@/data/calculator';
```

#### **Quand modifier ?**

- **`clients-real.json`** : Ajouter un nouveau témoignage client réel
- **`clients-demo.json`** : Ajouter un témoignage fictif pour démonstration

---

## 🔧 Générateurs SEO

### `/src/lib/seo/`

Contient les générateurs de schemas SEO (Schema.org, JSON-LD).

```
/src/lib/seo/
├── index.ts                 ← Export centralisé
└── schema-generator.ts      ← Générateur de schemas pour témoignages
```

#### **Fonctions disponibles**

| Fonction | Description | Utilisation |
|----------|-------------|-------------|
| `generateReviewSchema()` | Génère un schema Review individuel | Pages de détail témoignages |
| `generateTestimonialBreadcrumb()` | Génère le breadcrumb pour navigation | Pages de détail témoignages |
| `generateProductSchema()` | Génère le schema Product avec reviews | Page d'accueil |
| `generateOrganizationWithTestimonials()` | Génère le schema Organization | Page d'accueil (AI crawlers) |
| `generateAggregateRating()` | Calcule la note moyenne | Automatique |
| `generateAllReviewsSchema()` | Génère tous les reviews | Page d'accueil |

#### **Utilisation**

```typescript
// Import via l'index (recommandé)
import { generateReviewSchema, generateTestimonialBreadcrumb } from '@/lib/seo';

// Ou import direct
import { generateReviewSchema } from '@/lib/seo/schema-generator';
```

#### **Quand modifier ?**

- Ajouter un nouveau type de schema (FAQ, Article, etc.)
- Modifier la structure des schemas existants
- Ajouter des champs supplémentaires

---

## 🎨 Composants SEO

### `/src/components/seo/`

Contient les composants React pour injecter le SEO dans les pages.

```
/src/components/seo/
├── index.ts                 ← Export centralisé
├── global-schema.tsx        ← Schemas globaux (Organization, FAQ, Product)
└── dynamic-seo.tsx          ← SEO dynamique (futur)
```

#### **Composants disponibles**

| Composant | Description | Utilisation |
|-----------|-------------|-------------|
| `SimpleSchema` | Schemas globaux du site | Layout principal |
| `DynamicSEO` | SEO dynamique par page | Futur (en développement) |

#### **Utilisation**

```typescript
// Import via l'index (recommandé)
import { SimpleSchema } from '@/components/seo';

// Ou import direct
import { SimpleSchema } from '@/components/seo/global-schema';

// Dans le layout
<SimpleSchema locale={locale} />
```

#### **Quand modifier ?**

- **`global-schema.tsx`** : Modifier les schemas globaux (FAQ, Organization)
- **`dynamic-seo.tsx`** : Implémenter le SEO dynamique par page

---

## 📄 Pages de Témoignages

### `/src/app/[locale]/temoignages/[testimonialId]/page.tsx`

Page de détail pour chaque témoignage.

#### **Fonctionnalités**

- ✅ Génération automatique de schemas SEO
- ✅ Métadonnées dynamiques (title, description, Open Graph)
- ✅ Breadcrumbs pour navigation
- ✅ Microdata (itemProp) pour double validation
- ✅ Affichage du contenu (histoire, résultats, image)

#### **Quand modifier ?**

- Changer le design de la page
- Ajouter de nouvelles sections
- Modifier les métadonnées

---

## 🗂️ Fichiers Index

Les fichiers `index.ts` facilitent les imports en centralisant les exports.

### **Avantages**

✅ **Imports plus courts**
```typescript
// Avant
import { generateReviewSchema } from '@/lib/seo/schema-generator';

// Après
import { generateReviewSchema } from '@/lib/seo';
```

✅ **Évolutivité**
- Ajouter de nouveaux fichiers sans changer les imports
- Renommer des fichiers facilement

✅ **Découvrabilité**
- Voir tous les exports disponibles en un coup d'œil

---

## 🚀 Workflow : Ajouter un nouveau témoignage

### **Témoignage réel (avec page de détail)**

1. **Ouvrir** `/src/data/testimonials/clients-real.json`

2. **Ajouter** le nouveau témoignage :
```json
{
  "id": "nouveau-client",
  "nameFr": "Jean Dupont",
  "nameEn": "Jean Dupont",
  "businessFr": "Restaurant Le Gourmet",
  "businessEn": "Restaurant Le Gourmet",
  "quoteFr": "Citation courte...",
  "quoteEn": "Short quote...",
  "fullStoryFr": "Histoire complète...",
  "fullStoryEn": "Full story...",
  "rating": 5,
  "image": "/images/testimonials/gourmet.jpg",
  "sectors": ["gastronomic"],
  "isReal": true,
  "resultsFr": ["Résultat 1", "Résultat 2"],
  "resultsEn": ["Result 1", "Result 2"]
}
```

3. **C'est tout !** Le système génère automatiquement :
   - ✅ Page de détail : `/fr/temoignages/nouveau-client`
   - ✅ Schemas SEO (Review, Breadcrumb)
   - ✅ Métadonnées (title, description, Open Graph)
   - ✅ AggregateRating mis à jour

### **Témoignage fictif (pour démonstration)**

1. **Ouvrir** `/src/data/testimonials/clients-demo.json`
2. **Ajouter** avec `"isReal": false`
3. Pas de page de détail générée

---

## 📊 Arborescence Complète

```
octogoneWebsite/
├── docs/
│   ├── README.md                   ← Index documentation
│   ├── STRUCTURE-GUIDE.md          ← Ce fichier
│   ├── SEO-AI-STRATEGY.md          ← Stratégie SEO & AI
│   ├── IMPORTS-CHEATSHEET.md       ← Guide imports
│   ├── ARCHITECTURE.md             ← Architecture
│   │
│   ├── prompts/                    ← Prompts Claude
│   │   ├── README.md
│   │   ├── claude-prompt-final.md
│   │   └── exemples-generation.md
│   │
│   └── templates/                  ← Templates de référence
│       ├── README.md
│       └── content-structure.json
│
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx          ← Utilise SimpleSchema
│   │       └── temoignages/
│   │           └── [testimonialId]/
│   │               └── page.tsx    ← Page de détail témoignage
│   │
│   ├── components/
│   │   └── seo/
│   │       ├── index.ts            ← Export centralisé
│   │       ├── global-schema.tsx   ← Schemas globaux
│   │       └── dynamic-seo.tsx     ← SEO dynamique (futur)
│   │
│   ├── data/
│   │   ├── testimonials/
│   │   │   ├── index.ts            ← Export centralisé
│   │   │   ├── clients-real.json   ← Témoignages réels
│   │   │   └── clients-demo.json   ← Témoignages fictifs
│   │   │
│   │   ├── sectors/
│   │   │   ├── index.ts            ← Export centralisé
│   │   │   ├── kpis.json           ← KPIs par secteur
│   │   │   └── modules.json        ← Modules par secteur
│   │   │
│   │   ├── testimonials-data.ts    ← Agrégation témoignages
│   │   └── sectors-data.ts         ← Données secteurs
│   │
│   └── lib/
│       └── seo/
│           ├── index.ts            ← Export centralisé
│           └── schema-generator.ts ← Générateur de schemas
```

---

## 🎯 Conventions de Nommage

### **Fichiers de données**
- `clients-*.json` : Données des témoignages clients
- `sectors-data.ts` : Données des secteurs
- `features-data.ts` : Données des fonctionnalités

### **Générateurs**
- `*-generator.ts` : Générateurs de schemas/données
- `schema-generator.ts` : Générateur de schemas SEO

### **Composants SEO**
- `global-schema.tsx` : Schemas globaux du site
- `dynamic-seo.tsx` : SEO dynamique par page
- `*-metadata.tsx` : Composants de métadonnées

### **Fichiers Index**
- `index.ts` : Export centralisé dans chaque dossier

---

## 🔮 Évolutions Futures

### **Court terme**
- [ ] `faq-generator.ts` : Générateur de FAQ dynamiques
- [ ] `breadcrumb-generator.ts` : Générateur de breadcrumbs
- [ ] `page-metadata.tsx` : Composant de métadonnées par page

### **Moyen terme**
- [ ] `structured-data.tsx` : Composant de données structurées
- [ ] `ai-training.json` : Données pour AI crawlers
- [ ] `sitemap-generator.ts` : Générateur de sitemap XML

### **Long terme**
- [ ] `knowledge-graph.ts` : Graphe de connaissances
- [ ] `semantic-search.ts` : Recherche sémantique
- [ ] `voice-search.ts` : Optimisation recherche vocale

---

## 📚 Ressources

- [SEO-AI-STRATEGY.md](./SEO-AI-STRATEGY.md) : Stratégie SEO complète
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)

---

## ✅ Checklist de Maintenance

### **Mensuel**
- [ ] Vérifier les schemas avec Google Rich Results Test
- [ ] Valider les données JSON (pas d'erreurs)
- [ ] Tester les pages de témoignages

### **Trimestriel**
- [ ] Ajouter de nouveaux témoignages réels
- [ ] Mettre à jour les FAQ si nécessaire
- [ ] Vérifier les performances SEO

### **Annuel**
- [ ] Réviser la stratégie SEO
- [ ] Mettre à jour les schemas selon les nouveaux standards
- [ ] Analyser l'impact AI SEO

---

**Dernière mise à jour** : 2025-10-14
**Maintenu par** : Équipe Octogone
