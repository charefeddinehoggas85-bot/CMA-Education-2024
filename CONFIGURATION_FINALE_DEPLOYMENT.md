# 🚀 Configuration Finale - CMA Education Deployment

## ✅ État Actuel
- **Frontend Vercel** : `cma-education-2024.vercel.app` ✅
- **Base de données** : PostgreSQL Neon ✅
- **Erreur CMS résolue** : Dossier cms-cma supprimé du frontend ✅

## 🎯 Prochaines Étapes Immédiates

### **1. Déployer Strapi sur Railway (10 min)**

#### A) Créer le projet Railway
1. **Allez sur** : [railway.app](https://railway.app)
2. **Sign up with GitHub**
3. **New Project** → **Deploy from GitHub repo**
4. **Sélectionnez** : `CMA-Education-Strapi`

#### B) Configurer les variables d'environnement
**Dans Railway** → **Variables** :

```env
# Base de données (IMPORTANT: Utilisez votre vraie DB)
DATABASE_URL=postgresql://neondb_owner:npg_P2DZma1jtAkB@ep-silent-voice-a47tu3wg-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Configuration Strapi
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Clés de sécurité (CHANGEZ CES VALEURS!)
APP_KEYS=votre-app-key-1,votre-app-key-2
API_TOKEN_SALT=votre-api-token-salt
ADMIN_JWT_SECRET=votre-admin-jwt-secret
TRANSFER_TOKEN_SALT=votre-transfer-token-salt
JWT_SECRET=votre-jwt-secret

# CORS Frontend
FRONTEND_URL=https://cma-education-2024.vercel.app
```

#### C) Attendre le déploiement
- **Surveillez les logs Railway**
- **Notez l'URL générée** : `https://votre-app.up.railway.app`

### **2. Configurer Vercel avec l'URL Strapi (5 min)**

#### A) Variables d'environnement Vercel
**Dans Vercel** → **Settings** → **Environment Variables** :

```env
NEXT_PUBLIC_STRAPI_URL=https://votre-app.up.railway.app
STRAPI_API_TOKEN=token-à-générer-plus-tard
```

#### B) Redéployer Vercel
- **Trigger un nouveau déploiement**
- **Vérifiez que ça build sans erreur**

### **3. Configuration initiale Strapi (10 min)**

#### A) Accéder au panel admin
1. **Ouvrez** : `https://votre-app.up.railway.app/admin`
2. **Créez votre compte administrateur**
3. **Connectez-vous**

#### B) Générer un API Token
1. **Settings** → **API Tokens**
2. **Create new API Token**
3. **Type** : Full access
4. **Copiez le token**

#### C) Mettre à jour Vercel
1. **Retournez dans Vercel** → **Environment Variables**
2. **Modifiez** `STRAPI_API_TOKEN` avec le vrai token
3. **Redéployez**

### **4. Test de connexion (5 min)**

#### A) Tester Strapi
- **URL** : `https://votre-app.up.railway.app/api/formations`
- **Doit retourner** : `{"data":[],"meta":{"pagination":{...}}}`

#### B) Tester Frontend
- **URL** : `https://cma-education-2024.vercel.app`
- **Vérifiez** : Pas d'erreurs dans la console

## 🔧 Génération de Clés Sécurisées

**Remplacez les clés temporaires par de vraies clés** :

```bash
# Générez des clés aléatoirement
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Utilisez cette commande 5 fois pour générer** :
- APP_KEYS (2 clés séparées par une virgule)
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT
- JWT_SECRET

## 🚨 Résolution de Problèmes

### **Railway ne démarre pas**
- Vérifiez `DATABASE_URL` dans les variables
- Consultez les logs Railway
- Assurez-vous que le port 1337 est configuré

### **Vercel ne se connecte pas**
- Vérifiez `NEXT_PUBLIC_STRAPI_URL`
- Testez l'URL Strapi manuellement
- Vérifiez le token API

### **Erreurs CORS**
- Vérifiez `FRONTEND_URL` dans Railway
- Redémarrez Railway après changement

## ⏱️ Temps Total Estimé : 30 minutes

## 🎉 Résultat Final

- **Site web** : `https://cma-education-2024.vercel.app`
- **Panel admin** : `https://votre-app.up.railway.app/admin`
- **API** : `https://votre-app.up.railway.app/api`

**Votre CMA Education sera entièrement fonctionnel !** 🚀

## 📋 Checklist Finale

- [ ] Railway déployé avec Strapi
- [ ] Variables d'environnement configurées
- [ ] Vercel connecté à Railway
- [ ] Compte admin créé
- [ ] API Token généré
- [ ] Tests de connexion réussis
- [ ] Clés de sécurité mises à jour

**Prêt à commencer ? Suivez les étapes dans l'ordre !**