# Déploiement sur AWS Lightsail

Guide de déploiement de `nodes-web` sur une instance Lightsail Ubuntu en tenant compte d'un contexte où :

- deux autres applications tournent déjà sur le serveur
- les ports `3000` et `3001` sont déjà occupés
- cette application devra donc écouter sur le port `3002`

Ce guide part du principe que :

- `nginx` sert de reverse proxy
- `pm2` supervise les processus Node.js
- le dépôt est déployé directement sur l'instance

## 1. Hypothèses retenues

- Instance Ubuntu sur AWS Lightsail
- Node.js déjà installé, sinon installation incluse plus bas
- Domaine ou sous-domaine pointant vers l'IP publique de l'instance
- Les autres apps existantes ne doivent pas être touchées

Port retenu pour cette app :

- `3002`

Nom PM2 recommandé :

- `nodes-web`

Chemin de déploiement recommandé :

- `/var/www/nodes-web`

## 2. Vérifier les ports déjà utilisés

Avant de déployer, vérifier que `3000` et `3001` sont bien occupés et que `3002` est libre :

```bash
sudo ss -ltnp | grep ':300'
sudo ss -ltnp | grep ':3002'
```

Si `3002` est déjà pris, choisir un autre port libre et reporter cette valeur partout dans ce document.

## 3. Préparer le serveur

Mettre le système à jour :

```bash
sudo apt update && sudo apt upgrade -y
```

Installer les paquets utiles :

```bash
sudo apt install -y nginx git curl build-essential
```

Installer Node.js 20 LTS si nécessaire :

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Vérifier :

```bash
node -v
npm -v
```

Installer PM2 globalement :

```bash
sudo npm install -g pm2
```

## 4. Récupérer le projet

Créer le dossier de déploiement :

```bash
sudo mkdir -p /var/www/nodes-web
sudo chown -R $USER:$USER /var/www/nodes-web
```

Cloner le dépôt :

```bash
git clone https://github.com/bokokoromel-create/nodes-web.git /var/www/nodes-web
cd /var/www/nodes-web
```

Si le dépôt existe déjà :

```bash
cd /var/www/nodes-web
git pull origin main
```

## 5. Configurer les variables d'environnement

Créer le fichier `.env.production` :

```bash
cp .env.example .env.production
nano .env.production
```

Renseigner au minimum :

```env
FLOW_API_KEY=mettre_la_vraie_cle
NEXT_PUBLIC_SITE_URL=https://nodes-hub.com
```

Notes :

- `NEXT_PUBLIC_SITE_URL` est important pour le SEO, les canonicals, `robots.txt` et `sitemap.xml`
- ne pas laisser la valeur `localhost`
- ne pas versionner `.env.production`

## 6. Installer et builder l'application

Dans le dossier du projet :

```bash
cd /var/www/nodes-web
npm install
npm run lint
npm run build
```

Si `npm run build` passe, l'application est prête à être lancée sur `3002`.

## 7. Démarrer l'application sur le port 3002 avec PM2

Lancer l'application :

```bash
cd /var/www/nodes-web
PORT=3002 npm run start
```

Si le démarrage manuel fonctionne, arrêter le process de test puis déclarer le process dans PM2 :

```bash
pm2 start npm --name nodes-web -- start -- --port 3002
```

Vérifier :

```bash
pm2 status
pm2 logs nodes-web
curl http://127.0.0.1:3002
```

Persister PM2 après reboot :

```bash
pm2 save
pm2 startup
```

Exécuter ensuite la commande affichée par `pm2 startup`.

## 8. Configurer Nginx comme reverse proxy

Créer un vhost dédié :

```bash
sudo nano /etc/nginx/sites-available/nodes-web
```

Exemple de configuration :

```nginx
server {
    listen 80;
    server_name nodes-hub.com www.nodes-hub.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/nodes-web /etc/nginx/sites-enabled/nodes-web
```

Tester la config :

```bash
sudo nginx -t
```

Recharger Nginx :

```bash
sudo systemctl reload nginx
```

## 9. Activer HTTPS avec Let's Encrypt

Installer Certbot :

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Générer le certificat :

```bash
sudo certbot --nginx -d nodes-hub.com -d www.nodes-hub.com
```

Vérifier le renouvellement :

```bash
sudo certbot renew --dry-run
```

## 10. Vérifications après déploiement

Vérifier les services :

```bash
pm2 status
sudo systemctl status nginx
```

Vérifier localement depuis le serveur :

```bash
curl -I http://127.0.0.1:3002
curl -I https://nodes-hub.com
curl -I https://nodes-hub.com/robots.txt
curl -I https://nodes-hub.com/sitemap.xml
```

Vérifier dans le navigateur :

- page d'accueil
- pages `/formations`
- pages détail des parcours
- formulaire de contact
- formulaire d'inscription
- `robots.txt`
- `sitemap.xml`

## 11. Workflow de mise à jour

Pour déployer une nouvelle version :

```bash
cd /var/www/nodes-web
git pull origin main
npm install
npm run lint
npm run build
pm2 restart nodes-web
```

Vérifier ensuite :

```bash
pm2 logs nodes-web --lines 100
```

## 12. Commandes utiles

Voir les logs :

```bash
pm2 logs nodes-web
```

Redémarrer l'app :

```bash
pm2 restart nodes-web
```

Arrêter l'app :

```bash
pm2 stop nodes-web
```

Supprimer l'app de PM2 :

```bash
pm2 delete nodes-web
```

Vérifier le port occupé :

```bash
sudo ss -ltnp | grep ':3002'
```

## 13. Variante avec fichier ecosystem PM2

Si tu préfères une config PM2 versionnée, crée `ecosystem.config.js` avec :

```js
module.exports = {
  apps: [
    {
      name: "nodes-web",
      cwd: "/var/www/nodes-web",
      script: "npm",
      args: "start -- --port 3002",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      }
    }
  ]
};
```

Puis lancer :

```bash
pm2 start ecosystem.config.js
pm2 save
```

## 14. Points d'attention spécifiques à ce projet

- L'application expose une route API `POST /api/contact` ; `FLOW_API_KEY` doit être présent en production
- `NEXT_PUBLIC_SITE_URL` doit correspondre à l'URL publique finale pour que le SEO reste correct
- L'admin `/admin` ne doit pas être indexé ; c'est déjà géré côté app
- La build peut échouer si les variables d'environnement ne sont pas cohérentes ou si les dépendances ne sont pas installées proprement

## 15. Recommandation finale

Sur cette instance Lightsail :

- garder les apps existantes sur `3000` et `3001`
- déployer `nodes-web` sur `3002`
- exposer le domaine public uniquement via `nginx`
- ne jamais ouvrir `3002` publiquement dans le firewall si Nginx est déjà en frontal

Le schéma cible recommandé est donc :

- App 1 : `127.0.0.1:3000`
- App 2 : `127.0.0.1:3001`
- `nodes-web` : `127.0.0.1:3002`
- `nginx` : `80/443` vers le bon domaine et le bon backend
