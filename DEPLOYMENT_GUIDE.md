# Guide de déploiement progressif Octogone

## PHASE 1 : Test privé (maintenant)

### Étape 1 : Créer un compte Vercel
1. Aller sur https://vercel.com
2. Cliquer "Sign Up"
3. Choisir "Continue with GitHub" (recommandé)
4. Autoriser Vercel à accéder à vos repos

### Étape 2 : Pousser votre code sur GitHub (si pas déjà fait)

```bash
# Dans votre dossier octogoneWebsite
git init
git add .
git commit -m "Initial commit - Site Octogone"

# Créer un repo sur GitHub (github.com/new)
# Puis :
git remote add origin https://github.com/VOTRE-USERNAME/octogoneWebsite.git
git branch -M main
git push -u origin main
```

### Étape 3 : Importer le projet sur Vercel
1. Sur Vercel, cliquer "Add New Project"
2. Sélectionner "Import Git Repository"
3. Choisir votre repo "octogoneWebsite"
4. Cliquer "Import"

### Étape 4 : Configuration du projet
Vercel détecte automatiquement Next.js, mais vérifiez :

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node.js Version: 20.x
```

### Étape 5 : Variables d'environnement (optionnel pour test)
Si vous avez des variables d'environnement :
- Cliquer "Environment Variables"
- Ajouter vos variables (ex: NEXT_PUBLIC_GA_ID)
- Pour l'instant, vous pouvez sauter cette étape

### Étape 6 : Déployer
1. Cliquer "Deploy"
2. Attendre 2-3 minutes
3. Vous obtiendrez une URL comme : `octogone-abc123.vercel.app`

### Étape 7 : Protéger par mot de passe
1. Aller dans Project Settings
2. Onglet "Deployment Protection"
3. Activer "Password Protection"
4. Définir un mot de passe (ex: "octogone2025")
5. Sauvegarder

**✅ Votre site est maintenant accessible uniquement avec le mot de passe !**

URL de test : `https://octogone-abc123.vercel.app`

---

## PHASE 2 : Preview public (quand le site est prêt à montrer)

### Étape 1 : Retirer la protection
1. Project Settings → Deployment Protection
2. Désactiver "Password Protection"

### Étape 2 : Partager l'URL
- URL reste : `octogone-abc123.vercel.app`
- Vous pouvez la partager avec clients/collègues
- Toujours pas votre domaine officiel

### Étape 3 : Continuer à améliorer
```bash
# Faire des modifications
git add .
git commit -m "Amélioration XYZ"
git push

# Vercel redéploie automatiquement en 2-3 minutes
```

---

## PHASE 3 : Production avec votre domaine (quand tout est parfait)

### Option A : Domaine chez Astral Internet pointant vers Vercel

#### Étape 1 : Ajouter le domaine sur Vercel
1. Project Settings → Domains
2. Cliquer "Add Domain"
3. Entrer : `octogone.ai` et `www.octogone.ai`
4. Vercel vous donnera des instructions DNS

#### Étape 2 : Configurer DNS chez Astral
Dans le panneau Astral Internet :

**Pour octogone.ai (root domain) :**
```
Type: A
Name: @
Value: 76.76.21.21 (IP fournie par Vercel)
TTL: 3600
```

**Pour www.octogone.ai :**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com (fourni par Vercel)
TTL: 3600
```

#### Étape 3 : Attendre la propagation DNS
- Temps : 1-24 heures (souvent 1-2 heures)
- Vérifier sur : https://dnschecker.org

#### Étape 4 : SSL automatique
- Vercel génère automatiquement le certificat SSL
- Votre site sera accessible en HTTPS

**✅ Votre site est maintenant en production sur octogone.ai !**

---

### Option B : Transférer le domaine vers Vercel (optionnel)

Si vous voulez tout gérer sur Vercel :
1. Project Settings → Domains → "Transfer Domain"
2. Suivre les instructions
3. Coût : ~15$/an (prix standard)

---

## 🔄 Workflow quotidien après déploiement

### Pour mettre à jour le site :
```bash
# 1. Faire vos modifications dans le code
# 2. Tester en local
npm run dev

# 3. Quand satisfait, pousser sur GitHub
git add .
git commit -m "Description des changements"
git push

# 4. Vercel redéploie automatiquement
# 5. Site mis à jour en 2-3 minutes
```

### Pour voir les déploiements :
- Aller sur vercel.com
- Voir l'historique des déploiements
- Possibilité de rollback si problème

---

## 📊 Tester les performances

### Pendant la Phase 1 (site protégé) :
```bash
# Tester en local
npm run build
npm start

# Puis utiliser Lighthouse dans Chrome
# F12 → Lighthouse → Analyze
```

### Pendant la Phase 2 (site public mais URL temporaire) :
- Google PageSpeed Insights : https://pagespeed.web.dev/
- GTmetrix : https://gtmetrix.com/
- WebPageTest : https://www.webpagetest.org/

### Pendant la Phase 3 (production) :
- Tous les outils ci-dessus
- Vercel Analytics (dans le dashboard)

---

## 🎯 Timeline suggéré

**Semaine 1-2 : Phase 1 (TEST PRIVÉ)**
- Déployer sur Vercel avec protection
- Tester toutes les pages
- Corriger les bugs
- Optimiser les performances
- Vérifier FR/EN

**Semaine 3 : Phase 2 (PREVIEW PUBLIC)**
- Retirer la protection
- Montrer aux collègues/clients
- Récolter les feedbacks
- Faire les ajustements finaux

**Semaine 4 : Phase 3 (PRODUCTION)**
- Pointer le domaine octogone.ai
- Annoncer le lancement
- Monitorer les performances

---

## ⚠️ Points importants

### Pendant la Phase 1 et 2 :
- ✅ Le site est déjà en production (vraies performances)
- ✅ Vous pouvez tester tout ce qui fonctionne
- ✅ Aucun risque pour votre domaine officiel
- ✅ Vous pouvez prendre votre temps

### Emails :
- ✅ Gardez vos emails chez Astral
- ✅ Seul le site web pointe vers Vercel
- ✅ Les emails continuent de fonctionner normalement

### Coûts :
- Phase 1-2-3 : **Gratuit** (plan Hobby Vercel)
- Domaine : Gardez chez Astral (déjà payé)
- Total : **0$ supplémentaire**

---

## 🆘 Support

### Si problème pendant le déploiement :
1. Vérifier les logs de build sur Vercel
2. Tester en local : `npm run build`
3. Vérifier la documentation Vercel
4. Me demander de l'aide !

### Commandes utiles :
```bash
# Vérifier que tout compile
npm run build

# Nettoyer et rebuild
rm -rf .next node_modules
npm install
npm run build

# Vérifier les erreurs
npm run lint
```

---

## ✅ Checklist avant chaque phase

### Avant Phase 1 (déploiement test) :
- [ ] Code compile sans erreur (`npm run build`)
- [ ] Pas d'erreurs de lint (`npm run lint`)
- [ ] .env.local n'est pas commité
- [ ] Code poussé sur GitHub

### Avant Phase 2 (retirer protection) :
- [ ] Toutes les pages testées
- [ ] FR et EN fonctionnent
- [ ] Images chargent correctement
- [ ] Formulaires fonctionnent
- [ ] Navigation fonctionne
- [ ] Responsive testé

### Avant Phase 3 (domaine officiel) :
- [ ] Feedbacks intégrés
- [ ] Performances optimales (Lighthouse > 90)
- [ ] SEO vérifié
- [ ] Contenu finalisé
- [ ] Analytics configuré (GA4, HubSpot)
- [ ] Équipe informée du lancement
