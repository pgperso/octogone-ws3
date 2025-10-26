# Configuration de l'envoi d'emails avec Resend

## 1. Installer Resend

```bash
npm install resend
```

## 2. Obtenir une clé API Resend

1. Créer un compte sur [resend.com](https://resend.com)
2. Aller dans **API Keys**
3. Créer une nouvelle clé API
4. Copier la clé (commence par `re_...`)

## 3. Configurer les variables d'environnement

Ajouter dans `.env.local` :

```env
RESEND_API_KEY=re_votre_cle_api_ici
```

## 4. Configurer le domaine (optionnel mais recommandé)

### Option A : Utiliser un domaine personnalisé
1. Dans Resend, aller dans **Domains**
2. Ajouter votre domaine (ex: `octogone.app`)
3. Configurer les DNS records (SPF, DKIM, DMARC)
4. Vérifier le domaine
5. Changer le `from` dans l'API : `Octogone <noreply@octogone.app>`

### Option B : Utiliser le domaine de test (développement uniquement)
- Resend fournit un domaine de test : `onboarding@resend.dev`
- Limité à 100 emails/jour
- Emails envoyés uniquement à votre email vérifié

## 5. Tester en local

```bash
npm run dev
```

Aller sur la page du widget de recette et tester l'envoi d'email.

## 6. Déployer sur Vercel

1. Aller dans **Vercel** > **Settings** > **Environment Variables**
2. Ajouter `RESEND_API_KEY` avec la valeur de votre clé
3. Redéployer l'application

## Limites Resend (plan gratuit)

- 100 emails/jour
- 3,000 emails/mois
- Parfait pour tester et démarrer

## Alternative : Mode développement sans email

Si vous ne voulez pas configurer Resend immédiatement, le code affichera le code d'accès dans les logs de la console serveur en cas d'erreur d'envoi.
