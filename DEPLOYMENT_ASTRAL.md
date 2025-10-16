# Guide de déploiement sur Astral Internet (VPS/Serveur)

## Prérequis
- Accès SSH à votre serveur Astral
- Serveur Linux (Ubuntu/Debian recommandé)
- Droits sudo/root

## Étape 1 : Connexion SSH

```bash
ssh votre-utilisateur@votre-serveur.astral.ca
```

## Étape 2 : Installation de Node.js 20

```bash
# Mettre à jour le système
sudo apt update
sudo apt upgrade -y

# Installer Node.js 20 (version LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version  # Devrait afficher v20.x.x
npm --version
```

## Étape 3 : Installation de PM2 (gestionnaire de processus)

```bash
sudo npm install -g pm2
```

## Étape 4 : Cloner et configurer le projet

```bash
# Créer un dossier pour votre site
cd /var/www
sudo mkdir octogone
sudo chown $USER:$USER octogone
cd octogone

# Cloner votre projet (ou uploader via FTP/SFTP)
git clone https://github.com/votre-compte/octogoneWebsite.git .

# Ou si vous n'utilisez pas Git, uploadez les fichiers via SFTP
# puis continuez ici

# Installer les dépendances
npm install

# Créer le fichier .env.local pour la production
nano .env.local
```

Contenu du `.env.local` :
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://octogone.ai
# Ajoutez vos autres variables d'environnement
```

## Étape 5 : Build du projet

```bash
npm run build
```

## Étape 6 : Démarrer avec PM2

```bash
# Démarrer l'application
pm2 start npm --name "octogone" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Exécuter la commande affichée par PM2

# Vérifier que l'app tourne
pm2 status
pm2 logs octogone
```

L'application devrait maintenant tourner sur le port 3000.

## Étape 7 : Configurer Nginx comme reverse proxy

```bash
# Installer Nginx si pas déjà installé
sudo apt install nginx -y

# Créer la configuration du site
sudo nano /etc/nginx/sites-available/octogone
```

Contenu du fichier de configuration :
```nginx
server {
    listen 80;
    server_name octogone.ai www.octogone.ai;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Optimisations pour les fichiers statiques Next.js
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Activer le site :
```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/octogone /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

## Étape 8 : Configurer SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtenir et installer le certificat SSL
sudo certbot --nginx -d octogone.ai -d www.octogone.ai

# Suivre les instructions (entrer votre email, accepter les termes)
```

Le certificat se renouvellera automatiquement.

## Étape 9 : Configuration du pare-feu

```bash
# Autoriser HTTP et HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

## Étape 10 : Pointer votre domaine

Dans le panneau de contrôle Astral Internet :
1. Aller dans la gestion DNS
2. Créer/modifier les enregistrements A :
   - `@` (ou octogone.ai) → IP de votre serveur
   - `www` → IP de votre serveur

Attendre la propagation DNS (jusqu'à 24h, souvent quelques heures).

## Commandes utiles pour la maintenance

```bash
# Voir les logs de l'application
pm2 logs octogone

# Redémarrer l'application
pm2 restart octogone

# Arrêter l'application
pm2 stop octogone

# Mettre à jour le site
cd /var/www/octogone
git pull  # ou uploader les nouveaux fichiers
npm install
npm run build
pm2 restart octogone

# Voir l'état de Nginx
sudo systemctl status nginx

# Redémarrer Nginx
sudo systemctl restart nginx
```

## Dépannage

### L'application ne démarre pas
```bash
pm2 logs octogone --lines 100
```

### Erreur de port déjà utilisé
```bash
# Trouver le processus sur le port 3000
sudo lsof -i :3000
# Tuer le processus si nécessaire
sudo kill -9 <PID>
```

### Problème de permissions
```bash
sudo chown -R $USER:$USER /var/www/octogone
```

## Monitoring

```bash
# Installer PM2 monitoring (optionnel)
pm2 install pm2-logrotate

# Voir les métriques
pm2 monit
```

## Votre site devrait maintenant être accessible sur https://octogone.ai ! 🎉
