# 🚀 Guide Complet : Configuration Railway + Vercel

## 📋 Architecture finale
- **Frontend Next.js** → Vercel (`CMA-Education-2024`)
- **CMS Strapi** → Railway (`CMA-Education-Strapi`)

## 🎯 ÉTAPE 1: Déployer Strapi sur Railway

### **1.1 Créer le projet Railway**
1. Allez sur [railway.app](https://railway.app)
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. Sélectionnez : `CMA-Education-Strapi`
5. **Deploy Now**

### **1.2 Ajouter une base de données PostgreSQL**
1. Dans votre projet Railway : **+ New**
2. **Database** → **PostgreSQL**
3. Railway génère automatiquement `DATABASE_URL`

### **1.3 Variables d'environnement Railway**
Dans Railway → **Variables**, ajoutez :

```env
# Base de données (automatique)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Configuration Strapi
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Clés de sécurité (générez-les)
APP_KEYS=votre-app-key-1,votre-app-key-2
API_TOKEN_SALT=votre-api-token-salt
ADMIN_JWT_SECRET=votre-admin-jwt-secret
TRANSFER_TOKEN_SALT=votre-transfer-token-salt
JWT_SECRET=votre-jwt-secret

# CORS - Autorisez votre domaine Vercel
FRONTEND_URL=https://votre-site.vercel.app
```

### **1.4 Générer les clés secrètes**
Utilisez ce script pour générer les clés :

```javascript
const crypto = require('crypto');
console.log('APP_KEYS:', crypto.randomBytes(32).toString('base64') + ',' + crypto.randomBytes(32).toString('base64'));
console.log('API_TOKEN_SALT:', crypto.randomBytes(32).toString('base64'));
console.log('ADMIN_JWT_SECRET:', crypto.randomBytes(32).toString('base64'));
console.log('TRANSFER_TOKEN_SALT:', crypto.randomBytes(32).toString('base64'));
console.log('JWT_SECRET:', crypto.randomBytes(32).toString('base64'));
```

### **1.5 Attendre le déploiement**
- Railway déploie automatiquement (5-10 minutes)
- Notez l'URL générée : `https://votre-app.up.railway.app`

## 🎯 ÉTAPE 2: Déployer Frontend sur Vercel

### **2.1 Créer le projet Vercel**
1. Allez sur [vercel.com](https://vercel.com)
2. **Sign up with GitHub**
3. **New Project** → **Import Git Repository**
4. Sélectionnez : `CMA-Education-2024`
5. **Deploy**

### **2.2 Variables d'environnement Vercel**
Dans Vercel → **Settings** → **Environment Variables** :

```env
# URL du CMS Strapi (remplacez par votre URL Railway)
NEXT_PUBLIC_STRAPI_URL=https://votre-app.up.railway.app

# Token API Strapi (à générer après déploiement Strapi)
STRAPI_API_TOKEN=votre-token-api

# Configuration Email
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
BROCHURE_NOTIFICATION_EMAIL=contact@cma-education.com

# URL du site
NEXT_PUBLIC_SITE_URL=https://votre-site.vercel.app
```

## 🎯 ÉTAPE 3: Configuration post-déploiement

### **3.1 Configurer le panel admin Strapi**
1. **Accédez au panel** : `https://votre-app.up.railway.app/admin`
2. **Créez votre compte administrateur**
3. **Configurez les permissions** :
   - **Settings** → **Users & Permissions Plugin** → **Roles**
   - **Public** → Autorisez les APIs nécessaires

### **3.2 Générer le token API**
1. Dans Strapi : **Settings** → **API Tokens**
2. **Create new API Token** :
   - **Name** : `Frontend Token`
   - **Token type** : `Read-only`
   - **Token duration** : `Unlimited`
3. **Copiez le token** et ajoutez-le dans Vercel

### **3.3 Configurer CORS dans Strapi**
Dans le fichier `config/middlewares.ts` de votre Strapi :

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'https://votre-site.vercel.app', // Remplacez par votre domaine
        'https://*.vercel.app'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 🎯 ÉTAPE 4: Test de connexion

### **4.1 Tester l'API Strapi**
```bash
# Test simple
curl https://votre-app.up.railway.app/api/formations

# Test avec token
curl -H "Authorization: Bearer VOTRE-TOKEN" https://votre-app.up.railway.app/api/formations
```

### **4.2 Tester depuis le frontend**
Le frontend devrait maintenant pouvoir accéder aux données Strapi via `NEXT_PUBLIC_STRAPI_URL`.

## 🎯 ÉTAPE 5: Import des données

### **5.1 Uploader les images dans Strapi**
1. **Panel admin** → **Media Library**
2. **Upload** vos images depuis `public/images/`
3. **Organisez** par dossiers (formations, gallery, etc.)

### **5.2 Créer le contenu**
1. **Content Manager** → Créez vos formations
2. **Ajoutez les images** uploadées
3. **Publiez** le contenu

## 🔧 Commandes utiles

### **Railway (Strapi)**
```bash
# Voir les logs
railway logs

# Variables d'environnement
railway variables

# Redéployer
railway up
```

### **Vercel (Frontend)**
```bash
# Redéployer
vercel --prod

# Voir les logs
vercel logs
```

## ✅ Checklist finale

### **Railway (Strapi)**
- [ ] Projet créé et déployé
- [ ] Base PostgreSQL ajoutée
- [ ] Variables d'environnement configurées
- [ ] Panel admin accessible
- [ ] Token API généré
- [ ] CORS configuré

### **Vercel (Frontend)**
- [ ] Projet déployé
- [ ] Variables d'environnement configurées
- [ ] `NEXT_PUBLIC_STRAPI_URL` pointant vers Railway
- [ ] Site accessible

### **Connexion**
- [ ] Frontend peut accéder à l'API Strapi
- [ ] Images s'affichent correctement
- [ ] Formulaires fonctionnent
- [ ] Emails de brochures fonctionnent

## 🌍 URLs finales

- **Site web** : `https://votre-site.vercel.app`
- **Panel admin** : `https://votre-app.up.railway.app/admin`
- **API Strapi** : `https://votre-app.up.railway.app/api`

## 🆘 Dépannage

### **Erreur CORS**
- Vérifiez `FRONTEND_URL` dans Railway
- Mettez à jour `config/middlewares.ts`

### **Erreur API**
- Vérifiez `NEXT_PUBLIC_STRAPI_URL` dans Vercel
- Vérifiez le token API

### **Images ne s'affichent pas**
- Uploadez les images dans Strapi Media Library
- Vérifiez les URLs dans le contenu

Votre site CMA Education sera maintenant entièrement fonctionnel ! 🎉