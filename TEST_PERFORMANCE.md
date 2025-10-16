# Guide de test de performance en local

## Méthode 1 : Build production local

### Étape 1 : Build le projet
```bash
npm run build
```

### Étape 2 : Démarrer en mode production
```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

### Étape 3 : Tester les performances

#### A. Avec Chrome DevTools (Lighthouse)
1. Ouvrir Chrome
2. Aller sur `http://localhost:3000`
3. F12 → Onglet "Lighthouse"
4. Cocher : Performance, Accessibility, Best Practices, SEO
5. Mode : Desktop ou Mobile
6. Cliquer "Analyze page load"

#### B. Avec Google PageSpeed Insights
**Problème :** Ne fonctionne pas avec localhost

**Solution :** Utiliser ngrok pour exposer temporairement

### Étape 4 : Exposer temporairement avec ngrok (optionnel)

```bash
# Installer ngrok
# Télécharger depuis https://ngrok.com/download

# Démarrer votre site
npm start

# Dans un autre terminal, exposer le port 3000
ngrok http 3000
```

Vous obtiendrez une URL temporaire comme :
`https://abc123.ngrok.io`

Utilisez cette URL pour tester avec :
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

**⚠️ Important :** 
- L'URL ngrok est temporaire et change à chaque démarrage
- Gratuit mais limité en bande passante
- Arrêtez ngrok après les tests (Ctrl+C)

---

## Méthode 2 : Docker local (Avancé)

### Créer un environnement de production identique

```bash
# Build l'image Docker
docker build -t octogone-test .

# Démarrer le conteneur
docker run -p 3000:3000 octogone-test
```

---

## 📊 Outils de test de performance recommandés

### 1. **Lighthouse (Chrome DevTools)** ⭐
- Gratuit, intégré à Chrome
- Fonctionne en local
- Scores détaillés

### 2. **WebPageTest** (avec ngrok)
- https://www.webpagetest.org/
- Tests depuis différents pays
- Analyse détaillée du waterfall

### 3. **GTmetrix** (avec ngrok)
- https://gtmetrix.com/
- Rapports détaillés
- Recommandations d'optimisation

### 4. **Google PageSpeed Insights** (avec ngrok)
- https://pagespeed.web.dev/
- Données réelles de Chrome
- Core Web Vitals

---

## 🎯 Métriques à surveiller

### Core Web Vitals
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Autres métriques importantes
- **FCP** (First Contentful Paint) : < 1.8s
- **TTI** (Time to Interactive) : < 3.8s
- **Speed Index** : < 3.4s
- **Total Blocking Time** : < 200ms

---

## 📋 Checklist de test

- [ ] Page d'accueil (/)
- [ ] Page concept (/features/operate)
- [ ] Page secteur (/secteurs/chains-groups)
- [ ] Page outil (/fonctionnalites/inventory)
- [ ] Page contact (/contact)
- [ ] Tester en FR et EN
- [ ] Tester Desktop et Mobile
- [ ] Vérifier les images (format WebP/AVIF)
- [ ] Vérifier le cache
- [ ] Vérifier la compression

---

## 🔍 Analyse des résultats

### Scores attendus pour votre site :
- **Performance** : 90-100
- **Accessibility** : 95-100
- **Best Practices** : 95-100
- **SEO** : 95-100

### Si scores plus bas :
1. Vérifier les images (taille, format)
2. Vérifier les fonts (preload)
3. Vérifier le JavaScript (code splitting)
4. Vérifier le CSS (purge)

---

## 💡 Commandes utiles

```bash
# Analyser la taille du bundle
npm run analyze

# Build et démarrer
npm run build && npm start

# Nettoyer et rebuild
rm -rf .next
npm run build

# Vérifier les erreurs
npm run lint
```

---

## Après les tests

Une fois satisfait des performances :
1. Arrêter ngrok (si utilisé)
2. Déployer sur Vercel/Netlify avec protection
3. Faire les tests finaux
4. Retirer la protection et rendre public
