# 🏗️ Architecture du Projet Octogone

Vue d'ensemble de l'architecture et du flux de données.

---

## 📊 Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                        UTILISATEUR                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /[locale]/                                          │  │
│  │  ├── layout.tsx (Navigation + Footer + SEO)         │  │
│  │  ├── page.tsx (Page d'accueil)                      │  │
│  │  └── temoignages/[testimonialId]/page.tsx           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  COMPOSANTS │  │   DONNÉES   │  │     SEO     │
│     UI      │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 🔄 Flux de Données - Témoignages

```
┌──────────────────────────────────────────────────────────────┐
│  1. DONNÉES SOURCE (JSON)                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  /src/data/testimonials/                               │ │
│  │  ├── clients-real.json    (Témoignages réels)         │ │
│  │  └── clients-demo.json    (Témoignages fictifs)       │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│  2. AGRÉGATION (TypeScript)                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  /src/data/testimonials-data.ts                        │ │
│  │  - Combine clients-real + clients-demo                 │ │
│  │  - Exporte testimonials[]                              │ │
│  │  - Définit type Testimonial                            │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────┐
│  3a. AFFICHAGE  │ │  3b. SEO    │ │  3c. PAGES  │
│                 │ │             │ │             │
│  - Carousel     │ │  - Schemas  │ │  - Détails  │
│  - Cards        │ │  - Reviews  │ │  - Routes   │
│  - Grids        │ │  - Rating   │ │  - Dynamic  │
└─────────────────┘ └─────────────┘ └─────────────┘
```

---

## 🎯 Architecture SEO

```
┌──────────────────────────────────────────────────────────────┐
│  GÉNÉRATEUR SEO CENTRALISÉ                                   │
│  /src/lib/seo/schema-generator.ts                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Fonctions:                                            │ │
│  │  • generateReviewSchema()                              │ │
│  │  • generateTestimonialBreadcrumb()                     │ │
│  │  • generateProductSchema()                             │ │
│  │  • generateOrganizationWithTestimonials()              │ │
│  │  • generateAggregateRating()                           │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────┐
│  GLOBAL SCHEMA  │ │  PAGE SEO   │ │  MICRODATA  │
│                 │ │             │ │             │
│  global-schema  │ │  useEffect  │ │  itemProp   │
│  .tsx           │ │  injection  │ │  itemScope  │
│                 │ │             │ │             │
│  • Organization │ │  • Review   │ │  • article  │
│  • FAQPage      │ │  • Breadcr. │ │  • author   │
│  • Product      │ │  • Meta     │ │  • rating   │
└─────────────────┘ └─────────────┘ └─────────────┘
```

---

## 📁 Structure des Dossiers

```
octogoneWebsite/
│
├── docs/                           📚 Documentation
│   ├── README.md                   ├─ Index principal
│   ├── STRUCTURE-GUIDE.md          ├─ Guide de structure
│   ├── SEO-AI-STRATEGY.md          ├─ Stratégie SEO
│   ├── IMPORTS-CHEATSHEET.md       ├─ Guide des imports
│   └── ARCHITECTURE.md             └─ Ce fichier
│
├── src/
│   │
│   ├── app/                        🌐 Pages Next.js
│   │   └── [locale]/
│   │       ├── layout.tsx          ├─ Layout principal
│   │       ├── page.tsx            ├─ Page d'accueil
│   │       └── temoignages/
│   │           └── [testimonialId]/
│   │               └── page.tsx    └─ Page détail témoignage
│   │
│   ├── components/                 🧩 Composants React
│   │   ├── seo/                    ├─ Composants SEO
│   │   │   ├── index.ts            │  ├─ Export centralisé
│   │   │   ├── global-schema.tsx   │  ├─ Schemas globaux
│   │   │   └── dynamic-seo.tsx     │  └─ SEO dynamique
│   │   │
│   │   ├── ui/                     ├─ Composants UI
│   │   │   ├── footer.tsx          │  ├─ Footer
│   │   │   ├── responsive-section  │  ├─ Sections
│   │   │   └── ...                 │  └─ Autres
│   │   │
│   │   └── analytics/              └─ Analytics
│   │       └── analytics-provider
│   │
│   ├── data/                       📊 Données
│   │   ├── testimonials/           ├─ Témoignages
│   │   │   ├── index.ts            │  ├─ Export centralisé
│   │   │   ├── clients-real.json   │  ├─ Clients réels
│   │   │   └── clients-demo.json   │  └─ Clients démo
│   │   │
│   │   ├── testimonials-data.ts    ├─ Agrégation témoignages
│   │   ├── sectors-data.ts         ├─ Données secteurs
│   │   └── features-data.ts        └─ Données fonctionnalités
│   │
│   ├── lib/                        🔧 Utilitaires
│   │   ├── seo/                    ├─ Générateurs SEO
│   │   │   ├── index.ts            │  ├─ Export centralisé
│   │   │   └── schema-generator.ts │  └─ Générateur schemas
│   │   │
│   │   └── utils.ts                └─ Utilitaires divers
│   │
│   ├── features/                   🎨 Features
│   │   ├── navigation/             ├─ Navigation
│   │   ├── home/                   ├─ Page d'accueil
│   │   └── ...                     └─ Autres features
│   │
│   ├── contexts/                   🔄 Contextes React
│   │   └── calculator-context.tsx
│   │
│   └── config/                     ⚙️ Configuration
│       └── routes.ts
│
└── public/                         🖼️ Assets publics
    └── images/
        └── testimonials/
```

---

## 🔄 Cycle de Vie - Ajout d'un Témoignage

```
┌─────────────────────────────────────────────────────────────┐
│  1. DÉVELOPPEUR                                             │
│  Ajoute un témoignage dans clients-real.json               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  2. AGRÉGATION AUTOMATIQUE                                  │
│  testimonials-data.ts combine les données                   │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  3a. PAGE   │  │  3b. SEO    │  │  3c. RATING │
│  GÉNÉRÉE    │  │  GÉNÉRÉ     │  │  RECALCULÉ  │
│             │  │             │  │             │
│  /fr/       │  │  • Review   │  │  Aggregate  │
│  temoignages│  │  • Breadcr. │  │  Rating mis │
│  /nouveau   │  │  • Meta     │  │  à jour     │
└─────────────┘  └─────────────┘  └─────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  4. INDEXATION                                              │
│  • Google indexe la nouvelle page                           │
│  • AI crawlers (ChatGPT, Perplexity) découvrent le contenu │
│  • Rich snippets générés automatiquement                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Flux SEO Détaillé

```
┌──────────────────────────────────────────────────────────────┐
│  PAGE CHARGÉE                                                │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  useEffect() s'exécute                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  1. Récupère le témoignage depuis testimonials[]      │ │
│  │  2. Génère Review Schema                              │ │
│  │  3. Génère Breadcrumb Schema                          │ │
│  │  4. Combine les schemas                               │ │
│  │  5. Injecte dans <head>                               │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  <head> contient:                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  • <title>Témoignage [Nom] - [Entreprise]</title>    │ │
│  │  • <meta name="description" content="[Citation]">     │ │
│  │  • <meta property="og:title" content="...">           │ │
│  │  • <meta property="og:description" content="...">     │ │
│  │  • <meta property="og:image" content="...">           │ │
│  │  • <script type="application/ld+json">                │ │
│  │      [Review Schema, Breadcrumb Schema]               │ │
│  │    </script>                                           │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│  CRAWLERS INDEXENT                                           │
│  • Google Bot → Rich Snippets                                │
│  • ChatGPT → Contexte pour réponses                          │
│  • Perplexity → Citations avec source                        │
│  • Claude → Compréhension du contenu                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧩 Composants Réutilisables

```
ResponsiveSection
├─ Gère les espacements responsifs
├─ Applique var(--background) par défaut
└─ Utilisé partout dans le site

SimpleSchema (global-schema.tsx)
├─ Injecté dans layout.tsx
├─ Génère Organization, FAQ, Product schemas
└─ Utilise schema-generator.ts

FloatingROIWidget
├─ Widget de calcul ROI
├─ Flottant en bas à droite
└─ Ouvre le calculateur

Navigation
├─ Menu principal
├─ Gestion locale (FR/EN)
└─ Routes dynamiques

Footer
├─ Pied de page
├─ Liens utiles
└─ Informations contact
```

---

## 📊 Diagramme de Dépendances

```
testimonials-data.ts
    ↓
    ├─→ clients-real.json
    ├─→ clients-demo.json
    │
    ↓
    ├─→ schema-generator.ts
    │       ↓
    │       ├─→ global-schema.tsx (Page d'accueil)
    │       └─→ page.tsx (Pages de détail)
    │
    └─→ Composants UI
            ├─→ TestimonialCard
            ├─→ TestimonialCarousel
            └─→ TestimonialGrid
```

---

## 🎯 Points d'Extension Futurs

```
/src/lib/seo/
├── schema-generator.ts         ✅ Existant
├── faq-generator.ts            🔮 Futur
├── breadcrumb-generator.ts     🔮 Futur
└── sitemap-generator.ts        🔮 Futur

/src/components/seo/
├── global-schema.tsx           ✅ Existant
├── dynamic-seo.tsx             ✅ Existant (à implémenter)
├── page-metadata.tsx           🔮 Futur
└── structured-data.tsx         🔮 Futur

/src/data/
├── testimonials/               ✅ Existant
├── case-studies/               🔮 Futur
├── blog-posts/                 🔮 Futur
└── press-releases/             🔮 Futur
```

---

## 📚 Ressources

- [STRUCTURE-GUIDE.md](./STRUCTURE-GUIDE.md) : Guide détaillé
- [SEO-AI-STRATEGY.md](./SEO-AI-STRATEGY.md) : Stratégie SEO
- [IMPORTS-CHEATSHEET.md](./IMPORTS-CHEATSHEET.md) : Guide des imports

---

**Dernière mise à jour** : 2025-10-14  
**Version** : 2.0  
**Maintenu par** : Équipe Octogone
