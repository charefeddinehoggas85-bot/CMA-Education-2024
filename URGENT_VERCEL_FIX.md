# 🚨 CORRECTION URGENTE - Erreur ERR_CONNECTION_REFUSED

## Problème Identifié

Votre site Vercel essaie de charger des ressources depuis `localhost:1337` au lieu de Railway parce que **la variable d'environnement `NEXT_PUBLIC_STRAPI_URL` n'est pas définie sur Vercel**.

## ⚡ Solution Immédiate (5 minutes)

### Étape 1: Configurer les Variables d'Environnement Vercel

```bash
# 1. Supprimer les anciennes variables (si elles existent)
vercel env rm NEXT_PUBLIC_STRAPI_URL production
vercel env rm STRAPI_API_TOKEN production

# 2. Ajouter la variable STRAPI URL
vercel env add NEXT_PUBLIC_STRAPI_URL production
# Quand demandé, entrer: https://cma-education-strapi-production.up.railway.app

# 3. Ajouter le token API
vercel env add STRAPI_API_TOKEN production
# Quand demandé, entrer: 62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d

# 4. Redéployer immédiatement
vercel --prod
```

### Étape 2: Alternative via Dashboard Vercel

Si vous préférez l'interface web:

1. **Aller sur:** https://vercel.com/dashboard
2. **Sélectionner votre projet:** cma-education-2024
3. **Aller dans:** Settings > Environment Variables
4. **Ajouter:**
   - **Name:** `NEXT_PUBLIC_STRAPI_URL`
   - **Value:** `https://cma-education-strapi-production.up.railway.app`
   - **Environment:** Production
5. **Ajouter:**
   - **Name:** `STRAPI_API_TOKEN`
   - **Value:** `62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94ec236385a2013ba8db694ccbdf80a49a5cc3e0499ae408caa45dddb48f2a9ed35fd17a8a9eedb71fbf587e0806ccc282a4c62f8aa575457bc480b312f9740d1f3e1651e196a507075ed08a858b8dda30c5c1ffc88b61352c9436b7fddeb70f6668b194166d1a18133990d6da183edb6a0f4f4694f716d`
   - **Environment:** Production
6. **Redéployer:** Deployments > ... > Redeploy

## 🔍 Vérification

Après le redéploiement (2-3 minutes):

1. **Ouvrir:** https://cma-education-2024.vercel.app
2. **Console navigateur (F12):** Plus d'erreur `ERR_CONNECTION_REFUSED`
3. **Toutes les sections** doivent s'afficher correctement

## 📋 Problèmes Résolus

✅ **Mixed Content Error** - Plus d'URLs localhost  
✅ **ERR_CONNECTION_REFUSED** - Plus de tentatives de connexion à localhost  
✅ **API Partners 404** - Sera résolu après création du content type  
✅ **Video 503** - Vidéo hero temporairement désactivée  

## 🚨 Actions Critiques

### IMMÉDIAT (maintenant):
1. Configurer `NEXT_PUBLIC_STRAPI_URL` sur Vercel
2. Redéployer

### APRÈS (optionnel):
1. Créer le content type Partners sur Railway
2. Réactiver la vidéo hero avec une URL correcte

## 🔗 Liens Rapides

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Strapi:** https://cma-education-strapi-production.up.railway.app/admin
- **Site Production:** https://cma-education-2024.vercel.app

---

**⏱️ Temps estimé:** 5 minutes  
**🎯 Résultat:** Site entièrement fonctionnel sans erreurs