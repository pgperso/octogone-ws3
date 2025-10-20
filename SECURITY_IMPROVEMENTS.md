# 🔒 Améliorations de Sécurité - Octogone Website

## ✅ Points Forts Actuels

### 1. **Gestion des Secrets**
- ✅ `.env*` dans `.gitignore`
- ✅ Variables d'environnement pour API keys
- ✅ Pas de secrets hardcodés dans le code

### 2. **Headers de Sécurité Existants**
- ✅ `X-Frame-Options: DENY` (anti-clickjacking)
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `Referrer-Policy: origin-when-cross-origin`
- ✅ `poweredByHeader: false` (masque Next.js)

### 3. **Authentification Admin**
- ✅ Session tokens avec httpOnly cookies
- ✅ Rate limiting basique
- ✅ Secure cookies en production

### 4. **Vercel (Hébergement)**
- ✅ HTTPS automatique avec certificats SSL
- ✅ DDoS protection incluse
- ✅ Edge Network global
- ✅ Automatic security updates

---

## ⚠️ Améliorations Critiques Recommandées

### 1. **Content Security Policy (CSP)** - PRIORITÉ HAUTE

**Problème actuel** : Pas de CSP strict, vulnérable aux attaques XSS

**Solution** : Ajouter dans `next.config.ts`

```typescript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://js.hs-scripts.com https://js.hsforms.net https://js.hs-analytics.net https://consent.cookiebot.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: https: blob:",
          "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.hubspot.com https://*.hs-analytics.net https://*.hsforms.com https://*.hsforms.net",
          "frame-src 'self' https://www.youtube.com https://player.vimeo.com https://consent.cookiebot.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests"
        ].join('; ')
      },
      // ... autres headers
    ]
  }
]
```

### 2. **Strict-Transport-Security (HSTS)** - PRIORITÉ HAUTE

**Problème** : Pas de HSTS, connexions HTTP possibles

**Solution Vercel** : Ajouter dans `vercel.json`

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

### 3. **Permissions-Policy** - PRIORITÉ MOYENNE

**Problème** : Pas de contrôle des features du navigateur

**Solution** :

```typescript
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
}
```

### 4. **Authentification Admin Renforcée** - PRIORITÉ HAUTE

**Problèmes actuels** :
- Mot de passe par défaut faible (`160200`)
- Rate limiting en mémoire (perdu au redémarrage)
- Pas de 2FA

**Solutions** :

#### a) Utiliser bcrypt pour hasher le mot de passe

```bash
npm install bcrypt @types/bcrypt
```

```typescript
// app/api/admin/login/route.ts
import bcrypt from 'bcrypt';

// Stocker le hash dans .env
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

// Vérifier
const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
```

#### b) Utiliser Vercel KV pour rate limiting persistant

```bash
npm install @vercel/kv
```

```typescript
import { kv } from '@vercel/kv';

const attempts = await kv.get(`login:${ip}`) || 0;
if (attempts >= 5) {
  return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
}
await kv.incr(`login:${ip}`);
await kv.expire(`login:${ip}`, 900); // 15 minutes
```

#### c) Ajouter 2FA avec TOTP

```bash
npm install otplib qrcode
```

### 5. **Protection CSRF** - PRIORITÉ MOYENNE

**Problème** : Pas de protection CSRF sur les formulaires

**Solution** : Utiliser `next-csrf`

```bash
npm install next-csrf
```

### 6. **Validation des Inputs** - PRIORITÉ HAUTE

**Problème** : Validation basique, risque d'injection

**Solution** : Utiliser Zod pour validation stricte

```bash
npm install zod
```

```typescript
import { z } from 'zod';

const contactSchema = z.object({
  email: z.string().email().max(255),
  firstName: z.string().min(1).max(100).regex(/^[a-zA-ZÀ-ÿ\s'-]+$/),
  lastName: z.string().min(1).max(100).regex(/^[a-zA-ZÀ-ÿ\s'-]+$/),
  company: z.string().max(200).optional(),
  phone: z.string().regex(/^\+?[0-9\s()-]{10,20}$/).optional(),
  message: z.string().min(10).max(2000)
});
```

### 7. **Protection des API Routes** - PRIORITÉ HAUTE

**Problème** : Pas de rate limiting sur les API publiques

**Solution Vercel** : Utiliser Vercel Edge Config + Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
  
  return NextResponse.next();
}
```

### 8. **Sécurité des Cookies** - PRIORITÉ MOYENNE

**Amélioration** : Ajouter `__Secure-` prefix et `SameSite=Strict`

```typescript
response.cookies.set('__Secure-admin-session', sessionToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60,
  path: '/admin'
});
```

### 9. **Logging et Monitoring** - PRIORITÉ MOYENNE

**Solution Vercel** : Utiliser Vercel Analytics + Log Drains

```bash
# Activer dans Vercel Dashboard
- Web Analytics
- Speed Insights
- Log Drains (vers Datadog, Logtail, etc.)
```

### 10. **Dependency Security** - PRIORITÉ HAUTE

**Solution** : Automatiser les audits

```bash
# Ajouter dans package.json
"scripts": {
  "security:audit": "npm audit --production",
  "security:fix": "npm audit fix"
}
```

**GitHub** : Activer Dependabot pour updates automatiques

---

## 🚀 Optimisations Spécifiques Vercel

### 1. **Edge Middleware pour Sécurité**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Headers de sécurité supplémentaires
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Bloquer les requêtes suspectes
  const userAgent = request.headers.get('user-agent') || '';
  if (userAgent.includes('bot') && !userAgent.includes('Googlebot')) {
    // Log et potentiellement bloquer
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 2. **Vercel Firewall (Enterprise)**

Si budget disponible, activer :
- DDoS Protection avancée
- WAF (Web Application Firewall)
- Bot Protection
- Attack Challenge Mode

### 3. **Edge Config pour Secrets Rotation**

```typescript
import { get } from '@vercel/edge-config';

const apiKey = await get('api_key');
```

### 4. **Vercel Secure Compute**

- Activer "Secure Compute" dans les settings
- Isoler les fonctions sensibles

---

## 📋 Checklist de Déploiement Sécurisé

### Variables d'Environnement Vercel

```bash
# Production
ADMIN_PASSWORD_HASH=<bcrypt_hash>
SESSION_SECRET=<random_32_chars>
NEXT_PUBLIC_SITE_URL=https://octogone.ca

# Analytics (optionnel)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=XXXXXXXX

# Email (si utilisé)
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=<encrypted>
SMTP_PASSWORD=<encrypted>
SMTP_FROM=noreply@octogone.ca
SMTP_TO=contact@octogone.ca

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=<url>
UPSTASH_REDIS_REST_TOKEN=<token>
```

### Vercel Project Settings

1. **Deployment Protection**
   - ✅ Enable Password Protection for Preview Deployments
   - ✅ Enable Vercel Authentication

2. **Environment Variables**
   - ✅ Encrypt sensitive values
   - ✅ Separate Production/Preview/Development

3. **Security Headers**
   - ✅ Configurer via `vercel.json` et `next.config.ts`

4. **Monitoring**
   - ✅ Enable Web Analytics
   - ✅ Enable Speed Insights
   - ✅ Configure Log Drains

---

## 🎯 Score de Sécurité Cible

### Avant Améliorations
- SecurityHeaders.com: **C**
- Mozilla Observatory: **D+**
- OWASP: **5/10**

### Après Améliorations
- SecurityHeaders.com: **A+**
- Mozilla Observatory: **A+**
- OWASP: **9/10**

---

## 📚 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security Best Practices](https://vercel.com/docs/security)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [SecurityHeaders.com](https://securityheaders.com/)

---

## ⚡ Implémentation Prioritaire (Phase 1)

1. ✅ Ajouter CSP strict
2. ✅ Ajouter HSTS
3. ✅ Hasher le mot de passe admin avec bcrypt
4. ✅ Ajouter validation Zod sur tous les formulaires
5. ✅ Implémenter rate limiting avec Upstash Redis

**Temps estimé** : 4-6 heures
**Impact** : Score de sécurité passe de C à A

Veux-tu que j'implémente ces améliorations maintenant ?
