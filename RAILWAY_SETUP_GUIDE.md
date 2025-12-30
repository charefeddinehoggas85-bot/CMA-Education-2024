# 🚂 Guide Railway - Déploiement Strapi CMS

## 🎯 Objectif
Déployer votre CMS Strapi sur Railway avec votre base PostgreSQL Neon existante.

## 📋 Prérequis
- ✅ Repository `CMA-Education-Strapi` sur GitHub
- ✅ Base de données PostgreSQL Neon configurée
- ✅ Compte GitHub actif

## 🚀 Étapes de Déploiement

### **Étape 1 : Créer le projet Railway (2 min)**

1. **Allez sur** : [railway.app](https://railway.app)
2. **Cliquez** : "Start a New Project"
3. **Sélectionnez** : "Deploy from GitHub repo"
4. **Connectez votre GitHub** si nécessaire
5. **Choisissez** : `CMA-Education-Strapi`
6. **Cliquez** : "Deploy Now"

### **Étape 2 : Configuration des Variables (5 min)**

**Dans Railway** → **Variables** → **New Variable** :

#### Variables Obligatoires :
```env
DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

HOST=0.0.0.0
PORT=1337
NODE_ENV=production

FRONTEND_URL=https://cma-education-2024.vercel.app
```

#### Clés de Sécurité (Temporaires - À changer plus tard) :
```env
APP_KEYS=temp-key-1,temp-key-2
API_TOKEN_SALT=temp-salt-123
ADMIN_JWT_SECRET=temp-admin-secret-456
TRANSFER_TOKEN_SALT=temp-transfer-salt-789
JWT_SECRET=temp-jwt-secret-abc
```

### **Étape 3 : Surveiller le Déploiement (5-10 min)**

1. **Allez dans** : **Deployments**
2. **Cliquez sur** : Le déploiement en cours
3. **Surveillez les logs** :
   - ✅ `Installing dependencies...`
   - ✅ `Building application...`
   - ✅ `Starting server...`
   - ✅ `Server started on port 1337`

### **Étape 4 : Obtenir l'URL Railway**

1. **Dans Railway** → **Settings**
2. **Notez l'URL** : `https://votre-app-name.up.railway.app`
3. **Testez l'URL** dans le navigateur

## ✅ Vérifications Post-Déploiement

### **Test 1 : Accès Strapi**
- **URL** : `https://votre-app.up.railway.app`
- **Résultat attendu** : Page d'accueil Strapi

### **Test 2 : Panel Admin**
- **URL** : `https://votre-app.up.railway.app/admin`
- **Résultat attendu** : Page de création de compte admin

### **Test 3 : API**
- **URL** : `https://votre-app.up.railway.app/api/formations`
- **Résultat attendu** : `{"data":[],"meta":{"pagination":{...}}}`

## 🔧 Configuration Initiale Strapi

### **Créer le Compte Admin**
1. **Allez sur** : `https://votre-app.up.railway.app/admin`
2. **Remplissez** :
   - Prénom : Votre prénom
   - Nom : Votre nom
   - Email : Votre email
   - Mot de passe : Mot de passe sécurisé
3. **Cliquez** : "Let's start"

### **Générer l'API Token**
1. **Dans Strapi Admin** → **Settings** → **API Tokens**
2. **Create new API Token** :
   - Name : `Frontend Token`
   - Description : `Token pour le frontend Vercel`
   - Token duration : `Unlimited`
   - Token type : `Full access`
3. **Save** et **copiez le token**

## 🔄 Mise à Jour Vercel

### **Ajouter l'URL Railway dans Vercel**
1. **Allez sur** : [vercel.com](https://vercel.com)
2. **Projet** : `CMA-Education-2024`
3. **Settings** → **Environment Variables**
4. **Modifiez** :
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://votre-app.up.railway.app
   STRAPI_API_TOKEN=votre-token-copié
   ```
5. **Redéployez** le projet

## 🔐 Sécurisation (Important !)

### **Générer de Vraies Clés**
```bash
# Exécutez cette commande 5 fois pour générer des clés uniques
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Remplacer dans Railway**
```env
APP_KEYS=clé1-générée,clé2-générée
API_TOKEN_SALT=clé3-générée
ADMIN_JWT_SECRET=clé4-générée
TRANSFER_TOKEN_SALT=clé5-générée
JWT_SECRET=clé6-générée
```

## 🚨 Résolution de Problèmes

### **Railway ne démarre pas**
- Vérifiez `DATABASE_URL` (doit être exacte)
- Consultez les logs de déploiement
- Vérifiez que toutes les variables sont définies

### **Erreur de base de données**
- Testez la connexion PostgreSQL manuellement
- Vérifiez les permissions de la DB
- Assurez-vous que la DB accepte les connexions SSL

### **Erreur 500 sur l'admin**
- Vérifiez les clés de sécurité
- Consultez les logs Railway
- Redémarrez le service

## 📊 Monitoring

### **Logs Railway**
- **Deployments** → **View Logs**
- Surveillez les erreurs en temps réel

### **Métriques**
- **Metrics** → CPU, RAM, Network
- Vérifiez les performances

## 🎉 Résultat Final

Une fois terminé, vous aurez :
- **CMS Strapi** : `https://votre-app.up.railway.app/admin`
- **API REST** : `https://votre-app.up.railway.app/api`
- **Frontend connecté** : `https://cma-education-2024.vercel.app`

**Temps total estimé : 15-20 minutes** ⏱️

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs Railway
2. Testez chaque URL individuellement
3. Vérifiez les variables d'environnement
4. Consultez la documentation Railway

**Prêt à déployer ? Suivez les étapes ! 🚀**