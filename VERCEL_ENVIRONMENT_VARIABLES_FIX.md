# 🔧 CORRECTION VARIABLES D'ENVIRONNEMENT VERCEL

## 🎯 PROBLÈME IDENTIFIÉ

La page des formations sur Vercel (https://cma-education-2024.vercel.app/formations) ne montre pas les formations car **les variables d'environnement ne sont pas configurées sur Vercel**.

### 📊 Diagnostic Complet
- ✅ **Railway Strapi** : Accessible avec 11 formations
- ❌ **Variables Vercel** : Non configurées
- ❌ **API Vercel** : Utilise `localhost:1337` au lieu de Railway
- ⚠️  **Page Vercel** : Affiche les sections mais pas les données

## 🔧 SOLUTION : Configurer les Variables d'Environnement

### 1. Accéder au Dashboard Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter à votre compte
3. Sélectionner le projet **cma-education-2024**
4. Aller dans **Settings** → **Environment Variables**

### 2. Ajouter les Variables Requises

Ajouter ces variables d'environnement :

#### Variable 1 : URL Strapi
```
Name: NEXT_PUBLIC_STRAPI_URL
Value: https://cma-education-strapi-production.up.railway.app
Environment: Production, Preview, Development
```

#### Variable 2 : Token API Strapi
```
Name: STRAPI_API_TOKEN
Value: 62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d
Environment: Production, Preview, Development
```

### 3. Redéployer l'Application

Après avoir ajouté les variables :

1. Aller dans **Deployments**
2. Cliquer sur **Redeploy** sur le dernier déploiement
3. Ou faire un nouveau commit pour déclencher un redéploiement automatique

## 📋 ÉTAPES DÉTAILLÉES

### Option A : Via l'Interface Vercel (Recommandé)

1. **Dashboard Vercel** → **Projet cma-education-2024**
2. **Settings** → **Environment Variables**
3. **Add New** pour chaque variable :
   - Name : `NEXT_PUBLIC_STRAPI_URL`
   - Value : `https://cma-education-strapi-production.up.railway.app`
   - Environments : Cocher **Production**, **Preview**, **Development**
   - **Save**
4. Répéter pour `STRAPI_API_TOKEN`
5. **Deployments** → **Redeploy**

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Se connecter
vercel login

# Ajouter les variables
vercel env add NEXT_PUBLIC_STRAPI_URL production
# Entrer: https://cma-education-strapi-production.up.railway.app

vercel env add STRAPI_API_TOKEN production
# Entrer le token complet

# Redéployer
vercel --prod
```

## 🔍 VÉRIFICATION

### 1. Tester les Variables

Après redéploiement, tester :
- https://cma-education-2024.vercel.app/api/test-env
- https://cma-education-2024.vercel.app/api/test-formations

### 2. Vérifier la Page Formations

- https://cma-education-2024.vercel.app/formations
- Les formations devraient maintenant s'afficher

### 3. Script de Vérification

```bash
node scripts/test-vercel-strapi-connection.js
```

## 📊 RÉSULTAT ATTENDU

Après configuration :
- ✅ **Variables Vercel** : Configurées
- ✅ **API Vercel** : Accessible avec données Railway
- ✅ **Page Formations** : Affiche les 11 formations
- ✅ **Connexion Railway** : Fonctionnelle

## 🚨 POINTS IMPORTANTS

### Variables Publiques vs Privées

- `NEXT_PUBLIC_STRAPI_URL` : **Publique** (accessible côté client)
- `STRAPI_API_TOKEN` : **Privée** (serveur uniquement)

### Environnements

Configurer pour **tous les environnements** :
- **Production** : Site live
- **Preview** : Branches de test
- **Development** : Développement local

### Sécurité

- Le token API est sensible, ne pas l'exposer publiquement
- Utiliser des tokens différents pour production/développement si possible

## 🔄 PROCESSUS COMPLET

1. **Configurer variables** → Vercel Dashboard
2. **Redéployer** → Nouveau build avec variables
3. **Tester** → APIs et page formations
4. **Vérifier** → Script de diagnostic

## 📞 SUPPORT

Si le problème persiste après configuration :

1. Vérifier les logs Vercel dans **Functions** → **View Function Logs**
2. Tester l'API Railway directement
3. Vérifier la console du navigateur sur la page formations

---

**Une fois les variables configurées et l'application redéployée, les formations devraient s'afficher correctement sur https://cma-education-2024.vercel.app/formations**