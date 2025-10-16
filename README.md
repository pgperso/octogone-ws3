# 🍽️ Octogone Website

Site web officiel d'Octogone - Plateforme SaaS de gestion pour l'industrie de la restauration.

## 🎯 À propos

Octogone est une plateforme complète de gestion restaurant qui automatise l'inventaire, calcule le food cost en temps réel, et utilise l'IA Cortex pour optimiser les opérations et la rentabilité.

**Opérer. Analyser. Prédire.**

---

## 🚀 Démarrage Rapide

### **Prérequis**
- Node.js 18+
- npm ou yarn

### **Installation**

```bash
# Cloner le repository
git clone [repository-url]

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

### **Variables d'environnement**

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=votre_portal_id
NEXT_PUBLIC_SITE_URL=https://octogone.ca
```

---

## 📚 Documentation

Toute la documentation est disponible dans le dossier `/docs/` :

### **Guides Principaux**
- 📖 [**README.md**](./docs/README.md) - Index de la documentation
- 🏗️ [**STRUCTURE-GUIDE.md**](./docs/STRUCTURE-GUIDE.md) - Organisation du projet
- 🎯 [**SEO-AI-STRATEGY.md**](./docs/SEO-AI-STRATEGY.md) - Stratégie SEO & AI
- 📦 [**IMPORTS-CHEATSHEET.md**](./docs/IMPORTS-CHEATSHEET.md) - Guide des imports
- 🏛️ [**ARCHITECTURE.md**](./docs/ARCHITECTURE.md) - Architecture du projet

### **Guides Techniques**
- 📊 [**HUBSPOT_IMPLEMENTATION.md**](./HUBSPOT_IMPLEMENTATION.md) - Intégration HubSpot

---

## 🏗️ Architecture

### **Stack Technique**
- **Framework** : Next.js 15.5.4 (App Router)
- **Language** : TypeScript
- **Runtime** : React 19
- **Styling** : Tailwind CSS 4.1.3
- **Animations** : Framer Motion (optimisé)
- **Analytics** : HubSpot
- **SEO** : Schema.org, JSON-LD, Microdata

### **Structure du Projet**

```
octogoneWebsite/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   ├── components/             # Composants React
│   ├── data/                   # Données (JSON, TypeScript)
│   ├── lib/                    # Utilitaires et générateurs
│   ├── features/               # Features du site
│   └── contexts/               # Contextes React
│
├── docs/                       # Documentation complète
└── public/                     # Assets publics
```

---

## ✨ Fonctionnalités Principales

### **🌐 Multilingue (FR/EN)**
- Routing automatique par locale
- Contenu bilingue complet
- SEO optimisé par langue

### **📊 Calculateur ROI**
- Calcul en temps réel
- Modules personnalisables
- Tracking HubSpot intégré

### **🎯 Pages Secteurs Dynamiques**
- 15 secteurs (6 types d'entreprises + 9 styles de restaurants)
- Contenu personnalisé par secteur
- Métriques et modules adaptés

### **💬 Témoignages Clients**
- Pages de détail dynamiques
- Schemas SEO automatiques
- Optimisation AI crawlers

### **🔍 SEO & AI Optimization**
- Schema.org (Organization, Product, Review, FAQ)
- JSON-LD automatique
- Microdata (itemProp)
- Optimisé pour ChatGPT, Perplexity, Claude

---

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev              # Lancer le serveur de développement (Turbopack)

# Production
npm run build            # Build de production
npm run analyze          # Analyser la taille du bundle
npm run start            # Lancer le serveur de production

# Qualité du code
npm run lint             # Linter ESLint
npm run test             # Tests Jest
npm run test:coverage    # Tests avec couverture
```

---

## 📋 Workflows Courants

### **Ajouter un nouveau témoignage**
1. Ouvrir `/src/data/testimonials/clients-real.json`
2. Ajouter le témoignage au format JSON
3. Le système génère automatiquement la page, les schemas SEO, et les métadonnées

**Voir** : [STRUCTURE-GUIDE.md - Workflow](./docs/STRUCTURE-GUIDE.md#-workflow--ajouter-un-nouveau-témoignage)

### **Modifier les schemas SEO globaux**
1. Ouvrir `/src/components/seo/global-schema.tsx`
2. Modifier les schemas (Organization, FAQ, Product)
3. Tester avec Google Rich Results Test

**Voir** : [SEO-AI-STRATEGY.md](./docs/SEO-AI-STRATEGY.md)

### **Ajouter un nouveau secteur**
1. Utiliser le prompt Claude dans `/docs/prompts/`
2. Ajouter le contenu dans `/src/data/sector-content.ts`
3. La page se génère automatiquement

---

## 🎨 Design System

### **Couleurs (CSS Variables)**
- `--primary` : Couleur principale
- `--secondary` : Couleur secondaire
- `--background` : Fond de page
- `--surface` : Fond de cartes
- `--on-primary`, `--on-secondary`, etc. : Couleurs de texte

### **Composants Réutilisables**
- `ResponsiveSection` : Sections avec espacements responsifs
- `OctogoneButton` : Boutons stylisés
- `FloatingROIWidget` : Widget calculateur ROI
- `Navigation` : Menu principal
- `Footer` : Pied de page

---

## 📊 Analytics & Tracking

### **HubSpot**
- Tracking automatique des pages vues
- Événements personnalisés (ROI, CTA, formulaires)
- Scroll depth et temps sur page
- Identification des visiteurs

**Voir** : [HUBSPOT_IMPLEMENTATION.md](./HUBSPOT_IMPLEMENTATION.md)

---

## 🔐 Conformité

- ✅ **RGPD** : Tracking anonyme par défaut
- ✅ **Accessibilité** : Balises sémantiques HTML5
- ✅ **Performance** : Core Web Vitals optimisés
- ✅ **SEO** : Schema.org, Open Graph, Twitter Cards

---

## 🤝 Contribution

### **Conventions de Code**
- TypeScript strict
- ESLint + Prettier
- Commits conventionnels
- Documentation inline

### **Workflow Git**
1. Créer une branche feature
2. Développer et tester
3. Pull request avec description
4. Review et merge

---

## 📞 Support

Pour toute question :
- 📚 Consulter la [documentation](./docs/)
- 🐛 Ouvrir une issue
- 📧 Contacter l'équipe Octogone

---

## 📝 Changelog

### **v2.1 - 2025-10-15**
- ✅ Optimisations performance majeures
- ✅ Bundle analyzer intégré
- ✅ Hook useReducedMotion pour accessibilité
- ✅ Images non utilisées supprimées (-2.9MB)
- ✅ Next.js 15 + React 19
- ✅ Framer Motion tree-shaking optimisé

### **v2.0 - 2025-10-14**
- ✅ Réorganisation complète de la structure
- ✅ Documentation exhaustive
- ✅ Générateurs SEO centralisés
- ✅ Optimisation AI crawlers
- ✅ Fichiers index.ts pour imports simplifiés

### **v1.0 - 2025-10-13**
- ✅ Structure initiale
- ✅ Pages secteurs dynamiques
- ✅ Calculateur ROI
- ✅ Témoignages en JSON

---

## 📄 Licence

© 2025 Octogone. Tous droits réservés.

---

**Construit avec ❤️ par l'équipe Octogone**
