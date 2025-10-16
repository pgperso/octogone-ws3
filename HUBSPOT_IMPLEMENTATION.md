# 📊 Analytics - Guide d'Implémentation

Ce guide détaille l'implémentation du tracking HubSpot + Google Analytics 4 sur le site Octogone.

### 1. Fichiers créés
- `.env.local.example` - Template des variables d'environnement
- `src/lib/analytics/hubspot.ts` - Module de tracking HubSpot
- `src/components/analytics/analytics-provider.tsx` - Provider React pour le tracking automatique

### 2. Variables d'environnement à configurer
Créer un fichier `.env.local`## 🔧 Configuration

### Variables d'environnement requises
# HubSpot
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=votre_portal_id_hubspot

# Google Analytics 4
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

##  Données Trackées

### Automatiques (HubSpot + GA4)
-   **Pages vues** - Chaque changement de page
-   **Scroll depth** - 25%, 50%, 75%, 100%
-   **Temps sur la page** - En secondes (minimum 5s)

### Événements Personnalisés (HubSpot + GA4)
-   **Calculateur ROI** - Interactions utilisateur
-   **Téléchargements** - Fichiers PDF, images
-   **Liens externes** - Clics sortants
-   **Formulaires** - Soumissions
-   **Blog** - Lectures d'articles, partages, recherchesibles

#### 1. Calculateur ROI
```typescript
import { trackROICalculator, trackModuleSelection, trackROIModalOpen } from '@/lib/analytics/hubspot';
// Utilisation du calculateur
trackROICalculator({
  locations: 3,
  modules: ['inventory', 'foodcost'],
  monthlyCost: 477,
  yearlySavings: 127104,
  roi: 2565,
  paybackMonths: 1
});

// Sélection d'un module
trackModuleSelection('Inventaire', true);

// Ouverture du modal
trackROIModalOpen('floating-widget');
```

#### 2. Formulaire de contact
```typescript
import { trackContactFormSubmission, identifyVisitor } from '@/lib/analytics/hubspot';

trackContactFormSubmission({
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean@example.com',
  company: 'Restaurant XYZ',
  subject: 'demo',
  hasROIData: true
});
```

#### 3. Navigation et CTA
```typescript
import { trackCTAClick, trackSectorView, trackLanguageChange } from '@/lib/analytics/hubspot';

// Clic sur un CTA
trackCTAClick('Voir la plateforme en action', 'hero-section', '/demo');

// Visite d'une page secteur
trackSectorView('chains-groups', 'Chaînes et groupes de restaurants');

// Changement de langue
trackLanguageChange('fr', 'en');
```

## 🔧 Intégration dans le code existant

### Étape 1: Ajouter le provider dans le layout

Dans `src/app/[locale]/layout.tsx`, envelopper le contenu avec `AnalyticsProvider` :

```tsx
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";

export default function LocaleLayout({ children, params }) {
  return (
    <AnalyticsProvider>
      {/* Votre contenu existant */}
      <MainNav />
      <main>{children}</main>
      <Footer />
      <FloatingROIWidget />
    </AnalyticsProvider>
  );
}
```

### Étape 2: Tracker les événements du calculateur ROI

Dans `src/features/roi-calculator/components/roi-calculator-advanced.tsx` :

```tsx
import { trackROICalculator, trackModuleSelection } from '@/lib/analytics/hubspot';

// Dans la fonction toggleModule
const toggleModule = (moduleId: string) => {
  // ... logique existante ...
  
  // Tracker la sélection
  const module = AVAILABLE_MODULES.find(m => m.id === moduleId);
  if (module) {
    const isNowSelected = !selectedModules.includes(moduleId);
    trackModuleSelection(
      locale === 'fr' ? module.nameFr : module.nameEn,
      isNowSelected
    );
  }
};

// Quand les résultats changent
useEffect(() => {
  if (selectedModules.length > 0) {
    trackROICalculator({
      locations: numberOfLocations,
      modules: selectedModules,
      monthlyCost: roiResult.monthlySubscriptionCost,
      yearlySavings: roiResult.netYearlySavings,
      roi: roiResult.roiPercentage,
      paybackMonths: roiResult.paybackPeriodMonths
    });
  }
}, [roiResult, selectedModules, numberOfLocations]);
```

### Étape 3: Tracker le formulaire de contact

Dans `src/app/[locale]/contact/page.tsx` :

```tsx
import { trackContactFormSubmission } from '@/lib/analytics/hubspot';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Tracker la soumission
    trackContactFormSubmission({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      company: formData.company,
      subject: formData.subject,
      hasROIData: !!searchParams?.get('message')
    });
    
    // ... reste du code existant ...
  } catch (error) {
    // ...
  }
};
```

### Étape 4: Tracker les CTA

Dans les composants avec des boutons CTA :

```tsx
import { trackCTAClick } from '@/lib/analytics/hubspot';

<OctogoneButton
  href={`/${locale}/demo`}
  onClick={() => trackCTAClick('Voir la plateforme en action', 'hero-section', `/${locale}/demo`)}
>
  Voir la plateforme en action
</OctogoneButton>
```

## 📈 Données trackées automatiquement

### Informations visiteur
- 🌐 URL de la page
- 📱 Type d'appareil (mobile/desktop/tablet)
- 🖥️ Navigateur et OS
- 🌍 Localisation géographique (via HubSpot)
- 🔗 Source de trafic (référent)
- 🗣️ Langue préférée (FR/EN)

### Comportement
- ⏱️ Durée de session par page
- 📜 Profondeur de scroll (25%, 50%, 75%, 100%)
- 🖱️ Clics sur les CTA
- 📊 Utilisation du calculateur ROI
- 📝 Soumissions de formulaires
- 🔄 Navigation entre les pages

### Données business
- 💰 Résultats du calculateur ROI
- 📦 Modules sélectionnés
- 🏢 Nombre d'établissements
- 🎯 Secteurs d'intérêt
- 📧 Informations de contact

## 🔒 Conformité RGPD

Le tracking HubSpot respecte les normes RGPD :
- ✅ Pas de tracking avant consentement (si banner de cookies implémenté)
- ✅ Données anonymisées par défaut
- ✅ Identification uniquement après soumission de formulaire
- ✅ Logs en développement uniquement

## 🚀 Déploiement

1. Obtenir votre Portal ID HubSpot
2. Ajouter `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` dans `.env.local`
3. Intégrer le `AnalyticsProvider` dans le layout
4. Ajouter les appels de tracking dans les composants
5. Tester en développement (vérifier les logs console)
6. Déployer en production

## 📊 Dashboard HubSpot

Une fois déployé, vous pourrez voir dans HubSpot :
- Nombre de visiteurs uniques
- Pages les plus visitées
- Taux de conversion du calculateur ROI
- Modules les plus populaires
- Taux de soumission des formulaires
- Parcours utilisateur complet
- Segmentation par langue, appareil, source

## 🔄 Évolution automatique

Le système est conçu pour s'adapter automatiquement :
- ✅ Nouveaux modules ajoutés au calculateur → Trackés automatiquement
- ✅ Nouvelles pages créées → Pages vues trackées automatiquement
- ✅ Nouveaux CTA → Faciles à tracker avec `trackCTAClick()`
- ✅ SEO et SEO AI → Continuent de fonctionner indépendamment

## 💡 Bonnes pratiques

1. **Nommer les événements de manière cohérente**
   - Utiliser snake_case pour les noms d'événements
   - Être descriptif : `roi_calculator_used` plutôt que `calc_used`

2. **Inclure le contexte**
   - Toujours inclure `timestamp`
   - Ajouter la source/localisation de l'événement

3. **Tester en développement**
   - Les logs console montrent tous les événements
   - Vérifier que les données sont correctes avant production

4. **Monitorer les performances**
   - Le script HubSpot se charge de manière asynchrone
   - Pas d'impact sur les performances du site

## 📝 Checklist d'implémentation

- [ ] Créer `.env.local` avec `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- [ ] Ajouter `AnalyticsProvider` dans le layout
- [ ] Tracker les événements du calculateur ROI
- [ ] Tracker le formulaire de contact
- [ ] Tracker les CTA principaux
- [ ] Tester en développement
- [ ] Vérifier dans HubSpot que les données arrivent
- [ ] Déployer en production
- [ ] Configurer les workflows HubSpot si nécessaire

## 🆘 Support

En cas de problème :
1. Vérifier que `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` est défini
2. Vérifier les logs console en développement
3. Vérifier que le script HubSpot se charge (onglet Network)
4. Contacter le support HubSpot si les données n'arrivent pas
