# 🍪 Configuration Cookiebot

## Informations de compte

- **Cookiebot ID**: `d6a4b4c0-2a1c-4162-ac30-add8b00588a4`
- **Mode de blocage**: Auto blocking
- **Conformité**: CCPA/CPRA (USA), PIPEDA (Canada), Loi 25 (Québec), RGPD (Europe)

## Configuration

Le Cookiebot est déjà intégré dans le site via :
- `src/components/cookiebot/cookiebot-banner.tsx`
- `src/config/cookiebot.ts`
- `src/app/[locale]/layout.tsx`

## Variables d'environnement (optionnel)

Pour override la configuration, créez un fichier `.env.local` :

```env
# Cookiebot Configuration
NEXT_PUBLIC_COOKIEBOT_ID=d6a4b4c0-2a1c-4162-ac30-add8b00588a4
NEXT_PUBLIC_COOKIEBOT_ENABLED=true
```

## Dashboard Cookiebot

Accédez à votre dashboard : https://manage.cookiebot.com/

## Fonctionnalités

✅ Bannière de consentement (FR/EN)
✅ Blocage automatique des cookies non-consentis
✅ Détection géographique (affiche le bon message selon la localisation)
✅ Rapports de conformité
✅ Preuve de consentement (requis par Loi 25)

## Support

- Documentation : https://www.cookiebot.com/en/developer/
- Support : https://support.cookiebot.com/
