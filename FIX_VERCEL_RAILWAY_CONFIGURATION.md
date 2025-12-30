# 🚨 FIX URGENT : Configuration Vercel → Railway

## 🎯 **PROBLÈME**
Vercel essaie encore de se connecter à `localhost:1337` au lieu de Railway.

## ✅ **SOLUTION IMMÉDIATE**

### **ÉTAPE 1 : Configurer les variables Vercel**

1. **Aller sur Vercel Dashboard :**
   - URL : `https://vercel.com/dashboard`
   - Projet : `cma-education-2024`

2. **Settings → Environment Variables :**
   - **Supprimer** toutes les anciennes variables Strapi
   - **Ajouter** les nouvelles variables :

```bash
# Variables à ajouter dans Vercel
NEXT_PUBLIC_STRAPI_URL=https://cma-education-strapi-production.up.railway.app
STRAPI_API_TOKEN=62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e
```

3. **Environnements :**
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

### **ÉTAPE 2 : Redéployer Vercel**

1. **Deployments → Redeploy**
2. **Ou Push un commit** pour déclencher un nouveau déploiement

### **ÉTAPE 3 : Vérifier .env.local (local)**

Votre fichier `.env.local` doit contenir :
```bash
NEXT_PUBLIC_STRAPI_URL=https://cma-education-strapi-production.up.railway.app
STRAPI_API_TOKEN=62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e
```

## 🔍 **VÉRIFICATIONS**

### **Test 1 : Variables Vercel**
- Aller dans Vercel → Settings → Environment Variables
- Vérifier que `NEXT_PUBLIC_STRAPI_URL` = Railway URL
- Vérifier que `STRAPI_API_TOKEN` = Token Railway

### **Test 2 : Nouveau déploiement**
- Vercel → Deployments → Voir le dernier déploiement
- Vérifier qu'il utilise les nouvelles variables

### **Test 3 : Site en production**
- Ouvrir `https://cma-education-2024.vercel.app`
- F12 → Network → Vérifier les requêtes vers Railway
- Plus de requêtes vers `localhost:1337`

## 🎯 **RÉSULTAT ATTENDU**

Après ces étapes :
- ✅ Vercel → Railway (plus de localhost)
- ✅ Plus d'erreurs CORS
- ✅ Plus d'erreurs 503
- ✅ Site fonctionnel en production

## ⚡ **ACTIONS IMMÉDIATES**

1. **Configurer Vercel** (5 min)
2. **Redéployer** (2 min)
3. **Tester** (2 min)

**TOTAL : 10 minutes pour résoudre le problème**